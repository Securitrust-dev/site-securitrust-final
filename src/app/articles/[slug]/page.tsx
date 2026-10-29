import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PromoBanner } from '@/components/sections/promo-banner';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { notFound, permanentRedirect } from 'next/navigation';
import { BreadcrumbSchema, JsonLd } from '@/components/StructuredData';
import { LOGO_URL, ORG_ID, SITE_URL } from '@/site-chrome/schema.mjs';
import sanitizeHtml from 'sanitize-html';
import { db, client } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Parser from 'rss-parser';
import { synthesizeArticle } from '@/lib/claude';
import { checkVeilleRelevance } from '@/lib/veille-filter';
import { translateToFrench, generateFrenchSlug } from '@/lib/translate';
import { classifyArticle } from '@/lib/articles';
import { RSS_SANITIZE_OPTIONS, RSS_FEED_URL, generateSlug, extractImage, RSS_STOP_WORDS } from '@/lib/rss-utils';
import ArticleInfographic from '@/components/ArticleInfographic';
import { BLOG_URL, VEILLE_PATH, categoryUrl, cleanAuthor, formatFrDate, toIsoDate } from '@/lib/blog';
import { DUPLICATE_SLUGS, HIDDEN_SLUGS, RELATED_ARTICLES, STORED_ARTICLES, findStoredArticle, isHidden, isVeille } from '@/lib/blog-store';
import { clampDescription } from '@/site-chrome/meta-descriptions.mjs';
import { unstable_cache } from 'next/cache';


/** Repli « direct RSS » : texte anglais d'origine, seul le titre est traduit (id 0). */
const isRawFeedCopy = (a: ArticleRow) => a.id === 0;
const articleUrl = (a: ArticleRow) => `${BLOG_URL}/${a.slugFr || a.slug}`;

