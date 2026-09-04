import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Search, ClipboardList, BarChart3, ListChecks, CheckCircle, ArrowRight, Map } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Audit d\'Écart (Gap Analysis) — Cartographie de vos Non-Conformités',
  description: 'Gap Analysis / audit d\'écart face à un référentiel cible (ISO 27001, TISAX, DORA, HDS, NIS2...) : rapport structuré, plan d\'action priorisé et chiffré. SecuriTrust.',
  alternates: {
    canonical: 'https://www.securitrust.fr/gap-analysis',
  },
  openGraph: {
    title: 'Audit d\'Écart (Gap Analysis) — Cartographie de vos Non-Conformités | SecuriTrust',
    description: 'Comparez votre état actuel aux exigences d\'un référentiel cible et obtenez un plan d\'action priorisé et chiffré.',
    url: 'https://www.securitrust.fr/gap-analysis',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce qu\'un audit d\'écart (Gap Analysis) ?',
    answer: 'Un audit d\'écart compare l\'état actuel de votre organisation aux exigences d\'un référentiel cible (ISO 27001, TISAX, DORA, HDS, NIS2...). Il identifie précisément ce qui manque, ce qui est partiellement couvert et ce qui est déjà conforme, sans se prononcer sur la certification elle-même.',
  },
  {
    question: 'Quelle différence avec un audit de conformité ou un pentest ?',
    answer: 'La Gap Analysis évalue l\'écart documentaire et organisationnel par rapport à un référentiel normatif ou réglementaire précis. L\'audit de conformité couvre un périmètre réglementaire plus large, et le pentest teste techniquement la résistance de votre SI aux attaques — les trois approches sont complémentaires.',
  },
  {
    question: 'Combien de temps dure une Gap Analysis ?',
    answer: 'Selon le référentiel et le périmètre, une Gap Analysis se déroule généralement sur 1 à 3 semaines : entretiens avec les parties prenantes, revue documentaire, cartographie des écarts par domaine et restitution du plan d\'action.',
  },
  {
    question: 'Sur quels référentiels réalisez-vous des Gap Analysis ?',
    answer: 'Nous réalisons des audits d\'écart sur ISO 27001, TISAX, HDS, DORA, NIS2, RGPD et sur des référentiels propriétaires (cahiers des charges clients, exigences donneur d\'ordre). Le format s\'adapte à la structure du référentiel cible.',
  },
  {
    question: 'Que faire après une Gap Analysis ?',
    answer: 'Le plan d\'action priorisé issu de la Gap Analysis alimente directement un programme de mise en conformité (accompagnement à la certification) ou un audit de configuration/architecture pour les écarts techniques identifiés.',
  },
];

const METHODOLOGIE = [
  { icon: Search, num: '01', title: 'Cadrage du référentiel cible', desc: 'Définition précise du référentiel applicable (ISO 27001, TISAX, DORA, HDS...) et du périmètre organisationnel concerné.' },
  { icon: ClipboardList, num: '02', title: 'Entretiens & collecte de preuves', desc: 'Entretiens avec les parties prenantes et revue documentaire : politiques, procédures, preuves d\'application des contrôles.' },
  { icon: BarChart3, num: '03', title: 'Analyse des écarts par domaine', desc: 'Comparaison structurée entre l\'état constaté et les exigences du référentiel, domaine par domaine.' },
  { icon: ListChecks, num: '04', title: 'Plan d\'action priorisé', desc: 'Restitution d\'un plan d\'action chiffré, priorisé par effort et impact, prêt à être intégré à votre feuille de route.' },
];

export default function GapAnalysisPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Gouvernance & Conformité', url: '/gouvernance-conformite' },
        { name: 'Audits', url: '/gouvernance-conformite/audits' },
        { name: 'Gap Analysis', url: '/gap-analysis' },
      ]} />
      <ServiceSchema
        name="Audit d'écart (Gap Analysis)"
        description="Comparaison de l'état actuel de votre organisation aux exigences d'un référentiel cible (ISO 27001, TISAX, DORA, HDS...) avec plan d'action priorisé et chiffré."
        url="/gap-analysis"
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
                Audit d&apos;Écart
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                ISO 27001 · TISAX · DORA · HDS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Audit d&apos;Écart{' '}
              <span className="text-cyan-400">(Gap Analysis)</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Identifiez vos non-conformités avant l&apos;auditeur externe. Notre Gap Analysis compare votre état actuel aux exigences d&apos;un référentiel cible et livre un plan d&apos;action priorisé et chiffré.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact?service=audit"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Demander ma Gap Analysis
              </a>
              <a
                href="/gouvernance-conformite/audits"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                Nos autres audits <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Notre méthodologie en 4 étapes
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // MÉTHODOLOGIE</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {METHODOLOGIE.map((item, i) => (
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

        {/* Livrables */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white tracking-tight">Ce que vous recevez</h2>
                <p className="text-slate-500 text-sm mt-2">Des livrables actionnables, pas un rapport qui prend la poussière</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // LIVRABLES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  'Rapport d\'écart structuré par domaine du référentiel',
                  'Cartographie visuelle de la couverture des contrôles',
                  'Plan d\'action priorisé (court / moyen / long terme)',
                  'Estimation de l\'effort de mise en conformité',
                  'Identification des quick wins à faible effort',
                  'Restitution adaptée aux équipes techniques et à la direction',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 bg-cyan-500/5">
                <Map className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Cas d&apos;usage</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Préparer une certification, répondre à une demande client ou assureur, ou tout simplement piloter votre roadmap sécurité sur des bases factuelles plutôt que sur des impressions.
                </p>
                <a
                  href="/contact?service=audit"
                  className="inline-block px-6 py-3 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-xs"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Questions fréquentes sur la Gap Analysis
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
              <Search className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Connaissez-vous précisément vos écarts de conformité ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Identifiez vos non-conformités avant l&apos;auditeur externe et priorisez vos efforts avec un plan d&apos;action chiffré.
              </p>
              <a
                href="/contact?service=audit"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Demander ma Gap Analysis
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="gap-analysis" />
        <Footer />
      </div>
    </div>
  );
}
