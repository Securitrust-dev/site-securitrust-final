import Link from 'next/link';
import { ArrowRight, Network, ShieldCheck, KeyRound, Users, FileCheck2, CloudOff, Award, ClipboardCheck, FileText } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { LeadForm } from '@/components/brand/LeadForm';
import { CasCard } from '@/components/cas-clients/CasCard';
import { FAQSchema } from '@/components/StructuredData';
import { casBySlug, type CasClient } from '@/content/cas-clients';

// Page refondue le 29/10/2026 (gabarit RSSI) : page carrefour de l'offre d'audit,
// ciblée « audit cybersécurité » / « audit sécurité informatique ». URL conservée.

const FAQS = [
  {
    question: 'Qu’est-ce qu’un audit de cybersécurité ?',
    answer:
      'C’est une évaluation indépendante du niveau de sécurité de votre système d’information : organisation, procédures, configurations techniques, droits d’accès et pratiques des utilisateurs. Il aboutit à une liste de constats priorisés et à un plan d’action concret.',
  },
  {
    question: 'Quelle différence entre un audit de sécurité et un test d’intrusion ?',
    answer:
      'L’audit examine l’ensemble de votre sécurité, organisationnelle et technique, par rapport à un référentiel. Le test d’intrusion simule une attaque réelle sur un périmètre précis pour démontrer ce qu’un attaquant pourrait obtenir. Les deux sont complémentaires, et un audit complet intègre souvent des tests techniques.',
  },
  {
    question: 'Combien de temps dure un audit ?',
    answer:
      'Cela dépend du périmètre : un audit flash donne une première photographie en quelques jours, un audit complet d’une organisation multi-sites demande plusieurs semaines. La durée est fixée lors du cadrage, avant le démarrage.',
  },
  {
    question: 'Sur quels référentiels vous appuyez-vous ?',
    answer:
      'Selon votre contexte : ISO 27001 et ISO 27002, guide d’hygiène informatique de l’ANSSI, exigences NIS2 ou DORA, HDS pour la santé, TISAX pour l’automobile. Nous pouvons aussi construire une grille adaptée à votre secteur.',
  },
  {
    question: 'Un audit de cybersécurité est-il obligatoire ?',
    answer:
      'Il l’est de fait pour de nombreuses organisations : NIS2, DORA et ISO 27001 exigent d’évaluer régulièrement l’efficacité des mesures de sécurité. Il est aussi de plus en plus demandé par les clients, les donneurs d’ordre et les assureurs cyber.',
  },
  {
    question: 'Que contient le rapport d’audit ?',
    answer:
      'Une synthèse pour la direction, les constats détaillés avec leur niveau de risque, les preuves recueillies, et un plan d’action priorisé avec des recommandations réalistes. Les résultats sont présentés à vos équipes lors d’une réunion de restitution.',
  },
];

const TYPES = [
  { titre: 'Audit organisationnel', href: '/audit-organisationnel', texte: 'Gouvernance, politiques, rôles, gestion des risques et des incidents.' },
  { titre: 'Audit de sécurité technique', href: '/audit-securite-technique', texte: 'Architecture réseau, configurations, durcissement des systèmes.' },
  { titre: 'Tests d’intrusion', href: '/pentest', texte: 'Attaques simulées sur vos applications, votre réseau et votre Active Directory.' },
  { titre: 'Audit Microsoft 365', href: '/audit-o365', texte: 'Messagerie, identités, partages et configuration du tenant.' },
  { titre: 'Audit de code source', href: '/audit-code-source', texte: 'Revue de sécurité de vos applications développées en interne.' },
  { titre: 'Évaluation de maturité', href: '/evaluation-maturite', texte: 'Votre niveau mesuré sur une grille reconnue, comparable dans le temps.' },
  { titre: 'Audit d’écart (gap analysis)', href: '/gap-analysis', texte: 'L’écart avec ISO 27001, NIS2 ou DORA, et le plan pour le combler.' },
  { titre: 'Audit flash', href: '/audit-flash', texte: 'Une première photographie de votre sécurité, en quelques jours.' },
];

const PERIMETRE = [
  { icon: Network, titre: 'Architecture réseau', texte: 'Cloisonnement, flux, accès distants, exposition sur Internet.' },
  { icon: ShieldCheck, titre: 'Dispositifs de sécurité', texte: 'Pare-feu, antivirus et EDR, sauvegardes, journalisation.' },
  { icon: KeyRound, titre: 'Droits d’accès', texte: 'Comptes à privilèges, gestion des identités, authentification forte.' },
  { icon: Users, titre: 'Pratiques des utilisateurs', texte: 'Sensibilisation, mots de passe, réaction face à l’hameçonnage.' },
  { icon: FileCheck2, titre: 'Gouvernance et conformité', texte: 'Politiques, procédures, gestion des risques, exigences réglementaires.' },
  { icon: CloudOff, titre: 'Shadow IT', texte: 'Applications et services cloud utilisés sans validation de la DSI, hors de tout contrôle.' },
];

