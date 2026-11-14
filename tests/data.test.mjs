// Valide toute la base : champs obligatoires, SMILES, flèches, liens entre fiches.
import test from 'node:test';
import assert from 'node:assert/strict';
import { REACTIONS, GROUPS, CATEGORIES, CONFIDENCE } from '../data/index.js';
import { depict, isText } from '../js/chem.js';
import { validateStep, schemeSvg, sceneSvg } from '../js/mech.js';
import { validateCard } from '../js/model.js';

const ids = new Set(REACTIONS.map((r) => r.id));

test('identifiants uniques', () => {
  assert.equal(ids.size, REACTIONS.length);
});

test('au moins 60 fiches et toutes les catégories représentées', () => {
  assert.ok(REACTIONS.length >= 60, `seulement ${REACTIONS.length} fiches`);
  for (const cat of Object.keys(CATEGORIES)) if (cat !== 'perso') assert.ok(REACTIONS.some((r) => r.cat === cat), `catégorie vide : ${cat}`);
});

for (const r of REACTIONS) {
  test(`fiche ${r.id}`, () => {
    assert.deepEqual(validateCard(r, { groups: GROUPS, categories: CATEGORIES, confidence: CONFIDENCE }), []);
    for (const a of r.analogues || []) assert.ok(ids.has(a), `analogue inconnu : ${a}`);
    for (const s of [...r.scheme.reactants, ...r.scheme.products]) assert.ok(depict(s).w > 0);
    assert.match(schemeSvg(r.scheme), /^<svg/);
    assert.ok(r.mech.length >= 2, 'mécanisme : au moins deux étapes');
    r.mech.forEach((st, i) => {
      assert.deepEqual(validateStep(st), [], `étape ${i + 1}`);
      assert.match(sceneSvg(st), /^<svg/);
      assert.ok(st.t && st.txt, `étape ${i + 1} : titre et explication requis`);
    });
    if (r.view3d) assert.ok(!isText(r.view3d) && depict(r.view3d).atoms.length > 1);
  });
}
