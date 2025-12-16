'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Shield, CheckCircle, FileText, Users, Lock, AlertTriangle, ArrowRight, Box, Cpu, Scale } from 'lucide-react';

export default function MiseEnConformiteRGPDPage() {
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
        <section className="relative pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                Protection des Données
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                RGPD
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Depuis mai 2018, le <strong>Règlement Général sur la Protection des Données (RGPD)</strong> impose aux entreprises européennes une gestion rigoureuse des <strong>données personnelles</strong>. Ce cadre réglementaire vise à renforcer les droits des individus tout en imposant une <strong>gestion transparente et sécurisée</strong>.
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
            <span className="text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-4 h-4 text-cyan-400">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </div>
        </section>

        {/* L'expertise SecuriTrust */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                L&apos;expertise SecuriTrust
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // ACCOMPAGNEMENT</span>
            </div>
            
            <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              Nous accompagnons les entreprises dans toutes les étapes de leur <strong>mise en conformité RGPD</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { icon: FileText, title: 'Audit complet', description: 'Audit des traitements de données' },
                { icon: AlertTriangle, title: 'Identification des écarts', description: 'Écarts par rapport aux exigences' },
                { icon: CheckCircle, title: 'Mesures correctives', description: 'Actions techniques et organisationnelles' }
              ].map((item, index) => (
                <div key={index} className="tilt-card group relative z-10 p-1">
                  <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden text-center border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-300 text-lg max-w-4xl mx-auto mb-8">
                Nous garantissons trois piliers essentiels :
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Transparence', desc: 'dans l\'utilisation des données' },
                  { title: 'Confidentialité', desc: 'des données conservées' },
                  { title: 'Responsabilisation', desc: 'avec votre écosystème' }
                ].map((pillar, i) => (
                  <div key={i} className="glass-panel p-6 rounded-xl border border-white/5">
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">{pillar.title}</h4>
                    <p className="text-slate-300 text-sm">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comment se déroule un audit */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Comment se déroule un audit ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // PROCESSUS</span>
            </div>

            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">1. Questionnaire structuré</h3>
                <p className="text-slate-300 mb-4">
                  Construction d&apos;une <strong>vision claire et globale</strong> des pratiques actuelles en matière de protection des données personnelles.
                </p>
                <ul className="space-y-2">
                  {[
                    'Comment les DCP sont-elles collectées ?',
                    'Quelle est leur nature ?',
                    'Les salariés sont-ils informés ?',
                    'Durée de conservation des données ?',
                    'Logiciels RH conformes au RGPD ?',
                    'Transmission à des tiers ?'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">2. Entretien RH approfondi</h3>
                <p className="text-slate-300 mb-4">
                  Nos experts mènent un entretien avec le Responsable RH pour clarifier les points et identifier les zones d&apos;ombre.
                </p>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">3. Rapport d&apos;audit détaillé</h3>
                <p className="text-slate-300 mb-4">Vous recevez :</p>
                <ul className="space-y-2">
                  {[
                    'Diagnostic clair avec score de conformité',
                    'Écarts identifiés par rapport au RGPD',
                    'Feuille de route personnalisée'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 text-center relative z-10">
          <ExpertCTAButton />
        </section>

        <Footer />
      </div>
    </div>
  );
}