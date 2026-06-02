#!/usr/bin/env node
// Validates the example projects in this library. No dependencies — Node only.
//
//   node scripts/validate.mjs      (or: npm run validate)
//
// Checks, per project:
//   - every .appstudio is valid JSON with the right schema, name, code, packaging
//   - the .appstudio "code" matches its sibling raw source file (kept in lockstep)
//   - every source file carries the attribution header (source link)
//   - HTML has balanced <html>/<body>/<script> and its inline scripts parse
//   - JSX/JS has an `export default` (App Studio renders the default export)
//   - every source file has a matching .appstudio, and vice versa

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = join(root, 'projects');
const SOURCE_EXTS = ['.html', '.jsx', '.js'];

const errors = [];
const rel = (p) => p.slice(root.length + 1).replace(/\\/g, '/');
const fail = (file, msg) => errors.push(`${rel(file)}: ${msg}`);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const all = walk(projectsDir);
const appstudioFiles = all.filter((f) => extname(f) === '.appstudio');
const sourceFiles = all.filter((f) => SOURCE_EXTS.includes(extname(f)));

// 1. Validate each .appstudio and check it matches its source
for (const f of appstudioFiles) {
  let data;
  try {
    data = JSON.parse(readFileSync(f, 'utf8'));
  } catch (e) {
    fail(f, `invalid JSON: ${e.message}`);
    continue;
  }
  if (data.schema !== 'app-studio/canvas@1') fail(f, 'schema must be "app-studio/canvas@1"');
  if (typeof data.name !== 'string' || !data.name) fail(f, 'missing "name"');
  if (typeof data.code !== 'string' || !data.code.trim()) fail(f, 'missing or empty "code"');
  if (!data.packaging || typeof data.packaging !== 'object') {
    fail(f, 'missing "packaging" object');
  } else {
    if (!data.packaging.appName) fail(f, 'packaging.appName is missing');
    if (!/^[a-z0-9]+(\.[a-z0-9]+)+$/i.test(data.packaging.bundleId || '')) {
      fail(f, `packaging.bundleId looks invalid: ${JSON.stringify(data.packaging.bundleId)}`);
    }
  }
  const stem = basename(f, '.appstudio');
  const sibling = sourceFiles.find(
    (s) => dirname(s) === dirname(f) && basename(s, extname(s)) === stem,
  );
  if (!sibling) fail(f, `no sibling source file (${stem}.html/.jsx) in the same folder`);
  else if (typeof data.code === 'string' && data.code !== readFileSync(sibling, 'utf8')) {
    fail(f, `"code" does not match ${basename(sibling)} — regenerate the .appstudio`);
  }
}

// 2. Validate each source file
for (const f of sourceFiles) {
  const src = readFileSync(f, 'utf8');
  if (!src.includes('github.com/halisonworks/public-app-studio')) {
    fail(f, 'missing attribution header (link back to the library)');
  }
  if (extname(f) === '.html') {
    const count = (re) => (src.match(re) || []).length;
    if (count(/<html[\s>]/gi) !== 1 || count(/<\/html>/gi) !== 1) fail(f, 'unbalanced <html>');
    if (count(/<body[\s>]/gi) !== 1 || count(/<\/body>/gi) !== 1) fail(f, 'unbalanced <body>');
    if (count(/<script[\s>]/gi) !== count(/<\/script>/gi)) fail(f, 'unbalanced <script>');
    const re = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;
    let m, i = 0;
    while ((m = re.exec(src))) {
      i++;
      try {
        new Function(m[1]); // compile-only syntax check; does not run
      } catch (e) {
        fail(f, `inline <script> #${i} has a syntax error: ${e.message}`);
      }
    }
  } else if (!/export\s+default/.test(src)) {
    fail(f, 'no "export default" — App Studio renders the default export');
  }
  const stem = basename(f, extname(f));
  const hasAppstudio = appstudioFiles.some(
    (a) => dirname(a) === dirname(f) && basename(a, '.appstudio') === stem,
  );
  if (!hasAppstudio) fail(f, `no matching ${stem}.appstudio in the same folder`);
}

console.log(`Checked ${appstudioFiles.length} .appstudio and ${sourceFiles.length} source file(s).`);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log('✓ All projects valid.');
