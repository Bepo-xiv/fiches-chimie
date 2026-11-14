// Bibliothèque : recherche, filtres, liste des fiches et fiche sélectionnée côte à côte.
import { el, fill, add, toast } from '../ui.js';
import { CATEGORIES, GROUPS } from '../../data/index.js';
import { state, allCards, getCard } from '../store.js';
import { searchCards, allTags } from '../search.js';
import { hasSubstructure, molSvg } from '../chem.js';
import { schemeSvg } from '../mech.js';
import { queue } from '../srs.js';
import { reviewItems } from '../model.js';
import { renderCard } from './card.js';
import { openSketcher } from '../sketcher.js';

const F = { q: '', cat: '', from: '', to: '', tag: '', reagent: '', favOnly: false, sub: '' };
let pane = null, listBox = null, detail = null, countBox = null, subChip = null, observer = null;

function select(label, value, options, onchange) {
  const s = el('select', { 'aria-label': label, onchange: () => onchange(s.value) },
    el('option', { value: '' }, label), options.map(([v, t]) => el('option', { value: v, selected: v === value }, t)));
  return s;
}

function matches() {
  let cards = searchCards(allCards(), { ...F, favs: state.fav });
  if (F.sub) cards = cards.filter((c) => [...c.scheme.reactants, ...c.scheme.products].some((s) => hasSubstructure(s, F.sub)));
  return cards;
}

function buildList(selectedId) {
  const cards = matches();
  countBox.textContent = `${cards.length} fiche${cards.length > 1 ? 's' : ''}`;
  observer?.disconnect();
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      observer.unobserve(e.target);
      const c = getCard(e.target.dataset.id);
      try { e.target.innerHTML = schemeSvg({ ...c.scheme, over: [], under: [] }); } catch { e.target.textContent = ''; }
    }
  }, { root: listBox, rootMargin: '300px' });
  const items = cards.map((c) => {
    const thumb = el('div.thumb', { 'data-id': c.id });
    observer.observe(thumb);
    return el('a.item' + (c.id === selectedId ? '.on' : ''), { href: `#/fiche/${c.id}`, 'data-id': c.id },
      el('div.item-head', {}, el('span.dot', { style: { background: (CATEGORIES[c.cat] || CATEGORIES.perso).color } }), el('span.item-name', {}, c.name),
        state.fav[c.id] ? el('span.star', {}, '★') : null),
      thumb,
      el('div.item-tags', {}, (CATEGORIES[c.cat] || CATEGORIES.perso).name, c.conf === 'basse' ? ' · à vérifier' : '', c.custom ? ' · perso' : ''));
  });
  fill(listBox, ...(items.length ? items : [el('p.muted.pad', {}, 'Aucune fiche ne correspond à ces critères.')]));
}

function refreshSub() {
  fill(subChip);
  if (!F.sub) return;
  add(subChip, el('span.chip.sub', {}, el('span', { html: molSvg(F.sub, { cls: 'mol mini' }) }), 'sous-structure',
    el('button.icon', { 'aria-label': 'Retirer le filtre', onclick: () => { F.sub = ''; refreshSub(); buildList(); } }, '✕')));
}

function welcome() {
  const cards = allCards();
  const ids = cards.flatMap(reviewItems);
  const due = queue(ids, state.srs, Date.now(), { limitNew: 0 }).length;
  const byCat = Object.entries(CATEGORIES).map(([k, c]) => [k, c, cards.filter((x) => x.cat === k).length]).filter((x) => x[2]);
  return el('div.welcome', {},
    el('h1', {}, 'Fiches de chimie organique'),
    el('p.lead', {}, `${cards.length} réactions, mécanismes animés, révision au Pencil.`),
    el('div.tiles', {},
      el('a.tile', { href: '#/reviser' }, el('strong', {}, String(due)), 'révisions dues'),
      el('a.tile', { href: '#/carte' }, el('strong', {}, String(Object.keys(GROUPS).length)), 'groupes sur la carte'),
      el('a.tile', { href: '#/editer/nouveau' }, el('strong', {}, '+'), 'nouvelle fiche')),
    el('h3', {}, 'Catégories'),
    el('div.cat-grid', {}, byCat.map(([k, c, n]) => el('button.cat-tile', { style: { '--c': c.color }, onclick: () => { F.cat = k; rerender(); } }, el('strong', {}, c.name), el('span', {}, `${n} fiche${n > 1 ? 's' : ''}`)))));
}

