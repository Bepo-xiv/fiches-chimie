// Réglages : sauvegarde et restauration par fichier, apparence, stockage, mise à jour.
import { el, fill, add, toast, pickFile, saveFile, confirmBox, fmtSize, today } from '../ui.js';
import { state, save, exportBackup, importBackup, resetAll, storageInfo, allCards } from '../store.js';
import { REACTIONS } from '../../data/index.js';
import { applyTheme, APP_VERSION } from '../app.js';

export async function renderSettings(main) {
  const page = el('div.page');
  add(main, page);
  const info = await storageInfo();
  const changed = () => window.dispatchEvent(new Event('cards-changed'));

  const theme = el('select', { onchange: () => { state.settings.theme = theme.value; save('settings'); applyTheme(); } },
    [['auto', 'Automatique (réglage de l’iPad)'], ['light', 'Clair'], ['dark', 'Sombre']].map(([v, t]) => el('option', { value: v, selected: state.settings.theme === v }, t)));
  const finger = el('input', { type: 'checkbox', checked: state.settings.fingerDraw, onchange: () => { state.settings.fingerDraw = finger.checked; save('settings'); } });
  const perDay = el('input', { type: 'number', min: 0, max: 100, value: state.settings.newPerDay, onchange: () => { state.settings.newPerDay = Math.max(0, +perDay.value || 0); save('settings'); } });

  add(page, 
    el('h1', {}, 'Réglages'),
    el('div.set-block', {}, el('h2', {}, 'Sauvegarde et restauration'),
      el('p.muted', {}, 'Toutes tes données (fiches personnelles, notes, annotations, PDF joints, progression) sont stockées uniquement sur cet iPad. Exporte régulièrement un fichier de sauvegarde vers Fichiers ou iCloud Drive.'),
      el('div.row', {},
        el('button.primary', { onclick: async () => {
          try { await saveFile(`fiches-chimie-sauvegarde-${today()}.json`, await exportBackup()); toast('Sauvegarde créée'); } catch (e) { toast('Sauvegarde impossible : ' + e.message, 'error'); }
        } }, 'Exporter une sauvegarde'),
        el('button', { onclick: () => restore(false) }, 'Restaurer en fusionnant…'),
        el('button', { onclick: () => restore(true) }, 'Restaurer en remplaçant tout…'))),
    el('div.set-block', {}, el('h2', {}, 'Apparence et saisie'),
      el('label.field', {}, 'Thème', theme),
      el('label.row', {}, finger, ' Dessiner aussi au doigt (sinon le doigt fait défiler et seul le Pencil écrit)'),
      el('label.field', { style: { marginTop: '10px', maxWidth: '260px' } }, 'Nouveaux exercices par séance', perDay)),
    el('div.set-block', {}, el('h2', {}, 'Données'),
      el('dl.kv', {},
        el('dt', {}, 'Fiches de la base'), el('dd', {}, String(REACTIONS.length)),
        el('dt', {}, 'Fiches personnelles ou modifiées'), el('dd', {}, String(Object.keys(state.custom).length)),
        el('dt', {}, 'Total'), el('dd', {}, String(allCards().length)),
        el('dt', {}, 'PDF joints'), el('dd', {}, String(Object.values(state.pdfs).reduce((n, l) => n + l.length, 0))),
        el('dt', {}, 'Exercices suivis'), el('dd', {}, String(Object.keys(state.srs).length)),
        el('dt', {}, 'Espace utilisé'), el('dd', {}, info.quota ? `${fmtSize(info.usage)} sur ${fmtSize(info.quota)}` : 'inconnu'),
        el('dt', {}, 'Stockage persistant'), el('dd', {}, info.persisted ? 'oui' : 'non garanti : installe l’app sur l’écran d’accueil et exporte des sauvegardes')),
      el('div.row', { style: { marginTop: '12px' } },
        el('button.danger', { onclick: async () => {
          if (!(await confirmBox('Tout effacer ?', 'Fiches personnelles, notes, annotations, PDF et progression seront supprimés de cet appareil. Cette action est irréversible : exporte une sauvegarde avant.', 'Tout effacer'))) return;
          await resetAll(); changed(); applyTheme(); toast('Données effacées'); fill(main); renderSettings(main);
        } }, 'Effacer toutes mes données'))),
    el('div.set-block', {}, el('h2', {}, 'Application'),
      el('dl.kv', {}, el('dt', {}, 'Version'), el('dd', {}, APP_VERSION), el('dt', {}, 'Mode'), el('dd', {}, navigator.onLine ? 'en ligne' : 'hors ligne'),
        el('dt', {}, 'Installée'), el('dd', {}, (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) ? 'oui (écran d’accueil)' : 'non : Safari > Partager > Sur l’écran d’accueil')),
      el('div.row', { style: { marginTop: '12px' } }, el('button', { onclick: async () => {
        if (!window.__checkUpdate) { toast('Mise à jour indisponible dans ce mode'); return; }
        try { await window.__checkUpdate(); toast('Vérification faite : un bandeau apparaît si une mise à jour existe'); } catch { toast('Impossible de vérifier (hors ligne ?)', 'error'); }
      } }, 'Chercher une mise à jour')),
      el('p.muted', { style: { marginTop: '10px' } }, 'Rendu des molécules : OpenChemLib (BSD-3). Lecture des PDF : PDF.js (Apache-2.0). Contenu rédigé pour la révision ; les conditions expérimentales sont à vérifier dans la littérature.')),
  );

  async function restore(replace) {
    const f = await pickFile('application/json,.json');
    if (!f) return;
    if (replace && !(await confirmBox('Remplacer toutes les données ?', 'Les données actuelles de cet appareil seront remplacées par celles du fichier.', 'Remplacer'))) return;
    try {
      const r = await importBackup(await f.text(), { replace });
      changed(); applyTheme();
      toast(`Restauration terminée : ${r.cards} fiche(s) personnelle(s), ${r.files} PDF`);
      fill(main); renderSettings(main);
    } catch (e) { toast(e.message, 'error'); }
  }
}
