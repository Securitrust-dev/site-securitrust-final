'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { ExpertCTAButton } from '@/components/sections/expert-cta-button';
import { Shield, Search, FileText, Target, CheckCircle, AlertTriangle, ArrowRight, Box, Cpu, Lock } from 'lucide-react';

export default function AuditCybersecuritePage() {
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
                Évaluation de Sécurité
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                AUDIT
                <br />
                CYBERSÉCURITÉ
              </h1>
              <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left">
                L&apos;<strong>audit de sécurité informatique</strong> constitue une étape essentielle pour évaluer la <strong>protection des systèmes d&apos;information</strong> d&apos;une entreprise. Réalisé par un <strong>expert en cybersécurité</strong>, cet audit examine de manière approfondie les aspects <strong>techniques</strong>, <strong>organisationnels</strong> et <strong>humains</strong>.
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
                Périmètre
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent"></div>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-slate-300/80 text-sm md:text-base">
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Architecture Réseau</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  <span>Dispositifs Sécurité</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span>Droits d&apos;Accès</span>
                </div>
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>Comportements Utilisateurs</span>
                </div>
                {/* Duplicate for seamless loop */}
                <div className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs md:text-[0.7rem]">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>Architecture Réseau</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qu'examine l'audit */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Périmètre de l&apos;audit
              </h3>
              <span className="text-cyan-500 font-mono text-xs">01 // ANALYSE</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { icon: Shield, title: 'L\'architecture réseau', description: 'Analyse complète de l\'infrastructure réseau' },
                { icon: FileText, title: 'Les dispositifs de sécurité', description: 'Pare-feu, antivirus, EDR' },
                { icon: AlertTriangle, title: 'Les droits d\'accès', description: 'Gestion des permissions et contrôles' },
                { icon: CheckCircle, title: 'Les comportements utilisateurs', description: 'Pratiques et sensibilisation' }
              ].map((item, index) => (
                <div key={index} className="tilt-card group relative p-1">
                  <div className="glass-panel h-full p-8 rounded-xl relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-slate-300 text-center max-w-3xl mx-auto">
              En croisant ces éléments, l&apos;auditeur identifie les <strong>failles de sécurité potentielles</strong> qui pourraient être exploitées lors d&apos;une cyberattaque.
            </p>
          </div>
        </section>

        {/* Shadow IT */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Shadow IT : un risque sous-estimé
              </h3>
              <span className="text-cyan-500 font-mono text-xs">02 // MENACES</span>
            </div>

            <div className="glass-panel p-8 rounded-xl border border-white/5">
              <p className="text-slate-300 mb-6">
                Près de <strong>85 % des collaborateurs</strong> utilisent encore des applications ou services cloud <strong>non validés par la DSI</strong>.
              </p>
              
              <p className="text-slate-300 mb-6">
                Ce comportement expose l&apos;entreprise à :
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Vulnérabilités invisibles', desc: 'Applications non sécurisées hors contrôle IT' },
                  { title: 'Manque de contrôle', desc: 'Sur les données échangées' },
                  { title: 'Risque accru', desc: 'De fuite d\'informations sensibles' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[#0b1221]/50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Les étapes */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">
                Les étapes de l&apos;audit
              </h3>
              <span className="text-cyan-500 font-mono text-xs">03 // PROCESSUS</span>
            </div>

            <div className="space-y-6 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/20 to-transparent"></div>

              {[
                {
                  number: '1',
                  title: 'Cartographie du SI',
                  description: 'Analyse complète de l\'infrastructure'
                },
                {
                  number: '2',
                  title: 'Tests d\'intrusion',
                  description: 'Simulation d\'attaques réelles'
                },
                {
                  number: '3',
                  title: 'Audit de configuration',
                  description: 'Vérification des paramètres de sécurité'
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
                Besoin d&apos;un audit cybersécurité ?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                Nos experts auditeurs vous accompagnent dans l&apos;évaluation de votre sécurité informatique.
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

        <section className="py-16 px-6 text-center relative z-10">
          <ExpertCTAButton />
        </section>

        <Footer />
      </div>
    </div>
  );
}