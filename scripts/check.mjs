/** Check generated HTML, links, fragments and assets before sharing the site. */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const folders = ['', 'services', 'projects', 'templates'];
const pages = (await Promise.all(folders.map(async (folder) => (await readdir(path.join(root, folder))).filter((file) => file.endsWith('.html')).map((file) => path.join(folder, file))))).flat();
const errors = [];
for (const relative of pages) {
  const filename = path.join(root, relative);
  const html = await readFile(filename, 'utf8');
  const assert = (condition, message) => { if (!condition) errors.push(`${relative}: ${message}`); };
  assert((html.match(/<h1(?:\s|>)/g) || []).length === 1, 'Expected one h1');
  assert((html.match(/<main(?:\s|>)/g) || []).length === 1, 'Expected one main landmark');
  assert(/<html lang="en">/.test(html), 'Missing language');
  assert(/<meta name="description" content="[^"\n]+"/.test(html), 'Missing description');
  assert(!/{{\w+}}/.test(html), 'Unresolved template token');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert(new Set(ids).size === ids.length, 'Duplicate element IDs');
  for (const [image] of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="[^"]*"/.test(image), 'Missing image alt attribute');
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(value)) continue;
    const [filePart, fragment] = value.split('#');
    const target = filePart ? path.resolve(path.dirname(filename), decodeURIComponent(filePart.split('?')[0])) : filename;
    try {
      await access(target);
      if (fragment) {
        const targetHtml = target === filename ? html : await readFile(target, 'utf8');
        assert(targetHtml.includes(`id="${fragment}"`), `Missing anchor: ${value}`);
      }
    } catch { errors.push(`${relative}: Missing file ${value}`); }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Passed: ${pages.length} pages, local links, anchors, images, metadata and landmarks.`);
