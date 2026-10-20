// Injecte le header/footer communs (src/site-chrome/chrome.mjs) dans les landing
// pages statiques public/*.html, ainsi que les balises de <head> (feuille commune,
// GTM, suivi des leads) et le <noscript> GTM. Idempotent : au premier passage,
// remplace le <header> et le <footer> d'origine ; ensuite, ce qui se trouve entre
// les marqueurs site-chrome. Lancé par `npm run chrome:sync` et avant chaque build.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderHeader, renderFooter, renderHeadTags, renderGtmNoscript } from '../src/site-chrome/chrome.mjs';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
// Feuille commune intégrée dans chaque page : une requête bloquante de moins.
const CHROME_CSS = readFileSync(join(PUBLIC_DIR, 'site-chrome.css'), 'utf8');
const CSS_LINK = '<link rel="stylesheet" href="/site-chrome.css">';

const block = (name, html) => `<!-- site-chrome:${name} -->\n${html}\n<!-- /site-chrome:${name} -->`;

function replaceBlock(html, name, rendered, fallback) {
  const marked = new RegExp(`<!-- site-chrome:${name} -->[\\s\\S]*?<!-- /site-chrome:${name} -->`);
  if (marked.test(html)) return html.replace(marked, block(name, rendered));
  if (!fallback.test(html)) throw new Error(`<${name}> introuvable`);
  // Ancre de longueur nulle (insertion pure) : on garde le retour à la ligne.
  return html.replace(fallback, (m) => block(name, rendered) + (m ? '' : '\n'));
}

let changed = 0;
for (const file of readdirSync(PUBLIC_DIR).filter((f) => f.endsWith('.html'))) {
  const path = join(PUBLIC_DIR, file);
  const before = readFileSync(path, 'utf8');
  let html = before;
  try {
    html = replaceBlock(html, 'header', renderHeader({ position: 'sticky' }), /<header>[\s\S]*?<\/header>/);
    html = replaceBlock(html, 'footer', renderFooter(), /<footer>[\s\S]*?<\/footer>/);
    // Premier passage : l'ancien <link> isolé laisse la place au bloc head complet.
    html = replaceBlock(html, 'head', renderHeadTags({ css: CHROME_CSS }), new RegExp(`${CSS_LINK}(?=\n</head>)`));
    html = replaceBlock(html, 'gtm-noscript', renderGtmNoscript(), /(?<=<body[^>]*>\n)/);
  } catch (e) {
    throw new Error(`${file} : ${e.message}`);
  }
  if (html !== before) {
    writeFileSync(path, html);
    changed++;
  }
}
console.log(`site-chrome : ${changed} page(s) statique(s) mise(s) à jour`);
