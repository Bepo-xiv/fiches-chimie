// quiz.js — génération des questions de QCM (pur, testable).
import { shuffle, distractors } from './search.js';
import { canon, isText } from './chem.js';

export const QUIZ_TYPES = {
  produit: { name: 'Prédis le produit', hint: 'Réactifs et conditions donnés : quel est le produit ?' },
  conditions: { name: 'Trouve les conditions', hint: 'Réactif et produit donnés : quelles conditions ?' },
  nom: { name: 'Quelle réaction mène de A à B ?', hint: 'Transformation donnée : nommer la réaction.' },
};

export const condSummary = (c) => [...(c.scheme?.over || []), ...(c.scheme?.under || [])].join(' · ');

/** Clé canonique du produit principal (pour éviter deux propositions identiques). */
export function productKey(c) {
  const p = c.scheme?.products?.[0];
  if (!p) return '';
  if (isText(p)) return p;
  try { return canon(p); } catch { return p; }
}

/**
 * Construit une question. Retour : { type, card, options:[{ id, correct, text?, smiles? }] } ou null si impossible.
 */
export function makeQuestion(type, card, pool, rand = Math.random) {
  let keyOf, toOption;
  if (type === 'produit') {
    keyOf = productKey;
    toOption = (c) => ({ smiles: c.scheme.products[0] });
  } else if (type === 'conditions') {
    keyOf = condSummary;
    toOption = (c) => ({ text: condSummary(c) });
  } else if (type === 'nom') {
    keyOf = (c) => c.name;
    toOption = (c) => ({ text: c.name });
  } else throw new Error('Type de quiz inconnu : ' + type);
  if (!keyOf(card)) return null;
  const wrong = distractors(card, pool, keyOf, 3, rand);
  if (wrong.length < 3) return null;
  const options = shuffle([{ id: card.id, correct: true, ...toOption(card) }, ...wrong.map((c) => ({ id: c.id, correct: false, ...toOption(c) }))], rand);
  return { type, card, options };
}

/** Série de questions tirées au hasard dans `cards`. */
export function makeQuiz(type, cards, pool, n = 10, rand = Math.random) {
  const out = [];
  for (const c of shuffle(cards, rand)) {
    const q = makeQuestion(type, c, pool, rand);
    if (q) out.push(q);
    if (out.length === n) break;
  }
  return out;
}

/** Convertit un résultat d'exercice en note de répétition espacée (0 à 3). */
export function gradeFromRatio(found, expected, extra = 0) {
  if (!expected) return 2;
  const r = found / expected;
  if (r >= 1 && extra === 0) return 3;
  if (r >= 1) return 2;
  if (r >= 0.5) return 1;
  return 0;
}
