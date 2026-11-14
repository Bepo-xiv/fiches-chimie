// Aide à la rétrosynthèse : quelles réactions mènent à ce groupe fonctionnel ? Chemins entre deux groupes.
import { el, fill, add, toast } from '../ui.js';
import { GROUPS } from '../../data/index.js';
import { allCards } from '../store.js';
import { buildGraph, findPaths, reactionsTo } from '../search.js';
import { hasSubstructure, molSvg } from '../chem.js';
import { openSketcher } from '../sketcher.js';
import { rxList, pathBox } from './map.js';

/** Groupes fonctionnels détectés dans une molécule (motifs de sous-structure, approximatif). */
export function detectGroups(smiles) {
  return Object.entries(GROUPS).filter(([, g]) => g.q && hasSubstructure(smiles, g.q)).map(([id]) => id);
}

export function renderRetro(main, { args }) {
  const edges = buildGraph(allCards());
  const targets = Object.keys(GROUPS).filter((g) => edges.some((e) => e.to === g)).sort((a, b) => GROUPS[a].name.localeCompare(GROUPS[b].name, 'fr'));
  const starts = Object.keys(GROUPS).filter((g) => edges.some((e) => e.from === g)).sort((a, b) => GROUPS[a].name.localeCompare(GROUPS[b].name, 'fr'));
  let target = GROUPS[args[0]] ? args[0] : '', start = '', drawn = '';
  const page = el('div.page');
  const out = el('div');

  function results() {
    fill(out);
    if (!target) { add(out, el('p.muted', {}, 'Choisis le groupe fonctionnel à construire, ou dessine la molécule cible.')); return; }
    const inn = reactionsTo(edges, target);
    if (start && start !== target) {
      const paths = findPaths(edges, start, target);
      add(out, el('h2', {}, `De « ${GROUPS[start].name} » à « ${GROUPS[target].name} »`),
        paths.length ? paths.map(pathBox) : el('p', {}, 'Aucun chemin trouvé en 4 étapes avec les fiches actuelles.'));
    }
    const byFrom = new Map();
    for (const e of inn) { if (!byFrom.has(e.from)) byFrom.set(e.from, []); byFrom.get(e.from).push(e.id); }
    add(out, el('h2', {}, `Réactions qui forment : ${GROUPS[target].name}`), el('div', { html: molSvg(GROUPS[target].smi) }));
    if (!byFrom.size) add(out, el('p.muted', {}, 'Aucune fiche ne mène à ce groupe.'));
    for (const [from, ids] of [...byFrom.entries()].sort((a, b) => b[1].length - a[1].length)) {
      add(out, el('h3', {}, `À partir de : ${GROUPS[from]?.name || from}`), ...rxList(ids));
    }
    add(out, el('p.muted', {}, 'Aide indicative : vérifie sur chaque fiche la compatibilité des autres groupes présents dans ta molécule.'));
  }

  function controls() {
    const chips = el('div.multi', {}, targets.map((g) => el('button' + (g === target ? '.on' : ''), { onclick: () => { target = g; history.replaceState(null, '', '#/retro/' + g); draw(); } }, GROUPS[g].name)));
    const sel = el('select', { 'aria-label': 'Groupe de départ', onchange: () => { start = sel.value; results(); } },
      el('option', { value: '' }, 'Sans point de départ imposé'), starts.map((g) => el('option', { value: g, selected: g === start }, 'Départ : ' + GROUPS[g].name)));
    const drawBtn = el('button', { onclick: async () => {
      const s = await openSketcher({ smiles: drawn, title: 'Dessine la molécule cible' });
      if (!s) return;
      drawn = s;
      const found = detectGroups(s).filter((g) => targets.includes(g));
      if (!found.length) { toast('Aucun groupe fonctionnel reconnu'); draw(); return; }
      target = found.includes(target) ? target : found[0];
      draw(found);
    } }, 'Dessiner la molécule cible…');
    return { chips, sel, drawBtn };
  }

  function draw(found) {
    const c = controls();
    fill(page, el('h1', {}, 'Aide à la rétrosynthèse'),
      el('div.set-block', {}, el('h3', { style: { marginTop: 0 } }, 'Groupe fonctionnel à former'), c.chips,
        el('div.row', { style: { marginTop: '10px' } }, c.drawBtn, el('div', { style: { minWidth: '260px' } }, c.sel)),
        drawn ? el('div', { style: { marginTop: '10px' } }, el('div', { html: molSvg(drawn) }),
          el('p.muted', {}, 'Groupes reconnus : ', (found || detectGroups(drawn)).map((g) => GROUPS[g].name).join(', ') || 'aucun')) : null),
      out);
    results();
  }
  draw();
  add(main, page);
}
