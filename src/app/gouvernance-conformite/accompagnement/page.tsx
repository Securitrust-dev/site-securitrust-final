'use client';

import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { CheckCircle, ArrowRight, ArrowLeft, Box, Cpu } from 'lucide-react';

const conformiteComplete = [
  {
    title: 'ISO 27001',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    description: 'Certification internationale du Système de Management de la Sécurité de l\'Information.',
    etapes: ['Analyse d\'écart initiale', 'Définition du périmètre SMSI', 'Traitement des risques', 'Déploiement des contrôles', 'Audit de certification'],
    duree: '6 à 18 mois',
    cible: 'Toute organisation souhaitant démontrer sa maturité sécurité',
  },
  {
    title: 'TISAX',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    description: 'Certification obligatoire pour les fournisseurs de l\'industrie automobile traitant des données sensibles.',
    etapes: ['Enregistrement ENX', 'Auto-évaluation VDA ISA', 'Plan de remédiation', 'Audit TISAX accrédité', 'Label et partage des résultats'],
    duree: '3 à 9 mois',
    cible: 'Équipementiers, fournisseurs rang 1 et 2 du secteur auto',
  },
  {
    title: 'HDS',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    description: 'Certification française pour l\'hébergement de données de santé à caractère personnel.',
    etapes: ['Cadrage périmètre HDS', 'Mise en conformité ISO 27001 + HDS', 'Qualification des services', 'Audit de certification', 'Maintien en condition'],
    duree: '6 à 12 mois',
    cible: 'ESN, éditeurs, hébergeurs traitant des données de santé',
  },
  {
    title: 'DORA',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    description: 'Règlement européen sur la résilience opérationnelle numérique du secteur financier.',
    etapes: ['Cartographie des actifs critiques', 'Politique ICT Risk', 'Gestion des tiers critiques', 'Tests de résilience (TLPT)', 'Reporting incident'],
    duree: '4 à 12 mois',
    cible: 'Banques, assurances, prestataires ICT critiques',
  },
];

const etapesMethodologie = [
  "Analyse d'écart initiale avec élaboration du plan d'action",
  "Élaboration des règles de sécurité et gouvernance (PSSI, analyse de risques…)",
  "Rédaction des procédures opérationnelles",
  "Formalisation des preuves de conformité",
  "Audit final de validation",
];

