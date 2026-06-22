'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft, Box, Car, Landmark, Stethoscope, Globe, ShieldAlert, Plane, Brain } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Sector {
  name: string;
  Icon: LucideIcon;
  accent: string;
  border: string;
  glow: string;
  badgeBg: string;
  enjeux: string[];
  referentiels: string[];
}

const sectors: Sector[] = [
  {
    name: 'Automobile',
    Icon: Car,
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    enjeux: ["Accès aux appels d'offres", "Confidentialité & production"],
    referentiels: ['TISAX', 'ISO 21434', 'ISO 27001', 'EBIOS RM', 'RGPD'],
  },
  {
    name: 'Finance',
    Icon: Landmark,
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    enjeux: ["Conformité DORA", "Résilience opérationnelle"],
    referentiels: ['DORA', 'ISO 27001', 'EBIOS RM', 'RGPD', 'ISO 22301'],
  },
  {
    name: 'Santé',
    Icon: Stethoscope,
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    enjeux: ["Conformité réglementaire", "Protection données sensibles"],
    referentiels: ['ISO 27001', 'EBIOS RM', 'RGPD', 'HDS', 'HIPAA'],
  },
  {
    name: 'Services Numériques',
    Icon: Globe,
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    enjeux: ["Rassurer clients", "Respect SLA"],
    referentiels: ['ISO 27001', 'EBIOS RM', 'SOC2', 'RGPD', 'NIS2', 'DORA'],
  },
  {
    name: 'Entités Essentielles',
    Icon: ShieldAlert,
    accent: 'text-rose-400',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]',
    badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    enjeux: ["Conformité NIS2", "Réduction cyberattaques"],
    referentiels: ['NIS2', 'EBIOS RM', 'ISO 27001', 'RGPD'],
  },
  {
    name: 'Aéronautique',
    Icon: Plane,
    accent: 'text-sky-400',
    border: 'border-sky-500/30',
    glow: 'shadow-[0_0_15px_rgba(14,165,233,0.1)]',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    enjeux: ["Accès aux appels d'offres", "Protection données"],
    referentiels: ['Part-IS', 'AirCyber', 'ISO 27001', 'EBIOS RM', 'NIS2', 'RGPD'],
  },
  {
    name: 'Intelligence Artificielle',
    Icon: Brain,
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    enjeux: ["Conformité IA Act", "Gestion des risques IA"],
    referentiels: ['IA Act', 'ISO 42001', 'RGPD'],
  },
];

const matrix = [
  { referentiel: 'ISO 27001', auto: true,  finance: true,  sante: true,  num: true,  ent: true,  aero: true,  ia: false, description: 'Système de Management de la Sécurité de l\'Information' },
  { referentiel: 'RGPD',      auto: true,  finance: true,  sante: true,  num: true,  ent: true,  aero: true,  ia: true,  description: 'Règlement Général sur la Protection des Données' },
  { referentiel: 'EBIOS RM',  auto: true,  finance: true,  sante: true,  num: true,  ent: true,  aero: true,  ia: false, description: 'Méthode d\'analyse de risques ANSSI' },
  { referentiel: 'DORA',      auto: false, finance: true,  sante: false, num: true,  ent: false, aero: false, ia: false, description: 'Digital Operational Resilience Act' },
  { referentiel: 'NIS2',      auto: false, finance: false, sante: false, num: true,  ent: true,  aero: true,  ia: false, description: 'Directive Network and Information Security 2' },
  { referentiel: 'TISAX',     auto: true,  finance: false, sante: false, num: false, ent: false, aero: false, ia: false, description: 'Trusted Information Security Assessment Exchange' },
  { referentiel: 'HDS',       auto: false, finance: false, sante: true,  num: false, ent: false, aero: false, ia: false, description: 'Hébergeur de Données de Santé' },
  { referentiel: 'HIPAA',     auto: false, finance: false, sante: true,  num: false, ent: false, aero: false, ia: false, description: 'Health Insurance Portability and Accountability Act' },
  { referentiel: 'ISO 22301', auto: false, finance: true,  sante: false, num: false, ent: false, aero: false, ia: false, description: 'Système de Management de la Continuité d\'Activité' },
  { referentiel: 'IA Act',    auto: false, finance: false, sante: false, num: false, ent: false, aero: false, ia: true,  description: 'Règlement Européen sur l\'Intelligence Artificielle' },
  { referentiel: 'ISO 42001', auto: false, finance: false, sante: false, num: false, ent: false, aero: false, ia: true,  description: 'Système de Management de l\'Intelligence Artificielle' },
  { referentiel: 'ISO 21434', auto: true,  finance: false, sante: false, num: false, ent: false, aero: false, ia: false, description: 'Cybersécurité des véhicules routiers' },
  { referentiel: 'Part-IS',   auto: false, finance: false, sante: false, num: false, ent: false, aero: true,  ia: false, description: 'Sûreté de l\'information dans l\'aviation civile (EASA)' },
  { referentiel: 'AirCyber',  auto: false, finance: false, sante: false, num: false, ent: false, aero: true,  ia: false, description: 'Référentiel cybersécurité de la filière aérospatiale' },
];

