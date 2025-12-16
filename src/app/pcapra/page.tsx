'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { Shield, CheckCircle, FileText, Users, Lock, AlertTriangle, ArrowRight, Box, Cpu, TrendingUp, FileSearch } from 'lucide-react';

export default function PCAPRAPage() {
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
                Analyse des Risques
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                PCAPRA
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                Le <strong>Plan de Continuité d&apos;Activité et Plan de Reprise d&apos;Activité (PCA/PRA)</strong> est un ensemble de <strong>procédures et de mesures</strong> permettant à une organisation de maintenir ou reprendre rapidement ses activités essentielles en cas de <strong>sinistre majeur</strong> ou d&apos;incident critique.
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

        {/* Comprendre le PCA/PRA */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Comprendre le PCA/PRA
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // DÉFINITION</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3">Plan de Continuité d&apos;Activité (PCA)</h4>
                    <p className="text-slate-300 mb-4">
                      Le PCA vise à <strong>maintenir les activités critiques</strong> de l&apos;entreprise pendant et après un incident majeur.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Identification des processus critiques',
                        'Mise en place de solutions de secours',
                        'Maintien des opérations essentielles',
                        'Communication de crise',
                        'Gestion des ressources alternatives'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-cyan-400 mb-3">Plan de Reprise d&apos;Activité (PRA)</h4>
                    <p className="text-slate-300 mb-4">
                      Le PRA définit les procédures pour <strong>restaurer les systèmes informatiques</strong> et reprendre les activités normales après un sinistre.
                    </p>
                    <ul className="space-y-2">
                      {[
                        'Restauration des systèmes IT',
                        'Récupération des données',
                        'Reprise des applications critiques',
                        'Tests de restauration réguliers',
                        'Objectifs RTO et RPO définis'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <h4 className="text-xl font-bold text-white mb-4 text-center">Indicateurs clés du PRA</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">RTO</div>
                  <div className="text-sm text-slate-400 mb-2">Recovery Time Objective</div>
                  <p className="text-slate-300 text-sm">Durée maximale d&apos;interruption admissible d&apos;une ressource</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">RPO</div>
                  <div className="text-sm text-slate-400 mb-2">Recovery Point Objective</div>
                  <p className="text-slate-300 text-sm">Perte de données maximale admissible mesurée en temps</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi mettre en place un PCA/PRA */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Pourquoi mettre en place un PCA/PRA ?
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // ENJEUX</span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2 z-0"></div>

              {[
                { 
                  icon: Shield, 
                  title: 'Résilience organisationnelle', 
                  description: 'Garantir la continuité des activités critiques face aux incidents majeurs'
                },
                { 
                  icon: Lock, 
                  title: 'Protection des données', 
                  description: 'Prévenir la perte de données critiques et assurer leur récupération'
                },
                { 
                  icon: AlertTriangle, 
                  title: 'Conformité réglementaire', 
                  description: 'Respecter les obligations légales et normatives (RGPD, NIS2, DORA)'
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

            <div className="mt-12">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">Les risques couverts</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Cyberattaques et ransomwares',
                  'Pannes matérielles',
                  'Catastrophes naturelles',
                  'Erreurs humaines',
                  'Pannes électriques',
                  'Incidents de sécurité'
                ].map((risk, i) => (
                  <div key={i} className="glass-panel p-4 rounded-xl border border-white/5">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notre méthodologie */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Notre méthodologie
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // PROCESSUS</span>
            </div>

            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">1. Analyse d&apos;impact métier (BIA)</h3>
                <p className="text-slate-300 mb-4">
                  Identification des <strong>processus critiques</strong> et évaluation de l&apos;impact d&apos;une interruption sur l&apos;activité.
                </p>
                <ul className="space-y-2">
                  {[
                    'Cartographie des processus métiers',
                    'Identification des activités critiques',
                    'Évaluation des impacts financiers et opérationnels',
                    'Définition des RTO et RPO par processus',
                    'Identification des dépendances et ressources critiques'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">2. Analyse des risques</h3>
                <p className="text-slate-300 mb-4">
                  Évaluation des <strong>menaces potentielles</strong> et de leur probabilité d&apos;occurrence.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Identification des scénarios de sinistre',
                    'Évaluation de la probabilité et de l\'impact',
                    'Analyse des vulnérabilités',
                    'Hiérarchisation des risques'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">3. Élaboration des plans</h3>
                <p className="text-slate-300 mb-4">
                  Rédaction des <strong>procédures détaillées</strong> de continuité et de reprise d&apos;activité.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Stratégies de continuité par processus',
                    'Procédures de reprise IT détaillées',
                    'Organisation de crise et cellule de gestion',
                    'Plans de communication interne et externe',
                    'Solutions de secours et sites de repli',
                    'Procédures de sauvegarde et restauration'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-8 rounded-xl border border-white/5">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">4. Tests et maintenance</h3>
                <p className="text-slate-300 mb-4">
                  Validation régulière de l&apos;efficacité des plans et <strong>amélioration continue</strong>.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Tests réguliers des procédures de reprise',
                    'Exercices de simulation de crise',
                    'Formation des équipes',
                    'Mise à jour continue des plans',
                    'Retour d\'expérience et amélioration',
                    'Audits de conformité'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
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
                Besoin d&apos;un PCA/PRA adapté à votre organisation ?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Nos experts vous accompagnent dans la mise en place de vos plans de continuité et de reprise d&apos;activité.
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
