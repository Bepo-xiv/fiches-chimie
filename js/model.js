// model.js — modèle de données d'une fiche : validation, fiche vide, éléments de révision.
import { isValidSmiles, isText } from './chem.js';
import { validateStep } from './mech.js';

export const COND_FIELDS = [
  ['reactifs', 'Réactifs'], ['catalyseur', 'Catalyseur / additif'], ['solvant', 'Solvant'], ['temperature', 'Température'],
  ['duree', 'Durée'], ['atmosphere', 'Atmosphère'], ['traitement', 'Traitement'], ['rendement', 'Rendement typique'],
];

export function emptyCard() {
  return {
    id: '', name: '', aka: [], cat: 'perso', tags: [], from: [], to: [],
    scheme: { reactants: [], products: [], over: [], under: [] },
    cond: { reactifs: '', catalyseur: '', solvant: '', temperature: '', duree: '', atmosphere: '', traitement: '', rendement: '', incertain: '' },
    mech: [], stereo: '', select: '', compat: { ok: '', ko: '' }, data: [], analogues: [], appli: '', pieges: [],
    view3d: '', conf: 'basse', ref: '', custom: true,
  };
}

export function slug(name) {
  return String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

const okSpecies = (s) => typeof s === 'string' && (isText(s) ? s.length > 2 : isValidSmiles(s));

/** Liste des problèmes d'une fiche (vide si valide). `strict` exige les champs rédactionnels. */
export function validateCard(c, { groups, categories, confidence, strict = true } = {}) {
  const e = [];
  if (!c || typeof c !== 'object') return ['fiche absente'];
  if (!c.id || !/^[a-z0-9-]+$/.test(c.id)) e.push('identifiant invalide (minuscules, chiffres, tirets)');
  if (!c.name) e.push('nom manquant');
  if (categories && !categories[c.cat]) e.push(`catégorie inconnue : ${c.cat}`);
  for (const k of ['from', 'to']) for (const g of c[k] || []) if (groups && !groups[g]) e.push(`groupe fonctionnel inconnu : ${g}`);
  const sc = c.scheme || {};
  if (!sc.reactants?.length) e.push('schéma : réactif manquant');
  if (!sc.products?.length) e.push('schéma : produit manquant');
  for (const s of [...(sc.reactants || []), ...(sc.products || [])]) if (!okSpecies(s)) e.push(`schéma : espèce invalide « ${s} »`);
  (c.mech || []).forEach((st, i) => { for (const m of validateStep(st)) e.push(`mécanisme, étape ${i + 1} : ${m}`); });
  if (c.view3d && !isValidSmiles(c.view3d)) e.push('SMILES 3D invalide');
  if (strict) {
    if (!c.from?.length || !c.to?.length) e.push('groupes de départ et d’arrivée requis');
    for (const k of ['reactifs', 'solvant', 'temperature', 'duree', 'atmosphere', 'traitement', 'rendement']) if (!c.cond?.[k]) e.push(`conditions : « ${k} » manquant`);
    for (const k of ['stereo', 'select', 'appli', 'ref']) if (!c[k]) e.push(`champ manquant : ${k}`);
    if (!c.compat?.ok || !c.compat?.ko) e.push('compatibilité des groupes fonctionnels manquante');
    if (!c.pieges?.length) e.push('pièges manquants');
    if (!c.tags?.length) e.push('tags manquants');
    if (confidence && !confidence[c.conf]) e.push(`niveau de confiance inconnu : ${c.conf}`);
  }
  return e;
}

/** Types d'exercices de révision disponibles pour une fiche. */
export function reviewItems(card) {
  const items = [`${card.id}|fiche`];
  if (card.scheme?.products?.length) items.push(`${card.id}|produit`);
  if (card.scheme?.over?.length || card.scheme?.under?.length) items.push(`${card.id}|conditions`);
  if ((card.mech || []).some((s) => s.arrows?.length)) items.push(`${card.id}|fleches`);
  return items;
}