const rerender = () => { pane = null; window.dispatchEvent(new HashChangeEvent('hashchange')); };

function mount() {
  const cards = allCards();
  const groupOpts = (key) => Object.entries(GROUPS).filter(([g]) => cards.some((c) => (c[key] || []).includes(g))).map(([g, v]) => [g, v.name]).sort((a, b) => a[1].localeCompare(b[1], 'fr'));
  const search = el('input.search', { type: 'search', placeholder: 'Nom, réactif, mot-clé…', value: F.q, autocapitalize: 'off', autocorrect: 'off', spellcheck: false,
    oninput: () => { F.q = search.value; buildList(); } });
  countBox = el('span.muted.count');
  subChip = el('div');
  listBox = el('div.list');
  detail = el('section.detail-pane');
  const filters = el('div.filters', {},
    select('Catégorie', F.cat, Object.entries(CATEGORIES).map(([k, c]) => [k, c.name]), (v) => { F.cat = v; buildList(); }),
    select('Groupe de départ', F.from, groupOpts('from'), (v) => { F.from = v; buildList(); }),
    select('Groupe d’arrivée', F.to, groupOpts('to'), (v) => { F.to = v; buildList(); }),
    select('Tag', F.tag, allTags(cards).map((t) => [t.tag, `${t.tag} (${t.n})`]), (v) => { F.tag = v; buildList(); }),
    el('input', { type: 'search', placeholder: 'Réactif (ex. NaBH₄, Pd)', value: F.reagent, 'aria-label': 'Réactif', autocapitalize: 'off', autocorrect: 'off', spellcheck: false,
      oninput: (e) => { F.reagent = e.target.value; buildList(); } }),
    el('div.row', {},
      el('button' + (F.favOnly ? '.on' : ''), { onclick: (e) => { F.favOnly = !F.favOnly; e.target.classList.toggle('on', F.favOnly); buildList(); } }, '★ Favoris'),
      el('button', { onclick: async () => {
        const s = await openSketcher({ smiles: F.sub, title: 'Recherche par sous-structure' });
        if (s == null) return;
        F.sub = s; refreshSub(); buildList();
        if (s) toast('Filtre par sous-structure appliqué');
      } }, 'Sous-structure…'),
      el('button', { onclick: () => { Object.assign(F, { q: '', cat: '', from: '', to: '', tag: '', reagent: '', favOnly: false, sub: '' }); rerender(); } }, 'Réinitialiser')));
  const details = el('details.filter-box', { open: !!(F.cat || F.from || F.to || F.tag || F.reagent || F.favOnly) }, el('summary', {}, 'Filtres'), filters);
  pane = el('div.split', {},
    el('aside.list-pane', {}, el('div.list-top', {}, search, details, subChip, el('div.row.between', {}, countBox, el('a.button.small', { href: '#/editer/nouveau' }, '+ Fiche'))), listBox),
    detail);
  refreshSub();
}

export function renderLibrary(main, { id, query }) {
  let rebuilt = false;
  if (query.tag !== undefined && query.tag !== F.tag) { F.tag = query.tag; pane = null; }
  if (!pane || main.dataset.dirty === '1') { pane = null; mount(); rebuilt = true; delete main.dataset.dirty; }
  if (pane.parentNode !== main) fill(main, pane);
  if (rebuilt) buildList(id);
  for (const a of listBox.querySelectorAll('.item')) a.classList.toggle('on', a.dataset.id === id);
  pane.classList.toggle('has-detail', !!id);
  const card = id ? getCard(id) : null;
  if (id && !card) fill(detail, el('p.pad', {}, 'Fiche introuvable.'));
  else if (card) {
    fill(detail, el('a.back', { href: '#/' }, '‹ Fiches'), renderCard(card, { onChange: () => { const y = listBox.scrollTop; buildList(id); listBox.scrollTop = y; } }));
    detail.scrollTop = 0;
    listBox.querySelector('.item.on')?.scrollIntoView({ block: 'nearest' });
  } else fill(detail, welcome());
}

/** À appeler quand les fiches changent (édition, restauration) pour reconstruire la liste. */
export function invalidateLibrary() { pane = null; }
