'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { Shield, CheckCircle, Heart, Server, ArrowRight, Box, Cpu, Database } from 'lucide-react';

export default function HDSPage() {
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
                Hébergement de Données de Santé
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                Certification
                <br />
                HDS
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Securitrust accompagne les <strong>éditeurs, prestataires cloud et organisations de santé</strong> dans la mise en conformité HDS.
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

        {/* Qu'est-ce que la certification HDS ? */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Qu&apos;est-ce que la certification HDS ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // DÉFINITION</span>
            </div>
            
            <div className="glass-panel p-8 rounded-xl border border-white/5 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xl text-slate-300 mb-4">
                    Le statut d&apos;<strong>Hébergeur de Données de Santé (HDS)</strong> est obligatoire pour tout organisme qui héberge, stocke, sauvegarde ou traite des données de santé pour le compte d&apos;un tiers.
                  </p>
                  <p className="text-slate-300">
                    Ce cadre réglementaire repose sur l&apos;<strong>ISO 27001</strong> et des exigences spécifiques visant la confidentialité, la traçabilité et la disponibilité des données médicales.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { icon: Shield, title: 'Confidentialité', description: 'Protection des données médicales' },
                { icon: Database, title: 'Traçabilité', description: 'Suivi complet des accès' },
                { icon: Server, title: 'Disponibilité', description: 'Accès permanent et sécurisé' }
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
          </div>
        </section>

        {/* Qui est concerné ? */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Qui est concerné ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // ACTEURS</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Applications médicales et solutions SaaS santé',
                'Télémédecine et téléconsultation',
                'Laboratoires et prestataires de radiologie',
                'Mutuelles, assurances et plateformes patient',
                'Cloud providers et hébergeurs IT'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 glass-panel p-6 rounded-xl border border-white/5">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre accompagnement HDS */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Notre accompagnement HDS
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // EXPERTISE</span>
            </div>

            <div className="space-y-6">
              {[
                'Analyse d\'écart par rapport au référentiel HDS',
                'Mise en place des procédures sécurité (accès, journalisation, sauvegarde, PRA/PCA)',
                'Accompagnement à la certification ISO 27001 si nécessaire',
                'Implémentation des mesures techniques obligatoires',
                'Préparation à l\'audit HDS de niveau 1 à 6'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass-panel p-6 rounded-xl border border-white/5">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">{i + 1}</span>
                  </div>
                  <p className="text-slate-300 text-lg">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 glass-panel p-8 rounded-xl border border-white/5">
              <h4 className="text-2xl font-bold text-cyan-400 mb-6">Les 6 niveaux HDS</h4>
              <p className="text-slate-300 mb-6">
                La certification HDS se décompose en 6 niveaux d&apos;activités obligatoires :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  '1. Mise à disposition de l\'infrastructure physique',
                  '2. Mise à disposition de l\'infrastructure virtuelle',
                  '3. Administration et exploitation de l\'infrastructure',
                  '4. Sauvegarde externalisée',
                  '5. Hébergement physique des serveurs',
                  '6. Hébergement des applications et bases de données'
                ].map((level, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-300">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi devenir HDS ? */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Pourquoi devenir HDS ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">04 // AVANTAGES</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Conformité légale pour traiter des données de santé',
                'Confiance renforcée auprès des professionnels et des patients',
                'Sécurisation complète du cycle de vie des données médicales',
                'Accès au marché réglementé de la santé'
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 glass-panel p-6 rounded-xl border border-white/5">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300 text-lg">{benefit}</span>
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
                Devenir hébergeur certifié HDS
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Nos experts vous accompagnent dans l&apos;obtention de votre certification HDS pour l&apos;hébergement de données de santé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  Demander un audit
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/proposition-commerciale"
                  className="inline-flex items-center gap-2 glass-panel border border-cyan-500/30 text-white px-8 py-4 rounded font-medium tracking-widest uppercase hover:border-cyan-500 transition-all"
                >
                  Voir nos offres
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
