import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { InternalLinks } from '@/components/InternalLinks';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { FileText, FileSignature, AlertTriangle, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DPA & Sous-Traitance RGPD — Accords de Traitement des Données',
  description: 'Rédaction et négociation de vos DPA (Data Processing Agreements), registre des traitements, DPIA et gestion des violations de données. Accompagnement RGPD par SecuriTrust.',
  alternates: {
    canonical: 'https://www.securitrust.fr/dpa-rgpd',
  },
  openGraph: {
    title: 'DPA & Sous-Traitance RGPD — Accords de Traitement des Données | SecuriTrust',
    description: 'Sécurisez vos relations avec vos sous-traitants et responsables de traitement : DPA article 28, registre, DPIA et gestion des violations.',
    url: 'https://www.securitrust.fr/dpa-rgpd',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Qu\'est-ce qu\'un DPA (Data Processing Agreement) ?',
    answer: 'Un DPA, ou accord de sous-traitance, est le contrat imposé par l\'article 28 du RGPD entre un responsable de traitement et chacun de ses sous-traitants (hébergeur, éditeur SaaS, prestataire de support...). Il encadre les garanties, obligations et responsabilités de chaque partie sur les données personnelles traitées.',
  },
  {
    question: 'L\'article 28 du RGPD impose-t-il un DPA avec tous mes prestataires ?',
    answer: 'Oui, dès qu\'un prestataire traite des données personnelles pour votre compte (hébergement, envoi d\'e-mails, support client, analytics...), un DPA est obligatoire. L\'absence de DPA constitue un manquement RGPD sanctionnable, indépendamment de tout incident.',
  },
  {
    question: 'Quelle est la différence entre un DPA et le registre des traitements ?',
    answer: 'Le registre des traitements (article 30) documente en interne l\'ensemble de vos traitements de données. Le DPA est un contrat bilatéral avec un sous-traitant précis. Les deux sont complémentaires et doivent rester cohérents entre eux.',
  },
  {
    question: 'Qui doit signer le DPA : le responsable de traitement ou le sous-traitant ?',
    answer: 'Les deux parties signent le même DPA. En tant que responsable de traitement, vous devez vous assurer que le DPA proposé par votre prestataire (ou celui que vous rédigez) couvre l\'ensemble des garanties exigées par l\'article 28, sans se contenter d\'un modèle générique insuffisant.',
  },
  {
    question: 'SecuriTrust peut-il rédiger nos DPA sans être notre DPO externalisé ?',
    answer: 'Oui, la rédaction et la négociation de DPA peuvent être souscrites de façon autonome, en complément d\'un DPO interne ou externe déjà en place, ou dans le cadre d\'un accompagnement RGPD plus large.',
  },
];

const PILIERS = [
  { icon: FileText, num: '01', title: 'Registre des traitements', desc: 'Tenue et mise à jour du registre conforme à l\'article 30 : finalités, bases légales, catégories de données, durées de conservation.' },
  { icon: FileSignature, num: '02', title: 'DPA & clauses de sous-traitance', desc: 'Rédaction et négociation des accords de traitement (article 28) avec vos prestataires et sous-traitants.' },
  { icon: AlertTriangle, num: '03', title: 'Analyse d\'impact (DPIA)', desc: 'Réalisation des analyses d\'impact relatives à la protection des données pour les traitements à risque.' },
  { icon: UserCheck, num: '04', title: 'Violations & droits des personnes', desc: 'Gestion des violations de données (notification CNIL) et réponse aux demandes d\'exercice des droits.' },
];

export default function DpaRgpdPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: '/' },
        { name: 'Gouvernance & Conformité', url: '/gouvernance-conformite' },
        { name: 'Services Externalisés', url: '/gouvernance-conformite/services-externalises' },
        { name: 'DPA & RGPD', url: '/dpa-rgpd' },
      ]} />
      <ServiceSchema
        name="DPA & Sous-Traitance RGPD"
        description="Rédaction et négociation des accords de traitement (DPA), tenue du registre des traitements, DPIA et gestion des violations de données personnelles."
        url="/dpa-rgpd"
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
                Article 28 RGPD
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                Sous-Traitance
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              DPA &amp;{' '}
              <span className="text-cyan-400">RGPD</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Chaque prestataire qui traite des données pour votre compte doit être couvert par un accord de sous-traitance conforme à l&apos;article 28. SecuriTrust rédige, négocie et maintient vos DPA à jour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Sécuriser mes DPA
              </a>
              <a
                href="/dpo-externalise"
                className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                Notre offre DPO Externalisé <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Piliers */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Les 4 piliers de notre accompagnement DPA &amp; RGPD
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

        {/* Pourquoi */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-3xl font-light text-white tracking-tight">Pourquoi sécuriser vos DPA</h2>
                <p className="text-slate-500 text-sm mt-2">Un DPA mal rédigé transfère le risque vers vous, pas vers votre prestataire</p>
              </div>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // ENJEUX</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  'Obligation légale pour tout responsable de traitement (article 28 RGPD)',
                  'Réduction du risque juridique en cas de contrôle CNIL ou d\'incident',
                  'Clarification des responsabilités en cas de violation chez un sous-traitant',
                  'Modèles de DPA réutilisables pour accélérer vos futures contractualisations',
                  'Cohérence assurée entre DPA, registre des traitements et DPIA',
                  'Interlocution directe avec la CNIL en cas de contrôle ou de notification',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <div className="glass-panel rounded-xl p-8 border border-cyan-500/20 bg-cyan-500/5">
                <FileSignature className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Audit de vos DPA existants</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Nous passons en revue vos contrats fournisseurs existants pour identifier les DPA manquants, incomplets ou obsolètes, et vous fournissons des modèles conformes prêts à négocier.
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
                Questions fréquentes sur les DPA
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
              <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Vos accords de sous-traitance sont-ils à jour ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Un DPA manquant ou incomplet est l&apos;un des manquements RGPD les plus fréquents. Faites le point avec nos experts.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Sécuriser mes DPA
              </a>
            </div>
          </div>
        </section>

        <InternalLinks pageKey="dpa-rgpd" />
        <Footer />
      </div>
    </div>
  );
}
