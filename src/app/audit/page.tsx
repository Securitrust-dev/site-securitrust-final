import { Metadata } from 'next';
import { Navbar } from '@/components/sections/navbar';
import { PromoBanner } from '@/components/sections/promo-banner';
import { Footer } from '@/components/sections/footer';
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from '@/components/StructuredData';
import { Search, ArrowRight, CheckCircle, FileText, Layers, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Audit Cybersécurité à Paris — Technique, Organisationnel & Conformité | SecuriTrust',
  description: 'Cabinet d\'audit cybersécurité à Paris. Audit technique, architecture SI, configuration, code source, organisationnel et conformité réglementaire. Experts certifiés OSCP & auditeur AFNOR.',
  alternates: {
    canonical: 'https://www.securitrust.fr/audit',
  },
  openGraph: {
    title: 'Audit Cybersécurité — Technique, Organisationnel & Conformité | SecuriTrust',
    description: 'Audit cybersécurité complet à Paris : technique, architecture, configuration, code source, organisationnel et conformité. Auditeur AFNOR certifié.',
    url: 'https://www.securitrust.fr/audit',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Quelle est la différence entre un audit et un pentest ?',
    answer: 'Le pentest est une simulation d\'attaque technique ciblant des vulnérabilités exploitables. L\'audit est une évaluation structurée qui peut couvrir les aspects techniques ET organisationnels (gouvernance, processus, conformité). Les deux sont complémentaires : l\'audit dresse un état des lieux, le pentest valide la résistance à une attaque réelle.',
  },
  {
    question: 'Qu\'est-ce qu\'un audit flash cybersécurité ?',
    answer: 'L\'audit flash est un diagnostic express réalisé en 1 à 2 jours. Il permet d\'identifier rapidement les risques critiques sans attendre un audit complet. Idéal pour une décision rapide (achat, due diligence, incident récent) ou pour préparer un audit plus approfondi.',
  },
  {
    question: 'Combien de temps dure un audit cybersécurité complet ?',
    answer: 'Selon le périmètre : 2 à 5 jours pour un audit flash ou technique ciblé, 1 à 3 semaines pour un audit complet technique + organisationnel, 1 à 3 mois pour un audit de conformité ISO 27001 ou NIS2. SecuriTrust adapte la durée à vos besoins et votre budget.',
  },
  {
    question: 'Quels livrables sont fournis après un audit ?',
    answer: 'Vous recevez systématiquement : un rapport exécutif (pour le COMEX) avec une synthèse des risques business, un rapport technique détaillé avec les constats et preuves, un plan de remédiation priorisé selon le niveau de risque, et une session de restitution orale avec vos équipes.',
  },
  {
    question: 'Comment choisir le bon type d\'audit pour mon entreprise ?',
    answer: 'Si vous souhaitez identifier vos failles rapidement : Audit Flash. Si vous préparez une certification : Audit de Conformité. Si vous avez des doutes sur votre infrastructure IT : Audit Technique ou Architecture. Si vous voulez évaluer votre organisation globale : Audit Organisationnel. Nos experts vous guident gratuitement.',
  },
];

const AUDITS = [
  {
    href: '/audit-flash',
    title: 'Audit Flash',
    badge: 'Rapide — 1 à 2 jours',
    badgeColor: 'orange',
    desc: 'Diagnostic express de votre posture sécurité. Identification des risques critiques et recommandations prioritaires. Idéal avant un audit complet ou en urgence.',
    tags: ['Diagnostic rapide', 'Risques critiques', 'Décision CEO/DSI'],
  },
  {
    href: '/audit-cybersecurite',
    title: 'Audit Cybersécurité Complet',
    badge: 'Recommandé',
    badgeColor: 'cyan',
    desc: 'Audit global couvrant les dimensions techniques ET organisationnelles. Vue complète de votre posture sécurité avec plan de remédiation détaillé.',
    tags: ['Technique', 'Organisationnel', 'Vision 360°'],
  },
  {
    href: '/audit-securite-technique',
    title: 'Audit de Sécurité Technique',
    badge: null,
    badgeColor: '',
    desc: 'Analyse approfondie de votre infrastructure IT : configurations, architecture réseau, vulnérabilités systèmes et procédures de sécurité opérationnelle.',
    tags: ['Infrastructure', 'Configurations', 'Vulnérabilités'],
  },
  {
    href: '/audit-architecture',
    title: 'Audit d\'Architecture SI',
    badge: null,
    badgeColor: '',
    desc: 'Évaluation de la conception de votre SI : réseau, cloud, applicatif. Identification des failles structurelles et des erreurs de conception.',
    tags: ['Réseau', 'Cloud', 'Architecture applicative'],
  },
  {
    href: '/audit-configuration',
    title: 'Audit de Configuration',
    badge: null,
    badgeColor: '',
    desc: 'Analyse des configurations de vos équipements réseau, serveurs et systèmes d\'exploitation selon les CIS Benchmarks et bonnes pratiques de hardening.',
    tags: ['Hardening', 'Serveurs', 'Équipements réseau'],
  },
  {
    href: '/audit-code-source',
    title: 'Audit de Code Source',
    badge: 'SAST',
    badgeColor: 'purple',
    desc: 'Revue manuelle et automatisée de votre code source pour détecter vulnérabilités de sécurité, failles logiques et erreurs de programmation.',
    tags: ['Code source', 'SAST', 'Revue manuelle'],
  },
  {
    href: '/audit-organisationnel',
    title: 'Audit Organisationnel',
    badge: null,
    badgeColor: '',
    desc: 'Évaluation des aspects humains et processuels de votre cybersécurité : gouvernance SSI, rôles, responsabilités, politique de sécurité.',
    tags: ['Gouvernance', 'Processus', 'Politique SSI'],
  },
  {
    href: '/audit-conformite',
    title: 'Audit de Conformité',
    badge: 'RGPD · NIS2 · DORA',
    badgeColor: 'blue',
    desc: 'Évaluation de votre niveau de conformité aux réglementations : RGPD, NIS2, DORA, ISO 27001, HDS. Rapport d\'écarts et plan d\'action priorisé.',
    tags: ['RGPD', 'NIS2', 'ISO 27001', 'HDS'],
  },
];

