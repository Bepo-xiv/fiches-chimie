// mech.js — scènes de mécanisme : disposition des espèces, flèches courbes, schémas réactionnels.
// Pur (aucun accès au DOM) : tout est testable sous Node.
//
// Notation d'une flèche :  [~]SOURCE>CIBLE[@[-][k]]
//   ~           demi-flèche (1 électron, radicalaire)
//   SOURCE      m.a      doublet/charge porté par l'atome a de l'espèce m
//               m.a-b    liaison entre les atomes a et b de l'espèce m
//   CIBLE       m.a      atome
//               m.a-b    liaison existante (la renforce)
//               m.a+n.c  nouvelle liaison entre l'atome a de m et l'atome c de n
//   @-          inverse le côté de la courbure ; @0.6 règle son amplitude
// Les indices suivent l'ordre des atomes lourds dans le SMILES (à partir de 0) ; [2H] = H explicite.
// Jetons de mise en page dans la liste des espèces : '+', '>>' (flèche), '<=>' (équilibre).
import { depict, isText } from './chem.js';

const TOKENS = new Set(['+', '>>', '<=>']);
const num = (v) => Math.round(v * 100) / 100;

export function parseRef(s) {
  let m;
  if ((m = /^(\d+)\.(\d+)$/.exec(s))) return { kind: 'atom', m: +m[1], a: +m[2] };
  if ((m = /^(\d+)\.(\d+)-(\d+)$/.exec(s))) return { kind: 'bond', m: +m[1], a: +m[2], b: +m[3] };
  if ((m = /^(\d+)\.(\d+)\+(\d+)\.(\d+)$/.exec(s))) return { kind: 'gap', m: +m[1], a: +m[2], n: +m[3], c: +m[4] };
  throw new Error(`Référence de flèche invalide : « ${s} »`);
}

export function parseArrow(str) {
  const s = String(str).replace(/\s+/g, '');
  const m = /^(~)?([\d.+-]+)>([\d.+-]+?)(?:@(-)?(\d*\.?\d+)?)?$/.exec(s);
  if (!m) throw new Error(`Flèche invalide : « ${str} »`);
  const src = parseRef(m[2]);
  if (src.kind === 'gap') throw new Error(`Une flèche ne peut pas partir d'une liaison non formée : « ${str} »`);
  return { hook: !!m[1], src, dst: parseRef(m[3]), flip: !!m[4], k: m[5] ? +m[5] : 0.42 };
}

export function formatRef(r) {
  if (r.kind === 'atom') return `${r.m}.${r.a}`;
  if (r.kind === 'bond') return `${r.m}.${r.a}-${r.b}`;
  return `${r.m}.${r.a}+${r.n}.${r.c}`;
}

export function formatArrow(a) {
  let s = (a.hook ? '~' : '') + formatRef(a.src) + '>' + formatRef(a.dst);
  if (a.flip || (a.k && a.k !== 0.42)) s += '@' + (a.flip ? '-' : '') + (a.k && a.k !== 0.42 ? a.k : '');
  return s;
}

/** Dispose les espèces sur une ligne. Retourne { w, h, parts, species } (species = parts hors jetons). */
export function layoutRow(items, { gap = 26, pad = 30, rots = null } = {}) {
  const parts = [];
  let x = pad, maxH = 0, si = 0;
  for (const it of items) {
    let p;
    if (TOKENS.has(it)) p = { token: it, w: it === '+' ? 14 : 54, h: 20 };
    else if (it && typeof it === 'object' && it.arrow) {
      const over = it.arrow.over || [], under = it.arrow.under || [];
      const chars = Math.max(6, ...over.map((t) => t.length), ...under.map((t) => t.length));
      p = { token: 'cond', over, under, w: Math.round(chars * 7.4) + 30, h: 20 + 34 * Math.max(over.length, under.length) };
    } else {
      const d = depict(it, rots?.[si] || 0);
      si++;
      p = { d, w: d.w, h: d.h, item: it };
    }
    p.x = x;
    x += p.w + gap;
    maxH = Math.max(maxH, p.h);
    parts.push(p);
  }
  const h = maxH + 2 * pad;
  for (const p of parts) p.y = num((h - p.h) / 2);
  const species = parts.filter((p) => p.d);
  return { w: x - gap + pad, h, parts, species };
}