const tousLesReferentiels = [
  'ISO 27001', 'RGPD', 'DORA', 'NIS2', 'IA Act', 'TISAX',
  'Part-IS', 'AirCyber', 'EBIOS RM', 'HDS', 'HIPAA', 'ISO 22301',
  'ISO 27701', 'ISO 42001', "Guide d'Hygiène", 'ISO 21434',
];

const matrixCols = [
  { key: 'auto',    label: 'Auto',    accent: 'text-cyan-400' },
  { key: 'finance', label: 'Finance', accent: 'text-violet-400' },
  { key: 'sante',   label: 'Santé',   accent: 'text-emerald-400' },
  { key: 'num',     label: 'Num.',    accent: 'text-blue-400' },
  { key: 'ent',     label: 'Ent.',    accent: 'text-rose-400' },
  { key: 'aero',    label: 'Aéro.',   accent: 'text-sky-400' },
  { key: 'ia',      label: 'IA',      accent: 'text-amber-400' },
];

export default function DomainesExpertisePage() {
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
        <Brain className="w-16 h-16 text-cyan-500" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Breadcrumb */}
        <section className="pt-28 pb-0 px-6">
          <div className="max-w-7xl mx-auto">
            <a href="/gouvernance-conformite" className="inline-flex items-center gap-2 text-sm text-white hover:text-cyan-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Gouvernance &amp; Conformité
            </a>
          </div>
        </section>

        {/* Hero */}
        <section className="relative pt-8 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-cyan-400 tracking-[0.2em] text-xs uppercase mb-4">
                Gouvernance &amp; Conformité
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                DOMAINES D&apos;EXPERTISE
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-8">
                Chaque secteur d&apos;activité porte ses propres exigences réglementaires. Une cartographie claire de vos obligations permet d&apos;agir avec méthode — sans disperser les ressources, sans subir les audits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
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

        {/* Marquee — tous les référentiels */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">Référentiels</span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent" />
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-white text-sm">
                {tousLesReferentiels.map((ref) => (
                  <span key={ref} className="uppercase tracking-[0.25em] text-xs">{ref}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Secteurs à forts enjeux */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">Secteurs à forts enjeux</h3>
              <span className="text-cyan-500 font-mono text-xs">01 // SECTEURS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sectors.map((sector) => {
                const SectorIcon = sector.Icon;
                return (
                  <div key={sector.name} className="tilt-card group relative z-10 p-1">
                    <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${sector.border} ${sector.glow}`}>
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />

                      {/* En-tête : nom + icône logo */}
                      <div className="flex items-start justify-between mb-6">
                        <h4 className="text-xl font-medium text-white">{sector.name}</h4>
                        <div className={`p-2 rounded-lg border ${sector.badgeBg}`}>
                          <SectorIcon className={`w-5 h-5 ${sector.accent}`} />
                        </div>
                      </div>

                      {/* Enjeux clés */}
                      <div className="mb-5">
                        <p className="text-xs text-white uppercase tracking-wide font-semibold mb-3">Enjeux clés</p>
                        <ul className="space-y-2">
                          {sector.enjeux.map((enjeu, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white">
                              <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${sector.accent}`} />
                              {enjeu}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Référentiels populaires */}
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-xs text-white uppercase tracking-wide font-semibold mb-3">Référentiels populaires dans le secteur</p>
                        <div className="flex flex-wrap gap-2">
                          {sector.referentiels.map((ref) => (
                            <span key={ref} className={`px-2.5 py-1 text-xs font-semibold border rounded-md ${sector.badgeBg}`}>{ref}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Matrice Référentiels × Secteurs */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">Matrice Référentiels × Secteurs</h3>
              <span className="text-cyan-500 font-mono text-xs">02 // MATRICE</span>
            </div>
            <div className="glass-panel rounded-xl border border-white/5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40">
                    <th className="text-left px-6 py-4 font-semibold text-white w-36">Référentiel</th>
                    {matrixCols.map((col) => (
                      <th key={col.key} className={`text-center px-3 py-4 font-semibold ${col.accent}`}>{col.label}</th>
                    ))}
                    <th className="text-left px-6 py-4 font-semibold text-white hidden xl:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={row.referentiel} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{row.referentiel}</td>
                      {matrixCols.map((col) => (
                        <td key={col.key} className="text-center px-3 py-4">
                          {(row as Record<string, unknown>)[col.key]
                            ? <CheckCircle className={`w-4 h-4 mx-auto ${col.accent}`} />
                            : <span className="text-white/20 text-lg">—</span>}
                        </td>
                      ))}
                      <td className="px-6 py-4 text-white text-xs hidden xl:table-cell">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Votre secteur, vos obligations
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Un diagnostic personnalisé identifie précisément les référentiels applicables et priorise les actions à mener.
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

        <Footer />
      </div>
    </div>
  );
}
