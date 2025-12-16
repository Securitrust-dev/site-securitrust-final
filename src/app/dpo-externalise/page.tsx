'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Package, Cpu, FileCheck, Shield, Lock, Scale, Users, CheckCircle } from 'lucide-react';

export default function DPOExternalisePage() {
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
                Protection des Données
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                DPO EXTERNALISÉ
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Externaliser la fonction de <strong>DPO externalisé</strong> (<strong>Délégué à la Protection des Données</strong>) est une solution idéale pour les entreprises souhaitant garantir leur <strong>conformité RGPD</strong> sans recourir à un recrutement interne. Chez <strong>SecuriTrust</strong>, nous mettons à votre disposition un <strong>service DPO externalisé</strong> alliant expertise, réactivité et indépendance, pour une gestion optimale de vos obligations en matière de protection des données.
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
                Avantages
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <FileCheck className="w-5 h-5 text-cyan-400" />
                  <span>Veille Continue</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Gestion Risques</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <span>Coûts Maîtrisés</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Scale className="w-5 h-5 text-cyan-400" />
                  <span>Indépendance</span>
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <FileCheck className="w-5 h-5 text-cyan-400" />
                  <span>Veille Continue</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Gestion Risques</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi faire appel à un DPO externalisé */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Pourquoi faire appel à un DPO externalisé ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // CONTEXTE</span>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5 mb-8">
              <p className="text-slate-300 mb-4">
                Le <strong>Règlement Général sur la Protection des Données (RGPD)</strong> impose à de nombreuses organisations de désigner un DPO. Lorsque les ressources internes sont limitées, le recours à un <strong>DPO externalisé</strong> permet de répondre à cette exigence légale tout en bénéficiant d&apos;un accompagnement d&apos;experts.
              </p>
              <p className="text-slate-300">
                L&apos;externalisation du DPO garantit :
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Veille réglementaire</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Continue sur les évolutions du RGPD</p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Gestion proactive</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Des risques liés à la protection des données</p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-black/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Réduction des coûts</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Par rapport à un recrutement interne</p>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Indépendance totale</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Dans l&apos;analyse et la prise de décision</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Réactivité, indépendance et transparence */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Réactivité, indépendance et transparence
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // PRINCIPES</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h4 className="text-2xl font-bold text-cyan-400 mb-6">Indépendance du DPO</h4>
                <p className="text-slate-300 mb-4">
                  Le DPO doit agir en toute <strong>indépendance</strong> par rapport à l&apos;organisation qu&apos;il conseille. Son rôle est d&apos;accompagner et de guider, non de prendre des décisions à la place de la direction.
                </p>
                <p className="text-slate-300">
                  Leur position externe offre une <strong>objectivité précieuse</strong>, essentielle à une gouvernance saine de la donnée.
                </p>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h4 className="text-2xl font-bold text-cyan-400 mb-6">Un service flexible</h4>
                <p className="text-slate-300 mb-4">
                  Nos <strong>services de DPO externalisé</strong> s&apos;adaptent à votre taille, votre secteur d&apos;activité et vos besoins :
                </p>
                <ul className="space-y-3">
                  {[
                    'Missions ponctuelles ou longue durée',
                    'Accompagnement personnalisé et évolutif',
                    'Reporting régulier pour traçabilité'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{item}</span>
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