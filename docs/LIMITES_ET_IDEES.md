# Limites connues et idées d'évolution

## Limites connues

**Contenu**

- 90 fiches : large, mais pas exhaustif. Absents notamment : hétérocycles (Fischer, Paal-Knorr, Hantzsch),
  chimie des sucres et des peptides en détail, organocatalyse, photoredox, C–H activation, Kumada, Hiyama,
  Ullmann, Chan-Lam, Mannich, Stork, Corey-Fuchs, Julia, Peterson, Shapiro, Favorskii, Wolff, Nazarov.
- Les fiches sont rédigées de mémoire d'après les connaissances de cours : chacune porte un niveau de confiance
  et une référence **à vérifier**. Les quantités, températures et durées sont des ordres de grandeur typiques,
  pas des protocoles : ne jamais manipuler sans consulter la littérature et les fiches de sécurité.
- Les références bibliographiques n'ont pas été contrôlées une à une (auteurs, année, pages) : les vérifier
  avant de les citer.
- Les cycles catalytiques (palladium, métathèse, cuivre) sont décrits étape par étape sans flèches courbes.
- Une espèce par structure de résonance : les formes limites ne sont pas dessinées côte à côte.
- Pas d'états de transition dessinés en perspective (chaise de Zimmerman-Traxler, bipyramide SN2) :
  ils sont décrits dans le texte.

**Chimie calculée**

- La carte relie chaque groupe de départ à chaque groupe d'arrivée d'une fiche : certains liens sont
  approximatifs (réactions à deux partenaires), et les chemins proposés ignorent la compatibilité du reste
  de la molécule. C'est une aide à la réflexion, pas un outil de rétrosynthèse.
- La détection des groupes fonctionnels dans une molécule dessinée repose sur des motifs simples
  (un ester est aussi reconnu comme « éther »).
- La vue 3D montre un conformère calculé par champ de force, pas nécessairement le plus stable,
  et jamais un état de transition.
- OpenChemLib accepte certains SMILES mal formés sans protester ; seules les parenthèses et crochets
  non appariés sont refusés en plus.

**Apple Pencil et iPad**

- L'app n'a pu être testée que dans un navigateur sur PC (souris, fenêtres de la taille d'un iPad en paysage,
  en portrait et en Slide Over). Le comportement réel du Pencil sur iPadOS (rejet de la paume, défilement au
  doigt pendant qu'on écrit) repose sur des techniques standard mais reste **à vérifier sur l'iPad**.
  En cas de souci, le bouton « Doigt » de la barre d'outils bascule le mode de saisie.
- Pas de double-tap du Pencil, pas d'effet de survol, latence un peu supérieure à une app native.
- La correction automatique des flèches compare le départ et l'arrivée de chaque trait aux positions
  attendues (tolérance d'environ une demi-liaison) : une flèche juste mais tracée de travers peut être refusée,
  d'où l'auto-évaluation qui suit toujours. Le produit dessiné à main levée n'est pas reconnu : pour une
  correction automatique du produit, utiliser le bouton « Répondre dans l'éditeur ».
- L'éditeur de structures ne gère ni les abréviations (Ph, Boc, R), ni la sélection ou le déplacement
  de fragments, ni le zoom au pincement.

**Données et système**

- Les données vivent dans le stockage de l'app sur l'iPad. Supprimer l'icône de l'écran d'accueil ou
  « Effacer historique et données » dans Safari les efface : exporter des sauvegardes.
- Pas de synchronisation entre appareils (choix : ni compte ni serveur). Le transfert se fait par fichier.
- Le fichier de sauvegarde contient les PDF : il peut peser plusieurs dizaines de Mo.
- L'hébergement GitHub Pages gratuit impose un dépôt public (le texte des fiches est visible).
- Les annotations d'un PDF sont enregistrées dans l'app, pas dans le fichier PDF lui-même.

## Idées d'évolution (à choisir)

1. **Compléter la base** : hétérocycles, réactions nommées manquantes, chimie des sucres, organocatalyse.
2. **Formes de résonance et états de transition** : étapes à plusieurs lignes, crochets et double flèche ↔,
   dessins en perspective prêts à l'emploi (chaise, Newman, bipyramide).
3. **Cycles catalytiques dessinés en cercle**, avec l'espèce active mise en évidence à chaque étape.
4. **Quiz « quel réactif ? »** à partir d'un schéma à trous, et **quiz de synthèse en plusieurs étapes**
   générés depuis la carte (« de l'alcyne à l'amide en trois étapes »).
5. **Reconnaissance du produit dessiné à main levée** (conversion du tracé en structure).
6. **Tableau de bord de progression** : courbe de rétention, fiches fragiles, calendrier des révisions.
7. **Mode examen** : série chronométrée mêlant tous les types d'exercices, avec bilan par catégorie.
8. **Fiches de synthèse transversales** : tableau des groupes protecteurs et de leur orthogonalité,
   tableau des réducteurs et des oxydants par groupe fonctionnel, règles de Baldwin, effets stéréoélectroniques.
9. **Export PDF d'une fiche** pour impression, et export de toutes les fiches en livret.
10. **Abréviations dans l'éditeur** (Ph, Bn, Boc, TBS, R) et sélection/déplacement au lasso.
11. **Recherche plein texte dans les notes et les PDF annotés**, et lien d'une annotation vers une étape.
12. **Partage de fiches** entre camarades par fichier ou QR code.
13. **Version native** (SwiftUI + PencilKit) réutilisant le même format de fiches, si un Mac devient disponible.
