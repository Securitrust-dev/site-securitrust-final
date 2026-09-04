import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Compass, Users, BarChart3, BadgeCheck, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pilotage SMSI — Système de Management de la Sécurité de l\'Information',
  description: 'Pilotage externalisé de votre SMSI : politique de sécurité, animation du Comité Sécurité (COSEC), gestion des risques, indicateurs et maintien en condition ISO 27001. SecuriTrust.',
  alternates: {
    canonical: 'https://www.securitrust.fr/pilotage-smsi',
  },
  openGraph: {
    title: 'Pilotage SMSI — Système de Management de la Sécurité de l\'Information | SecuriTrust',
    description: 'Confiez le pilotage de votre SMSI à un expert : gouvernance, COSEC, gestion des risques, indicateurs et maintien en condition opérationnelle.',
    url: 'https://www.securitrust.fr/pilotage-smsi',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce qu\'un SMSI ?',
    answer: 'Le Système de Management de la Sécurité de l\'Information (SMSI) est le cadre de gouvernance défini par ISO 27001 : politiques, processus, rôles et responsabilités permettant de piloter la sécurité de l\'information de façon continue, et non ponctuelle.',
  },
  {
    question: 'Le pilotage SMSI est-il inclus dans l\'offre RSSI externalisé ?',
    answer: 'Oui, le pilotage SMSI est l\'un des piliers de notre offre de RSSI à temps partagé. Il peut aussi être souscrit de façon autonome pour les organisations qui disposent déjà d\'une fonction sécurité mais souhaitent renforcer le pilotage de leur SMSI.',
  },
  {
    question: 'Le pilotage SMSI suffit-il pour être certifié ISO 27001 ?',
    answer: 'Le pilotage SMSI maintient et fait vivre le système au quotidien, mais la certification nécessite en amont un projet de mise en conformité dédié (analyse d\'écart, traitement des risques, déploiement des contrôles) avant l\'audit de certification.',
  },
  {
    question: 'Quelle est la différence entre pilotage SMSI et audit ISO 27001 ?',
    answer: 'Le pilotage SMSI est un service récurrent qui anime et fait évoluer votre gouvernance sécurité dans la durée. L\'audit ISO 27001 est une évaluation ponctuelle de conformité, réalisée en amont d\'une certification ou dans le cadre d\'un audit interne périodique.',
  },
  {
    question: 'Combien de temps par mois faut-il consacrer au pilotage SMSI ?',
    answer: 'Le volume type varie de 2 à 8 jours par mois selon la taille de l\'organisation et la maturité du SMSI existant, calibré lors du cadrage initial et ajustable selon les besoins.',
  },
];

const PILIERS = [
  { icon: Compass, num: '01', title: 'Politique & gouvernance', desc: 'Définition et suivi de la Politique de Sécurité des Systèmes d\'Information (PSSI) et des rôles/responsabilités.' },
  { icon: Users, num: '02', title: 'Comité Sécurité (COSEC)', desc: 'Animation régulière du Comité Sécurité : arbitrages, décisions et reporting à la direction.' },
  { icon: BarChart3, num: '03', title: 'Risques & indicateurs', desc: 'Gestion des risques (EBIOS RM / ISO 27005) et suivi d\'un tableau de bord d\'indicateurs sécurité.' },
  { icon: BadgeCheck, num: '04', title: 'Maintien en condition', desc: 'Revues périodiques, audits internes et préparation des audits de certification (ISO 27001, TISAX...).' },
];

export default function PilotageSmsiPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Gouvernance & Conformité', url: '/gouvernance-conformite' },
        { name: 'Services Externalisés', url: '/gouvernance-conformite/services-externalises' },
        { name: 'Pilotage SMSI', url: '/pilotage-smsi' },
      ]} />
      <ServiceSchema
        name="Pilotage SMSI"
        description="Pilotage externalisé du Système de Management de la Sécurité de l'Information : gouvernance, animation du COSEC, gestion des risques, indicateurs et maintien en condition opérationnelle."
        url="/pilotage-smsi"
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
                Gouvernance Continue
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                ISO 27001
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Pilotage{' '}
              <span className="text-cyan-400">SMSI</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Le SMSI est le cœur d&apos;ISO 27001, mais peu d&apos;organisations ont les ressources dédiées pour l&apos;animer au quotidien. SecuriTrust pilote votre système de management de la sécurité dans la durée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Discuter du pilotage SMSI
              </a>
              <a
                href="/rssi-externalise"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                Notre offre RSSI Externalisé <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Piliers */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Les 4 piliers du pilotage SMSI
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // PILIERS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PILIERS.map((item, i) => (
                <div key={i} className="glass-panel rounded-xl p-7 border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <item.icon className="w-7 h-7 text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-500/50">{item.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modalités */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white tracking-tight">Ce que couvre notre pilotage SMSI</h2>
                <p className="text-slate-500 text-sm mt-2">Une gouvernance vivante, pas un classeur qui prend la poussière</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // MODALITÉS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  'Définition et suivi de la politique de sécurité',
                  'Animation du Comité Sécurité (COSEC)',
                  'Gestion des risques (EBIOS RM / ISO 27005)',
                  'Suivi des indicateurs et tableau de bord RSSI',
                  'Préparation et suivi des certifications (ISO 27001, TISAX...)',
                  'Gestion des incidents et crises de sécurité',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 bg-cyan-500/5">
                <BadgeCheck className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Modalités d&apos;intervention</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Temps partiel mensuel', value: '2 à 8 jours/mois selon les besoins' },
                    { label: 'Engagement', value: 'Contrat de service mensuel résiliable' },
                    { label: 'Format', value: 'Présentiel + distanciel' },
                    { label: 'Livrables', value: 'Tableau de bord, comptes-rendus COSEC, rapports de risques' },
                  ].map((m) => (
                    <div key={m.label} className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">{m.label}</span>
                      <span className="text-white font-medium text-right ml-4">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Questions fréquentes sur le pilotage SMSI
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
              <Compass className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Votre SMSI a-t-il un pilote ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Un échange de 30 minutes suffit pour cadrer le niveau de pilotage adapté à votre organisation et à votre niveau de maturité.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Discuter du pilotage SMSI
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="pilotage-smsi" />
        <Footer />
      </div>
    </div>
  );
}
