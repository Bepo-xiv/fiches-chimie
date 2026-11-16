// Index : toutes les réactions citées dans la fiche de référence, avec lien vers la fiche détaillée quand elle existe.
import { el, fill } from '../ui.js';
import { RX_INDEX } from '../../data/reference-liens.js';
import { REF_PARTS } from '../../data/reference.js';
import { getCard } from '../store.js';
import { fold } from '../search.js';

const PART_NAMES = Object.fromEntries(Object.entries(REF_PARTS).filter(([k]) => k.startsWith('1')).map(([k, v]) => [k.slice(1), v]));
let query = '', onlyLinked = false;

export function renderRefIndex(main) {
  let total = 0, linked = 0;
  for (const s of RX_INDEX) for (const g of s.groups) for (const it of g.items) { total++; if (it.card && getCard(it.card)) linked++; }
  const out = el('div');
  const info = el('p.muted');
  function draw() {
    const q = fold(query);
    let shown = 0;
    const blocks = [];
    let lastPart = '';
    for (const s of RX_INDEX) {
      const groups = s.groups.map((g) => ({ label: g.label, items: g.items.filter((it) => (!q || fold(it.name).includes(q)) && (!onlyLinked || (it.card && getCard(it.card)))) })).filter((g) => g.items.length);
      if (!groups.length) continue;
      const n = groups.reduce((k, g) => k + g.items.length, 0);
      shown += n;
      const part = s.code[0];
      if (part !== lastPart && PART_NAMES[part]) { blocks.push(el('h2.idx-part', {}, `${part}. ${PART_NAMES[part]}`)); lastPart = part; }
      blocks.push(el('details.idx-sec', { open: !!q || onlyLinked }, el('summary', {}, el('strong', {}, s.code.length > 1 ? `${s.code}. ${s.title}` : s.title), el('span.muted', {}, ` ${n}`)),
        groups.map((g) => el('div.idx-group', {}, g.label ? el('div.idx-label', {}, g.label) : null,
          el('div.chips', {}, g.items.map((it) => (it.card && getCard(it.card)
            ? el('a.chip.link', { href: '#/fiche/' + it.card, title: 'Ouvrir la fiche ' + getCard(it.card).name }, it.name)
            : el('span.chip', {}, it.name))))))));
    }
    info.textContent = `${shown} mention${shown > 1 ? 's' : ''} affichée${shown > 1 ? 's' : ''} sur ${total} · ${linked} renvoient à une fiche détaillée (pastilles colorées).`;
    fill(out, blocks.length ? blocks : el('p.muted', {}, 'Aucune réaction ne correspond.'));
  }
  const search = el('input', { type: 'search', placeholder: 'Chercher une réaction (ex. Nazarov, Pictet, Julia)…', value: query, autocapitalize: 'off', autocorrect: 'off', spellcheck: false, oninput: () => { query = search.value; draw(); } });
  const toggle = el('button' + (onlyLinked ? '.on' : ''), { onclick: () => { onlyLinked = !onlyLinked; toggle.classList.toggle('on', onlyLinked); draw(); } }, 'Avec fiche détaillée');
  draw();
  main.append(el('div.page', {}, el('h1', {}, 'Index des réactions'),
    el('p.muted', {}, 'Toutes les réactions citées dans la fiche de référence « Réactions et réactifs inorganiques de la chimie organique », classées comme dans le document (sections A à H, puis index alphabétique I). Une réaction peut apparaître dans plusieurs sections.'),
    el('div.row', { style: { margin: '10px 0' } }, el('div', { style: { flex: '1', minWidth: '240px', maxWidth: '460px' } }, search), toggle), info, out));
}
