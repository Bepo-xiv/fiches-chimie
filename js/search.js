// search.js — recherche et filtres sur les fiches (pur), graphe des groupes fonctionnels.

export const fold = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const condText = (c) => Object.values(c.cond || {}).flat().join(' ');

/** Score de pertinence d'une fiche pour une requête textuelle (0 = pas de correspondance). */
export function score(card, q) {
  const words = fold(q).split(/\s+/).filter(Boolean);
  if (!words.length) return 1;
  const name = fold(card.name), aka = fold((card.aka || []).join(' ')), tags = fold((card.tags || []).join(' '));
  const reag = fold([...(card.scheme?.over || []), ...(card.scheme?.under || []), condText(card)].join(' '));
  const rest = fold([card.stereo, card.select, card.appli, ...(card.pieges || []), ...(card.data || []), ...(card.from || []), ...(card.to || [])].join(' '));
  let total = 0;
  for (const w of words) {
    let s = 0;
    if (name.startsWith(w)) s = 12;
    else if (name.includes(w)) s = 10;
    else if (aka.includes(w)) s = 8;
    else if (tags.includes(w)) s = 6;
    else if (reag.includes(w)) s = 4;
    else if (rest.includes(w)) s = 1;
    if (!s) return 0;
    total += s;
  }
  return total;
}

/** Filtre + tri. filters : { q, cat, from, to, tag, favOnly, favs, reagent, custom } */
export function searchCards(cards, f = {}) {
  const out = [];
  for (const c of cards) {
    if (f.cat && c.cat !== f.cat) continue;
    if (f.from && !(c.from || []).includes(f.from)) continue;
    if (f.to && !(c.to || []).includes(f.to)) continue;
    if (f.tag && !(c.tags || []).includes(f.tag)) continue;
    if (f.favOnly && !(f.favs && f.favs[c.id])) continue;
    if (f.custom && !c.custom) continue;
    if (f.reagent) {
      const r = fold(f.reagent);
      if (!fold([...(c.scheme?.over || []), ...(c.scheme?.under || []), condText(c)].join(' ')).includes(r)) continue;
    }
    const s = score(c, f.q || '');
    if (s > 0) out.push({ c, s });
  }
  out.sort((a, b) => b.s - a.s || a.c.name.localeCompare(b.c.name, 'fr'));
  return out.map((x) => x.c);
}

export function allTags(cards) {
  const m = new Map();
  for (const c of cards) for (const t of c.tags || []) m.set(t, (m.get(t) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr')).map(([t, n]) => ({ tag: t, n }));
}

/** Arêtes du graphe : une par couple (groupe de départ, groupe d'arrivée) de chaque fiche. */
export function buildGraph(cards) {
  const edges = [];
  for (const c of cards) for (const a of c.from || []) for (const b of c.to || []) if (a !== b) edges.push({ from: a, to: b, id: c.id });
  return edges;
}

export const reactionsTo = (edges, fg) => edges.filter((e) => e.to === fg);
export const reactionsFrom = (edges, fg) => edges.filter((e) => e.from === fg);

/**
 * Chemins de synthèse entre deux groupes fonctionnels, du plus court au plus long.
 * Retour : [[{from,to,ids:[fiches possibles]}, ...], ...]
 */
export function findPaths(edges, start, goal, { maxLen = 4, maxPaths = 12 } = {}) {
  if (start === goal) return [];
  const adj = new Map();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, new Map());
    const m = adj.get(e.from);
    if (!m.has(e.to)) m.set(e.to, []);
    if (!m.get(e.to).includes(e.id)) m.get(e.to).push(e.id);
  }
  const results = [];
  let frontier = [[start]];
  for (let len = 1; len <= maxLen && results.length < maxPaths; len++) {
    const next = [];
    for (const path of frontier) {
      const last = path[path.length - 1];
      for (const [to] of adj.get(last) || []) {
        if (path.includes(to)) continue;
        const p = [...path, to];
        if (to === goal) results.push(p); else next.push(p);
      }
    }
    frontier = next;
  }
  return results.slice(0, maxPaths).map((p) => p.slice(1).map((to, i) => ({ from: p[i], to, ids: adj.get(p[i]).get(to) })));
}

/** Tirage pseudo-aléatoire déterministe (pour quiz reproductibles en test). */
export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

export function shuffle(arr, rand = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Choisit n distracteurs distincts (par clé) parmi `pool`, en préférant la même catégorie. */
export function distractors(card, pool, keyOf, n = 3, rand = Math.random) {
  const own = keyOf(card);
  const seen = new Set([own]);
  const pick = [];
  const ordered = [...shuffle(pool.filter((c) => c.cat === card.cat), rand), ...shuffle(pool.filter((c) => c.cat !== card.cat), rand)];
  for (const c of ordered) {
    if (c.id === card.id) continue;
    const k = keyOf(c);
    if (k == null || k === '' || seen.has(k)) continue;
    seen.add(k);
    pick.push(c);
    if (pick.length === n) break;
  }
  return pick;
}
