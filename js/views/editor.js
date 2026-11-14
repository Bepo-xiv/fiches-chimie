// Éditeur de fiches : création, modification, import/export d'une fiche.
import { el, fill, add, toast, promptBox, confirmBox, pickFile, saveFile } from '../ui.js';
import { CATEGORIES, GROUPS, CONFIDENCE } from '../../data/index.js';
import { COND_FIELDS, emptyCard, slug, validateCard } from '../model.js';
import { allCards, getCard, saveCard, deleteCard, isBuiltin, isModified } from '../store.js';
import { molSvg, isValidSmiles, isText } from '../chem.js';
import { sceneSvg, schemeSvg, parseArrow, formatArrow, parseRef } from '../mech.js';
import { openSketcher } from '../sketcher.js';

const TOKENS = ['+', '>>', '<=>'];
const clone = (o) => JSON.parse(JSON.stringify(o));
const lines = (s) => s.split('\n').map((x) => x.trim()).filter(Boolean);
const commas = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);

function field(label, input) { return el('label.field', {}, label, input); }
function text(value, oninput, attrs = {}) {
  const i = el('input', { type: 'text', value: value || '', autocapitalize: 'off', autocorrect: 'off', spellcheck: false, ...attrs });
  i.addEventListener('input', () => oninput(i.value));
  return i;
}
function area(value, oninput, rows = 2) {
  const t = el('textarea', { value: value || '', rows });
  t.addEventListener('input', () => oninput(t.value));
  return t;
}

/** Liste d'espèces (SMILES, texte libre, jetons de mise en page) modifiable. */
function speciesEditor(list, { tokens = false, onChange = () => {} } = {}) {
  const box = el('div');
  const draw = () => {
    const chips = list.map((s, i) => {
      let view;
      if (TOKENS.includes(s)) view = el('strong', {}, s === '>>' ? '→' : s === '<=>' ? '⇌' : '+');
      else { try { view = el('span', { html: molSvg(s) }); } catch { view = el('span.error', {}, 'invalide'); } }
      return el('div.sp-chip', {}, view, el('div.row', {},
        i > 0 ? el('button', { 'aria-label': 'Déplacer à gauche', onclick: () => { [list[i - 1], list[i]] = [list[i], list[i - 1]]; changed(); } }, '‹') : null,
        !TOKENS.includes(s) && !isText(s) ? el('button', { 'aria-label': 'Redessiner', onclick: async () => { const r = await openSketcher({ smiles: s }); if (r) { list[i] = r; changed(); } } }, '✎') : null,
        el('button', { 'aria-label': 'Retirer', onclick: () => { list.splice(i, 1); changed(); } }, '✕'),
        i < list.length - 1 ? el('button', { 'aria-label': 'Déplacer à droite', onclick: () => { [list[i + 1], list[i]] = [list[i], list[i + 1]]; changed(); } }, '›') : null));
    });
    fill(box, el('div.species', {}, chips.length ? chips : el('span.muted', {}, 'Aucune espèce')), el('div.row', {},
      el('button.small', { onclick: async () => { const r = await openSketcher({}); if (r) { list.push(r); changed(); } } }, '+ Dessiner'),
      el('button.small', { onclick: async () => {
        const r = await promptBox('Ajouter par SMILES', { label: 'SMILES ([2H] = hydrogène dessiné explicitement)', placeholder: 'ex. CC(=O)O' });
        if (!r) return;
        if (!isValidSmiles(r)) { toast('SMILES invalide', 'error'); return; }
        list.push(r); changed();
      } }, '+ SMILES'),
      el('button.small', { onclick: async () => { const r = await promptBox('Ajouter une étiquette', { label: 'Texte libre (ex. H₂O, Pd(0)L₂, base)' }); if (r) { list.push('t:' + r); changed(); } } }, '+ Texte'),
      tokens ? TOKENS.map((t) => el('button.small', { onclick: () => { list.push(t); changed(); } }, t === '>>' ? '+ flèche →' : t === '<=>' ? '+ équilibre ⇌' : '+ signe +')) : null));
  };
  const changed = () => { draw(); onChange(); };
  draw();
  return box;
}

