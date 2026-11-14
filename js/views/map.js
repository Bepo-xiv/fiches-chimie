// Carte interactive : groupes fonctionnels (nœuds), réactions (liens), recherche de chemins de synthèse.
import { el, fill, add } from '../ui.js';
import { GROUPS } from '../../data/index.js';
import { allCards, getCard } from '../store.js';
import { buildGraph, findPaths, reactionsFrom, reactionsTo, rng } from '../search.js';
import { schemeSvg } from '../mech.js';

const NS = 'http://www.w3.org/2000/svg';

/** Disposition par forces, déterministe (même carte à chaque ouverture). */
export function layout(nodes, links, { w = 1000, h = 760, iter = 300 } = {}) {
  const rand = rng(7);
  const pos = {};
  nodes.forEach((n, i) => {
    const a = (i / nodes.length) * 2 * Math.PI;
    pos[n] = { x: Math.cos(a) * 300 + rand() * 20, y: Math.sin(a) * 300 + rand() * 20, dx: 0, dy: 0 };
  });
  const k = 150;
  for (let it = 0; it < iter; it++) {
    const temp = 60 * (1 - it / iter) + 0.5;
    for (const a of nodes) { pos[a].dx = -pos[a].x * 0.01; pos[a].dy = -pos[a].y * 0.01; }
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const p = pos[nodes[i]], q = pos[nodes[j]];
      const dx = p.x - q.x, dy = p.y - q.y, d = Math.max(8, Math.hypot(dx, dy)), f = (k * k) / d;
      p.dx += (dx / d) * f; p.dy += (dy / d) * f; q.dx -= (dx / d) * f; q.dy -= (dy / d) * f;
    }
    for (const [a, b] of links) {
      const p = pos[a], q = pos[b];
      const dx = q.x - p.x, dy = q.y - p.y, d = Math.max(1, Math.hypot(dx, dy)), f = (d * d) / k / 22;
      p.dx += (dx / d) * f; p.dy += (dy / d) * f; q.dx -= (dx / d) * f; q.dy -= (dy / d) * f;
    }
    for (const a of nodes) {
      const p = pos[a], s = Math.hypot(p.dx, p.dy) || 1;
      p.x += (p.dx / s) * Math.min(s, temp); p.y += (p.dy / s) * Math.min(s, temp);
    }
  }
  // Mise à l'échelle dans le cadre.
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const n of nodes) { const p = pos[n]; x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); }
  for (const n of nodes) {
    const p = pos[n];
    pos[n] = { x: 70 + ((p.x - x0) / (x1 - x0 || 1)) * (w - 140), y: 55 + ((p.y - y0) / (y1 - y0 || 1)) * (h - 110) };
  }
  return pos;
}

/** Liste de fiches avec vignette du schéma. */
export function rxList(ids) {
  return [...new Set(ids)].map((id) => {
    const c = getCard(id);
    if (!c) return null;
    let svg = '';
    try { svg = schemeSvg(c.scheme); } catch { /* vignette indisponible */ }
    return el('a.rx-row', { href: '#/fiche/' + id }, el('strong', {}, c.name), el('div', { html: svg }));
  });
}

export function pathBox(path) {
  return el('div.path-box', {}, el('strong', {}, `${path.length} étape${path.length > 1 ? 's' : ''}`), path.map((s) => el('div.path-step', {},
    el('span.chip', {}, GROUPS[s.from]?.name || s.from), '→', el('span.chip', {}, GROUPS[s.to]?.name || s.to), ':',
    s.ids.slice(0, 4).map((id) => el('a.chip.link', { href: '#/fiche/' + id }, (getCard(id)?.name || id).split(' (')[0])),
    s.ids.length > 4 ? el('span.muted', {}, `+${s.ids.length - 4}`) : null)));
}

