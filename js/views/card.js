// Vue d'une fiche : principe, mécanisme animé, points importants, notes et PDF joints.
import { el, fill, add, esc, toast, pickFile, confirmBox, fmtSize } from '../ui.js';
import { schemeSvg, sceneSvg } from '../mech.js';
import { CATEGORIES, GROUPS, CONFIDENCE } from '../../data/index.js';
import { COND_FIELDS } from '../model.js';
import { state, save, getCard, attachPdf, detachPdf, isBuiltin, isModified } from '../store.js';
import { open3D } from '../viewer3d.js';
import { InkPad, inkToolbar } from '../ink.js';

export const catChip = (cat) => {
  const c = CATEGORIES[cat] || CATEGORIES.perso;
  return el('span.chip.cat', { style: { '--c': c.color } }, c.name);
};

export function confBadge(card) {
  const k = CONFIDENCE[card.conf] ? card.conf : 'basse';
  return el('span.conf.conf-' + k, { title: CONFIDENCE[k] }, k === 'haute' ? 'Confiance élevée' : k === 'moyenne' ? 'Confiance moyenne' : 'À vérifier');
}

/** Lecteur de mécanisme pas à pas : les flèches se tracent une à une. */
export function mechPlayer(card) {
  const steps = card.mech || [];
  const wrap = el('div.mech');
  if (!steps.length) { add(wrap, el('p.muted', {}, 'Aucun mécanisme saisi pour cette fiche.')); return wrap; }
  let step = 0, shown = 0, all = false, timer = null;
  const stage = el('div.stage');
  const title = el('h4.step-title');
  const text = el('p.step-text');
  const dots = el('div.dots');
  const bPrev = el('button', { onclick: () => go(-1) }, '◀ Étape');
  const bNext = el('button.primary', { onclick: () => next() }, 'Suivant ▶');
  const bPlay = el('button', { onclick: () => (timer ? stop() : play()) }, 'Lecture');
  const bAll = el('button', { onclick: () => { all = !all; stop(); render(); } }, 'Tout afficher');
  const controls = el('div.row.mech-controls', {}, bPrev, bNext, bPlay, el('button', { onclick: () => { stop(); shown = 0; render(); } }, 'Rejouer'), el('span.spacer'), bAll);
  const allBox = el('div.mech-all');

  function safeScene(st, opts) {
    try { return sceneSvg(st, opts); } catch (e) { return `<p class="error">Étape invalide : ${esc(e.message)}</p>`; }
  }
  function arrows() { return [...stage.querySelectorAll('.arrow')]; }
  function render() {
    bAll.textContent = all ? 'Pas à pas' : 'Tout afficher';
    for (const n of [stage, title, text, dots, bPrev, bNext, bPlay]) n.hidden = all;
    controls.querySelector('button:nth-child(4)').hidden = all;
    allBox.hidden = !all;
    if (all) {
      fill(allBox, ...steps.map((st, i) => el('div.step-block', {},
        el('h4.step-title', {}, `${i + 1}. ${st.t || ''}`), el('div.stage', { html: safeScene(st, { arrows: 'all', scale: 1.35 }) }), el('p.step-text', {}, st.txt || ''))));
      return;
    }
    const st = steps[step];
    title.textContent = `Étape ${step + 1} / ${steps.length} — ${st.t || ''}`;
    text.textContent = st.txt || '';
    stage.innerHTML = safeScene(st, { arrows: 'step', scale: 1.5 });
    arrows().forEach((a, i) => a.classList.toggle('on', i < shown));
    fill(dots, ...steps.map((_, i) => el('button.dot' + (i === step ? '.on' : ''), { 'aria-label': `Étape ${i + 1}`, onclick: () => { stop(); step = i; shown = 0; render(); } })));
    bPrev.disabled = step === 0;
    updateNext();
  }
  function updateNext() {
    const n = arrows().length;
    bNext.textContent = shown < n ? `Flèche ${shown + 1}/${n} ▶` : step < steps.length - 1 ? 'Étape suivante ▶' : 'Fin';
    bNext.disabled = shown >= n && step >= steps.length - 1;
  }
  function next() {
    const list = arrows();
    if (shown < list.length) { list[shown].classList.add('on'); shown++; updateNext(); return true; }
    if (step < steps.length - 1) { step++; shown = 0; render(); return true; }
    return false;
  }
  function go(d) { stop(); step = Math.max(0, Math.min(steps.length - 1, step + d)); shown = 0; render(); }
  function play() {
    bPlay.textContent = 'Pause';
    if (step === steps.length - 1 && shown >= arrows().length) { step = 0; shown = 0; render(); }
    timer = setInterval(() => { if (!wrap.isConnected || !next()) stop(); }, 1500);
  }
  function stop() { clearInterval(timer); timer = null; bPlay.textContent = 'Lecture'; }
  add(wrap, title, stage, text, dots, allBox, controls);
  render();
  return wrap;
}