/** Ajoute des ancres aux intertitres h2/h3 du contenu et en extrait le sommaire. */
function withHeadingIds(html: string) {
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, lvl, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    let id = generateSlug(text).slice(0, 60) || 'section';
    while (used.has(id)) id += '-2';
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl}${String(attrs).replace(/\sid="[^"]*"/i, '')} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

const SANITIZE_OPTIONS = RSS_SANITIZE_OPTIONS;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

type ArticleRow = typeof articles.$inferSelect & {
  sourceType?: string;
};

/**
 * Synthétise un élément RSS avec Claude et l'enregistre en base. Si la base est
 * injoignable, l'article synthétisé est quand même affiché (mis en cache par l'ISR).
 */
async function synthesizeAndInsertArticle(item: any, slug: string): Promise<ArticleRow | null> {
  const sourceUrl = item.link || item.guid;
  if (!sourceUrl) return null;

  // Déjà synthétisé (requête concurrente ou visite précédente) ?
  try {
    const existing = await db.select().from(articles).where(eq(articles.sourceUrl, sourceUrl)).limit(1);
    if (existing.length && !isHidden(existing[0])) return existing[0];
  } catch {
    // Base injoignable : on synthétise sans pouvoir réutiliser.
  }

  // Hors ligne éditoriale : pas de synthèse ; la page retombe sur l'affichage brut du
  // flux, en noindex (getRssArticleDirect).
  if (!(await checkVeilleRelevance({ title: item.title || '', excerpt: item.contentSnippet || '' })).pertinent) return null;

  let synthesized: Awaited<ReturnType<typeof synthesizeArticle>>;
  try {
    synthesized = await synthesizeArticle({
      title: item.title || '',
      content: item.content || item.description || '',
      excerpt: item.contentSnippet?.slice(0, 300) || '',
      sourceUrl,
    });
  } catch {
    return null;
  }
  if (!synthesized) return null;

  const now = new Date().toISOString();
  const row: ArticleRow = {
    id: -1,
    title: item.title || '',
    titleFr: synthesized.titleFr,
    excerpt: item.contentSnippet?.slice(0, 200) || '',
    excerptFr: synthesized.excerptFr,
    content: sanitizeHtml(item.content || item.description || '', SANITIZE_OPTIONS),
    contentFr: sanitizeHtml(synthesized.contentFr, SANITIZE_OPTIONS),
    image: extractImage(item),
    author: 'SecuriTrust',
    category: synthesized.category,
    tags: JSON.stringify(synthesized.tags),
    lang: 'fr',
    source: 'rss',
    sourceUrl,
    // Slug d'URL demandé : l'article est enregistré sous cette adresse.
    slug,
    slugFr: slug,
    published: true,
    impacts: synthesized.impacts?.length ? JSON.stringify(synthesized.impacts) : null,
    action: synthesized.action || null,
    createdAt: toIsoDate(item.isoDate || item.pubDate),
    updatedAt: now,
  };

  try {
    const { id: _id, ...values } = row;
    await db
      .insert(articles)
      .values(values)
      .onConflictDoUpdate({
        target: articles.slug,
        set: {
          title: values.title, titleFr: values.titleFr, excerpt: values.excerpt, excerptFr: values.excerptFr,
          content: values.content, contentFr: values.contentFr, image: values.image, category: values.category,
          tags: values.tags, sourceUrl, impacts: values.impacts, action: values.action, updatedAt: now,
        },
      });
    const saved = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    if (saved.length) return saved[0];
  } catch (error) {
    console.error('[blog] enregistrement de l\'article synthétisé impossible', error);
  }
  return row;
}

/** On-demand Claude synthesis for RSS articles not yet in DB */
async function synthesizeAndStoreRssArticle(slug: string): Promise<ArticleRow | null> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);

    // 1. Try exact slug match (English title → slug)
    for (const item of feed.items) {
      const sourceUrl = item.link || item.guid;
      if (!sourceUrl) continue;

      const itemSlug = generateSlug(item.title || '');
      if (itemSlug !== slug) continue;

      return synthesizeAndInsertArticle(item, slug);
    }

    // 2. Fallback: keyword-based matching for French slugs
    // The URL slug may be from a French translation that doesn't match the English title
    const stopWords = RSS_STOP_WORDS;
    const slugWords = slug.split('-').filter(w => w.length > 2 && !stopWords.has(w));

    let bestItem: any = null;
    let bestScore = 0;
    for (const item of feed.items) {
      if (!item.title) continue;
      const titleLower = item.title.toLowerCase();
      let score = 0;
      for (const word of slugWords) {
        if (titleLower.includes(word)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }

    if (bestItem && bestScore >= 2) {
      return synthesizeAndInsertArticle(bestItem, slug);
    }

    // 3. Skip Google Translate fallback here — let getRssArticleDirect handle it
    // That function renders directly from RSS without needing Claude
    return null;
  } catch {
    return null;
  }
}

/** Re-synthesize an RSS article that exists in DB but has no French content yet */
async function synthesizeMissingRssArticle(article: ArticleRow): Promise<ArticleRow | null> {
  try {
    if (!article.sourceUrl) return null;

    // Look up the original RSS item by source URL
    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);
    const item = feed.items.find((i) => (i.link || i.guid) === article.sourceUrl);
    if (!item) return null;
    if (!(await checkVeilleRelevance({ title: item.title || article.title, excerpt: item.contentSnippet || article.excerpt || '' })).pertinent) return null;

    // Synthesize via Claude
    const synthesized = await synthesizeArticle({
      title: item.title || article.title,
      content: item.content || item.description || article.content,
      excerpt: item.contentSnippet?.slice(0, 300) || article.excerpt,
      sourceUrl: article.sourceUrl,
    });

    if (!synthesized) return null;

    // Update the DB record with French content
    const s = generateSlug(synthesized.titleFr);
    const impactsJson = synthesized.impacts?.length ? JSON.stringify(synthesized.impacts) : null;

    // Try full UPDATE (with impacts + remediation), fall back to minimal if schema lacks these columns
    try {
      await client.execute({
        sql: `UPDATE articles SET title_fr = ?, excerpt_fr = ?, content_fr = ?, slug_fr = ?, category = ?, tags = ?, impacts = ?, remediation = ?, updated_at = ? WHERE id = ?`,
        args: [
          synthesized.titleFr,
          synthesized.excerptFr,
          sanitizeHtml(synthesized.contentFr, SANITIZE_OPTIONS),
          s,
          synthesized.category,
          JSON.stringify(synthesized.tags),
          impactsJson,
          synthesized.action || null,
          new Date().toISOString(),
          article.id,
        ],
      });
    } catch {
      // Fallback for DB schema without impacts/remediation columns
      await client.execute({
        sql: `UPDATE articles SET title_fr = ?, excerpt_fr = ?, content_fr = ?, slug_fr = ?, category = ?, tags = ?, updated_at = ? WHERE id = ?`,
        args: [
          synthesized.titleFr,
          synthesized.excerptFr,
          sanitizeHtml(synthesized.contentFr, SANITIZE_OPTIONS),
          s,
          synthesized.category,
          JSON.stringify(synthesized.tags),
          new Date().toISOString(),
          article.id,
        ],
      });
    }

    // Return the updated article
    const result = await db.select().from(articles).where(eq(articles.id, article.id)).limit(1);
    if (result.length) return result[0];
    return null;
  } catch {
    return null;
  }
}

