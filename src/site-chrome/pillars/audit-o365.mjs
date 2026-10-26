// Page pilier Audit Microsoft 365 (J3.6) — requête principale : « audit microsoft 365 ».

export default {
  slug: 'audit-o365',
  file: 'audit-o365.html',
  path: '/audit-o365',
  name: 'Audit Microsoft 365',
  service: 'Audit Microsoft 365',
  updated: '2026-10-26',
  guideTitle: 'Audit de sécurité Microsoft 365 : le guide complet',
  intro:
    'Messagerie, fichiers, Teams, comptes : Microsoft 365 concentre une grande partie de l’activité et des données de l’entreprise. C’est aussi l’une des premières cibles des attaquants, qui y entrent le plus souvent avec un simple mot de passe volé. Ce guide présente ce que couvre un audit Microsoft 365, les réglages à vérifier en priorité et la manière d’exploiter les résultats.',
  sections: [
    {
      id: 'm365-pourquoi',
      title: 'Pourquoi auditer votre tenant Microsoft 365 ?',
      html: `<p>Un tenant Microsoft 365 est livré avec des réglages par défaut pensés pour la simplicité, pas pour votre niveau de risque. Au fil des années s’y ajoutent des comptes oubliés, des applications tierces autorisées, des partages externes et des exceptions accordées « temporairement ».</p>
<p>Les scénarios d’attaque que nous observons sont presque toujours les mêmes :</p>
<ul>
<li><strong>hameçonnage d’identifiants</strong>, y compris par des kits qui contournent une MFA faible en relayant la session ;</li>
<li><strong>pulvérisation de mots de passe</strong> sur des comptes sans MFA ou via des protocoles d’authentification hérités ;</li>
<li><strong>consentement à une application malveillante</strong> qui obtient un accès durable aux mails et fichiers ;</li>
<li><strong>règles de transfert de messagerie</strong> créées par l’attaquant pour préparer une fraude au virement ;</li>
<li><strong>exfiltration</strong> via des liens de partage anonymes SharePoint ou OneDrive.</li>
</ul>
<p>L’audit vérifie que chacun de ces scénarios est bloqué, détecté ou au moins limité.</p>`,
    },
    {
      id: 'm365-perimetre',
      title: 'Ce que couvre un audit Microsoft 365',
      html: `<h3>Identités et accès (Microsoft Entra ID)</h3>
<p>Couverture et robustesse de la MFA, stratégies d’<strong>accès conditionnel</strong>, blocage de l’authentification héritée, comptes à privilèges et rôles d’administration, comptes d’urgence, invités, applications d’entreprise et consentements, politique de mots de passe, synchronisation avec l’Active Directory local.</p>
<h3>Messagerie (Exchange Online et Defender for Office 365)</h3>
<p>SPF, DKIM et DMARC, protections anti-hameçonnage et anti-usurpation, pièces jointes et liens, règles de transfert vers l’extérieur, accès délégués aux boîtes, protocoles anciens (POP, IMAP, SMTP authentifié).</p>
<h3>Partage et données (SharePoint, OneDrive, Teams)</h3>
<p>Niveau de partage externe, liens anonymes et leur expiration, accès des invités, étiquettes de confidentialité et prévention des fuites de données (Purview), cycle de vie des équipes Teams.</p>
<h3>Détection et réponse</h3>
<p>Activation et durée de conservation du journal d’audit unifié, alertes, Defender for Endpoint et Defender for Cloud Apps lorsque vous en disposez, capacité à reconstituer une compromission.</p>
<h3>Postes et appareils</h3>
<p>Conformité des appareils dans Intune, chiffrement, accès depuis des appareils personnels.</p>`,
    },
    {
      id: 'm365-methode',
      title: 'La méthode : configuration, référentiels et scénarios',
      html: `<p>Un audit sérieux combine trois approches :</p>
<ol>
<li><strong>Revue de configuration</strong> avec un compte en lecture seule, comparée aux référentiels reconnus : le benchmark CIS Microsoft 365, les lignes de base de la CISA (SCuBA) et les recommandations de Microsoft.</li>
<li><strong>Lecture critique du Secure Score</strong> : utile pour suivre une progression, il ne hiérarchise pas les risques selon votre contexte et ignore une partie des chemins d’attaque.</li>
<li><strong>Scénarios d’attaque</strong> : à partir d’un compte utilisateur standard, qu’est-il possible d’énumérer, de lire, de partager, de consentir ? Ce volet relie les écarts de configuration à un impact réel.</li>
</ol>
<p>Le livrable est un plan de remédiation priorisé : pour chaque écart, le risque, la correction précise, son impact sur les utilisateurs et l’ordre de déploiement recommandé.</p>`,
    },
    {
      id: 'm365-priorites',
      title: 'Les réglages à vérifier en priorité',
      html: `<ul>
<li>MFA pour <strong>100 % des comptes</strong>, avec des méthodes résistantes à l’hameçonnage pour les administrateurs.</li>
<li>Authentification héritée <strong>bloquée</strong> pour tous les utilisateurs.</li>
<li>Rôles d’administration attribués au plus juste, sur des comptes dédiés, idéalement à la demande.</li>
<li>Deux comptes d’urgence exclus de l’accès conditionnel, surveillés et protégés.</li>
<li>Consentement des utilisateurs aux applications <strong>restreint</strong>, avec circuit de validation.</li>
<li>Transferts automatiques de messagerie vers l’extérieur <strong>désactivés</strong> par défaut.</li>
<li>DMARC publié avec une politique de mise en quarantaine ou de rejet.</li>
<li>Liens de partage anonymes limités et assortis d’une expiration.</li>
<li>Journal d’audit unifié actif, conservé assez longtemps pour enquêter.</li>
</ul>`,
    },
    {
      id: 'm365-apres',
      title: 'Après l’audit : corriger sans bloquer les équipes',
      html: `<p>La plupart des corrections Microsoft 365 touchent directement les utilisateurs : une stratégie d’accès conditionnel mal testée peut bloquer toute l’entreprise. Nous recommandons de :</p>
<ul>
<li>déployer les stratégies en <strong>mode rapport seul</strong> avant de les appliquer ;</li>
<li>procéder par groupes pilotes, puis par vagues ;</li>
<li>communiquer en amont sur la MFA et les nouveaux usages ;</li>
<li>mesurer l’avancement avec quelques indicateurs simples (couverture MFA, comptes à privilèges, partages anonymes) ;</li>
<li>programmer une revue de contrôle quelques mois plus tard, la configuration d’un tenant dérivant vite.</li>
</ul>`,
    },
  ],
  faq: [
    {
      question: 'Le Secure Score Microsoft suffit-il à évaluer ma sécurité ?',
      answer:
        'Non. C’est un bon indicateur de progression, mais il attribue des points sans tenir compte de votre contexte, ne hiérarchise pas les risques et ne couvre pas tous les chemins d’attaque, comme les consentements applicatifs ou les comptes invités. Un audit l’utilise comme point de départ, pas comme conclusion.',
    },
    {
      question: 'Quels accès faut-il donner pour un audit Microsoft 365 ?',
      answer:
        'Un compte dédié avec des rôles en lecture seule, comme Lecteur global et Lecteur de sécurité, suffit pour la revue de configuration. Aucun droit de modification n’est nécessaire. Le compte est désactivé à la fin de la mission.',
    },
    {
      question: 'La MFA protège-t-elle contre tout ?',
      answer:
        'Elle bloque l’immense majorité des attaques par mot de passe, mais pas toutes : des kits d’hameçonnage relaient la session en temps réel et contournent les méthodes par SMS ou notification. D’où l’intérêt de l’accès conditionnel et, pour les comptes sensibles, de méthodes résistantes comme les clés FIDO2 ou Windows Hello.',
    },
    {
      question: 'Combien de temps dure un audit Microsoft 365 ?',
      answer:
        'La revue de configuration et l’analyse des scénarios représentent en général quelques jours de travail, selon la taille du tenant, le nombre de services utilisés et le niveau de licences. La restitution et le plan de remédiation suivent dans la foulée.',
    },
    {
      question: 'Un audit Microsoft 365 est-il utile pour NIS2 ou ISO 27001 ?',
      answer:
        'Oui. Il fournit des preuves concrètes sur plusieurs mesures attendues par ces référentiels : authentification multifacteur, contrôle d’accès, gestion des comptes à privilèges, journalisation et sécurité des échanges. Il alimente aussi l’analyse de risques et le plan de traitement.',
    },
  ],
  resource: {
    title: 'Checklist sécurité Microsoft 365',
    file: '/ressources/checklist-m365-securitrust.pdf',
    description: 'Les contrôles prioritaires à vérifier dans votre tenant, avec l’endroit où les trouver dans les consoles.',
    bullets: [
      'Identités : MFA, accès conditionnel, comptes à privilèges',
      'Messagerie : DMARC, transferts, anti-hameçonnage',
      'Partage, journalisation et applications tierces',
    ],
  },
  related: [
    { label: 'Tous nos pentests', href: '/pentest', description: 'Compléter l’audit cloud par des tests d’intrusion ciblés.' },
    { label: 'Pentest Active Directory', href: '/pentest-ad', description: 'L’annuaire local, souvent synchronisé avec Entra ID.' },
    { label: 'Pentest web', href: '/pentest-web', description: 'Vos applications exposées, l’autre porte d’entrée.' },
    { label: 'Cyber-vigilance humaine', href: '/cyber-vigilance-humaine', description: 'Préparer vos équipes à l’hameçonnage qui vise leurs comptes.' },
    { label: 'Directive NIS2', href: '/nis2', description: 'MFA et contrôle d’accès figurent parmi les mesures exigées.' },
  ],
  articles: [
    'microsoft-365-12-reglages-de-securite-a-verifier-en-priorite',
    'attaque-massive-par-password-spray-sur-azure-cli-78-comptes-microsoft-compromis',
  ],
};
