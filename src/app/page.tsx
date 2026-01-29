import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { MetricsSection } from '@/components/sections/metrics-section';
import { ServicesSection } from '@/components/sections/services-section';
import { PartnersScrollingBanner } from '@/components/sections/partners-scrolling-banner';
import { OfficialAuditorSection } from '@/components/sections/official-auditor-section';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SecuriTrust | Expert en Pentest & Audit Cybersécurité',
  description: 'Cabinet de conseil en cybersécurité spécialisé en pentest au résultat, audit de sécurité et conformité GRC. Sécurisez votre entreprise avec nos experts.',
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
      <PartnersScrollingBanner />
      <OfficialAuditorSection />
      
      <section className="relative py-16 px-6 text-center">
        <ExpertCTAButton />
      </section>
      
      <Footer />
    </div>
  );
}
