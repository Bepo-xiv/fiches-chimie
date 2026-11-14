// Tests des modules purs : chimie, mécanismes, répétition espacée, recherche, quiz, sauvegarde, éditeur.
import test from 'node:test';
import assert from 'node:assert/strict';
import { REACTIONS, GROUPS } from '../data/index.js';
import { depict, canon, sameMolecule, hasSubstructure, isValidSmiles, molSvg, conformer } from '../js/chem.js';
import { parseArrow, formatArrow, buildScene, sceneSvg, schemeSvg, matchInkArrows, validateStep, sceneAnchors, arrowGeom } from '../js/mech.js';
import { review, newState, queue, stats, DAY, nextLabel } from '../js/srs.js';
import { searchCards, buildGraph, findPaths, reactionsTo, fold, rng, shuffle, distractors, allTags } from '../js/search.js';
import { makeQuestion, makeQuiz, gradeFromRatio, condSummary } from '../js/quiz.js';
import { serializeBackup, parseBackup, mergeState, defaultState, bytesToBase64, base64ToBytes } from '../js/backup.js';
import * as SM from '../js/sketch-model.js';
import { emptyCard, validateCard, slug, reviewItems } from '../js/model.js';

// ---------- Chimie ----------
test('rendu : ordre des atomes = ordre du SMILES, y compris avec H explicite', () => {
  const d = depict('CC(Br)C([2H])C');
  assert.equal(d.atoms.length, 6);
  assert.deepEqual(d.atoms.map((a) => a.el), ['C', 'C', 'Br', 'C', 'H', 'C']);
  assert.ok(!/>2<\/text>/.test(d.body), 'l’exposant isotopique doit être retiré');
  assert.ok(d.w > 20 && d.h > 20);
});

test('rendu : longueur de liaison constante entre molécules', () => {
  const len = (smi) => { const d = depict(smi); return Math.hypot(d.atoms[0].x - d.atoms[1].x, d.atoms[0].y - d.atoms[1].y); };
  assert.ok(Math.abs(len('CC') - len('CCCCCCCCc1ccccc1')) < 0.5);
});

test('rendu : charges lisibles et étiquettes de texte', () => {
  assert.match(depict('[OH-]').body, /−/);
  const t = depict('t:H₂O');
  assert.equal(t.text, true);
  assert.equal(t.atoms.length, 1);
  assert.match(molSvg('CCO'), /^<svg class="mol"/);
});

test('canonisation et comparaison de molécules', () => {
  assert.ok(sameMolecule('OCC', 'CCO'));
  assert.ok(sameMolecule('c1ccccc1O', 'Oc1ccccc1'));
  assert.ok(!sameMolecule('C[C@H](O)CC', 'C[C@@H](O)CC'));
  assert.ok(sameMolecule('C[C@H](O)CC', 'C[C@@H](O)CC', { stereo: false }));
  assert.equal(canon('[2H]C'), canon('C'));
  assert.ok(!isValidSmiles('C(('));
  assert.ok(!isValidSmiles(''));
});

test('recherche de sous-structure', () => {
  assert.ok(hasSubstructure('CC(=O)c1ccccc1', 'c1ccccc1'));
  assert.ok(hasSubstructure('CC(=O)OCC', 'C(=O)O'));
  assert.ok(!hasSubstructure('CCO', 'C=O'));
  assert.ok(!hasSubstructure('t:H₂O', 'O'));
});

test('conformère 3D', async () => {
  const m = await conformer('C[C@H](O)CC');
  assert.equal(m.atoms.length, 15);
  assert.ok(m.atoms.some((a) => Math.abs(a.p[2]) > 0.1), 'coordonnées réellement tridimensionnelles');
});

// ---------- Mécanismes ----------
test('notation des flèches : analyse et réécriture', () => {
  assert.deepEqual(parseArrow('0.0>1.1'), { hook: false, src: { kind: 'atom', m: 0, a: 0 }, dst: { kind: 'atom', m: 1, a: 1 }, flip: false, k: 0.42 });
  const a = parseArrow('~1.3-4>0.2+1.10@-0.6');
  assert.equal(a.hook, true);
  assert.deepEqual(a.src, { kind: 'bond', m: 1, a: 3, b: 4 });
  assert.deepEqual(a.dst, { kind: 'gap', m: 0, a: 2, n: 1, c: 10 });
  assert.equal(a.flip, true);
  assert.equal(a.k, 0.6);
  for (const s of ['0.0>1.1', '~0.1-2>0.2', '0.4-5>0.5+0.0', '1.0>0.3@-']) assert.equal(formatArrow(parseArrow(s)), s);
  assert.throws(() => parseArrow('0.0+0.1>0.2'));
  assert.throws(() => parseArrow('abc'));
});

