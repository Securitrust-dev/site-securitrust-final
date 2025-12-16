'use client';

import { ArrowRight, Shield } from 'lucide-react';
import Image from 'next/image';
import { GradientBeamCTA } from '@/components/ui/gradient-beam-cta';
import { useEffect, useRef } from 'react';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasPlayedVideo = localStorage.getItem('hasPlayedHeroVideo');
    
    if (!hasPlayedVideo && videoRef.current) {
      videoRef.current.play();
      localStorage.setItem('hasPlayedHeroVideo', 'true');
    }
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16">
      {/* Background Image - Digital Dotted Globe */}
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat" style={{
        backgroundImage: `url(https://qfihegeffntsxrwhvnlm.supabase.co/storage/v1/object/sign/Video_securitrust/digital-dotted-globe-showing-africa-and-europe-4k.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYzAxOTEwZS02NzNlLTQ3ZmUtYTFjMC01MzlmYmQxOTczNTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb19zZWN1cml0cnVzdC9kaWdpdGFsLWRvdHRlZC1nbG9iZS1zaG93aW5nLWFmcmljYS1hbmQtZXVyb3BlLTRrLndlYnAiLCJpYXQiOjE3NjQ5NDcwODEsImV4cCI6MjA4MDMwNzA4MX0.BIklRQ4djoWC3t1UKmMp-5pDz26Pw9HkczacVcEbHeU)`
      }}></div>

      {/* Dark Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>

      {/* Decorative Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute -left-40 top-10 h-[40vh] sm:h-[50vh] lg:h-[50vh] w-[40vh] sm:w-[50vh] rounded-full blur-3xl opacity-20 sm:opacity-30" style={{ background: 'radial-gradient(closest-side, rgba(6,182,212,0.3), rgba(0,0,0,0))' }}></div>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-xs sm:text-sm font-medium tracking-wide">
                Cybersécurité & Conformité
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                <span className="text-white font-normal uppercase drop-shadow-[0_2px_20px_rgba(6,182,212,0.8)]">
                  Demandez votre pentest au résultat
                </span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-2xl font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Aucune vulnérabilité détectée, votre pentest est entièrement remboursé
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href="/eligibilite"
                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all group"
              >
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse flex-shrink-0"></span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wide">
                  JE RÉSERVE MON PENTEST AU RÉSULTAT
                </span>
              </a>
              <a
                href="https://devis-expert-securitrust-simulation.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 text-background font-semibold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-100"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button content */}
                <span className="relative z-10 tracking-wide uppercase text-sm text-black">
                  Mon devis sur mesure
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </a>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
              <video
                ref={videoRef}
                src="https://qfihegeffntsxrwhvnlm.supabase.co/storage/v1/object/sign/Video_securitrust/pentest_au_resultat.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYzAxOTEwZS02NzNlLTQ3ZmUtYTFjMC01MzlmYmQxOTczNTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb19zZWN1cml0cnVzdC9wZW50ZXN0X2F1X3Jlc3VsdGF0Lm1wNCIsImlhdCI6MTc2NDg0NzUwNiwiZXhwIjoyMDgwMjA3NTA2fQ.6uuGphXfWdHHAjNw-YTtkkLC3EZB-l7fYibEdGjrEmM"
                muted
                playsInline
                controls
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};