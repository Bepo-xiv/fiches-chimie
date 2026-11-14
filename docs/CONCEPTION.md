# Conception

## 1. Choix de la plateforme

| Critère | (a) PWA installée depuis Safari | (b) SwiftUI dans Swift Playgrounds |
|---|---|---|
| Développement sans Mac | Oui, depuis le PC Windows | Oui, mais tout se tape sur l'iPad |
| Tests automatiques | Oui (Node, 118 tests) | Non |
| Rendu de molécules depuis SMILES | OpenChemLib (bibliothèque mûre) | Rien de disponible : à réécrire à la main |
| Recherche par sous-structure, SMILES canoniques | Oui (OpenChemLib) | À réécrire |
| Apple Pencil | Pointer Events : pression, rejet de paume | PencilKit natif (meilleur : latence, double-tap) |
| Hors ligne, sans compte | Oui (service worker) | Oui |
| Sauvegarde par fichier | Feuille de partage / Fichiers | Fichiers |
| Split View, Slide Over | Oui (mise en page adaptative) | Oui |
| Lecture et annotation de PDF | PDF.js + calque d'encre | PDFKit natif |
| Mise à jour | Un double-clic sur le PC, bandeau sur l'iPad | Recopier le projet sur l'iPad |

**Recommandation : la PWA.** L'avantage décisif est la bibliothèque de chimie et la possibilité de tester.
Le seul point où le natif serait nettement meilleur est le confort du Pencil (latence, double-tap), secondaire ici.

## 2. Bibliothèque de molécules : OpenChemLib 9

- Un seul fichier JavaScript (1,1 Mo), pas de WebAssembly ni de serveur : idéal hors ligne.
- Rendu SVG vectoriel net à tout niveau de zoom, longueur de liaison constante (24 px) d'une molécule à l'autre.
- Canonisation (comparaison de réponses dans les quiz), recherche par sous-structure, stéréochimie, conformères 3D.
- Alternatives écartées : RDKit.js (WebAssembly de 6 Mo, plus lourd à mettre en cache), SmilesDrawer (rendu seul),
  Ketcher (éditeur complet mais très lourd et pensé pour la souris).
- L'éditeur de structures est écrit sur mesure pour le Pencil (toucher pour allonger, glisser pour tracer) ;
  OpenChemLib ne sert qu'à convertir le dessin en SMILES.

## 3. Modèle de données

### Fiche (`data/r*.js`, ou créée dans l'app)

```js
{
  id: 'sn2',                       // identifiant unique (minuscules, chiffres, tirets)
  name: 'Substitution nucléophile bimoléculaire (SN2)',
  aka: ['SN2', 'inversion de Walden'],
  cat: 'substitution',             // catégorie (data/groups.js)
  tags: ['fondamental', 'inversion'],
  from: ['halogenure'],            // groupes fonctionnels de départ  ┐ nœuds de la carte,
  to: ['alcool', 'ether'],         // groupes fonctionnels d'arrivée  ┘ rétrosynthèse, recherche
  scheme: {                        // 1. Principe
    reactants: ['C[C@@H](Br)CC', '[OH-]'],   // SMILES, ou 't:texte libre'
    products: ['C[C@H](O)CC', '[Br-]'],
    over: ['NaOH'], under: ['DMSO, 25 °C'],   // texte au-dessus et au-dessous de la flèche
  },
  cond: { reactifs, catalyseur, solvant, temperature, duree, atmosphere, traitement, rendement, incertain },
  mech: [ /* étapes, voir ci-dessous */ ],   // 2. Mécanisme
  stereo: '…', select: '…',        // 3. Points importants
  compat: { ok: '…', ko: '…' },
  data: ['pKa…'], analogues: ['sn1', 'e2'], appli: '…', pieges: ['…'],
  view3d: 'C[C@@H](Br)CC',         // SMILES montré en 3D (facultatif)
  conf: 'haute' | 'moyenne' | 'basse',       // niveau de confiance
  ref: 'référence bibliographique à vérifier',
}
```

### Étape de mécanisme

```js
{
  t: 'Attaque dorsale concertée',             // titre
  mols: ['[OH-]', 'C[C@@H](Br)CC'],           // espèces, de gauche à droite
  arrows: ['0.0>1.1', '1.1-2>1.2'],           // flèches courbes
  txt: 'Explication courte de l’étape.',
}
```

Notation d'une flèche : `SOURCE>CIBLE`. Les numéros sont `espèce.atome`, en comptant à partir de 0,
les atomes dans l'ordre où ils apparaissent dans le SMILES.

| Écriture | Signification |
|---|---|
| `0.0>1.1` | du doublet (ou de la charge) de l'atome 0 de l'espèce 0 vers l'atome 1 de l'espèce 1 |
| `1.1-2>1.2` | de la liaison entre les atomes 1 et 2 vers l'atome 2 (rupture hétérolytique) |
| `0.3-4>0.1-3` | d'une liaison vers une autre liaison (formation d'une liaison π) |
| `0.4-5>0.5+0.0` | d'une liaison vers une liaison nouvelle entre deux atomes (péricyclique, cyclisation) |
| `~0.0>1.4` | demi-flèche à un électron (radicaux) |
| `…@-` | inverse le côté de la courbure |

