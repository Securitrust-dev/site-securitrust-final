'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { Calendar, Clock, CheckCircle, Box, Cpu } from 'lucide-react';

export default function PriseDeRdvPage() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const benefits = [
    {
      icon: Calendar,
      title: "Planification flexible",
      description: "Choisissez le créneau qui vous convient le mieux"
    },
    {
      icon: Clock,
      title: "Consultation de 30 min",
      description: "Un échange approfondi sur vos besoins"
    },
    {
      icon: CheckCircle,
      title: "Sans engagement",
      description: "Un premier contact gratuit et sans obligation"
    }
  ];

  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      {/* Scanline Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>

      {/* Background Particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 opacity-20 animate-float hidden md:block" style={{ animationDelay: '0s' }}>
        <Box className="w-24 h-24 text-cyan-500" />
      </div>
      <div className="absolute bottom-1/3 right-20 opacity-20 animate-float hidden md:block" style={{ animationDelay: '2s' }}>
        <Cpu className="w-16 h-16 text-cyan-500" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                  Réservez votre consultation
                </h2>
                <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-[0.9]">
                  PRISE DE
                  <br />
                  RENDEZ-VOUS
                </h1>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden md:block">01 // BOOKING</span>
            </div>

            <p className="text-lg md:text-xl text-slate-400 max-w-3xl font-light tracking-wide border-l-2 border-cyan-500 pl-6 mb-12">
              Planifiez une consultation gratuite de 30 minutes avec nos experts en cybersécurité pour discuter de vos besoins et défis.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="tilt-card group relative p-1"
                >
                  <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    
                    <div className="flex items-center gap-4 mb-3 relative z-10">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                        <benefit.icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {benefit.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-slate-400 leading-relaxed relative z-10">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calendly Widget Section */}
        <section className="py-12 relative z-10 pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="glass-panel p-8 md:p-12 rounded-2xl border border-cyan-500/20 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                    Sélectionnez un créneau
                  </h3>
                  <span className="text-cyan-500 font-mono text-xs hidden sm:block">CALENDLY</span>
                </div>

                {/* Calendly Inline Widget */}
                <div className="relative">
                  <div
                    className="calendly-inline-widget rounded-lg overflow-hidden"
                    data-url="https://calendly.com/rayen-ben-ghorbal-securitrust/30min"
                    style={{ minWidth: '320px', height: '750px' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 tracking-wide">
                Vous recevrez une confirmation par email avec les détails de la réunion.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
