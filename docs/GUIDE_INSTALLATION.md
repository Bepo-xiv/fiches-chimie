# Guide d'installation et de mise à jour

Tout se fait depuis le PC Windows. Node.js et git sont déjà installés sur ce PC.
Compter une vingtaine de minutes la première fois.

## 0. Essayer l'app sur le PC (facultatif, sans rien publier)

Double-cliquer sur `essayer-sur-le-pc.bat` dans le dossier du projet.
Le navigateur s'ouvre sur `http://localhost:8080`. Fermer la fenêtre noire pour arrêter.

## 1. Créer un compte GitHub et un dépôt

1. Aller sur <https://github.com> et créer un compte gratuit (noter le pseudo choisi).
2. En haut à droite : **+** puis **New repository**.
3. *Repository name* : `fiches-chimie`. Laisser **Public**. Ne cocher aucune case. **Create repository**.

Le dépôt est public : le code et le texte des fiches sont visibles par tous. Les PDF manuscrits ne sont
jamais envoyés (le fichier `.gitignore` les exclut), pas plus que les notes, qui restent sur l'iPad.

## 2. Envoyer le projet (une seule fois)

Ouvrir PowerShell dans le dossier du projet : dans l'Explorateur, ouvrir `C:\Users\Claude\Chimie`,
cliquer dans la barre d'adresse, taper `powershell` puis Entrée. Lancer ensuite ces commandes une par une.

Se présenter à git (une seule fois sur ce PC). L'adresse apparaîtra dans l'historique public : pour ne pas
exposer une adresse personnelle, utiliser l'adresse « noreply » que GitHub affiche dans
*Settings > Emails > Keep my email addresses private*.

```bash
git config --global user.name "MonPseudo"
```

```bash
git config --global user.email "12345678+MonPseudo@users.noreply.github.com"
```

Préparer et envoyer (remplacer `MonPseudo` par le pseudo GitHub) :

```bash
git init -b main
```

```bash
node tools/preparer.mjs
```

```bash
git add -A
```

```bash
git commit -m "Première version"
```

```bash
git remote add origin https://github.com/MonPseudo/fiches-chimie.git
```

```bash
git push -u origin main
```

Au premier `git push`, une fenêtre demande de se connecter à GitHub : choisir *Sign in with your browser*.

## 3. Activer l'hébergement gratuit (GitHub Pages)

1. Sur la page du dépôt : **Settings**, puis **Pages** dans la colonne de gauche.
2. *Source* : **Deploy from a branch**. *Branch* : **main**, dossier **/ (root)**. **Save**.
3. Attendre une à deux minutes puis recharger la page : l'adresse du site s'affiche,
   de la forme `https://monpseudo.github.io/fiches-chimie/`.

## 4. Installer sur l'iPad

1. Sur l'iPad, ouvrir cette adresse dans **Safari** (pas un autre navigateur).
2. Bouton **Partager** (carré avec une flèche vers le haut) puis **Sur l'écran d'accueil**, **Ajouter**.
3. Ouvrir l'app depuis sa nouvelle icône et attendre une dizaine de secondes, connecté au Wi-Fi :
   elle télécharge tous ses fichiers (environ 5 Mo).
4. Vérification : passer en mode Avion, fermer l'app, la rouvrir. Tout doit fonctionner.
5. Dans l'app : **Réglages** doit indiquer « Installée : oui ».

Split View et Slide Over fonctionnent comme pour n'importe quelle app (glisser l'icône depuis le Dock).

## 5. Joindre les fiches manuscrites

Les PDF étant déjà sur l'iPad : ouvrir une fiche, section **Mes notes**, **Joindre un PDF…**, choisir le
fichier dans Fichiers. Toucher ensuite son nom pour l'ouvrir et annoter par-dessus au Pencil.
Le PDF est copié dans l'app : l'original peut être déplacé ou supprimé sans conséquence.

## 6. Sauvegarder ses données

Les fiches personnelles, notes, annotations, PDF joints et la progression ne vivent que sur l'iPad.
**Réglages > Exporter une sauvegarde** produit un fichier `.json` à enregistrer dans Fichiers ou iCloud Drive.
**Restaurer** le relit (en fusionnant, ou en remplaçant tout). À faire régulièrement, et avant toute
réinstallation : supprimer l'icône de l'écran d'accueil efface les données de l'app.

## 7. Mettre à jour l'app

Après toute modification sur le PC (nouvelles fiches, corrections) :

1. Double-cliquer sur `publier.bat`. Il lance les tests, calcule un nouveau numéro de version et envoie
   le tout sur GitHub. Si un test échoue, rien n'est envoyé et l'erreur s'affiche.
2. Une à deux minutes plus tard, ouvrir l'app sur l'iPad, connecté à Internet : un bandeau
   « Une mise à jour est prête » apparaît. Toucher **Recharger**.
   Sinon : **Réglages > Chercher une mise à jour**.

Les données personnelles ne sont pas touchées par une mise à jour.

## En cas de problème

| Symptôme | Cause probable et solution |
|---|---|
| `git push` refusé | Mauvaise adresse de dépôt : `git remote set-url origin https://github.com/MonPseudo/fiches-chimie.git` |
| Page 404 à l'adresse du site | Pages pas encore activé ou pas encore déployé : attendre 2 minutes, vérifier l'étape 3 |
| L'app ne s'ouvre pas hors ligne | Elle n'a pas fini son premier téléchargement : la rouvrir en ligne, attendre, réessayer |
| Pas de bandeau de mise à jour | Fermer complètement l'app (balayer vers le haut) et la rouvrir en ligne |
| `publier.bat` annonce un test en échec | Lire le message : il nomme la fiche et l'étape fautives (SMILES ou flèche invalide) |
| Le Pencil fait défiler au lieu d'écrire | Écrire à l'intérieur de la zone de dessin ; sinon activer « Doigt » dans la barre d'outils |
