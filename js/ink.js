// ink.js — surface de dessin pour l'Apple Pencil (pression, rejet de la paume, gomme).
// Les traits sont stockés en coordonnées normalisées par la largeur : { t, c, w, p:[x,y,pression,…] }.

export const INK_COLORS = ['#1c1c1e', '#d6336c', '#1971c2', '#2b8a3e', '#e8590c'];

export class InkPad {
  /**
   * canvas : élément <canvas> dont la taille est fixée par le CSS.
   * opts : { strokes, onChange, fingerDraw, color, readOnly }
   */
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.strokes = opts.strokes ? opts.strokes.map((s) => ({ ...s, p: [...s.p] })) : [];
    this.onChange = opts.onChange || (() => {});
    this.fingerDraw = !!opts.fingerDraw;
    this.tool = 'pen';
    this.color = opts.color || INK_COLORS[0];
    this.readOnly = !!opts.readOnly;
    this.current = null;
    this.pointerId = null;
    this._down = (e) => this.down(e);
    this._move = (e) => this.move(e);
    this._up = (e) => this.up(e);
    // Safari iPadOS : empêche le Pencil de faire défiler la page, tout en laissant le doigt défiler.
    this._touch = (e) => {
      for (const t of e.changedTouches) if (t.touchType === 'stylus' || this.fingerDraw) { e.preventDefault(); return; }
    };
    canvas.addEventListener('pointerdown', this._down);
    canvas.addEventListener('pointermove', this._move);
    canvas.addEventListener('pointerup', this._up);
    canvas.addEventListener('pointercancel', this._up);
    canvas.addEventListener('touchstart', this._touch, { passive: false });
    canvas.addEventListener('touchmove', this._touch, { passive: false });
    this.applyTouchAction();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.resize();
  }

  destroy() {
    this.ro.disconnect();
    for (const [n, f] of [['pointerdown', this._down], ['pointermove', this._move], ['pointerup', this._up], ['pointercancel', this._up], ['touchstart', this._touch], ['touchmove', this._touch]]) this.canvas.removeEventListener(n, f);
  }

  applyTouchAction() { this.canvas.style.touchAction = this.fingerDraw ? 'none' : 'pan-x pan-y pinch-zoom'; }
  setFingerDraw(v) { this.fingerDraw = !!v; this.applyTouchAction(); }
  setTool(tool) { this.tool = tool; }
  setColor(c) { this.color = c; if (this.tool === 'eraser') this.tool = 'pen'; }
  setStrokes(s) { this.strokes = (s || []).map((x) => ({ ...x, p: [...x.p] })); this.redraw(); }
  getStrokes() { return this.strokes; }
  isEmpty() { return !this.strokes.length; }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) { this.canvas.width = w; this.canvas.height = h; }
    this.W = w;
    this.cssW = r.width;
    this.redraw();
  }

  accepts(e) {
    if (this.readOnly) return false;
    return e.pointerType === 'pen' || e.pointerType === 'mouse' || this.fingerDraw;
  }

  point(e) {
    const r = this.canvas.getBoundingClientRect();
    const pr = e.pointerType === 'pen' && e.pressure > 0 ? e.pressure : 0.5;
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.width, Math.round(pr * 100) / 100];
  }

  down(e) {
    if (!this.accepts(e) || this.pointerId != null) return;
    e.preventDefault();
    this.pointerId = e.pointerId;
    try { this.canvas.setPointerCapture(e.pointerId); } catch { /* sans importance */ }
    const p = this.point(e);
    if (this.tool === 'eraser') { this.eraseAt(p); return; }
    this.current = { t: this.tool === 'hl' ? 'hl' : 'pen', c: this.color, w: this.tool === 'hl' ? 0.022 : 0.0042, p: [...p] };
    this.strokes.push(this.current);
  }

  move(e) {
    if (e.pointerId !== this.pointerId) return;
    e.preventDefault();
    const events = e.getCoalescedEvents?.() || [];
    for (const ev of events.length ? events : [e]) {
      const p = this.point(ev);
      if (this.tool === 'eraser') { this.eraseAt(p); continue; }
      if (!this.current) continue;
      const n = this.current.p.length;
      if (Math.hypot(p[0] - this.current.p[n - 3], p[1] - this.current.p[n - 2]) < 0.0015) continue;
      this.current.p.push(...p);
      this.drawStroke(this.current, n - 3);
    }
  }

  up(e) {
    if (e.pointerId !== this.pointerId) return;
    this.pointerId = null;
    if (this.current) {
      // Un simple point : on le double pour qu'il soit visible.
      if (this.current.p.length === 3) this.current.p.push(this.current.p[0] + 0.001, this.current.p[1], this.current.p[2]);
      this.current = null;
      this.redraw();
    }
    this.onChange(this.strokes);
  }

  eraseAt(p) {
    const r = 0.02;
    const before = this.strokes.length;
    this.strokes = this.strokes.filter((s) => {
      for (let i = 0; i < s.p.length; i += 3) if (Math.hypot(s.p[i] - p[0], s.p[i + 1] - p[1]) < r) return false;
      return true;
    });
    if (this.strokes.length !== before) this.redraw();
  }

  undo() { this.strokes.pop(); this.redraw(); this.onChange(this.strokes); }
  clear() { this.strokes = []; this.redraw(); this.onChange(this.strokes); }

  redraw() {
    if (!this.W) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const s of this.strokes) this.drawStroke(s, 0);
  }

  drawStroke(s, from) {
    const ctx = this.ctx, W = this.W, p = s.p;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = s.c;
    if (s.t === 'hl') {
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = s.w * W;
      ctx.beginPath();
      ctx.moveTo(p[Math.max(0, from)] * W, p[Math.max(0, from) + 1] * W);
      for (let i = Math.max(3, from + 3); i < p.length; i += 3) ctx.lineTo(p[i] * W, p[i + 1] * W);
      ctx.stroke();
      ctx.globalAlpha = 1;
      return;
    }
    for (let i = Math.max(3, from + 3); i < p.length; i += 3) {
      ctx.lineWidth = Math.max(1, s.w * W * (0.45 + 1.1 * ((p[i + 2] + p[i - 1]) / 2)));
      ctx.beginPath();
      ctx.moveTo(p[i - 3] * W, p[i - 2] * W);
      ctx.lineTo(p[i] * W, p[i + 1] * W);
      ctx.stroke();
    }
  }

  /** Traits convertis dans un repère de largeur `w` (ex. coordonnées d'une scène de mécanisme). */
  strokesIn(w, offsetY = 0) {
    return this.strokes.filter((s) => s.t !== 'hl').map((s) => {
      const out = [];
      for (let i = 0; i < s.p.length; i += 3) out.push({ x: s.p[i] * w, y: s.p[i + 1] * w + offsetY });
      return out;
    });
  }
}

