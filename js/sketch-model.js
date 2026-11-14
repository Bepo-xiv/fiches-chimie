// sketch-model.js — modèle de l'éditeur de structures (pur, testable) : graphe 2D ↔ SMILES.
import { OCL, parse } from './chem.js';

const M = OCL.Molecule;
export const BOND = 40; // longueur de liaison à l'écran
export const ELEMENTS = ['C', 'N', 'O', 'S', 'P', 'F', 'Cl', 'Br', 'I', 'Si', 'B', 'H'];

/** Esquisse : atoms [{x,y,el,q}], bonds [{a,b,o,st}] ; st : 0 simple, 1 coin plein, 2 coin hachuré (pointe en a). */
export const emptySketch = () => ({ atoms: [], bonds: [] });
export const cloneSketch = (s) => ({ atoms: s.atoms.map((a) => ({ ...a })), bonds: s.bonds.map((b) => ({ ...b })) });

export function fromSmiles(smiles) {
  const mol = parse(smiles);
  const n = mol.getAllAtoms();
  const sk = emptySketch();
  if (!n) return sk;
  let sum = 0, cnt = 0;
  for (let b = 0; b < mol.getAllBonds(); b++) {
    const a1 = mol.getBondAtom(0, b), a2 = mol.getBondAtom(1, b);
    sum += Math.hypot(mol.getAtomX(a1) - mol.getAtomX(a2), mol.getAtomY(a1) - mol.getAtomY(a2));
    cnt++;
  }
  const k = cnt && sum > 0 ? BOND / (sum / cnt) : BOND;
  let cx = 0, cy = 0;
  for (let i = 0; i < n; i++) { cx += mol.getAtomX(i); cy += mol.getAtomY(i); }
  cx /= n; cy /= n;
  for (let i = 0; i < n; i++) sk.atoms.push({ x: (mol.getAtomX(i) - cx) * k, y: (mol.getAtomY(i) - cy) * k, el: mol.getAtomLabel(i), q: mol.getAtomCharge(i) });
  for (let b = 0; b < mol.getAllBonds(); b++) {
    const t = mol.getBondType(b);
    sk.bonds.push({ a: mol.getBondAtom(0, b), b: mol.getBondAtom(1, b), o: Math.max(1, Math.min(3, mol.getBondOrder(b))), st: t === M.cBondTypeUp ? 1 : t === M.cBondTypeDown ? 2 : 0 });
  }
  return sk;
}

export function toMolecule(sk) {
  const m = new M(Math.max(8, sk.atoms.length + 1), Math.max(8, sk.bonds.length + 1));
  for (const a of sk.atoms) {
    const i = m.addAtom(M.getAtomicNoFromLabel(a.el) || 6);
    m.setAtomX(i, a.x / BOND);
    m.setAtomY(i, a.y / BOND);
    if (a.q) m.setAtomCharge(i, a.q);
    if (a.el === 'H') m.setAtomMass(i, 2); // H dessiné explicitement : noté [2H], affiché « H »
  }
  for (const b of sk.bonds) {
    const i = m.addBond(b.a, b.b);
    m.setBondType(i, b.st === 1 ? M.cBondTypeUp : b.st === 2 ? M.cBondTypeDown : b.o === 3 ? M.cBondTypeTriple : b.o === 2 ? M.cBondTypeDouble : M.cBondTypeSingle);
  }
  m.ensureHelperArrays(M.cHelperCIP);
  return m;
}

export function toSmiles(sk) {
  if (!sk.atoms.length) return '';
  return toMolecule(sk).toIsomericSmiles();
}

/** Nombre d'hydrogènes implicites par atome (pour afficher OH, NH₂…). */
export function implicitH(sk) {
  if (!sk.atoms.length) return [];
  try {
    const m = toMolecule(sk);
    return sk.atoms.map((_, i) => m.getImplicitHydrogens(i));
  } catch { return sk.atoms.map(() => 0); }
}

const d2 = (ax, ay, bx, by) => (ax - bx) ** 2 + (ay - by) ** 2;

/** Atome ou liaison sous le point (x,y). */
export function hit(sk, x, y, ra = 15, rb = 11) {
  let best = -1, bd = ra * ra;
  sk.atoms.forEach((a, i) => { const d = d2(a.x, a.y, x, y); if (d <= bd) { bd = d; best = i; } });
  if (best >= 0) return { atom: best };
  bd = rb * rb;
  sk.bonds.forEach((b, i) => {
    const A = sk.atoms[b.a], B = sk.atoms[b.b];
    const L = d2(A.x, A.y, B.x, B.y) || 1;
    const t = Math.max(0.15, Math.min(0.85, ((x - A.x) * (B.x - A.x) + (y - A.y) * (B.y - A.y)) / L));
    const d = d2(A.x + t * (B.x - A.x), A.y + t * (B.y - A.y), x, y);
    if (d <= bd) { bd = d; best = i; }
  });
  return best >= 0 ? { bond: best } : null;
}

export const neighbors = (sk, i) => sk.bonds.filter((b) => b.a === i || b.b === i).map((b) => (b.a === i ? b.b : b.a));
export const findBond = (sk, a, b) => sk.bonds.findIndex((x) => (x.a === a && x.b === b) || (x.a === b && x.b === a));

