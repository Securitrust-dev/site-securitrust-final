import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Shield, ArrowRight, CheckCircle, FileText, Award, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conformité Cybersécurité à Paris — NIS2, RGPD, DORA, ISO 27001 | SecuriTrust',
  description: 'Cabinet de conformité cybersécurité à Paris. Accompagnement NIS2, RGPD, DORA, ISO 27001, HDS, TISAX. Auditeur officiel AFNOR certifié. Audit d\'écarts et plan d\'action priorisé.',
  alternates: {
    canonical: 'https://securitrust.fr/conformite',
  },
  openGraph: {
    title: 'Conformité Cybersécurité — NIS2, RGPD, DORA, ISO 27001 | SecuriTrust',
    description: 'Accompagnement conformité cybersécurité : NIS2, RGPD, DORA, ISO 27001, HDS, TISAX. Auditeur officiel AFNOR. Paris.',
    url: 'https://securitrust.fr/conformite',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Quelles réglementations s\'appliquent à mon entreprise ?',
    answer: 'Cela dépend de votre secteur et de votre taille. NIS2 s\'applique aux entités essentielles et importantes dans 18 secteurs critiques. DORA concerne toutes les entités financières réglementées par l\'UE. Le RGPD s\'applique à toute organisation traitant des données personnelles de résidents européens. HDS est obligatoire pour héberger des données de santé. ISO 27001 et TISAX sont des certifications volontaires très exigées par les donneurs d\'ordre.',
  },
  {
    question: 'Qu\'est-ce que la directive NIS2 et qui est concerné ?',
    answer: 'NIS2 est la directive européenne sur la cybersécurité des réseaux et systèmes d\'information, transposée en droit français. Elle concerne environ 10 000 entités en France dans 18 secteurs (énergie, transport, santé, finance, eau, numérique...). Les entités essentielles (EE) et importantes (EI) ont des obligations de sécurité et de notification d\'incidents sous 24h. Les sanctions peuvent atteindre 10M€ ou 2% du CA mondial.',
  },
  {
    question: 'Combien de temps prend une certification ISO 27001 ?',
    answer: 'En général, 12 à 18 mois pour une première certification selon la maturité initiale de votre organisation. SecuriTrust propose un audit d\'écarts initial pour évaluer votre position, puis un plan d\'action progressif. En tant qu\'auditeur officiel AFNOR, nous vous accompagnons de la mise en place du SMSI jusqu\'à l\'audit de certification.',
  },
  {
    question: 'Qu\'est-ce que le DORA et quelles entreprises sont concernées ?',
    answer: 'DORA (Digital Operational Resilience Act) est le règlement européen sur la résilience opérationnelle numérique du secteur financier. Il s\'applique aux banques, assurances, sociétés de gestion, prestataires de services de paiement, et leurs fournisseurs ICT critiques depuis janvier 2025. Il impose des tests de résilience, une gestion du risque tiers, et des plans de continuité.',
  },
  {
    question: 'Quelle est la différence entre ISO 27001 et HDS ?',
    answer: 'ISO 27001 est la norme internationale de management de la sécurité de l\'information, applicable à tout secteur. HDS (Hébergeur de Données de Santé) est la certification française obligatoire pour tout hébergeur de données de santé à caractère personnel. HDS est basée sur ISO 27001 et y ajoute des exigences spécifiques au secteur de la santé. Obtenir ISO 27001 est souvent le prérequis à HDS.',
  },
  {
    question: 'Quels livrables recevons-nous après un accompagnement conformité ?',
    answer: 'Vous recevez : un rapport d\'audit d\'écarts (gap analysis) avec score de maturité, un plan d\'action priorisé selon les risques et délais réglementaires, les politiques et procédures rédigées, les registres obligatoires (registre des traitements RGPD, registre des risques...), et un accompagnement à la présentation aux autorités de contrôle ou organismes certificateurs.',
  },
];