/** Constructeur de flèches : toucher la source (atome ou liaison) puis la cible. */
function arrowBuilder(step, onChange) {
  step.arrows ||= [];
  const box = el('div');
  let mode = 'simple', hook = false, picks = [];
  const need = () => (mode === 'new' ? 3 : 2);
  function draw() {
    let svg;
    try { svg = sceneSvg(step, { arrows: 'all', hits: true, scale: 1.5 }); } catch (e) { fill(box, el('p.error', {}, 'Scène invalide : ' + e.message)); return; }
    const stage = el('div.stage.picking', { html: svg });
    for (const h of stage.querySelectorAll('.hit')) {
      if (picks.includes(h.dataset.ref)) h.classList.add('sel');
      h.addEventListener('click', () => pick(h.dataset.ref));
    }
    const hint = ['Touche la source : un atome (doublet, charge) ou le milieu d’une liaison.', mode === 'new' ? 'Touche le premier atome de la nouvelle liaison.' : 'Touche la cible : un atome ou une liaison.', 'Touche le second atome de la nouvelle liaison.'][picks.length];
    fill(box, 
      el('div.row', {},
        el('button.small' + (mode === 'simple' ? '.on' : ''), { onclick: () => { mode = 'simple'; picks = []; draw(); } }, 'Vers atome ou liaison'),
        el('button.small' + (mode === 'new' ? '.on' : ''), { onclick: () => { mode = 'new'; picks = []; draw(); } }, 'Vers nouvelle liaison'),
        el('button.small' + (hook ? '.on' : ''), { onclick: () => { hook = !hook; draw(); } }, 'Demi-flèche (radical)'),
        picks.length ? el('button.small', { onclick: () => { picks = []; draw(); } }, 'Annuler la sélection') : null),
      el('p.muted', {}, hint), stage,
      el('div.arrow-list', {}, step.arrows.map((a, i) => el('span.chip', {}, `${i + 1}. ${a}`,
        el('button.icon', { title: 'Inverser la courbure', 'aria-label': 'Inverser la courbure', onclick: () => { const p = parseArrow(a); p.flip = !p.flip; step.arrows[i] = formatArrow(p); changed(); } }, '⤾'),
        el('button.icon', { 'aria-label': 'Supprimer la flèche', onclick: () => { step.arrows.splice(i, 1); changed(); } }, '✕')))));
  }
  function pick(ref) {
    picks.push(ref);
    if (picks.length < need()) { draw(); return; }
    try {
      let dst = picks[1];
      if (mode === 'new') {
        const a = parseRef(picks[1]), b = parseRef(picks[2]);
        if (a.kind !== 'atom' || b.kind !== 'atom') throw new Error('Une nouvelle liaison relie deux atomes.');
        dst = `${a.m}.${a.a}+${b.m}.${b.a}`;
      }
      const str = (hook ? '~' : '') + picks[0] + '>' + dst;
      parseArrow(str);
      if (picks[0] === dst) throw new Error('Source et cible identiques.');
      step.arrows.push(str);
    } catch (e) { toast(e.message, 'error'); }
    picks = [];
    changed();
  }
  const changed = () => { draw(); onChange?.(); };
  draw();
  return { el: box, redraw: () => { picks = []; draw(); } };
}

function multi(options, selected, onChange) {
  const box = el('div.multi');
  const draw = () => fill(box, ...options.map(([v, label]) => el('button' + (selected.includes(v) ? '.on' : ''), { onclick: () => {
    const i = selected.indexOf(v); if (i >= 0) selected.splice(i, 1); else selected.push(v); draw(); onChange?.();
  } }, label)));
  draw();
  return box;
}

