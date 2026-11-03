// Page pilier RSSI externalisé (J3.5) — requête principale : « rssi externalisé ».
// Rendue dans la page React /rssi-externalise via <PillarGuide slug="rssi-externalise" />.

export default {
  slug: 'rssi-externalise',
  file: null, // page React, pas de landing statique
  path: '/rssi-externalise',
  name: 'RSSI externalisé',
  service: 'RSSI externalisé',
  updated: '2026-11-02',
  author: {
    name: 'Jad Joumblat',
    role: 'président-fondateur de SecuriTrust, plus de 20 ans d’expérience en cybersécurité',
    jobTitle: 'Président-fondateur',
    url: '/equipe#jad-joumblat',
    linkedin: 'https://fr.linkedin.com/in/jad-j-83379b19',
  },
  guideTitle: 'RSSI externalisé : le guide pour choisir et réussir votre mission',
  intro:
    'Faut-il un RSSI externalisé, un RSSI à temps partagé ou un vCISO ? Quand faire appel à lui, comment il porte vos obligations NIS2, DORA ou ISO 27001, et sur quels critères le choisir ? Ce guide répond aux questions que se posent les directions avant de confier la sécurité de leur système d’information à un expert externe.',
  sections: [
    {
      id: 'rssi-differences',
      title: 'RSSI externalisé, RSSI à temps partagé, vCISO : quelles différences ?',
      html: `<p>Ces termes désignent le <strong>même modèle</strong> : un responsable de la sécurité des systèmes d’information qui n’est pas salarié de l’entreprise et qui intervient une partie de son temps. « RSSI externalisé » insiste sur le fait que la fonction est confiée à un prestataire, « <strong>RSSI à temps partagé</strong> » sur le rythme d’intervention, et <strong>vCISO</strong> (virtual CISO) est l’équivalent anglo-saxon.</p>
<p>Le modèle se distingue en revanche nettement de deux autres prestations :</p>
<ul>
<li><strong>Le consultant en cybersécurité</strong> réalise une mission délimitée (un audit, un projet) puis s’en va ; le RSSI externalisé porte la responsabilité du pilotage dans la durée.</li>
<li><strong>Le RSSI en régie ou en intérim</strong> remplace un salarié à plein temps sur une période donnée ; le RSSI externalisé est dimensionné au juste besoin et adossé à un cabinet qui assure la continuité.</li>
</ul>`,
    },
    {
      id: 'rssi-pour-qui',
      title: 'À qui s’adresse un RSSI externalisé ?',
      html: `<ul>
<li><strong>PME et ETI</strong> qui doivent structurer leur sécurité sans créer de poste dédié ;</li>
<li>organisations confrontées à une <strong>exigence réglementaire</strong> (NIS2, DORA) ou de certification (ISO 27001, HDS) et qui ont besoin d’un responsable identifié ;</li>
<li>entreprises dont les <strong>clients ou assureurs</strong> réclament un interlocuteur sécurité, des questionnaires remplis et des garanties ;</li>
<li>éditeurs et entreprises du numérique qui répondent à des <strong>appels d’offres</strong> exigeant une gouvernance de la sécurité ;</li>
<li>structures en <strong>transition</strong> : départ du RSSI, croissance rapide, rachat, après un incident.</li>
</ul>`,
    },
    {
      id: 'rssi-quand',
      title: 'Quand faire appel à un RSSI externalisé ?',
      html: `<p>Plusieurs situations déclenchent en général la décision :</p>
<ul>
<li><strong>Une obligation nouvelle</strong> : l’entreprise entre dans le champ de NIS2 ou de DORA et doit démontrer une gestion des risques pilotée.</li>
<li><strong>Une certification à obtenir</strong> : un client ou un marché exige ISO 27001 ou HDS dans un délai donné.</li>
<li><strong>Une exigence client</strong> : questionnaires sécurité, audits de vos donneurs d’ordre, clauses contractuelles à tenir.</li>
<li><strong>Un départ</strong> : le RSSI quitte l’entreprise et le poste reste vacant pendant le recrutement.</li>
<li><strong>Un incident</strong> : après une attaque, la direction veut reprendre la main et éviter qu’elle se reproduise.</li>
</ul>`,
    },
    {
      id: 'rssi-paris',
      title: 'Un RSSI externalisé à Paris et en Île-de-France',
      html: `<p>SecuriTrust est installé à Paris, dans le 16<sup>e</sup> arrondissement (11 rue Saint-Didier). Pour les entreprises de Paris et d’Île-de-France, votre RSSI externalisé est présent <strong>sur site</strong> pour les moments qui comptent : comités de direction et comités sécurité, ateliers d’analyse de risques, audits et revues, gestion de crise. Le suivi courant se fait à distance, au rythme défini au cadrage.</p>
<p>Cette proximité permet de connaître vos équipes, vos locaux et vos prestataires, et d’intervenir vite quand un incident ou un audit l’exige. Hors d’Île-de-France, nos RSSI se déplacent également chez vous, sur votre siège comme sur vos autres sites, aux étapes clés de la mission.</p>`,
    },
    {
      id: 'rssi-conformite',
      title: 'RSSI externalisé et conformité NIS2, DORA, ISO 27001',
      html: `<p>Les principaux référentiels ne demandent pas un intitulé de poste, mais ils exigent une responsabilité de la sécurité <strong>identifiée, pilotée et suivie par la direction</strong>. C’est précisément le rôle du RSSI externalisé.</p>
<ul>
<li><strong><a href="/nis2">NIS2</a></strong> : les organes de direction approuvent les mesures de gestion des risques de cybersécurité, en supervisent la mise en œuvre et peuvent être tenus responsables (article 20). Le RSSI externalisé construit ces mesures, prépare les décisions et organise la notification des incidents importants (alerte précoce sous 24 heures, notification sous 72 heures).</li>
<li><strong><a href="/dora">DORA</a></strong> : les entités financières confient la gestion et la surveillance du risque lié aux TIC à une fonction de contrôle disposant d’un niveau d’indépendance suffisant. Un RSSI externalisé peut assumer ou soutenir cette fonction.</li>
<li><strong><a href="/iso27001">ISO 27001</a></strong> : la direction attribue les rôles et responsabilités du système de management de la sécurité de l’information. Le RSSI externalisé pilote le SMSI, l’analyse de risques, les audits internes et la revue de direction.</li>
</ul>`,
    },
    {
      id: 'rssi-choisir',
      title: 'Comment choisir son RSSI externalisé ?',
      html: `<ul>
<li><strong>La séniorité</strong> : une expérience réelle de RSSI, et des certifications reconnues (CISSP, CISM, ISO 27001 Lead Implementer ou Lead Auditor).</li>
<li><strong>Les références</strong> : des missions comparables à la vôtre par la taille, le secteur et les obligations. Demandez des <a href="/cas-clients">cas clients</a>.</li>
<li><strong>La continuité</strong> : un expert adossé à un cabinet, avec un relais identifié en cas d’absence et une documentation qui reste chez vous.</li>
<li><strong>L’indépendance</strong> : un RSSI qui ne vend pas de solutions logicielles recommande ce dont vous avez besoin, pas ce qu’il revend.</li>
<li><strong>Un cadre clair</strong> : rythme d’intervention, livrables, indicateurs et reporting définis dès le cadrage.</li>
</ul>`,
    },
  ],
  faq: [
    {
      question: 'Combien coûte un RSSI externalisé ?',
      answer:
        'Le prix dépend du nombre de jours d’intervention par mois, facturés au tarif journalier d’un consultant senior. Ce volume est fixé après un premier diagnostic selon la taille du système d’information, les obligations réglementaires, la maturité de départ et la phase de la mission. Le budget reste très inférieur au coût d’un RSSI salarié à temps plein, de 80 000 à 120 000 euros chargés par an.',
    },
    {
      question: 'Combien de jours par mois faut-il prévoir ?',
      answer:
        'Cela dépend de la taille de l’organisation, de ses enjeux réglementaires et de la phase : souvent plus soutenu au démarrage ou avant une certification, puis allégé en rythme de croisière. Le dimensionnement est défini au cadrage et revu régulièrement.',
    },
    {
      question: 'Quelle différence entre un RSSI externalisé et un consultant en cybersécurité ?',
      answer:
        'Un consultant intervient sur une mission délimitée (un audit, un projet) puis s’en va. Le RSSI externalisé s’inscrit dans la durée : il porte la responsabilité du pilotage de la sécurité, suit les risques en continu et vous représente auprès des clients et des auditeurs.',
    },
    {
      question: 'NIS2 oblige-t-elle à avoir un RSSI ?',
      answer:
        'La directive n’impose pas d’intitulé de poste, mais elle exige que la direction approuve et supervise les mesures de gestion des risques de cybersécurité, et qu’elle en réponde. En pratique, un responsable identifié qui pilote ces mesures et prépare les décisions est indispensable : c’est le rôle d’un RSSI, interne ou externalisé.',
    },
    {
      question: 'Un RSSI externalisé peut-il nous aider pour ISO 27001 ou DORA ?',
      answer:
        'Oui, c’est un cas d’usage fréquent. Il pilote la démarche de bout en bout : analyse de risques, plan d’action, mise en conformité, préparation et suivi des audits, puis maintien dans le temps une fois la certification obtenue ou la réglementation applicable.',
    },
    {
      question: 'Un RSSI externalisé peut-il remplacer temporairement notre RSSI ?',
      answer:
        'Oui. Après un départ ou pendant une absence longue, un RSSI externalisé reprend le pilotage, maintient les engagements en cours (audits, projets, réponses aux clients) et prépare, si vous le souhaitez, la passation avec le futur RSSI interne.',
    },
    {
      question: 'Que se passe-t-il en cas d’incident de sécurité ?',
      answer:
        'Le RSSI externalisé prépare en amont le plan de réponse et les exercices, puis vous accompagne pendant la crise : qualification, décisions, communication, coordination des intervenants et, le cas échéant, notification aux autorités dans les délais réglementaires.',
    },
    {
      question: 'Quelle différence entre un RSSI externalisé et un DPO externalisé ?',
      answer:
        'Le RSSI protège le système d’information et pilote la cybersécurité. Le DPO veille à la conformité des traitements de données personnelles au RGPD. Les deux rôles travaillent ensemble mais restent distincts ; SecuriTrust propose les deux.',
    },
    {
      question: 'Dépend-on d’une seule personne ?',
      answer:
        'Non. L’expert est adossé à un cabinet, ce qui garantit un relais en cas d’absence, l’accès à des compétences complémentaires (conformité, analyse de risques, technique, juridique) et la continuité de la documentation et du pilotage.',
    },
  ],
  resource: null,
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Les démarches que votre RSSI externalisé peut piloter.' },
    { label: 'Directive NIS2', href: '/nis2', description: 'Un responsable identifié pour porter la conformité NIS2.' },
    { label: 'Certification ISO 27001', href: '/iso27001', description: 'Construire et faire vivre votre SMSI.' },
    { label: 'Pilotage du SMSI', href: '/pilotage-smsi', description: 'Le pilotage opérationnel de votre système de management.' },
    { label: 'DPO externalisé', href: '/dpo-externalise', description: 'La conformité RGPD, complémentaire du RSSI externalisé.' },
    { label: 'Analyse de risques EBIOS RM', href: '/ebios-rm', description: 'La méthode utilisée par votre RSSI pour prioriser.' },
    { label: 'Cas clients', href: '/cas-clients', description: 'Des missions de RSSI externalisé et de conformité, détaillées.' },
  ],
  articles: [],
};
