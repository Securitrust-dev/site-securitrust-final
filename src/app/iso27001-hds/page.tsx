'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { Shield, CheckCircle, FileText, Award, Lock, AlertTriangle, ArrowRight, Box, Cpu, Server } from 'lucide-react';

export default function ISO27001HDSPage() {
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
                Certification & Conformité
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                ISO 27001
                <br />
                HDS
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                La <strong>norme ISO 27001</strong> et la <strong>certification HDS (Hébergeur de Données de Santé)</strong> sont des référentiels essentiels pour garantir la <strong>sécurité de l&apos;information</strong> et la <strong>conformité des données sensibles</strong>, notamment dans le secteur de la santé.
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

        {/* ISO 27001 Section */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                ISO 27001 : Norme internationale
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // CERTIFICATION</span>
            </div>
            
            <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              La <strong>norme ISO 27001</strong> définit les exigences pour établir, mettre en œuvre, maintenir et améliorer un <strong>Système de Management de la Sécurité de l&apos;Information (SMSI)</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { icon: Shield, title: 'Protection des actifs', description: 'Identification et protection des actifs informationnels' },
                { icon: Lock, title: 'Gestion des risques', description: 'Analyse et traitement des risques de sécurité' },
                { icon: Award, title: 'Amélioration continue', description: 'Cycle d\'amélioration permanente du SMSI' }
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

            <div className="mt-12">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Les bénéfices de la certification ISO 27001</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  'Confiance renforcée des clients et partenaires',
                  'Conformité réglementaire assurée',
                  'Réduction des risques de sécurité',
                  'Avantage concurrentiel sur le marché',
                  'Amélioration de la gouvernance IT',
                  'Protection contre les cybermenaces'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HDS Section */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                HDS : Hébergeur de Données de Santé
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // SANTÉ</span>
            </div>

            <p className="text-xl text-slate-300 text-center mb-12 max-w-3xl mx-auto">
              La <strong>certification HDS</strong> est obligatoire pour tout hébergeur de données de santé en France, garantissant la <strong>confidentialité, intégrité et disponibilité</strong> des données de santé à caractère personnel.
            </p>

            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Server className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">Domaines couverts par la certification HDS</h3>
                    <p className="text-slate-300 mb-4">
                      La certification HDS couvre plusieurs domaines essentiels pour garantir la sécurité des données de santé hébergées.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Gestion de l\'infrastructure d\'hébergement',
                        'Gestion du système d\'information',
                        'Sauvegarde et restauration des données',
                        'Continuité et plan de reprise d\'activité',
                        'Traçabilité et accès aux données',
                        'Sécurité physique et logique'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400 mb-3">Pourquoi obtenir la certification HDS ?</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Obligation légale pour l\'hébergement de données de santé',
                        'Garantie de conformité aux exigences réglementaires',
                        'Confiance des établissements de santé et patients',
                        'Protection renforcée contre les violations de données',
                        'Différenciation sur le marché de la e-santé',
                        'Alignement avec les standards internationaux'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre accompagnement */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Notre accompagnement
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // EXPERTISE</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h4 className="text-2xl font-bold text-white mb-6">Pour la certification ISO 27001</h4>
                <ul className="space-y-3">
                  {[
                    'Analyse des écarts (Gap Analysis)',
                    'Mise en place du SMSI',
                    'Définition des politiques de sécurité',
                    'Formation des équipes',
                    'Préparation à l\'audit de certification',
                    'Accompagnement post-certification'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h4 className="text-2xl font-bold text-white mb-6">Pour la certification HDS</h4>
                <ul className="space-y-3">
                  {[
                    'Audit de pré-certification',
                    'Mise en conformité des infrastructures',
                    'Documentation des processus',
                    'Mise en place des contrôles',
                    'Accompagnement à l\'audit de certification',
                    'Suivi et maintien de la certification'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
                Besoin d&apos;accompagnement pour vos certifications ?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Nos experts vous accompagnent dans l&apos;obtention de vos certifications ISO 27001 et HDS.
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