function atomPoint(L, m, a) {
  const p = L.species[m];
  if (!p) throw new Error(`Espèce n°${m} inexistante`);
  const at = p.d.atoms[a];
  if (!at) throw new Error(`Atome ${a} inexistant dans l'espèce n°${m} (${p.item})`);
  return { x: p.x + at.x, y: p.y + at.y, r: at.wide ? 14 : at.lab ? 11 : 3 };
}

/** Point d'ancrage (coordonnées de scène) d'une référence. */
export function anchor(L, ref) {
  if (ref.kind === 'atom') return atomPoint(L, ref.m, ref.a);
  if (ref.kind === 'bond') {
    const p = L.species[ref.m];
    if (!p) throw new Error(`Espèce n°${ref.m} inexistante`);
    const ok = p.d.bonds.some((b) => (b.a === ref.a && b.b === ref.b) || (b.a === ref.b && b.b === ref.a));
    if (!ok) throw new Error(`Pas de liaison ${ref.a}-${ref.b} dans l'espèce n°${ref.m} (${p.item})`);
    const A = atomPoint(L, ref.m, ref.a), B = atomPoint(L, ref.m, ref.b);
    return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, r: 3 };
  }
  const A = atomPoint(L, ref.m, ref.a), B = atomPoint(L, ref.n, ref.c);
  return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, r: 2 };
}

function centroid(L, ms) {
  let x = 0, y = 0, n = 0;
  for (const m of ms) {
    const p = L.species[m];
    for (const a of p.d.atoms) { x += p.x + a.x; y += p.y + a.y; n++; }
  }
  return { x: x / n, y: y / n };
}

/** Géométrie d'une flèche courbe entre deux ancres. */
export function arrowGeom(p0, p1, { k = 0.42, side = 1, hook = false } = {}) {
  const dx = p1.x - p0.x, dy = p1.y - p0.y, len = Math.hypot(dx, dy) || 1;
  const bulge = Math.max(13, Math.min(k * len, 60));
  const nx = -dy / len, ny = dx / len;
  const c = { x: (p0.x + p1.x) / 2 + nx * side * bulge * 1.6, y: (p0.y + p1.y) / 2 + ny * side * bulge * 1.6 };
  const toward = (p, r) => {
    const l = Math.hypot(c.x - p.x, c.y - p.y) || 1;
    return { x: p.x + ((c.x - p.x) / l) * r, y: p.y + ((c.y - p.y) / l) * r };
  };
  const s = toward(p0, p0.r || 0), e = toward(p1, (p1.r || 0) + 1);
  const ul = Math.hypot(e.x - c.x, e.y - c.y) || 1;
  const ux = (e.x - c.x) / ul, uy = (e.y - c.y) / ul;
  const bx = e.x - ux * 8, by = e.y - uy * 8, vx = -uy, vy = ux;
  const head = hook
    ? `M${num(e.x)} ${num(e.y)}L${num(bx + vx * 4.6 * side)} ${num(by + vy * 4.6 * side)}L${num(bx)} ${num(by)}Z`
    : `M${num(e.x)} ${num(e.y)}L${num(bx + vx * 3.8)} ${num(by + vy * 3.8)}L${num(bx - vx * 3.8)} ${num(by - vy * 3.8)}Z`;
  return { d: `M${num(s.x)} ${num(s.y)}Q${num(c.x)} ${num(c.y)} ${num(bx)} ${num(by)}`, head, ctrl: c, start: s, end: e };
}

const rotCache = new Map();
/**
 * Orientation des espèces : chaque molécule est tournée (pas de 30°) de façon à rapprocher les sites
 * reliés par une flèche intermoléculaire. Imposable à la main avec step.rot = [pas, pas, …].
 */
