import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Building2, Layers, FileCheck2 } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { CasCard } from '@/components/cas-clients/CasCard';
import { JsonLd } from '@/components/StructuredData';
import { CAS_CLIENTS, OFFRES, SECTEURS, autresCas, casBySlug } from '@/content/cas-clients';
import { SITE_URL, breadcrumbNode } from '@/site-chrome/schema.mjs';
import { clampDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const dynamicParams = false;

export function generateStaticParams() {
  return CAS_CLIENTS.map((c) => ({ slug: c.slug }));
}

const titleOf = (client: string, mission: string) => `${client} : ${mission}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const cas = casBySlug((await params).slug);
  if (!cas) return {};
  const url = `${SITE_URL}/cas-clients/${cas.slug}`;
  const title = `${titleOf(cas.client, cas.mission)} — Cas client`;
  const description = clampDescription(cas.chapeau);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { images: [DEFAULT_OG_IMAGE], title: `${title} | SecuriTrust`, description, url, type: 'article', siteName: 'SecuriTrust', locale: 'fr_FR' },
  };
}

export default async function CasClientPage({ params }: { params: Promise<{ slug: string }> }) {
  const cas = casBySlug((await params).slug);
  if (!cas) notFound();

  const idx = CAS_CLIENTS.indexOf(cas);
  const prev = CAS_CLIENTS[(idx - 1 + CAS_CLIENTS.length) % CAS_CLIENTS.length];
  const next = CAS_CLIENTS[(idx + 1) % CAS_CLIENTS.length];
  const h1 = titleOf(cas.client, cas.mission);
  const path = `/cas-clients/${cas.slug}`;

  return (
    <StaticThemeShell>
      <JsonLd
        data={breadcrumbNode([
          { name: 'Accueil', url: '/' },
          { name: 'Cas clients', url: '/cas-clients' },
          { name: h1, url: path },
        ])}
      />

      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <Link href="/cas-clients">Cas clients</Link>
            <span className="sep">›</span>
            <span className="now">{cas.client}</span>
          </p>
          <span className="eyebrow">Cas client · {cas.activite}</span>
          <h1 className="case-h1">{h1}</h1>
          <p className="hero-sub">{cas.chapeau}</p>
          <ul className="fact-row">
            <li><Building2 size={16} /> {SECTEURS[cas.secteur].label}</li>
            <li><Layers size={16} /> {cas.offres.map((o) => OFFRES[o].label).join(' · ')}</li>
            {cas.referentiels.length > 0 && (
              <li><FileCheck2 size={16} /> {cas.referentiels.join(', ')}</li>
            )}
          </ul>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 20 }}>
        <div className="wrap wrap--narrow">
          <div className="case-body">
            <h2>Contexte et objectifs</h2>
            {cas.contexte.map((p) => (
              <p key={p}>{p}</p>
            ))}

            <h2>Les enjeux</h2>
            <ul className="check-list">
              {cas.enjeux.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>

            <h2>Réponse et méthode</h2>
            <ul className="check-list">
              {cas.methode.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>

            <h2>Facteurs clés de succès</h2>
            <ul className="check-list">
              {cas.facteurs.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <p className="case-links">
              Pour aller plus loin :{' '}
              {cas.liens.map(([label, href], i) => (
                <span key={href}>
                  {i > 0 && ' · '}
                  <Link href={href} className="link">{label}</Link>
                </span>
              ))}
            </p>
          </div>

          <nav className="case-pager" aria-label="Cas clients précédent et suivant">
            <Link href={`/cas-clients/${prev.slug}`}>
              <ArrowLeft size={14} /> <span>Précédent<br /><b>{prev.client}</b></span>
            </Link>
            <Link href={`/cas-clients/${next.slug}`} className="next">
              <span>Suivant<br /><b>{next.client}</b></span> <ArrowRight size={14} />
            </Link>
          </nav>
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Autres cas clients</span>
            <h2>Des missions comparables</h2>
          </div>
          <div className="case-grid">
            {autresCas(cas).map((c) => (
              <CasCard key={c.slug} cas={c} />
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href="/cas-clients" className="btn-ghost">
              Tous les cas clients <ArrowRight size={16} />
            </Link>
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cta-box">
            <h2>Besoin d’échanger avec un expert ?</h2>
            <p>Présentez-nous votre contexte : un consultant vous rappelle pour cadrer votre projet, sans engagement.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn-primary">
                Nous contacter <ArrowRight size={16} />
              </Link>
              <Link href={OFFRES[cas.offres[0]].href} className="btn-ghost">
                Notre offre {OFFRES[cas.offres[0]].label} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </StaticThemeShell>
  );
}
