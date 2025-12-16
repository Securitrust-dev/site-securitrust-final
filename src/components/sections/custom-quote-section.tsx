'use client';

import { ArrowRight } from 'lucide-react';

export function CustomQuoteSection() {
  const handleQuoteClick = () => {
    window.open('https://devis-expert-securitrust-simulation.vercel.app/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
      {/* Background effects */}
      <div className="absolute inset-0 bg-void opacity-30" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section header */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <span className="text-sm font-medium text-primary">Devis personnalisé</span>
        </div>

        {/* Main content */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
          Obtenez votre devis sur mesure
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Profitez d'un audit de sécurité gratuit et découvrez comment nous pouvons transformer 
          la cybersécurité en avantage concurrentiel pour votre entreprise. 
          Notre plateforme de simulation vous permet d'obtenir un devis personnalisé en quelques minutes.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleQuoteClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 text-background font-semibold text-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-100"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Button content */}
          <span className="relative z-10 tracking-wide uppercase text-sm">
            Mon devis sur mesure
          </span>
          <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>

        {/* Additional info */}
        <p className="mt-8 text-sm text-muted-foreground">
          ✓ Sans engagement • ✓ Réponse immédiate • ✓ 100% personnalisé
        </p>
      </div>
    </section>
  );
}