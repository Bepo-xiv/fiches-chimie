// Fiches réactifs : assemble reactifs-1.js et reactifs-2.js, et relie chaque nom cité dans la fiche de référence.
import part1 from './reactifs-1.js';
import part2 from './reactifs-2.js';
import { REF_SECTIONS } from './reference.js';

/** Clé de comparaison d'un nom de réactif : sans parenthèse finale, sans accents ni espaces superflus.
 * La casse est conservée : COCl₂ (phosgène) et CoCl₂ (chlorure de cobalt) sont deux réactifs. */
export function reagentKey(s) {
  let t = String(s).trim();
  // Retire la ou les parenthèses finales (même imbriquées) : « H₂CrO₄ (réactif de Jones) » → « H₂CrO₄ ».
  for (let guard = 0; guard < 3 && t.endsWith(')'); guard++) {
    let depth = 0, i = t.length - 1;
    for (; i >= 0; i--) { if (t[i] === ')') depth++; else if (t[i] === '(') { depth--; if (depth === 0) break; } }
    if (i <= 0 || t[i - 1] !== ' ') break;
    t = t.slice(0, i).trim();
  }
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s*\/\s*/g, '/').replace(/’/g, "'").replace(/\s+/g, ' ');
}

function parse(text) {
  const out = [];
  let fam = '';
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('#')) { fam = line.slice(1).trim(); continue; }
    const [names, what = '', when = '', cards = ''] = line.split(' | ').map((x) => x.trim());
    const all = names.split(' ; ').map((x) => x.trim()).filter(Boolean);
    out.push({
      id: 'r' + out.length, name: all[0], aliases: all.slice(1), fam, what, when: when.replace(/\|$/, '').trim(),
      cards: cards.replace(/\|/g, '').split(/\s+/).filter(Boolean),
    });
  }
  return out;
}

export const REACTIFS = parse(part1 + '\n' + part2);

const byKey = new Map();
for (const r of REACTIFS) for (const n of [r.name, ...r.aliases]) if (!byKey.has(reagentKey(n))) byKey.set(reagentKey(n), r);

/** Fiche réactif correspondant à un nom tel qu'il est cité dans la fiche de référence. */
export const findReagent = (name) => byKey.get(reagentKey(name)) || null;

// Rubriques de la fiche de référence où chaque réactif est cité.
for (const s of REF_SECTIONS.filter((x) => x.list === 2)) {
  for (const g of s.groups) for (const item of g.items) {
    const r = findReagent(item);
    if (!r) continue;
    const label = s.title + (g.label ? ' — ' + g.label : '');
    (r.cited ||= []);
    if (!r.cited.includes(label)) r.cited.push(label);
  }
}

/** Réactifs cités dans la fiche de référence qui n'ont pas de fiche (doit rester vide). */
export function missingReagents() {
  const miss = new Set();
  for (const s of REF_SECTIONS.filter((x) => x.list === 2)) for (const g of s.groups) for (const item of g.items) if (!findReagent(item)) miss.add(item);
  return [...miss];
}
