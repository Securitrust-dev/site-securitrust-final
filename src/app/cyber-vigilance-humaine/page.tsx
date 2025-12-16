'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { Users, Shield, AlertTriangle, Target, CheckCircle, Mail, ArrowRight, Box, Cpu, BrainCircuit } from 'lucide-react';

export default function CyberVigilancePage() {
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
                Facteur Humain
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                CYBER-VIGILANCE
                <br />
                HUMAINE
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                À l&apos;ère du tout-numérique, les entreprises investissent massivement sur les technologies de l&apos;information. Cependant, cette dépendance créé une <strong>surface d&apos;attaque étendue</strong>, offrant davantage d&apos;opportunités aux cyberattaquants.
              </p>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Parmi les menaces les plus fréquentes, le <strong>phishing</strong> reste en tête, ciblant principalement les utilisateurs à travers des e-mails frauduleux.
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
                Protection
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>Sensibilisation</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Formation</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Culture Sécurité</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <BrainCircuit className="w-5 h-5 text-cyan-400" />
                  <span>Vigilance</span>
                </div>
                {/* Duplicate */}
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>Sensibilisation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* L'erreur humaine */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                L&apos;erreur humaine : principal facteur de risque
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // ENJEU</span>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5">
              <p className="text-slate-300 mb-6 text-center max-w-3xl mx-auto">
                Aucune technologie, aussi avancée soit-elle, ne peut suffire à compenser l&apos;erreur humaine. Même dans des environnements hautement sécurisés, l&apos;élément humain demeure le point faible le plus exploité par les attaquants.
              </p>
              <p className="text-slate-300 text-center max-w-3xl mx-auto">
                C&apos;est pourquoi la <strong>vigilance humaine</strong> est essentielle pour la cybersécurité de toute organisation.
              </p>
            </div>
          </div>
        </section>

        {/* Renforcer les réflexes */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Renforcer les réflexes de sécurité
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // SOLUTIONS</span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  icon: Users,
                  title: 'Simulations de phishing',
                  description: 'Entraînement pratique pour reconnaître les tentatives'
                },
                {
                  icon: Target,
                  title: 'Exercices réguliers',
                  description: 'Formation continue des équipes'
                },
                {
                  icon: Shield,
                  title: 'Culture d\'entreprise',
                  description: 'Faire de la cybersécurité une priorité collective'
                }
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

            <p className="text-slate-300 text-center mt-12 max-w-3xl mx-auto">
              En sensibilisant chaque collaborateur, vous créez un <strong>véritable rempart</strong>, dans lequel la sécurité ne repose plus uniquement sur la technologie, mais aussi sur les <strong>connaissances et comportements humains</strong>.
            </p>
          </div>
        </section>

        {/* La solution SecuriTrust */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                La solution SecuriTrust
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // APPROCHE</span>
            </div>

            <p className="text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              Chez <strong>SecuriTrust</strong>, nous avons développé une <strong>approche complète, proactive et personnalisée</strong> pour assurer la sécurité de vos employés face aux menaces.
            </p>

            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent"></div>

              {[
                {
                  number: '1',
                  title: 'Audit et évaluation',
                  description: 'Identification des failles potentielles'
                },
                {
                  number: '2',
                  title: 'Formation des collaborateurs',
                  description: 'Programme de cyber-vigilance'
                },
                {
                  number: '3',
                  title: 'Solutions de sécurité avancées',
                  description: 'Technologies innovantes de protection'
                },
                {
                  number: '4',
                  title: 'Surveillance continue',
                  description: 'Suivi et assistance experte'
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-6 glass-panel p-8 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-300">{step.description}</p>
                  </div>
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
                Anticipez les menaces avec SecuriTrust
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Transformez votre cybersécurité en atout stratégique. Protégez vos données, renforcez la confiance de vos clients et assurez la pérennité de votre entreprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                >
                  Nous contacter
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