import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { FormationsHero } from '@/components/sections/formations/FormationsHero';
import { FormationsCatalog } from '@/components/sections/formations/FormationsCatalog';
import { metaDescription } from '@/site-chrome/meta-descriptions.mjs';
import { DEFAULT_OG_IMAGE } from '@/site-chrome/og-image.mjs';

export const metadata: Metadata = {
  title: 'Formations Cybersécurité E-Learning — Pentest, RGPD, ISO 27001',
  description: metaDescription('/formations'),
  alternates: {
    canonical: 'https://www.securitrust.fr/formations',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: 'Formations Cybersécurité E-Learning — Pentest, RGPD, ISO 27001',
    description: 'Formations en ligne en cybersécurité par des experts certifiés OSCP : Pentest, OWASP, Hacking Éthique, Forensics, RGPD.',
    url: 'https://www.securitrust.fr/formations',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
    images: [DEFAULT_OG_IMAGE.url],
    card: 'summary_large_image',
    title: 'Formations Cybersécurité E-Learning',
    description: 'Pentest, OWASP, Hacking Éthique, Forensics, RGPD. Experts certifiés OSCP.',
  },
};

export default function FormationsPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />
        <FormationsHero />

        {/* Formation en présentiel (Cybermanager) */}
        <section className="pt-8 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/formations/construire-smsi-iso-27001"
              className="group block rounded-2xl border border-cyan-500/30 bg-white/[0.03] p-8 md:p-10 hover:border-cyan-400/60 transition-all"
            >
              <span className="text-[0.65rem] uppercase tracking-wider px-2.5 py-1 rounded border border-cyan-500/30 text-cyan-400">
                Nouveau · Présentiel à Paris
              </span>
              <h2 className="mt-5 text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Construire un SMSI ISO 27001
              </h2>
              <p className="mt-3 text-slate-400 max-w-3xl">
                Formation professionnelle de 3 jours (21 heures) pour concevoir, déployer et piloter un SMSI conforme à
                l’ISO/IEC 27001:2022 : périmètre, analyse de risques, déclaration d’applicabilité, audit interne.
                3 500 € HT par participant.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                Programme, dates et inscription
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </section>
        <FormationsCatalog />

        <section className="py-16 px-6 text-center relative z-10">
          <ExpertCTAButton />
        </section>

        <InternalLinks pageKey="formations" />
        <Footer />
      </div>
    </div>
  );
}
