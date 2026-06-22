'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const services = [
  {
    name: 'Audit de Configuration',
    tag: 'TECHNIQUE',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    tags: ['CIS', 'ANSSI', 'Cloud', 'Réseau'],
    description: 'Vérification systématique des paramètres systèmes, équipements réseau et services cloud. Identification des écarts par rapport aux référentiels CIS, ANSSI et constructeurs.',
    enjeu: 'Un écart de configuration peut invalider une certification ou déclencher un audit réglementaire.',
    href: '/gouvernance-conformite/audits',
  },
  {
    name: 'Audit d\'Architecture',
    tag: 'INFRASTRUCTURE',
    accent: 'text-teal-400',
    border: 'border-teal-500/30',
    glow: 'shadow-[0_0_15px_rgba(20,184,166,0.1)]',
    badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    tags: ['Cloisonnement', 'Flux', 'Zones de confiance'],
    description: 'Analyse de la robustesse et de la cohérence de votre infrastructure globale. Cloisonnement, flux, exposition, single points of failure et zones de confiance.',
    enjeu: 'Une architecture non cloisonnée est incompatible avec les exigences NIS2 et ISO 27001.',
    href: '/gouvernance-conformite/audits',
  },
  {
    name: 'Audit de Code Source',
    tag: 'APPLICATIF',
    accent: 'text-green-400',
    border: 'border-green-500/30',
    glow: 'shadow-[0_0_15px_rgba(34,197,94,0.1)]',
    badgeBg: 'bg-green-500/10 text-green-300 border-green-500/20',
    tags: ['SAST', 'Injections', 'Cryptographie', 'Secrets'],
    description: 'Revue sécurité du code applicatif avant mise en production. Détection des vulnérabilités logicielles, injections, mauvaises pratiques cryptographiques et secrets exposés.',
    enjeu: 'Les failles de code sont la première cause de violation de données déclarées sous RGPD.',
    href: '/gouvernance-conformite/audits',
  },
  {
    name: 'Audit Flash',
    tag: 'URGENCE',
    accent: 'text-lime-400',
    border: 'border-lime-500/30',
    glow: 'shadow-[0_0_15px_rgba(132,204,22,0.1)]',
    badgeBg: 'bg-lime-500/10 text-lime-300 border-lime-500/20',
    tags: ['48-72h', 'Appel d\'offres', 'Assurance cyber'],
    description: 'Diagnostic rapide pour répondre à une urgence réglementaire, un appel d\'offres ou une demande d\'assurance cyber. Livrable structuré en 48–72h.',
    enjeu: 'Répondre à une exigence de partenaire ou d\'assureur dans les délais impartis.',
    href: '/audit-flash',
  },
  {
    name: 'Restitution COMEX',
    tag: 'GOUVERNANCE',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    tags: ['COMEX', 'Direction', 'Risques priorisés'],
    description: 'Présentation exécutive des résultats, risques priorisés et feuille de route de remédiation. Format conçu pour les décideurs non-techniques.',
    enjeu: 'La direction doit être en capacité de valider les investissements sécurité sur des bases factuelles.',
    href: '/gouvernance-conformite/accompagnement',
  },
  {
    name: 'Documentation Conformité',
    tag: 'LIVRABLES',
    accent: 'text-sky-400',
    border: 'border-sky-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    tags: ['NIS2', 'ISO 27001', 'DORA', 'RGPD'],
    description: 'Livrables certifiables adaptés à NIS2, ISO 27001, DORA et aux exigences des assureurs cyber. Preuves de diligence raisonnable pour vos partenaires et investisseurs.',
    enjeu: 'Sans documentation structurée, toute certification ou conformité réglementaire est impossible.',
    href: '/gouvernance-conformite/accompagnement',
  },
];

const refMatrix = [
  { referentiel: 'NIS2', config: true, archi: true, code: false, flash: true, comex: true, doc: true, description: 'Directive européenne sécurité des réseaux et systèmes d\'information' },
  { referentiel: 'ISO 27001', config: true, archi: true, code: true, flash: true, comex: true, doc: true, description: 'Système de Management de la Sécurité de l\'Information' },
  { referentiel: 'DORA', config: true, archi: true, code: false, flash: true, comex: true, doc: true, description: 'Digital Operational Resilience Act (secteur financier)' },
  { referentiel: 'RGPD', config: false, archi: true, code: true, flash: true, comex: false, doc: true, description: 'Règlement Général sur la Protection des Données' },
  { referentiel: 'HDS', config: true, archi: true, code: true, flash: false, comex: false, doc: true, description: 'Hébergeur de Données de Santé' },
  { referentiel: 'EBIOS RM', config: false, archi: true, code: false, flash: false, comex: true, doc: true, description: 'Méthode d\'analyse de risques ANSSI' },
];

