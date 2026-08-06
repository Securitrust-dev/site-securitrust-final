import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Target, Users, Radar, Crosshair, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Analyse de Risques EBIOS RM — Méthode ANSSI',
  description: 'Analyse de risques cyber selon la méthode EBIOS Risk Manager (ANSSI) : cartographie des scénarios de risque, homologation RGS, conformité NIS2 et ISO 27001. SecuriTrust.',
  alternates: {
    canonical: 'https://www.securitrust.fr/ebios-rm',
  },
  openGraph: {
    title: 'Analyse de Risques EBIOS RM — Méthode ANSSI | SecuriTrust',
    description: 'Analyse de risques cyber selon la méthode de référence EBIOS Risk Manager : scénarios stratégiques et opérationnels, plan de traitement du risque.',
    url: 'https://www.securitrust.fr/ebios-rm',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce que la méthode EBIOS RM ?',
    answer: 'EBIOS Risk Manager (EBIOS RM) est la méthode française de référence en analyse de risques cyber, publiée par l\'ANSSI. Elle structure l\'identification des scénarios de risque en 5 ateliers, de la définition des valeurs métier au plan de traitement du risque.',
  },
  {
    question: 'Pourquoi choisir EBIOS RM plutôt qu\'une autre méthode d\'analyse de risques ?',
    answer: 'EBIOS RM raisonne par scénarios d\'attaque réalistes plutôt que par simple liste de vulnérabilités techniques. Elle implique le COMEX dans la définition des enjeux stratégiques et produit un livrable directement opposable face aux régulateurs, assureurs et donneurs d\'ordre.',
  },
  {
    question: 'Combien de temps dure une analyse EBIOS RM ?',
    answer: 'Une analyse EBIOS RM complète se déroule généralement sur 4 à 8 semaines selon le périmètre : ateliers de cadrage avec la direction, entretiens métier et technique, modélisation des scénarios, puis restitution du plan de traitement du risque.',
  },
  {
    question: 'EBIOS RM est-elle obligatoire ?',
    answer: 'EBIOS RM n\'est pas obligatoire en tant que telle, mais elle est explicitement recommandée par l\'ANSSI et constitue le moyen le plus direct de répondre aux exigences d\'analyse de risques de NIS2, DORA, l\'homologation RGS et le contrôle A.5.7/A.8.8 d\'ISO 27001.',
  },
  {
    question: 'Quel est le livrable d\'une analyse EBIOS RM ?',
    answer: 'Le livrable comprend la cartographie des valeurs métier et de leurs événements redoutés, l\'identification des sources de risque, les scénarios stratégiques et opérationnels modélisés, et un plan de traitement du risque priorisé et actionnable.',
  },
];

const ATELIERS = [
  { icon: Target, num: '01', title: 'Cadrage & socle de sécurité', desc: 'Définition des valeurs métier, des événements redoutés et évaluation du socle de sécurité existant.' },
  { icon: Users, num: '02', title: 'Sources de risque', desc: 'Identification des sources de risque pertinentes et de leurs objectifs visés (cybercriminalité, espionnage, sabotage...).' },
  { icon: Radar, num: '03', title: 'Scénarios stratégiques', desc: 'Construction des chemins d\'attaque à haut niveau entre les sources de risque et les valeurs métier.' },
  { icon: Crosshair, num: '04', title: 'Scénarios opérationnels', desc: 'Modélisation technique détaillée des modes opératoires d\'attaque et évaluation de leur vraisemblance.' },
  { icon: ShieldCheck, num: '05', title: 'Traitement du risque', desc: 'Synthèse des risques, définition des mesures de sécurité et élaboration du plan de traitement.' },
];

export default function EbiosRmPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Gouvernance & Conformité', url: '/gouvernance-conformite' },
        { name: 'EBIOS RM', url: '/ebios-rm' },
      ]} />
      <ServiceSchema
        name="Analyse de risques EBIOS RM"
        description="Analyse de risques cyber selon la méthode EBIOS Risk Manager de l'ANSSI : cartographie des scénarios stratégiques et opérationnels, plan de traitement du risque."
        url="/ebios-rm"
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
                Méthode ANSSI
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                Analyse de Risques
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Analyse de Risques{' '}
              <span className="text-cyan-400">EBIOS RM</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              EBIOS Risk Manager est la méthode de référence de l&apos;ANSSI pour identifier, modéliser et traiter vos risques cyber par scénarios. SecuriTrust anime vos 5 ateliers de bout en bout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Démarrer mon analyse EBIOS RM
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

        {/* Ateliers */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Les 5 ateliers de la méthode EBIOS RM
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // ATELIERS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {ATELIERS.map((item, i) => (
                <div key={i} className="glass-panel rounded-xl p-7 border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <item.icon className="w-7 h-7 text-cyan-400" />
                    <span className="text-xs font-mono text-cyan-500/50">{item.num}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi EBIOS RM */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white tracking-tight">Pourquoi structurer vos risques avec EBIOS RM</h2>
                <p className="text-slate-500 text-sm mt-2">Une méthode reconnue, opposable et directement exploitable</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // BÉNÉFICES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  'Méthode de référence ANSSI reconnue par les régulateurs et les assureurs',
                  'Approche par scénarios d\'attaque réalistes, pas par simple liste de vulnérabilités',
                  'Implication du COMEX dans la définition des risques stratégiques',
                  'Compatible avec ISO 27005 et l\'Annexe A d\'ISO 27001',
                  'Support direct à l\'homologation RGS et à la conformité NIS2',
                  'Livrable opposable face aux régulateurs, assureurs et donneurs d\'ordre',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 bg-cyan-500/5">
                <Target className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Animation par des experts certifiés</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Nos consultants certifiés EBIOS Risk Manager animent vos ateliers avec vos équipes métier, techniques et dirigeantes pour produire un plan de traitement du risque directement actionnable.
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
                Questions fréquentes sur EBIOS RM
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
              <Radar className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Prêt à cartographier vos risques cyber ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Un premier échange de 30 minutes suffit pour cadrer le périmètre de votre analyse EBIOS RM et estimer le calendrier des ateliers.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Planifier mon analyse EBIOS RM
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="ebios-rm" />
        <Footer />
      </div>
    </div>
  );
}
