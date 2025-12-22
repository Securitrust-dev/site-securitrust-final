'use client';

import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const FloatingCTA = () => {
  const pathname = usePathname();
  
  const isDisabled = pathname === '/signer-proposition';

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-[9999] ${isDisabled ? 'pointer-events-none' : ''}`}>
      <a 
        href={isDisabled ? '#' : "/eligibilite"} 
        className={`block ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={(e) => isDisabled && e.preventDefault()}
      >
        <div className="shiny-cta text-xs sm:text-sm md:text-base py-3 px-5 sm:py-3.5 sm:px-6 md:py-4 md:px-8 inline-flex items-center gap-2 whitespace-nowrap shadow-[0_0_50px_rgba(6,182,212,0.5)] hover:shadow-[0_0_70px_rgba(6,182,212,0.7)] transition-shadow">
          <span className="font-semibold">Je réserve mon pentest au résultat</span>
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
        </div>
      </a>
    </div>
  );
};