const livrables = [
  {
    title: 'Analyse de risques EBIOS RM',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.1)]',
    contenu: "Identification structurée des scénarios de risques cyber selon la méthode de référence ANSSI. Le rapport couvre la cartographie des valeurs métier, l'identification des sources de risques, la modélisation des scénarios stratégiques et opérationnels, et le plan de traitement du risque.",
    casUsage: "Homologation RGS, conformité NIS2, préparation à la certification ISO 27001, réponse aux exigences des donneurs d'ordre OIV/OSE, appels d'offres publics.",
  },
  {
    title: 'PSSI',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    glow: 'shadow-[0_0_15px_rgba(118,166,209,0.1)]',
    contenu: "Politique de Sécurité des Systèmes d'Information définissant les règles, responsabilités et engagements de l'organisation en matière de protection de l'information. Adaptée au contexte métier, elle couvre la gouvernance, la gestion des accès, la continuité et la gestion des incidents.",
    casUsage: "Prérequis ISO 27001 (contrôle A.5.1), conformité DORA, réponse aux questionnaires de qualification fournisseurs, documentation de maturité sécurité à destination des clients et partenaires.",
  },
  {
    title: 'PCA',
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]',
    contenu: "Plan de Continuité d'Activité documentant les procédures de maintien et de reprise des processus critiques en situation de crise. Inclut l'analyse d'impact métier (BIA), les seuils RTO/RPO, les stratégies de continuité et les procédures de test.",
    casUsage: "Exigence réglementaire DORA (résilience opérationnelle numérique), conformité ISO 22301, conditions d'éligibilité à certaines couvertures d'assurance cyber, contractualisation avec des donneurs d'ordre exigeants.",
  },
  {
    title: 'Exercice de crise cyber',
    accent: 'text-rose-400',
    border: 'border-rose-500/30',
    glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]',
    contenu: "Simulation d'un scénario de crise cyber (ransomware, intrusion, fuite de données) impliquant les équipes dirigeantes, techniques et métier. Le livrable comprend le scénario de jeu, le compte-rendu d'exercice et le plan d'amélioration.",
    casUsage: "Validation opérationnelle du PCA, exigence NIS2 (article 21), tests de résilience DORA, préparation aux audits de certification, sensibilisation des instances dirigeantes.",
  },
  {
    title: 'Registre RGPD',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    contenu: "Registre des activités de traitement conforme à l'article 30 du RGPD, documentant les finalités, les bases légales, les catégories de données, les durées de conservation et les transferts hors Union européenne.",
    casUsage: "Obligation légale pour tout responsable de traitement, préparation aux contrôles CNIL, réponse aux demandes d'exercice des droits, gestion contractuelle des sous-traitants.",
  },
  {
    title: 'Politique de gestion des incidents',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    contenu: "Procédure formalisée de détection, qualification, escalade et notification des incidents de sécurité. Intègre les obligations légales de signalement à l'ANSSI, à la CNIL et aux autorités sectorielles, avec les délais réglementaires applicables.",
    casUsage: "Conformité NIS2 (notification 24h/72h), reporting DORA, obligations RGPD (article 33), prérequis ISO 27001 (contrôle A.16), exigences contractuelles clients et partenaires.",
  },
  {
    title: 'Registre fournisseurs (RoI)',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
    contenu: "Inventaire structuré des prestataires et sous-traitants ayant accès aux actifs ou aux données de l'organisation, accompagné de la classification du risque tiers, de l'évaluation des mesures de sécurité et des clauses contractuelles applicables.",
    casUsage: "Gestion des tiers ICT critiques (DORA), cartographie des risques fournisseurs (ISO 27001 A.15), conformité RGPD pour les sous-traitants, qualification des prestataires dans le cadre de NIS2.",
  },
];

const tousLesReferentiels = [
  'ISO 27001', 'RGPD', 'DORA', 'NIS2', 'IA Act', 'TISAX',
  'Part-IS', 'AirCyber', 'EBIOS RM', 'HDS', 'HIPAA', 'ISO 22301',
  'ISO 27701', 'ISO 42001', "Guide d'Hygiène", 'ISO 21434',
];

