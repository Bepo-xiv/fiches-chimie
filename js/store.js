// store.js — données personnelles : IndexedDB sur l'appareil, sauvegarde/restauration par fichier.
import { REACTIONS } from '../data/index.js';
import { defaultState, serializeBackup, parseBackup, mergeState, STATE_KEYS } from './backup.js';

const DB_NAME = 'fiches-chimie-organique';
let db = null;
export const state = defaultState();

function open() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore('kv');
      req.result.createObjectStore('files');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx(store, mode, fn) {
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const r = fn(t.objectStore(store));
    t.oncomplete = () => resolve(r && 'result' in r ? r.result : undefined);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}

export async function load() {
  try {
    db = await open();
    for (const k of STATE_KEYS) {
      const v = await tx('kv', 'readonly', (s) => s.get(k));
      if (v !== undefined) state[k] = k === 'settings' ? { ...state.settings, ...v } : v;
    }
    if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  } catch (e) {
    console.warn('Stockage indisponible, données en mémoire seulement', e);
    db = null;
  }
}

const pending = new Map();
/** Enregistre une clé de l'état (regroupe les écritures rapprochées). */
export function save(key) {
  if (!db) return;
  clearTimeout(pending.get(key));
  pending.set(key, setTimeout(() => {
    pending.delete(key);
    tx('kv', 'readwrite', (s) => s.put(state[key], key)).catch((e) => console.error('Écriture impossible', e));
  }, 250));
}

export async function saveNow(keys = STATE_KEYS) {
  if (!db) return;
  for (const k of keys) { clearTimeout(pending.get(k)); pending.delete(k); await tx('kv', 'readwrite', (s) => s.put(state[k], k)); }
}

// ---------- Fichiers joints (PDF) ----------
export const putFile = (id, file) => (db ? tx('files', 'readwrite', (s) => s.put(file, id)) : Promise.resolve());
export const getFile = (id) => (db ? tx('files', 'readonly', (s) => s.get(id)) : Promise.resolve(undefined));
export const delFile = (id) => (db ? tx('files', 'readwrite', (s) => s.delete(id)) : Promise.resolve());
async function allFiles() {
  if (!db) return [];
  const keys = await tx('files', 'readonly', (s) => s.getAllKeys());
  const out = [];
  for (const id of keys) { const f = await getFile(id); if (f) out.push({ id, ...f }); }
  return out;
}

export async function attachPdf(cardId, file) {
  const id = `pdf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  await putFile(id, { name: file.name, type: file.type || 'application/pdf', data: await file.arrayBuffer() });
  (state.pdfs[cardId] ||= []).push({ id, name: file.name, size: file.size });
  save('pdfs');
  return id;
}

export async function detachPdf(cardId, fileId) {
  state.pdfs[cardId] = (state.pdfs[cardId] || []).filter((p) => p.id !== fileId);
  if (!state.pdfs[cardId].length) delete state.pdfs[cardId];
  for (const k of Object.keys(state.ink)) if (k.startsWith(`pdf:${fileId}:`)) delete state.ink[k];
  save('pdfs'); save('ink');
  await delFile(fileId);
}

// ---------- Fiches ----------
const builtin = new Map(REACTIONS.map((r) => [r.id, r]));

/** Toutes les fiches : celles de la base, remplacées ou complétées par les fiches personnelles. */
export function allCards() {
  const out = REACTIONS.map((r) => state.custom[r.id] || r);
  for (const c of Object.values(state.custom)) if (!builtin.has(c.id)) out.push(c);
  return out;
}
export const getCard = (id) => state.custom[id] || builtin.get(id) || null;
export const isBuiltin = (id) => builtin.has(id);
export const isModified = (id) => !!state.custom[id];

export function saveCard(card) {
  state.custom[card.id] = { ...card, custom: true, modified: Date.now() };
  save('custom');
}
export function deleteCard(id) {
  delete state.custom[id];
  save('custom');
}

// ---------- Sauvegarde / restauration ----------
export async function exportBackup() {
  await saveNow();
  return new Blob([serializeBackup(state, await allFiles())], { type: 'application/json' });
}

export async function importBackup(text, { replace = false } = {}) {
  const { state: incoming, files } = parseBackup(text);
  const next = replace ? incoming : mergeState(state, incoming);
  for (const k of STATE_KEYS) state[k] = next[k];
  if (replace && db) await tx('files', 'readwrite', (s) => s.clear());
  for (const f of files) await putFile(f.id, { name: f.name, type: f.type, data: f.data.buffer });
  await saveNow();
  return { cards: Object.keys(incoming.custom).length, files: files.length };
}

export async function resetAll() {
  const fresh = defaultState();
  for (const k of STATE_KEYS) state[k] = fresh[k];
  if (db) { await tx('files', 'readwrite', (s) => s.clear()); await saveNow(); }
}

export async function storageInfo() {
  const est = (await navigator.storage?.estimate?.()) || {};
  const persisted = (await navigator.storage?.persisted?.()) || false;
  return { usage: est.usage || 0, quota: est.quota || 0, persisted };
}
