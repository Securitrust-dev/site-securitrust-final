// Injecte le header/footer communs (src/site-chrome/chrome.mjs) dans les landing
// pages statiques public/*.html. Idempotent : au premier passage, remplace le
// <header> et le <footer> d'origine ; ensuite, ce qui se trouve entre les
// marqueurs site-chrome. Lancé par `npm run chrome:sync` et avant chaque build.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderHeader, renderFooter } from '../src/site-chrome/chrome.mjs';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
const CSS_LINK = '<link rel="stylesheet" href="/site-chrome.css">';

const block = (name, html) => `<!-- site-chrome:${name} -->\n${html}\n<!-- /site-chrome:${name} -->`;

function replaceBlock(html, name, rendered, fallback) {
  const marked = new RegExp(`<!-- site-chrome:${name} -->[\\s\\S]*?<!-- /site-chrome:${name} -->`);
  if (marked.test(html)) return html.replace(marked, block(name, rendered));
  if (!fallback.test(html)) throw new Error(`<${name}> introuvable`);
  return html.replace(fallback, block(name, rendered));
}

let changed = 0;
for (const file of readdirSync(PUBLIC_DIR).filter((f) => f.endsWith('.html'))) {
  const path = join(PUBLIC_DIR, file);
  const before = readFileSync(path, 'utf8');
  let html = before;
  try {
    html = replaceBlock(html, 'header', renderHeader({ position: 'sticky' }), /<header>[\s\S]*?<\/header>/);
    html = replaceBlock(html, 'footer', renderFooter(), /<footer>[\s\S]*?<\/footer>/);
  } catch (e) {
    throw new Error(`${file} : ${e.message}`);
  }
  if (!html.includes(CSS_LINK)) html = html.replace('</head>', `${CSS_LINK}\n</head>`);
  if (html !== before) {
    writeFileSync(path, html);
    changed++;
  }
}
console.log(`site-chrome : ${changed} page(s) statique(s) mise(s) à jour`);
