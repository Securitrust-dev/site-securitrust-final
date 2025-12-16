'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { BarChart3, CheckCircle, TrendingUp, Target, Award, ArrowRight, Box, Cpu } from 'lucide-react';

export default function EvaluationMaturitePage() {
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
                Gouvernance & Conformité
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                ÉVALUATION DE MATURITÉ
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                L&apos;<strong>évaluation de maturité cyber</strong> mesure le <strong>niveau de maturité</strong> de votre organisation en matière de cybersécurité selon des <strong>référentiels reconnus</strong>.
              </p>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Elle permet de <strong>situer votre posture actuelle</strong>, d&apos;identifier les axes d&apos;amélioration prioritaires et de définir une <strong>trajectoire de progression</strong> réaliste et mesurable.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">
                Référentiels
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>CMMC</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Award className="w-5 h-5 text-cyan-400" />
                  <span>NIST CSF</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>CIS Controls</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span>CMMC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Domaines évalués
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // DOMAINES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-black/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Gouvernance</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Politique de sécurité, organisation, rôles et responsabilités, pilotage
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Gestion des risques</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Identification, évaluation, traitement et suivi des risques cyber
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Sécurité des actifs</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Protection des données, systèmes, réseaux et infrastructures
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Gestion des incidents</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Détection, réponse, gestion de crise et continuité d&apos;activité
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Sensibilisation</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Formation, communication et culture de la cybersécurité
                  </p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Conformité</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Respect des obligations légales et réglementaires (RGPD, NIS2...)
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
                Niveaux de maturité
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // NIVEAUX</span>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">Niveau 1</div>
                <h4 className="text-sm font-semibold text-white mb-2">Initial</h4>
                <p className="text-xs text-slate-400">Pratiques ad-hoc et non documentées</p>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">Niveau 2</div>
                <h4 className="text-sm font-semibold text-white mb-2">Reproductible</h4>
                <p className="text-xs text-slate-400">Certaines pratiques formalisées</p>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">Niveau 3</div>
                <h4 className="text-sm font-semibold text-white mb-2">Défini</h4>
                <p className="text-xs text-slate-400">Processus documentés et suivis</p>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-white/5 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Niveau 4</div>
                <h4 className="text-sm font-semibold text-white mb-2">Géré</h4>
                <p className="text-xs text-slate-400">Mesure et pilotage continu</p>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-cyan-500/30 text-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <div className="text-3xl font-bold text-green-400 mb-2">Niveau 5</div>
                <h4 className="text-sm font-semibold text-white mb-2">Optimisé</h4>
                <p className="text-xs text-slate-400">Amélioration continue</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Livrables et bénéfices
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // RÉSULTATS</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Documents fournis</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Rapport d&apos;évaluation détaillé par domaine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Graphiques radar de maturité (situation actuelle vs cible)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Benchmark sectoriel et comparaison avec les pairs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Plan d&apos;actions priorisé pour progresser</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Roadmap de montée en maturité sur 2-3 ans</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Avantages clés</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>État des lieux objectif de votre posture cyber</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Identification des forces et faiblesses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Vision claire de la trajectoire d&apos;amélioration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Support pour obtenir des budgets cyber</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Base pour une certification future (ISO 27001...)</span>
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
                Évaluez votre maturité cyber
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Mesurez votre niveau de maturité et construisez un plan de progression adapté à vos enjeux.
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