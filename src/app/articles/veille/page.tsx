import type { Metadata } from 'next';
import Link from 'next/link';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { JsonLd } from '@/components/StructuredData';
import { ArticleGrid, BlogNav, blogListJsonLd } from '@/components/blog/BlogIndex';
import { BLOG_URL, listBlogArticles } from '@/lib/blog';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';

// Rubrique « Veille » : synthèses d'actualités (vulnérabilités, campagnes, réglementation),
// séparées des articles d'expertise. Rendu serveur, données en cache 30 min (lib/blog).

const URL = `${BLOG_URL}/veille`;
const DESCRIPTION = metaDescription('/articles/veille');

export const metadata: Metadata = {
  title: { absolute: 'Veille cybersécurité — Vulnérabilités, menaces et actualités | SecuriTrust' },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: 'Veille cybersécurité — SecuriTrust', description: DESCRIPTION, url: URL, type: 'website' },
};

export default async function VeillePage() {
  const items = await listBlogArticles({ limit: 48, kind: 'veille' });

  return (
    <>
      <JsonLd data={blogListJsonLd(items, { name: 'Veille cybersécurité SecuriTrust', url: URL, description: DESCRIPTION })} />
      <StaticThemeShell active="articles">
        <section className="hero-simple">
          <div className="wrap">
            <p className="crumb">
              <Link href="/">Accueil</Link>
              <span className="sep">›</span>
              <Link href="/articles">Articles</Link>
              <span className="sep">›</span>
              <span className="now" aria-current="page">Veille</span>
            </p>
            <h1>Veille cybersécurité</h1>
            <p className="hero-sub">
              L&apos;actualité des vulnérabilités et des menaces, résumée en français avec ses impacts et les actions à mener.
              Pour nos analyses de fond, consultez <Link href="/articles">les articles de nos experts</Link>.
            </p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <BlogNav current="veille" />
            <ArticleGrid items={items} empty="Aucune veille pour le moment." />
          </div>
        </section>
      </StaticThemeShell>
    </>
  );
}
