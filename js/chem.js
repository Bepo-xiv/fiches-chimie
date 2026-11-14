// chem.js — enveloppe autour d'OpenChemLib : rendu SVG, canonisation, sous-structure, 3D.
// Fonctionne dans le navigateur et sous Node (tests).
import OCL from '../vendor/openchemlib.js';
export { OCL };

const SVG_OPTS = {
  suppressChiralText: true, suppressCIPParity: true, suppressESR: true,
  noStereoProblem: true, autoCrop: true, autoCropMargin: 6,
};
const depictCache = new Map();

/** Analyse un SMILES ; lève une erreur lisible si invalide. */
export function parse(smiles) {
  if (typeof smiles !== 'string' || !smiles.trim()) throw new Error('SMILES vide');
  // OpenChemLib tolère les parenthèses non fermées : on les refuse explicitement.
  let par = 0, bra = 0;
  for (const ch of smiles) {
    if (ch === '(') par++; else if (ch === ')') par--; else if (ch === '[') bra++; else if (ch === ']') bra--;
    if (par < 0 || bra < 0 || bra > 1) break;
  }
  if (par !== 0 || bra !== 0) throw new Error(`SMILES invalide « ${smiles} » : parenthèses ou crochets non appariés`);
  try {
    return OCL.Molecule.fromSmiles(smiles.trim());
  } catch (e) {
    throw new Error(`SMILES invalide « ${smiles} » : ${e.message || e}`);
  }
}

export function isValidSmiles(smiles) {
  try { return parse(smiles).getAllAtoms() > 0; } catch { return false; }
}

export const isText = (item) => typeof item === 'string' && item.startsWith('t:');

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/**
 * Dessine une espèce. `item` est un SMILES, ou « t:texte » pour une étiquette libre (ex. t:H₂O).
 * Convention : [2H] dans un SMILES = hydrogène dessiné explicitement (affiché « H »).
 * Retour : { w, h, body, atoms:[{x,y,lab}], bonds:[{a,b}], text }
 * Longueur de liaison constante (24 px) pour un rendu homogène entre molécules.
 */
export function depict(item, rot = 0) {
  const key = rot ? item + '|' + rot : item;
  let d = depictCache.get(key);
  if (d) return d;
  d = isText(item) ? depictText(item.slice(2)) : depictMol(item, rot);
  depictCache.set(key, d);
  return d;
}

function depictText(text) {
  const w = Math.max(24, Math.round(text.length * 8.6) + 12), h = 30;
  return {
    w, h, text: true,
    body: `<text class="sp-text" x="${w / 2}" y="${h / 2 + 5}" text-anchor="middle">${esc(text)}</text>`,
    atoms: [{ x: w / 2, y: h / 2, lab: true, wide: w / 2 }], bonds: [],
  };
}

/** rot : rotation dans le plan, en pas de 30° (conserve la stéréochimie dessinée). */
function depictMol(smiles, rot = 0) {
  const mol = parse(smiles);
  const n = mol.getAllAtoms();
  if (rot && n > 1) {
    const a = (rot * Math.PI) / 6, cos = Math.cos(a), sin = Math.sin(a);
    let cx = 0, cy = 0;
    for (let i = 0; i < n; i++) { cx += mol.getAtomX(i) / n; cy += mol.getAtomY(i) / n; }
    for (let i = 0; i < n; i++) {
      const x = mol.getAtomX(i) - cx, y = mol.getAtomY(i) - cy;
      mol.setAtomX(i, cx + x * cos - y * sin);
      mol.setAtomY(i, cy + x * sin + y * cos);
    }
  }
  const raw = mol.toSVG(1600, 1200, 'm', SVG_OPTS);
  const vb = /viewBox="([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+)"/.exec(raw);
  if (!vb) throw new Error('Rendu impossible pour ' + smiles);
  const [vx, vy, w, h] = vb.slice(1).map(Number);
  const atoms = [];
  raw.replace(/<circle id="m:Atom:(\d+)" class="event" cx="([-\d.]+)" cy="([-\d.]+)"/g, (_, i, x, y) => {
    atoms[+i] = { x: +x - vx, y: +y - vy, lab: false };
    return '';
  });
  if (atoms.length !== n) throw new Error(`Rendu incohérent pour ${smiles}`);
  const deut = [];
  for (let i = 0; i < n; i++) {
    const z = mol.getAtomicNo(i);
    atoms[i].el = mol.getAtomLabel(i);
    atoms[i].lab = z !== 6 || mol.getAtomCharge(i) !== 0 || n === 1 || mol.getAtomRadical(i) !== 0;
    if (z === 1 && mol.getAtomMass(i) === 2) deut.push(atoms[i]);
  }
  const bonds = [];
  for (let b = 0; b < mol.getAllBonds(); b++) bonds.push({ a: mol.getBondAtom(0, b), b: mol.getBondAtom(1, b), order: mol.getBondOrder(b) });
  let inner = raw
    .replace(/^<svg[^>]*>\s*/, '').replace(/<\/svg>\s*$/, '')
    .replace(/<style>[\s\S]*?<\/style>\s*/, '')
    .replace(/\s*<(line|circle)[^>]*class="event"[^>]*\/>/g, '')
    .replace(/rgb\(0,0,0\)/g, 'currentColor')
    // Charges plus lisibles : vrai signe moins, corps plus grand.
    .replace(/font-size="9"([^>]*)>(\d?)([+-])<\/text>/g, (_, rest, n, sign) => `font-size="13" font-weight="700"${rest}>${n}${sign === '-' ? '−' : '+'}</text>`);
  // Retire l'exposant isotopique « 2 » des hydrogènes explicites ([2H] → H).
  if (deut.length) {
    inner = inner.replace(/\s*<text x="([-\d.]+)" y="([-\d.]+)"[^>]*font-size="9"[^>]*>2<\/text>/g, (m, x, y) => {
      const px = +x - vx, py = +y - vy;
      return deut.some((a) => px > a.x - 16 && px < a.x + 2 && py > a.y - 9 && py < a.y + 3) ? '' : m;
    });
  }
  return { w, h, atoms, bonds, text: false, body: `<g transform="translate(${-vx} ${-vy})">${inner}</g>` };
}