const para = (t) => el('p', {}, t);
const list = (items, cls = '') => el('ul' + (cls ? '.' + cls : ''), {}, (items || []).map((t) => el('li', {}, t)));

export function conditionsTable(card) {
  const c = card.cond || {};
  const rows = COND_FIELDS.filter(([k]) => c[k]).map(([k, label]) => el('tr', {}, el('th', {}, label), el('td', {}, c[k])));
  const box = el('div', {}, el('table.cond', {}, el('tbody', {}, rows)));
  if (c.incertain) add(box, el('p.warn', {}, 'Conditions incertaines : ' + c.incertain));
  return box;
}

function notesSection(card) {
  const box = el('div');
  const ta = el('textarea.notes', { placeholder: 'Mes notes sur cette réaction…', value: state.notes[card.id] || '', rows: 4 });
  ta.addEventListener('input', () => { if (ta.value) state.notes[card.id] = ta.value; else delete state.notes[card.id]; save('notes'); });
  add(box, ta);

  // Notes manuscrites
  const key = 'note:' + card.id;
  const det = el('details.ink-notes', { open: !!state.ink[key]?.length }, el('summary', {}, 'Notes manuscrites (Apple Pencil)'));
  const canvas = el('canvas.ink.note-pad');
  let pad = null;
  const mount = () => {
    if (pad) return;
    pad = new InkPad(canvas, { strokes: state.ink[key] || [], fingerDraw: state.settings.fingerDraw, onChange: (s) => { if (s.length) state.ink[key] = s; else delete state.ink[key]; save('ink'); } });
    det.insertBefore(inkToolbar(pad, el), canvas);
  };
  add(det, canvas);
  det.addEventListener('toggle', () => { if (det.open) mount(); });
  if (det.open) setTimeout(mount, 0);
  add(box, det);

  // PDF joints
  const pdfList = el('div.pdf-list');
  const refresh = () => {
    fill(pdfList, ...(state.pdfs[card.id] || []).map((p) => el('div.pdf-item', {},
      el('a', { href: `#/pdf/${p.id}` }, p.name), el('span.muted', {}, fmtSize(p.size || 0)),
      el('button.icon', { 'aria-label': 'Retirer ce PDF', onclick: async () => { if (await confirmBox('Retirer ce PDF ?', `« ${p.name} » et ses annotations seront supprimés de l’appareil.`, 'Retirer')) { await detachPdf(card.id, p.id); refresh(); } } }, '✕'))));
  };
  refresh();
  add(box, el('h4', {}, 'Mes fiches manuscrites (PDF)'), pdfList,
    el('button', { onclick: async () => {
      const files = await pickFile('application/pdf,.pdf', true);
      for (const f of files) { try { await attachPdf(card.id, f); } catch (e) { toast('Import impossible : ' + e.message, 'error'); } }
      if (files.length) { refresh(); toast(files.length > 1 ? 'PDF joints à la fiche' : 'PDF joint à la fiche'); }
    } }, 'Joindre un PDF…'));
  return box;
}

/**
 * Construit la vue d'une fiche.
 * opts : { compact (comparaison : pas de notes ni d'actions), onChange (rafraîchir la liste) }
 */
