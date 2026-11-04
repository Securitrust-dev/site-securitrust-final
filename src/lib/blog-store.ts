// Articles du blog versionnés dans le dépôt (src/content/blog-articles.json,
// rafraîchi par `npm run blog:export`). C'est la source principale du blog : les
// pages s'affichent et sont indexables même si la base Turso est injoignable.
// La base reste lue en complément, pour les articles de veille synthétisés
// depuis la dernière copie.

import { articles } from '@/db/schema';
import storedArticles from '@/content/blog-articles.json';

export type StoredArticle = typeof articles.$inferSelect;

/** Articles retirés du site, même s'ils sont encore publiés en base. */
export const HIDDEN_SLUGS = new Set([
  'pentest-au-resultat-evaluer-l-impact-reel-des-tests-d-intrusion-sur-votre-si', // offre retirée du site
  'test-de-chute-de-garde', // article de test
  // Redirigés (next.config.js) le 29/10/2026 : retirés des listes et des sitemaps.
  'rssi-externalise-la-reponse-cybersecurite-adaptee-aux-pme-et-eti', // cannibalisait /rssi-externalise
  'guardfall-expose-les-agents-de-codage-d-ia-open-source-a-des-risques-d-injection-de-shell-vieux-de-plusieurs-decennies', // doublon de guardfall-les-agents-ia-open-source-vulnerables-a-l-injection-shell-classique
]);

/**
 * Titre court pour la balise <title> quand le titre de l'article, suffixe « | SecuriTrust »
 * compris, dépasse 65 caractères (Google le coupe). Le H1 et l'Open Graph gardent le titre
 * complet. Tenu ici, et non dans le texte des articles, que `npm run blog:export` réécrit.
 */
export const SEO_TITLES: Record<string, string> = {
  'nis2-en-france-obligations-sanctions-et-mesures-concretes-pour-2026': 'NIS2 en France : obligations, sanctions et mesures',
  'nis2-entite-essentielle-ou-importante-methode-pas-a-pas': 'NIS2 : entité essentielle ou importante ?',
  'dora-registre-d-informations-prestataires-tic-mode-d-emploi': 'Registre d\'informations DORA : mode d\'emploi',
  'declaration-d-applicabilite-iso-27001-la-construire-sans-se-perdre': 'Déclaration d\'applicabilité ISO 27001 : méthode',
  'les-failles-que-nous-retrouvons-le-plus-souvent-en-pentest-active-directory': 'Pentest Active Directory : faiblesses fréquentes',
  'preparer-un-pentest-web-perimetre-comptes-de-test-regles-d-engagement': 'Préparer un pentest web : périmètre et règles',
};

/**
 * Articles liés affichés en « À lire aussi » sous l'article. Tenu ici plutôt que dans le
 * texte des articles, que `npm run blog:export` réécrit depuis la base.
 */
/**
 * Offres liées affichées sous les articles de fond (maillage vers les pages de prestation).
 * Clé : slug de l'article ; valeur : [libellé, URL] des pages d'offre.
 */
export const ARTICLE_SERVICES: Record<string, [string, string][]> = {
  'preparer-un-pentest-web-perimetre-comptes-de-test-regles-d-engagement': [
    ['Pentest web', '/pentest-web'],
    ['Test d’intrusion externe', '/pentest-externe'],
    ['Pentest mobile', '/pentest-mobile'],
  ],
  'les-failles-que-nous-retrouvons-le-plus-souvent-en-pentest-active-directory': [
    ['Pentest Active Directory', '/pentest-ad'],
    ['Pentest interne', '/pentest-interne'],
    ['Test d’intrusion externe', '/pentest-externe'],
  ],
  'microsoft-365-12-reglages-de-securite-a-verifier-en-priorite': [
    ['Audit Microsoft 365', '/audit-o365'],
    ['Test d’intrusion externe', '/pentest-externe'],
  ],
  'nis2-entite-essentielle-ou-importante-methode-pas-a-pas': [['Conformité NIS2', '/nis2'], ['RSSI externalisé', '/rssi-externalise'], ['Évaluation de maturité', '/evaluation-maturite']],
  'nis2-en-france-obligations-sanctions-et-mesures-concretes-pour-2026': [['Conformité NIS2', '/nis2'], ['RSSI externalisé', '/rssi-externalise'], ['Audit de cybersécurité', '/audit-cybersecurite']],
  'dora-registre-d-informations-prestataires-tic-mode-d-emploi': [['Conformité DORA', '/dora'], ['RSSI externalisé', '/rssi-externalise']],
  'declaration-d-applicabilite-iso-27001-la-construire-sans-se-perdre': [['Certification ISO 27001', '/iso27001'], ['RSSI externalisé', '/rssi-externalise'], ['Analyse de risques EBIOS RM', '/ebios-rm']],
};

