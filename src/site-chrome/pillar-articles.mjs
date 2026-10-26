// Résout les slugs d'articles liés d'un pilier en liens { title, url }, à partir de la
// copie versionnée du blog (src/content/blog-articles.json). Les articles absents ou
// masqués sont ignorés : la liste n'affiche que ce qui est réellement en ligne.
//
// Utilisé par le script de build (scripts/sync-site-chrome.mjs, import JSON via node)
// et par le composant React PillarGuide (qui passe les articles déjà résolus).

const HIDDEN = new Set([
  'pentest-au-resultat-evaluer-l-impact-reel-des-tests-d-intrusion-sur-votre-si',
  'test-de-chute-de-garde',
]);

const urlSlug = (a) => a.slugFr || a.slug;

/**
 * @param {string[]} slugs      slugs (slugFr de préférence) listés par le pilier
 * @param {object[]} allArticles contenu de blog-articles.json
 * @returns {{ title: string, url: string }[]}
 */
export function resolvePillarArticles(slugs, allArticles) {
  if (!slugs?.length) return [];
  const bySlug = new Map();
  for (const a of allArticles) {
    if (!a.published || HIDDEN.has(a.slug) || (a.slugFr && HIDDEN.has(a.slugFr))) continue;
    bySlug.set(urlSlug(a), a);
    if (a.slug) bySlug.set(a.slug, a);
  }
  const out = [];
  const seen = new Set();
  for (const slug of slugs) {
    const a = bySlug.get(slug);
    if (!a || seen.has(urlSlug(a))) continue;
    seen.add(urlSlug(a));
    out.push({ title: a.titleFr || a.title, url: `/articles/${urlSlug(a)}` });
  }
  return out;
}