const SERVICES = [
  {
    href: '/conformite-nis2',
    title: 'Conformité NIS2',
    badge: 'Obligation légale',
    badgeColor: 'red',
    desc: 'Évaluation de votre conformité à la directive NIS2, plan d\'action priorisé et accompagnement à la mise en conformité. Notification d\'incidents et gouvernance SSI.',
    tags: ['NIS2', 'Entités essentielles', 'Secteurs critiques'],
  },
  {
    href: '/mise-en-conformite-rgpd',
    title: 'Mise en Conformité RGPD',
    badge: null,
    badgeColor: '',
    desc: 'Accompagnement RGPD complet : registre des traitements, analyse d\'impact (AIPD), politiques de confidentialité, gestion des violations de données.',
    tags: ['RGPD', 'Données personnelles', 'CNIL'],
  },
  {
    href: '/dpo-externalise',
    title: 'DPO Externalisé',
    badge: 'RGPD obligatoire',
    badgeColor: 'orange',
    desc: 'Délégué à la Protection des Données externalisé : obligation légale pour certaines organisations. Gestion de la conformité RGPD au quotidien.',
    tags: ['DPO', 'Protection données', 'RGPD'],
  },
  {
    href: '/dora',
    title: 'Conformité DORA',
    badge: 'Secteur financier',
    badgeColor: 'blue',
    desc: 'Accompagnement DORA pour entités financières : gestion du risque ICT, tests de résilience opérationnelle, gestion des tiers critiques.',
    tags: ['DORA', 'Finance', 'Résilience ICT'],
  },
  {
    href: '/iso27001-hds',
    title: 'ISO 27001 & HDS',
    badge: 'Certification AFNOR',
    badgeColor: 'cyan',
    desc: 'Accompagnement à la certification ISO 27001 et HDS. En tant qu\'auditeur officiel AFNOR, SecuriTrust vous guide de la mise en place du SMSI à l\'audit de certification.',
    tags: ['ISO 27001', 'HDS', 'SMSI'],
  },
  {
    href: '/hds-certification',
    title: 'Certification HDS',
    badge: null,
    badgeColor: '',
    desc: 'Certification Hébergeur de Données de Santé obligatoire pour tout acteur hébergeant des données de santé. Accompagnement de bout en bout.',
    tags: ['HDS', 'Données de santé', 'Certification'],
  },
  {
    href: '/tisax-security',
    title: 'Certification TISAX',
    badge: null,
    badgeColor: '',
    desc: 'TISAX est la norme de sécurité de l\'information de l\'industrie automobile. Indispensable pour travailler avec les constructeurs et équipementiers (OEM/Tier1).',
    tags: ['TISAX', 'Industrie auto', 'VDA ISA'],
  },
  {
    href: '/audit-conformite',
    title: 'Audit de Conformité',
    badge: 'Gap Analysis',
    badgeColor: 'purple',
    desc: 'Évaluation de votre niveau de conformité aux référentiels : RGPD, NIS2, DORA, ISO 27001, HDS. Rapport d\'écarts et plan d\'action avec priorités.',
    tags: ['Gap analysis', 'Écarts', 'Plan d\'action'],
  },
  {
    href: '/grc-cyber',
    title: 'GRC Cybersécurité',
    badge: null,
    badgeColor: '',
    desc: 'Gouvernance, Risques & Conformité : programme GRC complet pour piloter votre sécurité de façon structurée et continue. EBIOS RM, ISO 27005.',
    tags: ['Gouvernance', 'Risques', 'EBIOS RM'],
  },
];

const STATS = [
  { value: '9', label: 'référentiels maîtrisés' },
  { value: 'AFNOR', label: 'auditeur officiel certifié' },
  { value: '100%', label: 'des audits conformité réussis' },
  { value: '+200', label: 'mises en conformité réalisées' },
];

