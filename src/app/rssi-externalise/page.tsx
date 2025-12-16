'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Package, Cpu, Shield, BrainCircuit, FileText, Target, Users, CheckCircle, Hammer, Clock } from 'lucide-react';

export default function RSSIExternalisePage() {
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
        <Package className="w-24 h-24 text-cyan-500" />
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
                Expertise Cybersécurité
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-tight mb-6 mix-blend-screen">
                RSSI À TEMPS PARTAGÉ
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                Le <strong>RSSI (Responsable de la Sécurité des Systèmes d&apos;Information)</strong> est un acteur clé dans la protection des <strong>données</strong>, <strong>infrastructures</strong>, <strong>systèmes critiques</strong> d&apos;une entreprise. Il pilote la stratégie cybersécurité et veille à la maîtrise des risques en lien avec les menaces internes et externes.
              </p>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Cependant, recruter un RSSI expérimenté à temps plein représente un investissement important, souvent inaccessible pour les PME ou structures en croissance. C&apos;est pourquoi <strong>SecuriTrust propose un service de RSSI externalisé</strong>, agile et adaptable à vos besoins réels.
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
                Missions
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Stratégie Cyber</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  <span>Analyse Risques</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>Conformité</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Gestion Incidents</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>Sensibilisation</span>
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Stratégie Cyber</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  <span>Analyse Risques</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Les missions du RSSI */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Les missions du RSSI externalisé
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // MISSIONS</span>
            </div>
            
            <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              En tant que <strong>chef d&apos;orchestre de la cybersécurité</strong>, le RSSI externalisé coordonne des missions vitales, structurantes pour votre organisation :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Pilotage stratégique</h4>
                  <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Analyses de risques et plans de remédiation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Politiques de sécurité (PSSI) et conformité</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2 */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-black/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Gestion incidents</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Coordination des réponses en cas de crise et gestion des incidents de sécurité
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Hammer className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Supervision projets</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Supervision de projets IT sensibles (cloud, SI métier, etc.)
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Veille & formation</h4>
                  <ul className="space-y-3 text-sm text-slate-400 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Veille technologique et réglementaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Sessions de sensibilisation des équipes</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 5 */}
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Audits sécurité</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Évaluation des audits de sécurité et tests d&apos;intrusion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSSI à temps partagé */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Modalités d&apos;intervention
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // FLEXIBILITÉ</span>
            </div>

            <p className="text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              Le RSSI à temps partagé peut intervenir :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              <div className="glass-panel p-8 rounded-xl border border-white/5 text-center relative z-10">
                <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Quelques jours par mois</h3>
                <p className="text-slate-300 text-sm">À raison de quelques jours par mois, ou plus intensément selon vos priorités</p>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5 text-center relative z-10">
                <Target className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Sur site ou à distance</h3>
                <p className="text-slate-300 text-sm">Sur site ou à distance, avec des points de pilotage réguliers</p>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5 text-center relative z-10">
                <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Intégré aux équipes</h3>
                <p className="text-slate-300 text-sm">Intégré dans vos comités de direction ou conseils IT/cyber</p>
              </div>
            </div>

            <p className="text-slate-300 text-center max-w-3xl mx-auto">
              Grâce à cette approche externalisée, vous bénéficiez d&apos;un <strong>pilotage professionnel de votre cybersécurité</strong>, sans supporter les coûts fixes d&apos;un recrutement interne.
            </p>
          </div>
        </section>

        {/* Pourquoi intégrer un RSSI */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Les avantages du RSSI externalisé
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // BÉNÉFICES</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Modèle flexible et modulaire</h3>
                <p className="text-slate-300 mb-4">
                  Le RSSI joue un rôle stratégique en supervision de chaque étape clé de vos projets IT — de la conception à la mise en production, en passant par la gestion des risques et la conformité réglementaire.
                </p>
                <p className="text-slate-300 mb-4">
                  Son intervention est à la fois <strong>stratégique</strong> et <strong>opérationnelle</strong>, capable de se modeler selon vos besoins.
                </p>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Maîtrise des coûts</h3>
                <p className="text-slate-300 mb-4">
                  Vous accédez à une expertise de haut niveau, <strong>sans supporter le salaire d&apos;un RSSI à plein temps</strong>. Votre budget cybersécurité est ainsi <strong>optimisé et maîtrisé</strong>.
                </p>
                <p className="text-slate-300">
                  Un RSSI permet de <strong>structurer efficacement votre stratégie de cybersécurité</strong> et d&apos;assurer <strong>la continuité opérationnelle</strong> face aux menaces numériques.
                </p>
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