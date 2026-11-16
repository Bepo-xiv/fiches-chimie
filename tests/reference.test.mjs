// La fiche de référence est-elle entièrement reprise dans l'app ? (réactions citées, réactifs cités)
import test from 'node:test';
import assert from 'node:assert/strict';
import { REACTIONS } from '../data/index.js';
import { REF_SECTIONS } from '../data/reference.js';
import { RX_INDEX, LINK_TARGETS, linkFor, rxKey } from '../data/reference-liens.js';
import { REACTIFS, missingReagents, findReagent, reagentKey } from '../data/reactifs.js';

const ids = new Set(REACTIONS.map((r) => r.id));

test('index : toutes les sections de la Liste 1 sont reprises', () => {
  const codes = RX_INDEX.map((s) => s.code);
  for (const c of ['A1', 'A9', 'B1', 'B8', 'C1', 'C6', 'D1', 'D7', 'E1', 'E7', 'F1', 'F3', 'G', 'H1', 'H8', 'I']) assert.ok(codes.includes(c), 'section absente : ' + c);
  const names = new Set(RX_INDEX.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => i.name))));
  assert.ok(names.size > 1700, `seulement ${names.size} réactions distinctes`);
  for (const n of ['Nazarov', 'Finkelstein', 'Pauson–Khand', 'Achmatowicz', 'Zincke', 'Mukaiyama', 'Wolff–Kishner']) assert.ok([...names].some((x) => rxKey(x).startsWith(rxKey(n))), 'réaction absente de l’index : ' + n);
  const I = RX_INDEX.find((s) => s.code === 'I');
  assert.equal(I.groups.length, 25);
  assert.equal(I.groups[0].label, 'A');
  assert.equal(I.groups[0].items[0].name, 'Abramov');
});

test('index : les liens pointent vers des fiches existantes, et presque toutes les fiches sont atteintes', () => {
  for (const id of LINK_TARGETS) assert.ok(ids.has(id), 'lien vers une fiche inconnue : ' + id);
  const reached = new Set(RX_INDEX.flatMap((s) => s.groups.flatMap((g) => g.items.map((i) => i.card).filter(Boolean))));
  const orphan = REACTIONS.map((r) => r.id).filter((id) => !reached.has(id));
  assert.ok(orphan.length <= 6, 'fiches jamais atteintes depuis l’index : ' + orphan.join(', '));
  assert.equal(linkFor('Claisen (aliphatique et aromatique)', 'E4'), 'claisen-rearr');
  assert.equal(linkFor('Claisen', 'C1'), 'claisen-condensation');
  assert.equal(linkFor('Hofmann', 'E2'), 'hofmann-rearr');
  assert.equal(linkFor('Wittig [1,2]', 'E3'), null);
  assert.equal(linkFor('Wittig (modification de Schlosser)', 'C4'), 'wittig');
});

test('réactifs : chaque réactif cité dans la Liste 2 a sa fiche', () => {
  assert.deepEqual(missingReagents(), []);
  const cited = REF_SECTIONS.filter((s) => s.list === 2).flatMap((s) => s.groups.flatMap((g) => g.items));
  assert.ok(cited.length > 800 && new Set(cited.map(reagentKey)).size > 550);
  assert.equal(findReagent('H₂CrO₄ (réactif de Jones : CrO₃ / H₂SO₄)').name, 'CrO₃');
  assert.equal(findReagent('Pd/CaCO₃ empoisonné au plomb (Lindlar)').cards[0], 'hydrogenation-alcynes');
  assert.equal(findReagent('AD-mix (K₂OsO₂(OH)₄ / K₃Fe(CN)₆ / K₂CO₃ + ligand)').name, 'AD-mix');
});

test('réactifs : fiches complètes, noms uniques, liens valides', () => {
  assert.ok(REACTIFS.length >= 220);
  const seen = new Map();
  for (const r of REACTIFS) {
    assert.ok(r.name && r.fam, 'fiche sans nom ou sans famille');
    assert.ok(r.what.length > 25, `« ${r.name} » : rôle trop court`);
    assert.ok(r.when.length > 0, `« ${r.name} » : contexte manquant`);
    for (const c of r.cards) assert.ok(ids.has(c), `« ${r.name} » : fiche réaction inconnue ${c}`);
    for (const n of [r.name, ...r.aliases]) {
      const k = reagentKey(n);
      assert.ok(!seen.has(k) || seen.get(k) === r.id, `nom en double : ${n}`);
      seen.set(k, r.id);
    }
    assert.ok(r.cited?.length, `« ${r.name} » n’est rattaché à aucune rubrique de la fiche de référence`);
  }
});

test('index : chaque réaction citée a une fiche détaillée ou un résumé', async () => {
  const { missingSummaries, unusedSummaries, SUMMARY_ERRORS, SUMMARY_COUNT, summaryFor } = await import('../data/resumes.js');
  assert.deepEqual(SUMMARY_ERRORS, []);
  assert.deepEqual(missingSummaries(), []);
  assert.deepEqual(unusedSummaries(), [], 'résumés dont le nom ne correspond à aucune réaction de l’index');
  assert.ok(SUMMARY_COUNT > 1350, `seulement ${SUMMARY_COUNT} résumés`);
  for (const s of RX_INDEX) for (const g of s.groups) for (const it of g.items) {
    const r = summaryFor(it.name);
    if (!r) continue;
    assert.ok(r.what.length > 8, `« ${it.name} » : description trop courte`);
    assert.ok(r.how.length > 0, `« ${it.name} » : conditions trop courtes`);
  }
  assert.match(summaryFor('Nazarov').what, /cyclopenténone/);
  assert.match(summaryFor('Finkelstein (échange d\'halogène)').how, /NaI/);
});

test('index : le tableau des groupes protecteurs ne déborde plus dans H1', () => {
  const H1 = RX_INDEX.find((s) => s.code === 'H1');
  assert.ok(H1.groups.every((g) => g.label), 'groupe sans titre dans H1');
  assert.ok(H1.groups.every((g) => g.items.every((i) => i.name.length < 90)), 'entrée anormalement longue dans H1');
  const G = RX_INDEX.find((s) => s.code === 'G');
  assert.ok(G.groups.some((g) => g.label === 'Acide boronique'));
});
