// Réactifs : une fiche par réactif cité dans la fiche de référence (ce qu'il fait, quand l'utiliser, réactions liées).
import { el, fill } from '../ui.js';
import { REACTIFS } from '../../data/reactifs.js';
import { getCard } from '../store.js';
import { fold } from '../search.js';

const F = { q: '', fam: '' };
const FAMILIES = [...new Set(REACTIFS.map((r) => r.fam))];

function matches() {
  const words = fold(F.q).split(/\s+/).filter(Boolean);
  return REACTIFS.filter((r) => {
    if (F.fam && r.fam !== F.fam) return false;
    if (!words.length) return true;
    const names = fold([r.name, ...r.aliases].join(' ')), rest = fold(r.what + ' ' + r.when + ' ' + r.fam);
    return words.every((w) => names.includes(w) || rest.includes(w));
  }).sort((a, b) => {
    if (!words.length) return 0;
    const sa = fold([a.name, ...a.aliases].join(' ')).includes(words[0]) ? 0 : 1, sb = fold([b.name, ...b.aliases].join(' ')).includes(words[0]) ? 0 : 1;
    return sa - sb;
  });
}

function detailView(r) {
  if (!r) {
    return el('div.welcome', {}, el('h1', {}, 'Réactifs'),
      el('p.lead', {}, `${REACTIFS.length} fiches couvrant tous les réactifs cités dans la fiche de référence « Réactions et réactifs inorganiques de la chimie organique ».`),
      el('p.muted', {}, 'Chaque fiche indique ce que fait le réactif, dans quel contexte le choisir, et renvoie aux fiches réactions concernées. Les sels jumeaux (même anion, cation différent) et les variantes isotopiques partagent une fiche. Usages rédigés de mémoire : à vérifier avant toute manipulation.'),
      el('h3', {}, 'Familles'),
      el('div.cat-grid', {}, FAMILIES.map((f) => el('button.cat-tile', { style: { '--c': 'var(--accent)' }, onclick: () => { F.fam = f; location.hash = '#/reactifs'; window.dispatchEvent(new HashChangeEvent('hashchange')); } },
        el('strong', {}, f), el('span', {}, `${REACTIFS.filter((r) => r.fam === f).length} fiches`)))));
  }
  const cards = r.cards.map((id) => getCard(id)).filter(Boolean);
  return el('article.card-view', {},
    el('a.back', { href: '#/reactifs' }, '‹ Réactifs'),
    el('header.card-head', {}, el('div.card-title', {}, el('h1', {}, r.name)),
      r.aliases.length ? el('p.aka', {}, 'Regroupe aussi : ', r.aliases.join(' · ')) : null,
      el('div.chips', {}, el('span.chip.cat', { style: { '--c': 'var(--accent)' } }, r.fam))),
    el('section.sec.sec-principe', {}, el('h2', {}, 'Ce qu’il fait'), el('p', {}, r.what)),
    el('section.sec.sec-points', {}, el('h2', {}, 'Quand l’utiliser'), el('p', {}, r.when)),
    cards.length ? el('section.sec.sec-mecanisme', {}, el('h2', {}, 'Fiches réactions liées'), el('div.chips', {}, cards.map((c) => el('a.chip.link', { href: '#/fiche/' + c.id }, c.name)))) : null,
    el('footer.card-foot', {}, r.cited?.length ? el('p.muted', {}, 'Cité dans la fiche de référence : ', r.cited.join(' ; '), '.') : null,
      el('p.muted', {}, 'Fiche de révision : consulter la fiche de données de sécurité et la littérature avant usage.')));
}

export function renderReagents(main, { args }) {
  const selected = REACTIFS.find((r) => r.id === args[0]) || null;
  const listBox = el('div.list');
  const count = el('span.muted.count');
  const draw = () => {
    const list = matches();
    count.textContent = `${list.length} fiche${list.length > 1 ? 's' : ''}`;
    let lastFam = null;
    fill(listBox, list.length ? list.map((r) => {
      const head = !F.q && r.fam !== lastFam ? el('div.fam-head', {}, r.fam) : null;
      lastFam = r.fam;
      return [head, el('a.item' + (selected?.id === r.id ? '.on' : ''), { href: '#/reactifs/' + r.id },
        el('div.item-head', {}, el('span.item-name', {}, r.name)),
        el('div.item-tags', {}, r.aliases.length ? r.aliases.slice(0, 4).join(' · ') + (r.aliases.length > 4 ? ' …' : '') : r.what.slice(0, 70) + '…'))];
    }) : el('p.muted.pad', {}, 'Aucun réactif ne correspond.'));
  };
  const search = el('input.search', { type: 'search', placeholder: 'Formule, nom, usage (ex. NaBH₄, Lindlar, époxydation)…', value: F.q, autocapitalize: 'off', autocorrect: 'off', spellcheck: false, oninput: () => { F.q = search.value; draw(); } });
  const fam = el('select', { 'aria-label': 'Famille', onchange: () => { F.fam = fam.value; draw(); } }, el('option', { value: '' }, 'Toutes les familles'), FAMILIES.map((f) => el('option', { value: f, selected: f === F.fam }, f)));
  draw();
  main.append(el('div.split' + (selected ? '.has-detail' : ''), {},
    el('aside.list-pane', {}, el('div.list-top', {}, search, fam, count), listBox),
    el('section.detail-pane', {}, detailView(selected))));
  listBox.querySelector('.item.on')?.scrollIntoView({ block: 'center' });
}
