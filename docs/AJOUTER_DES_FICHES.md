# Ajouter ou modifier des fiches

Deux méthodes. La première suffit dans presque tous les cas.

## Méthode 1 : dans l'app, sur l'iPad

1. **Fiches > + Fiche** (ou, sur une fiche existante, **Modifier** pour en partir).
2. **Identité** : nom, catégorie, tags, groupes fonctionnels de départ et d'arrivée
   (ce sont eux qui placent la réaction sur la carte et dans l'aide à la rétrosynthèse).
3. **Principe** : *+ Dessiner* ouvre l'éditeur de structures.
   - Outil **Liaison** : toucher un atome l'allonge d'un carbone ; glisser trace une liaison ;
     toucher une liaison la fait passer de simple à double puis triple.
   - **Atome** : choisir un élément puis toucher l'atome à changer. **Cycle** : toucher le vide, un atome
     (cycle greffé) ou une liaison (cycle accolé). **Coin ▲ / Coin ┆** : toucher une liaison pour la
     stéréochimie (toucher à nouveau inverse le sens, une troisième fois l'annule).
   - *+ Texte* ajoute une étiquette libre (« H₂O », « base »…). On peut aussi saisir un SMILES.
4. **Mécanisme** : *+ Ajouter une étape*, placer les espèces, puis tracer les flèches :
   toucher la source (un atome pour un doublet, le milieu d'une liaison), puis la cible.
   « Vers nouvelle liaison » demande deux atomes ; « Demi-flèche » sert aux radicaux ; ⤾ inverse la courbure.
   Pour montrer un hydrogène, l'ajouter comme atome H dans l'éditeur.
5. **Points importants**, niveau de confiance, référence. **Enregistrer**.

Une fiche de la base modifiée garde une copie de l'original : **Modifier > Rétablir l'original**.
**Exporter cette fiche** produit un fichier `.json` ; **Nouvelle fiche > Importer une fiche** le relit.
Les fiches personnelles sont comprises dans la sauvegarde (Réglages).

## Méthode 2 : dans les fichiers du projet, sur le PC

Utile pour ajouter beaucoup de fiches ou les intégrer définitivement à la base.

1. Ouvrir un fichier `data/r*.js` (ou en créer un et l'ajouter dans `data/index.js`).
2. Copier une fiche voisine et l'adapter. Le format est décrit dans `docs/CONCEPTION.md` (section 3).
3. Double-cliquer sur `essayer-sur-le-pc.bat` pour voir le résultat.
4. Vérifier : dans PowerShell, `npm test`. Chaque fiche est contrôlée : SMILES valides, flèches qui
   désignent des atomes et des liaisons existants, champs obligatoires, liens vers des fiches existantes.
   Un message tel que « fiche wittig : étape 2 : Pas de liaison 0-3 » indique exactement quoi corriger.
5. `publier.bat` pour envoyer sur l'iPad.

Numérotation des atomes : dans `CC(Br)C([2H])C`, C = 0, C = 1, Br = 2, C = 3, H = 4, C = 5.
Astuce : dessiner la molécule dans l'app, puis construire les flèches au toucher dans l'éditeur de fiches ;
la notation s'affiche sous la scène (« 1. 0.2>1.4 ») et peut être recopiée telle quelle dans le fichier.

Pour ajouter un groupe fonctionnel ou une catégorie : `data/groups.js`.

## Rédiger une bonne fiche

- Une étape de mécanisme = un événement (une attaque, un départ, un transfert de proton), deux à quatre flèches.
- Écrire les intermédiaires réels (charges, H explicites sur les protons transférés).
- Signaler ce qui est incertain dans « Conditions incertaines » et régler le niveau de confiance en conséquence.
- Toujours noter une référence, même un chapitre de cours, pour pouvoir vérifier plus tard.