export default function ConformitePage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://securitrust.fr' },
        { name: 'Conformité Cybersécurité', url: 'https://securitrust.fr/conformite' },
      ]} />
      <ServiceSchema
        name="Conformité Cybersécurité — NIS2, RGPD, DORA, ISO 27001"
        description="Accompagnement conformité cybersécurité à Paris : NIS2, RGPD, DORA, ISO 27001, HDS, TISAX. Auditeur officiel AFNOR certifié. Audit d'écarts et plan d'action priorisé."
        url="https://securitrust.fr/conformite"
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
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-3xl" />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                Auditeur AFNOR certifié
              </span>
              <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/60 text-[0.65rem] font-mono uppercase tracking-[0.2em]">
                ISO 27001 Lead Auditor · ISO 27701 · DPO certifié
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Conformité{' '}
              <span className="text-cyan-400">Cybersécurité</span>
              <br />à Paris
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              NIS2, RGPD, DORA, ISO 27001, HDS, TISAX — maîtrisez toutes vos obligations réglementaires avec nos experts certifiés. Audit d&apos;écarts, plan d&apos;action, accompagnement jusqu&apos;à la certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluer ma conformité
              </a>
              <a
                href="/audit-conformite"
                className="px-8 py-4 border border-white/20 text-white/70 font-bold uppercase tracking-widest hover:border-white/40 hover:bg-white/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" /> Audit d&apos;écarts (Gap Analysis)
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {STATS.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-cyan-400">{item.value}</span>
                  <span className="text-xs text-slate-500 font-mono">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Réglementations */}
        <section className="py-12 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs text-slate-500 font-mono uppercase tracking-widest text-center mb-6">Référentiels maîtrisés</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {['NIS2', 'RGPD', 'DORA', 'ISO 27001', 'ISO 27701', 'HDS', 'TISAX', 'EBIOS RM', 'ISO 27005'].map((ref, i) => (
                <span key={i} className="px-4 py-2 rounded border border-white/10 text-white/50 text-xs font-mono uppercase tracking-widest">
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Nos services de conformité
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // SERVICES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((service, i) => (
                <a
                  key={i}
                  href={service.href}
                  className="group glass-panel rounded-xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>
                    {service.badge && (
                      <span className={`px-2 py-0.5 rounded text-[0.6rem] font-bold uppercase tracking-widest shrink-0 ml-2 ${
                        service.badgeColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        service.badgeColor === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        service.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        service.badgeColor === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 rounded bg-white/5 text-white/40 text-[0.6rem] font-mono uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-cyan-400 text-xs font-mono">
                    En savoir plus <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi SecuriTrust */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Pourquoi choisir SecuriTrust ?
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // DIFFÉRENCIATEURS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: 'Auditeur officiel AFNOR',
                  desc: 'SecuriTrust est auditeur officiel AFNOR pour les certifications ISO 27001 et ISO 27701. Nous accompagnons vos projets de certification de bout en bout.',
                },
                {
                  icon: Shield,
                  title: 'Expertise multi-référentiels',
                  desc: 'Nos experts maîtrisent l\'ensemble des référentiels : NIS2, RGPD, DORA, ISO 27001, HDS, TISAX, EBIOS RM, ISO 27005. Une seule équipe pour tous vos enjeux de conformité.',
                },
                {
                  icon: CheckCircle,
                  title: 'Approche pragmatique',
                  desc: 'Pas de conformité théorique : nous priorisons les actions selon vos risques réels et vos délais réglementaires. Plans d\'action concrets, réalisables, avec estimations d\'effort.',
                },
                {
                  icon: Users,
                  title: 'Accompagnement continu',
                  desc: 'De l\'audit d\'écarts initial jusqu\'à la certification et le maintien de la conformité au quotidien. RSSI externalisé et DPO externalisé disponibles pour un suivi long terme.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 glass-panel rounded-xl p-6 border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Méthodologie */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Notre approche conformité
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">03 // PROCESSUS</span>
            </div>
            <div className="space-y-4">
              {[
                { num: '01', title: 'Audit d\'écarts (Gap Analysis)', desc: 'Évaluation de votre niveau de conformité actuel par rapport au référentiel cible. Score de maturité, cartographie des écarts et priorisation des risques.' },
                { num: '02', title: 'Plan d\'action priorisé', desc: 'Feuille de route réaliste avec actions classées par niveau de risque et d\'effort. Délais réglementaires pris en compte (ex. NIS2 transposition, DORA janvier 2025).' },
                { num: '03', title: 'Mise en œuvre accompagnée', desc: 'Rédaction des politiques, procédures et registres obligatoires. Formation des équipes et sensibilisation aux exigences réglementaires.' },
                { num: '04', title: 'Audit de certification', desc: 'Préparation à l\'audit officiel (AFNOR pour ISO 27001/HDS, LSTI pour TISAX, CNIL pour RGPD). Accompagnement le jour J.' },
                { num: '05', title: 'Maintien de la conformité', desc: 'Suivi continu des évolutions réglementaires, audits de surveillance, revues de direction SMSI. Option RSSI ou DPO externalisé pour un accompagnement permanent.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 glass-panel rounded-xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all">
                  <span className="text-3xl font-bold text-cyan-500/30 font-mono shrink-0">{step.num}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Questions fréquentes sur la conformité
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">04 // FAQ</span>
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

        {/* Maillage interne */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-light text-white mb-6 border-b border-white/10 pb-3">Services complémentaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez votre démarche conformité par un audit technique complet de votre infrastructure.' },
                { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotez votre conformité dans la durée avec un RSSI externalisé expert en réglementations.' },
                { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'NIS2 et DORA imposent des tests réguliers. Validez votre résistance technique avec notre offre garantie.' },
              ].map((s, i) => (
                <a key={i} href={s.href} className="group glass-panel rounded-xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{s.desc}</p>
                  <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">En savoir plus <ArrowRight className="w-3 h-3" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-panel rounded-2xl p-12 border border-white/10">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Êtes-vous en conformité ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Nos experts évaluent gratuitement votre niveau de conformité aux réglementations qui vous concernent et vous proposent un plan d&apos;action adapté à votre contexte.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Évaluer ma conformité gratuitement
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