export function chooseRotations(step) {
  const items = step.mols || [];
  if (Array.isArray(step.rot)) return step.rot;
  const key = JSON.stringify([items, step.arrows || []]);
  if (rotCache.has(key)) return rotCache.get(key);
  let rots = null;
  try {
    const arrows = (step.arrows || []).map(parseArrow);
    const inter = arrows.filter((a) => a.src.m !== a.dst.m || (a.dst.kind === 'gap' && a.dst.n !== a.src.m));
    if (inter.length) {
      const n = items.filter((it) => typeof it === 'string' && !TOKENS.has(it)).length;
      const base = layoutRow(items).h;
      const cost = (r) => {
        const L = layoutRow(items, { rots: r });
        let c = Math.max(0, L.h - base) * 0.25;
        for (const a of inter) { const p = anchor(L, a.src), q = anchor(L, a.dst); c += Math.hypot(p.x - q.x, p.y - q.y); }
        return c + 10 * r.filter(Boolean).length;
      };
      rots = new Array(n).fill(0);
      let best = cost(rots);
      const involved = [...new Set(inter.flatMap((a) => [a.src.m, a.dst.m, ...(a.dst.kind === 'gap' ? [a.dst.n] : [])]))].filter((i) => i < n);
      for (let pass = 0; pass < 2; pass++) {
        for (const i of involved) {
          for (let r = 0; r < 12; r++) {
            const trial = rots.slice();
            trial[i] = r;
            const c = cost(trial);
            if (c < best - 0.5) { best = c; rots = trial; }
          }
        }
      }
    }
  } catch { rots = null; }
  rotCache.set(key, rots);
  return rots;
}

/** Construit la scène d'une étape : disposition + géométrie des flèches. */
export function buildScene(step) {
  const L = layoutRow(step.mols || [], { rots: chooseRotations(step) });
  const arrows = (step.arrows || []).map((str) => {
    const a = parseArrow(str);
    const p0 = anchor(L, a.src), p1 = anchor(L, a.dst);
    const ms = new Set([a.src.m, a.dst.m]);
    if (a.dst.kind === 'gap') ms.add(a.dst.n);
    const C = centroid(L, ms);
    const g1 = arrowGeom(p0, p1, { k: a.k, side: 1, hook: a.hook });
    const g2 = arrowGeom(p0, p1, { k: a.k, side: -1, hook: a.hook });
    const d1 = Math.hypot(g1.ctrl.x - C.x, g1.ctrl.y - C.y), d2 = Math.hypot(g2.ctrl.x - C.x, g2.ctrl.y - C.y);
    let first = Math.abs(d1 - d2) < 4 ? g1.ctrl.y <= g2.ctrl.y : d1 > d2;
    if (a.flip) first = !first;
    return { ...a, str, p0, p1, geom: first ? g1 : g2 };
  });
  // Agrandit le cadre si une flèche déborde.
  let top = 0, bottom = L.h;
  for (const a of arrows) { top = Math.min(top, a.geom.ctrl.y - 4); bottom = Math.max(bottom, a.geom.ctrl.y + 4); }
  return { L, arrows, w: L.w, h: num(bottom - top), top: num(top) };
}

function tokenSvg(p) {
  const cy = p.y + p.h / 2, x1 = p.x + 3, x2 = p.x + p.w - 3;
  if (p.token === '+') return `<text class="sc-plus" x="${p.x + p.w / 2}" y="${cy + 6}" text-anchor="middle">+</text>`;
  if (p.token === '<=>') {
    return `<g class="sc-arrow"><path d="M${x1} ${cy - 3}H${x2}l-7 -5"/><path d="M${x2} ${cy + 3}H${x1}l7 5"/></g>`;
  }
  let s = `<g class="sc-arrow"><path d="M${x1} ${cy}H${x2}"/><path class="fill" d="M${x2 + 1} ${cy}l-9 -4.5v9z"/></g>`;
  if (p.token === 'cond') {
    const mid = p.x + p.w / 2;
    p.over.forEach((t, i) => { s += `<text class="sc-cond" x="${mid}" y="${cy - 9 - (p.over.length - 1 - i) * 16}" text-anchor="middle">${escXml(t)}</text>`; });
    p.under.forEach((t, i) => { s += `<text class="sc-cond under" x="${mid}" y="${cy + 19 + i * 16}" text-anchor="middle">${escXml(t)}</text>`; });
  }
  return s;
}
const escXml = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function rowSvg(L) {
  return L.parts.map((p) => (p.d ? `<g class="sp" transform="translate(${num(p.x)} ${num(p.y)})">${p.d.body}</g>` : tokenSvg(p))).join('');
}

