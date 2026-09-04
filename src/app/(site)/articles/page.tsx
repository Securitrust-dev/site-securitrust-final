import Link from 'next/link';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { ArticlesClient, type ArticleItem } from './ArticlesClient';
import { db } from '@/db';
import { articles } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

async function getInitialArticles(): Promise<ArticleItem[]> {
  try {
    const dbArticles = await db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.createdAt))
      .limit(20);

    // Deduplicate by sourceUrl: keep only the first entry for each sourceUrl
    const seenUrls = new Set<string>();
    const deduped = dbArticles.filter(a => {
      if (!a.sourceUrl) return true;
      if (seenUrls.has(a.sourceUrl)) return false;
      seenUrls.add(a.sourceUrl);
      return true;
    });

    return deduped.map(a => ({
      id: `db-${a.id}`,
      title: a.titleFr || a.title,
      excerpt: a.excerptFr || a.excerpt || '',
      content: '',
      image: a.image,
      createdAt: a.createdAt,
      author: a.author,
      category: a.category,
      slug: a.slugFr || a.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const initialArticles = await getInitialArticles();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Cybersécurité SecuriTrust',
    description: 'Analyses et actualités en cybersécurité par les experts SecuriTrust',
    url: 'https://www.securitrust.fr/articles',
    publisher: {
      '@type': 'Organization',
      name: 'SecuriTrust',
      url: 'https://www.securitrust.fr',
    },
    blogPost: initialArticles.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.excerpt,
      url: `https://www.securitrust.fr/articles/${a.slug}`,
      datePublished: a.createdAt,
      author: { '@type': 'Organization', name: a.author },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StaticThemeShell active="articles">
        <section className="hero-simple">
          <div className="wrap">
            <p className="crumb">
              <Link href="/">Accueil</Link>
              <span className="sep">›</span>
              <span className="now">Articles</span>
            </p>
            <h1>Articles</h1>
            <p className="hero-sub">Découvrez nos dernières analyses et actualités en cybersécurité</p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <ArticlesClient initialArticles={initialArticles} />
          </div>
        </section>

        <section className="sec sec--dark" style={{ textAlign: 'center' }}>
          <ExpertCTAButton />
        </section>

        <InternalLinks pageKey="articles" />
      </StaticThemeShell>
    </>
  );
}