Autres conventions : `[2H]` dans un SMILES dessine un hydrogène explicite (affiché « H ») ; `t:texte` insère une
étiquette libre ; `+`, `>>` et `<=>` dans `mols` insèrent un signe plus, une flèche de réaction, un équilibre.
Les molécules d'une étape sont orientées automatiquement pour que les sites réactifs se fassent face.

### Données personnelles (IndexedDB sur l'iPad, fichier de sauvegarde JSON)

`custom` (fiches créées ou modifiées), `fav`, `notes`, `srs` (état de répétition espacée par exercice),
`ink` (traits manuscrits : notes et annotations PDF), `pdfs` (PDF joints, contenu dans un magasin séparé),
`settings`, `oral` (historique des oraux blancs).

## 4. Architecture

```
index.html, css/app.css      interface (une seule page)
js/chem.js                   OpenChemLib : rendu SVG, canonisation, sous-structure, 3D
js/mech.js                   scènes de mécanisme, flèches, schémas, correction des flèches tracées
js/srs.js, search.js, quiz.js, backup.js, model.js, sketch-model.js    logique pure, testée sous Node
js/store.js                  IndexedDB, fiches personnelles, sauvegarde/restauration
js/ink.js, sketcher.js, viewer3d.js    dessin au Pencil, éditeur de structures, vue 3D
js/views/*.js                écrans : bibliothèque, fiche, éditeur, révision, carte, rétro, comparaison, PDF, réglages, mémo
data/*.js                    les fiches, les groupes fonctionnels, le mémo
vendor/                      OpenChemLib et PDF.js (copies locales : aucun appel réseau)
sw.js, precache.js           mise en cache pour le hors-ligne
tests/                       tests automatiques
tools/                       serveur local, préparation d'une publication, icônes
```

Principes : aucun serveur, aucun compte, aucune dépendance à installer, aucune étape de compilation.
Toute la logique sans interface est isolée dans des modules purs pour pouvoir être testée.

## 5. Maquettes des écrans principaux

Paysage (bibliothèque et fiche côte à côte) :

```
┌────┬──────────────────────┬───────────────────────────────────────────┐
│ ≡  │ [ Rechercher…      ] │ Transposition pinacolique              ☆  │
│Fich│ ▸ Filtres            │ ───────────────────────                   │
│ ↻  │ 90 fiches   [+ Fiche]│ (Transpositions)(Confiance élevée)(spiro) │
│Rév.│ ● SN2                │ [Réviser] [Comparer] [Modifier]           │
│ ⚯  │   ⌬ ──▶ ⌬            │ ┌ Principe ─────────────────────────────┐ │
│Cart│ ● Pinacolique      ◀ │ │   diol  ──H₂SO₄ cat.──▶  cétone + H₂O │ │
│ ←  │   ⌬ ──▶ ⌬            │ │   Conditions : réactifs, solvant, T…  │ │
│Rétr│ ● Suzuki             │ └───────────────────────────────────────┘ │
│ ▤  │   ⌬ ──▶ ⌬            │ ┌ Mécanisme ────────────────────────────┐ │
│Mémo│ …                    │ │ Étape 2/4 — Départ de l'eau           │ │
│ ⚙  │                      │ │      [structures + flèches animées]   │ │
│Régl│                      │ │ [◀ Étape] [Flèche 1/2 ▶] [Lecture]    │ │
└────┴──────────────────────┴───────────────────────────────────────────┘
```

Portrait étroit, Split View et Slide Over : une seule colonne, barre d'onglets en bas, bouton « ‹ Fiches ».

Révision « Trace les flèches » :

```
┌──────────────────────────────────────────────┐
│ Trace les flèches                  [Quitter] │
│ ▓▓▓▓▓░░░░░░░░░░░░░░░                         │
│ Hydrohalogénation — Étape 1/3                │
│ ● ● ● ● ● [Surligneur][Gomme][Annuler]       │
│ ┌──────────────────────────────────────────┐ │
│ │   structures sans flèches ; on dessine   │ │
│ │   par-dessus avec le Pencil              │ │
│ └──────────────────────────────────────────┘ │
│ [Corriger] → « 2 flèches reconnues sur 2 »   │
│ [Raté] [Difficile] [Bien] [Facile]           │
└──────────────────────────────────────────────┘
```

Carte : graphe des groupes fonctionnels à gauche, panneau à droite (réactions qui partent du groupe ou y mènent,
ou chemins de synthèse entre deux groupes touchés successivement).

## 6. Plan par phases (toutes réalisées)

1. Moteur de chimie et de mécanismes, tests de validation de la base.
2. Base de 90 fiches rédigées, avec niveau de confiance et référence.
3. Interface : bibliothèque, recherche et filtres, fiche, lecteur de mécanisme pas à pas.
4. Données personnelles : favoris, notes, notes manuscrites, PDF joints et annotés, sauvegarde par fichier.
5. Éditeur de structures au Pencil, éditeur de fiches avec constructeur de flèches.
6. Révision : répétition espacée, exercices au Pencil avec correction automatique des flèches, QCM, oral blanc.
7. Carte des réactions, chemins de synthèse, aide à la rétrosynthèse, comparaison côte à côte, vue 3D, mémo.
8. PWA : installation, hors-ligne complet, mise à jour, publication en un double-clic.
