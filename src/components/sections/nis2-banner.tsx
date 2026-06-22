'use client';

import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const Nis2Banner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-gradient-to-r from-cyan-950 via-cyan-900/80 to-cyan-950 border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-sm flex-1 justify-center flex-wrap">
          <AlertTriangle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="text-cyan-200 font-medium">
            Directive NIS2 — votre entreprise est-elle concernée ?
          </span>
          <span className="text-cyan-400/70 hidden sm:inline">·</span>
          <Link
            href="/conformite-nis2"
            className="text-cyan-400 font-semibold underline underline-offset-2 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            Vérifiez votre conformité →
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-cyan-400/60 hover:text-cyan-300 transition-colors flex-shrink-0"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