test('scène : flèches ancrées sur les bons atomes', () => {
  const sc = buildScene({ mols: ['[OH-]', 'CCBr'], arrows: ['0.0>1.1', '1.1-2>1.2'] });
  assert.equal(sc.arrows.length, 2);
  const [O] = sc.L.species[0].d.atoms, C = sc.L.species[1].d.atoms[1];
  assert.ok(Math.abs(sc.arrows[0].p0.x - (sc.L.species[0].x + O.x)) < 0.01);
  assert.ok(Math.abs(sc.arrows[0].p1.x - (sc.L.species[1].x + C.x)) < 0.01);
  assert.match(sceneSvg({ mols: ['[OH-]', 'CCBr'], arrows: ['0.0>1.1'] }), /class="arrow on"/);
  assert.match(sceneSvg({ mols: ['[OH-]', 'CCBr'], arrows: ['0.0>1.1'] }, { arrows: 'step' }), /class="arrow"/);
  assert.ok(!/class="arrow/.test(sceneSvg({ mols: ['CCBr'], arrows: ['0.1-2>0.2'] }, { arrows: 'none' })));
  assert.equal(sceneAnchors(sc).length, 1 + 3 + 2);
});

test('scène : erreurs explicites', () => {
  assert.equal(validateStep({ mols: ['CCO'], arrows: ['0.0-1>0.2'] }).length, 0);
  assert.match(validateStep({ mols: ['CCO'], arrows: ['0.0-2>0.2'] })[0], /Pas de liaison/);
  assert.match(validateStep({ mols: ['CCO'], arrows: ['0.9>0.1'] })[0], /Atome 9 inexistant/);
  assert.match(validateStep({ mols: ['CCO'], arrows: ['3.0>0.1'] })[0], /Espèce n°3/);
  assert.match(validateStep({ mols: ['C(('] })[0], /SMILES invalide/);
  assert.deepEqual(validateStep({ mols: [] }), ['étape sans espèce']);
});

test('géométrie : la flèche est raccourcie aux extrémités et la demi-flèche diffère', () => {
  const g = arrowGeom({ x: 0, y: 0, r: 10 }, { x: 100, y: 0, r: 10 });
  assert.ok(Math.hypot(g.start.x, g.start.y) > 9.9);
  assert.notEqual(arrowGeom({ x: 0, y: 0 }, { x: 50, y: 0 }, { hook: true }).head, arrowGeom({ x: 0, y: 0 }, { x: 50, y: 0 }).head);
});

test('schéma réactionnel : masquage du produit et des conditions', () => {
  const sc = REACTIONS.find((r) => r.id === 'sn2').scheme;
  assert.match(schemeSvg(sc), /NaOH/);
  assert.ok(!/NaOH/.test(schemeSvg(sc, { hideConditions: true })));
  assert.ok(schemeSvg(sc, { hideProducts: true }).length < schemeSvg(sc).length);
});

test('correction automatique des flèches tracées', () => {
  const sc = buildScene({ mols: ['[OH-]', 'CCBr'], arrows: ['0.0>1.1', '1.1-2>1.2'] });
  const line = (a, b) => [{ x: a.x, y: a.y }, { x: (a.x + b.x) / 2, y: a.y - 20 }, { x: b.x, y: b.y }];
  const good = sc.arrows.map((a) => line(a.p0, a.p1));
  assert.deepEqual(matchInkArrows(sc, good), { results: [true, true], found: 2, expected: 2, extra: 0 });
  const reversed = [line(sc.arrows[0].p1, sc.arrows[0].p0)];
  assert.equal(matchInkArrows(sc, reversed).found, 0, 'une flèche à l’envers ne compte pas');
  assert.equal(matchInkArrows(sc, [good[0], [{ x: 0, y: 0 }, { x: 5, y: 5 }]]).extra, 1);
  assert.equal(matchInkArrows(sc, []).found, 0);
});

// ---------- Répétition espacée ----------
test('répétition espacée : intervalles croissants, échec = retour à zéro', () => {
  const t0 = 1_700_000_000_000;
  let s = review(newState(), 2, t0);
  assert.equal(s.interval, 1);
  s = review(s, 2, t0 + DAY);
  assert.equal(s.interval, 3);
  s = review(s, 2, t0 + 4 * DAY);
  assert.ok(s.interval >= 7);
  const easy = review(s, 3, t0 + 12 * DAY), hard = review(s, 1, t0 + 12 * DAY);
  assert.ok(easy.interval > hard.interval);
  assert.ok(easy.ease > s.ease && hard.ease < s.ease);
  const fail = review(s, 0, t0 + 12 * DAY);
  assert.equal(fail.reps, 0);
  assert.equal(fail.lapses, 1);
  assert.ok(fail.due - (t0 + 12 * DAY) < DAY / 24);
  for (let i = 0; i < 30; i++) s = review(s, 1, t0);
  assert.ok(s.ease >= 1.3);
  assert.equal(nextLabel(null, 0, t0), '10 min');
});

test('file de révision : dus d’abord, puis nouveaux en nombre limité', () => {
  const now = 1000 * DAY;
  const srs = { a: { due: now - 5 * DAY, interval: 3 }, b: { due: now - 1 * DAY, interval: 30 }, c: { due: now + DAY, interval: 2 } };
  assert.deepEqual(queue(['a', 'b', 'c', 'd', 'e', 'f'], srs, now, { limitNew: 2 }), ['a', 'b', 'd', 'e']);
  assert.deepEqual(stats(['a', 'b', 'c', 'd'], srs, now), { due: 2, fresh: 1, learning: 2, mature: 1, total: 4 });
});

// ---------- Recherche et graphe ----------
test('recherche : nom, accents, réactif, filtres', () => {
  assert.equal(searchCards(REACTIONS, { q: 'suzuki' })[0].id, 'suzuki');
  assert.equal(searchCards(REACTIONS, { q: 'elimination hofmann' })[0].id, 'hofmann-elimination');
  assert.ok(searchCards(REACTIONS, { q: 'mcpba' }).some((c) => c.id === 'epoxydation'));
  assert.ok(searchCards(REACTIONS, { reagent: 'NaBH₄' }).some((c) => c.id === 'luche'));
  assert.ok(searchCards(REACTIONS, { cat: 'protection' }).every((c) => c.cat === 'protection'));
  assert.ok(searchCards(REACTIONS, { from: 'alcyne', to: 'alcene' }).some((c) => c.id === 'hydrogenation-alcynes'));
  assert.deepEqual(searchCards(REACTIONS, { favOnly: true, favs: { sn2: true } }).map((c) => c.id), ['sn2']);
  assert.equal(searchCards(REACTIONS, { q: 'zzzzqq' }).length, 0);
  assert.equal(searchCards(REACTIONS, {}).length, REACTIONS.length);
  assert.equal(fold('Élimination'), 'elimination');
  assert.ok(allTags(REACTIONS)[0].n >= allTags(REACTIONS)[1].n);
});

test('graphe : chemins de synthèse entre groupes fonctionnels', () => {
  const edges = buildGraph(REACTIONS);
  for (const e of edges) assert.ok(GROUPS[e.from] && GROUPS[e.to]);
  assert.ok(reactionsTo(edges, 'epoxyde').some((e) => e.id === 'epoxydation'));
  const direct = findPaths(edges, 'alcool', 'aldehyde');
  assert.equal(direct[0].length, 1);
  assert.ok(direct[0][0].ids.includes('swern'));
  const multi = findPaths(edges, 'nitro', 'amide');
  assert.ok(multi.length > 0);
  assert.equal(multi[0][0].from, 'nitro');
  assert.equal(multi[0].at(-1).to, 'amide');
  for (const p of multi) for (let i = 1; i < p.length; i++) assert.equal(p[i].from, p[i - 1].to);
  assert.ok(multi.every((p, i) => i === 0 || p.length >= multi[i - 1].length), 'du plus court au plus long');
  assert.deepEqual(findPaths(edges, 'alcool', 'alcool'), []);
  assert.deepEqual(findPaths(edges, 'triazole', 'alcane', { maxLen: 2 }), []);
});

test('tirage déterministe', () => {
  const a = shuffle([1, 2, 3, 4, 5, 6], rng(42)), b = shuffle([1, 2, 3, 4, 5, 6], rng(42));
  assert.deepEqual(a, b);
  assert.deepEqual([...a].sort(), [1, 2, 3, 4, 5, 6]);
});

// ---------- Quiz ----------
test('QCM : une seule bonne réponse, quatre propositions distinctes', () => {
  const rand = rng(3);
  for (const type of ['produit', 'conditions', 'nom']) {
    const qs = makeQuiz(type, REACTIONS, REACTIONS, 10, rand);
    assert.equal(qs.length, 10);
    for (const q of qs) {
      assert.equal(q.options.length, 4);
      assert.equal(q.options.filter((o) => o.correct).length, 1);
      const keys = q.options.map((o) => o.smiles ? canon(o.smiles) : o.text);
      assert.equal(new Set(keys).size, 4, `propositions en double (${type}, ${q.card.id})`);
      assert.equal(q.options.find((o) => o.correct).id, q.card.id);
    }
  }
  assert.equal(makeQuestion('produit', REACTIONS[0], [REACTIONS[0]]), null);
  assert.throws(() => makeQuestion('inconnu', REACTIONS[0], REACTIONS));
  assert.ok(condSummary(REACTIONS[0]).includes('NaOH'));
  const d = distractors(REACTIONS[0], REACTIONS, (c) => c.name, 3, rng(1));
  assert.ok(d.every((c) => c.id !== REACTIONS[0].id));
});

test('note suggérée à partir des flèches trouvées', () => {
  assert.equal(gradeFromRatio(3, 3, 0), 3);
  assert.equal(gradeFromRatio(3, 3, 2), 2);
  assert.equal(gradeFromRatio(2, 3), 1);
  assert.equal(gradeFromRatio(0, 3), 0);
});

// ---------- Sauvegarde ----------
test('sauvegarde : aller-retour complet, PDF compris', () => {
  const st = defaultState();
  st.fav.sn2 = true; st.notes.sn2 = 'inversion !'; st.srs['sn2|fiche'] = { due: 5, last: 3, interval: 1 };
  st.custom.demo = { id: 'demo', name: 'Démo' }; st.ink['note:sn2'] = [{ t: 'pen', c: '#000', w: 0.004, p: [0.1, 0.1, 0.5] }];
  const bytes = new Uint8Array(70000).map((_, i) => (i * 7) % 256);
  const text = serializeBackup(st, [{ id: 'pdf-1', name: 'fiche.pdf', type: 'application/pdf', data: bytes }], new Date('2026-11-14T10:00:00Z'));
  const back = parseBackup(text);
  assert.deepEqual(back.state, st);
  assert.equal(back.date, '2026-11-14T10:00:00.000Z');
  assert.equal(back.files.length, 1);
  assert.deepEqual([...back.files[0].data.slice(0, 50)], [...bytes.slice(0, 50)]);
  assert.equal(back.files[0].data.length, 70000);
  assert.deepEqual([...base64ToBytes(bytesToBase64(new Uint8Array([0, 255, 128])))], [0, 255, 128]);
});

test('sauvegarde : fichiers refusés ou incomplets', () => {
  assert.throws(() => parseBackup('pas du json'), /JSON/);
  assert.throws(() => parseBackup('{"format":"autre"}'), /sauvegarde/);
  assert.throws(() => parseBackup(JSON.stringify({ format: 'fiches-chimie-organique', version: 99 })), /Version/);
  const partial = parseBackup(JSON.stringify({ format: 'fiches-chimie-organique', version: 1, state: { fav: { a: true }, srs: 'cassé', oral: {} } }));
  assert.deepEqual(partial.state.fav, { a: true });
  assert.deepEqual(partial.state.srs, {});
  assert.deepEqual(partial.state.oral, []);
  assert.equal(partial.state.settings.theme, 'auto');
});

test('fusion de sauvegardes : la progression la plus récente gagne', () => {
  const cur = defaultState(), inc = defaultState();
  cur.srs.a = { last: 10, interval: 5 }; inc.srs.a = { last: 5, interval: 1 }; inc.srs.b = { last: 1, interval: 2 };
  cur.notes.x = 'ici'; inc.notes.y = 'là'; cur.settings.theme = 'dark';
  cur.oral = [{ t: 1, id: 'a', score: 5 }]; inc.oral = [{ t: 1, id: 'a', score: 5 }, { t: 2, id: 'b', score: 7 }];
  const m = mergeState(cur, inc);
  assert.equal(m.srs.a.interval, 5);
  assert.equal(m.srs.b.interval, 2);
  assert.deepEqual(m.notes, { x: 'ici', y: 'là' });
  assert.equal(m.settings.theme, 'dark');
  assert.equal(m.oral.length, 2);
});

// ---------- Éditeur de structures ----------
test('éditeur : aller-retour SMILES → esquisse → SMILES, stéréochimie comprise', () => {
  for (const smi of ['CCO', 'c1ccccc1O', 'C[C@H](O)CC', 'C[C@@H](O)CC', 'C[C@H]1CCCC[C@@H]1O', 'CC/C=C/CC', 'CC/C=C\\CC', 'C[N+](C)(C)C', 'CC#N', 'OC(=O)[C@@H](N)Cc1ccccc1']) {
    assert.ok(sameMolecule(SM.toSmiles(SM.fromSmiles(smi)), smi), smi);
  }
  assert.equal(SM.toSmiles(SM.emptySketch()), '');
});

test('éditeur : construction au trait', () => {
  const sk = SM.emptySketch();
  sk.atoms.push({ x: 0, y: 0, el: 'C', q: 0 });
  const b = SM.sprout(sk, 0), c = SM.sprout(sk, b);
  assert.ok(sameMolecule(SM.toSmiles(sk), 'CCC'));
  const d0 = Math.hypot(sk.atoms[c].x - sk.atoms[b].x, sk.atoms[c].y - sk.atoms[b].y);
  assert.ok(Math.abs(d0 - SM.BOND) < 0.01);
  sk.atoms[c].el = 'O';
  sk.bonds[1].o = 2;
  assert.ok(sameMolecule(SM.toSmiles(sk), 'CC=O'));
  assert.deepEqual(SM.implicitH(sk), [3, 1, 0]);
  assert.deepEqual(SM.hit(sk, sk.atoms[0].x + 3, sk.atoms[0].y - 2), { atom: 0 });
  const mid = { x: (sk.atoms[0].x + sk.atoms[1].x) / 2, y: (sk.atoms[0].y + sk.atoms[1].y) / 2 };
  assert.deepEqual(SM.hit(sk, mid.x, mid.y), { bond: 0 });
  assert.equal(SM.hit(sk, 500, 500), null);
  SM.removeAtom(sk, 0);
  assert.ok(sameMolecule(SM.toSmiles(sk), 'C=O'));
});

test('éditeur : cycles isolés, greffés et accolés', () => {
  const sk = SM.emptySketch();
  SM.addRing(sk, 6, true, { x: 0, y: 0 });
  assert.ok(sameMolecule(SM.toSmiles(sk), 'c1ccccc1'));
  SM.addRing(sk, 6, true, { bond: 0 });
  assert.equal(sk.atoms.length, 10);
  assert.ok(sameMolecule(SM.toSmiles(sk), 'c1ccc2ccccc2c1'), 'naphtalène attendu, obtenu ' + SM.toSmiles(sk));
  const s2 = SM.emptySketch();
  SM.addRing(s2, 6, false, { x: 0, y: 0 });
  SM.addRing(s2, 5, false, { atom: 0 });
  assert.ok(sameMolecule(SM.toSmiles(s2), 'C1CCCCC12CCCC2'), 'spiro attendu, obtenu ' + SM.toSmiles(s2));
  const s3 = SM.emptySketch();
  SM.addRing(s3, 3, false, { x: 0, y: 0 });
  assert.ok(sameMolecule(SM.toSmiles(s3), 'C1CC1'));
  const e = SM.snapEnd(0, 0, 50, 3);
  assert.ok(Math.abs(e.x - SM.BOND) < 0.01 && Math.abs(e.y) < 0.01);
});

// ---------- Modèle de fiche ----------
test('modèle : fiche vide, identifiant, validation souple pour les fiches personnelles', () => {
  const c = emptyCard();
  assert.equal(slug('Réaction de Diels–Alder (endo) !'), 'reaction-de-diels-alder-endo');
  assert.ok(validateCard(c, { strict: false }).length >= 3);
  Object.assign(c, { id: 'ma-fiche', name: 'Ma fiche' });
  c.scheme.reactants = ['CCO']; c.scheme.products = ['CC=O'];
  assert.deepEqual(validateCard(c, { strict: false }), []);
  c.mech = [{ t: 'x', mols: ['CCO'], arrows: ['0.0>0.7'], txt: '' }];
  assert.match(validateCard(c, { strict: false })[0], /étape 1/);
  assert.ok(validateCard(c, { strict: true }).length > 5);
  assert.deepEqual(reviewItems(REACTIONS.find((r) => r.id === 'sn2')), ['sn2|fiche', 'sn2|produit', 'sn2|conditions', 'sn2|fleches']);
  assert.deepEqual(reviewItems(REACTIONS.find((r) => r.id === 'suzuki')), ['suzuki|fiche', 'suzuki|produit', 'suzuki|conditions']);
});