export function renderEditor(main, { args }) {
  const original = args[0] && args[0] !== 'nouveau' ? getCard(args[0]) : null;
  const card = original ? { ...emptyCard(), ...clone(original) } : emptyCard();
  card.scheme = { reactants: [], products: [], over: [], under: [], ...card.scheme };
  card.cond = { ...emptyCard().cond, ...card.cond };
  card.compat = { ok: '', ko: '', ...card.compat };
  const isNew = !original;
  const root = el('div.editor');
  const preview = el('div.scheme-box');
  const errors = el('div');
  const refreshPreview = () => { try { preview.innerHTML = card.scheme.reactants.length || card.scheme.products.length ? schemeSvg(card.scheme) : ''; } catch (e) { preview.textContent = e.message; } };

  // ----- Mécanisme -----
  const stepsBox = el('div');
  function drawSteps() {
    fill(stepsBox, ...card.mech.map((st, i) => {
      st.mols ||= []; st.arrows ||= [];
      const builder = arrowBuilder(st);
      return el('div.step-edit', {},
        el('div.row.between', {}, el('strong', {}, `Étape ${i + 1}`), el('div.row', {},
          i > 0 ? el('button.small', { onclick: () => { [card.mech[i - 1], card.mech[i]] = [card.mech[i], card.mech[i - 1]]; drawSteps(); } }, '↑') : null,
          i < card.mech.length - 1 ? el('button.small', { onclick: () => { [card.mech[i + 1], card.mech[i]] = [card.mech[i], card.mech[i + 1]]; drawSteps(); } }, '↓') : null,
          el('button.small', { onclick: () => { card.mech.splice(i + 1, 0, clone(st)); drawSteps(); } }, 'Dupliquer'),
          el('button.small', { onclick: () => { card.mech.splice(i, 1); drawSteps(); } }, 'Supprimer'))),
        field('Titre de l’étape', text(st.t, (v) => { st.t = v; })),
        el('div.muted', {}, 'Espèces (dans l’ordre d’affichage)'),
        speciesEditor(st.mols, { tokens: true, onChange: () => { st.arrows = []; builder.redraw(); } }),
        el('div.muted', {}, 'Flèches de mouvement électronique'), builder.el,
        field('Explication', area(st.txt, (v) => { st.txt = v; }, 2)));
    }), el('button', { onclick: () => {
      const prev = card.mech[card.mech.length - 1];
      card.mech.push({ t: '', mols: prev ? [...prev.mols.filter((m) => !TOKENS.includes(m))] : [...card.scheme.reactants], arrows: [], txt: '' });
      drawSteps();
    } }, '+ Ajouter une étape'));
  }
  drawSteps();

  const groupOpts = Object.entries(GROUPS).map(([k, g]) => [k, g.name]);
  const others = allCards().filter((c) => c.id !== card.id).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  const analogSel = el('select', { onchange: () => { if (analogSel.value && !card.analogues.includes(analogSel.value)) { card.analogues.push(analogSel.value); drawAnalogues(); } analogSel.value = ''; } },
    el('option', { value: '' }, 'Ajouter une fiche apparentée…'), others.map((c) => el('option', { value: c.id }, c.name)));
  const analogBox = el('div.chips');
  const drawAnalogues = () => fill(analogBox, ...card.analogues.map((id, i) => el('span.chip', {}, getCard(id)?.name || id, el('button.icon', { 'aria-label': 'Retirer', onclick: () => { card.analogues.splice(i, 1); drawAnalogues(); } }, '✕'))));
  drawAnalogues();

  function save() {
    const c = clone(card);
    if (!c.id) {
      let base = slug(c.name) || 'fiche', id = base, n = 2;
      while (getCard(id)) id = `${base}-${n++}`;
      c.id = id;
    }
    const errs = validateCard(c, { groups: GROUPS, categories: CATEGORIES, confidence: CONFIDENCE, strict: false });
    if (errs.length) {
      fill(errors, el('div.warn', {}, el('strong', {}, 'À corriger avant d’enregistrer :'), el('ul', {}, errs.map((e) => el('li', {}, e)))));
      errors.scrollIntoView({ block: 'center' });
      return;
    }
    saveCard(c);
    window.dispatchEvent(new Event('cards-changed'));
    toast('Fiche enregistrée');
    location.hash = '#/fiche/' + c.id;
  }

  add(root, 
    el('div.row.between', {}, el('h1', {}, isNew ? 'Nouvelle fiche' : 'Modifier la fiche'), el('a.button.small', { href: original ? '#/fiche/' + original.id : '#/' }, 'Annuler')),
    isNew ? el('p.muted', {}, 'Astuce : pour partir d’une fiche existante, ouvre-la puis touche « Modifier ». ',
      el('button.small', { onclick: async () => {
        const f = await pickFile('application/json,.json');
        if (!f) return;
        try {
          const obj = JSON.parse(await f.text());
          const c = obj.card || obj;
          const errs = validateCard(c, { groups: GROUPS, categories: CATEGORIES, strict: false });
          if (errs.length) throw new Error(errs[0]);
          if (getCard(c.id) && !(await confirmBox('Fiche déjà présente', `Remplacer « ${getCard(c.id).name} » par la fiche importée ?`, 'Remplacer', false))) return;
          saveCard(c); window.dispatchEvent(new Event('cards-changed')); toast('Fiche importée'); location.hash = '#/fiche/' + c.id;
        } catch (e) { toast('Import impossible : ' + e.message, 'error'); }
      } }, 'Importer une fiche (.json)…')) : (isBuiltin(card.id) ? el('p.muted', {}, 'Fiche de la base : tes modifications sont enregistrées à part et peuvent être annulées.') : null),

    el('fieldset', {}, el('legend', {}, 'Identité'),
      field('Nom de la réaction', text(card.name, (v) => { card.name = v; })),
      el('div.grid2', {},
        field('Autres noms (séparés par des virgules)', text(card.aka.join(', '), (v) => { card.aka = commas(v); })),
        field('Tags (séparés par des virgules)', text(card.tags.join(', '), (v) => { card.tags = commas(v); })),
        field('Catégorie', el('select', { onchange: (e) => { card.cat = e.target.value; } }, Object.entries(CATEGORIES).map(([k, c]) => el('option', { value: k, selected: card.cat === k }, c.name)))),
        field('Niveau de confiance', el('select', { onchange: (e) => { card.conf = e.target.value; } }, Object.entries(CONFIDENCE).map(([k, t]) => el('option', { value: k, selected: card.conf === k }, t))))),
      el('div.muted', {}, 'Groupes fonctionnels de départ'), multi(groupOpts, card.from),
      el('div.muted', { style: { marginTop: '8px' } }, 'Groupes fonctionnels d’arrivée'), multi(groupOpts, card.to)),

    el('fieldset', {}, el('legend', {}, '1. Principe'),
      el('div.muted', {}, 'Réactifs de départ'), speciesEditor(card.scheme.reactants, { onChange: refreshPreview }),
      el('div.muted', {}, 'Produits'), speciesEditor(card.scheme.products, { onChange: refreshPreview }),
      el('div.grid2', {},
        field('Au-dessus de la flèche (une ligne par élément)', area(card.scheme.over.join('\n'), (v) => { card.scheme.over = lines(v); refreshPreview(); })),
        field('Sous la flèche', area(card.scheme.under.join('\n'), (v) => { card.scheme.under = lines(v); refreshPreview(); }))),
      preview,
      el('div.grid2', {}, COND_FIELDS.map(([k, label]) => field(label, area(card.cond[k], (v) => { card.cond[k] = v; }, 2)))),
      field('Conditions incertaines (affiché comme avertissement)', text(card.cond.incertain, (v) => { card.cond.incertain = v; }))),

    el('fieldset', {}, el('legend', {}, '2. Mécanisme'), stepsBox),

    el('fieldset', {}, el('legend', {}, '3. Points importants'),
      field('Stéréochimie', area(card.stereo, (v) => { card.stereo = v; }, 3)),
      field('SMILES pour la vue 3D (facultatif)', text(card.view3d, (v) => { card.view3d = v; })),
      field('Régio- et chimiosélectivité', area(card.select, (v) => { card.select = v; }, 3)),
      el('div.grid2', {}, field('Groupes tolérés', area(card.compat.ok, (v) => { card.compat.ok = v; })), field('Groupes incompatibles', area(card.compat.ko, (v) => { card.compat.ko = v; }))),
      field('Données utiles (une par ligne : pKa, réactivités relatives…)', area(card.data.join('\n'), (v) => { card.data = lines(v); }, 3)),
      el('div.muted', {}, 'Réactions analogues ou apparentées'), analogBox, analogSel,
      field('Applications en synthèse, avec exemple', area(card.appli, (v) => { card.appli = v; }, 3)),
      field('Pièges et erreurs fréquentes (un par ligne)', area(card.pieges.join('\n'), (v) => { card.pieges = lines(v); }, 3)),
      field('Référence bibliographique', text(card.ref, (v) => { card.ref = v; }))),

    errors,
    el('div.save-bar', {},
      el('button.primary', { onclick: save }, 'Enregistrer'),
      !isNew ? el('button', { onclick: () => saveFile(`fiche-${card.id}.json`, new Blob([JSON.stringify({ format: 'fiche-chimie', card }, null, 2)], { type: 'application/json' })) }, 'Exporter cette fiche') : null,
      !isNew && isModified(card.id) ? el('button.danger', { onclick: async () => {
        const builtin = isBuiltin(card.id);
        if (!(await confirmBox(builtin ? 'Rétablir la fiche d’origine ?' : 'Supprimer cette fiche ?', builtin ? 'Tes modifications de cette fiche seront perdues.' : 'La fiche personnelle sera supprimée définitivement.', builtin ? 'Rétablir' : 'Supprimer'))) return;
        deleteCard(card.id); window.dispatchEvent(new Event('cards-changed')); toast(builtin ? 'Fiche d’origine rétablie' : 'Fiche supprimée');
        location.hash = builtin ? '#/fiche/' + card.id : '#/';
      } }, isBuiltin(card.id) ? 'Rétablir l’original' : 'Supprimer') : null),
  );
  refreshPreview();
  add(main, root);
}
