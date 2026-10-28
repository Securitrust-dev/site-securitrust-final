// Dates de dernière modification des pages, pour le <lastmod> du sitemap.
// Pour chaque route, date du dernier commit Git touchant ses fichiers (page.tsx et
// layout.tsx de la route, ou la landing page statique public/*.html). Écrit
// src/site-chrome/generated/lastmod.json, versionné comme les autres fichiers générés.
// Lancé avant chaque build : si l'historique Git est absent ou tronqué (clone
// superficiel), le fichier versionné est conservé tel quel plutôt que faussé.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { STATIC_PAGES } from '../src/site-chrome/csp.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'src/site-chrome/generated/lastmod.json');
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

try {
  if (git('rev-parse', '--is-shallow-repository') !== 'false') throw new Error('clone superficiel');
} catch (e) {
  console.warn(`sitemap-lastmod : historique Git indisponible (${e.message}), lastmod.json conservé`);
  process.exit(0);
}

const lastCommit = (files) => {
  const present = files.filter((f) => existsSync(join(ROOT, f)));
  if (!present.length) return null;
  const date = git('log', '-1', '--format=%cI', '--', ...present);
  return date ? new Date(date).toISOString().slice(0, 10) : null;
};

// Routes React : chaque dossier de src/app qui contient un page.tsx.
const APP = join(ROOT, 'src/app');
const routes = {};
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name === 'api' || name.startsWith('_')) continue;
    if (existsSync(join(full, 'page.tsx'))) {
      const route = '/' + relative(APP, full).split('/').filter((s) => !/^\(.*\)$/.test(s)).join('/');
      routes[route] = [join('src/app', relative(APP, full), 'page.tsx'), join('src/app', relative(APP, full), 'layout.tsx')];
    }
    walk(full);
  }
};
walk(APP);
// Landing pages statiques (servies à la place de la route React éventuelle).
for (const [route, file] of Object.entries(STATIC_PAGES)) routes[route] = [join('public', file)];

const result = {};
for (const route of Object.keys(routes).sort()) {
  const date = lastCommit(routes[route]);
  if (date) result[route] = date;
}
writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n');
console.log(`sitemap-lastmod : ${Object.keys(result).length} routes datées`);
