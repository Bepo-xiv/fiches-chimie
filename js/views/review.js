// Révision : répétition espacée, exercices au Pencil, QCM, oral blanc.
import { el, fill, add, toast } from '../ui.js';
import { CATEGORIES } from '../../data/index.js';
import { state, save, allCards, getCard } from '../store.js';
import { review, queue, stats, nextLabel, newState, GRADES } from '../srs.js';
import { reviewItems } from '../model.js';
import { shuffle } from '../search.js';
import { schemeSvg, sceneSvg, buildScene, matchInkArrows } from '../mech.js';
import { molSvg, sameMolecule, isText } from '../chem.js';
import { makeQuiz, QUIZ_TYPES, gradeFromRatio } from '../quiz.js';
import { InkPad, inkToolbar } from '../ink.js';
import { openSketcher } from '../sketcher.js';
import { renderCard, conditionsTable, catChip } from './card.js';

let scope = ''; // '' = tout, 'fav' = favoris, sinon identifiant de catégorie
const TYPE_LABEL = { fiche: 'Fiche complète', produit: 'Prédis le produit', conditions: 'Trouve les conditions', fleches: 'Trace les flèches' };

function scopedCards() {
  const cards = allCards();
  if (scope === 'fav') return cards.filter((c) => state.fav[c.id]);
  return scope ? cards.filter((c) => c.cat === scope) : cards;
}
const itemsOf = (cards, type) => cards.flatMap(reviewItems).filter((id) => !type || id.endsWith('|' + type));

export function renderReviewHub(main) {
  const page = el('div.page');
  const draw = () => {
    const cards = scopedCards();
    const now = Date.now();
    const st = stats(itemsOf(cards), state.srs, now);
    const due = queue(itemsOf(cards), state.srs, now, { limitNew: state.settings.newPerDay }).length;
    const sel = el('select', { 'aria-label': 'Périmètre', onchange: () => { scope = sel.value; draw(); } },
      el('option', { value: '' }, 'Toutes les fiches'), el('option', { value: 'fav', selected: scope === 'fav' }, 'Mes favoris'),
      Object.entries(CATEGORIES).map(([k, c]) => el('option', { value: k, selected: scope === k }, c.name)));
    const hub = (href, title, sub) => el('a.hub-card', { href }, el('strong', {}, title), el('span', {}, sub));
    fill(page, 
      el('h1', {}, 'Réviser'),
      el('div.row', { style: { margin: '10px 0' } }, el('div', { style: { minWidth: '240px' } }, sel),
        el('span.muted', {}, `${cards.length} fiches · ${st.due} dues · ${st.fresh} nouvelles · ${st.mature} acquises`)),
      el('h3', {}, 'Répétition espacée'),
      el('div.hub-grid', {},
        hub('#/session/srs', `Révision du jour (${due})`, 'Les exercices dus, plus quelques nouveaux. Auto-évaluation après chaque correction.')),
      el('h3', {}, 'À l’Apple Pencil'),
      el('div.hub-grid', {},
        hub('#/session/fleches', 'Trace les flèches', 'Dessine les flèches du mécanisme sur les structures ; correction automatique puis animation.'),
        hub('#/session/produit', 'Dessine le produit', 'Réactifs et conditions donnés : dessine le produit, puis compare.'),
        hub('#/session/conditions', 'Retrouve les conditions', 'Réactif et produit donnés : écris les conditions, puis compare.'),
        hub('#/session/fiche', 'Fiche de mémoire', 'Le nom seul : restitue toute la fiche au brouillon.')),
      el('h3', {}, 'QCM rapides'),
      el('div.hub-grid', {}, Object.entries(QUIZ_TYPES).map(([k, q]) => hub('#/session/qcm-' + k, q.name, q.hint))),
      el('h3', {}, 'Oral'),
      el('div.hub-grid', {}, hub('#/session/oral', 'Oral blanc', 'Tirage d’une fiche au hasard, minuteur de préparation et d’exposé, grille d’auto-évaluation.')),
      state.oral.length ? el('div', {}, el('h3', {}, 'Derniers oraux'), el('ul', {}, state.oral.slice(-6).reverse().map((o) => el('li', {},
        new Date(o.t).toLocaleDateString('fr-FR'), ' — ', el('a', { href: '#/fiche/' + o.id }, getCard(o.id)?.name || o.id), ` : ${o.score}/8`)))) : null,
    );
  };
  draw();
  add(main, page);
}

