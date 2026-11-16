// Résumés d'une ligne des réactions citées dans l'index (fiche de référence) qui n'ont pas de fiche détaillée.
// Chaque fichier resumes-*.js contient des lignes « nom | ce que fait la réaction | réactifs et conditions ».
import a from './resumes-a.js';
import b from './resumes-b.js';
import c from './resumes-c.js';
import d from './resumes-d.js';
import e from './resumes-e.js';
import fg from './resumes-fg.js';
import h from './resumes-h.js';
import i from './resumes-i.js';
import { RX_INDEX, rxKey } from './reference-liens.js';

const map = new Map();
/** Lignes mal formées ou noms en double (doit rester vide) : contrôlé par les tests. */
export const SUMMARY_ERRORS = [];

for (const text of [a, b, c, d, e, fg, h, i]) {
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split(' | ').map((x) => x.trim());
    if (parts.length !== 3 || parts.some((x) => !x)) { SUMMARY_ERRORS.push('ligne mal formée : ' + line.slice(0, 60)); continue; }
    const k = rxKey(parts[0]);
    if (map.has(k)) { SUMMARY_ERRORS.push('nom en double : ' + parts[0]); continue; }
    map.set(k, { what: parts[1], how: parts[2] });
  }
}

/** Résumé { what, how } d'une réaction citée dans l'index, ou null. */
export const summaryFor = (name) => map.get(rxKey(name)) || null;
export const SUMMARY_COUNT = map.size;

/** Réactions de l'index sans fiche détaillée ni résumé (doit rester vide). */
export function missingSummaries() {
  const miss = new Set();
  for (const s of RX_INDEX) for (const g of s.groups) for (const it of g.items) if (!it.card && !summaryFor(it.name)) miss.add(it.name);
  return [...miss];
}

/** Résumés qui ne correspondent à aucune réaction de l'index (fautes de frappe dans un nom). */
export function unusedSummaries() {
  const used = new Set();
  for (const s of RX_INDEX) for (const g of s.groups) for (const it of g.items) used.add(rxKey(it.name));
  return [...map.keys()].filter((k) => !used.has(k));
}
