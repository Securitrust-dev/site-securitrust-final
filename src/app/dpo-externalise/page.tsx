import Link from 'next/link';
import { ArrowRight, Scale, FileText, ShieldAlert, Users, BookOpen, Handshake, Award, Clock, UserCheck } from 'lucide-react';
import { StaticThemeShell } from '@/components/static-theme/StaticThemeShell';
import { LeadForm } from '@/components/brand/LeadForm';
import { CasCard } from '@/components/cas-clients/CasCard';
import { FAQSchema } from '@/components/StructuredData';
import { CAS_CLIENTS } from '@/content/cas-clients';

// Page refondue le 29/10/2026 (gabarit RSSI), ciblée « DPO externalisé ». URL conservée.

const FAQS = [
  {
    question: 'Mon organisme doit-il désigner un DPO ?',
    answer:
      'La désignation est obligatoire pour les autorités et organismes publics, et pour les organismes dont l’activité principale implique un suivi régulier et systématique des personnes à grande échelle, ou le traitement à grande échelle de données sensibles (santé, par exemple). Dans les autres cas, elle reste recommandée par la CNIL : le DPO pilote alors la conformité de façon structurée.',
  },
  {
    question: 'DPO interne ou externalisé : que choisir ?',
    answer:
      'Un DPO interne doit disposer du temps, des compétences et de l’indépendance nécessaires, ce qui est difficile à réunir dans une PME ou une ETI. Le DPO externalisé apporte une expertise immédiate, une vraie indépendance vis-à-vis des équipes et une continuité de service, pour un coût ajusté au temps réellement nécessaire.',
  },
  {
    question: 'Comment se passe la désignation auprès de la CNIL ?',
    answer:
      'La désignation se fait en ligne sur le site de la CNIL. Nous vous accompagnons dans la démarche : le DPO externalisé est désigné nommément, et ses coordonnées de contact sont publiées pour les personnes concernées.',
  },
  {
    question: 'Le DPO est-il responsable en cas de manquement ?',
    answer:
      'Non. Le responsable de traitement, c’est-à-dire votre organisation, reste responsable de la conformité. Le DPO informe, conseille, contrôle et alerte ; il vous aide à démontrer votre conformité, sans s’y substituer.',
  },
  {
    question: 'Quelle différence entre un DPO et un RSSI ?',
    answer:
      'Le DPO veille à la protection des données personnelles et au respect du RGPD. Le RSSI pilote la sécurité de l’ensemble du système d’information. Les deux fonctions travaillent ensemble, notamment en cas de violation de données : SecuriTrust peut assurer l’une ou l’autre, ou les deux de façon coordonnée.',
  },
  {
    question: 'Combien de temps le DPO consacre-t-il à mon organisation ?',
    answer:
      'Le temps est défini avec vous selon le nombre de traitements, la sensibilité des données et votre niveau de conformité de départ. Il est plus important pendant la mise en conformité, puis se stabilise en pilotage continu avec un reporting régulier.',
  },
];

const MISSIONS = [
  { icon: BookOpen, titre: 'Informer et conseiller', texte: 'Votre direction et vos équipes sur leurs obligations, et sur chaque nouveau projet qui traite des données personnelles.' },
  { icon: FileText, titre: 'Tenir la conformité', texte: 'Registre des traitements, analyses d’impact (AIPD), mentions d’information, durées de conservation.' },
  { icon: Users, titre: 'Répondre aux personnes', texte: 'Demandes d’accès, de rectification, d’effacement ou d’opposition, dans les délais légaux.' },
  { icon: ShieldAlert, titre: 'Gérer les violations', texte: 'Qualification de l’incident, notification à la CNIL sous 72 heures si nécessaire, information des personnes.' },
  { icon: Handshake, titre: 'Encadrer les sous-traitants', texte: 'Clauses contractuelles et accords de traitement (DPA) avec vos prestataires et vos clients.' },
  { icon: Scale, titre: 'Dialoguer avec la CNIL', texte: 'Point de contact de l’autorité, y compris en cas de plainte ou de contrôle.' },
];

const POURQUOI = [
  { titre: 'Indépendance', texte: 'Le RGPD exige un DPO sans conflit d’intérêts. Un DPO externe n’est ni juge ni partie de vos décisions internes.' },
  { titre: 'Expertise immédiate', texte: 'Juridique et cybersécurité réunies : pas de période de montée en compétence.' },
  { titre: 'Coût maîtrisé', texte: 'Vous payez le temps réellement nécessaire, sans recrutement ni charges fixes.' },
  { titre: 'Continuité', texte: 'Pas de rupture en cas de départ ou d’absence : la fonction est assurée par une équipe.' },
];

const ETAPES = [
  { titre: 'Diagnostic RGPD', texte: 'État des lieux de vos traitements, de vos documents et de vos pratiques.' },
  { titre: 'Désignation', texte: 'Désignation du DPO auprès de la CNIL et information des personnes concernées.' },
  { titre: 'Mise en conformité', texte: 'Registre, AIPD, mentions, contrats, procédures : un plan d’action priorisé et suivi.' },
  { titre: 'Pilotage continu', texte: 'Conseil au fil de l’eau, veille réglementaire, sensibilisation et reporting régulier à la direction.' },
];

