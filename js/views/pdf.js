// Lecteur de PDF joints avec annotation au Pencil par-dessus chaque page.
import { el, fill, add, toast } from '../ui.js';
import { state, save, getFile } from '../store.js';
import { InkPad, inkToolbar } from '../ink.js';

let pdfjs = null;
async function loadPdfJs() {
  if (!pdfjs) {
    pdfjs = await import('../../vendor/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('../../vendor/pdf.worker.min.mjs', import.meta.url).href;
  }
  return pdfjs;
}

export async function renderPdf(main, { args }) {
  const fileId = args[0];
  let cardId = null, meta = null;
  for (const [cid, list] of Object.entries(state.pdfs)) { const m = list.find((p) => p.id === fileId); if (m) { cardId = cid; meta = m; } }
  const pads = [];
  const toolBox = el('div');
  const pagesBox = el('div');
  const status = el('span.muted', {}, 'Ouverture…');
  const view = el('div.pdf-view', {}, el('div.pdf-bar', {}, el('a.button.small', { href: cardId ? '#/fiche/' + cardId : '#/' }, '‹ Fiche'), el('strong', {}, meta?.name || 'PDF'), status, toolBox), pagesBox);
  add(main, view);
  let doc = null, cancelled = false;
  const cleanup = () => { cancelled = true; pads.forEach((p) => p.destroy()); doc?.destroy?.(); };

  const file = await getFile(fileId);
  if (!file) { status.textContent = 'Fichier introuvable sur cet appareil.'; return cleanup; }
  try {
    const lib = await loadPdfJs();
    doc = await lib.getDocument({ data: new Uint8Array(file.data.slice(0)), isEvalSupported: false }).promise;
    status.textContent = `${doc.numPages} page${doc.numPages > 1 ? 's' : ''} · le Pencil écrit, le doigt fait défiler`;
    // Une seule barre d'outils pilote toutes les pages.
    const master = {
      tool: 'pen', _c: '#d6336c', fingerDraw: state.settings.fingerDraw,
      get color() { return this._c; },
      set color(c) { this._c = c; pads.forEach((p) => { p.color = c; }); },
      setTool(t) { this.tool = t; pads.forEach((p) => p.setTool(t)); },
      setColor(c) { if (this.tool === 'eraser') this.setTool('pen'); this.color = c; },
      setFingerDraw(v) { this.fingerDraw = v; pads.forEach((p) => p.setFingerDraw(v)); },
      undo() { pads.filter((p) => p.strokes.length).sort((x, y) => (y.lastEdit || 0) - (x.lastEdit || 0))[0]?.undo(); },
      clear() { pads.forEach((p) => { if (p.strokes.length) p.clear(); }); },
    };
    const width = Math.min(pagesBox.clientWidth || 800, 1000);
    for (let n = 1; n <= doc.numPages && !cancelled; n++) {
      const page = await doc.getPage(n);
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = page.getViewport({ scale: (width / base.width) * dpr });
      const canvas = el('canvas', { width: Math.round(vp.width), height: Math.round(vp.height) });
      const ink = el('canvas.ink');
      const holder = el('div.pdf-page', { style: { maxWidth: width + 'px', aspectRatio: `${base.width} / ${base.height}` } }, canvas, ink);
      add(pagesBox, holder);
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp, canvas }).promise;
      const key = `pdf:${fileId}:${n}`;
      const pad = new InkPad(ink, { strokes: state.ink[key] || [], fingerDraw: master.fingerDraw, color: master.color,
        onChange: (s) => { pad.lastEdit = Date.now(); if (s.length) state.ink[key] = s; else delete state.ink[key]; save('ink'); } });
      pad.setTool(master.tool);
      pads.push(pad);
    }
    fill(toolBox, inkToolbar(master, el, { onFinger: (v) => { state.settings.fingerDraw = v; save('settings'); } }));
  } catch (e) {
    console.error(e);
    status.textContent = 'Lecture impossible : ' + e.message;
    toast('PDF illisible', 'error');
  }
  return cleanup;
}