export function renderCard(card, opts = {}) {
  const root = el('article.card-view' + (opts.compact ? '.compact' : ''));
  const fav = el('button.icon.fav', { 'aria-label': 'Favori', onclick: () => {
    if (state.fav[card.id]) delete state.fav[card.id]; else state.fav[card.id] = true;
    save('fav'); fav.classList.toggle('on', !!state.fav[card.id]); fav.textContent = state.fav[card.id] ? '★' : '☆'; opts.onChange?.();
  } }, state.fav[card.id] ? '★' : '☆');
  fav.classList.toggle('on', !!state.fav[card.id]);

  add(root, el('header.card-head', {},
    el('div.card-title', {}, el('h1', {}, card.name), opts.compact ? null : fav),
    card.aka?.length ? el('p.aka', {}, card.aka.join(' · ')) : null,
    el('div.chips', {}, catChip(card.cat), confBadge(card), (card.tags || []).map((t) => el('a.chip', { href: '#/?tag=' + encodeURIComponent(t) }, t)),
      isModified(card.id) ? el('span.chip.perso', {}, isBuiltin(card.id) ? 'Modifiée' : 'Fiche personnelle') : null),
    opts.compact ? null : el('div.row.actions', {},
      el('a.button', { href: `#/session/fiche/${card.id}` }, 'Réviser'),
      el('a.button', { href: `#/comparer/${card.id}` }, 'Comparer'),
      el('a.button', { href: `#/editer/${card.id}` }, 'Modifier'))));

  // 1. Principe
  let scheme;
  try { scheme = schemeSvg(card.scheme, { cls: 'big' }); } catch (e) { scheme = `<p class="error">Schéma invalide : ${esc(e.message)}</p>`; }
  const fg = (ids) => (ids || []).map((g) => el('a.chip.fg', { href: '#/retro/' + g }, GROUPS[g]?.name || g));
  add(root, el('section.sec.sec-principe', {}, el('h2', {}, 'Principe'),
    el('div.scheme-box', { html: scheme }),
    el('div.fg-line', {}, fg(card.from), el('span.arrow-txt', {}, '→'), fg(card.to)),
    el('h3', {}, 'Conditions expérimentales'), conditionsTable(card)));

  // 2. Mécanisme
  add(root, el('section.sec.sec-mecanisme', {}, el('h2', {}, 'Mécanisme'), mechPlayer(card)));

  // 3. Points importants
  const pts = el('section.sec.sec-points', {}, el('h2', {}, 'Points importants'));
  if (card.stereo) {
    add(pts, el('h3.h-stereo', {}, 'Stéréochimie'), para(card.stereo));
    if (card.view3d) add(pts, el('button', { onclick: () => open3D(card.view3d, card.name) }, 'Voir en 3D'));
  }
  if (card.select) add(pts, el('h3', {}, 'Régio- et chimiosélectivité'), para(card.select));
  if (card.compat?.ok || card.compat?.ko) {
    add(pts, el('h3', {}, 'Groupes fonctionnels'), el('div.compat', {},
      el('div.ok', {}, el('strong', {}, 'Tolérés'), para(card.compat.ok || '—')),
      el('div.ko', {}, el('strong', {}, 'Incompatibles'), para(card.compat.ko || '—'))));
  }
  if (card.data?.length) add(pts, el('h3', {}, 'Données utiles'), list(card.data));
  if (card.analogues?.length) {
    add(pts, el('h3', {}, 'Réactions analogues ou apparentées'), el('div.chips', {}, card.analogues.map((id) => {
      const c = getCard(id);
      return c ? el('a.chip.link', { href: opts.compact ? `#/fiche/${id}` : `#/fiche/${id}` }, c.name) : null;
    })));
    if (!opts.compact) add(pts, el('div.chips', {}, card.analogues.filter((id) => getCard(id)).slice(0, 4).map((id) => el('a.chip.ghost', { href: `#/comparer/${card.id}/${id}` }, 'Comparer avec ' + getCard(id).name.split(' (')[0]))));
  }
  if (card.appli) add(pts, el('h3.h-appli', {}, 'Applications en synthèse'), para(card.appli));
  if (card.pieges?.length) add(pts, el('h3.h-pieges', {}, 'Pièges et erreurs fréquentes'), list(card.pieges, 'pieges'));
  add(root, pts);

  // 4. Notes
  if (!opts.compact) add(root, el('section.sec.sec-notes', {}, el('h2', {}, 'Mes notes'), notesSection(card)));

  // 5. Référence
  add(root, el('footer.card-foot', {}, el('p', {}, el('strong', {}, 'Référence à vérifier : '), card.ref || '—'),
    el('p.muted', {}, CONFIDENCE[card.conf] || CONFIDENCE.basse, '. Fiche rédigée pour la révision : vérifier les conditions dans la littérature avant toute manipulation.')));
  return root;
}