const ETAPES = [
  { titre: 'Cadrage', texte: 'Objectifs, périmètre, référentiel et planning, validés avec vous.' },
  { titre: 'Collecte', texte: 'Entretiens avec les équipes, revue documentaire, inventaire des actifs.' },
  { titre: 'Analyse technique', texte: 'Vérification des configurations et, si prévu, tests d’intrusion ciblés.' },
  { titre: 'Évaluation des risques', texte: 'Chaque constat est qualifié selon sa probabilité et son impact métier.' },
  { titre: 'Restitution et plan d’action', texte: 'Présentation à la direction et aux équipes, recommandations priorisées.' },
];

const CAS = [
  'verspieren-audit-annuel-iso-27001',
  'groupe-adp-audit-interne-iso-27001',
  'cegedim-activ-audits-internes-iso-27001-dora',
  'cavp-evaluation-maturite-cyber-guide-hygiene-anssi',
  'brgm-audit-interne-iso-27001-formation-auditeurs',
  'telediag-audit-interne-iso-27001',
].map(casBySlug).filter((c): c is CasClient => Boolean(c));

export default function AuditCybersecuritePage() {
  return (
    <StaticThemeShell>
      <FAQSchema faqs={FAQS} />

      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <span className="now">Audit de cybersécurité</span>
          </p>
          <div className="hero-split">
            <div>
              <span className="eyebrow">Audit de cybersécurité · Paris</span>
              <h1>
                Audit de cybersécurité&nbsp;: <span className="hl">sachez où vous en êtes</span>, et quoi faire ensuite
              </h1>
              <p className="hero-sub">
                Nos auditeurs évaluent la <b>sécurité de votre système d’information</b>, de l’organisation aux
                configurations techniques, au regard des référentiels qui vous concernent. Vous obtenez une vision claire
                de vos risques et un <b>plan d’action priorisé</b>.
              </p>
              <ul className="fact-row">
                <li><Award size={16} /> Auditeurs ISO 27001 Lead Auditor</li>
                <li><ClipboardCheck size={16} /> ISO 27001, ANSSI, NIS2, DORA</li>
                <li><FileText size={16} /> Plan d’action priorisé</li>
              </ul>
            </div>
            <div id="devis" style={{ scrollMarginTop: 110 }}>
              <LeadForm
                formId="audit_cybersecurite"
                source="Audit cybersécurité"
                title="Demander un audit"
                subtitle="Présentez votre contexte : un auditeur vous rappelle pour cadrer la mission."
                messageLabel="Votre besoin (facultatif)"
                messagePlaceholder="Ex. : audit avant certification ISO 27001, exigence d’un client, NIS2…"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Nos audits</span>
            <h2>Un audit adapté à chaque besoin</h2>
            <p>
              De la photographie rapide à l’audit approfondi, choisissez l’angle qui répond à votre question, ou combinez-les
              dans un audit de sécurité informatique complet.
            </p>
          </div>
          <div className="case-grid">
            {TYPES.map((t) => (
              <Link key={t.href} href={t.href} className="case-card">
                <span className="case-client" style={{ fontSize: 19 }}>{t.titre}</span>
                <span className="case-mission">{t.texte}</span>
                <span className="case-more">Découvrir <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Ce que nous examinons</span>
            <h2>Le périmètre d’un audit de sécurité</h2>
            <p>
              En croisant ces dimensions, l’auditeur identifie les failles qu’un attaquant pourrait exploiter, et celles que
              vos processus laissent passer.
            </p>
          </div>
          <div className="grid-3">
            {PERIMETRE.map(({ icon: Icon, titre, texte }) => (
              <article key={titre} className="pilier">
                <span className="pilier-icon"><Icon size={22} /></span>
                <h3>{titre}</h3>
                <p>{texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">La méthode</span>
            <h2>Un audit en cinq étapes</h2>
          </div>
          <div className="grid-3">
            {ETAPES.map((e, i) => (
              <article key={e.titre} className="pilier">
                <span className="step-num">ÉTAPE {String(i + 1).padStart(2, '0')}</span>
                <h3>{e.titre}</h3>
                <p>{e.texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Cas clients</span>
            <h2>Ils nous confient leurs audits</h2>
            <p>Assurance, transport aérien, santé, secteur public : des audits menés selon la même exigence que les audits de certification.</p>
          </div>
          <div className="case-grid">
            {CAS.map((c) => <CasCard key={c.slug} cas={c} />)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Questions fréquentes</span>
            <h2>Audit de cybersécurité : vos questions</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cta-box">
            <h2>Faites le point sur votre sécurité</h2>
            <p>Un échange de 30 minutes pour définir le bon périmètre d’audit et recevoir une proposition.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href="#devis" className="btn-primary">Demander un audit <ArrowRight size={16} /></a>
              <Link href="/cas-clients" className="btn-ghost">Voir nos cas clients <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </StaticThemeShell>
  );
}
