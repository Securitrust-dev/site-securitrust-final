'use client';

import { ArrowRight, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCTAVisibility } from '@/hooks/use-cta-visibility';

/* Routes (LP autonomes) qui ont leur propre CTA et ne veulent pas du CTA flottant global. */
const HIDE_ON = ['/rssi-externalise', '/rssi-externalise-v2', '/admin-stats'];

export const FloatingCTA = () => {
  const pathname = usePathname();
  const { isVisible, hideCTA } = useCTAVisibility();

  if (pathname && HIDE_ON.includes(pathname)) return null;
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-[9999]">
      <a
        href="https://calendly.com/expert-securitrust"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => hideCTA()}
        className="group relative inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] whitespace-nowrap"
        style={{
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          boxShadow: '0 0 24px rgba(249,115,22,.5)',
        }}
      >
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)' }} />
        <Shield className="w-4 h-4 flex-shrink-0 drop-shadow" />
        <span className="tracking-wide drop-shadow">Un expert vous contacte sous 2h</span>
        <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </div>
  );
};
