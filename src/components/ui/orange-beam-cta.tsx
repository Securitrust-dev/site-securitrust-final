'use client';

import { Send } from 'lucide-react';
import Link from 'next/link';

interface OrangeBeamCTAProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

export const OrangeBeamCTA = ({ href, text, icon }: OrangeBeamCTAProps) => {
  return (
    <Link href={href} className="w-full sm:w-auto">
      <button className="w-full sm:w-auto group relative overflow-hidden transition-all duration-300 hover:scale-[1.03] focus:outline-none text-xs sm:text-sm lg:text-sm xl:text-base font-medium text-white tracking-wide rounded-full py-3 sm:py-3.5 lg:py-3 xl:py-3.5 px-5 sm:px-6 lg:px-7 xl:px-8 flex items-center justify-center whitespace-nowrap gap-2">
        {/* Gradient Background with Radial Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 via-purple-600/90 to-fuchsia-600/100 rounded-full"></div>
        
        {/* Top Radial Overlay */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-white/20 via-white/5 to-transparent rounded-full"></div>
        
        {/* Bottom Radial Overlay */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-radial from-white/10 via-transparent to-transparent rounded-full"></div>
        
        {/* Border with Glow */}
        <div className="absolute inset-0 rounded-full border-2 border-white/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_0_20px_rgba(168,85,247,0.6)] group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_0_30px_rgba(168,85,247,0.8)]"></div>
        
        {/* Content */}
        <span className="relative z-10 text-white font-semibold">{text}</span>
        {icon || <Send className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 flex-shrink-0" />}
      </button>
    </Link>
  );
};