/**
 * SVG d'une étape. opts.arrows : 'all' | 'none' ; opts.hits : ajoute les zones cliquables (éditeur).
 * Chaque flèche est un <g class="arrow" data-i> animable en CSS (classe .on).
 */
export function sceneSvg(step, { arrows = 'all', hits = false, scale = 1, cls = '' } = {}) {
  const sc = buildScene(step);
  let s = `<svg class="scene ${cls}" viewBox="0 ${sc.top} ${sc.w} ${sc.h}" width="${num(sc.w * scale)}" height="${num(sc.h * scale)}" data-w="${sc.w}" role="img">`;
  s += rowSvg(sc.L);
  if (arrows !== 'none') {
    sc.arrows.forEach((a, i) => {
      s += `<g class="arrow${a.hook ? ' hook' : ''}${arrows === 'all' ? ' on' : ''}" data-i="${i}"><path class="shaft" pathLength="1" d="${a.geom.d}"/><path class="head" d="${a.geom.head}"/></g>`;
    });
  }
  if (hits) {
    for (const t of sceneAnchors(sc)) s += `<circle class="hit ${t.kind}" data-ref="${t.ref}" cx="${num(t.x)}" cy="${num(t.y)}" r="${t.kind === 'atom' ? 9 : 6}"/>`;
  }
  return s + '</svg>';
}

/** Toutes les ancres possibles d'une scène (atomes et milieux de liaisons). */
export function sceneAnchors(sc) {
  const out = [];
  sc.L.species.forEach((p, m) => {
    p.d.atoms.forEach((a, i) => out.push({ kind: 'atom', ref: `${m}.${i}`, x: p.x + a.x, y: p.y + a.y }));
    p.d.bonds.forEach((b) => {
      const A = p.d.atoms[b.a], B = p.d.atoms[b.b];
      out.push({ kind: 'bond', ref: `${m}.${b.a}-${b.b}`, x: p.x + (A.x + B.x) / 2, y: p.y + (A.y + B.y) / 2 });
    });
  });
  return out;
}

/** Erreurs d'une étape (SMILES ou flèches invalides) ; tableau vide si tout va bien. */
export function validateStep(step) {
  const errors = [];
  if (!Array.isArray(step.mols) || !step.mols.length) return ['étape sans espèce'];
  try { buildScene(step); } catch (e) { errors.push(e.message); }
  return errors;
}

/** Schéma « réactifs → produits » avec conditions sur la flèche. */
export function schemeSvg(scheme, { hideProducts = false, hideConditions = false, cls = '' } = {}) {
  const items = [];
  (scheme.reactants || []).forEach((r, i) => { if (i) items.push('+'); items.push(r); });
  items.push({ arrow: hideConditions ? { over: ['?'] } : { over: scheme.over || [], under: scheme.under || [] } });
  if (hideProducts) items.push('t:?');
  else (scheme.products || []).forEach((r, i) => { if (i) items.push('+'); items.push(r); });
  const L = layoutRow(items, { gap: 16, pad: 10 });
  return `<svg class="scene scheme ${cls}" viewBox="0 0 ${L.w} ${L.h}" width="${L.w}" height="${L.h}" data-w="${L.w}" role="img">${rowSvg(L)}</svg>`;
}

/**
 * Correction automatique de flèches tracées à la main.
 * strokes : [[{x,y},...], ...] en coordonnées de scène. Une flèche attendue est validée si un trait
 * part près de sa source et finit près de sa cible (tolérance `tol`).
 */
export function matchInkArrows(scene, strokes, tol = 13) {
  const used = new Set();
  const near = (p, q, t) => Math.hypot(p.x - q.x, p.y - q.y) <= t;
  const results = scene.arrows.map((a) => {
    const idx = strokes.findIndex((s, i) => !used.has(i) && s.length > 1 && near(s[0], a.p0, tol + (a.p0.r || 0) / 2) && near(s[s.length - 1], a.p1, tol + (a.p1.r || 0) / 2));
    if (idx >= 0) used.add(idx);
    return idx >= 0;
  });
  const drawn = strokes.filter((s) => s.length > 1).length;
  return { results, found: results.filter(Boolean).length, expected: results.length, extra: drawn - used.size };
}

export { isText };
