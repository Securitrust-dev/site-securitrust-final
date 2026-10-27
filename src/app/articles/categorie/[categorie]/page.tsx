import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { BreadcrumbSchema, JsonLd } from '@/components/StructuredData';
import { ArticleGrid, BlogNav, blogListJsonLd } from '@/components/blog/BlogIndex';
import { CYBER_CATEGORIES } from '@/lib/articles';
import { BLOG_URL, categoryFromSlug, categorySlug, listBlogArticles } from '@/lib/blog';

type Props = { params: Promise<{ categorie: string }> };

export function generateStaticParams() {
  return CYBER_CATEGORIES.map((c) => ({ categorie: categorySlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoryFromSlug((await params).categorie);
  if (!category) return {};
  const items = await listBlogArticles({ category, limit: 24 });
  const url = `${BLOG_URL}/categorie/${categorySlug(category)}`;
  const description = `Articles et veille cybersécurité « ${category} » : analyses, alertes et recommandations des experts SecuriTrust.`;
  return {
    title: { absolute: `${category} — Blog cybersécurité | SecuriTrust` },
    description,
    alternates: { canonical: url },
    // Catégorie vide = page pauvre : on ne la propose pas à l'indexation.
    robots: { index: items.length > 0, follow: true },
    openGraph: { title: `${category} — Blog cybersécurité SecuriTrust`, description, url, type: 'website' },
  };
}

export default async function CategoryPage({ params }: Props) {
  const category = categoryFromSlug((await params).categorie);
  if (!category) notFound();
  const items = await listBlogArticles({ category, limit: 24 });
  const url = `${BLOG_URL}/categorie/${categorySlug(category)}`;

  return (
    <>
      <JsonLd data={blogListJsonLd(items, { name: `${category} — Blog SecuriTrust`, url, description: `Articles de la catégorie ${category}` })} />
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://www.securitrust.fr' },
        { name: 'Articles', url: BLOG_URL },
        { name: category, url },
      ]} />
      <StaticThemeShell active="articles">
        <section className="hero-simple">
          <div className="wrap">
            <p className="crumb">
              <Link href="/">Accueil</Link>
              <span className="sep">›</span>
              <Link href="/articles">Articles</Link>
              <span className="sep">›</span>
              <span className="now" aria-current="page">{category}</span>
            </p>
            <h1>{category}</h1>
            <p className="hero-sub">Analyses et veille cybersécurité de la catégorie « {category} »</p>
          </div>
        </section>
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <BlogNav current={category} />
            <ArticleGrid items={items} empty="Aucun article dans cette catégorie pour le moment." />
          </div>
        </section>
      </StaticThemeShell>
    </>
  );
}
