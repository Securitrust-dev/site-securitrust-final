import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Shield, CheckCircle, ArrowRight, AlertTriangle, FileCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conformité NIS2 — Accompagnement & Audit',
  description: "Accompagnement à la mise en conformité NIS2. Évaluation de votre exposition, plan d'action, audits et gouvernance cybersécurité. SecuriTrust, auditeur AFNOR.",
  alternates: {
    canonical: 'https://securitrust.fr/conformite-nis2',
  },
  openGraph: {
    title: 'Conformité NIS2 — Accompagnement & Audit | SecuriTrust',
    description: "La directive NIS2 s'applique à votre organisation ? SecuriTrust vous accompagne dans votre mise en conformité : analyse d'écart, plan d'action, audit.",
    url: 'https://securitrust.fr/conformite-nis2',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que la directive NIS2 ?',
    answer: 'La directive NIS2 (Network and Information Security 2) est une réglementation européenne entrée en application en octobre 2024. Elle étend et renforce les obligations de cybersécurité pour les entités essentielles et importantes dans les secteurs critiques (énergie, transports, santé, banque, infrastructure numérique, etc.).',
  },
  {
    question: 'Mon organisation est-elle concernée par NIS2 ?',
    answer: 'NIS2 s\'applique aux entités essentielles (EE) et entités importantes (EI) dans 18 secteurs. Les seuils : entreprises de 50+ salariés ou 10M€+ de CA dans les secteurs concernés. Une analyse d\'applicabilité gratuite peut être réalisée par nos experts.',
  },
  {
    question: 'Quelles sont les principales obligations NIS2 ?',
    answer: 'NIS2 impose : une gouvernance cyber (désignation d\'un responsable), une analyse de risques, des mesures de sécurité (authentification forte, chiffrement, gestion des incidents), une notification des incidents sous 24h à l\'ANSSI, et la gestion de la sécurité de la chaîne d\'approvisionnement.',
  },
  {
    question: 'Quelles sont les sanctions en cas de non-conformité NIS2 ?',
    answer: 'Pour les entités essentielles : jusqu\'à 10 M€ ou 2% du CA mondial annuel. Pour les entités importantes : jusqu\'à 7 M€ ou 1,4% du CA mondial. Des sanctions personnelles pour les dirigeants sont également prévues.',
  },
  {
    question: 'Combien de temps faut-il pour se mettre en conformité NIS2 ?',
    answer: 'Selon votre maturité cyber actuelle, la mise en conformité NIS2 prend entre 6 mois (organisation déjà mature) et 18-24 mois (organisation partant de zéro). SecuriTrust vous propose une approche progressive avec priorisation des actions à fort impact.',
  },
];

const ETAPES = [
  {
    num: '01',
    title: 'Analyse d\'applicabilité',
    desc: 'Détermination de votre statut NIS2 (entité essentielle ou importante) et identification des obligations applicables à votre secteur.',
  },
  {
    num: '02',
    title: 'Analyse d\'écart (GAP Analysis)',
    desc: 'Évaluation de votre niveau de conformité actuel par rapport aux exigences NIS2. Identification des écarts et des risques prioritaires.',
  },
  {
    num: '03',
    title: 'Plan d\'action priorisé',
    desc: 'Élaboration d\'une feuille de route de mise en conformité avec actions priorisées selon le risque, les délais et les ressources disponibles.',
  },
  {
    num: '04',
    title: 'Implémentation & accompagnement',
    desc: 'Déploiement des mesures de sécurité : gouvernance, processus de gestion des incidents, sécurité de la chaîne d\'approvisionnement, tests réguliers.',
  },
  {
    num: '05',
    title: 'Audit & vérification',
    desc: 'Audit de conformité NIS2 avec remise d\'un rapport certifié attestant de votre niveau de conformité pour vos obligations déclaratives.',
  },
];

export default function ConformiteNIS2Page() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Conformité NIS2', url: '/conformite-nis2' },
      ]} />
      <ServiceSchema
        name="Conformité NIS2"
        description="Accompagnement à la mise en conformité avec la directive NIS2 : analyse d'applicabilité, GAP analysis, plan d'action et audit."
        url="/conformite-nis2"
      />
      <FAQSchema faqs={FAQ_ITEMS} />

      <div className="fixed inset-0 scanlines pointer-events-none h-screen w-screen" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-void opacity-60" />
        <div className="stars opacity-20" />
      </div>

      <div className="relative z-10">
        <PromoBanner />
        <Navbar />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                Directive UE 2022/2555
              </span>
              <span className="px-3 py-1 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 text-[0.65rem] font-mono uppercase tracking-[0.2em] flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> En vigueur depuis Oct. 2024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Conformité{' '}
              <span className="text-cyan-400">NIS2</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              La directive NIS2 impose de nouvelles obligations de cybersécurité à des milliers d&apos;organisations françaises. SecuriTrust vous accompagne de l&apos;analyse d&apos;applicabilité à la mise en conformité complète.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluation gratuite
              </a>
              <a
                href="/grc-cyber"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                Nos services GRC <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Chiffres clés */}
        <section className="py-12 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: '18', label: 'secteurs concernés' },
                { value: '10M€', label: 'amende max EE' },
                { value: '24h', label: 'notification incident' },
                { value: '+10k', label: 'entités françaises concernées' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-cyan-400">{item.value}</span>
                  <span className="text-xs text-slate-500 font-mono">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Étapes */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Notre accompagnement NIS2
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // MÉTHODOLOGIE</span>
            </div>
            <div className="space-y-4">
              {ETAPES.map((item, i) => (
                <div key={i} className="flex gap-6 glass-panel rounded-xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all">
                  <span className="text-3xl font-bold text-cyan-500/30 font-mono shrink-0">{item.num}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Obligations clés */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Principales obligations NIS2
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // OBLIGATIONS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Gouvernance cyber : désignation d\'un responsable et formation des dirigeants',
                'Analyse de risques et politique de sécurité des systèmes d\'information',
                'Gestion des incidents : détection, réponse et notification ANSSI sous 24h',
                'Continuité d\'activité et plan de reprise après sinistre (PCA/PRA)',
                'Sécurité de la chaîne d\'approvisionnement (tiers, fournisseurs)',
                'Authentification multi-facteurs (MFA) et gestion des accès',
                'Chiffrement des données sensibles en transit et au repos',
                'Tests réguliers d\'efficacité des mesures de sécurité (pentest)',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 glass-panel rounded-lg p-4 border border-white/5">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Questions fréquentes sur NIS2
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">03 // FAQ</span>
            </div>
            <div className="space-y-6">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="glass-panel rounded-xl p-6 border border-white/5">
                  <h3 className="text-white font-semibold mb-3">{item.question}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-panel rounded-2xl p-12 border border-white/10">
              <FileCheck className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Êtes-vous concerné par NIS2 ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Nos experts réalisent gratuitement une analyse d&apos;applicabilité NIS2 pour votre organisation. Résultat sous 48h.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Analyser mon applicabilité
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="conformite-nis2" />
        <Footer />
      </div>
    </div>
  );
}
