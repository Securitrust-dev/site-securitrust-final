// Page pilier DORA (J3.2) — requête principale : « conformité dora ».
// Faits : règlement (UE) 2022/2554, applicable depuis le 17 janvier 2025.

export default {
  slug: 'dora',
  file: 'dora.html',
  path: '/dora',
  name: 'DORA',
  service: 'DORA',
  updated: '2026-10-26',
  guideTitle: 'Conformité DORA : le guide de la résilience opérationnelle numérique',
  intro:
    'Depuis le 17 janvier 2025, le règlement DORA s’applique directement aux banques, assureurs, sociétés de gestion, prestataires de paiement et à la plupart des acteurs financiers européens, ainsi qu’à leurs prestataires informatiques. Ce guide explique ce que le texte exige, pilier par pilier, et comment organiser une mise en conformité proportionnée.',
  sections: [
    {
      id: 'dora-definition',
      title: 'Qu’est-ce que le règlement DORA ?',
      html: `<p><strong>DORA</strong> (Digital Operational Resilience Act) est le règlement (UE) 2022/2554 sur la résilience opérationnelle numérique du secteur financier. Il est entré en application le <strong>17 janvier 2025</strong>.</p>
<p>Contrairement à NIS2, qui est une directive, DORA est un <strong>règlement</strong> : il s’applique tel quel dans tous les États membres, sans loi de transposition. Il est complété par des normes techniques (RTS et ITS) adoptées par la Commission européenne sur proposition des autorités européennes de surveillance (ABE, AEAPP, AEMF), qui précisent notamment la classification des incidents, le contenu du registre d’informations et les tests avancés.</p>
<p>Son objectif : qu’une entité financière puisse <strong>résister à une perturbation informatique grave, y répondre et s’en rétablir</strong>, qu’elle vienne d’une cyberattaque, d’une panne ou de la défaillance d’un prestataire. Pour les entités financières, DORA constitue la règle spécifique en matière de cybersécurité, qui prévaut sur les exigences équivalentes de NIS2.</p>`,
    },
    {
      id: 'dora-concerne',
      title: 'Qui est concerné par DORA ?',
      html: `<p>DORA vise une vingtaine de catégories d’entités financières, parmi lesquelles :</p>
<ul>
<li>les établissements de crédit, établissements de paiement et de monnaie électronique ;</li>
<li>les entreprises d’investissement, sociétés de gestion (OPCVM et FIA) et prestataires de services sur crypto-actifs ;</li>
<li>les entreprises d’assurance et de réassurance, intermédiaires d’assurance et institutions de retraite professionnelle ;</li>
<li>les infrastructures de marché : plates-formes de négociation, dépositaires centraux, contreparties centrales, référentiels centraux ;</li>
<li>les agences de notation, administrateurs d’indices de référence critiques et prestataires de financement participatif.</li>
</ul>
<p>En France, la supervision est assurée par l’<strong>ACPR</strong> et l’<strong>AMF</strong> selon le statut de l’entité.</p>
<h3>Et les prestataires informatiques ?</h3>
<p>Les <strong>prestataires tiers de services TIC</strong> (éditeurs, hébergeurs, infogérants, fournisseurs cloud) sont concernés de deux façons. Tous voient leurs contrats avec les entités financières enrichis de clauses obligatoires (niveaux de service, droit d’audit, notification des incidents, stratégie de sortie). Les plus critiques pour le secteur sont désignés par les autorités européennes et placés sous une supervision directe.</p>
<h3>Le principe de proportionnalité</h3>
<p>Les exigences s’appliquent en tenant compte de la taille, du profil de risque et de la complexité de chaque entité. Certaines petites entités bénéficient d’un cadre simplifié de gestion des risques TIC (article 16).</p>`,
    },
    {
      id: 'dora-piliers',
      title: 'Les 5 piliers de DORA en détail',
      html: `<h3>1. Gestion des risques liés aux TIC</h3>
<p>Un cadre documenté, approuvé et supervisé par l’organe de direction, qui couvre l’identification des actifs et dépendances, la protection et la prévention, la détection, la réponse et le rétablissement, les sauvegardes, l’apprentissage après incident et la communication de crise. L’organe de direction en porte la responsabilité finale et doit se former.</p>
<h3>2. Gestion, classification et notification des incidents</h3>
<p>Les incidents liés aux TIC sont enregistrés, classés selon des critères communs (clients touchés, durée, étendue géographique, pertes de données, criticité des services, impact économique) et, lorsqu’ils sont <strong>majeurs</strong>, notifiés à l’autorité compétente :</p>
<ul>
<li>notification initiale dans les <strong>4 heures</strong> suivant la classification comme majeur, et au plus tard <strong>24 heures</strong> après en avoir eu connaissance ;</li>
<li>rapport intermédiaire dans les <strong>72 heures</strong> suivant la notification initiale ;</li>
<li>rapport final dans le <strong>mois</strong> qui suit.</li>
</ul>
<h3>3. Tests de résilience opérationnelle numérique</h3>
<p>Un programme de tests proportionné : évaluations de vulnérabilités, analyses de code, tests de scénarios, tests de performance et <strong>tests d’intrusion</strong>, au moins une fois par an sur les systèmes qui soutiennent des fonctions critiques ou importantes. Les entités désignées par l’autorité réalisent en plus, au moins tous les trois ans, des <strong>tests de pénétration fondés sur la menace (TLPT)</strong>, selon le cadre TIBER-EU.</p>
<h3>4. Gestion des risques liés aux prestataires tiers TIC</h3>
<p>C’est souvent le chantier le plus lourd : stratégie de recours aux prestataires, analyse préalable des risques, <strong>clauses contractuelles obligatoires</strong> (article 30), stratégies de sortie testables et tenue d’un <strong>registre d’informations</strong> recensant tous les contrats de services TIC, transmis aux autorités.</p>
<h3>5. Partage d’informations</h3>
<p>Les entités peuvent échanger entre elles des informations sur les menaces (indicateurs de compromission, tactiques des attaquants) dans des dispositifs de confiance, sous réserve d’en informer l’autorité.</p>`,
    },
    {
      id: 'dora-erreurs',
      title: 'Les écarts que nous rencontrons le plus souvent',
      html: `<ul>
<li><strong>Registre d’informations incomplet</strong> : sous-traitants en cascade non identifiés, fonctions critiques mal rattachées aux contrats.</li>
<li><strong>Contrats non mis à jour</strong> : droit d’audit, notification d’incident et stratégie de sortie absents des contrats historiques.</li>
<li><strong>Classification des incidents théorique</strong> : critères non outillés, aucun exercice pour tenir le délai de 4 heures.</li>
<li><strong>Tests limités à un scan annuel</strong>, sans test d’intrusion sur les applications et l’Active Directory qui portent les fonctions critiques.</li>
<li><strong>Cartographie des fonctions critiques absente</strong>, alors que c’est elle qui détermine l’étendue de toutes les autres exigences.</li>
</ul>`,
    },
    {
      id: 'dora-demarche',
      title: 'Une démarche de mise en conformité en 5 étapes',
      html: `<ol>
<li><strong>Identifier les fonctions critiques ou importantes</strong> et les actifs TIC, processus et prestataires qui les soutiennent.</li>
<li><strong>Réaliser un audit d’écart</strong> pilier par pilier, au regard du règlement et des normes techniques.</li>
<li><strong>Traiter le chantier prestataires</strong> : registre d’informations, revue et avenants contractuels, plans de sortie.</li>
<li><strong>Outiller la gestion des incidents</strong> : grille de classification, circuit de décision, modèles de notification, exercice de crise.</li>
<li><strong>Lancer le programme de tests</strong> : tests d’intrusion annuels sur le périmètre critique, puis préparation aux TLPT si vous êtes désigné.</li>
</ol>
<p>Pour les prestataires informatiques du secteur financier, la priorité est de pouvoir répondre aux questionnaires et aux clauses de leurs clients : documentation de la sécurité, gestion des incidents, droit d’audit, continuité.</p>`,
    },
  ],
  faq: [
    {
      question: 'Depuis quand DORA s’applique-t-il ?',
      answer:
        'Le règlement DORA s’applique depuis le 17 janvier 2025 dans toute l’Union européenne. S’agissant d’un règlement, il n’a pas besoin d’être transposé en droit national. Il est complété par des normes techniques réglementaires et d’exécution qui précisent ses exigences.',
    },
    {
      question: 'Quelle est la différence entre DORA et NIS2 ?',
      answer:
        'NIS2 est une directive transversale qui couvre 18 secteurs et doit être transposée par chaque État. DORA est un règlement propre au secteur financier, directement applicable et plus détaillé, notamment sur les prestataires TIC et les tests. Pour les entités financières, DORA prévaut sur les exigences équivalentes de NIS2.',
    },
    {
      question: 'Un prestataire informatique est-il concerné par DORA ?',
      answer:
        'Indirectement, oui, s’il fournit des services TIC à une entité financière : ses contrats doivent intégrer les clauses imposées par l’article 30 (niveaux de service, droit d’audit, notification des incidents, sortie). Les prestataires jugés critiques pour le secteur sont en outre soumis à la supervision directe des autorités européennes.',
    },
    {
      question: 'Qu’est-ce que le registre d’informations DORA ?',
      answer:
        'C’est l’inventaire de tous les accords contractuels de services TIC d’une entité financière, avec les prestataires, sous-traitants et fonctions soutenues. Son format est fixé par une norme technique européenne. Il est tenu à jour en continu et transmis aux autorités compétentes, en France l’ACPR ou l’AMF.',
    },
    {
      question: 'Les tests d’intrusion sont-ils obligatoires avec DORA ?',
      answer:
        'Oui. Le programme de tests de résilience doit inclure des tests d’intrusion, au moins annuels, sur les systèmes qui soutiennent des fonctions critiques ou importantes. Les entités désignées par leur autorité doivent en plus conduire tous les trois ans des tests de pénétration fondés sur la menace (TLPT).',
    },
    {
      question: 'Quels sont les délais de notification d’un incident majeur DORA ?',
      answer:
        'La notification initiale intervient dans les 4 heures suivant la classification de l’incident comme majeur, et au plus tard 24 heures après sa détection. Suivent un rapport intermédiaire dans les 72 heures et un rapport final dans le mois.',
    },
  ],
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Nos accompagnements réglementaires, de l’audit d’écart au pilotage.' },
    { label: 'Pentest', href: '/pentest', description: 'Les tests d’intrusion annuels exigés par DORA sur vos fonctions critiques.' },
    { label: 'Directive NIS2', href: '/nis2', description: 'Le cadre transversal, utile pour vos filiales et prestataires hors secteur financier.' },
    { label: 'PCA / PRA', href: '/pcapra', description: 'Continuité et reprise d’activité, au cœur du premier pilier de DORA.' },
    { label: 'Secteur banque & finance', href: '/secteurs/banque-finance', description: 'Nos interventions auprès des acteurs financiers.' },
  ],
  articles: ['dora-registre-d-informations-prestataires-tic-mode-d-emploi'],
};
