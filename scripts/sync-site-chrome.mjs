// Injecte le header/footer communs (src/site-chrome/chrome.mjs) dans les landing
// pages statiques public/*.html, ainsi que les balises de <head> (feuille commune,
// GTM, suivi des leads), la fiche JSON-LD du cabinet (src/site-chrome/schema.mjs)
// et le <noscript> GTM. Idempotent : au premier passage,
// remplace le <header> et le <footer> d'origine ; ensuite, ce qui se trouve entre
// les marqueurs site-chrome. Lancé par `npm run chrome:sync` et avant chaque build.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { renderHeader, renderFooter, renderHeadTags, renderGtmNoscript } from '../src/site-chrome/chrome.mjs';
import { organizationNode, renderJsonLdScript, websiteNode } from '../src/site-chrome/schema.mjs';
import { PILLARS, STATIC_PILLARS } from '../src/site-chrome/pillars/index.mjs';
import { renderPillar, renderPillarSchema, pillarSchemaNodes } from '../src/site-chrome/pillar-render.mjs';
import { resolvePillarArticles } from '../src/site-chrome/pillar-articles.mjs';

const PUBLIC_DIR = new URL('../public/', import.meta.url).pathname;
// Articles du blog versionnés dans le dépôt : utilisés pour le bloc « Articles du blog »
// des guides piliers. Absent en cas d'erreur de lecture (le bloc articles reste vide).
let BLOG_ARTICLES = [];
try {
  BLOG_ARTICLES = JSON.parse(readFileSync(new URL('../src/content/blog-articles.json', import.meta.url), 'utf8'));
} catch (e) {
  console.warn('site-chrome : blog-articles.json illisible, guides sans articles liés');
}
const PILLAR_BY_FILE = new Map(STATIC_PILLARS.map((p) => [p.file, p]));
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
    // Fiche du cabinet, référencée par @id depuis les blocs Service de chaque page.
    html = replaceBlock(html, 'schema', renderJsonLdScript([organizationNode(), websiteNode()]), /(?=<!-- site-chrome:head -->)/);
    html = replaceBlock(html, 'gtm-noscript', renderGtmNoscript(), /(?<=<body[^>]*>\n)/);
    // Guide pilier (J2.3) : contenu de fond + FAQ, inséré avant le CTA final, et sa
    // FAQPage JSON-LD dans le <head>. Seules les pages déclarées comme piliers en ont un.
    const pillar = PILLAR_BY_FILE.get(file);
    if (pillar) {
      const articles = resolvePillarArticles(pillar.articles, BLOG_ARTICLES);
      html = replaceBlock(html, 'pillar', renderPillar(pillar, { articles }), /(?=\s*<section class="cta-outer">)/);
      html = replaceBlock(html, 'pillar-schema', renderPillarSchema(pillar), /(?=<!-- site-chrome:schema -->)/);
    }
  } catch (e) {
    throw new Error(`${file} : ${e.message}`);
  }
  if (html !== before) {
    writeFileSync(path, html);
    changed++;
  }
}
console.log(`site-chrome : ${changed} page(s) statique(s) mise(s) à jour`);

// Piliers rendus dans une page React (file === null) : on pré-rend le guide en un
// module généré (HTML + nœuds JSON-LD), pour que la page cliente n'importe qu'une
// chaîne, sans embarquer blog-articles.json ni la logique de rendu dans son bundle.
const GEN_DIR = new URL('../src/site-chrome/generated/', import.meta.url).pathname;
mkdirSync(GEN_DIR, { recursive: true });
let generated = 0;
for (const pillar of PILLARS.filter((p) => !p.file)) {
  const articles = resolvePillarArticles(pillar.articles, BLOG_ARTICLES);
  const module = `// Généré par scripts/sync-site-chrome.mjs — NE PAS MODIFIER À LA MAIN.\n`
    + `// Source : src/site-chrome/pillars/${pillar.slug}.mjs\n`
    + `export const html = ${JSON.stringify(renderPillar(pillar, { articles }))};\n`
    + `export const schema = ${JSON.stringify({ '@context': 'https://schema.org', '@graph': pillarSchemaNodes(pillar) })};\n`;
  const out = join(GEN_DIR, `${pillar.slug}.ts`);
  const prev = (() => { try { return readFileSync(out, 'utf8'); } catch { return null; } })();
  if (prev !== module) { writeFileSync(out, module); generated++; }
}
if (generated) console.log(`site-chrome : ${generated} guide(s) pilier React généré(s)`);
