// ui.js — petits outils d'interface (DOM, fenêtres modales, fichiers).
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Crée un élément : el('button.primary', { onclick }, 'Texte', autreNoeud) */
export function el(spec, attrs = {}, ...children) {
  const [tag, ...classes] = spec.split('.');
  const node = document.createElement(tag || 'div');
  if (classes.length) node.className = classes.join(' ');
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else if (k === 'html') node.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') {
      for (const [p, val] of Object.entries(v)) { if (p.startsWith('--')) node.style.setProperty(p, val); else node.style[p] = val; }
    }
    else if (k in node && k !== 'list') node[k] = v;
    else node.setAttribute(k, v === true ? '' : v);
  }
  add(node, children);
  return node;
}

/** Ajoute des enfants (tableaux imbriqués acceptés, null et false ignorés). */
export function add(node, ...children) {
  for (const c of children.flat(Infinity)) if (c != null && c !== false) node.append(c.nodeType ? c : document.createTextNode(c));
  return node;
}

/** Remplace le contenu d'un élément. */
export function fill(node, ...children) {
  node.replaceChildren();
  return add(node, children);
}

export function toast(msg, kind = '') {
  let box = $('#toasts');
  if (!box) { box = el('div', { id: 'toasts', 'aria-live': 'polite' }); document.body.append(box); }
  const t = el('div.toast' + (kind ? '.' + kind : ''), {}, msg);
  box.append(t);
  setTimeout(() => t.classList.add('out'), 2600);
  setTimeout(() => t.remove(), 3100);
}

/** Fenêtre modale. Retourne { close, body }. actions : [{ label, primary, danger, onclick(close) }] */
export function modal({ title, body, actions = [], wide = false, onClose }) {
  const back = el('div.modal-back');
  const close = () => { back.remove(); document.removeEventListener('keydown', onKey); onClose?.(); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  const box = el('div.modal' + (wide ? '.wide' : ''), { role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
    el('header', {}, el('h2', {}, title), el('button.icon', { onclick: close, 'aria-label': 'Fermer' }, '✕')),
    el('div.modal-body', {}, body),
    actions.length ? el('footer', {}, actions.map((a) => el('button' + (a.primary ? '.primary' : a.danger ? '.danger' : ''), { onclick: () => a.onclick(close) }, a.label))) : null);
  back.append(box);
  back.addEventListener('pointerdown', (e) => { if (e.target === back) close(); });
  document.addEventListener('keydown', onKey);
  document.body.append(back);
  return { close, body: box.querySelector('.modal-body') };
}

export function confirmBox(title, message, label = 'Confirmer', danger = true) {
  return new Promise((resolve) => {
    let done = false;
    modal({
      title, body: el('p', {}, message), onClose: () => { if (!done) resolve(false); },
      actions: [{ label: 'Annuler', onclick: (c) => c() }, { label, danger, primary: !danger, onclick: (c) => { done = true; resolve(true); c(); } }],
    });
  });
}

/** Demande un texte court. */
export function promptBox(title, { label = '', value = '', placeholder = '' } = {}) {
  return new Promise((resolve) => {
    let done = false;
    const input = el('input', { type: 'text', value, placeholder, autocapitalize: 'off', autocorrect: 'off', spellcheck: false });
    const ok = (c) => { done = true; resolve(input.value.trim()); c(); };
    const m = modal({
      title, body: el('label.field', {}, label, input), onClose: () => { if (!done) resolve(null); },
      actions: [{ label: 'Annuler', onclick: (c) => c() }, { label: 'Valider', primary: true, onclick: ok }],
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') ok(m.close); });
    setTimeout(() => input.focus(), 50);
  });
}

/** Ouvre le sélecteur de fichiers du système (Fichiers / iCloud sur iPad). */
export function pickFile(accept, multiple = false) {
  return new Promise((resolve) => {
    const input = el('input', { type: 'file', accept, multiple, style: { display: 'none' } });
    input.addEventListener('change', () => { resolve(multiple ? [...input.files] : input.files[0] || null); input.remove(); });
    input.addEventListener('cancel', () => { resolve(multiple ? [] : null); input.remove(); });
    document.body.append(input);
    input.click();
  });
}

/** Enregistre un fichier : feuille de partage iPadOS si disponible, sinon téléchargement. */
export async function saveFile(name, blob) {
  const file = new File([blob], name, { type: blob.type });
  if (navigator.canShare?.({ files: [file] }) && /iPad|iPhone|Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1) {
    try { await navigator.share({ files: [file], title: name }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: name });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export const fmtSize = (n) => (n > 1e6 ? (n / 1e6).toFixed(1) + ' Mo' : Math.max(1, Math.round(n / 1e3)) + ' ko');
export const today = () => new Date().toISOString().slice(0, 10);