/** SVG autonome d'une espèce (vignettes, QCM). */
export function molSvg(item, { maxW = 0, cls = 'mol' } = {}) {
  const d = depict(item);
  const style = maxW ? ` style="max-width:${maxW}px"` : '';
  return `<svg class="${cls}" viewBox="0 0 ${d.w} ${d.h}" width="${d.w}" height="${d.h}"${style} role="img">${d.body}</svg>`;
}

/** Identifiant canonique (stéréo incluse, ou non). Les [2H] sont ramenés à H. */
export function canon(smiles, { stereo = true } = {}) {
  const mol = parse(smiles.replace(/\[2H\]/g, '[H]'));
  if (!stereo) mol.stripStereoInformation();
  return mol.getIDCode();
}

export function sameMolecule(a, b, opts) {
  try { return canon(a, opts) === canon(b, opts); } catch { return false; }
}

/** Sépare un SMILES multi-fragments « A.B » en fragments canoniques triés. */
export function fragments(smiles) {
  return smiles.split('.').filter(Boolean);
}

const queryCache = new Map();
function getQuery(q) {
  let f = queryCache.get(q);
  if (!f) {
    f = parse(q);
    f.setFragment(true);
    queryCache.set(q, f);
  }
  return f;
}
const searcher = new OCL.SSSearcher();

/** Vrai si `query` (SMILES) est une sous-structure de `smiles`. */
export function hasSubstructure(smiles, query) {
  if (isText(smiles)) return false;
  try {
    searcher.setFragment(getQuery(query));
    searcher.setMolecule(parse(smiles));
    return searcher.isFragmentInMolecule();
  } catch { return false; }
}

/** SMILES isomérique « propre » à partir d'un SMILES quelconque. */
export function normalize(smiles) {
  return parse(smiles).toIsomericSmiles();
}

let resourcesReady = null;
/** Conformère 3D (charge paresseusement les ressources d'OpenChemLib). */
export async function conformer(smiles, resourcesUrl = new URL('../vendor/ocl-resources.json', import.meta.url).href) {
  if (!resourcesReady) {
    resourcesReady = (typeof window === 'undefined')
      ? Promise.resolve(OCL.Resources.registerFromNodejs(new URL('../vendor/ocl-resources.json', import.meta.url)))
      : OCL.Resources.registerFromUrl(resourcesUrl);
  }
  await resourcesReady;
  const mol = parse(smiles);
  mol.addImplicitHydrogens();
  const gen = new OCL.ConformerGenerator(7);
  gen.initializeConformers(mol);
  const c = gen.getNextConformerAsMolecule();
  if (!c) throw new Error('Aucun conformère trouvé');
  const atoms = [], bonds = [];
  for (let i = 0; i < c.getAllAtoms(); i++) atoms.push({ el: c.getAtomLabel(i), z: c.getAtomicNo(i), p: [c.getAtomX(i), c.getAtomY(i), c.getAtomZ(i)] });
  for (let b = 0; b < c.getAllBonds(); b++) bonds.push({ a: c.getBondAtom(0, b), b: c.getBondAtom(1, b), order: c.getBondOrder(b) });
  return { atoms, bonds };
}
