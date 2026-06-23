import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { FormationsHero } from '@/components/sections/formations/FormationsHero';
import { FormationsCatalog } from '@/components/sections/formations/FormationsCatalog';

export const metadata: Metadata = {
  title: 'Formations Cybersécurité E-Learning — Pentest, RGPD, ISO 27001 | SecuriTrust',
  description: 'Formations en ligne en cybersécurité : Pentest, OWASP, Hacking Éthique, Forensics, RGPD. Apprenez à votre rythme avec nos experts certifiés OSCP.',
  keywords: ['formation cybersécurité', 'e-learning pentest', 'formation OWASP', 'cours hacking éthique', 'formation RGPD', 'certification cybersécurité'],
  alternates: {
    canonical: 'https://www.securitrust.fr/formations',
  },
  openGraph: {
    title: 'Formations Cybersécurité E-Learning — Pentest, RGPD, ISO 27001',
    description: 'Formations en ligne en cybersécurité par des experts certifiés OSCP : Pentest, OWASP, Hacking Éthique, Forensics, RGPD.',
    url: 'https://www.securitrust.fr/formations',
    type: 'website',
    siteName: 'SecuriTrust',
    locale: 'fr_FR',
  },
  twitter: {
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
