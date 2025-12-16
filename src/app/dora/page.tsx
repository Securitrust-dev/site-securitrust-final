'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Shield, CheckCircle, FileText, AlertTriangle, Users, Lock, Clock, ArrowRight, Box, Cpu, Target } from 'lucide-react';
import { Metadata } from 'next';

export default function DORAPage() {
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
                Secteur Financier
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                RÈGLEMENT
                <br />
                DORA
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Le cadre de cybersécurité pour les entités financières et leurs prestataires de services technologiques. Entré en vigueur le <strong>17 janvier 2025</strong>, il devient le standard européen pour la <strong>résilience numérique du secteur financier</strong>.
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

        {/* Êtes-vous concerné */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Êtes-vous concerné par DORA ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // PÉRIMÈTRE</span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Établissements financiers',
                'Prestataires de services de paiement',
                'Prestataires sur actifs numériques',
                'Entreprises d\'investissement',
                'Services de crowdfunding',
                'Sociétés de gestion d\'actifs',
                'Administrateurs d\'indices',
                'Agences de notation de crédit',
                'Dépositaires centraux de titres'
              ].map((item, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <p className="text-slate-300">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Les piliers fondamentaux */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Les piliers fondamentaux du DORA
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // PILIERS</span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { icon: Shield, title: 'Gestion des risques', description: 'Identification et évaluation des risques TIC' },
                { icon: AlertTriangle, title: 'Gestion des incidents', description: 'Détection, réponse et reporting' },
                { icon: FileText, title: 'Tests de résilience', description: 'Évaluation régulière de la résistance' },
                { icon: Users, title: 'Gestion des tiers', description: 'Contrôle des prestataires TIC' },
                { icon: Lock, title: 'Partage d\'informations', description: 'Échange de renseignements cyber' },
                { icon: Clock, title: 'Conformité continue', description: 'Maintien des mesures de sécurité' }
              ].map((pillar, index) => (
                <div key={index} className="tilt-card group relative z-10 p-1">
                  <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                      <pillar.icon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-slate-400 text-sm">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment fonctionne l'audit */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Comment fonctionne l&apos;audit ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // PROCESSUS</span>
            </div>

            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent"></div>

              {[
                { step: '1', title: 'Audit initial', description: 'Évaluation complète de votre infrastructure TIC' },
                { step: '2', title: 'Rapport d\'audit', description: 'Document détaillé identifiant les écarts' },
                { step: '3', title: 'Plan de remédiation', description: 'Feuille de route prioritisée' },
                { step: '4', title: 'Implémentation', description: 'Accompagnement dans la mise en œuvre' },
                { step: '5', title: 'Audit final', description: 'Vérification de la conformité complète' },
                { step: '6', title: 'Suivi continu', description: 'Audits réguliers pour maintenir la conformité' }
              ].map((phase, index) => (
                <div key={index} className="flex items-start gap-6 glass-panel p-8 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <span className="text-2xl font-bold text-white">{phase.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-slate-300">{phase.description}</p>
                  </div>
                </div>
              ))}
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