export default function AccompagnementPage() {
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
                ACCOMPAGNEMENT
              </h1>
              <p className="text-lg md:text-xl text-white font-light tracking-wide border-l-2 border-cyan-500 pl-6 text-left mb-8">
                Notre cabinet de conseil en sécurité des systèmes d&apos;information s&apos;appuie ainsi sur une méthodologie d&apos;accompagnement éprouvée, adaptable à différents cadres réglementaires ou normatifs, afin de structurer efficacement la démarche de conformité et de préparer, lorsque nos clients le souhaitent, l&apos;obtention d&apos;une certification dans les meilleures conditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                  Je souscris à mon accompagnement
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact?service=audit" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                  Je souscris à mon audit
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee — Référentiels */}
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

        {/* Accompagnement — méthodologie */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-start justify-between mb-12 border-b border-white/10 pb-4 gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Accompagnement de bout en bout ou partiel jusqu&apos;à la conformité normative et/ou règlementaire
                </h3>
              </div>
              <span className="text-cyan-500 font-mono text-xs whitespace-nowrap shrink-0 mt-1">01 // CERTIFICATION</span>
            </div>

            {/* 5 étapes */}
            <div className="mb-20">
              <p className="text-white mb-10 max-w-3xl">
                Nous vous accompagnons dans toutes les étapes de la mise en conformité pendant une période estimée entre 6 et 12 mois :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {etapesMethodologie.map((etape, i) => (
                  <div key={i} className="relative">
                    <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 h-full">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-4">
                        <span className="text-cyan-400 text-sm font-bold">{i + 1}</span>
                      </div>
                      <p className="text-sm text-white leading-relaxed">{etape}</p>
                    </div>
                    {i < 4 && (
                      <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-4 h-4 text-cyan-500/40" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {conformiteComplete.map((item) => (
                <div key={item.title} className="tilt-card group relative z-10 p-1">
                  <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${item.border} ${item.glow}`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                    <h4 className={`text-2xl font-bold mb-3 ${item.accent}`}>{item.title}</h4>
                    <p className="text-sm text-white leading-relaxed mb-6">{item.description}</p>
                    <p className="text-xs text-white uppercase tracking-wide font-semibold mb-3">Étapes clés</p>
                    <ol className="space-y-2 mb-6">
                      {item.etapes.map((e, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-white">
                          <span className={`w-5 h-5 rounded-full bg-black/50 border text-xs flex items-center justify-center flex-shrink-0 mt-0.5 ${item.border} ${item.accent}`}>{idx + 1}</span>
                          {e}
                        </li>
                      ))}
                    </ol>
                    <div className="border-t border-white/10 pt-4 flex flex-wrap gap-4">
                      <div className="text-xs"><span className="text-white">Durée : </span><span className="text-white font-semibold">{item.duree}</span></div>
                      <div className="text-xs"><span className="text-white">Cible : </span><span className="text-white">{item.cible}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intérêt d'une certification */}
        <section className="py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="glass-panel p-8 rounded-2xl border border-cyan-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Intérêt d&apos;une certification</h3>
                  <p className="text-white leading-relaxed mb-3">
                    La certification n&apos;est pas une fin en soi, c&apos;est un levier commercial. Une certification ouvre la porte à des marchés et donneurs d&apos;ordre importants.
                  </p>
                  <p className="text-white leading-relaxed">
                    Engager une certification permet également de créer une dynamique interne bénéfique pour assurer une mise en conformité règlementaire continue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="py-12 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                Je souscris à mon accompagnement
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/contact?service=audit" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                Je souscris à mon audit
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Livrables */}
        <section className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-start justify-between mb-16 border-b border-white/10 pb-4 gap-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                  Exemples de livrables réalisés dans le cadre d&apos;une mise en conformité
                </h3>
              </div>
              <span className="text-cyan-500 font-mono text-xs whitespace-nowrap shrink-0 mt-1">02 // LIVRABLES</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {livrables.map((item) => (
                <div key={item.title} className="tilt-card group relative z-10 p-1">
                  <div className={`glass-panel h-full p-8 rounded-xl relative overflow-hidden ${item.border} ${item.glow}`}>
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
                    <h4 className={`text-xl font-bold mb-5 ${item.accent}`}>{item.title}</h4>
                    <div className="mb-5">
                      <p className="text-xs text-white uppercase tracking-wide font-semibold mb-2">Contenu du livrable</p>
                      <p className="text-sm text-white leading-relaxed">{item.contenu}</p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-white uppercase tracking-wide font-semibold mb-2">Exemples de cas d&apos;usage</p>
                      <p className="text-sm text-white leading-relaxed">{item.casUsage}</p>
                    </div>
                  </div>
                </div>
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
                    La conformité n&apos;est pas une fin en soi — c&apos;est un levier commercial. Une certification ISO 27001 ou TISAX ouvre des marchés fermés. Un PCA solide rassure les assureurs et réduit les primes. Une conformité DORA documentée évite les sanctions et les pertes de contrats.
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
                Quel niveau de conformité vous correspond ?
              </h2>
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto relative z-10">
                Un échange de 30 minutes suffit à identifier le bon niveau d&apos;engagement et le chemin le plus direct vers votre objectif.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a href="/contact?service=accompagnement" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(118,166,209,0.3)]">
                  Je souscris à mon accompagnement
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/contact?service=audit" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded font-medium tracking-widest uppercase transition-all">
                  Je souscris à mon audit
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
