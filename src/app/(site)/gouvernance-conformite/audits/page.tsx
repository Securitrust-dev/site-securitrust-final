'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft, Box, Cpu } from 'lucide-react';

const typeAudits = [
  {
    id: '01',
    href: '/gap-analysis',
    title: 'Audit d\'Écart (Gap Analysis)',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    accroche: 'Identifiez vos non-conformités avant l\'auditeur externe.',
    description: 'L\'audit d\'écart compare l\'état actuel de votre organisation aux exigences d\'un référentiel cible (ISO 27001, TISAX, DORA, HDS...). Le résultat est un plan d\'action priorisé, chiffré et réaliste.',
    livrables: [
      'Rapport d\'écart structuré par domaine',
      'Cartographie visuelle de la couverture des contrôles',
      'Plan d\'action priorisé (court / moyen / long terme)',
      'Estimation de l\'effort de mise en conformité',
    ],
    usage: 'Préparer une certification, répondre à une demande client ou assureur, piloter la roadmap sécurité.',
  },
  {
    id: '02',
    href: '/evaluation-maturite',
    title: 'Évaluation de Maturité',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    accroche: 'Savoir où vous en êtes pour décider où aller.',
    description: 'Une évaluation de maturité mesure le niveau de votre organisation sur une échelle structurée (CMM, CMMI ou grille propriétaire SecuriTrust) sur l\'ensemble des domaines de la sécurité.',
    livrables: [
      'Score de maturité par domaine (radar chart)',
      'Positionnement sectoriel et benchmarking',
      'Recommandations de montée en maturité',
      'Restitution COMEX/CODIR disponible',
    ],
    usage: 'Pilotage de la stratégie sécurité, tableau de bord RSSI, présentation aux investisseurs ou assureurs.',
  },
  {
    id: '03',
    href: '/audit-configuration',
    title: 'Audit de Configuration',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    accroche: 'Un mauvais paramètre peut coûter plus cher qu\'une attaque.',
    description: 'Vérification de la conformité des configurations systèmes, réseaux et cloud aux référentiels CIS Benchmarks, ANSSI et bonnes pratiques sectorielles. Chaque écart est documenté et priorisé.',
    livrables: [
      'Rapport de configuration par actif audité',
      'Grille de conformité CIS / ANSSI',
      'Liste des écarts critiques et remédiation',
      'Scripts de correction fournis si applicable',
    ],
    usage: 'Audit périodique, préparation pentest, conformité DORA (ICT Risk), certification ISO 27001.',
  },
  {
    id: '04',
    href: '/audit-architecture',
    title: 'Audit d\'Architecture',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    accroche: 'Une architecture mal conçue est une vulnérabilité structurelle.',
    description: 'Analyse des choix d\'architecture (segmentation réseau, flux de données, modèle de confiance, IAM, cloud) au regard des bonnes pratiques et des exigences réglementaires.',
    livrables: [
      'Schéma d\'architecture annoté',
      'Analyse des flux et des surfaces d\'attaque',
      'Recommandations architecturales priorisées',
      'Conformité aux principes Zero Trust si applicable',
    ],
    usage: 'Migration cloud, refonte SI, préparation audit de certification, homologation.',
  },
  {
    id: '05',
    href: '/audit-code-source',
    title: 'Audit de Code Source',
    accent: 'text-rose-400',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]',
    accroche: 'La sécurité d\'une application commence dans le code.',
    description: 'Revue manuelle et outillée du code source pour identifier les vulnérabilités (OWASP Top 10, injections, gestion des secrets, logique métier) et les mauvaises pratiques de développement sécurisé.',
    livrables: [
      'Rapport de vulnérabilités avec gravité CVSS',
      'Extraction des secrets et credentials exposés',
      'Recommandations de correction avec exemples de code',
      'Conformité OWASP SAMM si demandée',
    ],
    usage: 'Due diligence M&A, mise en production critique, certification PCI-DSS, conformité IA Act.',
  },
  {
    id: '06',
    href: '/audit-flash',
    title: 'Audit Flash',
    accent: 'text-sky-400',
    border: 'border-sky-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    accroche: 'Une photographie rapide pour décider vite.',
    description: 'Audit accéléré (2 à 5 jours) couvrant les principaux risques sur un périmètre défini. Idéal pour les décisions rapides : appel d\'offres imminent, incident récent, nouveau RSSI, levée de fonds.',
    livrables: [
      'Rapport exécutif synthétique (10 à 20 pages)',
      'Top 5 des risques critiques à adresser',
      'Quick wins identifiés et actionnables',
      'Recommandation sur la suite à donner',
    ],
    usage: 'Prise de poste RSSI, appel d\'offres avec délai court, audit post-incident, préparation levée de fonds.',
  },
];

export default function AuditsPage() {
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
                AUDITS
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-6">
                Auditer, c&apos;est décider en connaissance de cause. Chaque audit produit un livrable actionnable — pas un rapport de plus qui prend la poussière. L&apos;objectif : identifier les écarts, prioriser les actions, réduire le risque.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 mt-12 mb-10">
              {[
                { value: '6', label: 'types d\'audits' },
                { value: '48h', label: 'délai restitution Audit Flash' },
                { value: '100%', label: 'livrables actionnables' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-xs text-white mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </section>

        {/* Marquee */}
        <section className="relative z-10 border-y border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-10 overflow-hidden">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-cyan-400">Périmètres</span>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-500/60 to-transparent" />
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-10 items-center whitespace-nowrap animate-marquee text-white text-sm">
                {['Gap Analysis', 'Maturité CMMI', 'Configuration CIS', 'Architecture Zero Trust', 'Code Source OWASP', 'Audit Flash', 'ISO 27001', 'DORA ICT Risk'].map((ref) => (
                  <span key={ref} className="uppercase tracking-[0.25em] text-xs">{ref}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Audits grid */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
              <h3 className="text-4xl font-light text-white tracking-tight">Nos types d&apos;audit</h3>
              <span className="text-cyan-500 font-mono text-xs">01 // AUDITS</span>
            </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {typeAudits.map((audit) => (
                  <a key={audit.id} href={audit.href} className="tilt-card group relative z-10 p-1 block cursor-pointer">
                    <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${audit.border} ${audit.glow} group-hover:border-opacity-60 transition-all`}>
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                      <div className="flex items-start justify-between mb-4">
                        <h4 className={`text-lg font-bold ${audit.accent}`}>{audit.title}</h4>
                        <ArrowRight className={`w-4 h-4 ${audit.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                      </div>
                    <p className="text-sm text-white leading-relaxed">{audit.description}</p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* Logique métier */}
        <section className="py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold mb-2">Logique métier</p>
                  <p className="text-white leading-relaxed">
                    Un audit bien mené précède toujours un incident évité. La valeur n&apos;est pas dans le rapport lui-même, mais dans les décisions qu&apos;il rend possibles : arbitrages budgétaires fondés sur les risques réels, priorisation des correctifs, validation d&apos;une architecture avant déploiement. L&apos;audit est la base de tout pilotage sécurité crédible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="glass-panel p-12 rounded-2xl border-2 border-cyan-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight relative z-10">
                Quel audit correspond à votre situation ?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Pour une urgence : l&apos;Audit Flash répond sous 48h. Pour un projet structuré : un premier échange permet de cadrer le bon périmètre.
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
