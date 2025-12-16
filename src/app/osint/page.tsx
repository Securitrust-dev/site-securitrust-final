'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { OSINTSearchSection } from '@/components/sections/osint-search-section';
import ThreeBackground from '@/components/three-background';
import MatrixRain from '@/components/matrix-rain';
import { Shield, Search, Database, Eye, AlertTriangle, Target, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function OSINTPage() {
  return (
    <>
      <PromoBanner />
      <div className="relative min-h-screen" style={{ background: '#02040a' }}>
        <ThreeBackground />
        <MatrixRain />
        <Navbar />
        
        {/* Hero Section with Hacker Style */}
        <div className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-[#0b1221]/80 backdrop-blur-sm border border-[#00ff41]/30 rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.3)]">
              <span className="text-[#00ff41] font-mono text-xs sm:text-sm md:text-base">
                {'>'} OSINT_TERMINAL_v2.1.3
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white">
              <span className="text-[#00ff41] font-mono">Vous</span> sur le web
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-6 sm:mb-8 font-mono leading-relaxed px-4">
              <span className="text-[#00ff41]">$</span> Recherche OSINT avancée pour découvrir l'empreinte numérique des entreprises
              <span className="animate-pulse text-[#00ff41]">_</span>
            </p>

            {/* Terminal-style decorative elements */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-4">
              <div className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#0b1221]/60 backdrop-blur-sm border border-[#00ff41]/20 rounded text-[#00ff41] text-xs sm:text-sm font-mono shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                <span className="opacity-60">[</span>ACTIVE<span className="opacity-60">]</span>
              </div>
              <div className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#0b1221]/60 backdrop-blur-sm border border-[#38bdf8]/20 rounded text-[#38bdf8] text-xs sm:text-sm font-mono shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <span className="opacity-60">[</span>13 SOURCES<span className="opacity-60">]</span>
              </div>
              <div className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#0b1221]/60 backdrop-blur-sm border border-yellow-400/20 rounded text-yellow-400 text-xs sm:text-sm font-mono shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                <span className="opacity-60">[</span>SECURE<span className="opacity-60">]</span>
              </div>
            </div>
          </div>
        </div>

        {/* OSINT Search Component */}
        <OSINTSearchSection />

        {/* Info Section */}
        <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-[#0b1221]/90 to-[#1a2332]/90 backdrop-blur-sm border border-[#00ff41]/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 shadow-[0_0_40px_rgba(0,255,65,0.15)]">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 font-mono">
                <span className="text-[#00ff41]">{'>'}</span> Qu'est-ce que l'OSINT ?
              </h2>
              <div className="space-y-3 sm:space-y-4 text-white/80 leading-relaxed">
                <p className="text-xs sm:text-sm lg:text-base">
                  L'<span className="text-[#00ff41] font-mono">Open Source Intelligence (OSINT)</span> est une méthode de collecte et d'analyse d'informations provenant de sources publiques et légales sur Internet.
                </p>
                <p className="text-xs sm:text-sm lg:text-base">
                  Notre outil permet d'analyser l'empreinte numérique d'une entreprise à partir de son numéro SIRET en consultant automatiquement plus de <span className="text-[#38bdf8] font-bold">13 sources différentes</span> : registres officiels, réseaux sociaux, bases de données financières, et bien plus.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mt-4 sm:mt-6 lg:mt-8">
                  <div className="p-3 sm:p-4 bg-[#0b1221]/60 rounded-lg border border-[#00ff41]/10">
                    <div className="text-[#00ff41] font-mono text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">✓ Légal</div>
                    <div className="text-xs sm:text-sm text-white/70">Sources publiques uniquement</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#0b1221]/60 rounded-lg border border-[#38bdf8]/10">
                    <div className="text-[#38bdf8] font-mono text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">✓ Rapide</div>
                    <div className="text-xs sm:text-sm text-white/70">Résultats en temps réel</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#0b1221]/60 rounded-lg border border-yellow-400/10">
                    <div className="text-yellow-400 font-mono text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">✓ Complet</div>
                    <div className="text-xs sm:text-sm text-white/70">Données financières et légales</div>
                  </div>
                  <div className="p-3 sm:p-4 bg-[#0b1221]/60 rounded-lg border border-purple-400/10">
                    <div className="text-purple-400 font-mono text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">✓ Sécurisé</div>
                    <div className="text-xs sm:text-sm text-white/70">Connexion cryptée</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}