/** Barre d'outils standard associée à une surface de dessin. */
export function inkToolbar(pad, el, { finger = true, onFinger } = {}) {
  const bar = el('div.ink-tools');
  const refresh = () => {
    for (const b of bar.querySelectorAll('[data-color]')) b.classList.toggle('on', pad.tool !== 'eraser' && pad.tool !== 'hl' && pad.color === b.dataset.color);
    bar.querySelector('[data-tool=hl]').classList.toggle('on', pad.tool === 'hl');
    bar.querySelector('[data-tool=eraser]').classList.toggle('on', pad.tool === 'eraser');
    const f = bar.querySelector('[data-tool=finger]');
    if (f) f.classList.toggle('on', pad.fingerDraw);
  };
  for (const c of INK_COLORS) {
    bar.append(el('button.swatch', { 'data-color': c, style: { '--c': c }, 'aria-label': 'Stylo ' + c, onclick: () => { pad.setTool('pen'); pad.setColor(c); refresh(); } }));
  }
  bar.append(
    el('button.tool', { 'data-tool': 'hl', onclick: () => { pad.setTool(pad.tool === 'hl' ? 'pen' : 'hl'); if (pad.tool === 'hl') pad.color = '#f5c400'; else pad.color = INK_COLORS[0]; refresh(); } }, 'Surligneur'),
    el('button.tool', { 'data-tool': 'eraser', onclick: () => { pad.setTool(pad.tool === 'eraser' ? 'pen' : 'eraser'); refresh(); } }, 'Gomme'),
    el('button.tool', { onclick: () => pad.undo() }, 'Annuler'),
    el('button.tool', { onclick: () => pad.clear() }, 'Effacer'),
  );
  if (finger) bar.append(el('button.tool', { 'data-tool': 'finger', title: 'Dessiner aussi au doigt', onclick: () => { pad.setFingerDraw(!pad.fingerDraw); onFinger?.(pad.fingerDraw); refresh(); } }, 'Doigt'));
  refresh();
  return bar;
}
