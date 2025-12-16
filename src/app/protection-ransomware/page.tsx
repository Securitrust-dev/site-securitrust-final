'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { SkyCTAButton } from '@/components/ui/sky-cta-button';
import { Shield, Lock, AlertTriangle, CheckCircle, FileText, Target, Users, ArrowRight, Box, Cpu } from 'lucide-react';

export default function RansomwarePage() {
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
                Menace Critique
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                PROTECTION
                <br />
                RANSOMWARE
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Les <strong>attaques par ransomware</strong> représentent l&apos;un des périls les plus sérieux pour la <strong>continuité des opérations</strong> et la <strong>sécurité des informations</strong> d&apos;une organisation. Ces <strong>logiciels malveillants</strong> chiffrent les fichiers d&apos;un système et réclament une <strong>rançon</strong> pour obtenir la clé de déchiffrement.
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

        {/* Pourquoi la protection */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Pourquoi se protéger ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // ENJEUX</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Protéger vos données critiques',
                  description: 'Les ransomwares peuvent chiffrer ou supprimer des données essentielles : documents internes, fichiers financiers, informations clients.'
                },
                {
                  icon: AlertTriangle,
                  title: 'Réduire les interruptions',
                  description: 'Une fois vos systèmes paralysés, le risque d\'interruption peut durer plusieurs jours ou semaines.'
                },
                {
                  icon: Target,
                  title: 'Préserver votre réputation',
                  description: 'Une attaque réussie peut gravement nuire à l\'image de votre entreprise et à la confiance de vos clients.'
                },
                {
                  icon: Lock,
                  title: 'Éviter les coûts élevés',
                  description: 'Les coûts sont souvent supérieurs à la rançon : restauration, communication de crise, amendes.'
                }
              ].map((item, index) => (
                <div key={index} className="tilt-card group relative p-1">
                  <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-medium text-white mb-4">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* L'Approche SecuriTrust */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                L&apos;Approche Globale SecuriTrust
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // STRATÉGIE</span>
            </div>

            <p className="text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              Nous adoptons une approche complète et proactive pour <strong>protéger votre entreprise contre les ransomwares</strong>. Notre mission : vous aider à <strong>anticiper, détecter et neutraliser</strong> les attaques.
            </p>

            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent"></div>

              {[
                {
                  number: '1',
                  title: 'Analyse et Évaluation des Risques',
                  description: 'Audit de sécurité complet et évaluation des données critiques'
                },
                {
                  number: '2',
                  title: 'Sensibilisation et Formation',
                  description: 'Programmes de formation et simulations d\'attaques'
                },
                {
                  number: '3',
                  title: 'Solutions de Sécurité Avancées',
                  description: 'Systèmes de sauvegarde et technologies de détection'
                },
                {
                  number: '4',
                  title: 'Surveillance Continue',
                  description: 'Veille active et support réactif de nos experts'
                },
                {
                  number: '5',
                  title: 'Révision Post-Incident',
                  description: 'Analyse post-attaque et recommandations continues'
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
                Anticipez les menaces
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Investir dans une protection robuste contre les ransomwares, c&apos;est assurer la sécurité de vos données et la pérennité de votre entreprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <SkyCTAButton href="/contact" text="Contactez-Nous" />
                <a
                  href="/proposition-commerciale"
                  className="inline-flex items-center justify-center gap-2 glass-panel border border-cyan-500/30 text-white px-8 py-4 rounded-full font-medium uppercase hover:border-cyan-500 transition-all"
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