export const RELATED_ARTICLES: Record<string, string[]> = {
  // Deux angles sur la même faille Kemp LoadMaster : exploitation active / détail de la CVE.
  'exploitation-active-de-la-faille-rce-critique-dans-progress-kemp-loadmaster': ['faille-critique-cve-2026-8037-dans-progress-kemp-loadmaster-execution-root-sans-authentification'],
  'faille-critique-cve-2026-8037-dans-progress-kemp-loadmaster-execution-root-sans-authentification': ['exploitation-active-de-la-faille-rce-critique-dans-progress-kemp-loadmaster'],
};

export const isHidden = (a: { slug: string; slugFr?: string | null }) =>
  HIDDEN_SLUGS.has(a.slug) || (!!a.slugFr && HIDDEN_SLUGS.has(a.slugFr));

/**
 * Article de veille : synthèse d'une actualité externe (flux RSS, source citée ou auteur
 * externe). Les autres sont les articles d'expertise rédigés par SecuriTrust.
 */
export const isVeille = (a: { source?: string | null; sourceUrl?: string | null; author?: string | null }) =>
  a.source === 'rss' || !!a.sourceUrl || (!!a.author && a.author !== 'SecuriTrust');

// Les brouillons versionnés dans le dépôt (published === false) restent invisibles
// partout — listes, recherche, sitemaps et page article (404) — jusqu'à ce qu'un
// expert les relise et passe `published` à true. Les articles existants sont tous
// publiés : ce filtre ne change donc rien à l'affichage actuel.
const visible = (storedArticles as StoredArticle[]).filter((a) => !isHidden(a) && a.published !== false);
const urlSlug = (a: StoredArticle) => a.slugFr || a.slug;

// Une même actualité a parfois été synthétisée plusieurs fois, sous des adresses
// différentes : la première synthèse (plus petit id) est la version de référence,
// les autres redirigent vers elle.
const primaryBySource = new Map<string, StoredArticle>();
for (const a of [...visible].sort((x, y) => x.id - y.id)) {
  if (a.sourceUrl && !primaryBySource.has(a.sourceUrl)) primaryBySource.set(a.sourceUrl, a);
}
const isPrimary = (a: StoredArticle) => !a.sourceUrl || primaryBySource.get(a.sourceUrl) === a;

/** Articles du dépôt, une seule version par actualité. */
export const STORED_ARTICLES: StoredArticle[] = visible.filter(isPrimary);

/** Adresses des doublons → adresse de la version de référence. */
export const DUPLICATE_SLUGS = new Map<string, string>();
for (const a of visible) {
  if (!isPrimary(a)) {
    const target = urlSlug(primaryBySource.get(a.sourceUrl!)!);
    DUPLICATE_SLUGS.set(a.slug, target);
    if (a.slugFr) DUPLICATE_SLUGS.set(a.slugFr, target);
  }
}

export function findStoredArticle(slug: string): StoredArticle | null {
  return STORED_ARTICLES.find((a) => a.slugFr === slug) ?? STORED_ARTICLES.find((a) => a.slug === slug) ?? null;
}
