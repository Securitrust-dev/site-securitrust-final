'use client';

import { OrangeBeamCTA } from '@/components/ui/orange-beam-cta';

export const CTASection = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-white/5 bg-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl lg:rounded-2xl p-6 sm:p-10 lg:p-12 xl:p-16 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] xl:text-[48px] font-light text-white mb-4 sm:mb-5 lg:mb-6 tracking-tight leading-tight">
              Optimisez votre posture de cybersécurité
            </h2>
            <p className="text-white/70 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-light px-4">
              Bénéficiez d&apos;une évaluation complète de votre sécurité et
              identifiez les leviers prioritaires d&apos;amélioration. Notre équipe
              met à votre disposition plus de 15 années d&apos;expertise.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4">
              <OrangeBeamCTA href="/eligibilite" text="Je réserve mon pentest au résultat" />
              <OrangeBeamCTA href="/contact" text="Nous contacter" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};