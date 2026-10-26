// Page pilier NIS2 (J3.1) — requête principale : « conformité nis2 ».
// Faits datés : directive (UE) 2022/2555 ; état de la transposition française au 26/10/2026.

export default {
  slug: 'nis2',
  file: 'nis2.html',
  path: '/nis2',
  name: 'NIS2',
  service: 'NIS2',
  updated: '2026-10-26',
  guideTitle: 'Conformité NIS2 : le guide complet pour les dirigeants et les RSSI',
  intro:
    'La directive NIS2 élargit les obligations de cybersécurité à des milliers d’organisations françaises qui n’étaient pas concernées par la première directive NIS. Ce guide fait le point sur le texte, l’état de sa transposition en France, les critères pour savoir si vous êtes concerné, les mesures exigées et la manière de s’y préparer sans attendre la loi.',
  sections: [
    {
      id: 'nis2-definition',
      title: 'Qu’est-ce que la directive NIS2 ?',
      html: `<p>La directive (UE) 2022/2555, dite <strong>NIS2</strong> (Network and Information Security), a été adoptée le 14 décembre 2022. Elle remplace la directive NIS de 2016 et poursuit un objectif simple : porter le niveau de cybersécurité de l’ensemble des secteurs essentiels de l’économie européenne à un niveau commun élevé.</p>
<p>Par rapport à NIS1, trois changements structurent le texte :</p>
<ul>
<li><strong>un périmètre beaucoup plus large</strong> : 18 secteurs au lieu de 7, et un critère de taille qui fait entrer automatiquement les moyennes et grandes entreprises de ces secteurs ;</li>
<li><strong>des obligations harmonisées</strong> : un socle de mesures de gestion des risques et un régime de notification des incidents identiques dans toute l’Union ;</li>
<li><strong>une responsabilité des dirigeants</strong> : les organes de direction approuvent les mesures, en supervisent la mise en œuvre et peuvent être tenus pour responsables des manquements.</li>
</ul>
<p>Une directive ne s’applique pas directement : chaque État membre doit la transposer dans son droit national. Les États devaient le faire avant le 17 octobre 2024.</p>`,
    },
    {
      id: 'nis2-france',
      title: 'Où en est la transposition de NIS2 en France ?',
      html: `<p>En France, la transposition passe par le <strong>projet de loi relatif à la résilience des infrastructures critiques et au renforcement de la cybersécurité</strong>, dit « loi Résilience ». Il a été adopté par le Sénat en première lecture le 12 mars 2025, puis examiné par une commission spéciale de l’Assemblée nationale, qui a établi son texte le 10 septembre 2025.</p>
<p>Au 26 octobre 2026, la loi n’est pas encore définitivement adoptée : son examen en séance publique, prévu début octobre 2026, a été retiré de l’ordre du jour. Les obligations NIS2 ne sont donc pas encore opposables en droit français, et plusieurs modalités (seuils précis, délais de mise en conformité) seront fixées par des décrets d’application.</p>
<p>Ce retard ne doit pas être lu comme un sursis :</p>
<ul>
<li>l’ANSSI a publié le <strong>ReCyF</strong>, son référentiel de cybersécurité destiné aux entités régulées, qui donne une idée précise des mesures attendues ;</li>
<li>vos clients soumis à NIS2 dans d’autres États membres, ou qui anticipent la loi française, vous demandent déjà des garanties contractuelles ;</li>
<li>les mesures exigées prennent des mois à déployer (analyse de risques, sauvegardes, gestion des accès, plan de crise) : les commencer après la promulgation, c’est démarrer en retard.</li>
</ul>`,
    },
    {
      id: 'nis2-concerne',
      title: 'Votre organisation est-elle concernée par NIS2 ?',
      html: `<p>Trois questions permettent de faire un premier tri.</p>
<h3>1. Votre activité relève-t-elle d’un des 18 secteurs ?</h3>
<p>La directive distingue les <strong>secteurs hautement critiques</strong> (annexe I : énergie, transports, banque, infrastructures des marchés financiers, santé, eau potable, eaux usées, infrastructures numériques, gestion des services TIC entre entreprises, administration publique, espace) et les <strong>autres secteurs critiques</strong> (annexe II : services postaux, gestion des déchets, produits chimiques, alimentation, fabrication — dont dispositifs médicaux, électronique, machines, automobile —, fournisseurs numériques et recherche).</p>
<h3>2. Quelle est votre taille ?</h3>
<p>En règle générale, sont concernées les entreprises d’au moins <strong>50 salariés</strong> ou dont le chiffre d’affaires annuel et le total de bilan dépassent <strong>10 millions d’euros</strong>. Certaines entités le sont quelle que soit leur taille : fournisseurs de services DNS, registres de noms de domaine, prestataires de services de confiance qualifiés, entités désignées comme critiques par l’État, administrations.</p>
<h3>3. Êtes-vous « essentielle » ou « importante » ?</h3>
<table>
<thead><tr><th></th><th>Entité essentielle (EE)</th><th>Entité importante (EI)</th></tr></thead>
<tbody>
<tr><td>Profil type</td><td>Grande entreprise (≥ 250 salariés ou &gt; 50 M€ de CA et &gt; 43 M€ de bilan) d’un secteur de l’annexe I, et certaines entités désignées</td><td>Les autres entités du périmètre : moyennes entreprises de l’annexe I, entreprises de l’annexe II</td></tr>
<tr><td>Supervision</td><td>Contrôles a priori et a posteriori</td><td>Contrôles a posteriori, après un incident ou un signalement</td></tr>
<tr><td>Amende maximale (directive)</td><td>10 M€ ou 2 % du CA mondial</td><td>7 M€ ou 1,4 % du CA mondial</td></tr>
</tbody>
</table>
<p>Les obligations de fond sont les mêmes pour les deux catégories ; ce qui change, c’est l’intensité du contrôle et le plafond des sanctions. Enfin, une entreprise hors périmètre reste concernée <strong>par effet de chaîne</strong> si elle fournit une entité régulée : celle-ci doit sécuriser sa chaîne d’approvisionnement et répercutera ses exigences dans vos contrats.</p>`,
    },
    {
      id: 'nis2-obligations',
      title: 'Les 10 mesures de gestion des risques exigées',
      html: `<p>L’article 21 de la directive impose des mesures « appropriées et proportionnées », fondées sur une approche tous risques. Elles couvrent au minimum :</p>
<ol>
<li><strong>Politiques d’analyse des risques et de sécurité des systèmes d’information</strong>, approuvées par la direction.</li>
<li><strong>Gestion des incidents</strong> : détection, qualification, traitement.</li>
<li><strong>Continuité des activités</strong> : sauvegardes, plan de reprise, gestion de crise.</li>
<li><strong>Sécurité de la chaîne d’approvisionnement</strong>, y compris les relations avec les fournisseurs et prestataires.</li>
<li><strong>Sécurité de l’acquisition, du développement et de la maintenance</strong> des systèmes, avec la gestion et la divulgation des vulnérabilités.</li>
<li><strong>Évaluation de l’efficacité</strong> des mesures (audits, tests d’intrusion, indicateurs).</li>
<li><strong>Cyberhygiène et formation</strong> des collaborateurs.</li>
<li><strong>Cryptographie et chiffrement</strong>, selon une politique définie.</li>
<li><strong>Sécurité des ressources humaines, contrôle d’accès et gestion des actifs</strong>.</li>
<li><strong>Authentification multifacteur</strong> et communications sécurisées, y compris en situation d’urgence.</li>
</ol>
<p>À ces mesures s’ajoute la gouvernance (article 20) : la direction approuve les mesures, en supervise l’application et suit une formation à la cybersécurité.</p>
<h3>Notifier les incidents importants</h3>
<p>Un incident est « important » lorsqu’il cause ou peut causer une perturbation grave des services ou des pertes financières, ou affecter d’autres personnes de manière considérable. Il se déclare en trois temps auprès de l’autorité (l’ANSSI en France) :</p>
<ul>
<li><strong>alerte précoce sous 24 heures</strong> après en avoir pris connaissance ;</li>
<li><strong>notification d’incident sous 72 heures</strong>, avec une première évaluation de la gravité et de l’impact ;</li>
<li><strong>rapport final dans un délai d’un mois</strong>.</li>
</ul>
<p>Tenir ces délais suppose une organisation prête à l’avance : qui qualifie l’incident, qui décide de notifier, qui rédige, avec quelles informations.</p>`,
    },
    {
      id: 'nis2-erreurs',
      title: 'Les erreurs fréquentes que nous constatons',
      html: `<ul>
<li><strong>Attendre la loi</strong> pour commencer, alors que l’essentiel des mesures relève de l’hygiène de base et de projets longs.</li>
<li><strong>Confier NIS2 à la seule DSI</strong> : le texte engage la direction générale, les achats (fournisseurs), les RH (formation, départs) et le juridique (notification).</li>
<li><strong>Produire des politiques sans preuves</strong> : un contrôle portera sur l’application réelle — sauvegardes testées, comptes à privilèges maîtrisés, MFA effective.</li>
<li><strong>Oublier la chaîne d’approvisionnement</strong> : infogérants, éditeurs SaaS et prestataires de maintenance sont souvent le premier vecteur d’attaque.</li>
<li><strong>Négliger le plan de crise</strong> : sans exercice, les délais de 24 et 72 heures sont rarement tenus.</li>
</ul>`,
    },
    {
      id: 'nis2-demarche',
      title: 'Par où commencer : une démarche en 5 étapes',
      html: `<ol>
<li><strong>Qualifier votre statut</strong> : secteur, taille, catégorie (EE ou EI), entités du groupe concernées.</li>
<li><strong>Cartographier</strong> les activités, systèmes, données et prestataires critiques.</li>
<li><strong>Mesurer les écarts</strong> avec les mesures attendues (article 21 et ReCyF de l’ANSSI), par exemple au moyen d’un audit d’écart et d’un test d’intrusion ciblé sur l’Active Directory et l’exposition Internet.</li>
<li><strong>Prioriser un plan d’action</strong> réaliste : quick wins (MFA, sauvegardes hors ligne, comptes à privilèges), puis chantiers structurants (gouvernance, gestion des fournisseurs, continuité).</li>
<li><strong>Piloter dans la durée</strong> : indicateurs, revue de direction, exercices de crise, audits réguliers. C’est le rôle d’un RSSI, interne ou externalisé.</li>
</ol>
<p>Si vous visez déjà la certification ISO 27001, une grande partie du travail est commune : le système de management de la sécurité de l’information (SMSI) fournit le cadre de gouvernance et de preuve que NIS2 attend.</p>`,
    },
  ],
  faq: [
    {
      question: 'NIS2 est-elle déjà applicable en France ?',
      answer:
        'Pas encore. Au 26 octobre 2026, la loi de transposition (projet de loi « Résilience ») n’est pas définitivement adoptée et ses décrets d’application ne sont pas publiés. Les mesures attendues sont toutefois connues (directive et ReCyF de l’ANSSI) et les donneurs d’ordre les exigent déjà de leurs fournisseurs.',
    },
    {
      question: 'Comment savoir si mon entreprise est concernée par NIS2 ?',
      answer:
        'Vérifiez si votre activité relève d’un des 18 secteurs des annexes I et II de la directive, puis votre taille : au moins 50 salariés, ou plus de 10 M€ de chiffre d’affaires et de bilan. Certaines entités sont concernées quelle que soit leur taille. L’ANSSI propose un test d’éligibilité sur MonEspaceNIS2.',
    },
    {
      question: 'Quelle différence entre entité essentielle et entité importante ?',
      answer:
        'Les obligations de sécurité sont les mêmes. Les entités essentielles, en général les grandes entreprises des secteurs hautement critiques, sont contrôlées a priori et a posteriori, avec des amendes jusqu’à 10 M€ ou 2 % du CA mondial. Les entités importantes sont contrôlées a posteriori, avec un plafond de 7 M€ ou 1,4 % du CA.',
    },
    {
      question: 'Quels sont les délais de notification d’un incident sous NIS2 ?',
      answer:
        'Un incident important se déclare en trois temps : une alerte précoce dans les 24 heures suivant sa détection, une notification avec une première évaluation dans les 72 heures, puis un rapport final dans le mois. En France, l’autorité destinataire est l’ANSSI.',
    },
    {
      question: 'Les dirigeants sont-ils personnellement responsables ?',
      answer:
        'La directive impose aux organes de direction d’approuver les mesures de cybersécurité, d’en superviser la mise en œuvre et de suivre une formation. Ils peuvent être tenus responsables des manquements, et pour les entités essentielles une interdiction temporaire d’exercer des fonctions de direction est prévue en dernier recours.',
    },
    {
      question: 'La certification ISO 27001 suffit-elle pour être conforme NIS2 ?',
      answer:
        'Elle n’est ni obligatoire ni suffisante à elle seule, mais elle couvre une large part des exigences : analyse de risques, gouvernance, gestion des fournisseurs, continuité, amélioration continue. Il reste à vérifier les points propres à NIS2, notamment l’organisation de la notification des incidents et le périmètre réellement couvert par le SMSI.',
    },
    {
      question: 'Combien de temps faut-il pour se mettre en conformité NIS2 ?',
      answer:
        'Cela dépend du niveau de départ. Un diagnostic et un plan d’action priorisé se construisent en quelques semaines ; le déploiement des mesures structurantes, comme la gestion des accès, la continuité ou le suivi des fournisseurs, s’étale généralement sur plusieurs mois. D’où l’intérêt de commencer avant l’entrée en vigueur de la loi.',
    },
  ],
  resource: {
    title: 'Checklist NIS2',
    file: '/ressources/checklist-nis2-securitrust.pdf',
    description: 'Les points de contrôle pour évaluer votre préparation NIS2 en une heure, avec votre équipe.',
    bullets: [
      'Qualification : secteur, taille, statut EE ou EI',
      'Les 10 mesures de l’article 21 en questions concrètes',
      'Gouvernance et notification des incidents',
    ],
  },
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Toutes nos expertises réglementaires : NIS2, DORA, ISO 27001, HDS, TISAX, RGPD.' },
    { label: 'Certification ISO 27001', href: '/iso27001', description: 'Le SMSI, socle commun le plus solide pour démontrer votre conformité NIS2.' },
    { label: 'RSSI externalisé', href: '/rssi-externalise', description: 'Un pilote de la sécurité pour porter la démarche NIS2 dans la durée.' },
    { label: 'Pentest Active Directory', href: '/pentest-ad', description: 'Mesurer l’efficacité de vos mesures sur le cœur de votre système d’information.' },
    { label: 'Analyse de risques EBIOS RM', href: '/ebios-rm', description: 'La méthode de l’ANSSI pour fonder vos mesures sur vos risques réels.' },
  ],
  articles: [
    'nis2-entite-essentielle-ou-importante-methode-pas-a-pas',
    'nis2-en-france-obligations-sanctions-et-mesures-concretes-pour-2026',
  ],
};
