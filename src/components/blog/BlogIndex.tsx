// Liste du blog rendue côté serveur : cartes, catégories et recherche sont du HTML
// (liens et formulaire GET), lisibles sans JavaScript par les moteurs de recherche.
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { CYBER_CATEGORIES } from '@/lib/articles';
import { ORG_ID } from '@/site-chrome/schema.mjs';
import { type BlogListItem, BLOG_URL, categoryUrl, formatFrDate } from '@/lib/blog';

// Domaines autorisés par images.remotePatterns (next.config.js) : les autres images
// du flux sont affichées telles quelles plutôt que de faire échouer le rendu.
const OPTIMIZABLE = /^(\/|https:\/\/([a-z0-9-]+\.)*(supabase\.co|images\.unsplash\.com|blogger\.googleusercontent\.com)\/)/;

function Thumb({ src, priority }: { src: string; priority?: boolean }) {
  if (OPTIMIZABLE.test(src)) {
    return <Image src={src} alt="" fill sizes="(max-width: 620px) 100vw, (max-width: 920px) 50vw, 380px" style={{ objectFit: 'cover' }} priority={priority} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading={priority ? 'eager' : 'lazy'} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />;
}

export function ArticleCard({ article, priority }: { article: BlogListItem; priority?: boolean }) {
  const href = `/articles/${article.slug}`;
  return (
    <article className="article-card">
      <div className="thumb">
        <Link href={href} tabIndex={-1} aria-hidden="true">
          <Thumb src={article.image} priority={priority} />
        </Link>
        <Link href={categoryUrl(article.category)} className="cat">{article.category}</Link>
      </div>
      <div className="body">
        <div className="meta">
          <span><Calendar size={13} /><time dateTime={article.publishedAt}>{formatFrDate(article.publishedAt)}</time></span>
          <span><User size={13} />{article.author}</span>
        </div>
        <h3><Link href={href}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <Link href={href} className="more">Lire l&apos;article<ArrowRight /></Link>
      </div>
    </article>
  );
}

export function BlogNav({ current, query }: { current?: string; query?: string }) {
  const pill = (active: boolean): React.CSSProperties => ({
    padding: '8px 18px', borderRadius: 999, fontSize: 12, fontWeight: 500, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    border: `1px solid ${active ? 'var(--cyan)' : 'rgba(255,255,255,.12)'}`,
    background: active ? 'var(--cyan)' : 'rgba(255,255,255,.04)', color: active ? '#02040a' : 'var(--muted)',
  });
  return (
    <>
      <form action="/articles/recherche" method="get" role="search" style={{ display: 'flex', gap: 10, maxWidth: 640, margin: '0 auto' }}>
        <label htmlFor="blog-q" className="sr-only">Rechercher un article</label>
        <input
          id="blog-q" name="q" type="search" defaultValue={query} placeholder="Rechercher un article (CVE, ransomware, NIS2…)"
          style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.04)', color: 'inherit', font: 'inherit' }}
        />
        <button type="submit" className="btn-primary" aria-label="Rechercher"><Search size={16} /></button>
      </form>
      <nav aria-label="Catégories du blog" style={{ marginTop: 28, overflowX: 'auto', paddingBottom: 6 }}>
        <ul style={{ display: 'flex', gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
          <li><Link href="/articles" style={pill(!current)} aria-current={!current ? 'page' : undefined}>Tous</Link></li>
          {CYBER_CATEGORIES.map((c) => (
            <li key={c}><Link href={categoryUrl(c)} style={pill(current === c)} aria-current={current === c ? 'page' : undefined}>{c}</Link></li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export function ArticleGrid({ items, empty }: { items: BlogListItem[]; empty: string }) {
  if (!items.length) {
    return <p style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>{empty}</p>;
  }
  return (
    <div className="grid-3" style={{ marginTop: 40 }}>
      {items.map((a, i) => <ArticleCard key={a.key} article={a} priority={i < 3} />)}
    </div>
  );
}

/** JSON-LD d'une liste d'articles (page blog ou catégorie). */
export function blogListJsonLd(items: BlogListItem[], page: { name: string; url: string; description: string }) {
  return {
    '@type': 'CollectionPage',
    name: page.name,
    description: page.description,
    url: page.url,
    inLanguage: 'fr-FR',
    isPartOf: { '@type': 'Blog', name: 'Blog Cybersécurité SecuriTrust', url: BLOG_URL, publisher: { '@id': ORG_ID } },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${BLOG_URL}/${a.slug}`,
        name: a.title,
      })),
    },
  };
}
