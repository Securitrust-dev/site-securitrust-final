'use client';

import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { PromoBanner } from '@/components/sections/promo-banner';
import { MetricsSection } from '@/components/sections/metrics-section';
import { ServicesSection } from '@/components/sections/services-section';
import { OfficialAuditorSection } from '@/components/sections/official-auditor-section';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
      <OfficialAuditorSection />
      
      <section className="relative py-16 px-6 text-center">
        <ExpertCTAButton />
      </section>
      
      <Footer />
    </div>
  );
}