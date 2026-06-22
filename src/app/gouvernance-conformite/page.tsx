'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { ArrowRight, Box, Cpu } from 'lucide-react';

const pillars = [
  {
    href: '/gouvernance-conformite/domaines-expertise',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    num: '01',
    title: "Domaines d'Expertise",
    accroche: "Automobile, Finance, Santé, IA — chaque secteur a ses obligations.",
    services: ['TISAX (Auto)', 'DORA (Finance)', 'HDS (Santé)', 'IA Act', 'ISO 27001', 'RGPD'],
    logique: "Cartographiez vos référentiels applicables avant d'agir.",
  },
  {
    href: '/gouvernance-conformite/accompagnement',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    num: '02',
    title: 'Accompagnement',
    accroche: "Mise en conformité complète ou partielle selon votre maturité.",
    services: ['Certification ISO 27001', 'TISAX', 'DORA', 'EBIOS RM', 'PCA / PRA'],
    logique: "Un plan d'action structuré pour atteindre vos objectifs de conformité.",
  },
  {
    href: '/gouvernance-conformite/audits',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    num: '03',
    title: 'Audits',
    accroche: "Mesurez l'écart entre votre posture actuelle et les exigences.",
    services: ['Gap Analysis', 'Audit de maturité', 'Audit de configuration', "Audit d'architecture", 'Audit Flash'],
    logique: "Des livrables actionnables, pas des rapports qui dorment.",
  },
  {
    href: '/gouvernance-conformite/services-externalises',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    num: '04',
    title: 'Services Externalisés',
    accroche: "RSSI et DPO à temps partagé — l'expertise senior sans le coût fixe.",
    services: ['RSSI à temps partagé', 'Pilotage SMSI', 'DPO externalisé', 'DPA & RGPD', 'Sensibilisation'],
    logique: "Bénéficiez d'un pilotage stratégique de la sécurité sans recrutement.",
  },
];

export default function GouvernanceConformitePage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-cyan-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
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

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">Services</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                GOUVERNANCE &amp; CONFORMITÉ
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-8">
                Structurez votre posture de sécurité, répondez aux obligations réglementaires et pilotez la conformité avec des experts à vos côtés.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <a href="/contact?service=audit" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                  Je souscris à mon audit
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 border border-white/30 hover:border-cyan-500/60 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                  Je souscris à mon accompagnement
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">Domaines</span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent" />
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-white text-sm">
                {['ISO 27001', 'TISAX', 'DORA', 'HDS', 'IA Act', 'RGPD', 'EBIOS RM', 'NIS 2', 'RSSI', 'DPO', 'Gap Analysis', 'Audit Flash'].map((ref) => (
                  <span key={ref} className="uppercase tracking-[0.25em] text-xs">{ref}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pillars grid */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">Nos domaines d&apos;intervention</h3>
              <span className="text-cyan-500 font-mono text-xs">04 // PILIERS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className={`tilt-card group relative z-10 p-1 block`}
                >
                  <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${p.border} ${p.glow} hover:scale-[1.01] transition-transform duration-300`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                    <div className="flex items-start justify-between mb-4">
                      <h4 className={`text-2xl font-bold ${p.accent}`}>{p.title}</h4>
                      <span className={`text-xs font-bold ${p.accent} opacity-40 font-mono`}>{p.num}</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed mb-5">{p.accroche}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.services.map((s) => (
                        <span key={s} className={`px-2.5 py-1 text-xs font-semibold border rounded-md ${p.badgeBg}`}>{s}</span>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                      <p className="text-sm text-white italic">{p.logique}</p>
                      <ArrowRight className={`w-5 h-5 flex-shrink-0 ml-4 ${p.accent} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Par où commencer ?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Un échange de 30 minutes permet d&apos;identifier votre niveau de maturité et les priorités d&apos;action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a href="/contact?service=audit" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                  Je souscris à mon audit
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                  Je souscris à mon accompagnement
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>



        <InternalLinks pageKey="gouvernance-conformite" />
        <Footer />
      </div>
    </div>
  );
}
