import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { PromoBanner } from '@/components/sections/promo-banner';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { BreadcrumbSchema } from '@/components/StructuredData';
import sanitizeHtml from 'sanitize-html';
import { db, client } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Parser from 'rss-parser';
import { synthesizeArticle } from '@/lib/claude';

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'img', 'figure', 'figcaption',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'code', 'blockquote',
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    '*': ['class'],
    'a': ['href', 'target', 'rel', 'title'],
    'img': ['src', 'alt', 'width', 'height', 'loading'],
    'td': ['colspan', 'rowspan'],
    'th': ['colspan', 'rowspan', 'scope'],
  },
  allowedSchemes: ['https', 'http', 'mailto'],
  allowedSchemesByTag: { img: ['https', 'data'] },
};

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

type ArticleRow = typeof articles.$inferSelect & {
  sourceType?: string;
};

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Synthesize an RSS item via Claude and store in DB */
async function synthesizeAndInsertArticle(item: any, slug: string): Promise<ArticleRow | null> {
  try {
    const sourceUrl = item.link || item.guid;
    if (!sourceUrl) return null;

    // Check if already in DB (from another concurrent request)
    const existing = await db
      .select({ id: articles.id })
      .from(articles)
      .where(eq(articles.sourceUrl, sourceUrl))
      .limit(1);
    if (existing.length > 0) {
      const result = await db.select().from(articles).where(eq(articles.id, existing[0].id)).limit(1);
      if (result.length) return result[0];
    }

    const synthesized = await synthesizeArticle({
      title: item.title || '',
      content: item.content || item.description || '',
      excerpt: item.contentSnippet?.slice(0, 300) || '',
      sourceUrl,
    });

    if (!synthesized) return null;

    // Extract image
    let imageUrl = 'https://thehackernews.com/images/default-article.jpg';
    if (item.enclosure?.url) {
      imageUrl = item.enclosure.url;
    } else if (item.content) {
      const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) imageUrl = imgMatch[1];
    }

    // Store in DB
    const s = generateSlug(synthesized.titleFr);
    const publishedDate = item.pubDate || item.isoDate || new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const impactsJson = synthesized.impacts?.length ? JSON.stringify(synthesized.impacts) : null;
    await client.execute({
      sql: `INSERT INTO articles (title, title_fr, excerpt, excerpt_fr, content, content_fr, image, author, category, tags, lang, source, source_url, slug, slug_fr, published, impacts, remediation, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        item.title || '', synthesized.titleFr,
        item.contentSnippet?.slice(0, 200) || '', synthesized.excerptFr,
        sanitizeHtml(item.content || item.description || '', SANITIZE_OPTIONS), sanitizeHtml(synthesized.contentFr, SANITIZE_OPTIONS),
        imageUrl, 'SecuriTrust', synthesized.category,
        JSON.stringify(synthesized.tags), 'fr', 'rss', sourceUrl,
        s, s, 1,
        impactsJson,
        synthesized.action || null,
        publishedDate, updatedAt,
      ],
    });

    // Return the newly created article
    const result = await db.select().from(articles).where(eq(articles.slug, s)).limit(1);
    if (result.length) return result[0];
    return null;
  } catch {
    return null;
  }
}

/** On-demand Claude synthesis for RSS articles not yet in DB */
async function synthesizeAndStoreRssArticle(slug: string): Promise<ArticleRow | null> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');

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
    const stopWords = new Set([
      'une', 'de', 'des', 'du', 'la', 'le', 'les', 'pour', 'que', 'est',
      'pas', 'par', 'sur', 'dans', 'avec', 'au', 'aux', 'en', 'se', 'ce',
      'et', 'ou', 'qui', 'dont', 'sont', 'fait', 'plus', 'apres', 'vers',
      'faille', 'dans', 'tous', 'tout', 'entre', 'sans', 'chez', 'avant',
      'pendant', 'depuis', 'jusque', 'mais', 'donc', 'ni', 'car', 'or',
    ]);
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
    const feed = await parser.parseURL('https://feeds.feedburner.com/TheHackersNews');
    const item = feed.items.find((i) => (i.link || i.guid) === article.sourceUrl);
    if (!item) return null;

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

    // Return the updated article
    const result = await db.select().from(articles).where(eq(articles.id, article.id)).limit(1);
    if (result.length) return result[0];
    return null;
  } catch {
    return null;
  }
}

async function getArticle(slug: string): Promise<ArticleRow | null> {
  // 1. Try DB (Claude-synthesized or internal articles)
  try {
    let result = await db.select().from(articles).where(eq(articles.slugFr, slug)).limit(1);
    if (!result.length) {
      result = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    }
    if (result.length) {
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

  // 2. If not in DB, try on-demand Claude synthesis from RSS
  return synthesizeAndStoreRssArticle(slug);
}

export async function generateStaticParams() {
  try {
    const dbArticles = await db
      .select({ slug: articles.slug, slugFr: articles.slugFr })
      .from(articles)
      .where(eq(articles.published, true));

    return dbArticles.map(a => ({
      slug: a.slugFr || a.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Article non trouvé',
    };
  }

  const baseUrl = 'https://www.securitrust.fr';
  const isRss = article.sourceType === 'rss';
  const metaTitle = article.titleFr || article.title;
  const metaDescription = article.excerptFr || article.excerpt;

  return {
    title: `${metaTitle} | SecuriTrust`,
    description: metaDescription,
    robots: {
      index: !isRss,
      follow: true,
    },
    alternates: {
      canonical: isRss ? article.sourceUrl : `${baseUrl}/articles/${article.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${baseUrl}/articles/${article.slug}`,
      type: 'article',
      publishedTime: article.createdAt,
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
  const article = await getArticle(slug);
  
  if (!article || !article.published) {
    notFound();
  }

  const displayTitle = article.titleFr || article.title;
  const displayExcerpt = article.excerptFr || article.excerpt;
  const displayContent = article.contentFr || article.content;

  const safeContent = sanitizeHtml(displayContent, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'img', 'figure', 'figcaption', 'picture', 'source',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'pre', 'code', 'blockquote', 'details', 'summary',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      '*': ['class', 'id'],
      'a': ['href', 'target', 'rel', 'title'],
      'img': ['src', 'alt', 'width', 'height', 'loading'],
      'source': ['src', 'srcset', 'type', 'media'],
      'td': ['colspan', 'rowspan'],
      'th': ['colspan', 'rowspan', 'scope'],
      'code': ['class'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowedSchemesByTag: {
      img: ['https', 'data'],
    },
    // Block dangerous patterns
    transformTags: {
      'a': (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: attribs.href?.startsWith('http') ? '_blank' : attribs.target,
        },
      }),
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

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

  const finalImpacts = dbImpacts.length > 0 ? dbImpacts : fallback.impacts;
  const finalAction = article.remediation || fallback.action;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': article.sourceType === 'rss' ? 'NewsArticle' : 'Article',
    headline: displayTitle,
    description: displayExcerpt,
    image: article.image,
    datePublished: article.createdAt,
    dateModified: article.updatedAt || article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SecuriTrust',
      logo: {
        '@type': 'ImageObject',
        url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Logo-SecuriTrust-bleu-blanc-768x158-1764257964299.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.securitrust.fr/articles/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://www.securitrust.fr' },
        { name: 'Articles', url: 'https://www.securitrust.fr/articles' },
        { name: displayTitle, url: `https://www.securitrust.fr/articles/${article.slug}` },
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
            {/* Back Button */}
            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-wider font-medium">Retour aux articles</span>
            </Link>

            {/* Category Badge */}
            <div className="inline-block px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded mb-6">
              <span className="text-xs font-semibold text-black uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-light text-white tracking-tight leading-snug mb-8 max-w-4xl">
              {displayTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-slate-400 mb-10 pb-10 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Image */}
        <div className="relative z-10 mb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-panel">
              <Image
                src={article.image}
                alt={displayTitle}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="relative z-10 pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-panel rounded-2xl p-8 md:p-12 lg:p-16">
              {/* CVE Tag (if applicable) */}
              {cveNumber && (
                <div className="mb-8">
                  <span className="inline-block rounded border border-orange-500/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-400">
                    [ {cveNumber} ]
                  </span>
                </div>
              )}

              {/* Excerpt */}
              <p className="text-xl text-slate-300 font-light leading-relaxed mb-12 pb-12 border-b border-white/10 italic">
                {displayExcerpt}
              </p>

              {/* Content */}
              <div
                className="prose prose-invert prose-lg max-w-none mb-16
                  prose-headings:text-white prose-headings:font-light prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-white prose-strong:font-medium
                  prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                  prose-code:text-cyan-400 prose-code:bg-black/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10
                  prose-ul:text-slate-300 prose-ol:text-slate-300
                  prose-li:my-2
                  prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:text-slate-300 prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />

              {/* ===== IMPACTS + ACTION SECTION (for ALL articles) ===== */}
              <div className="border-t border-cyan-500/20 pt-12">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white mb-6 text-center">
                  IMPACTS POUR LES ORGANISATIONS
                </h2>
                <ul className="space-y-4 mb-8 max-w-2xl mx-auto">
                  {finalImpacts.map((impact, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-slate-200">
                      <span className="mt-0.5 shrink-0 text-cyan-400">&#9656;</span>
                      <span>{impact}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <span className="inline-block text-base font-bold uppercase tracking-wider text-cyan-400 sm:text-lg">
                    &#9654; {finalAction}
                  </span>
                </div>
                <div className="mt-8 text-center">
                  <span className="text-xs text-slate-500">
                    Source : {article.source === 'rss' ? 'The Hacker News' : 'SecuriTrust'}
                  </span>
                </div>
              </div>
            </div>

            {/* Back to Articles CTA */}
            <div className="text-center mt-16">
              <Link 
                href="/articles"
                className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)] hover:shadow-[0_0_30px_rgba(118,166,209,0.5)] rounded group"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span>Tous les articles</span>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}