'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { GraduationCap, CheckCircle, Users, Target, BookOpen, ArrowRight, Box, Cpu } from 'lucide-react';

export default function SensibilisationFormationPage() {
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
                SENSIBILISATION & FORMATION
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                La <strong>sensibilisation et la formation</strong> constituent le <strong>rempart humain</strong> indispensable face aux cybermenaces. Plus de 90% des incidents de sécurité impliquent une erreur humaine.
              </p>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Nos programmes de formation permettent à vos collaborateurs de <strong>reconnaître les menaces</strong>, adopter les <strong>bonnes pratiques</strong> et devenir de véritables acteurs de la cybersécurité de votre organisation.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">
                Thématiques
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  <span>Phishing</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>Ingénierie sociale</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>RGPD</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Bonnes pratiques</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  <span>Phishing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Nos programmes de formation
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // PROGRAMMES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 bg-black/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Sensibilisation générale</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Sessions interactives pour tous les collaborateurs sur les menaces courantes et bonnes pratiques
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Phishing et arnaques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Mots de passe sécurisés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Gestion des données</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Formation métier</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Formations adaptées aux besoins spécifiques de chaque fonction (RH, finance, IT...)
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Risques spécifiques métier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Procédures adaptées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Cas pratiques ciblés</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Formation technique</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Formations avancées pour les équipes IT et sécurité
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Sécurité des SI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Gestion des incidents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Tests d&apos;intrusion</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">RGPD & Conformité</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Formation sur les obligations légales et réglementaires en matière de protection des données
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Principes du RGPD</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Droits des personnes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Obligations entreprise</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tilt-card group relative z-10 p-1">
                <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-4">Dirigeants & COMEX</h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    Sessions dédiées aux décideurs sur les enjeux stratégiques cyber
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Risques cyber business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Gouvernance sécurité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Investissements cyber</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Formats et modalités
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // FORMATS</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Formats disponibles</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Présentiel dans vos locaux (demi-journée / journée)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Distanciel via visioconférence interactive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>E-learning avec modules courts et ludiques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Ateliers pratiques et mises en situation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Campagnes de sensibilisation continues</span>
                  </li>
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Avantages clés</h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Contenu sur-mesure adapté à votre contexte</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Formateurs experts en cybersécurité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Exemples concrets et cas réels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Support pédagogique remis aux participants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Certificat de formation délivré</span>
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
                Formez vos équipes
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Transformez vos collaborateurs en première ligne de défense avec nos programmes de formation adaptés.
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