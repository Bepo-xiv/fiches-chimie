// Mémo : table de pKa et abréviations, avec filtre.
import { el, fill, add } from '../ui.js';
import { PKA, ABBR } from '../../data/memo.js';
import { fold } from '../search.js';

export function renderMemo(main) {
  const q = el('input', { type: 'search', placeholder: 'Filtrer (ex. LDA, alcyne, 25)…', autocapitalize: 'off', autocorrect: 'off', spellcheck: false, oninput: () => draw() });
  const out = el('div');
  const table = (head, rows) => el('table.memo', {}, el('thead', {}, el('tr', {}, head.map((h) => el('th', {}, h)))), el('tbody', {}, rows.map((r) => el('tr', {}, r.map((c) => el('td', {}, c))))));
  function draw() {
    const f = fold(q.value);
    const keep = (r) => !f || fold(r.join(' ')).includes(f);
    fill(out, 
      el('h2', {}, 'pKa usuels'), el('p.muted', {}, 'Valeurs approximatives (eau, sauf mention), à vérifier. Une base déprotone quantitativement un acide dont le pKa est inférieur d’au moins 2 à 3 unités à celui de son acide conjugué.'),
      table(['Acide', 'pKa', 'Remarque'], PKA.filter(keep)),
      el('h2', { style: { marginTop: '22px' } }, 'Réactifs et abréviations'), table(['Sigle', 'Nom', 'Usage'], ABBR.filter(keep)));
  }
  draw();
  add(main, el('div.page', {}, el('h1', {}, 'Mémo'), el('div', { style: { margin: '10px 0 14px', maxWidth: '420px' } }, q), out));
}