export function renderMap(main) {
  const edges = buildGraph(allCards());
  const nodes = Object.keys(GROUPS).filter((g) => edges.some((e) => e.from === g || e.to === g));
  const pair = new Map();
  for (const e of edges) { const key = e.from + '>' + e.to; pair.set(key, (pair.get(key) || 0) + 1); }
  const links = [...pair.entries()].map(([key, n]) => [...key.split('>'), n]);
  const W = 1000, H = 760;
  const pos = layout(nodes, links, { w: W, h: H });
  let A = null, B = null, view = { x: 0, y: 0, w: W, h: H };

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'map');
  const side = el('aside');
  const wrap = el('div.map-wrap', {}, el('div', { style: { minHeight: 0, position: 'relative' } }, svg,
    el('div.row', { style: { position: 'absolute', right: '10px', bottom: '10px' } },
      el('button', { 'aria-label': 'Zoom avant', onclick: () => zoom(0.8) }, '+'), el('button', { 'aria-label': 'Zoom arrière', onclick: () => zoom(1.25) }, '−'),
      el('button', { onclick: () => { view = { x: 0, y: 0, w: W, h: H }; draw(); } }, 'Recentrer'))), side);

  function zoom(f, cx = view.x + view.w / 2, cy = view.y + view.h / 2) {
    const w = Math.max(250, Math.min(W * 1.6, view.w * f)), h = (w * H) / W;
    view = { x: cx - (cx - view.x) * (w / view.w), y: cy - (cy - view.y) * (h / view.h), w, h };
    draw();
  }

  function draw() {
    svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
    const paths = A && B ? findPaths(edges, A, B) : [];
    const onPath = new Set();
    for (const p of paths.slice(0, 3)) for (const s of p) onPath.add(s.from + '>' + s.to);
    const near = new Set();
    if (A && !B) for (const e of edges) { if (e.from === A) near.add(e.to); if (e.to === A) near.add(e.from); }
    let s = '<defs><marker id="mk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>';
    for (const [a, b, n] of links) {
      const p = pos[a], q = pos[b];
      const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1;
      const ox = (-dy / d) * 14, oy = (dx / d) * 14; // courbure : sépare aller et retour
      const x1 = p.x + (dx / d) * 30, y1 = p.y + (dy / d) * 30, x2 = q.x - (dx / d) * 32, y2 = q.y - (dy / d) * 32;
      const cls = onPath.has(a + '>' + b) ? 'edge path' : A && !B && (a === A || b === A) ? 'edge hl' : 'edge';
      s += `<path class="${cls}" marker-end="url(#mk)" stroke-width="${cls === 'edge' ? Math.min(3.5, 0.8 + n * 0.35) : 3}" d="M${x1} ${y1}Q${(x1 + x2) / 2 + ox} ${(y1 + y2) / 2 + oy} ${x2} ${y2}"/>`;
    }
    for (const n of nodes) {
      const p = pos[n];
      const dim = (A && !B && n !== A && !near.has(n)) || (A && B && paths.length && n !== A && n !== B && ![...onPath].some((k) => k.split('>').includes(n)));
      const words = GROUPS[n].name.split(/[ /]+/);
      const lines = words.length > 2 ? [words.slice(0, 2).join(' '), words.slice(2).join(' ')] : words.length === 2 && GROUPS[n].name.length > 13 ? words : [GROUPS[n].name];
      s += `<g class="node${n === A ? ' a' : ''}${n === B ? ' b' : ''}${dim ? ' dim' : ''}" data-n="${n}"><circle cx="${p.x}" cy="${p.y}" r="30"/>`
        + lines.map((l, i) => `<text x="${p.x}" y="${p.y + 4 + (i - (lines.length - 1) / 2) * 12}">${l.replace(/&/g, '&amp;')}</text>`).join('') + '</g>';
    }
    svg.innerHTML = s;
    drawSide(paths);
  }

  function drawSide(paths) {
    const name = (g) => GROUPS[g]?.name || g;
    if (!A) {
      fill(side, el('h2', {}, 'Carte des réactions'), el('p.muted', {}, 'Touche un groupe fonctionnel pour voir les réactions qui en partent et qui y mènent. Touche-en un second pour chercher un chemin de synthèse entre les deux.'),
        el('p.muted', {}, `${nodes.length} groupes, ${links.length} transformations distinctes.`));
      return;
    }
    const reset = el('button.small', { onclick: () => { A = B = null; draw(); } }, 'Effacer la sélection');
    if (!B) {
      const out = reactionsFrom(edges, A), inn = reactionsTo(edges, A);
      fill(side, el('h2', {}, name(A)), reset, el('p.muted', {}, 'Touche un second groupe pour chercher un chemin.'),
        el('h3', {}, `Réactions qui y mènent (${new Set(inn.map((e) => e.id)).size})`), rxList(inn.map((e) => e.id)),
        el('h3', {}, `Réactions qui en partent (${new Set(out.map((e) => e.id)).size})`), rxList(out.map((e) => e.id)));
      return;
    }
    fill(side, el('h2', {}, `${name(A)} → ${name(B)}`), el('div.row', {}, reset, el('button.small', { onclick: () => { [A, B] = [B, A]; draw(); } }, 'Inverser le sens')),
      paths.length ? el('p.muted', {}, `${paths.length} chemin${paths.length > 1 ? 's' : ''} trouvé${paths.length > 1 ? 's' : ''} (4 étapes au plus), du plus court au plus long.`) : el('p', {}, 'Aucun chemin trouvé avec les fiches actuelles.'),
      paths.map(pathBox),
      el('p.muted', {}, 'Suggestions fondées sur les groupes fonctionnels des fiches : elles ne tiennent pas compte de la compatibilité du reste de la molécule.'));
  }

  // Sélection, déplacement et zoom
  let drag = null;
  const pointers = new Map();
  const toSvg = (e) => { const r = svg.getBoundingClientRect(); const k = Math.max(view.w / r.width, view.h / r.height); return { k, x: view.x + view.w / 2 + (e.clientX - r.left - r.width / 2) * k, y: view.y + view.h / 2 + (e.clientY - r.top - r.height / 2) * k }; };
  svg.addEventListener('pointerdown', (e) => {
    pointers.set(e.pointerId, [e.clientX, e.clientY]);
    svg.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY, moved: false, node: e.target.closest?.('.node')?.dataset.n || null, dist: 0 };
  });
  svg.addEventListener('pointermove', (e) => {
    if (!pointers.has(e.pointerId) || !drag) return;
    const prev = pointers.get(e.pointerId);
    pointers.set(e.pointerId, [e.clientX, e.clientY]);
    const { k } = toSvg(e);
    if (pointers.size === 2) {
      const [p1, p2] = [...pointers.values()];
      const d = Math.hypot(p1[0] - p2[0], p1[1] - p2[1]);
      if (drag.dist) { const c = toSvg({ clientX: (p1[0] + p2[0]) / 2, clientY: (p1[1] + p2[1]) / 2 }); zoom(drag.dist / d, c.x, c.y); }
      drag.dist = d; drag.moved = true;
      return;
    }
    if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) drag.moved = true;
    if (drag.moved) { view.x -= (e.clientX - prev[0]) * k; view.y -= (e.clientY - prev[1]) * k; svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`); }
  });
  const end = (e) => {
    pointers.delete(e.pointerId);
    if (!drag) return;
    if (!drag.moved && drag.node && e.type === 'pointerup') {
      const n = drag.node;
      if (!A || (A && B)) { A = n; B = null; } else if (n === A) { A = null; } else B = n;
      draw();
    }
    if (!pointers.size) drag = null; else drag.dist = 0;
  };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);
  svg.addEventListener('wheel', (e) => { e.preventDefault(); const c = toSvg(e); zoom(e.deltaY > 0 ? 1.12 : 0.89, c.x, c.y); }, { passive: false });

  add(main, wrap);
  draw();
}