// ---------- Exercices ----------
function scratch(cleanups, height = 300) {
  const canvas = el('canvas.ink', { style: { height: height + 'px' } });
  const zone = el('div.draw-zone', {}, canvas);
  setTimeout(() => {
    const pad = new InkPad(canvas, { fingerDraw: state.settings.fingerDraw });
    zone.prepend(inkToolbar(pad, el));
    cleanups.push(() => pad.destroy());
  }, 0);
  return zone;
}

function frame(type, card, promptNodes, cleanups) {
  const answer = el('div.answer', { hidden: true });
  const box = el('div.exo', {}, el('div.exo-type', {}, TYPE_LABEL[type]), ...promptNodes, answer);
  return { box, answer };
}

function exFiche(card, ctx) {
  const { box, answer } = frame('fiche', card, [el('h2', {}, card.name), catChip(card.cat),
    el('p.muted', {}, 'De mémoire : schéma et conditions, mécanisme, stéréochimie et sélectivité, applications, pièges.'), scratch(ctx.cleanups)], ctx.cleanups);
  ctx.onReveal = () => { add(answer, renderCard(card, { compact: true })); };
  return box;
}

function exProduit(card, ctx) {
  const verdict = el('div');
  const check = el('button', { onclick: async () => {
    const s = await openSketcher({ title: 'Dessine le produit principal' });
    if (!s) return;
    const prods = card.scheme.products.filter((p) => !isText(p));
    const exact = prods.some((p) => sameMolecule(s, p));
    const flat = exact || prods.some((p) => sameMolecule(s, p, { stereo: false }));
    fill(verdict, el('div.result.' + (exact ? 'good' : flat ? 'good' : 'bad'), {},
      exact ? 'Exact : c’est bien un produit de la réaction.' : flat ? 'Bon squelette, mais vérifie la stéréochimie.' : 'Ce n’est pas le produit attendu.'), el('div', { html: molSvg(s) }));
    ctx.suggest = exact ? 3 : flat ? 1 : 0;
  } }, 'Répondre dans l’éditeur (correction automatique)');
  const { box, answer } = frame('produit', card, [el('h2', {}, 'Quel est le produit ?'),
    el('div.scheme-box', { html: schemeSvg(card.scheme, { hideProducts: true, cls: 'big' }) }), scratch(ctx.cleanups, 260), check, verdict], ctx.cleanups);
  ctx.onReveal = () => { add(answer, el('h3', {}, card.name), el('div.scheme-box', { html: schemeSvg(card.scheme, { cls: 'big' }) }), card.stereo ? el('p', {}, card.stereo) : null, el('a.button.small', { href: '#/fiche/' + card.id }, 'Ouvrir la fiche')); };
  return box;
}

function exConditions(card, ctx) {
  const { box, answer } = frame('conditions', card, [el('h2', {}, 'Quelles conditions ?'),
    el('div.scheme-box', { html: schemeSvg(card.scheme, { hideConditions: true, cls: 'big' }) }),
    el('p.muted', {}, 'Réactifs, catalyseur, solvant, température, atmosphère, traitement.'), scratch(ctx.cleanups, 220)], ctx.cleanups);
  ctx.onReveal = () => { add(answer, el('h3', {}, card.name), el('div.scheme-box', { html: schemeSvg(card.scheme, { cls: 'big' }) }), conditionsTable(card), el('a.button.small', { href: '#/fiche/' + card.id }, 'Ouvrir la fiche')); };
  return box;
}

