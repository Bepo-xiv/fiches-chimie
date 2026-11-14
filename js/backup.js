// backup.js — format du fichier de sauvegarde (pur, testable sous Node).
export const BACKUP_FORMAT = 'fiches-chimie-organique';
export const BACKUP_VERSION = 1;
export const STATE_KEYS = ['custom', 'fav', 'notes', 'srs', 'ink', 'pdfs', 'settings', 'oral'];

export function defaultState() {
  return {
    custom: {}, // fiches créées ou modifiées, par identifiant
    fav: {}, // { idFiche: true }
    notes: {}, // { idFiche: texte }
    srs: {}, // { "idFiche|type": état de répétition espacée }
    ink: {}, // { clé: [traits] } (notes manuscrites, annotations PDF)
    pdfs: {}, // { idFiche: [{ id, name, size }] }
    settings: { theme: 'auto', fingerDraw: false, newPerDay: 10, prepMin: 5, talkMin: 5 },
    oral: [], // historique des oraux blancs
  };
}

export function bytesToBase64(bytes) {
  let s = '';
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s);
}

export function base64ToBytes(b64) {
  const s = atob(b64);
  const u8 = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
  return u8;
}

/** Construit le texte JSON de sauvegarde. files : [{ id, name, type, data: ArrayBuffer|Uint8Array }] */
export function serializeBackup(state, files = [], date = new Date()) {
  const out = { format: BACKUP_FORMAT, version: BACKUP_VERSION, date: date.toISOString(), state: {}, files: [] };
  for (const k of STATE_KEYS) out.state[k] = state[k];
  for (const f of files) out.files.push({ id: f.id, name: f.name, type: f.type || 'application/pdf', data: bytesToBase64(f.data) });
  return JSON.stringify(out);
}

/** Analyse et valide une sauvegarde. Lève une erreur explicite si le fichier n'est pas reconnu. */
export function parseBackup(text) {
  let obj;
  try { obj = JSON.parse(text); } catch { throw new Error('Ce fichier n’est pas un fichier JSON valide.'); }
  if (!obj || obj.format !== BACKUP_FORMAT) throw new Error('Ce fichier n’est pas une sauvegarde de l’application.');
  if (!(obj.version >= 1) || obj.version > BACKUP_VERSION) throw new Error(`Version de sauvegarde non prise en charge (${obj.version}). Mettez l’application à jour.`);
  const base = defaultState();
  const state = {};
  for (const k of STATE_KEYS) {
    const v = obj.state?.[k];
    const okType = Array.isArray(base[k]) ? Array.isArray(v) : v && typeof v === 'object' && !Array.isArray(v);
    state[k] = okType ? v : base[k];
  }
  state.settings = { ...base.settings, ...state.settings };
  const files = (Array.isArray(obj.files) ? obj.files : []).filter((f) => f && f.id && typeof f.data === 'string')
    .map((f) => ({ id: String(f.id), name: String(f.name || 'document.pdf'), type: f.type || 'application/pdf', data: base64ToBytes(f.data) }));
  return { state, files, date: obj.date || null };
}

/** Fusionne une sauvegarde dans l'état courant (sans rien écraser de plus récent pour la révision). */
export function mergeState(current, incoming) {
  const out = { ...current };
  for (const k of ['custom', 'fav', 'notes', 'ink', 'pdfs']) out[k] = { ...current[k], ...incoming[k] };
  out.srs = { ...current.srs };
  for (const [id, s] of Object.entries(incoming.srs || {})) if (!out.srs[id] || (s.last || 0) > (out.srs[id].last || 0)) out.srs[id] = s;
  out.oral = [...(current.oral || []), ...(incoming.oral || [])].filter((o, i, a) => a.findIndex((x) => x.t === o.t && x.id === o.id) === i);
  out.settings = { ...current.settings };
  return out;
}
