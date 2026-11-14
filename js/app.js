// app.js — démarrage, navigation et routage.
import { el, fill, add, $, toast } from './ui.js';
import { load, state } from './store.js';
import { renderLibrary, invalidateLibrary } from './views/library.js';

export const APP_VERSION = '1.0.0';

const NAV = [
  ['#/', 'Fiches', 'M4 5h16v3H4zM4 10.5h16v3H4zM4 16h16v3H4z'],
  ['#/reviser', 'Réviser', 'M12 4a8 8 0 1 0 8 8h-2.5A5.5 5.5 0 1 1 12 6.5V9l4-3.5L12 2z'],
  ['#/carte', 'Carte', 'M6 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm12 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM12 15a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM8 7.5h8M7 9l4 6m6-6-4 6'],
  ['#/retro', 'Rétro', 'M20 11H8.8l4.6-4.6L12 5l-7 7 7 7 1.4-1.4L8.8 13H20z'],
  ['#/memo', 'Mémo', 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7'],
  ['#/reglages', 'Réglages', 'M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2'],
];

// Les vues secondaires sont chargées à la demande.
const lazy = {
  editer: () => import('./views/editor.js').then((m) => m.renderEditor),
  reviser: () => import('./views/review.js').then((m) => m.renderReviewHub),
  session: () => import('./views/review.js').then((m) => m.renderSession),
  carte: () => import('./views/map.js').then((m) => m.renderMap),
  retro: () => import('./views/retro.js').then((m) => m.renderRetro),
  comparer: () => import('./views/compare.js').then((m) => m.renderCompare),
  pdf: () => import('./views/pdf.js').then((m) => m.renderPdf),
  reglages: () => import('./views/settings.js').then((m) => m.renderSettings),
  memo: () => import('./views/memo.js').then((m) => m.renderMemo),
};

export function parseHash(hash) {
  const [path, qs = ''] = (hash || '#/').replace(/^#\/?/, '').split('?');
  const segs = path.split('/').filter(Boolean).map(decodeURIComponent);
  const query = {};
  for (const kv of qs.split('&').filter(Boolean)) { const [k, v = ''] = kv.split('='); query[decodeURIComponent(k)] = decodeURIComponent(v); }
  return { route: segs[0] || '', args: segs.slice(1), query };
}

let cleanup = null;
async function route() {
  const main = $('#main');
  const { route: r, args, query } = parseHash(location.hash);
  if (cleanup) { try { cleanup(); } catch { /* vue déjà détruite */ } cleanup = null; }
  const section = r === 'fiche' || r === '' ? '#/' : r === 'session' ? '#/reviser' : r === 'comparer' || r === 'editer' || r === 'pdf' ? '#/' : '#/' + r;
  for (const a of document.querySelectorAll('#nav a')) a.classList.toggle('on', a.getAttribute('href') === section);
  document.body.dataset.route = r || 'fiches';
  try {
    if (r === '' || r === 'fiche') { renderLibrary(main, { id: r === 'fiche' ? args[0] : null, query }); return; }
    if (!lazy[r]) { location.hash = '#/'; return; }
    const render = await lazy[r]();
    fill(main);
    main.scrollTop = 0;
    cleanup = (await render(main, { args, query })) || null;
  } catch (e) {
    console.error(e);
    fill(main, el('div.pad', {}, el('h2', {}, 'Une erreur est survenue'), el('p.error', {}, e.message), el('a.button', { href: '#/' }, 'Retour aux fiches')));
  }
}

export function applyTheme() {
  const t = state.settings.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.dataset.theme = t;
}

function buildNav() {
  $('#nav').replaceChildren(...NAV.map(([href, label, d]) => el('a', { href },
    el('span', { html: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>` }), el('span.nav-label', {}, label))));
}

async function registerSW() {
  if (!('serviceWorker' in navigator) || location.protocol === 'file:') return;
  // En local, pas de cache (sinon les modifications n'apparaissent pas), sauf avec ?sw dans l'adresse.
  if (['localhost', '127.0.0.1'].includes(location.hostname) && !location.search.includes('sw')) return;
  try {
    const reg = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
    // Cherche une nouvelle version au lancement et à chaque retour dans l'app (si on est en ligne).
    const check = () => { if (navigator.onLine) reg.update().catch(() => {}); };
    check();
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    const offer = (worker) => {
      const t = el('div.update-bar', {}, 'Une mise à jour est prête. ', el('button.primary', { onclick: () => worker.postMessage('skipWaiting') }, 'Recharger'));
      add(document.body, t);
    };
    if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const w = reg.installing;
      w?.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) offer(w); });
    });
    // Recharge uniquement lors d'une mise à jour (pas à la toute première installation).
    let reloaded = false;
    const hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
    window.__checkUpdate = () => reg.update();
  } catch (e) { console.warn('Service worker non installé', e); }
}

async function start() {
  await load();
  applyTheme();
  buildNav();
  window.addEventListener('hashchange', route);
  window.addEventListener('cards-changed', () => invalidateLibrary());
  await route();
  document.body.classList.add('ready');
  registerSW();
  window.addEventListener('offline', () => toast('Hors ligne : tout reste disponible.'));
}

start();