export default function AuditPage() {
  return (
    <div className="relative min-h-screen antialiased text-slate-300" style={{ background: '#030303' }}>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://www.securitrust.fr' },
        { name: 'Audits Cybersécurité', url: 'https://www.securitrust.fr/audit' },
      ]} />
      <ServiceSchema
        name="Audit Cybersécurité — Technique, Organisationnel & Conformité"
        description="Cabinet d'audit cybersécurité à Paris. Audit technique, architecture SI, configuration, code source, organisationnel et conformité. Experts certifiés OSCP & auditeur AFNOR."
        url="https://www.securitrust.fr/audit"
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
                OSCP · CEH · ISO 27001 Lead Auditor
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter leading-tight mb-6">
              Audit{' '}
              <span className="text-cyan-400">Cybersécurité</span>
              <br />à Paris
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
              Évaluez objectivement votre posture de sécurité avec nos auditeurs certifiés. Du diagnostic flash en 48h à l&apos;audit de conformité ISO 27001, nous adaptons notre approche à vos enjeux et votre budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Demander un audit
              </a>
              <a
                href="/audit-flash"
                className="px-8 py-4 border border-orange-500/40 text-orange-400 font-bold uppercase tracking-widest hover:border-orange-400 hover:bg-orange-500/5 transition-all rounded text-sm flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" /> Audit Flash en 48h
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: '8', label: 'types d\'audits disponibles' },
                { value: '48h', label: 'délai audit flash' },
                { value: 'AFNOR', label: 'auditeur officiel certifié' },
                { value: '+300', label: 'audits réalisés' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-bold text-cyan-400">{item.value}</span>
                  <span className="text-xs text-slate-500 font-mono">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audits Grid */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Nos types d&apos;audits
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">01 // CATALOGUE</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AUDITS.map((audit, i) => (
                <a
                  key={i}
                  href={audit.href}
                  className="group glass-panel rounded-xl p-6 border border-white/5 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                      {audit.title}
                    </h3>
                    {audit.badge && (
                      <span className={`px-2 py-0.5 rounded text-[0.6rem] font-bold uppercase tracking-widest shrink-0 ml-2 ${
                        audit.badgeColor === 'cyan' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                        audit.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                        audit.badgeColor === 'purple' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {audit.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{audit.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {audit.tags.map((tag, j) => (
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

        {/* Livrables */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Ce que vous recevez après chaque audit
              </h2>
              <span className="text-cyan-500 font-mono text-xs hidden sm:block">02 // LIVRABLES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: FileText, title: 'Rapport exécutif', desc: 'Synthèse en langage business pour le COMEX et les dirigeants : risques, impacts financiers, recommandations stratégiques.' },
                { icon: Layers, title: 'Rapport technique détaillé', desc: 'Constats techniques avec preuves, niveaux de criticité (CVSS), et reproductibilité pour vos équipes IT.' },
                { icon: CheckCircle, title: 'Plan de remédiation priorisé', desc: 'Actions classées par niveau de risque (critique, élevé, moyen, faible) avec estimations d\'effort et de coût.' },
                { icon: Search, title: 'Restitution orale', desc: 'Session de restitution avec vos équipes techniques et dirigeants sous 5 jours ouvrés après la remise du rapport.' },
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

        {/* FAQ */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
              <h2 className="text-3xl font-light text-white tracking-tight">
                Questions fréquentes sur nos audits
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

        {/* Maillage */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-light text-white mb-6 border-b border-white/10 pb-3">Aller plus loin après l&apos;audit</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Validez vos corrections par un test d\'intrusion réel. Remboursé si aucune faille n\'est trouvée.' },
                { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'L\'audit de conformité identifie vos écarts NIS2. On vous accompagne ensuite pour les combler.' },
                { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Confiez le pilotage de vos audits récurrents à un RSSI externalisé expert.' },
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

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="glass-panel rounded-2xl p-12 border border-white/10">
              <Search className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                Quel audit pour votre entreprise ?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-lg mx-auto">
                Nos experts vous guident gratuitement vers l&apos;audit le plus adapté à votre contexte, votre secteur et votre budget.
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-cyan-500 text-[#030303] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-all rounded text-sm"
              >
                Parler à un expert
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