/** Fallback: fetch RSS article directly (no Claude), using Google Translate */
async function getRssArticleDirect(slug: string): Promise<ArticleRow | null> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(RSS_FEED_URL);

    // Find matching item (same logic as synthesizeAndStoreRssArticle)
    let bestItem: any = null;
    let bestScore = 0;

    // 1. Try exact slug match (English title → slug)
    for (const item of feed.items) {
      const itemSlug = generateSlug(item.title || '');
      if (itemSlug === slug) { bestItem = item; bestScore = 999; break; }
    }

    // 2. Keyword fallback for French slugs
    if (!bestItem) {
      const stopWords = RSS_STOP_WORDS;
      const slugWords = slug.split('-').filter((w: string) => w.length > 2 && !stopWords.has(w));
      for (const item of feed.items) {
        if (!item.title) continue;
        const titleLower = item.title.toLowerCase();
        let score = 0;
        for (const word of slugWords) {
          if (titleLower.includes(word)) score++;
        }
        if (score > bestScore) { bestScore = score; bestItem = item; }
      }
      if (bestScore < 2) bestItem = null;
    }

    if (!bestItem) {
      // 3. Google Translate fallback: try translating top candidates' titles
      const topCandidates = [...feed.items].filter(i => i.title).slice(0, 20);
      for (const candidate of topCandidates) {
        try {
          const frenchTitle = await translateToFrench(candidate.title || '');
          const frenchSlug = generateFrenchSlug(frenchTitle);
          if (frenchSlug === slug) { bestItem = candidate; break; }
        } catch {
          continue;
        }
      }
      if (!bestItem) return null;
    }

    // Extract image
    const imageUrl = extractImage(bestItem);

    const excerptEn = (bestItem.contentSnippet || bestItem.description || '').slice(0, 300);
    const titleFr = await translateToFrench(bestItem.title || '');
    const excerptFr = await translateToFrench(excerptEn);
    const classification = classifyArticle(
      titleFr || bestItem.title || '',
      excerptFr || excerptEn,
      bestItem.content || bestItem.description || ''
    );

    const slugFr = generateFrenchSlug(titleFr || bestItem.title || '');
    const publishedDate = bestItem.pubDate || bestItem.isoDate || new Date().toISOString();

    return {
      id: 0,
      title: bestItem.title || '',
      titleFr: titleFr || null,
      excerpt: excerptEn.slice(0, 200),
      excerptFr: excerptFr || null,
      content: sanitizeHtml(bestItem.content || bestItem.description || '', SANITIZE_OPTIONS),
      contentFr: null,
      image: imageUrl,
      author: cleanAuthor(bestItem.creator),
      category: classification.category,
      tags: JSON.stringify(classification.tags),
      lang: 'fr',
      source: 'rss',
      sourceUrl: bestItem.link || bestItem.guid || null,
      slug: generateSlug(bestItem.title || ''),
      slugFr: slugFr,
      published: true,
      impacts: null,
      action: null,
      createdAt: publishedDate,
      updatedAt: publishedDate,
    };
  } catch {
    return null;
  }
}