/** Direction (angle en radians) la plus dégagée pour faire pousser une nouvelle liaison depuis l'atome i. */
export function sproutAngle(sk, i) {
  const a = sk.atoms[i];
  const angs = neighbors(sk, i).map((j) => Math.atan2(sk.atoms[j].y - a.y, sk.atoms[j].x - a.x)).sort((p, q) => p - q);
  if (!angs.length) return -Math.PI / 6;
  if (angs.length === 1) {
    // Zigzag : 120° par rapport au voisin, du côté le plus « haut ».
    const c1 = angs[0] + (2 * Math.PI) / 3, c2 = angs[0] - (2 * Math.PI) / 3;
    return Math.sin(c1) < Math.sin(c2) ? c1 : c2;
  }
  let bestGap = -1, bestMid = 0;
  for (let k = 0; k < angs.length; k++) {
    const p = angs[k], q = k + 1 < angs.length ? angs[k + 1] : angs[0] + 2 * Math.PI;
    if (q - p > bestGap) { bestGap = q - p; bestMid = (p + q) / 2; }
  }
  return bestMid;
}

/** Ajoute un atome relié à l'atome i ; retourne son indice. */
export function sprout(sk, i, el = 'C') {
  const a = sk.atoms[i], ang = sproutAngle(sk, i);
  sk.atoms.push({ x: a.x + BOND * Math.cos(ang), y: a.y + BOND * Math.sin(ang), el, q: 0 });
  sk.bonds.push({ a: i, b: sk.atoms.length - 1, o: 1, st: 0 });
  return sk.atoms.length - 1;
}

/** Extrémité « aimantée » d'un tracé de liaison : angle multiple de 30°, longueur fixe. */
export function snapEnd(ax, ay, x, y) {
  const ang = Math.round(Math.atan2(y - ay, x - ax) / (Math.PI / 6)) * (Math.PI / 6);
  return { x: ax + BOND * Math.cos(ang), y: ay + BOND * Math.sin(ang) };
}

function addAtomAt(sk, x, y, el = 'C') {
  const h = hit(sk, x, y, 9, 0);
  if (h && h.atom != null) return h.atom;
  sk.atoms.push({ x, y, el, q: 0 });
  return sk.atoms.length - 1;
}

function addBondIfMissing(sk, a, b, o = 1) {
  if (a === b) return;
  const i = findBond(sk, a, b);
  if (i < 0) sk.bonds.push({ a, b, o, st: 0 });
  else if (o > sk.bonds[i].o) sk.bonds[i].o = o;
}

/**
 * Ajoute un cycle à n sommets. where : { x, y } (centre), { atom } (sommet commun) ou { bond } (cycle accolé).
 * aromatic : alterne simples et doubles liaisons.
 */
export function addRing(sk, n, aromatic, where) {
  const R = BOND / (2 * Math.sin(Math.PI / n));
  let pts;
  if (where.bond != null) {
    const b = sk.bonds[where.bond], A = sk.atoms[b.a], B = sk.atoms[b.b];
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
    let nx = -(B.y - A.y) / len, ny = (B.x - A.x) / len;
    const side = (s) => sk.atoms.filter((p) => (p.x - mx) * nx * s + (p.y - my) * ny * s > 1).length;
    if (side(1) > side(-1)) { nx = -nx; ny = -ny; }
    const h = R * Math.cos(Math.PI / n);
    const cx = mx + nx * h, cy = my + ny * h;
    const a0 = Math.atan2(A.y - cy, A.x - cx), a1 = Math.atan2(B.y - cy, B.x - cx);
    let step = (2 * Math.PI) / n;
    if (Math.abs(((a1 - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI - step) > 0.01) step = -step;
    pts = Array.from({ length: n }, (_, k) => ({ x: cx + R * Math.cos(a0 + k * step), y: cy + R * Math.sin(a0 + k * step) }));
  } else {
    let cx = where.x, cy = where.y, start = -Math.PI / 2;
    if (where.atom != null) {
      const a = sk.atoms[where.atom], ang = sproutAngle(sk, where.atom);
      cx = a.x + R * Math.cos(ang); cy = a.y + R * Math.sin(ang);
      start = ang + Math.PI;
    }
    pts = Array.from({ length: n }, (_, k) => ({ x: cx + R * Math.cos(start + (k * 2 * Math.PI) / n), y: cy + R * Math.sin(start + (k * 2 * Math.PI) / n) }));
  }
  const idx = pts.map((p) => addAtomAt(sk, p.x, p.y));
  const fusedOrder = where.bond != null ? sk.bonds[where.bond].o : 1;
  for (let k = 0; k < n; k++) {
    let o = 1;
    if (aromatic) o = where.bond != null ? (fusedOrder === 2 ? (k % 2 === 0 ? 2 : 1) : (k % 2 === 1 ? 2 : 1)) : (k % 2 === 0 ? 2 : 1);
    addBondIfMissing(sk, idx[k], idx[(k + 1) % n], o);
  }
  return idx;
}

export function removeAtom(sk, i) {
  sk.atoms.splice(i, 1);
  sk.bonds = sk.bonds.filter((b) => b.a !== i && b.b !== i).map((b) => ({ ...b, a: b.a > i ? b.a - 1 : b.a, b: b.b > i ? b.b - 1 : b.b }));
}

export function bounds(sk, pad = 60, minW = 420, minH = 300) {
  if (!sk.atoms.length) return { x: -minW / 2, y: -minH / 2, w: minW, h: minH };
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const a of sk.atoms) { x0 = Math.min(x0, a.x); y0 = Math.min(y0, a.y); x1 = Math.max(x1, a.x); y1 = Math.max(y1, a.y); }
  const w = Math.max(minW, x1 - x0 + 2 * pad), h = Math.max(minH, y1 - y0 + 2 * pad);
  return { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h };
}
