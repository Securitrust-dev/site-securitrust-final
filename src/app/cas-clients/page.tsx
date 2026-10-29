import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { CasFilters } from '@/components/cas-clients/CasFilters';
import { CAS_CLIENTS } from '@/content/cas-clients';
import { SITE_URL } from '@/site-chrome/schema.mjs';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

const PATH = '/cas-clients';
const TITLE = 'Cas clients cybersécurité et conformité — Références';

export const metadata: Metadata = {
  title: TITLE,
  description: metaDescription(PATH),
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: `${TITLE} | SecuriTrust`,
    description: metaDescription(PATH),
    url: `${SITE_URL}${PATH}`,
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
};

// Logos affichés avec l'accord des clients (mêmes fichiers que le bandeau de l'accueil).
const LOGOS: [string, string, number][] = [
  ['Abeille Assurances', 'abeille-assurance', 32],
  ['AXA', 'axa', 40],
  ['Bolloré Logistics', 'bollore', 35],
  ['Cegedim', 'cegedim', 25],
  ['Malakoff Médéric', 'malakoff', 40],
  ['Lyvoc', 'lyvoc', 38],
  ['Thales', 'thales', 30],
  ['Natixis', 'natixis', 26],
  ['Munich Re', 'munich-re', 26],
  ['BackupTa', 'backupta', 24],
  ['Kallista Energy', 'kallista-energy', 44],
  ['Aramisauto', 'aramisauto', 50],
  ['Pizzorno Environnement', 'pizzorno', 36],
];

export default function CasClientsPage() {
  return (
    <StaticThemeShell>
      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <span className="now">Cas clients</span>
          </p>
          <span className="eyebrow">Références</span>
          <h1>Nos cas clients</h1>
          <p className="hero-sub">
            Assurance, industrie automobile, santé, secteur public, éditeurs SaaS : {CAS_CLIENTS.length} missions de{' '}
            <b>conformité</b>, d’<b>audit de sécurité</b> et d’<b>accompagnement</b> menées par nos consultants. Filtrez par
            expertise ou par secteur.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <CasFilters />
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <span className="eyebrow">Ils nous font confiance</span>
            <h2>Des organisations exigeantes</h2>
            <p>
              Nos consultants réalisent également, depuis plusieurs années, des audits de certification ISO 27001, HDS,
              ISO 27701 et ISO 22301 pour le compte d’organismes certificateurs.
            </p>
          </div>
          <div className="logo-wall">
            {LOGOS.map(([alt, file, h]) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={file} src={`/clients/white/${file}.png`} alt={alt} style={{ height: h }} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cta-box">
            <h2>Un projet comparable ?</h2>
            <p>
              Conformité DORA, TISAX, ISO 27001 ou RGPD, audit de sécurité, RSSI externalisé : parlons de votre contexte
              avec un consultant.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link href="/contact" className="btn-primary">
                Échanger avec un expert <ArrowRight size={16} />
              </Link>
              <a href="tel:+33186044431" className="btn-ghost">
                <Phone size={16} /> 01 86 04 44 31
              </a>
            </div>
          </div>
        </div>
      </section>
    </StaticThemeShell>
  );
}
