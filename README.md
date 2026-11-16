# Fiches de chimie organique

Application de fiches de réactions pour iPad et Apple Pencil : 90 réactions, mécanismes animés flèche par
flèche, révision au Pencil avec correction automatique des flèches, répétition espacée, QCM, oral blanc,
carte des réactions avec recherche de chemins de synthèse, aide à la rétrosynthèse, comparaison de fiches,
PDF manuscrits joints et annotés, éditeur de structures et de fiches.

Deux écrans reprennent la fiche de référence « Réactions et réactifs inorganiques de la chimie organique » :
**Réactifs** (230 fiches : ce que fait chaque réactif cité, quand l'utiliser, réactions liées) et **Index**
(toutes les réactions citées, avec lien vers la fiche détaillée quand elle existe).

100 % hors ligne, sans compte ni serveur. Sauvegarde et restauration par fichier.

## Démarrer

- Essayer sur le PC : double-cliquer sur `essayer-sur-le-pc.bat`.
- Installer sur l'iPad : suivre [docs/GUIDE_INSTALLATION.md](docs/GUIDE_INSTALLATION.md).
- Publier une mise à jour : double-cliquer sur `publier.bat`.
- Lancer les tests : `npm test`.

## Documentation

- [Conception](docs/CONCEPTION.md) : choix techniques, modèle de données, architecture, maquettes, plan.
- [Guide d'installation](docs/GUIDE_INSTALLATION.md)
- [Ajouter des fiches](docs/AJOUTER_DES_FICHES.md)
- [Limites et idées d'évolution](docs/LIMITES_ET_IDEES.md)

## Avertissement

Les fiches sont un support de révision. Les conditions expérimentales sont des valeurs typiques à vérifier
dans la littérature ; chaque fiche indique son niveau de confiance et une référence à contrôler.

Bibliothèques incluses : OpenChemLib (BSD-3-Clause), PDF.js (Apache-2.0). Voir `vendor/`.
