'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Shield, Target, FileCheck, TrendingUp, Users, Lock, AlertCircle, ArrowRight, Layers, BookOpen, Scale, Box, Cpu } from 'lucide-react';
import { SkyCTAButton } from '@/components/ui/sky-cta-button';

export default function GRCCyberPage() {
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
                Pilier Stratégique
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                GOUVERNANCE
                <br />
                RISQUES
                <br />
                CONFORMITÉ
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Face à la complexité croissante et à la sophistication des attaques, une réponse tactique isolée n&apos;est plus suffisante. Pour établir une résilience durable face aux cybermenaces, il faut une approche globale et stratégique de gestion des risques cyber.
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

        {/* Tech Stack Banner */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">
                Piliers GRC
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Stratégie</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <FileCheck className="w-5 h-5 text-cyan-400" />
                  <span>Conformité</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Amélioration Continue</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Résilience</span>
                </div>
                {/* Duplicate */}
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Stratégie</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* L'accompagnement SecuriTrust */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                L&apos;accompagnement SecuriTrust
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // EXPERTISE</span>
            </div>
            
            <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              SecuriTrust se positionne comme le partenaire de choix pour structurer votre stratégie GRC robuste, adaptée aux spécificités de votre entreprise et à vos enjeux métiers.
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { icon: Target, title: 'Stratégie personnalisée', desc: 'Une approche sur mesure adaptée à votre contexte métier' },
                { icon: FileCheck, title: 'Conformité garantie', desc: 'Respect des normes (RGPD, NIS2, ISO 27001)' },
                { icon: TrendingUp, title: 'Amélioration continue', desc: 'Pilotage et optimisation permanente' }
              ].map((item, index) => (
                <div key={index} className="tilt-card group relative z-10 p-1">
                  <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden text-center border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outils de la Gouvernance */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Les outils de la Gouvernance Cybersécurité
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // OUTILS</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: FileCheck, title: 'Politique de sécurité', description: 'Documents cadres définissant les règles' },
                { icon: Target, title: 'Registre des risques', description: 'Cartographie complète des risques' },
                { icon: TrendingUp, title: 'Tableaux de bord KPI', description: 'Indicateurs de performance' },
                { icon: Users, title: 'Comité de pilotage', description: 'Instance de décision stratégique' },
                { icon: BookOpen, title: 'Plans de formation', description: 'Programmes de sensibilisation' },
                { icon: Shield, title: 'Gestion des incidents', description: 'Processus de réponse et remédiation' }
              ].map((tool, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all group">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                    <tool.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                  <p className="text-slate-400 text-sm">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gestion des risques */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Gestion des risques cyber
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // RISQUES</span>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 mb-12">
              <p className="text-xl text-slate-300 mb-6">
                La gestion des risques cyber permet aux organisations d&apos;identifier et d&apos;atténuer proactivement les menaces qui pèsent sur leurs actifs informationnels critiques.
              </p>
              <p className="text-slate-300">
                Référentiels reconnus : <strong>EBIOS Risk Manager</strong> et <strong>ISO 27005</strong>
              </p>
            </div>

            {/* Typologie des risques */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { type: 'Risques financiers', items: ['Pertes économiques', 'Fraudes', 'Rançongiciels', 'Interruption'] },
                { type: 'Risques réglementaires', items: ['Non-conformité RGPD', 'Sanctions NIS2', 'Amendes ISO'] },
                { type: 'Risques opérationnels', items: ['Interruption service', 'Perte données', 'Défaillance technique'] },
                { type: 'Risques stratégiques', items: ['Atteinte réputation', 'Perte confiance', 'Espionnage'] },
                { type: 'Risques liés aux tiers', items: ['Fournisseurs compromis', 'Chaîne approvisionnement'] },
                { type: 'Risques émergents', items: ['IA et deepfakes', 'IoT et 5G', 'Quantum'] }
              ].map((category, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                  <h4 className="text-lg font-bold text-cyan-400 mb-4">{category.type}</h4>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conformité */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Conformité en Cybersécurité
              </h3>
              <span className="text-cyan-500 font-mono text-xs">04 // COMPLIANCE</span>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/5 mb-12">
              <p className="text-xl text-slate-300">
                La conformité n&apos;est pas simplement une contrainte réglementaire mais un véritable levier stratégique. En se conformant aux normes (RGPD, ISO 27001, NIS2, DORA), les entreprises renforcent leur crédibilité et créent un environnement de confiance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'RGPD', subtitle: 'Protection des données', items: ['Registre traitements', 'Analyse impact (PIA)', 'Droits personnes'] },
                { title: 'ISO 27001', subtitle: 'Management sécurité', items: ['SMSI complet', '114 mesures', 'Certification'] },
                { title: 'NIS2', subtitle: 'Résilience numérique', items: ['Gestion risques', 'Notification incidents'] },
                { title: 'DORA', subtitle: 'Secteur financier', items: ['Résilience opérationnelle', 'Tests résilience'] }
              ].map((framework, index) => (
                <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{framework.title}</h3>
                    <p className="text-cyan-400 text-sm">{framework.subtitle}</p>
                  </div>
                  <ul className="space-y-2">
                    {framework.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative z-10">
          <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
              
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Besoin d&apos;un accompagnement GRC ?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Nos experts vous accompagnent dans la structuration de votre stratégie GRC Cyber.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <SkyCTAButton href="/contact" text="Demander un diagnostic" />
                <SkyCTAButton href="/proposition-commerciale" text="Voir nos offres" />
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