import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { FormationsHero } from '@/components/sections/formations/FormationsHero';
import { FormationsCatalog } from '@/components/sections/formations/FormationsCatalog';

export const metadata: Metadata = {
  title: 'Formations Cybersecurite E-Learning',
  description: 'Formations en ligne en cybersecurite : Pentest, OWASP, Hacking Ethique, Forensics, RGPD. Apprenez a votre rythme avec nos experts.',
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

        <Footer />
      </div>
    </div>
  );
}
