'use client';

import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import Link from 'next/link';

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 w-full z-[100] bg-black/95 backdrop-blur-sm border-b border-white/5"
    >
      <div className="relative h-[40px] sm:h-[45px] lg:h-[50px] xl:h-[55px] flex items-center justify-between gap-4 px-4 sm:px-6">
        {/* Scrolling Text Container */}
        <div className="flex overflow-hidden flex-1">
          <div className="flex animate-scroll-left whitespace-nowrap">
            {/* First set of items */}
            <div className="flex items-center gap-3 px-12">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-cyan-400 flex-shrink-0" />
              <span className="font-mono font-semibold tracking-wider text-[10px] sm:text-xs lg:text-sm xl:text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.8), 0 0 16px rgba(6, 182, 212, 0.4)' }}>
                Pentest gratuit si aucune vulnérabilité détectée
              </span>
              <span className="text-cyan-400/60 text-xs sm:text-sm lg:text-base xl:text-lg font-light">◆</span>
              <span className="font-mono font-semibold tracking-wider text-[10px] sm:text-xs lg:text-sm xl:text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.8), 0 0 16px rgba(6, 182, 212, 0.4)' }}>
                Testez votre éligibilité pour cette offre
              </span>
            </div>
            
            {/* Duplicate for seamless loop */}
            <div className="flex items-center gap-3 px-12">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-cyan-400 flex-shrink-0" />
              <span className="font-mono font-semibold tracking-wider text-[10px] sm:text-xs lg:text-sm xl:text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.8), 0 0 16px rgba(6, 182, 212, 0.4)' }}>
                Pentest gratuit si aucune vulnérabilité détectée
              </span>
              <span className="text-cyan-400/60 text-xs sm:text-sm lg:text-base xl:text-lg font-light">◆</span>
              <span className="font-mono font-semibold tracking-wider text-[10px] sm:text-xs lg:text-sm xl:text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.8), 0 0 16px rgba(6, 182, 212, 0.4)' }}>
                Testez votre éligibilité pour cette offre
              </span>
            </div>

            {/* Third set for extra smoothness */}
            <div className="flex items-center gap-3 px-12">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-cyan-400 flex-shrink-0" />
              <span className="font-mono font-semibold tracking-wider text-[10px] sm:text-xs lg:text-sm xl:text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.8), 0 0 16px rgba(6, 182, 212, 0.4)' }}>
                Pentest gratuit si aucune vulnérabilité détectée
              </span>
              <span className="text-cyan-400/60 text-xs sm:text-sm lg:text-base xl:text-lg font-light">◆</span>
              <span className="font-mono font-semibold tracking-wider text-[10px] sm:text-xs lg:text-sm xl:text-base bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-shift" style={{ textShadow: '0 0 8px rgba(6, 182, 212, 0.8), 0 0 16px rgba(6, 182, 212, 0.4)' }}>
                Testez votre éligibilité pour cette offre
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button - Reduced size */}
        <Link
          href="/eligibilite"
          className="relative flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden flex-shrink-0"
        >
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-wider whitespace-nowrap pr-2">
                Commandez votre pentest au résultat
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-cyan-400 uppercase tracking-wider whitespace-nowrap pr-2">
                Commandez votre pentest au résultat
              </span>
            </div>
          </div>
        </Link>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
          aria-label="Fermer la bannière"
        >
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white/60 hover:text-white/90 transition-colors" />
        </button>
      </div>
    </div>
  );
};