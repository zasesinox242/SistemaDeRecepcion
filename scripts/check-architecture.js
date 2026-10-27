const fs = require('fs');
const path = require('path');

const EXTERNAL = /from\s+['"](firebase|@firebase|react|react-native|expo)[^'"]*['"]/;
const FIREBASE = /from\s+['"](firebase|@firebase)[^'"]*['"]/;
const OUTER = /from\s+['"](\.\.\/)+(infrastructure|presentation|main)\//;
let bad = 0;

const walk = (dir, rules) =>
  fs.readdirSync(dir, { withFileTypes: true }).forEach((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p, rules);
    if (!/\.(ts|tsx)$/.test(e.name)) return;
    fs.readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
      if (rules.some((r) => r.test(line))) {
        console.log(`X ${p}:${i + 1} -> ${line.trim()}`);
        bad++;
      }
    });
  });

const CHECKS = [
  ['src/domain', [EXTERNAL, OUTER]],
  ['src/application', [EXTERNAL, OUTER]],
  ['src/presentation', [FIREBASE]],
  ['src/main', [FIREBASE]],
];
CHECKS.forEach(([d, rules]) => fs.existsSync(d) && walk(d, rules));
console.log(bad ? `Arquitectura con ${bad} violacion(es)` : 'Arquitectura OK: Firebase solo vive en infrastructure');
process.exit(bad ? 1 : 0);