function exFleches(card, ctx) {
  const steps = card.mech.map((st, i) => ({ st, i })).filter((x) => x.st.arrows?.length);
  let k = 0, found = 0, expected = 0, extra = 0, pad = null;
  const zoneBox = el('div');
  const info = el('div');
  const { box, answer } = frame('fleches', card, [el('h2', {}, card.name), zoneBox, info], ctx.cleanups);
  ctx.selfReveal = true;
  function show() {
    const { st, i } = steps[k];
    const sc = buildScene(st);
    const canvas = el('canvas.ink');
    const svgBox = el('div', { html: sceneSvg(st, { arrows: 'none', scale: 2.1 }) });
    const zone = el('div.overlay-zone', {}, svgBox, canvas);
    const tools = el('div');
    const bCheck = el('button.primary', { onclick: () => {
      const res = matchInkArrows(sc, pad.strokesIn(sc.w, sc.top), 15);
      found += res.found; expected += res.expected; extra += Math.max(0, res.extra);
      svgBox.innerHTML = sceneSvg(st, { arrows: 'step', scale: 2.1 });
      const arrows = [...svgBox.querySelectorAll('.arrow')];
      arrows.forEach((a, n) => setTimeout(() => a.classList.add('on'), 80 + n * 650));
      pad.readOnly = true;
      bCheck.hidden = true;
      const good = res.found === res.expected && res.extra <= 0;
      fill(info, el('div.result.' + (good ? 'good' : 'bad'), {},
        `${res.found} flèche${res.found > 1 ? 's' : ''} reconnue${res.found > 1 ? 's' : ''} sur ${res.expected}` + (res.extra > 0 ? ` · ${res.extra} trait${res.extra > 1 ? 's' : ''} en trop` : '')),
        el('p', {}, st.txt || ''),
        k < steps.length - 1 ? el('button.primary', { onclick: () => { k++; pad.destroy(); show(); } }, 'Étape suivante ▶') : null);
      if (k === steps.length - 1) { ctx.suggest = gradeFromRatio(found, expected, extra); ctx.reveal(); }
    } }, 'Corriger');
    fill(zoneBox, el('h4.step-title', {}, `Étape ${i + 1} / ${card.mech.length} — ${st.t}`),
      el('p.muted', {}, `Trace ${st.arrows.length} flèche${st.arrows.length > 1 ? 's' : ''} : pars du doublet ou de la liaison, arrive sur l’atome ou la liaison visée.`), tools, el('div.stage', {}, zone), el('div.row', {}, bCheck));
    fill(info);
    setTimeout(() => {
      pad = new InkPad(canvas, { fingerDraw: state.settings.fingerDraw, color: '#1971c2' });
      fill(tools, inkToolbar(pad, el));
      ctx.cleanups.push(() => pad.destroy());
    }, 0);
  }
  ctx.onReveal = () => { add(answer, el('a.button.small', { href: '#/fiche/' + card.id }, 'Ouvrir la fiche')); };
  if (steps.length) show(); else add(zoneBox, el('p.muted', {}, 'Cette fiche n’a pas de flèches à tracer.'));
  return box;
}

const EXERCISES = { fiche: exFiche, produit: exProduit, conditions: exConditions, fleches: exFleches };

