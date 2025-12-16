'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Zap, CheckCircle, Clock, Target, TrendingUp, ArrowRight, Box, Cpu } from 'lucide-react';

export default function AuditFlashPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300 selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen"></div>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60"></div>
        <div className="stars opacity-20"></div>
      </div>

      <div className="absolute top-1/4 left-10 opacity-20 animate-float hidden md:block" style={{ animationDelay: '0s' }}>
        <Box className="w-24 h-24 text-cyan-500" />
      </div>
      <div className="absolute bottom-1/3 right-20 opacity-20 animate-float hidden md:block" style={{ animationDelay: '2s' }}>
        <Cpu className="w-16 h-16 text-cyan-500" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />
        
        <section className="relative pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                Cybersécurité Opérationnelle
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                AUDIT FLASH
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                L&apos;<strong>audit Flash</strong> est une <strong>évaluation rapide</strong> et ciblée de votre sécurité informatique, conçue pour identifier rapidement les <strong>vulnérabilités critiques</strong> et les points d&apos;amélioration prioritaires.
              </p>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Idéal pour obtenir une <strong>vision claire</strong> de votre niveau de sécurité en quelques jours, cet audit permet de prendre des <strong>décisions rapides</strong> et d&apos;orienter vos investissements cybersécurité.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">
                Avantages
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>Rapidité</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Ciblé</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>Actionnable</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>Efficace</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span>Rapidité</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Pourquoi choisir l&apos;audit Flash ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // BÉNÉFICES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-black/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Résultats rapides</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Obtenez un diagnostic complet en 2-3 jours pour prendre des décisions éclairées rapidement
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Focus prioritaire</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Concentration sur les vulnérabilités critiques et les quick wins
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">ROI immédiat</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Investissement limité pour un impact maximal sur votre posture de sécurité
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Contenu de l&apos;audit
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // CONTENU</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Analyses effectuées</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Scan de vulnérabilités automatisé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Revue rapide des configurations critiques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Évaluation de l&apos;exposition externe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Vérification des bonnes pratiques essentielles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Tests ciblés sur points sensibles</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Livrables express</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Rapport synthétique (15-20 pages)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Top 10 des vulnérabilités critiques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Plan d&apos;action prioritaire (Quick Wins)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Score de maturité cyber</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Présentation des résultats en visio</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="absolute right-0 top-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
              
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Besoin d&apos;un diagnostic rapide ?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                L&apos;audit Flash vous permet d&apos;identifier rapidement vos priorités cyber et de passer à l&apos;action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  Nous contacter
                  <ArrowRight className="w-5 h-5" />
                </a>
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