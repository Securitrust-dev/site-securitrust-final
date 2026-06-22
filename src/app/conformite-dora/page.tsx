import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Shield, CheckCircle, ArrowRight, Building2, FileCheck, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conformité DORA — Résilience Numérique Secteur Financier',
  description: 'Mise en conformité DORA pour banques, assurances et services financiers. Tests de résilience, gouvernance TIC, gestion des risques tiers. SecuriTrust Paris.',
  alternates: {
    canonical: 'https://securitrust.fr/conformite-dora',
  },
  openGraph: {
    title: 'Conformité DORA — Résilience Numérique Secteur Financier | SecuriTrust',
    description: 'Mise en conformité DORA pour banques, assurances et services financiers. Tests TLPT, gouvernance TIC, gestion des risques tiers.',
    url: 'https://securitrust.fr/conformite-dora',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que DORA ?',
    answer: 'DORA (Digital Operational Resilience Act) est un règlement européen (UE 2022/2554) entré en application le 17 janvier 2025. Il impose des exigences uniformes de résilience opérationnelle numérique aux entités financières (banques, assurances, PSP, sociétés de gestion, crypto-actifs, etc.).',
  },
  {
    question: 'Quelles entités sont soumises à DORA ?',
    answer: 'DORA s\'applique à plus de 20 types d\'entités financières : établissements de crédit, entreprises d\'assurance et de réassurance, sociétés de gestion, prestataires de services de paiement, fournisseurs de crypto-actifs, et leurs fournisseurs TIC tiers critiques.',
  },
  {
    question: 'Quelles sont les principales exigences DORA ?',
    answer: 'DORA impose 5 piliers : (1) Gestion des risques TIC avec un cadre dédié, (2) Gestion des incidents TIC et reporting, (3) Tests de résilience opérationnelle numérique incluant des tests TLPT, (4) Gestion des risques liés aux prestataires TIC tiers, (5) Partage d\'informations sur les cybermenaces.',
  },
  {
    question: 'Qu\'est-ce qu\'un test TLPT dans le cadre de DORA ?',
    answer: 'Les TLPT (Threat-Led Penetration Tests) sont des tests d\'intrusion avancés basés sur le renseignement sur les menaces (threat intelligence). Ils simulent des attaques réelles de groupes APT ciblant le secteur financier. SecuriTrust est habilité à réaliser des TLPT conformes au cadre TIBER-EU.',
  },
  {
    question: 'Quelle est la différence entre NIS2 et DORA ?',
    answer: 'NIS2 est une directive générale de cybersécurité applicable à 18 secteurs. DORA est un règlement spécifique au secteur financier, plus exigeant sur la résilience opérationnelle. Les entités financières peuvent être soumises aux deux réglementations simultanément.',
  },
];

const PILIERS = [
  {
    icon: BarChart3,
    num: '01',
    title: 'Gestion des risques TIC',
    desc: 'Mise en place d\'un cadre de gestion des risques TIC complet : identification, protection, détection, réponse et récupération.',
  },
  {
    icon: Shield,
    num: '02',
    title: 'Gestion des incidents',
    desc: 'Processus de classification, gestion et notification des incidents TIC majeurs aux autorités compétentes (ACPR, AMF, BCE).',
  },
  {
    icon: FileCheck,
    num: '03',
    title: 'Tests de résilience',
    desc: 'Programme de tests incluant tests de pénétration basés sur les menaces (TLPT), tests de vulnérabilité et exercices de crise.',
  },
  {
    icon: Building2,
    num: '04',
    title: 'Gestion des tiers TIC',
    desc: 'Évaluation et suivi des prestataires TIC tiers : due diligence, clauses contractuelles DORA, registre des prestataires, exit strategies.',
  },
];

export default function ConformiteDoraPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Conformité DORA', url: '/conformite-dora' },
      ]} />
      <ServiceSchema
        name="Conformité DORA"
        description="Accompagnement à la mise en conformité avec le règlement DORA : gestion des risques TIC, tests TLPT, gestion des tiers et reporting réglementaire."
        url="/conformite-dora"
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
                Règlement UE 2022/2554
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                Secteur Financier
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Conformité{' '}
              <span className="text-cyan-400">DORA</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Le règlement DORA impose aux entités financières des exigences strictes de résilience opérationnelle numérique. SecuriTrust vous accompagne dans les 5 piliers de la conformité DORA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluation DORA gratuite
              </a>
              <a
                href="/dora"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                Notre offre DORA <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Piliers */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Les 4 piliers de notre accompagnement DORA
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

        {/* TLPT Section */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white tracking-tight">Tests TLPT — Threat-Led Penetration Tests</h2>
                <p className="text-slate-500 text-sm mt-2">Tests d&apos;intrusion avancés requis par DORA pour les entités significatives</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // TLPT</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  'Tests basés sur le renseignement sur les menaces (Threat Intelligence)',
                  'Simulation d\'attaques APT ciblant le secteur financier',
                  'Conformes au cadre TIBER-EU de la BCE',
                  'Périmètre défini par les autorités de supervision',
                  'Rapport certifié pour remise aux superviseurs',
                  'Coordination avec la direction et le conseil d\'administration',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 bg-cyan-500/5">
                <Shield className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Certification TLPT</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  SecuriTrust dispose de l&apos;expertise et des certifications nécessaires pour réaliser des tests TLPT conformes aux exigences DORA et au cadre TIBER-EU.
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
                Questions fréquentes sur DORA
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
              <Building2 className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Votre entité est-elle prête pour DORA ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Nos experts en conformité financière évaluent gratuitement votre niveau de maturité DORA et vous proposent une feuille de route adaptée.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluer ma conformité DORA
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="conformite-dora" />
        <Footer />
      </div>
    </div>
  );
}
