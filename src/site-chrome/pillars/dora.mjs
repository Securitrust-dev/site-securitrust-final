// Page pilier DORA (J3.2, refonte sur le modèle NIS2) — requête principale : « conformité dora ».
// Faits datés au 27/10/2026 : règlement (UE) 2022/2554, applicable depuis le 17 janvier 2025 ;
// références des RTS/ITS publiés au JOUE (délégués 2024/1772, 2024/1773, 2024/1774, 2025/301,
// 2025/532, 2025/1190 ; exécution 2024/2956, 2025/302).

export default {
  slug: 'dora',
  file: 'dora.html',
  path: '/dora',
  name: 'DORA',
  service: 'DORA',
  updated: '2026-10-27',
  author: {
    name: 'Brice Gilbert',
    role: 'consultant senior Gouvernance, Risques & Conformité',
    url: '/equipe#brice-gilbert',
  },
  guideTitle: 'Conformité DORA : le guide complet de la résilience opérationnelle numérique',
  intro:
    'Depuis le 17 janvier 2025, le règlement DORA s’applique directement aux banques, assureurs, sociétés de gestion, prestataires de paiement et à la plupart des acteurs financiers européens, ainsi qu’à leurs prestataires informatiques. Ce guide détaille ce que le texte et ses normes techniques (RTS et ITS) exigent concrètement : registre d’informations, notification des incidents majeurs, tests d’intrusion et TLPT, clauses contractuelles de l’article 30. Il propose aussi une démarche de mise en conformité proportionnée.',
  sections: [
    {
      id: 'dora-definition',
      title: 'Qu’est-ce que le règlement DORA ?',
      html: `<p><strong>DORA</strong> (Digital Operational Resilience Act) est le règlement (UE) 2022/2554 sur la résilience opérationnelle numérique du secteur financier. Adopté le 14 décembre 2022, il est entré en application le <strong>17 janvier 2025</strong>.</p>
<p>Contrairement à NIS2, qui est une directive, DORA est un <strong>règlement</strong> : il s’applique tel quel dans tous les États membres, sans loi de transposition. Il est accompagné d’une directive « omnibus » (UE) 2022/2556, qui adapte les textes sectoriels existants (CRD, Solvabilité II, DSP2, MiFID…) pour y faire référence.</p>
<p>Son objectif : qu’une entité financière puisse <strong>résister à une perturbation informatique grave, y répondre et s’en rétablir</strong>, qu’elle vienne d’une cyberattaque, d’une panne ou de la défaillance d’un prestataire. Pour les entités financières, DORA constitue la règle spécifique en matière de cybersécurité, qui prévaut sur les exigences équivalentes de NIS2.</p>
<p>Le règlement est organisé autour de cinq piliers :</p>
<ol>
<li><strong>la gestion des risques liés aux TIC</strong> (articles 5 à 16) : un cadre documenté, approuvé et supervisé par l’organe de direction ;</li>
<li><strong>la gestion, la classification et la notification des incidents</strong> (articles 17 à 23) ;</li>
<li><strong>les tests de résilience opérationnelle numérique</strong> (articles 24 à 27), jusqu’aux TLPT ;</li>
<li><strong>la gestion des risques liés aux prestataires tiers de services TIC</strong> (articles 28 à 44), avec le registre d’informations, les clauses de l’article 30 et la supervision des prestataires critiques ;</li>
<li><strong>le partage d’informations</strong> sur les cybermenaces entre entités (article 45).</li>
</ol>`,
    },
    {
      id: 'dora-concerne',
      title: 'Qui est concerné par DORA ?',
      html: `<p>DORA vise une vingtaine de catégories d’entités financières (article 2), parmi lesquelles :</p>
<ul>
<li>les établissements de crédit, établissements de paiement et de monnaie électronique ;</li>
<li>les entreprises d’investissement, sociétés de gestion (OPCVM et FIA) et prestataires de services sur crypto-actifs ;</li>
<li>les entreprises d’assurance et de réassurance, intermédiaires d’assurance et institutions de retraite professionnelle ;</li>
<li>les infrastructures de marché : plates-formes de négociation, dépositaires centraux, contreparties centrales, référentiels centraux ;</li>
<li>les agences de notation, administrateurs d’indices de référence critiques et prestataires de financement participatif.</li>
</ul>
<p>En France, la supervision est assurée par l’<strong>ACPR</strong> et l’<strong>AMF</strong> selon le statut de l’entité, en lien avec la Banque de France.</p>
<h3>Et les prestataires informatiques ?</h3>
<p>Les <strong>prestataires tiers de services TIC</strong> (éditeurs, hébergeurs, infogérants, fournisseurs cloud) sont concernés de deux façons. Tous voient leurs contrats avec les entités financières enrichis des clauses obligatoires de l’article 30. Les plus critiques pour le secteur sont désignés par les autorités européennes de surveillance et placés sous leur supervision directe.</p>
<h3>Le principe de proportionnalité</h3>
<p>Les exigences s’appliquent en tenant compte de la taille, du profil de risque et de la complexité de chaque entité (article 4). Certaines petites entités, comme les petites entreprises d’investissement non interconnectées, bénéficient d’un cadre simplifié de gestion des risques TIC (article 16), et seules les entités désignées par leur autorité sont tenues de conduire des TLPT.</p>`,
    },
    {
      id: 'dora-rts-its',
      title: 'RTS et ITS : les normes techniques qui précisent DORA',
      html: `<p>Le règlement fixe les principes ; leur mise en œuvre concrète est décrite dans des <strong>normes techniques de réglementation (RTS)</strong> et des <strong>normes techniques d’exécution (ITS)</strong>. Elles sont rédigées par les autorités européennes de surveillance (ABE, AEAPP, AEMF), puis adoptées par la Commission sous forme de règlements délégués ou d’exécution, directement applicables. Ce sont elles que les superviseurs utilisent comme grille de contrôle.</p>
<table>
<thead><tr><th>Thème</th><th>Texte</th><th>Ce qu’il précise</th></tr></thead>
<tbody>
<tr><td>Gestion des risques TIC</td><td>Règlement délégué (UE) 2024/1774</td><td>Contenu des politiques de sécurité, gestion des accès, chiffrement, journalisation, continuité ; cadre simplifié de l’article 16</td></tr>
<tr><td>Classification des incidents</td><td>Règlement délégué (UE) 2024/1772</td><td>Critères et seuils qui font d’un incident un incident majeur</td></tr>
<tr><td>Notification des incidents</td><td>Règlement délégué (UE) 2025/301 et règlement d’exécution (UE) 2025/302</td><td>Contenu, délais et formulaires des notifications initiale, intermédiaire et finale</td></tr>
<tr><td>Politique prestataires TIC</td><td>Règlement délégué (UE) 2024/1773</td><td>Politique de recours aux prestataires pour les fonctions critiques ou importantes</td></tr>
<tr><td>Registre d’informations</td><td>Règlement d’exécution (UE) 2024/2956</td><td>Modèles normalisés du registre des accords contractuels TIC</td></tr>
<tr><td>Sous-traitance</td><td>Règlement délégué (UE) 2025/532</td><td>Conditions de sous-traitance des services TIC soutenant des fonctions critiques ou importantes</td></tr>
<tr><td>TLPT</td><td>Règlement délégué (UE) 2025/1190</td><td>Périmètre, méthode et déroulement des tests de pénétration fondés sur la menace</td></tr>
</tbody>
</table>
<p>À ces textes s’ajoutent des orientations des autorités européennes, notamment sur l’estimation des coûts des incidents majeurs et sur la coopération en matière de supervision. En pratique, un audit de conformité DORA sérieux se mène <strong>article par article et RTS par RTS</strong>, et non sur la seule base du règlement.</p>`,
    },
    {
      id: 'dora-registre',
      title: 'Le registre d’informations : l’inventaire de vos prestataires TIC',
      html: `<p>L’article 28, paragraphe 3, impose à chaque entité financière de tenir un <strong>registre d’informations</strong> recensant <strong>tous</strong> ses accords contractuels portant sur des services TIC, qu’ils soutiennent ou non des fonctions critiques ou importantes. Le registre est tenu au niveau de l’entité, et au niveau sous-consolidé et consolidé pour les groupes.</p>
<p>Son format n’est pas libre : le règlement d’exécution (UE) 2024/2956 fixe une série de <strong>modèles normalisés</strong> (tableaux relationnels) qui décrivent notamment :</p>
<ul>
<li>l’entité qui tient le registre et les entités du groupe qui utilisent les services ;</li>
<li>les accords contractuels : références, dates, préavis, loi applicable, localisation des données et des traitements ;</li>
<li>les prestataires, identifiés par un identifiant d’entité juridique (LEI) ou un identifiant européen, ainsi que la <strong>chaîne de sous-traitance</strong> qui soutient les services ;</li>
<li>les <strong>fonctions</strong> de l’entité soutenues par chaque service, leur criticité et l’évaluation de la substituabilité du prestataire ;</li>
<li>les stratégies de sortie et la possibilité de réintégrer le service.</li>
</ul>
<p>Le registre est transmis aux autorités compétentes sur demande et lors des collectes organisées chaque année ; en France, ces remises passent par l’ACPR ou l’AMF. Les autorités européennes s’en servent pour mesurer les dépendances du secteur et désigner les prestataires critiques.</p>
<p>La difficulté n’est pas l’outil, mais la donnée : obtenir les identifiants des prestataires, remonter les sous-traitants de rang 2 et au-delà, rattacher chaque contrat aux bonnes fonctions métier. Pour une méthode pas à pas, consultez <a data-article="dora-registre-d-informations-prestataires-tic-mode-d-emploi">notre mode d’emploi du registre d’informations DORA</a>.</p>`,
    },
    {
      id: 'dora-incidents',
      title: 'Classification et notification des incidents majeurs',
      html: `<p>DORA impose un processus de gestion des incidents liés aux TIC (article 17) : détection, enregistrement de <strong>tous</strong> les incidents et des cybermenaces importantes, analyse des causes, escalade vers la direction et communication.</p>
<h3>Quand un incident est-il « majeur » ?</h3>
<p>Le règlement délégué (UE) 2024/1772 définit sept critères de classification : clients, contreparties et transactions touchés ; impact sur la réputation ; durée et indisponibilité du service ; étendue géographique ; pertes de données ; criticité des services touchés ; impact économique. Un incident est majeur lorsqu’il affecte des <strong>services critiques</strong> et que, en plus, soit il implique un accès malveillant non autorisé entraînant des pertes de données, soit il atteint les seuils d’au moins deux autres critères. Des incidents récurrents de même cause peuvent aussi être agrégés en un incident majeur.</p>
<h3>Les trois notifications</h3>
<table>
<thead><tr><th>Étape</th><th>Délai</th><th>Contenu attendu</th></tr></thead>
<tbody>
<tr><td>Notification initiale</td><td>4 heures après la classification comme majeur, au plus tard 24 heures après la prise de connaissance</td><td>Premières informations : nature, impact constaté, services et clients touchés</td></tr>
<tr><td>Rapport intermédiaire</td><td>72 heures après la notification initiale, puis à chaque évolution significative</td><td>Analyse plus complète, mesures prises, rétablissement</td></tr>
<tr><td>Rapport final</td><td>1 mois après le dernier rapport intermédiaire</td><td>Causes profondes, coûts et pertes, mesures correctives</td></tr>
</tbody>
</table>
<p>Les notifications utilisent les formulaires du règlement d’exécution (UE) 2025/302 et sont adressées à l’autorité compétente. Lorsque l’incident a des effets sur leurs intérêts financiers, les <strong>clients doivent aussi être informés</strong> sans retard injustifié (article 19, paragraphe 3). La notification des cybermenaces importantes reste, elle, volontaire.</p>
<p>Le délai de 4 heures ne se tient qu’avec une grille de classification outillée, des seuils traduits en indicateurs mesurables et une chaîne de décision connue de l’astreinte. Il se teste en exercice, pas le jour de l’incident.</p>`,
    },
    {
      id: 'dora-tests-tlpt',
      title: 'Tests de résilience, tests d’intrusion et TLPT',
      html: `<h3>Le programme de tests de base</h3>
<p>Toutes les entités (hors cadre simplifié) établissent un <strong>programme de tests de résilience</strong> proportionné et fondé sur les risques (article 24). Il peut inclure évaluations de vulnérabilités, analyses de sources ouvertes, revues de sécurité réseau, analyses d’écarts, revues de code, tests de scénarios, de compatibilité, de performance, de bout en bout et <strong>tests d’intrusion</strong> (article 25). Les systèmes et applications qui soutiennent des fonctions critiques ou importantes sont testés <strong>au moins une fois par an</strong>, par des testeurs indépendants, internes ou externes.</p>
<h3>Les TLPT : tests de pénétration fondés sur la menace</h3>
<p>Les entités désignées par leur autorité, en fonction de leur importance systémique et de leur maturité, doivent conduire au moins <strong>tous les trois ans</strong> un <strong>TLPT</strong> (Threat-Led Penetration Testing, article 26). Le règlement délégué (UE) 2025/1190 en précise les modalités, alignées sur le cadre européen <strong>TIBER-EU</strong>, décliné en France sous le nom TIBER-FR :</p>
<ul>
<li>le test porte sur <strong>plusieurs ou toutes les fonctions critiques ou importantes</strong> et se déroule sur les <strong>systèmes de production</strong> ;</li>
<li>une phase de renseignement sur la menace, ciblée sur l’entité, alimente des scénarios d’attaque réalistes ;</li>
<li>une équipe d’attaque (« red team ») exécute ces scénarios pendant une durée suffisante, sous le contrôle d’une équipe de pilotage restreinte, à l’insu des équipes de défense ;</li>
<li>les prestataires TIC concernés par le périmètre participent au test ;</li>
<li>l’entité produit un rapport de synthèse et des plans de remédiation, puis l’autorité délivre une <strong>attestation</strong> de réalisation.</li>
</ul>
<p>Les testeurs doivent présenter les garanties de l’article 27 : compétence et réputation, certifications ou adhésion à un code de conduite reconnu, assurance de responsabilité professionnelle. Le recours à des testeurs internes est encadré, et un fournisseur externe de renseignement sur la menace reste nécessaire.</p>
<p>Un TLPT se prépare : il est inutile d’engager un exercice de red team avant d’avoir corrigé ce qu’un test d’intrusion annuel classique aurait trouvé sur l’Active Directory, les applications exposées ou les accès des prestataires.</p>`,
    },
    {
      id: 'dora-article-30',
      title: 'Article 30 : les clauses contractuelles obligatoires',
      html: `<p>L’article 30 fixe le contenu minimal des contrats de services TIC. Les accords existants devaient être mis en conformité : c’est l’un des chantiers les plus longs, car il suppose de renégocier avec des prestataires qui n’ont pas toujours la même urgence.</p>
<h3>Pour tous les contrats de services TIC (article 30, paragraphe 2)</h3>
<ul>
<li>une description claire et complète des fonctions et services, et des conditions de sous-traitance ;</li>
<li>les lieux de fourniture des services et de traitement des données ;</li>
<li>des dispositions sur la disponibilité, l’authenticité, l’intégrité et la confidentialité des données, y compris les données personnelles ;</li>
<li>l’accès, la récupération et la restitution des données en cas d’insolvabilité, de résolution, de cessation d’activité du prestataire ou de fin du contrat ;</li>
<li>la description des niveaux de service ;</li>
<li>l’obligation d’assistance en cas d’incident TIC, sans coût supplémentaire ou à un coût fixé à l’avance ;</li>
<li>la coopération avec les autorités compétentes ;</li>
<li>les droits de résiliation et les délais de préavis minimaux ;</li>
<li>la participation du prestataire aux programmes de sensibilisation et de formation de l’entité.</li>
</ul>
<h3>En plus, pour les fonctions critiques ou importantes (article 30, paragraphe 3)</h3>
<ul>
<li>des niveaux de service détaillés, avec des objectifs quantitatifs et qualitatifs précis ;</li>
<li>des délais de préavis et des obligations de signalement du prestataire ;</li>
<li>la mise en œuvre et le test de plans d’urgence et de mesures de sécurité adaptées ;</li>
<li>la participation au programme de tests de l’entité, y compris aux <strong>TLPT</strong> ;</li>
<li>des <strong>droits d’accès, d’inspection et d’audit</strong> illimités, pour l’entité comme pour l’autorité ;</li>
<li>des <strong>stratégies de sortie</strong>, avec une période de transition obligatoire suffisante.</li>
</ul>
<p>Côté prestataire, ces clauses se traduisent en exigences opérationnelles : documentation de la sécurité, processus de notification des incidents vers le client, capacité à accueillir un audit et plan de réversibilité crédible.</p>`,
    },
    {
      id: 'dora-erreurs',
      title: 'Les écarts que nous rencontrons le plus souvent',
      html: `<ul>
<li><strong>Registre d’informations incomplet</strong> : sous-traitants en cascade non identifiés, identifiants manquants, fonctions critiques mal rattachées aux contrats.</li>
<li><strong>Contrats non mis à jour</strong> : droit d’audit, notification d’incident et stratégie de sortie absents des contrats historiques.</li>
<li><strong>Classification des incidents théorique</strong> : critères non outillés, aucun exercice pour tenir le délai de 4 heures.</li>
<li><strong>Tests limités à un scan annuel</strong>, sans test d’intrusion sur les applications et l’Active Directory qui portent les fonctions critiques.</li>
<li><strong>Cartographie des fonctions critiques absente</strong>, alors que c’est elle qui détermine l’étendue de toutes les autres exigences.</li>
<li><strong>Organe de direction peu impliqué</strong> : cadre de gestion des risques TIC non approuvé formellement, formation des dirigeants non tracée.</li>
</ul>`,
    },
    {
      id: 'dora-demarche',
      title: 'Une démarche de mise en conformité en 5 étapes',
      html: `<ol>
<li><strong>Identifier les fonctions critiques ou importantes</strong> et les actifs TIC, processus et prestataires qui les soutiennent.</li>
<li><strong>Réaliser un audit d’écart</strong> pilier par pilier, au regard du règlement et des RTS et ITS applicables.</li>
<li><strong>Traiter le chantier prestataires</strong> : registre d’informations, revue et avenants contractuels au titre de l’article 30, plans de sortie.</li>
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
        'Le règlement DORA s’applique depuis le 17 janvier 2025 dans toute l’Union européenne. S’agissant d’un règlement, il n’a pas besoin d’être transposé en droit national. Il est complété par des normes techniques réglementaires et d’exécution (RTS et ITS) qui précisent ses exigences.',
    },
    {
      question: 'Quelle est la différence entre DORA et NIS2 ?',
      answer:
        'NIS2 est une directive transversale qui couvre 18 secteurs et doit être transposée par chaque État. DORA est un règlement propre au secteur financier, directement applicable et plus détaillé, notamment sur les prestataires TIC et les tests. Pour les entités financières, DORA prévaut sur les exigences équivalentes de NIS2.',
    },
    {
      question: 'Que sont les RTS et ITS de DORA ?',
      answer:
        'Ce sont des normes techniques rédigées par les autorités européennes de surveillance et adoptées par la Commission. Les RTS précisent le contenu des exigences, par exemple la classification des incidents ou les TLPT ; les ITS fixent des formats, comme les modèles du registre d’informations ou les formulaires de notification. Elles sont directement applicables.',
    },
    {
      question: 'Un prestataire informatique est-il concerné par DORA ?',
      answer:
        'Indirectement, oui, s’il fournit des services TIC à une entité financière : ses contrats doivent intégrer les clauses imposées par l’article 30 (niveaux de service, droit d’audit, notification des incidents, sortie). Les prestataires jugés critiques pour le secteur sont en outre soumis à la supervision directe des autorités européennes.',
    },
    {
      question: 'Qu’est-ce que le registre d’informations DORA ?',
      answer:
        'C’est l’inventaire de tous les accords contractuels de services TIC d’une entité financière, avec les prestataires, sous-traitants et fonctions soutenues. Son format est fixé par le règlement d’exécution (UE) 2024/2956. Il est tenu à jour en continu et transmis aux autorités compétentes, en France l’ACPR ou l’AMF.',
    },
    {
      question: 'Quels sont les délais de notification d’un incident majeur DORA ?',
      answer:
        'La notification initiale intervient dans les 4 heures suivant la classification de l’incident comme majeur, et au plus tard 24 heures après sa détection. Suivent un rapport intermédiaire dans les 72 heures et un rapport final dans le mois.',
    },
    {
      question: 'Les tests d’intrusion sont-ils obligatoires avec DORA ?',
      answer:
        'Oui. Le programme de tests de résilience doit inclure des tests, dont des tests d’intrusion, au moins annuels sur les systèmes qui soutiennent des fonctions critiques ou importantes. Les entités désignées par leur autorité doivent en plus conduire tous les trois ans des tests de pénétration fondés sur la menace (TLPT).',
    },
    {
      question: 'Qu’est-ce qu’un TLPT et qui doit en faire ?',
      answer:
        'Un TLPT est un test de type red team, fondé sur un renseignement ciblé sur la menace, mené sur les systèmes de production qui soutiennent des fonctions critiques. Seules les entités désignées par leur autorité y sont tenues, au moins tous les trois ans, selon le cadre TIBER-EU, appelé TIBER-FR en France.',
    },
  ],
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Nos accompagnements réglementaires, de l’audit d’écart au pilotage.' },
    { label: 'Pentest', href: '/pentest', description: 'Les tests d’intrusion annuels exigés par DORA sur vos fonctions critiques.' },
    { label: 'Red Team', href: '/red-team', description: 'Des exercices fondés sur la menace pour préparer un TLPT.' },
    { label: 'Directive NIS2', href: '/nis2', description: 'Le cadre transversal, utile pour vos filiales et prestataires hors secteur financier.' },
    { label: 'PCA / PRA', href: '/pcapra', description: 'Continuité et reprise d’activité, au cœur du premier pilier de DORA.' },
    { label: 'Secteur banque & finance', href: '/secteurs/banque-finance', description: 'Nos interventions auprès des acteurs financiers.' },
  ],
  articles: ['dora-registre-d-informations-prestataires-tic-mode-d-emploi'],
};
