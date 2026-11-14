// Génère les icônes PNG de l'app (hexagone « benzène ») sans dépendance :  node tools/icones.mjs
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'icons');
const crcTable = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
const crc = (buf) => { let c = 0xffffffff; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
  return Buffer.concat([len, td, c]);
}
function png(size, pixel) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) raw.set(pixel(x, y), y * (size * 4 + 1) + 1 + x * 4);
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}
const segDist = (px, py, ax, ay, bx, by) => {
  const t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)));
  return Math.hypot(px - ax - t * (bx - ax), py - ay - t * (by - ay));
};
function icon(size) {
  const c = size / 2, R = size * 0.3, w = size * 0.035;
  const hex = Array.from({ length: 6 }, (_, k) => [c + R * Math.cos(Math.PI / 6 + (k * Math.PI) / 3), c + R * Math.sin(Math.PI / 6 + (k * Math.PI) / 3)]);
  const bg = [14, 143, 138], fg = [255, 255, 255];
  return png(size, (x, y) => {
    let d = Infinity;
    for (let k = 0; k < 6; k++) d = Math.min(d, segDist(x + 0.5, y + 0.5, ...hex[k], ...hex[(k + 1) % 6]));
    d = Math.min(d, Math.abs(Math.hypot(x + 0.5 - c, y + 0.5 - c) - R * 0.55));
    const a = Math.max(0, Math.min(1, w - d + 0.5));
    return [0, 1, 2].map((i) => Math.round(bg[i] + (fg[i] - bg[i]) * a)).concat(255);
  });
}
fs.mkdirSync(out, { recursive: true });
for (const s of [180, 192, 512]) fs.writeFileSync(path.join(out, `icon-${s}.png`), icon(s));
console.log('Icônes écrites dans', out);
