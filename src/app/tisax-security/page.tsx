'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { Shield, CheckCircle, Award, Lock, ArrowRight, Box, Cpu, Car } from 'lucide-react';

export default function TISAXPage() {
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
                Certification Automobile
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                Certification
                <br />
                TISAX
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Securitrust accompagne les <strong>fournisseurs et sous-traitants</strong> vers la conformité TISAX, du diagnostic jusqu&apos;à l&apos;audit final.
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

        {/* Qu'est-ce que TISAX ? */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Qu&apos;est-ce que TISAX ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // DÉFINITION</span>
            </div>
            
            <div className="glass-panel p-8 rounded-xl border border-white/5 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xl text-slate-300 mb-4">
                    <strong>TISAX (Trusted Information Security Assessment Exchange)</strong> est un standard de sécurité reconnu par l&apos;ensemble de l&apos;industrie automobile. Il garantit que les acteurs de la chaîne de valeur respectent des niveaux homogènes de sécurité de l&apos;information.
                  </p>
                  <p className="text-slate-300">
                    Il est basé sur l&apos;<strong>ISO 27001</strong> et couvre la protection des données sensibles, la gestion des risques, les prototypes et les échanges inter-entreprises.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { icon: Shield, title: 'Basé sur ISO 27001', description: 'Standard international de sécurité' },
                { icon: Lock, title: 'Protection des données', description: 'Données sensibles et prototypes' },
                { icon: Award, title: 'Reconnaissance sectorielle', description: 'Accepté par tous les constructeurs' }
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

        {/* Pourquoi TISAX est essentiel ? */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Pourquoi TISAX est essentiel ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // IMPORTANCE</span>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5 mb-8">
              <p className="text-xl text-slate-300 mb-6">
                De nombreux <strong>constructeurs automobiles</strong> exigent la conformité TISAX pour pouvoir collaborer avec un fournisseur. Un niveau d&apos;assurance (<strong>AL - Assessment Level</strong> : AL1, AL2 ou AL3) est défini selon la sensibilité des informations traitées.
              </p>
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <p className="text-red-300 font-semibold">
                  ⚠️ Ne pas être conforme peut entraîner l&apos;exclusion d&apos;appels d&apos;offres.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { level: 'AL1', title: 'Niveau 1', desc: 'Auto-évaluation pour informations normales' },
                { level: 'AL2', title: 'Niveau 2', desc: 'Audit tiers pour données sensibles' },
                { level: 'AL3', title: 'Niveau 3', desc: 'Audit renforcé pour données très sensibles' }
              ].map((level, i) => (
                <div key={i} className="glass-panel p-6 rounded-xl border border-white/5">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{level.level}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{level.title}</h4>
                  <p className="text-slate-300 text-sm">{level.desc}</p>
                </div>
              ))}
            </div>

            {/* Coûts détaillés */}
            <div className="space-y-6">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-white mb-3">AL1 (Self-Assessment)</h4>
                    <p className="text-slate-300 leading-relaxed">
                      AL1 typically costs <strong>a few thousand dollars</strong>. Since there is no external audit, expenses are limited to the ENX registration fee and any internal costs for documentation and minor security improvements. Companies that already have strong security policies in place can complete this level quickly and with minimal investment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-white mb-3">AL2 (Remote Document Audit)</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Costs vary widely depending on the organization's security maturity and objectives. The remote audit itself costs <strong>$5,000 to $10,000</strong>, but companies often invest much more in policy updates, risk assessments, and security upgrades to meet TISAX requirements.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Many organizations hire consultants to help prepare documentation, address gaps, and meet the requirements efficiently and effectively.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold text-white mb-3">AL3 (On-Site Audit)</h4>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Kirsch estimates that AL 3 typically costs <strong>20 percent more than AL 2</strong>. In addition to audit provider fees, companies must demonstrate strong physical security, prototype protection, and cyber resilience.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Security improvements and compliance consulting can add tens of thousands of dollars more, particularly if the organization lacks prior ISO 27001 certification or has multiple locations requiring assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre accompagnement TISAX */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Notre accompagnement TISAX
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // EXPERTISE</span>
            </div>

            <div className="space-y-6">
              {[
                'Évaluation initiale du niveau de maturité',
                'Plan de remédiation complet basé sur l\'ISO 27001',
                'Mise en place des politiques et procédures',
                'Accompagnement technique : protection des prototypes, contrôle des accès, sécurité cloud',
                'Préparation à l\'audit et support jusqu\'à l\'obtention du label'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 glass-panel p-6 rounded-xl border border-white/5">
                  <div className="w-8 h-8 bg-cyan-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-cyan-400 font-bold">{i + 1}</span>
                  </div>
                  <p className="text-slate-300 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bénéfices */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Bénéfices pour votre organisation
              </h3>
              <span className="text-cyan-500 font-mono text-xs">04 // AVANTAGES</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Reconnaissance officielle dans l\'industrie automobile',
                'Accès facilité aux fournisseurs, OEM et partenaires',
                'Renforcement global de la sécurité interne',
                'Amélioration de la gouvernance et réduction des risques'
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
                Obtenir votre conformité TISAX
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Nos experts vous accompagnent dans l&apos;obtention de votre certification TISAX pour l&apos;industrie automobile.
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