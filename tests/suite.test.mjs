// Rulează testele autonome CHIROMANTIA pe index.html și iese cu cod ≠ 0 la primul eșec. Necesită playwright + Chrome.
// (features2, photo, photo2, hand_interact cer o fotografie de probă /tmp/p.png și nu intră aici.)
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = path.join(dir, 'index.html');
let r = spawnSync('python3', ['validate.py'], {cwd: dir, encoding: 'utf8'});
console.log(`${r.status === 0 ? 'ok' : 'FAIL'} validate.py — ${(r.stdout || '').trim().split('\n').pop()}`);
if (r.status !== 0) process.exit(1);
let ok = 1;
for (const t of ['smoke', 'tabs', 'features', 'hostile', 'monkey', 'reader', 'calc', 'hits']) {
  r = spawnSync('node', [`tests/${t}.js`, html], {cwd: dir, encoding: 'utf8', timeout: 580000});
  console.log(`${r.status === 0 ? 'ok' : 'FAIL'} ${t}.js — ${(r.stdout || '').trim().split('\n').pop()}`);
  if (r.status !== 0) { console.log((r.stderr || '').slice(-400)); process.exit(1); }
  ok++;
}
console.log(`${ok} ok`);
