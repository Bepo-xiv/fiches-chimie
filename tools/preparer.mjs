// Prépare une publication : lance les tests, puis régénère precache.js (liste des fichiers + numéro de version).
//   node tools/preparer.mjs              (avec tests)
//   node tools/preparer.mjs --sans-tests
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (!process.argv.includes('--sans-tests')) {
  const r = spawnSync(process.execPath, ['--test'], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) { console.error('\nDes tests échouent : publication annulée.'); process.exit(1); }
}
const include = ['index.html', 'manifest.webmanifest', 'css', 'js', 'data', 'vendor', 'icons'];
const files = [];
const walk = (rel) => {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return;
  if (fs.statSync(abs).isDirectory()) { for (const f of fs.readdirSync(abs).sort()) walk(rel + '/' + f); return; }
  if (/\.(txt|map)$/.test(rel)) return;
  files.push(rel);
};
include.forEach(walk);
const hash = crypto.createHash('sha256');
for (const f of files) { hash.update(f); hash.update(fs.readFileSync(path.join(root, f))); }
hash.update(fs.readFileSync(path.join(root, 'sw.js')));
const version = hash.digest('hex').slice(0, 10);
const body = JSON.stringify({ version, files: ['./', ...files.map((f) => './' + f)] }, null, 1);
fs.writeFileSync(path.join(root, 'precache.js'), `// Fichier généré par tools/preparer.mjs : ne pas le modifier à la main.\nself.__PRECACHE = ${body};\n`);
const size = files.reduce((n, f) => n + fs.statSync(path.join(root, f)).size, 0);
console.log(`precache.js : ${files.length} fichiers, ${(size / 1e6).toFixed(1)} Mo, version ${version}`);