export default function ExigencesReglementairesPage() {
  return (
    <div className="relative min-h-screen antialiased text-white selection:bg-emerald-500 selection:text-black" style={{ background: '#030303' }}>
      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Breadcrumb */}
        <section className="pt-28 pb-0 px-6">
          <div className="max-w-7xl mx-auto">
            <a href="/cybersecurite-operationnelle" className="inline-flex items-center gap-2 text-sm text-white hover:text-emerald-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Cybersécurité Opérationnelle
            </a>
          </div>
        </section>

        {/* Hero */}
        <section className="relative pt-8 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-emerald-400 tracking-[0.2em] text-xs uppercase mb-4">
                Cybersécurité Opérationnelle — Pilier 3
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter leading-[0.9] mb-6 mix-blend-screen">
                Audit de Conformité &amp; Cybersécurité Réglementaire
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-emerald-500 pl-6 text-left mb-6">
                Partenaires, assureurs, investisseurs et régulateurs exigent des preuves concrètes de votre maturité cyber. Ce pilier vous équipe pour répondre à ces exigences avec des livrables directement exploitables — sans improvisation de dernière minute.
              </p>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-emerald-400">Référentiels</span>
              <div className="h-px w-12 bg-gradient-to-r from-emerald-500/60 to-transparent" />
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-white text-sm">
                {['NIS2', 'ISO 27001', 'DORA', 'RGPD', 'HDS', 'EBIOS RM', 'TISAX', 'Audit', 'Conformité', 'ANSSI'].map((s) => (
                  <span key={s} className="uppercase tracking-[0.25em] text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Audit Cybersécurité & Conformité : Services pour PME et ETI</h2>
              <span className="text-emerald-500 font-mono text-xs">01 // SERVICES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <a key={service.name} href={service.href} className="tilt-card group relative z-10 p-1">
                  <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${service.border} ${service.glow} hover:border-opacity-60 transition-all`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-medium text-white">{service.name}</h3>
                      <span className={`px-2.5 py-1 text-xs font-bold border rounded-md ${service.badgeBg}`}>{service.tag}</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed mb-5">{service.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.tags.map((tag) => (
                        <span key={tag} className={`px-2.5 py-1 text-xs font-semibold border rounded-md ${service.badgeBg}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-white uppercase tracking-wide mb-1 font-semibold">Enjeu clé</p>
                      <p className="text-sm text-white leading-relaxed">{service.enjeu}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Matrice référentiels */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h2 className="text-4xl font-light text-white tracking-tight">Conformité Cybersécurité : Référentiels couverts par Audit</h2>
              <span className="text-emerald-500 font-mono text-xs">02 // CONFORMITÉ</span>
            </div>
            <div className="glass-panel rounded-xl border border-white/5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40">
                    <th className="text-left px-6 py-4 font-semibold text-white w-36">Référentiel</th>
                    <th className="text-center px-3 py-4 font-semibold text-emerald-400">Config.</th>
                    <th className="text-center px-3 py-4 font-semibold text-teal-400">Archi.</th>
                    <th className="text-center px-3 py-4 font-semibold text-green-400">Code</th>
                    <th className="text-center px-3 py-4 font-semibold text-lime-400">Flash</th>
                    <th className="text-center px-3 py-4 font-semibold text-cyan-400">COMEX</th>
                    <th className="text-center px-3 py-4 font-semibold text-sky-400">Doc.</th>
                    <th className="text-left px-6 py-4 font-semibold text-white hidden lg:table-cell">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {refMatrix.map((row, i) => (
                    <tr key={row.referentiel} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-white">{row.referentiel}</td>
                      <td className="text-center px-3 py-4">{row.config ? <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /> : <span className="text-white text-lg">—</span>}</td>
                      <td className="text-center px-3 py-4">{row.archi ? <CheckCircle className="w-5 h-5 text-teal-400 mx-auto" /> : <span className="text-white text-lg">—</span>}</td>
                      <td className="text-center px-3 py-4">{row.code ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <span className="text-white text-lg">—</span>}</td>
                      <td className="text-center px-3 py-4">{row.flash ? <CheckCircle className="w-5 h-5 text-lime-400 mx-auto" /> : <span className="text-white text-lg">—</span>}</td>
                      <td className="text-center px-3 py-4">{row.comex ? <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" /> : <span className="text-white text-lg">—</span>}</td>
                      <td className="text-center px-3 py-4">{row.doc ? <CheckCircle className="w-5 h-5 text-sky-400 mx-auto" /> : <span className="text-white text-lg">—</span>}</td>
                      <td className="px-6 py-4 text-white text-xs hidden lg:table-cell">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ — Featured Snippets: audit cybersécurité PME */}
        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-light text-white mb-10 tracking-tight">Questions fréquentes — Audit Cybersécurité PME &amp; Conformité</h2>
            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Qu&apos;est-ce qu&apos;un audit cybersécurité pour une PME ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Un audit cybersécurité PME est une évaluation complète de la posture de sécurité d&apos;une entreprise : configurations, architectures réseau, applications et pratiques organisationnelles. Il identifie les écarts par rapport aux référentiels (ISO 27001, NIS2, CIS) et produit un plan de remédiation priorisé pour la direction.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Quel est le prix d&apos;un audit cybersécurité PME en France ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Le coût d&apos;un audit cybersécurité pour une PME française varie entre 3 000 € et 20 000 € selon le périmètre. Un audit flash (48–72h) commence à partir de 1 500 €. SecuriTrust propose des livrables certifiables et COMEX-ready adaptés aux contraintes budgétaires des PME et ETI.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Quels référentiels de conformité s&apos;appliquent aux PME françaises ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">Les PME françaises sont principalement concernées par le RGPD (données personnelles), NIS2 (secteurs essentiels), ISO 27001 (certification volontaire), et DORA (secteur financier). L&apos;ANSSI recommande également le référentiel EBIOS RM pour l&apos;analyse des risques. Un audit de configuration couvre l&apos;ensemble de ces exigences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-emerald-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Préparez votre prochain audit
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Anticipez les exigences réglementaires avec des livrables structurés et exploitables immédiatement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a
                  href="https://calendly.com/expert-securitrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                >
                  Demander un diagnostic
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/cybersecurite-operationnelle"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all"
                >
                  Voir les autres piliers
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