async function loadArticle(slug: string): Promise<ArticleRow | null> {
  // 0. Copie versionnée dans le dépôt : ne dépend pas de la base.
  if (HIDDEN_SLUGS.has(slug)) return null;
  const stored = findStoredArticle(DUPLICATE_SLUGS.get(slug) ?? slug);
  if (stored) return stored;

  // 1. Try DB (Claude-synthesized or internal articles)
  try {
    let result = await db.select().from(articles).where(eq(articles.slugFr, slug)).limit(1);
    if (!result.length) {
      result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    }
    if (result.length && !isHidden(result[0])) {
      // If the article has a source URL but no French content, synthesize it now
      if (!result[0].contentFr && result[0].sourceUrl) {
        const updated = await synthesizeMissingRssArticle(result[0]);
        if (updated) return updated;
      }
      return result[0];
    }
  } catch {
    // Fall through
  }

  // 2. If not in DB, try on-demand Claude synthesis from RSS (best quality)
  const claudeArticle = await synthesizeAndStoreRssArticle(slug);
  if (claudeArticle) return claudeArticle;

  // 3. Fallback: direct RSS fetch with Google Translate (always works)
  return getRssArticleDirect(slug);
}

// La page est rendue à chaque requête (nonce CSP, voir middleware.ts) : l'article est
// mis en cache une heure, comme l'était le rendu (ISR). Sans ce cache, chaque visite d'une
// veille récente relancerait la lecture du flux, voire une synthèse par Claude.
const getArticle = unstable_cache(loadArticle, ['blog-article'], { revalidate: 3600 });

