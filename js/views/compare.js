// Comparaison de deux fiches côte à côte.
import { el, fill, add } from '../ui.js';
import { allCards, getCard } from '../store.js';
import { renderCard } from './card.js';

export function renderCompare(main, { args }) {
  const cards = allCards().slice().sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  let [a, b] = args;
  if (!getCard(a)) a = cards[0]?.id;
  if (!getCard(b)) b = getCard(a)?.analogues?.find((x) => getCard(x)) || cards.find((c) => c.id !== a)?.id;
  const picker = (value, onchange) => {
    const s = el('select', { 'aria-label': 'Fiche à comparer', onchange: () => onchange(s.value) }, cards.map((c) => el('option', { value: c.id, selected: c.id === value }, c.name)));
    return s;
  };
  const go = () => { location.hash = `#/comparer/${a}/${b}`; };
  const col = (id) => el('div', {}, getCard(id) ? renderCard(getCard(id), { compact: true }) : el('p.pad', {}, 'Fiche introuvable'));
  add(main, 
    el('div.compare-bar', {}, el('a.button.small', { href: '#/fiche/' + a }, '‹ Retour'), picker(a, (v) => { a = v; go(); }), picker(b, (v) => { b = v; go(); })),
    el('div.compare', {}, col(a), col(b)));
}
