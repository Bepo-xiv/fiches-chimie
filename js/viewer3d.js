// viewer3d.js — visualisation 3D « boules et bâtons » (canvas, rotation au doigt ou au Pencil).
import { conformer } from './chem.js';
import { el, modal } from './ui.js';

const CPK = { H: '#f1f3f5', C: '#495057', N: '#3b5bdb', O: '#e03131', F: '#51cf66', Cl: '#37b24d', Br: '#a61e4d', I: '#7048e8', S: '#f59f00', P: '#f76707', Si: '#c9a37a', B: '#f4a6a6' };
const RAD = { H: 0.22, C: 0.36, N: 0.35, O: 0.34, F: 0.32, Cl: 0.42, Br: 0.46, I: 0.52, S: 0.42, P: 0.42, Si: 0.44 };

function rot(p, m) {
  return [m[0] * p[0] + m[1] * p[1] + m[2] * p[2], m[3] * p[0] + m[4] * p[1] + m[5] * p[2], m[6] * p[0] + m[7] * p[1] + m[8] * p[2]];
}
function mul(a, b) {
  const o = new Array(9);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) o[r * 3 + c] = a[r * 3] * b[c] + a[r * 3 + 1] * b[3 + c] + a[r * 3 + 2] * b[6 + c];
  return o;
}
const rotX = (t) => [1, 0, 0, 0, Math.cos(t), -Math.sin(t), 0, Math.sin(t), Math.cos(t)];
const rotY = (t) => [Math.cos(t), 0, Math.sin(t), 0, 1, 0, -Math.sin(t), 0, Math.cos(t)];

export function mount3D(canvas, model, { showH = true } = {}) {
  const ctx = canvas.getContext('2d');
  const n = model.atoms.length;
  const c = [0, 0, 0];
  for (const a of model.atoms) for (let k = 0; k < 3; k++) c[k] += a.p[k] / n;
  const pts = model.atoms.map((a) => a.p.map((v, k) => v - c[k]));
  const extent = Math.max(1.5, ...pts.map((p) => Math.hypot(...p))) + 0.6;
  let M = mul(rotX(-0.35), rotY(0.5));
  let hydrogens = showH;
  let last = null;

  function draw() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(r.width * dpr)) { canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr); }
    const W = canvas.width, H = canvas.height, s = Math.min(W, H) / (2 * extent);
    ctx.clearRect(0, 0, W, H);
    const P = pts.map((p) => rot(p, M));
    const items = [];
    model.atoms.forEach((a, i) => { if (hydrogens || a.el !== 'H') items.push({ z: P[i][2], atom: i }); });
    model.bonds.forEach((b) => {
      if (!hydrogens && (model.atoms[b.a].el === 'H' || model.atoms[b.b].el === 'H')) return;
      items.push({ z: (P[b.a][2] + P[b.b][2]) / 2 - 0.01, bond: b });
    });
    items.sort((x, y) => x.z - y.z);
    const X = (p) => W / 2 + p[0] * s, Y = (p) => H / 2 + p[1] * s;
    for (const it of items) {
      if (it.bond) {
        const A = P[it.bond.a], B = P[it.bond.b];
        const mx = (X(A) + X(B)) / 2, my = (Y(A) + Y(B)) / 2;
        ctx.lineCap = 'round';
        const lw = s * (it.bond.order > 1 ? 0.2 : 0.13);
        for (const [p, at] of [[A, it.bond.a], [B, it.bond.b]]) {
          ctx.strokeStyle = CPK[model.atoms[at].el] || '#868e96';
          ctx.lineWidth = lw;
          ctx.beginPath(); ctx.moveTo(X(p), Y(p)); ctx.lineTo(mx, my); ctx.stroke();
        }
        if (it.bond.order > 1) {
          ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = lw * 0.28;
          ctx.beginPath(); ctx.moveTo(X(A), Y(A)); ctx.lineTo(X(B), Y(B)); ctx.stroke();
        }
      } else {
        const a = model.atoms[it.atom], p = P[it.atom];
        const rad = (RAD[a.el] || 0.4) * s;
        const g = ctx.createRadialGradient(X(p) - rad * 0.35, Y(p) - rad * 0.35, rad * 0.1, X(p), Y(p), rad);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(0.25, CPK[a.el] || '#868e96');
        g.addColorStop(1, 'rgba(0,0,0,.55)');
        ctx.fillStyle = CPK[a.el] || '#868e96';
        ctx.beginPath(); ctx.arc(X(p), Y(p), rad, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = g; ctx.globalAlpha = 0.75; ctx.fill(); ctx.globalAlpha = 1;
        if (a.el !== 'C' && a.el !== 'H') {
          ctx.fillStyle = '#fff'; ctx.font = `600 ${Math.round(rad * 0.9)}px system-ui, sans-serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(a.el, X(p), Y(p));
        }
      }
    }
  }

  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointerdown', (e) => { last = [e.clientX, e.clientY]; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => {
    if (!last) return;
    M = mul(mul(rotY((e.clientX - last[0]) * 0.012), rotX(-(e.clientY - last[1]) * 0.012)), M);
    last = [e.clientX, e.clientY];
    draw();
  });
  const end = () => { last = null; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  const ro = new ResizeObserver(draw);
  ro.observe(canvas);
  draw();
  return { toggleH() { hydrogens = !hydrogens; draw(); return hydrogens; }, destroy() { ro.disconnect(); } };
}

/** Ouvre la vue 3D d'une molécule dans une fenêtre. */
export async function open3D(smiles, title = 'Vue 3D') {
  const canvas = el('canvas.view3d');
  const status = el('p.muted', {}, 'Calcul du conformère…');
  let view = null;
  const btn = el('button', { onclick: () => { if (view) btn.textContent = view.toggleH() ? 'Masquer les H' : 'Afficher les H'; } }, 'Masquer les H');
  modal({ title, wide: true, body: el('div', {}, canvas, el('div.row', {}, btn, status)), onClose: () => view?.destroy() });
  try {
    const model = await conformer(smiles);
    view = mount3D(canvas, model);
    status.textContent = 'Faites glisser pour tourner. Conformère calculé (champ de force), indicatif.';
  } catch (e) {
    status.textContent = 'Vue 3D indisponible : ' + e.message;
  }
}