// Articles du dépôt générés au build ; les autres (veille récente) à la demande.
export async function generateStaticParams() {
  return STORED_ARTICLES.map((a) => ({ slug: a.slugFr || a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  const metaTitle = article.titleFr || article.title;
  const metaDescription = clampDescription(article.excerptFr || article.excerpt);

  // Tout article synthétisé est indexable ; seul le repli brut (texte anglais de la
  // source) reste en noindex avec un canonical vers l'original.
  const rawCopy = isRawFeedCopy(article);
  return {
    title: { absolute: `${metaTitle} | SecuriTrust` },
    description: metaDescription,
    robots: {
      index: !rawCopy,
      follow: true,
    },
    alternates: {
      canonical: rawCopy && article.sourceUrl ? article.sourceUrl : articleUrl(article),
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: articleUrl(article),
      type: 'article',
      publishedTime: toIsoDate(article.createdAt),
      modifiedTime: toIsoDate(article.updatedAt || article.createdAt),
      section: article.category,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  // Doublon d'une actualité déjà synthétisée : 301 vers la version de référence.
  const primarySlug = DUPLICATE_SLUGS.get(slug);
  if (primarySlug) permanentRedirect(`/articles/${primarySlug}`);
  const article = await getArticle(slug);
  
  if (!article || !article.published) {
    notFound();
  }

  const displayTitle = article.titleFr || article.title;
  const displayExcerpt = article.excerptFr || article.excerpt;

  // Extract CVE number from title or tags
  const cveMatch = displayTitle.match(/(CVE-\d{4}-\d{4,})/i) ||
    (article.tags || '').match(/(CVE-\d{4}-\d{4,})/i);
  const cveNumber = cveMatch ? cveMatch[1].toUpperCase() : undefined;

  // Parse impacts from DB (stored as JSON string)
  let dbImpacts: string[] = [];
  if (article.impacts) {
    try {
      const parsed = JSON.parse(article.impacts);
      if (Array.isArray(parsed)) dbImpacts = parsed;
    } catch {}
  }

  // Category-based fallback impacts when DB doesn't have stored impacts
  const CATEGORY_IMPACTS: Record<string, { impacts: string[]; action: string }> = {
    'Vulnérabilités & CVE': {
      impacts: [
        'Prise de contrôle complète du système par un attaquant non authentifié.',
        'Exposition des données sensibles et des infrastructures critiques.',
        'Vecteur d\'attaque exploitable à distance, sans interaction utilisateur.',
      ],
      action: 'MISE À JOUR DE SÉCURITÉ URGENTE FORTEMENT RECOMMANDÉE',
    },
    'Ransomware': {
      impacts: [
        'Chiffrement des données critiques et paralysie de l\'activité.',
        'Exfiltration de données sensibles (vol de données).',
        'Rançon élevée et coûts de remédiation considérables.',
      ],
      action: 'ISOLEMENT IMMÉDIAT DES SYSTÈMES COMPROMIS ET RESTAURATION DES SAUVEGARDES',
    },
    'Phishing & Fraude': {
      impacts: [
        'Vol d\'identifiants et compromission des comptes professionnels.',
        'Propagation de malwares au sein du réseau interne.',
        'Atteinte à la réputation et perte de confiance des clients.',
      ],
      action: 'FORMATION DES ÉQUIPES ET ACTIVATION DE L\'AUTHENTIFICATION MULTI-FACTEURS',
    },
    'Threat Intelligence': {
      impacts: [
        'Exposition aux APT et groupes cybercriminels ciblant le secteur.',
        'Risque de compromission durable (persistance avancée).',
        'Vol de propriété intellectuelle ou de données stratégiques.',
      ],
      action: 'RENFORCEMENT DE LA VEILLE ET MISE À JOUR DES MESURES DE DÉFENSE',
    },
    'Malware & Exploits': {
      impacts: [
        'Infection massive des postes de travail et serveurs.',
        'Exfiltration de données et installation de portes dérobées.',
        'Utilisation des ressources compromises pour des attaques secondaires.',
      ],
      action: 'DÉPLOIEMENT DES CORRECTIFS ET ANALYSE FORENSIQUE IMMÉDIATE',
    },
    'Cloud & IAM': {
      impacts: [
        'Compromission des identités et accès non autorisés aux ressources cloud.',
        'Exposition des données hébergées et violation de la conformité.',
        'Propagation latérale au sein de l\'infrastructure cloud.',
      ],
      action: 'RENFORCEMENT DE LA GOUVERNANCE DES ACCÈS ET ACTIVATION DE LA MFA',
    },
    'Zero Trust & Architecture': {
      impacts: [
        'Mobilité latérale des attaquants au sein du réseau.',
        'Accès non autorisé aux ressources critiques.',
        'Visibilité insuffisante sur les flux et les accès.',
      ],
      action: 'MISE EN PLACE D\'UNE ARCHITECTURE ZERO TRUST ET SEGMENTATION RÉSEAU',
    },
    'SOC / SecOps': {
      impacts: [
        'Délai de détection accru exposant à des dommages étendus.',
        'Surcharge d\'alertes et fatigue des analystes.',
        'Capacité de réponse insuffisante face aux incidents.',
      ],
      action: 'AUTOMATISATION DES OPÉRATIONS DE SÉCURITÉ ET RENFORCEMENT DU SOC',
    },
    'Conformité & GRC': {
      impacts: [
        'Non-conformité réglementaire exposant à des sanctions financières.',
        'Atteinte à la réputation et perte de confiance des parties prenantes.',
        'Obligation de mise en conformité sous contrainte de délais.',
      ],
      action: 'ÉVALUATION DE LA CONFORMITÉ ET MISE EN PLACE DES MESURES CORRECTIVES',
    },
    'Red Team & Pentest': {
      impacts: [
        'Identification tardive de vulnérabilités exploitables.',
        'Exposition à des attaques ciblées non détectées.',
        'Lacunes dans la posture de sécurité globale.',
      ],
      action: 'PROGRAMME DE TESTS D\'INTRUSION RÉGULIERS ET EXERCICES RED TEAM',
    },
    'Supply Chain': {
      impacts: [
        'Compromission via un fournisseur ou un sous-traitant.',
        'Propagation de l\'attaque à l\'ensemble de la chaîne logistique.',
        'Difficulté de détection et traçabilité des incidents.',
      ],
      action: 'ÉVALUATION DES RISQUES FOURNISSEURS ET CONTRÔLE DE LA CHAÎNE LOGISTIQUE',
    },
    'Actualités & Réglementation': {
      impacts: [
        'Non-conformité réglementaire exposant à des sanctions financières.',
        'Atteinte à la réputation et perte de confiance des parties prenantes.',
        'Obligation de mise en conformité sous contrainte de délais.',
      ],
      action: 'ÉVALUATION DE LA CONFORMITÉ ET MISE EN PLACE DES MESURES CORRECTIVES',
    },
  };

  const articleCategory = article.category || 'Actualités & Réglementation';
  const fallback = CATEGORY_IMPACTS[articleCategory] || {
    impacts: [
      'Exposition à des risques de sécurité nécessitant une attention immédiate.',
      'Impact potentiel sur la continuité des activités et l\'intégrité des données.',
      'Nécessité d\'une évaluation et de mesures correctives adaptées.',
    ],
    action: 'ÉVALUATION DE SÉCURITÉ ET MISE EN PLACE DE MESURES CORRECTIVES',
  };

  // Build infographic props with stored or fallback impacts
  const finalImpacts = dbImpacts.length > 0 ? dbImpacts : fallback.impacts;
  const finalAction = article.action || fallback.action;
  const infographicProps = {
    cve: cveNumber,
    title: displayTitle.toUpperCase(),
    summary: displayExcerpt,
    impacts: finalImpacts,
    action: finalAction,
    source: article.source === 'rss' ? 'The Hacker News' : 'SecuriTrust',
  };

  const url = articleUrl(article);
  const publishedIso = toIsoDate(article.createdAt);
  const updatedIso = toIsoDate(article.updatedAt || article.createdAt);
  const fromFeed = article.source === 'rss';
  // Rubrique de l'article : veille (synthèse d'actualité) ou expertise (rédigé par le cabinet).
  const veille = isVeille(article);
  const backHref = veille ? VEILLE_PATH : '/articles';
  const rawCopy = isRawFeedCopy(article);
  // Contenu affiché : texte français en base ; le repli brut n'affiche que l'extrait
  // (on ne republie pas l'article anglais de la source).
  const body = rawCopy ? null : withHeadingIds(sanitizeHtml(article.contentFr || article.content || '', SANITIZE_OPTIONS));
  const toc = [
    { id: 'synthese', text: 'Synthèse et impacts', level: 2 as const },
    ...(body?.html.trim() ? [{ id: 'analyse', text: 'Analyse', level: 2 as const }, ...body.toc] : []),
    ...(fromFeed && article.sourceUrl ? [{ id: 'source', text: 'Source', level: 2 as const }] : []),
  ];

  const jsonLd = {
    '@type': veille ? 'NewsArticle' : 'BlogPosting',
    headline: displayTitle,
    description: displayExcerpt,
    image: article.image,
    datePublished: publishedIso,
    dateModified: updatedIso,
    articleSection: article.category,
    inLanguage: 'fr-FR',
    author: article.author === 'SecuriTrust'
      ? { '@type': 'Organization', '@id': ORG_ID, name: 'SecuriTrust', url: SITE_URL }
      : { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: 'SecuriTrust', logo: { '@type': 'ImageObject', url: LOGO_URL } },
    ...(fromFeed && article.sourceUrl ? { isBasedOn: article.sourceUrl } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://www.securitrust.fr' },
        { name: 'Articles', url: BLOG_URL },
        veille
          ? { name: 'Veille', url: `https://www.securitrust.fr${VEILLE_PATH}` }
          : { name: articleCategory, url: `https://www.securitrust.fr${categoryUrl(articleCategory)}` },
        { name: displayTitle, url },
      ]} />
      <PromoBanner />
      <div className="relative min-h-screen bg-[#030303]">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full bg-void opacity-60"></div>
          <div className="stars opacity-20"></div>
        </div>
        <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
        
        <ThreeBackground />
        <MatrixRain />
        <Navbar />
        
        {/* Article Hero */}
        <div className="relative z-10 pt-32 pb-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-start gap-4 mb-8">
              {/* Back Button */}
              <Link
                href={backHref}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm uppercase tracking-wider font-medium">{veille ? 'Retour à la veille' : 'Retour aux articles'}</span>
              </Link>

              {/* Rubrique et catégorie */}
              <div className="flex flex-wrap items-center gap-2">
              {veille && (
                <Link href={VEILLE_PATH} className="px-4 py-2 border border-cyan-400/60 rounded hover:bg-cyan-400/10">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Veille</span>
                </Link>
              )}
              <Link href={categoryUrl(articleCategory)} className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded hover:bg-cyan-400">
                <span className="text-xs font-semibold text-black uppercase tracking-wider">
                  {articleCategory}
                </span>
              </Link>
              </div>
            </div>

            {/* Title */}
            <h1 className="brand-h1 max-w-4xl">
              {displayTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 mb-10 pb-10 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Publié le <time dateTime={publishedIso}>{formatFrDate(publishedIso)}</time></span>
              </div>
              {updatedIso.slice(0, 10) !== publishedIso.slice(0, 10) && (
                <span>Mis à jour le <time dateTime={updatedIso}>{formatFrDate(updatedIso)}</time></span>
              )}
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Par <span rel="author">{article.author}</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="relative z-10 pb-32">
          <div className="max-w-4xl mx-auto px-6">
            {toc.length > 1 && (
              <nav aria-labelledby="sommaire-titre" className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h2 id="sommaire-titre" className="mb-3 text-xs font-semibold uppercase tracking-widest text-cyan-400">Sommaire</h2>
                <ol className="space-y-2 text-sm text-slate-300">
                  {toc.map((t) => (
                    <li key={t.id} className={t.level === 3 ? 'pl-5' : ''}>
                      <a href={`#${t.id}`} className="hover:text-cyan-300">{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <section id="synthese" aria-label="Synthèse et impacts" className="glass-panel rounded-2xl p-8 md:p-12 lg:p-16 scroll-mt-28">
              {/* Infographic component - impacts + action for all articles */}
              <ArticleInfographic {...infographicProps} />
            </section>

            {body?.html.trim() && (
              <section id="analyse" className="mt-12 scroll-mt-28">
                <h2 className="mb-6 text-2xl font-light text-white">Analyse</h2>
                <div
                  className="text-base leading-relaxed text-slate-300 [&_p]:mb-4 [&_a]:text-cyan-400 [&_a]:underline [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:text-white [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:text-white [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_[id]]:scroll-mt-28"
                  dangerouslySetInnerHTML={{ __html: body.html }}
                />
              </section>
            )}

            {fromFeed && article.sourceUrl && (
              <section id="source" className="mt-12 scroll-mt-28 border-t border-white/10 pt-8 text-sm text-slate-400">
                <h2 className="mb-2 text-base font-medium text-white">Source</h2>
                <p>
                  {rawCopy ? 'Article original' : 'Synthèse SecuriTrust de l\'article'} publié par The Hacker News :{' '}
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                    {article.title}
                  </a>
                </p>
              </section>
            )}

            {(() => {
              // « À lire aussi » : articles liés déclarés dans blog-store (RELATED_ARTICLES).
              const related = (RELATED_ARTICLES[article.slugFr || article.slug] ?? [])
                .map((s) => findStoredArticle(s))
                .filter((a): a is NonNullable<typeof a> => !!a);
              if (!related.length) return null;
              return (
                <section id="a-lire-aussi" className="mt-12 scroll-mt-28 border-t border-white/10 pt-8">
                  <h2 className="mb-4 text-base font-medium text-white">À lire aussi</h2>
                  <ul className="space-y-3">
                    {related.map((r) => (
                      <li key={r.slugFr || r.slug}>
                        <Link href={`/articles/${r.slugFr || r.slug}`} className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300">
                          {r.titleFr || r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })()}

            {/* Back to Articles CTA */}
            <div className="text-center mt-16">
              <Link 
                href={backHref}
                className="btn-brand group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>{veille ? 'Toute la veille' : 'Tous les articles'}</span>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}