'use client';

import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { MetricsSection } from '@/components/sections/metrics-section';
import { ServicesSection } from '@/components/sections/services-section';
import { TrustedClientsCarousel } from '@/components/sections/trusted-clients-carousel';
import { OfficialAuditorSection } from '@/components/sections/official-auditor-section';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
      <TrustedClientsCarousel />
      <OfficialAuditorSection />
      
      <section className="relative py-16 px-6 text-center">
        <ExpertCTAButton />
      </section>
      
      <Footer />
    </div>
  );
}