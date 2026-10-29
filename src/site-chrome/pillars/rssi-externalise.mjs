// Page pilier RSSI externalisé (J3.5) — requête principale : « rssi externalisé ».
// Rendue dans la page React /rssi-externalise via <PillarGuide slug="rssi-externalise" />.

export default {
  slug: 'rssi-externalise',
  file: null, // page React, pas de landing statique
  path: '/rssi-externalise',
  name: 'RSSI externalisé',
  service: 'RSSI externalisé',
  updated: '2026-10-26',
  guideTitle: 'RSSI externalisé : le guide pour piloter votre cybersécurité sans recruter',
  intro:
    'Un RSSI externalisé, c’est un responsable de la sécurité des systèmes d’information mis à disposition à temps partagé : il définit votre stratégie, pilote vos projets de sécurité et vous représente face aux clients et aux auditeurs, pour une fraction du coût d’un poste à plein temps. Ce guide explique ce que recouvre la mission, à qui elle s’adresse et comment elle se met en place.',
  sections: [
    {
      id: 'rssi-definition',
      title: 'Qu’est-ce qu’un RSSI externalisé ?',
      html: `<p>Le <strong>RSSI</strong> (Responsable de la Sécurité des Systèmes d’Information), ou CISO en anglais, est la personne qui porte la cybersécurité au niveau de la direction : il fixe le cap, arbitre les risques et fait le lien entre les enjeux métier et la technique. Beaucoup d’organisations en ont besoin sans pouvoir justifier un recrutement à temps plein, difficile et coûteux sur un marché en tension.</p>
<p>Le <strong>RSSI externalisé</strong> (ou à temps partagé) répond à ce besoin : un expert senior intervient quelques jours par mois selon un cadre défini, avec un engagement de continuité. Il ne s’agit ni d’un audit ponctuel, ni d’une prestation purement technique, mais d’un <strong>pilotage dans la durée</strong>.</p>`,
    },
    {
      id: 'rssi-pour-qui',
      title: 'À qui s’adresse cette mission ?',
      html: `<ul>
<li><strong>PME et ETI</strong> qui doivent structurer leur sécurité sans créer de poste dédié ;</li>
<li>organisations confrontées à une <strong>exigence réglementaire</strong> (NIS2, DORA) ou de certification (ISO 27001, HDS) et qui ont besoin d’un responsable identifié ;</li>
<li>entreprises dont les <strong>clients ou assureurs</strong> réclament un interlocuteur sécurité et des garanties ;</li>
<li>structures en <strong>transition</strong> : départ du RSSI, montée en charge, après un incident.</li>
</ul>`,
    },
    {
      id: 'rssi-perimetre',
      title: 'Ce que fait un RSSI externalisé',
      html: `<p>La mission se module selon vos enjeux, mais couvre en général :</p>
<ul>
<li><strong>Stratégie et gouvernance</strong> : analyse de risques, politique de sécurité, feuille de route pluriannuelle, arbitrages budgétaires.</li>
<li><strong>Conformité</strong> : pilotage des démarches NIS2, DORA, ISO 27001, HDS, RGPD et préparation des audits.</li>
<li><strong>Pilotage opérationnel</strong> : suivi des mesures de sécurité, des prestataires et des projets, tableau de bord d’indicateurs.</li>
<li><strong>Gestion des tiers</strong> : évaluation des fournisseurs, clauses de sécurité, réponses aux questionnaires clients.</li>
<li><strong>Sensibilisation</strong> des équipes et de la direction.</li>
<li><strong>Préparation et gestion de crise</strong> : plan de réponse, exercices, accompagnement en cas d’incident.</li>
</ul>`,
    },
    {
      id: 'rssi-interet',
      title: 'Les avantages par rapport à un recrutement',
      html: `<ul>
<li><strong>Coût maîtrisé</strong> : vous payez le niveau d’expertise dont vous avez besoin, au rythme qui convient, sans charge d’un plein temps.</li>
<li><strong>Expertise immédiate</strong> : un profil senior opérationnel dès le premier jour, sans délai de recrutement.</li>
<li><strong>Vision large</strong> : un RSSI externalisé intervient sur plusieurs organisations et apporte des pratiques éprouvées.</li>
<li><strong>Continuité</strong> : l’expert est adossé à un cabinet, ce qui évite la dépendance à une seule personne et assure le relais en cas d’absence.</li>
<li><strong>Indépendance</strong> : un regard extérieur, utile pour arbitrer face aux habitudes internes.</li>
</ul>`,
    },
    {
      id: 'rssi-demarrage',
      title: 'Comment se met en place la mission',
      html: `<ol>
<li><strong>Cadrage</strong> : enjeux, périmètre, niveau d’engagement (jours par mois), interlocuteurs.</li>
<li><strong>État des lieux</strong> : diagnostic de maturité, cartographie des risques et des obligations applicables.</li>
<li><strong>Feuille de route</strong> : priorités, planning, budget, indicateurs de suivi.</li>
<li><strong>Exécution pilotée</strong> : avancement des chantiers, points réguliers avec la direction, relation avec les prestataires.</li>
<li><strong>Revue et ajustement</strong> : revue périodique des risques et de la feuille de route, adaptation du rythme.</li>
</ol>
<p>Le dimensionnement s’ajuste dans le temps : plus soutenu au démarrage ou en préparation d’une certification, allégé en rythme de croisière.</p>`,
    },
  ],
  faq: [
    {
      question: 'Quelle différence entre un RSSI externalisé et un consultant en cybersécurité ?',
      answer:
        'Un consultant intervient sur une mission délimitée (un audit, un projet) puis s’en va. Le RSSI externalisé s’inscrit dans la durée : il porte la responsabilité du pilotage de la sécurité, suit les risques en continu et vous représente auprès des clients et des auditeurs.',
    },
    {
      question: 'Combien de jours par mois faut-il prévoir ?',
      answer:
        'Cela dépend de la taille de l’organisation, de ses enjeux réglementaires et de la phase : souvent plus soutenu au démarrage ou avant une certification, puis allégé en rythme de croisière. Le dimensionnement est défini au cadrage et revu régulièrement.',
    },
    {
      question: 'Un RSSI externalisé peut-il nous aider pour NIS2 ou ISO 27001 ?',
      answer:
        'Oui, c’est un cas d’usage fréquent. Il pilote la démarche de bout en bout : analyse de risques, plan d’action, mise en conformité, préparation et suivi des audits, puis maintien dans le temps une fois la certification obtenue ou la loi applicable.',
    },
    {
      question: 'Que se passe-t-il en cas d’incident de sécurité ?',
      answer:
        'Le RSSI externalisé prépare en amont le plan de réponse et les exercices, puis vous accompagne pendant la crise : qualification, décisions, communication, coordination des intervenants et, le cas échéant, notification aux autorités dans les délais réglementaires.',
    },
    {
      question: 'Dépend-on d’une seule personne ?',
      answer:
        'Non. L’expert est adossé à un cabinet, ce qui garantit un relais en cas d’absence, l’accès à des compétences complémentaires (pentest, conformité, juridique) et la continuité de la documentation et du pilotage.',
    },
  ],
  resource: null,
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Les démarches que votre RSSI externalisé peut piloter.' },
    { label: 'Directive NIS2', href: '/nis2', description: 'Un responsable identifié pour porter la conformité NIS2.' },
    { label: 'Certification ISO 27001', href: '/iso27001', description: 'Construire et faire vivre votre SMSI.' },
    { label: 'Pilotage du SMSI', href: '/pilotage-smsi', description: 'Le pilotage opérationnel de votre système de management.' },
    { label: 'Tous nos pentests', href: '/pentest', description: 'Les tests que votre RSSI planifie et exploite.' },
  ],
  articles: [],
};
