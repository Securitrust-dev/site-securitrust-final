import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Brain, Scale, FileCheck, Users, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conformité IA Act — Règlement Européen sur l\'Intelligence Artificielle',
  description: 'Mise en conformité IA Act (Règlement UE 2024/1689) : classification des systèmes IA, gestion des risques, gouvernance des données, obligations GPAI. SecuriTrust Paris.',
  alternates: {
    canonical: 'https://www.securitrust.fr/ia-act',
  },
  openGraph: {
    title: 'Conformité IA Act — Règlement Européen sur l\'Intelligence Artificielle | SecuriTrust',
    description: 'Mise en conformité IA Act pour les fournisseurs et déployeurs de systèmes d\'IA. Classification des risques, documentation technique, gouvernance des données.',
    url: 'https://www.securitrust.fr/ia-act',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que l\'IA Act ?',
    answer: 'L\'IA Act (Règlement UE 2024/1689) est le premier cadre juridique horizontal au monde encadrant l\'intelligence artificielle. Entré en vigueur le 1er août 2024, il impose des obligations proportionnées au niveau de risque des systèmes d\'IA mis sur le marché ou utilisés dans l\'Union européenne.',
  },
  {
    question: 'Qui est concerné par l\'IA Act ?',
    answer: 'Le règlement s\'applique aux fournisseurs (ceux qui développent ou font développer un système d\'IA) et aux déployeurs (ceux qui l\'utilisent sous leur autorité), dès lors que le système est mis sur le marché ou utilisé dans l\'UE — y compris pour des acteurs établis hors d\'Europe.',
  },
  {
    question: 'Quels sont les niveaux de risque définis par l\'IA Act ?',
    answer: 'Le règlement classe les systèmes d\'IA en 4 niveaux : risque inacceptable (interdits depuis février 2025 — notation sociale, manipulation comportementale...), risque élevé (obligations renforcées — RH, crédit, santé, justice...), risque limité (obligations de transparence — chatbots, deepfakes) et risque minimal (aucune obligation spécifique).',
  },
  {
    question: 'Quelles sanctions en cas de non-conformité ?',
    answer: 'Les amendes peuvent atteindre 35 millions d\'euros ou 7% du chiffre d\'affaires mondial annuel pour les pratiques interdites, et jusqu\'à 15 millions d\'euros ou 3% du CA mondial pour les autres manquements — des montants alignés sur ceux du RGPD.',
  },
  {
    question: 'Quel est le lien entre IA Act, RGPD et ISO 42001 ?',
    answer: 'L\'IA Act complète le RGPD sans le remplacer : un système d\'IA traitant des données personnelles reste soumis aux deux textes. ISO 42001 (système de management de l\'IA) est le référentiel de certification volontaire le plus adapté pour structurer et démontrer votre conformité IA Act.',
  },
];

const PILIERS = [
  {
    icon: Scale,
    num: '01',
    title: 'Classification des systèmes IA',
    desc: 'Cartographie de vos systèmes d\'IA et qualification de leur niveau de risque (inacceptable, élevé, limité, minimal) au regard des annexes du règlement.',
  },
  {
    icon: FileCheck,
    num: '02',
    title: 'Documentation technique',
    desc: 'Constitution du dossier technique exigé pour les systèmes à haut risque : conception, données d\'entraînement, performance, mesures de contrôle.',
  },
  {
    icon: Users,
    num: '03',
    title: 'Supervision humaine',
    desc: 'Mise en place des mécanismes de contrôle humain, de transparence et d\'information des utilisateurs exigés par le règlement.',
  },
  {
    icon: Brain,
    num: '04',
    title: 'Gouvernance des données & GPAI',
    desc: 'Qualité et gouvernance des données d\'entraînement, et accompagnement aux obligations spécifiques des modèles d\'IA à usage général (GPAI).',
  },
];

export default function IaActPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Gouvernance & Conformité', url: '/gouvernance-conformite' },
        { name: 'IA Act', url: '/ia-act' },
      ]} />
      <ServiceSchema
        name="Conformité IA Act"
        description="Accompagnement à la mise en conformité avec le règlement européen sur l'intelligence artificielle (IA Act) : classification des risques, documentation technique, gouvernance des données."
        url="/ia-act"
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
                Règlement UE 2024/1689
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                Intelligence Artificielle
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Conformité{' '}
              <span className="text-cyan-400">IA Act</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Le règlement européen sur l&apos;intelligence artificielle impose des obligations proportionnées au risque de vos systèmes d&apos;IA. SecuriTrust vous accompagne de la classification à la mise en conformité opérationnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluation IA Act gratuite
              </a>
              <a
                href="/gouvernance-conformite/accompagnement"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                Notre offre Gouvernance <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Piliers */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Les 4 piliers de notre accompagnement IA Act
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

        {/* Calendrier d'application */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white tracking-tight">Calendrier d&apos;application progressif</h2>
                <p className="text-slate-500 text-sm mt-2">Le règlement entre en application par étapes jusqu&apos;en 2027</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // CALENDRIER</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  'Février 2025 : interdiction des pratiques d\'IA à risque inacceptable',
                  'Août 2025 : obligations de gouvernance applicables aux modèles GPAI',
                  'Août 2026 : obligations complètes pour les systèmes d\'IA à haut risque',
                  'Août 2027 : obligations pour l\'IA intégrée dans des produits déjà réglementés',
                  'Sanctions déjà applicables : jusqu\'à 35 M€ ou 7% du CA mondial',
                  'Autorité de contrôle française désignée : coordination via la CNIL',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 bg-cyan-500/5">
                <ShieldCheck className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Diagnostic IA Act</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Nous cartographions vos systèmes d&apos;IA, qualifions leur niveau de risque et vous remettons une feuille de route de mise en conformité priorisée et chiffrée.
                </p>
                <a
                  href="/contact"
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
                Questions fréquentes sur l&apos;IA Act
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
              <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Votre organisation développe ou utilise de l&apos;IA ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Nos experts qualifient gratuitement le niveau de risque de vos systèmes d&apos;IA et vous proposent une feuille de route de mise en conformité adaptée.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluer ma conformité IA Act
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="ia-act" />
        <Footer />
      </div>
    </div>
  );
}
