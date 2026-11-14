// sketcher.js — éditeur de structures pensé pour l'Apple Pencil.
// Tracer : glisser d'un atome (ou du vide) pour créer une liaison ; toucher un atome pour l'allonger ;
// toucher une liaison pour changer son ordre. Le résultat est renvoyé sous forme de SMILES.
import { el, fill, add, modal, toast, promptBox } from './ui.js';
import { molSvg, isValidSmiles } from './chem.js';
import * as SM from './sketch-model.js';

const NS = 'http://www.w3.org/2000/svg';
const RINGS = [['benzène', 6, true], ['C6', 6, false], ['C5', 5, false], ['C3', 3, false], ['C4', 4, false], ['C7', 7, false]];

/** Ouvre l'éditeur. Résout avec un SMILES ('' si vide) ou null si annulé. */
export function openSketcher({ smiles = '', title = 'Dessiner une structure' } = {}) {
  return new Promise((resolve) => {
    let sk = SM.emptySketch();
    try { if (smiles) sk = SM.fromSmiles(smiles); } catch { /* on part d'une feuille vide */ }
    const undoStack = [];
    let tool = 'bond', element = 'C', ring = RINGS[0], view = SM.bounds(sk);
    let drag = null, done = false;

    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'sketch');
    const preview = el('div.sketch-preview');
    const smilesOut = el('code.sketch-smiles');
    const tools = el('div.sketch-tools');
    const elems = el('div.sketch-tools');

    const snapshot = () => { undoStack.push(SM.cloneSketch(sk)); if (undoStack.length > 60) undoStack.shift(); };
    const current = () => { try { return SM.toSmiles(sk); } catch { return ''; } };

    function toolButton(id, label, extra = {}) {
      return el('button.tool', { 'data-tool': id, onclick: () => { tool = id; refreshTools(); }, ...extra }, label);
    }
    add(tools, 
      toolButton('bond', 'Liaison'), toolButton('atom', 'Atome'), toolButton('ring', 'Cycle'),
      toolButton('wedge', 'Coin ▲'), toolButton('hash', 'Coin ┆'), toolButton('plus', 'Charge +'), toolButton('minus', 'Charge −'), toolButton('erase', 'Gomme'),
      el('span.spacer'),
      el('button.tool', { onclick: () => { if (undoStack.length) { sk = undoStack.pop(); render(); } } }, 'Annuler'),
      el('button.tool', { onclick: () => { snapshot(); sk = SM.emptySketch(); view = SM.bounds(sk); render(); } }, 'Tout effacer'),
      el('button.tool', { onclick: () => { view = SM.bounds(sk); render(); } }, 'Recentrer'),
    );
    function refreshTools() {
      for (const b of tools.querySelectorAll('[data-tool]')) b.classList.toggle('on', b.dataset.tool === tool);
      fill(elems);
      if (tool === 'ring') {
        for (const r of RINGS) add(elems, el('button.tool' + (r === ring ? '.on' : ''), { onclick: () => { ring = r; refreshTools(); } }, r[0]));
      } else {
        for (const e of SM.ELEMENTS) add(elems, el('button.tool.elem' + (e === element ? '.on' : ''), { onclick: () => { element = e; if (tool !== 'bond') tool = 'atom'; refreshTools(); } }, e));
        add(elems, el('button.tool', { onclick: async () => { const v = await promptBox('Autre élément', { label: 'Symbole (ex. Mg, Li, Pd, Sn)', value: '' }); if (v) { element = v[0].toUpperCase() + v.slice(1).toLowerCase(); tool = 'atom'; refreshTools(); } } }, 'Autre…'));
      }
    }

    function render() {
      svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
      const H = SM.implicitH(sk);
      let s = '';
      sk.bonds.forEach((b) => {
        const A = sk.atoms[b.a], B = sk.atoms[b.b];
        const len = Math.hypot(B.x - A.x, B.y - A.y) || 1, nx = -(B.y - A.y) / len, ny = (B.x - A.x) / len;
        if (b.st === 1) s += `<polygon class="sk-wedge" points="${A.x},${A.y} ${B.x + nx * 5},${B.y + ny * 5} ${B.x - nx * 5},${B.y - ny * 5}"/>`;
        else if (b.st === 2) {
          for (let k = 1; k <= 7; k++) { const t = k / 7, w = 5 * t, x = A.x + (B.x - A.x) * t, y = A.y + (B.y - A.y) * t; s += `<line class="sk-bond thin" x1="${x + nx * w}" y1="${y + ny * w}" x2="${x - nx * w}" y2="${y - ny * w}"/>`; }
        } else if (b.o === 1) s += `<line class="sk-bond" x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}"/>`;
        else {
          const offs = b.o === 2 ? [-3, 3] : [-5, 0, 5];
          for (const o of offs) s += `<line class="sk-bond" x1="${A.x + nx * o}" y1="${A.y + ny * o}" x2="${B.x + nx * o}" y2="${B.y + ny * o}"/>`;
        }
      });
      sk.atoms.forEach((a, i) => {
        const lone = !SM.neighbors(sk, i).length;
        if (a.el === 'C' && !a.q && !lone) { s += `<circle class="sk-dot" cx="${a.x}" cy="${a.y}" r="2.2"/>`; return; }
        const h = H[i] || 0;
        const label = a.el + (h ? 'H' + (h > 1 ? ['', '', '₂', '₃', '₄'][h] || h : '') : '') + (a.q ? (Math.abs(a.q) > 1 ? Math.abs(a.q) : '') + (a.q > 0 ? '⁺' : '⁻') : '');
        const w = label.length * 9.5 + 8;
        s += `<rect class="sk-mask" x="${a.x - 9}" y="${a.y - 11}" width="${w}" height="22" rx="6"/><text class="sk-label el-${a.el}" x="${a.x - 6}" y="${a.y + 6}">${label}</text>`;
      });
      if (drag?.line) s += `<line class="sk-ghost" x1="${drag.line[0]}" y1="${drag.line[1]}" x2="${drag.line[2]}" y2="${drag.line[3]}"/>`;
      svg.innerHTML = s;
      const smi = current();
      smilesOut.textContent = smi || '(vide)';
      try { preview.innerHTML = smi ? molSvg(smi) : '<span class="muted">Aperçu</span>'; } catch { preview.innerHTML = '<span class="muted">Structure incomplète</span>'; }
    }

    function toLocal(e) {
      const r = svg.getBoundingClientRect();
      const k = Math.max(view.w / r.width, view.h / r.height);
      const ox = view.x + (view.w - r.width * k) / 2, oy = view.y + (view.h - r.height * k) / 2;
      return { x: ox + (e.clientX - r.left) * k, y: oy + (e.clientY - r.top) * k };
    }

    function tap(p, h) {
      snapshot();
      if (tool === 'erase') {
        if (h?.atom != null) SM.removeAtom(sk, h.atom);
        else if (h?.bond != null) sk.bonds.splice(h.bond, 1);
        else undoStack.pop();
      } else if (tool === 'ring') {
        SM.addRing(sk, ring[1], ring[2], h?.bond != null ? { bond: h.bond } : h?.atom != null ? { atom: h.atom } : p);
      } else if (tool === 'plus' || tool === 'minus') {
        if (h?.atom != null) sk.atoms[h.atom].q = Math.max(-3, Math.min(3, (sk.atoms[h.atom].q || 0) + (tool === 'plus' ? 1 : -1)));
        else undoStack.pop();
      } else if (tool === 'wedge' || tool === 'hash') {
        if (h?.bond != null) {
          const b = sk.bonds[h.bond], want = tool === 'wedge' ? 1 : 2;
          if (b.st === want) { [b.a, b.b] = [b.b, b.a]; b.flip = !b.flip; if (!b.flip) b.st = 0; } else { b.st = want; b.o = 1; b.flip = false; }
        } else undoStack.pop();
      } else if (tool === 'atom') {
        if (h?.atom != null) sk.atoms[h.atom].el = element;
        else if (!h) sk.atoms.push({ x: p.x, y: p.y, el: element, q: 0 });
        else undoStack.pop();
      } else if (h?.bond != null) {
        const b = sk.bonds[h.bond];
        b.o = b.o === 3 ? 1 : b.o + 1; b.st = 0;
      } else if (h?.atom != null) SM.sprout(sk, h.atom, element);
      else {
        // Toucher le vide : premier fragment (une liaison C–C), ou un atome isolé pour un hétéroatome.
        sk.atoms.push({ x: p.x, y: p.y, el: element, q: 0 });
        if (element === 'C') SM.sprout(sk, sk.atoms.length - 1, 'C');
      }
      render();
    }

    svg.addEventListener('pointerdown', (e) => {
      if (drag) return;
      e.preventDefault();
      svg.setPointerCapture(e.pointerId);
      const p = toLocal(e), h = SM.hit(sk, p.x, p.y);
      drag = { id: e.pointerId, p0: p, h, moved: false, line: null };
    });
    svg.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const p = toLocal(e);
      if (!drag.moved && Math.hypot(p.x - drag.p0.x, p.y - drag.p0.y) < 9) return;
      drag.moved = true;
      if (tool !== 'bond') return;
      const start = drag.h?.atom != null ? sk.atoms[drag.h.atom] : drag.p0;
      const target = SM.hit(sk, p.x, p.y, 14, 0);
      const end = target?.atom != null && target.atom !== drag.h?.atom ? sk.atoms[target.atom] : SM.snapEnd(start.x, start.y, p.x, p.y);
      drag.end = end; drag.target = target?.atom != null && target.atom !== drag.h?.atom ? target.atom : null;
      drag.line = [start.x, start.y, end.x, end.y];
      render();
    });
    const finish = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag;
      drag = null;
      if (!d.moved) { tap(d.p0, d.h); return; }
      if (tool === 'bond' && d.end) {
        snapshot();
        let a = d.h?.atom;
        if (a == null) { sk.atoms.push({ x: d.p0.x, y: d.p0.y, el: 'C', q: 0 }); a = sk.atoms.length - 1; }
        let b = d.target;
        if (b == null) { sk.atoms.push({ x: d.end.x, y: d.end.y, el: element, q: 0 }); b = sk.atoms.length - 1; }
        const i = SM.findBond(sk, a, b);
        if (i < 0) sk.bonds.push({ a, b, o: 1, st: 0 }); else sk.bonds[i].o = sk.bonds[i].o === 3 ? 1 : sk.bonds[i].o + 1;
      }
      render();
    };
    svg.addEventListener('pointerup', finish);
    svg.addEventListener('pointercancel', (e) => { if (drag && e.pointerId === drag.id) { drag = null; render(); } });

    const body = el('div.sketcher', {},
      tools, elems, svg,
      el('div.sketch-foot', {}, preview, el('div', {}, el('div.muted', {}, 'SMILES'), smilesOut,
        el('button.tool', { onclick: async () => {
          const v = await promptBox('Saisir un SMILES', { label: 'SMILES', value: current() });
          if (v == null) return;
          if (v && !isValidSmiles(v)) { toast('SMILES invalide', 'error'); return; }
          snapshot(); sk = v ? SM.fromSmiles(v) : SM.emptySketch(); view = SM.bounds(sk); render();
        } }, 'Saisir un SMILES…'))));
    modal({
      title, wide: true, body, onClose: () => { if (!done) resolve(null); },
      actions: [{ label: 'Annuler', onclick: (c) => c() }, { label: 'Valider', primary: true, onclick: (c) => { done = true; resolve(current()); c(); } }],
    });
    refreshTools();
    render();
  });
}
