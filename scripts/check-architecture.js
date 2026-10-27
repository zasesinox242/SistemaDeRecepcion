const fs = require('fs');
const path = require('path');

const EXTERNAL = /from\s+['"](firebase|@firebase|react|react-native|expo)[^'"]*['"]/;
const OUTER = /from\s+['"](\.\.\/)+(infrastructure|presentation|main)\//;
let bad = 0;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    if (!/\.(ts|tsx)$/.test(e.name)) return;
    fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
      if (EXTERNAL.test(line) || OUTER.test(line)) {
        console.log(`X ${p}:${i + 1} -> ${line.trim()}`);
        bad++;
      }
    });
  });

['src/domain', 'src/application'].forEach((d) => fs.existsSync(d) && walk(d));
console.log(bad ? `Arquitectura con ${bad} violacion(es)` : 'Arquitectura OK: domain y application no dependen de Firebase, React, Expo ni de capas externas');
process.exit(bad ? 1 : 0);
