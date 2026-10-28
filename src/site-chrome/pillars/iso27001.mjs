// Page pilier ISO 27001 (J3.3) — requête principale : « certification iso 27001 ».
// Faits : ISO/IEC 27001:2022 (+ amendement 1:2024), fin de la transition 2013 → 2022 le 31/10/2025.

export default {
  slug: 'iso27001',
  file: 'iso27001.html',
  path: '/iso27001',
  name: 'ISO 27001',
  service: 'ISO 27001',
  updated: '2026-10-26',
  guideTitle: 'Certification ISO 27001 : le guide complet, de la décision à l’audit',
  intro:
    'ISO 27001 est la norme internationale de référence pour la sécurité de l’information. Elle ne dit pas quels outils installer : elle demande de construire un système de management qui identifie vos risques, les traite et prouve qu’ils restent maîtrisés dans le temps. Ce guide détaille la version 2022 de la norme, les documents attendus, le déroulé de la certification et les pièges à éviter.',
  sections: [
    {
      id: 'iso-definition',
      title: 'Qu’est-ce que la norme ISO 27001 ?',
      html: `<p>L’<strong>ISO/IEC 27001</strong> définit les exigences d’un <strong>système de management de la sécurité de l’information (SMSI)</strong> : un ensemble de politiques, de processus, de rôles et de mesures qui protège la confidentialité, l’intégrité et la disponibilité de l’information, selon une logique d’amélioration continue.</p>
<p>La version en vigueur est l’<strong>ISO/IEC 27001:2022</strong>, complétée en 2024 par un amendement qui demande de considérer le changement climatique dans l’analyse du contexte. La période de transition depuis la version 2013 s’est achevée le <strong>31 octobre 2025</strong> : les certificats encore délivrés selon l’ancienne version ne sont plus valides.</p>
<p>La norme est <strong>certifiable</strong> : un organisme de certification accrédité (en France, par le COFRAC) vérifie lors d’un audit que le SMSI répond aux exigences et qu’il fonctionne réellement. Elle s’accompagne de guides non certifiables, dont l’ISO/IEC 27002, qui détaille la mise en œuvre de chaque mesure.</p>`,
    },
    {
      id: 'iso-pourquoi',
      title: 'Pourquoi viser la certification ?',
      html: `<ul>
<li><strong>Répondre aux exigences des clients</strong> : la certification est de plus en plus demandée dans les appels d’offres, les questionnaires sécurité et les contrats, en particulier par les grands comptes et le secteur public.</li>
<li><strong>Disposer d’une preuve unique</strong> : un certificat remplace une partie des audits et questionnaires répétés de vos clients.</li>
<li><strong>Préparer les autres référentiels</strong> : un SMSI couvre une large part des exigences de NIS2, de DORA et de TISAX, et constitue un prérequis de la certification HDS.</li>
<li><strong>Piloter la sécurité par les risques</strong> : la direction décide en connaissance de cause des risques qu’elle accepte, réduit ou transfère.</li>
</ul>`,
    },
    {
      id: 'iso-exigences',
      title: 'Ce que la norme exige : chapitres 4 à 10 et annexe A',
      html: `<h3>Les exigences du système de management</h3>
<table>
<thead><tr><th>Chapitre</th><th>Ce qui est attendu</th></tr></thead>
<tbody>
<tr><td>4. Contexte</td><td>Enjeux internes et externes, parties intéressées et leurs attentes, <strong>périmètre</strong> du SMSI.</td></tr>
<tr><td>5. Leadership</td><td>Engagement de la direction, politique de sécurité, rôles et responsabilités.</td></tr>
<tr><td>6. Planification</td><td><strong>Appréciation et traitement des risques</strong>, objectifs de sécurité, planification des changements.</td></tr>
<tr><td>7. Support</td><td>Ressources, compétences, sensibilisation, communication, informations documentées.</td></tr>
<tr><td>8. Fonctionnement</td><td>Mise en œuvre du plan de traitement des risques et appréciations régulières.</td></tr>
<tr><td>9. Évaluation</td><td>Indicateurs, <strong>audit interne</strong>, <strong>revue de direction</strong>.</td></tr>
<tr><td>10. Amélioration</td><td>Traitement des non-conformités, actions correctives, amélioration continue.</td></tr>
</tbody>
</table>
<h3>Les 93 mesures de l’annexe A</h3>
<p>La version 2022 regroupe les mesures de sécurité en <strong>quatre thèmes</strong> : 37 mesures organisationnelles, 8 liées aux personnes, 14 physiques et 34 technologiques. Onze mesures sont nouvelles, dont le renseignement sur les menaces, la sécurité des services cloud, la préparation des TIC à la continuité, la gestion des configurations, la suppression et le masquage des données, la prévention des fuites, la surveillance des activités, le filtrage web et le codage sécurisé.</p>
<p>Toutes les mesures ne sont pas obligatoires : chacune est retenue ou exclue, avec justification, dans la <strong>déclaration d’applicabilité</strong> (DdA), au regard de l’analyse de risques.</p>
<h3>Les documents incontournables</h3>
<ul>
<li>périmètre du SMSI et politique de sécurité de l’information ;</li>
<li>méthode et résultats de l’appréciation des risques, plan de traitement ;</li>
<li>déclaration d’applicabilité ;</li>
<li>objectifs de sécurité et indicateurs ;</li>
<li>preuves de compétence et de sensibilisation ;</li>
<li>programme et rapports d’audit interne, comptes rendus de revue de direction ;</li>
<li>registre des non-conformités et actions correctives.</li>
</ul>`,
    },
    {
      id: 'iso-certification',
      title: 'Comment se déroule la certification ?',
      html: `<ol>
<li><strong>Audit initial, étape 1</strong> : revue documentaire et vérification que le SMSI est prêt à être audité (périmètre, analyse de risques, DdA, audit interne et revue de direction réalisés).</li>
<li><strong>Audit initial, étape 2</strong> : vérification sur le terrain que les processus et les mesures fonctionnent, par entretiens, observations et échantillons de preuves.</li>
<li><strong>Décision de certification</strong> après traitement des éventuelles non-conformités. Le certificat est valable <strong>trois ans</strong>.</li>
<li><strong>Audits de surveillance</strong> annuels les deux années suivantes, puis <strong>audit de renouvellement</strong> la troisième année.</li>
</ol>
<p>Le SMSI doit avoir fonctionné suffisamment longtemps avant l’audit pour produire des preuves : au moins un cycle d’audit interne et de revue de direction, et des indicateurs suivis sur quelques mois.</p>`,
    },
    {
      id: 'iso-erreurs',
      title: 'Les pièges les plus fréquents',
      html: `<ul>
<li><strong>Un périmètre mal choisi</strong> : trop large, le projet s’enlise ; trop étroit, le certificat ne répond pas aux attentes des clients.</li>
<li><strong>Une analyse de risques générique</strong>, copiée d’un modèle, qui ne permet pas de justifier la déclaration d’applicabilité.</li>
<li><strong>Une documentation sans application</strong> : l’auditeur échantillonne des preuves (revues des droits, sauvegardes, sensibilisations) sur la période écoulée.</li>
<li><strong>Une direction absente</strong> : l’engagement de la direction et la revue de direction sont vérifiés.</li>
<li><strong>Un SMSI porté par une seule personne</strong>, qui ne survit pas à son départ.</li>
</ul>`,
    },
    {
      id: 'iso-demarche',
      title: 'Une feuille de route type',
      html: `<ol>
<li><strong>Cadrage</strong> : objectifs, périmètre, organisation du projet, calendrier cible.</li>
<li><strong>Audit d’écart</strong> par rapport aux chapitres 4 à 10 et à l’annexe A.</li>
<li><strong>Analyse de risques</strong> (par exemple avec EBIOS Risk Manager) et plan de traitement.</li>
<li><strong>Mise en œuvre</strong> : politiques, procédures, mesures techniques, sensibilisation, déclaration d’applicabilité.</li>
<li><strong>Faire vivre le SMSI</strong> : indicateurs, audit interne, revue de direction.</li>
<li><strong>Audit à blanc</strong> puis choix de l’organisme de certification et audit initial.</li>
</ol>
<p>La durée dépend du périmètre, de la maturité de départ et des ressources mobilisables : pour une PME ou une ETI au périmètre bien délimité, elle se compte généralement en mois plutôt qu’en semaines.</p>`,
    },
  ],
  faq: [
    {
      question: 'Quelle est la différence entre ISO 27001 et ISO 27002 ?',
      answer:
        'ISO 27001 fixe les exigences du système de management et liste les 93 mesures de sécurité de son annexe A ; c’est la norme certifiable. ISO 27002 est un guide qui détaille, mesure par mesure, comment les mettre en œuvre. On se certifie ISO 27001, en s’appuyant sur ISO 27002.',
    },
    {
      question: 'Mon certificat ISO 27001:2013 est-il encore valable ?',
      answer:
        'Non. La période de transition vers la version 2022 s’est achevée le 31 octobre 2025. Les organisations certifiées selon la version 2013 devaient avoir réalisé leur audit de transition avant cette date ; à défaut, il faut repasser par un audit selon la version 2022.',
    },
    {
      question: 'Combien de temps dure une certification ISO 27001 ?',
      answer:
        'Le certificat est valable trois ans, avec un audit de surveillance chaque année. La préparation dépend du périmètre et de la maturité de départ : il faut construire le SMSI puis le faire fonctionner assez longtemps pour produire des preuves, avec au moins un audit interne et une revue de direction avant l’audit initial.',
    },
    {
      question: 'Faut-il appliquer les 93 mesures de l’annexe A ?',
      answer:
        'Non. Chaque mesure est retenue ou exclue au regard de l’analyse de risques, et ce choix est justifié dans la déclaration d’applicabilité. En revanche, les exigences des chapitres 4 à 10, qui décrivent le système de management lui-même, sont toutes obligatoires.',
    },
    {
      question: 'Qui délivre la certification ISO 27001 ?',
      answer:
        'Un organisme de certification indépendant, accrédité en France par le COFRAC ou par un accréditeur européen équivalent. Le cabinet qui vous accompagne dans la préparation ne peut pas être celui qui vous certifie : c’est une règle d’indépendance.',
    },
    {
      question: 'ISO 27001 aide-t-elle pour NIS2 et DORA ?',
      answer:
        'Oui. Le SMSI fournit la gouvernance, l’analyse de risques, la gestion des fournisseurs, la continuité et l’amélioration continue que ces textes attendent. Il faut compléter par leurs exigences propres, comme les délais de notification des incidents ou le registre des prestataires TIC de DORA.',
    },
  ],
  resource: {
    title: 'Grille d’autodiagnostic ISO 27001',
    file: '/ressources/grille-iso27001-securitrust.pdf',
    description: 'Évaluez votre maturité chapitre par chapitre et repérez les documents qui manquent avant l’audit.',
    bullets: [
      'Les exigences des chapitres 4 à 10 en questions',
      'Les 4 thèmes de l’annexe A et les 11 nouvelles mesures',
      'Une échelle de maturité de 0 à 3 pour prioriser',
    ],
  },
  related: [
    { label: 'Gouvernance & conformité', href: '/gouvernance-conformite', description: 'Tous nos accompagnements : NIS2, DORA, HDS, TISAX, RGPD.' },
    { label: 'Certification HDS', href: '/hds', description: 'La certification des hébergeurs de données de santé, adossée à ISO 27001.' },
    { label: 'Pilotage du SMSI', href: '/pilotage-smsi', description: 'Faire vivre votre système de management après la certification.' },
    { label: 'Formation : construire un SMSI', href: '/formations/construire-smsi-iso-27001', description: 'Trois jours en présentiel à Paris pour former vos équipes, du cadrage à la certification.' },
    { label: 'Analyse de risques EBIOS RM', href: '/ebios-rm', description: 'Une méthode d’appréciation des risques reconnue pour fonder votre DdA.' },
    { label: 'Directive NIS2', href: '/nis2', description: 'Ce que votre SMSI couvre déjà, et ce qu’il faut compléter.' },
  ],
  articles: ['declaration-d-applicabilite-iso-27001-la-construire-sans-se-perdre'],
};