const LIENS = [
  { titre: 'Mise en conformité RGPD', href: '/rgpd', texte: 'Audit RGPD et feuille de route de mise en conformité.' },
  { titre: 'DPA et sous-traitance', href: '/dpa-rgpd', texte: 'Vos accords de traitement avec clients et prestataires.' },
  { titre: 'RSSI externalisé', href: '/rssi-externalise', texte: 'La sécurité du système d’information, pilotée à temps partagé.' },
  { titre: 'AI Act', href: '/ia-act', texte: 'Encadrer vos usages de l’intelligence artificielle.' },
];

export default function DPOExternalisePage() {
  const cas = CAS_CLIENTS.filter((c) => c.offres.includes('rgpd')).slice(0, 6);
  return (
    <StaticThemeShell>
      <FAQSchema faqs={FAQS} />

      <section className="hero-simple">
        <div className="wrap">
          <p className="crumb">
            <Link href="/">Accueil</Link>
            <span className="sep">›</span>
            <Link href="/gouvernance-conformite">Gouvernance &amp; conformité</Link>
            <span className="sep">›</span>
            <span className="now">DPO externalisé</span>
          </p>
          <div className="hero-split">
            <div>
              <span className="eyebrow">DPO externalisé · Paris</span>
              <h1>
                DPO externalisé&nbsp;: <span className="hl">votre délégué à la protection des données</span>, sans recrutement
              </h1>
              <p className="hero-sub">
                SecuriTrust assure la fonction de <b>délégué à la protection des données (DPO)</b> pour votre organisation :
                désignation auprès de la CNIL, registre des traitements, demandes des personnes, violations de données. Vous
                êtes conforme au <b>RGPD</b> et vous le démontrez.
              </p>
              <ul className="fact-row">
                <li><UserCheck size={16} /> DPO désigné auprès de la CNIL</li>
                <li><Award size={16} /> Cabinet certifié ISO 27001</li>
                <li><Clock size={16} /> Notification CNIL sous 72 h</li>
              </ul>
            </div>
            <div id="devis" style={{ scrollMarginTop: 110 }}>
              <LeadForm
                formId="dpo_externalise"
                source="DPO externalisé"
                title="Parler à un DPO"
                subtitle="Décrivez votre organisation : nous vous rappelons pour évaluer votre besoin."
                messageLabel="Votre contexte (facultatif)"
                messagePlaceholder="Ex. : 80 salariés, données de santé, DPO à désigner…"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Les missions</span>
            <h2>Ce que fait votre DPO externalisé</h2>
            <p>
              Le RGPD confie au délégué à la protection des données un rôle d’information, de conseil et de contrôle.
              Concrètement, voici ce que nous prenons en charge.
            </p>
          </div>
          <div className="grid-3">
            {MISSIONS.map(({ icon: Icon, titre, texte }) => (
              <article key={titre} className="pilier">
                <span className="pilier-icon"><Icon size={22} /></span>
                <h3>{titre}</h3>
                <p>{texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Pourquoi externaliser</span>
            <h2>Les avantages d’un DPO externe</h2>
            <p>Une alternative au recrutement, adaptée aux PME, aux ETI et aux organismes publics.</p>
          </div>
          <div className="grid-4">
            {POURQUOI.map((p) => (
              <article key={p.titre} className="pilier">
                <h3>{p.titre}</h3>
                <p>{p.texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">La démarche</span>
            <h2>De la désignation au pilotage continu</h2>
          </div>
          <div className="grid-4">
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
            <h2>Ils nous ont confié leur conformité RGPD</h2>
            <p>Réassurance, petite enfance, éditeurs SaaS, conseil : des organisations de toutes tailles.</p>
          </div>
          <div className="case-grid">
            {cas.map((c) => <CasCard key={c.slug} cas={c} />)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Questions fréquentes</span>
            <h2>DPO externalisé : vos questions</h2>
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

      <section className="sec sec--dark">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Aller plus loin</span>
            <h2>Protection des données et sécurité</h2>
          </div>
          <div className="case-grid">
            {LIENS.map((l) => (
              <Link key={l.href} href={l.href} className="case-card">
                <span className="case-client" style={{ fontSize: 19 }}>{l.titre}</span>
                <span className="case-mission">{l.texte}</span>
                <span className="case-more">Découvrir <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cta-box">
            <h2>Besoin d’un DPO dès maintenant ?</h2>
            <p>Un échange de 30 minutes pour évaluer votre situation et vous proposer un accompagnement adapté.</p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a href="#devis" className="btn-primary">Parler à un DPO <ArrowRight size={16} /></a>
              <Link href="/cas-clients" className="btn-ghost">Voir nos cas clients <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </StaticThemeShell>
  );
}
