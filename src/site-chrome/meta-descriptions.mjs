// Meta descriptions du site : une par page, 160 caractères au plus, toutes différentes.
// Source unique pour les pages React (metadata.description) et pour les landing pages
// statiques public/*.html (balise réécrite par `npm run chrome:sync`).
// Contrôle : `npm run chrome:sync` échoue si une description dépasse 160 caractères
// ou est utilisée deux fois.

export const META_MAX = 160;

/** @type {Record<string, string>} */
export const META_DESCRIPTIONS = {
  // Accueil et pages institutionnelles
  '/': 'SecuriTrust, cabinet de cybersécurité à Paris depuis 2016 : tests d’intrusion, audits, conformité NIS2, DORA et ISO 27001, RSSI externalisé. Certifié ISO 27001.',
  '/services': 'Tous les services SecuriTrust : tests d’intrusion, audits de sécurité, gouvernance et conformité, RSSI et DPO externalisés, sensibilisation des équipes.',
  '/contact': 'Contactez SecuriTrust, 11 rue Saint-Didier à Paris 16e : devis de pentest, audit, conformité ou RSSI externalisé. Rappel sous 2 heures.',
  '/prise-de-rdv': 'Réservez un échange de 30 minutes, sans engagement, avec un expert SecuriTrust pour cadrer votre projet de cybersécurité ou de conformité.',
  '/equipe': 'L’équipe SecuriTrust : le fondateur et les consultants qui mènent vos missions de gouvernance, de conformité NIS2, DORA et ISO 27001, de pentest et de RSSI.',
  '/certifications': 'Certifications de SecuriTrust et de ses consultants : ISO 27001 (AFAQ / AFNOR), Lead Auditor et Lead Implementer, EBIOS RM, OSCP, CEH, PNPT, CRTP, CRTE.',
  '/portfolio': 'Exemples de missions SecuriTrust : tests d’intrusion, audits de sécurité, certifications ISO 27001 et HDS, mise en conformité RGPD, par secteur d’activité.',
  '/nous-rejoindre': 'Rejoignez SecuriTrust à Paris : postes en CDI de consultant junior, consultant senior et manager en cybersécurité, sur l’audit, la gouvernance et la conformité.',
  '/nous-rejoindre/consultant-junior-cybersecurite': 'Consultant(e) junior en cybersécurité, CDI à Paris avec télétravail possible : analyses de risques, audits et conformité, avec le mentorat de nos seniors.',
  '/nous-rejoindre/consultant-senior-cybersecurite': 'Consultant(e) senior en cybersécurité, CDI à Paris : pilotez des missions d’audit, de gouvernance et de conformité, et encadrez des consultants juniors.',
  '/nous-rejoindre/manager-cybersecurite': 'Manager cybersécurité, CDI à Paris : pilotez des missions GRC et d’audit, gérez la relation client et faites monter en compétence l’équipe de consultants.',
  '/mentions-legales': 'Mentions légales du site securitrust.fr : éditeur, siège social à Paris 16e, immatriculation, directeur de la publication et hébergeur du site.',
  '/politique-de-confidentialite': 'Comment SecuriTrust collecte et traite vos données personnelles sur securitrust.fr : finalités, bases légales, durées de conservation et exercice de vos droits.',
  '/politique-de-cookies': 'Cookies déposés sur securitrust.fr : mesure d’audience, finalités, durée de conservation et gestion de votre consentement à tout moment.',
  '/cgv': 'Conditions générales de vente des prestations de conseil, d’audit et de tests d’intrusion de SecuriTrust : commande, tarifs, exécution, responsabilité.',

  // Offre RSSI et gouvernance
  '/rssi-externalise': 'RSSI externalisé à temps partagé pour PME et ETI : pilotage de la sécurité, feuille de route, conformité NIS2 et ISO 27001, sans le coût d’un recrutement.',
  '/en/outsourced-ciso': 'Outsourced CISO on a fractional basis for SMEs: security roadmap, governance, ISO 27001, NIS2 and DORA compliance, by a Paris-based cybersecurity firm.',
  '/gouvernance-conformite': 'Gouvernance et conformité cybersécurité : NIS2, DORA, ISO 27001, HDS, TISAX et RGPD, de l’audit d’écart au pilotage du SMSI. Cabinet SecuriTrust, Paris.',
  '/gouvernance-conformite/accompagnement': 'Accompagnement à la conformité pas à pas : cadrage, analyse de risques, politiques, mise en œuvre et préparation à l’audit ISO 27001, NIS2, DORA ou HDS.',
  '/gouvernance-conformite/audits': 'Audits de conformité et de sécurité avec livrables actionnables : écarts ISO 27001, NIS2, DORA et RGPD, audit organisationnel et technique, plan priorisé.',
  '/gouvernance-conformite/domaines-expertise': 'Vos obligations cyber selon votre secteur : HDS pour la santé, DORA pour la finance, TISAX pour l’automobile, NIS2 pour les entités essentielles.',
  '/gouvernance-conformite/services-externalises': 'Fonctions de sécurité externalisées : RSSI, DPO et pilotage du SMSI à temps partagé, pour disposer d’une expertise senior sans recrutement à temps plein.',
  '/grc-cyber': 'Gouvernance, risques et conformité (GRC) cyber : analyse de risques EBIOS RM et ISO 27005, politiques de sécurité, suivi des exigences ISO 27001, NIS2 et DORA.',
  '/pilotage-smsi': 'Pilotage externalisé de votre SMSI : comité sécurité, revue des risques, indicateurs, audits internes et maintien de la certification ISO 27001 dans la durée.',
  '/strategie-cybersecurite': 'Une stratégie de cybersécurité alignée sur vos enjeux métier : état des lieux, priorités, feuille de route budgétée et indicateurs pour la direction.',
  '/gestion-risques': 'Gestion des risques cyber : identification, évaluation et traitement selon EBIOS RM et ISO 27005, registre des risques et suivi des plans de traitement.',
  '/ebios-rm': 'Analyse de risques EBIOS Risk Manager, la méthode de l’ANSSI : scénarios stratégiques et opérationnels, homologation, socle pour NIS2 et ISO 27001.',
  '/gap-analysis': 'Audit d’écart (gap analysis) face à ISO 27001, NIS2, DORA, HDS ou TISAX : mesure de votre niveau actuel et plan d’action priorisé et chiffré.',
  '/evaluation-maturite': 'Évaluation de la maturité cybersécurité de votre organisation selon ISO 27001 et le NIST CSF : notation par domaine, comparaison et plan de progression.',
  '/pcapra': 'Plan de continuité (PCA) et plan de reprise d’activité (PRA) : analyse d’impact, stratégies de secours, procédures de crise et tests de reprise.',
  '/dpo-externalise': 'DPO externalisé : délégué à la protection des données désigné auprès de la CNIL, registre des traitements, AIPD, gestion des demandes et des violations.',
  '/dpa-rgpd': 'Rédaction et négociation de vos accords de sous-traitance RGPD (DPA, article 28) : clauses, mesures de sécurité, transferts hors UE, audit des sous-traitants.',
  '/ia-act': 'Mise en conformité avec l’AI Act (règlement UE 2024/1689) : inventaire et classification de vos systèmes d’IA, gestion des risques et gouvernance des données.',

  // Pages piliers de conformité (landing pages statiques)
  '/nis2': 'Conformité NIS2 : êtes-vous entité essentielle ou importante, quelles mesures, quels délais de notification ? Guide à jour et accompagnement par SecuriTrust.',
  '/dora': 'Conformité DORA : registre d’informations, notification des incidents, tests d’intrusion et TLPT, clauses de l’article 30. Guide et accompagnement SecuriTrust.',
  '/iso27001': 'Certification ISO 27001:2022 : périmètre, analyse de risques, 93 mesures de l’annexe A, SMSI et audit de certification. Accompagnement de bout en bout.',
  '/hds': 'Certification HDS des hébergeurs de données de santé : référentiel v2.0 aligné sur ISO 27001:2022, exigences de souveraineté et préparation à l’audit.',
  '/tisax': 'Préparation au label TISAX pour les fournisseurs automobiles : catalogue VDA ISA 6.0, niveau AL2 ou AL3, protection des prototypes et audit d’évaluation.',
  '/rgpd': 'Mise en conformité RGPD : audit, registre des traitements, AIPD, contrats de sous-traitance, DPO externalisé et sensibilisation des équipes.',
  '/audit-conformite': 'Audit de conformité réglementaire : écarts RGPD, NIS2, DORA, ISO 27001 ou HDS, risques de sanction et plan de remédiation priorisé pour votre direction.',

  // Tests d'intrusion et audits techniques
  '/pentest': 'Cabinet de pentest à Paris : tests d’intrusion externes, internes, web, mobile, Active Directory, physiques et Red Team, menés par des experts certifiés OSCP.',
  '/pentest-paris': 'Test d’intrusion à Paris : nos pentesteurs certifiés OSCP et CEH évaluent vos applications, votre réseau et votre Active Directory depuis notre cabinet du 16e.',
  '/pentest-externe': 'Pentest externe : nous attaquons votre périmètre exposé sur Internet (sites, VPN, messagerie, API) en boîte noire, grise ou blanche, comme un vrai attaquant.',
  '/pentest-interne': 'Pentest interne : simulation d’un attaquant déjà présent sur votre réseau, mouvements latéraux, escalade de privilèges et efficacité de la segmentation.',
  '/pentest-web': 'Pentest d’application web et d’API selon l’OWASP WSTG : failles d’authentification, d’autorisation et de logique métier, rapport CVSS et re-test inclus.',
  '/pentest-mobile': 'Pentest d’application mobile iOS et Android selon l’OWASP MASVS : analyse statique et dynamique, stockage local, communications et API du backend.',
  '/pentest-ad': 'Pentest Active Directory : chemins d’attaque jusqu’aux droits d’administrateur du domaine, comptes à privilèges, délégations et durcissement à prévoir.',
  '/pentest-physique': 'Test d’intrusion physique de vos locaux : contrôle d’accès, badges, ingénierie sociale sur site et sécurité périmétrique, avec un rapport d’amélioration.',
  '/red-team': 'Exercice Red Team : une attaque ciblée et réaliste pour mesurer la capacité de vos équipes à détecter et à répondre à l’intrusion.',
  '/osint': 'Audit OSINT : ce qu’un attaquant peut apprendre sur votre entreprise à partir de sources publiques (fuites, comptes, infrastructure) et comment le réduire.',
  '/audit-o365': 'Audit de sécurité Microsoft 365 : identités et MFA, accès conditionnel, messagerie, partage de données et Secure Score, avec un plan d’action priorisé.',
  '/audit-cybersecurite': 'Audit de cybersécurité complet : architecture, configurations, droits d’accès, organisation et conformité, pour connaître votre niveau réel de sécurité.',
  '/audit-flash': 'Audit flash cybersécurité en 1 à 2 jours : diagnostic express de vos risques critiques et premières recommandations, idéal avant un audit complet.',
  '/audit-architecture': 'Audit d’architecture de votre système d’information : conception réseau, cloud et applicative, cloisonnement et failles structurelles, plan de remédiation.',
  '/audit-configuration': 'Audit de configuration de vos serveurs, postes, équipements réseau et applications : écarts aux bonnes pratiques de durcissement et corrections à appliquer.',
  '/audit-code-source': 'Audit de code source : revue manuelle et outillée pour détecter injections, failles d’authentification et erreurs de logique avant la mise en production.',
  '/audit-organisationnel': 'Audit organisationnel de la sécurité : gouvernance SSI, rôles et responsabilités, politiques, processus et facteur humain, avec des recommandations concrètes.',
  '/audit-securite-technique': 'Audit de sécurité technique de votre infrastructure : vulnérabilités, configurations, architecture et procédures d’exploitation, rapport priorisé.',
  '/protection-ransomware': 'Protection contre les ransomwares : évaluation de votre exposition, sauvegardes isolées, détection, cloisonnement et plan de réponse pour reprendre vite.',

  // Facteur humain et formation
  '/cyber-vigilance-humaine': 'Cyber-vigilance des équipes : campagnes de phishing simulé, sensibilisation ciblée et mesure des comportements pour réduire le risque humain.',
  '/sensibilisation-formation': 'Sensibilisation et formation à la cybersécurité : ateliers, e-learning et exercices de phishing adaptés aux métiers de vos collaborateurs.',
  '/formations': 'Formations en ligne en cybersécurité à suivre à votre rythme : pentest web OWASP, hacking éthique, réponse à incident, sécurité réseau et RGPD.',
  '/formations-paiement': 'Paiement sécurisé de votre formation en ligne SecuriTrust : choisissez votre formation, réglez par carte et accédez ensuite à ses modules.',
  '/formations/pentest-web-owasp': 'Formation en ligne au pentest web : les vulnérabilités de l’OWASP Top 10 (injections, XSS, CSRF, SSRF, contrôle d’accès) et la rédaction du rapport.',
  '/formations/hacking-ethique-fondamentaux': 'Formation en ligne aux fondamentaux du hacking éthique : méthodologie de test d’intrusion, Kali Linux, Nmap et Metasploit, pour débutants.',
  '/formations/reponse-incidents-forensics': 'Formation en ligne à la réponse aux incidents et au forensic : détecter, analyser et contenir une attaque, puis préserver et exploiter les preuves.',
  '/formations/rgpd-conformite-pratique': 'Formation en ligne pratique au RGPD : registre des traitements, bases légales, droits des personnes, sous-traitants et violations de données.',
  '/formations/securite-reseaux-entreprise': 'Formation en ligne à la sécurité des réseaux d’entreprise : segmentation, pare-feu, VPN, Wi-Fi et supervision pour contrer les cybermenaces.',
  '/formations/construire-smsi-iso-27001': 'Formation de 3 jours en présentiel à Paris pour construire un SMSI ISO/IEC 27001:2022 : périmètre, analyse de risques, déclaration d’applicabilité, audit.',

  // Parcours « cybersécurité opérationnelle »
  '/cybersecurite-operationnelle': 'Cybersécurité opérationnelle pour PME et ETI : tests d’intrusion, audits et protection de la réputation, choisis selon ce que vous devez protéger en priorité.',
  '/cybersecurite-operationnelle/exigences-reglementaires': 'Répondre aux exigences NIS2, ISO 27001, DORA et RGPD : audits de configuration, d’architecture et de code, audit flash, livrables pour la direction.',
  '/cybersecurite-operationnelle/proteger-chiffre-affaires': 'Protéger votre chiffre d’affaires : pentest interne, externe, web et mobile, test de résistance aux ransomwares, pour PME et ETI, dès 3 500 €.',
  '/cybersecurite-operationnelle/preserver-image-confiance': 'Préserver votre image : audit OSINT, exercices Red Team et campagnes de phishing pour limiter le risque d’incident public et de perte de confiance.',

  // Secteurs
  '/secteurs': 'Cybersécurité par secteur : banque et finance, santé, tech, secteur public, retail et industrie, avec les réglementations propres à chacun.',
  '/secteurs/banque-finance': 'Cybersécurité pour banques, assureurs et fintechs : conformité DORA, tests d’intrusion, TLPT, gouvernance des risques TIC et des prestataires.',
  '/secteurs/sante': 'Cybersécurité pour établissements de santé, éditeurs et hébergeurs : certification HDS, protection des données patients, pentest et NIS2.',
  '/secteurs/tech': 'Cybersécurité pour éditeurs SaaS et scale-ups : pentest applicatif et cloud, ISO 27001 pour rassurer vos clients, sécurité intégrée au développement.',
  '/secteurs/public': 'Cybersécurité pour collectivités et administrations : conformité NIS2, homologation, analyse de risques EBIOS RM et tests d’intrusion.',
  '/secteurs/retail': 'Cybersécurité pour e-commerçants et enseignes : sécurité des paiements, protection des données clients, pentest web et conformité RGPD.',
  '/secteurs/industrie': 'Cybersécurité industrielle : convergence IT/OT, segmentation des réseaux de production, TISAX pour l’automobile, NIS2 et continuité d’activité.',

  // Blog
  '/articles': 'Analyses et guides des experts SecuriTrust sur NIS2, DORA, ISO 27001, le pentest et Microsoft 365, et veille quotidienne sur les menaces.',
  '/articles/veille': 'Veille cybersécurité en français : vulnérabilités critiques, campagnes de malware et menaces du moment, avec leurs impacts et les actions à mener.',
};

/**
 * Description dérivée d'un texte libre (extrait d'article) : coupée entre deux mots
 * pour tenir en META_MAX caractères, points de suspension compris.
 */
export function clampDescription(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= META_MAX) return clean;
  const cut = clean.slice(0, META_MAX - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.\-–—]+$/, '')}…`;
}

/** Description d'une page ; lève une erreur si le chemin n'est pas répertorié. */
export function metaDescription(path) {
  const d = META_DESCRIPTIONS[path];
  if (!d) throw new Error(`Meta description manquante pour ${path}`);
  return d;
}

/** Vérifie longueur et unicité ; renvoie la liste des problèmes. */
export function checkMetaDescriptions() {
  const problems = [];
  const seen = new Map();
  for (const [path, d] of Object.entries(META_DESCRIPTIONS)) {
    if (d.length > META_MAX) problems.push(`${path} : ${d.length} caractères (max ${META_MAX})`);
    if (seen.has(d)) problems.push(`${path} : même description que ${seen.get(d)}`);
    seen.set(d, path);
  }
  return problems;
}
