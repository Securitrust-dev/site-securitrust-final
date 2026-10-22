// Copie les articles publiés de la base Turso dans le dépôt
// (src/content/blog-articles.json). Le blog s'affiche à partir de cette copie,
// sans dépendre de la base en production ; la base ne sert plus qu'à ajouter les
// articles de veille synthétisés depuis la dernière copie.
//
// Usage (CLI Turso connectée : `turso auth login`) :
//   npm run blog:export
// Les identifiants sont demandés à la CLI Turso le temps de l'export (jeton en lecture seule, valable un jour).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { createClient } from '@libsql/client';

const DB_NAME = process.env.TURSO_DB_NAME || 'securitrust';
const OUT = new URL('../src/content/blog-articles.json', import.meta.url).pathname;

const turso = (...args) => execFileSync('turso', args, { encoding: 'utf8' }).trim();
const url = process.env.TURSO_CONNECTION_URL || turso('db', 'show', DB_NAME, '--url');
const authToken = process.env.TURSO_AUTH_TOKEN || turso('db', 'tokens', 'create', DB_NAME, '--expiration', '1d', '--read-only');

const client = createClient({ url, authToken });
const { rows } = await client.execute(`
  SELECT id, title, title_fr, excerpt, excerpt_fr, content, content_fr, image, author, category, tags,
         lang, source, source_url, slug, slug_fr, impacts, remediation, created_at, updated_at
  FROM articles WHERE published = 1 ORDER BY created_at DESC`);

const articles = rows.map((r) => ({
  id: Number(r.id),
  title: r.title,
  titleFr: r.title_fr,
  excerpt: r.excerpt,
  excerptFr: r.excerpt_fr,
  content: r.content,
  contentFr: r.content_fr,
  image: r.image,
  author: r.author,
  category: r.category,
  tags: r.tags,
  lang: r.lang,
  source: r.source,
  sourceUrl: r.source_url,
  slug: r.slug,
  slugFr: r.slug_fr,
  published: true,
  impacts: r.impacts,
  action: r.remediation,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
}));

writeFileSync(OUT, JSON.stringify(articles, null, 1) + '\n');
console.log(`${articles.length} article(s) publiés copiés dans src/content/blog-articles.json`);