function runItems(root, items, title, cleanups) {
  let idx = 0;
  const done = [];
  const bar = el('div.progress', {}, el('div'));
  const head = el('div.row.between', {}, el('strong', {}, title), el('a.button.small', { href: '#/reviser' }, 'Quitter'));
  const body = el('div');
  add(root, head, bar, body);
  function summary() {
    bar.firstChild.style.width = '100%';
    const counts = [0, 0, 0, 0];
    for (const g of done) counts[g]++;
    fill(body, el('div.exo', {}, el('h2', {}, items.length ? 'Séance terminée' : 'Rien à réviser ici'),
      items.length ? el('p', {}, GRADES.map((g, i) => `${g} : ${counts[i]}`).join(' · ')) : el('p.muted', {}, 'Aucun exercice dû pour ce périmètre. Reviens demain ou choisis un autre mode.'),
      el('a.button.primary', { href: '#/reviser' }, 'Retour')));
  }
  function show() {
    while (cleanups.length) { try { cleanups.pop()(); } catch { /* déjà détruit */ } }
    if (idx >= items.length) return summary();
    bar.firstChild.style.width = `${(idx / items.length) * 100}%`;
    const [id, type] = items[idx].split('|');
    const card = getCard(id);
    if (!card || !EXERCISES[type]) { idx++; return show(); }
    const ctx = { cleanups, suggest: null };
    const grades = el('div.grades', { hidden: true });
    const bReveal = el('button.primary', {}, 'Révéler la correction');
    ctx.reveal = () => {
      if (!grades.hidden) return;
      ctx.onReveal?.();
      box.querySelector('.answer').hidden = false;
      bReveal.hidden = true;
      grades.hidden = false;
      fill(grades, ...GRADES.map((g, n) => el('button' + (ctx.suggest === n ? '.primary' : ''), { onclick: () => {
        state.srs[items[idx]] = review(state.srs[items[idx]] || newState(), n, Date.now());
        save('srs'); done.push(n); idx++; show();
      } }, g, el('small', {}, nextLabel(state.srs[items[idx]], n, Date.now())))));
      grades.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
    bReveal.onclick = ctx.reveal;
    const box = EXERCISES[type](card, ctx);
    if (ctx.selfReveal) bReveal.textContent = 'Passer et voir la correction';
    fill(body, box, el('div.row', { style: { marginTop: '12px' } }, bReveal), grades,
      el('p.muted', { style: { marginTop: '8px' } }, `Exercice ${idx + 1} sur ${items.length}`));
    root.closest('#main')?.scrollTo({ top: 0 });
  }
  show();
}

function runQcm(root, type) {
  const pool = allCards();
  const qs = makeQuiz(type, scopedCards(), pool, 10);
  let i = 0, score = 0;
  const bar = el('div.progress', {}, el('div'));
  const body = el('div');
  add(root, el('div.row.between', {}, el('strong', {}, QUIZ_TYPES[type].name), el('a.button.small', { href: '#/reviser' }, 'Quitter')), bar, body);
  function show() {
    bar.firstChild.style.width = `${(i / Math.max(1, qs.length)) * 100}%`;
    if (i >= qs.length) {
      fill(body, el('div.exo', {}, el('h2', {}, qs.length ? `Score : ${score} / ${qs.length}` : 'Pas assez de fiches pour ce quiz'),
        el('div.row', {}, el('button.primary', { onclick: () => { fill(root); runQcm(root, type); } }, 'Recommencer'), el('a.button', { href: '#/reviser' }, 'Retour'))));
      return;
    }
    const q = qs[i];
    const after = el('div');
    const opts = q.options.map((o) => {
      const b = el('button.option', { onclick: () => {
        if (after.childNodes.length) return;
        if (o.correct) score++;
        opts.forEach((x, n) => { x.disabled = true; if (q.options[n].correct) x.classList.add('good'); });
        if (!o.correct) b.classList.add('bad');
        add(after, el('div.result.' + (o.correct ? 'good' : 'bad'), {}, o.correct ? 'Bonne réponse' : 'Raté'),
          el('p', {}, el('a', { href: '#/fiche/' + q.card.id }, q.card.name)),
          el('div.scheme-box', { html: schemeSvg(q.card.scheme) }),
          el('button.primary', { onclick: () => { i++; show(); } }, 'Question suivante ▶'));
      } });
      if (o.smiles) b.innerHTML = molSvg(o.smiles); else b.textContent = o.text;
      return b;
    });
    fill(body, el('div.exo', {}, el('div.exo-type', {}, `Question ${i + 1} / ${qs.length}`), el('h2', {}, QUIZ_TYPES[type].hint),
      el('div.scheme-box', { html: schemeSvg(q.card.scheme, { hideProducts: type === 'produit', hideConditions: type !== 'produit', cls: 'big' }) }),
      el('div.options', {}, opts), after));
  }
  show();
}

function fmt(s) { const a = Math.abs(s); return `${s < 0 ? '+' : ''}${Math.floor(a / 60)}:${String(a % 60).padStart(2, '0')}`; }

function runOral(root, cleanups) {
  const body = el('div');
  add(root, el('div.row.between', {}, el('strong', {}, 'Oral blanc'), el('a.button.small', { href: '#/reviser' }, 'Quitter')), body);
  let tick = null;
  cleanups.push(() => clearInterval(tick));
  function setup() {
    const prep = el('input', { type: 'number', min: 0, max: 60, value: state.settings.prepMin });
    const talk = el('input', { type: 'number', min: 1, max: 60, value: state.settings.talkMin });
    fill(body, el('div.exo', {}, el('h2', {}, 'Préparer un oral'),
      el('p.muted', {}, 'Une fiche est tirée au hasard. Tu prépares au brouillon, tu exposes à voix haute, puis tu t’évalues avec la fiche sous les yeux.'),
      el('div.grid2', {}, el('label.field', {}, 'Préparation (min)', prep), el('label.field', {}, 'Exposé (min)', talk)),
      el('button.primary', { onclick: () => {
        state.settings.prepMin = Math.max(0, +prep.value || 0); state.settings.talkMin = Math.max(1, +talk.value || 5); save('settings');
        const cards = scopedCards();
        if (!cards.length) { toast('Aucune fiche dans ce périmètre', 'error'); return; }
        phase(shuffle(cards)[0], 'prep');
      } }, 'Tirer une fiche')));
  }
  function phase(card, which) {
    clearInterval(tick);
    const total = (which === 'prep' ? state.settings.prepMin : state.settings.talkMin) * 60;
    const t0 = Date.now();
    const timer = el('div.timer', {}, fmt(total));
    const nextBtn = which === 'prep'
      ? el('button.primary', { onclick: () => phase(card, 'talk') }, 'Commencer l’exposé')
      : el('button.primary', { onclick: () => evaluate(card, Math.round((Date.now() - t0) / 1000)) }, 'Terminer et m’évaluer');
    fill(body, el('div.exo', {}, el('div.exo-type', {}, which === 'prep' ? 'Préparation' : 'Exposé'), el('h2', {}, card.name), catChip(card.cat), timer,
      which === 'prep' ? scratch(cleanups, 360) : el('p.muted', {}, 'Plan conseillé : principe et conditions, mécanisme, stéréochimie et sélectivité, applications, pièges.'),
      el('div.row', {}, nextBtn)));
    if (which === 'prep' && total === 0) return phase(card, 'talk');
    tick = setInterval(() => {
      const left = total - Math.round((Date.now() - t0) / 1000);
      timer.textContent = fmt(left);
      timer.classList.toggle('late', left < 0);
    }, 500);
  }
  function evaluate(card, seconds) {
    clearInterval(tick);
    const crit = ['Principe et conditions', 'Mécanisme', 'Stéréochimie et sélectivité', 'Applications et pièges'];
    const marks = [1, 1, 1, 1];
    const total = el('strong', {}, '4 / 8');
    const rubric = el('div.rubric', {}, crit.map((c, i) => {
      const btns = ['Oublié', 'Partiel', 'Maîtrisé'].map((lab, v) => el('button.small' + (v === 1 ? '.on' : ''), { onclick: () => {
        marks[i] = v; btns.forEach((b, n) => b.classList.toggle('on', n === v)); total.textContent = `${marks.reduce((a, b) => a + b, 0)} / 8`;
      } }, lab));
      return el('div.row', {}, el('span', {}, c), el('div.row', {}, btns));
    }));
    fill(body, el('div.exo', {}, el('h2', {}, 'Auto-évaluation'), el('p.muted', {}, `Durée de l’exposé : ${fmt(seconds)}`), rubric, el('p', {}, 'Total : ', total),
      el('button.primary', { onclick: () => {
        const score = marks.reduce((a, b) => a + b, 0);
        state.oral.push({ t: Date.now(), id: card.id, score, sec: seconds });
        if (state.oral.length > 200) state.oral.splice(0, state.oral.length - 200);
        const key = card.id + '|fiche';
        state.srs[key] = review(state.srs[key] || newState(), score >= 7 ? 3 : score >= 5 ? 2 : score >= 3 ? 1 : 0, Date.now());
        save('oral'); save('srs'); toast('Oral enregistré');
        setup();
      } }, 'Enregistrer'), el('button', { onclick: setup }, 'Ne pas enregistrer')),
    renderCard(card, { compact: true }));
  }
  setup();
}

export function renderSession(main, { args }) {
  const [mode, id] = args;
  const root = el('div.session');
  const cleanups = [];
  add(main, root);
  const now = Date.now();
  if (mode === 'oral') runOral(root, cleanups);
  else if (mode?.startsWith('qcm-') && QUIZ_TYPES[mode.slice(4)]) runQcm(root, mode.slice(4));
  else if (mode === 'srs') runItems(root, queue(itemsOf(scopedCards()), state.srs, now, { limitNew: state.settings.newPerDay }).slice(0, 30), 'Révision du jour', cleanups);
  else if (EXERCISES[mode] && id) runItems(root, reviewItems(getCard(id) || { id: '' }).filter(() => getCard(id)), getCard(id)?.name || 'Fiche', cleanups);
  else if (EXERCISES[mode]) {
    const ids = itemsOf(scopedCards(), mode);
    const due = queue(ids, state.srs, now, { limitNew: 0 });
    const rest = shuffle(ids.filter((x) => !due.includes(x)));
    runItems(root, [...due, ...rest].slice(0, 10), TYPE_LABEL[mode], cleanups);
  } else { location.hash = '#/reviser'; }
  return () => { while (cleanups.length) { try { cleanups.pop()(); } catch { /* rien */ } } };
}
