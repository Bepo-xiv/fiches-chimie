// Point d'entrée de la base de réactions.
// Pour ajouter un fichier de fiches : l'importer ici et l'ajouter à la liste REACTIONS.
import r1 from './r1-substitution-elimination.js';
import r2 from './r2-additions.js';
import r3 from './r3-aromatique.js';
import r4 from './r4-carbonyles.js';
import r5 from './r5-oxydations-reductions.js';
import r6 from './r6-transpositions.js';
import r7 from './r7-couplages.js';
import r8 from './r8-protections.js';
import r9 from './r9-radicalaire-medchem.js';
import r10 from './r10-classiques-carbonyles.js';
import r11 from './r11-classiques-divers.js';
import r12 from './r12-classiques-heterocycles-metaux.js';
import r13 from './r13-classiques-transpositions-radicaux.js';
import r14 from './r14-classiques-enolates-organometalliques.js';
import r15 from './r15-classiques-sigmatropiques-photochimie.js';

export { GROUPS, CATEGORIES, CONFIDENCE } from './groups.js';
export const REACTIONS = [...r1, ...r2, ...r3, ...r4, ...r5, ...r6, ...r7, ...r8, ...r9, ...r10, ...r11, ...r12, ...r13, ...r14, ...r15];
