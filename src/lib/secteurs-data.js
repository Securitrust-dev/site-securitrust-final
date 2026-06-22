// lib/secteurs-data.js
// Données réglementaires et contenus marketing par secteur — SecuriTrust
// Sources réglementaires vérifiées (DORA, NIS2, HDS/ISO 27001, RGPD, PCI DSS, IEC 62443)

export const SECTEURS = {
  "banque-finance": {
    slug: "banque-finance",
    label: "Banque & Finance",
    eyebrow: "DORA · PCI DSS · Résilience opérationnelle",
    hero: {
      titre: "Votre conformité DORA, pilotée par des experts qui connaissent le secteur.",
      sousTitre:
        "Banques, assureurs, fintechs et établissements de paiement : SecuriTrust déploie les tests d'intrusion, la gouvernance TIC et le pilotage continu que le régulateur attend — avec des consultants certifiés OSCP, CEH et formés aux exigences de l'AMF et de l'ACPR.",
    },
    stats: [
      { valeur: "488", legende: "incidents financiers européens recensés par l'ENISA en 18 mois" },
      { valeur: "10 M€", legende: "de sanction maximale pour une entité financière non conforme DORA" },
      { valeur: "72h", legende: "délai réglementaire pour notifier un incident majeur au régulateur" },
    ],
    pourquoi: {
      titre: "Pourquoi le secteur financier ne peut pas se passer d'un partenaire cyber",
      intro:
        "Le secteur financier est la cible n°1 des cyberattaques en Europe. Ransomwares, fraudes aux virements, exfiltrations de données clients : les conséquences d'un incident sont immédiates — sur la trésorerie, la réputation et la licence d'exploitation. DORA oblige désormais chaque établissement à démontrer sa résilience au régulateur, pas seulement la déclarer.",
      points: [
        {
          titre: "DORA contrôlable dès maintenant par l'AMF et l'ACPR",
          texte:
            "Depuis le 17 janvier 2025, DORA est d'application directe. Les superviseurs français ont commencé leurs premiers contrôles ciblés. SecuriTrust réalise votre gap analysis DORA et produit la documentation que le régulateur attend : politique de risques TIC, registre d'informations, cartographie des prestataires critiques.",
        },
        {
          titre: "Les TLPT : des tests de pénétration réglementaires, pas des audits ordinaires",
          texte:
            "DORA impose des tests de pénétration fondés sur la menace (TLPT) pour les entités significatives. SecuriTrust conduit ces tests avec ses pentesters certifiés OSCP, en simulant les tactiques réelles des groupes APT ciblant le secteur financier. Chaque test produit un rapport conforme aux attentes du régulateur.",
        },
        {
          titre: "La direction exposée personnellement en cas de manquement",
          texte:
            "DORA engage la responsabilité personnelle des dirigeants sur la gouvernance des risques TIC. SecuriTrust forme et accompagne votre CODIR : tableaux de bord, indicateurs de risques, préparation aux questions du conseil d'administration. La cybersécurité devient un argument de confiance, pas un centre de coût.",
        },
      ],
    },
    normes: {
      titre: "Ce que votre établissement doit démontrer",
      items: [
        {
          nom: "DORA — Gouvernance des risques TIC",
          statut: "Obligatoire",
          desc: "SecuriTrust rédige votre politique de gestion des risques TIC, cartographie vos systèmes critiques et met en place le cadre de gouvernance documenté exigé par l'article 5 du règlement. Livrable : politique validée, organigramme des responsabilités, cartographie des actifs.",
        },
        {
          nom: "Registre d'informations (RoI) — Prestataires TIC",
          statut: "Déclaratif annuel",
          desc: "Constitution et tenue de votre registre des contrats TIC, identification des prestataires critiques, clauses contractuelles DORA. SecuriTrust prend en charge la remise annuelle à l'AMF / l'ACPR et les mises à jour trimestrielles.",
        },
        {
          nom: "TLPT — Tests de pénétration fondés sur la menace",
          statut: "Périodique",
          desc: "Pentests red team conduits par nos experts OSCP sur vos systèmes critiques (core banking, paiement, SI de marché). Simulation de groupes APT réels, rapport TIBER-EU compatible, coordination avec le régulateur si nécessaire.",
        },
        {
          nom: "PCI DSS 4.0",
          statut: "Contractuel",
          desc: "Audit de conformité annuel de votre environnement de données cartes. SecuriTrust accompagne la remédiation post-audit, les scans trimestriels ASV et la formation de vos équipes aux nouvelles exigences de la version 4.0.",
        },
        {
          nom: "RGPD — Données clients et incidents",
          statut: "Obligatoire",
          desc: "Registre des traitements, analyse d'impact (PIA) sur les traitements sensibles, procédure de notification CNIL sous 72h. SecuriTrust intègre la réponse sur incident cyber dans votre dispositif RGPD.",
        },
      ],
    },
    accompagnement: {
      titre: "L'accompagnement SecuriTrust, conçu pour le secteur financier",
      etapes: [
        {
          titre: "Diagnostic DORA en 5 jours",
          texte: "Gap analysis complète de votre posture face aux 5 piliers DORA : gouvernance, gestion des risques, notification d'incidents, résilience opérationnelle, gestion des tiers. Rapport exécutif avec plan de remédiation priorisé.",
        },
        {
          titre: "Pentest & TLPT certifiés",
          texte: "Tests d'intrusion externes, internes, applicatifs et TLPT red team conduits par nos pentesters OSCP. Rapports conformes aux attentes réglementaires, restitution au CODIR et suivi de remédiation inclus.",
        },
        {
          titre: "RSSI externalisé Finance (Cyber-Pilote)",
          texte: "Un RSSI senior dédié à votre établissement, disponible en fractionnaire ou temps plein. Pilotage du plan cyber, animation du comité de sécurité, interlocuteur unique face à l'AMF, l'ACPR et vos commissaires aux comptes.",
        },
        {
          titre: "Maintien en condition de conformité",
          texte: "Tableau de bord de conformité mensuel, veille réglementaire DORA/PCI DSS, mise à jour des politiques et des contrats prestataires. Vous êtes toujours prêt pour un contrôle — sans y consacrer une équipe interne.",
        },
      ],
    },
    cta: {
      titre: "Votre prochain contrôle AMF/ACPR, vous le passez avec nous.",
      texte: "Obtenez votre diagnostic DORA gratuit sous 48h ouvrées. Nos experts vous remettent un rapport d'écart et un plan d'action concret — sans engagement.",
      bouton: "Demander mon diagnostic DORA gratuit",
    },
  },

  "sante": {
    slug: "sante",
    label: "Santé",
    eyebrow: "Données sensibles · Certification réglementaire",
    hero: {
      titre: "Protéger les patients, c'est d'abord protéger leurs données.",
      sousTitre:
        "Établissements de santé, éditeurs de logiciels médicaux, hébergeurs : la certification HDS est une obligation légale en France. SecuriTrust sécurise vos systèmes critiques et vos données de santé les plus sensibles.",
    },
    stats: [
      { valeur: "HDS", legende: "certification obligatoire pour héberger des données de santé" },
      { valeur: "3 ans", legende: "validité du certificat, avec audit de surveillance annuel" },
      { valeur: "24/7", legende: "disponibilité attendue des services de santé" },
    ],
    pourquoi: {
      titre: "Pourquoi vous avez besoin d'un accompagnement",
      intro:
        "Les données de santé sont parmi les informations les plus sensibles et les plus convoitées. Une fuite expose les patients, engage la responsabilité de l'établissement et peut paralyser des services vitaux. La certification HDS n'est pas optionnelle : elle est obligatoire pour tout acteur manipulant des données de santé à caractère personnel en France.",
      points: [
        {
          titre: "Une obligation légale, pas un label marketing",
          texte:
            "La certification HDS, établie par l'Agence du Numérique en Santé (ANS), est obligatoire pour toute organisation hébergeant des données de santé. Sans elle, vous ne pouvez légalement exercer cette activité.",
        },
        {
          titre: "Un nouveau référentiel HDS v2 en vigueur",
          texte:
            "L'arrêté du 26 avril 2024 (en vigueur le 16 mai 2024) a renforcé les exigences : alignement sur l'ISO 27001:2022, souveraineté des données, contrôle accru des sous-traitants et des traces d'accès. Tous les certificats actifs doivent être à jour avant le 16 mai 2026.",
        },
        {
          titre: "Des cibles privilégiées par les rançongiciels",
          texte:
            "Les hôpitaux et structures de santé figurent parmi les premières cibles des attaques par rançongiciel, avec des conséquences directes sur la continuité des soins.",
        },
      ],
    },
    normes: {
      titre: "Le cadre réglementaire applicable",
      items: [
        {
          nom: "Certification HDS (référentiel v2)",
          statut: "Obligatoire",
          desc: "Obligatoire pour tout hébergement de données de santé à caractère personnel. Processus en deux étapes (audit documentaire + audit sur site), certificat valable 3 ans avec audit de surveillance annuel obligatoire.",
        },
        {
          nom: "ISO/IEC 27001:2022",
          statut: "Prérequis HDS",
          desc: "Système de management de la sécurité de l'information. Prérequis obligatoire à la certification HDS. Migration vers la version 2022 requise.",
        },
        {
          nom: "RGPD & Code de la santé publique",
          statut: "Obligatoire",
          desc: "Article R1111-11 du CSP : clauses contractuelles obligatoires, consentement, traçabilité des accès, notification CNIL sous 72h en cas de violation.",
        },
        {
          nom: "Référentiel ANS / PGSSI-S",
          statut: "Recommandé",
          desc: "Politique générale de sécurité des systèmes d'information de santé : authentification forte des professionnels, sécurisation des échanges (MSSanté).",
        },
        {
          nom: "ISO 27017 / 27018",
          statut: "Recommandé",
          desc: "Sécurité du cloud et protection des données personnelles dans le cloud, partiellement alignées avec HDS.",
        },
      ],
    },
    accompagnement: {
      titre: "Comment SecuriTrust vous accompagne",
      etapes: [
        { titre: "Audit blanc HDS", texte: "Identification des écarts par rapport au référentiel HDS v2 avant l'audit de certification." },
        { titre: "Mise en place du SMSI", texte: "Construction ou renforcement de votre système de management ISO 27001:2022." },
        { titre: "Préparation à l'audit", texte: "Accompagnement jusqu'à l'audit de l'organisme certificateur accrédité Cofrac, pour réussir du premier coup." },
        { titre: "Surveillance continue", texte: "Maintien de la conformité entre les audits annuels via le service Cyber-Pilote." },
      ],
    },
    cta: {
      titre: "Votre certificat HDS est-il conforme au référentiel v2 ?",
      texte: "Échéance au 16 mai 2026. Évaluez votre niveau de préparation avec un audit blanc gratuit.",
      bouton: "Planifier mon audit blanc HDS",
    },
  },

  "tech": {
    slug: "tech",
    label: "Tech & SaaS",
    eyebrow: "Sécurité produit · DevSecOps",
    hero: {
      titre: "Sécurisez vos devs et votre infra sans perdre en agilité.",
      sousTitre:
        "Éditeurs SaaS, startups, scale-ups : votre code et votre infrastructure cloud sont votre actif le plus précieux. SecuriTrust intègre la sécurité dans votre cycle de développement sans freiner votre vélocité.",
    },
    stats: [
      { valeur: "SOC 2", legende: "souvent exigé par vos clients grands comptes" },
      { valeur: "ISO 27001", legende: "passeport B2B pour les marchés réglementés" },
      { valeur: "NIS2", legende: "applicable aux fournisseurs numériques" },
    ],
    pourquoi: {
      titre: "Pourquoi vous avez besoin d'un accompagnement",
      intro:
        "Pour une entreprise tech, une faille de sécurité n'est pas un incident technique : c'est une crise de confiance qui peut tuer le produit. Vos clients B2B exigent des garanties (SOC 2, ISO 27001) avant de signer, et la directive NIS2 inclut désormais les fournisseurs numériques dans son périmètre.",
      points: [
        {
          titre: "La sécurité, condition de vente B2B",
          texte:
            "Les acheteurs grands comptes conditionnent leurs contrats à des certifications (ISO 27001, SOC 2). Sans elles, vous perdez des deals avant même la démo produit.",
        },
        {
          titre: "Le DevSecOps évite la dette de sécurité",
          texte:
            "Corriger une vulnérabilité en production coûte bien plus cher qu'en intégrant la sécurité dès la conception. L'audit de code et l'analyse de dépendances doivent s'intégrer à votre CI/CD.",
        },
        {
          titre: "NIS2 vous concerne peut-être déjà",
          texte:
            "Les fournisseurs de services numériques (cloud, places de marché, moteurs de recherche, datacenters) figurent parmi les 18 secteurs couverts par NIS2 en tant qu'entités importantes.",
        },
      ],
    },
    normes: {
      titre: "Le cadre applicable et les standards attendus",
      items: [
        {
          nom: "ISO/IEC 27001:2022",
          statut: "Quasi-incontournable",
          desc: "Standard international du management de la sécurité de l'information. Non obligatoire légalement, mais très souvent exigé en B2B et sur les marchés publics. Audit de surveillance annuel, recertification à 3 ans.",
        },
        {
          nom: "SOC 2 (Type I & II)",
          statut: "Exigé par les clients US",
          desc: "Rapport d'attestation sur les contrôles de sécurité, disponibilité, confidentialité. Type II évalué sur une période d'observation (6 à 12 mois). Indispensable pour vendre aux entreprises américaines.",
        },
        {
          nom: "NIS2 (Directive UE 2022/2555)",
          statut: "Selon seuils",
          desc: "Applicable aux fournisseurs numériques dépassant 50 salariés ou 10 M€ de CA. 10 mesures cyber obligatoires (article 21), notification d'incident à l'ANSSI.",
        },
        {
          nom: "OWASP ASVS / Top 10",
          statut: "Bonne pratique",
          desc: "Référentiel de sécurité applicative pour cadrer l'audit de code, les tests d'intrusion et la sécurisation des API.",
        },
        {
          nom: "RGPD",
          statut: "Obligatoire",
          desc: "Privacy by design, registre des traitements, gestion des sous-traitants, sécurité des données utilisateurs.",
        },
      ],
    },
    accompagnement: {
      titre: "Comment SecuriTrust vous accompagne",
      etapes: [
        { titre: "Audit de sécurité produit", texte: "Pentest applicatif, revue de code, analyse de l'infrastructure cloud et des dépendances." },
        { titre: "Intégration DevSecOps", texte: "Sécurisation de votre pipeline CI/CD, scans automatisés et politiques de secrets." },
        { titre: "Préparation à la certification", texte: "Accompagnement ISO 27001 ou SOC 2 pour débloquer vos ventes grands comptes." },
        { titre: "RSSI externalisé", texte: "Cyber-Pilote : la posture de sécurité d'une grande entreprise, au coût d'une startup." },
      ],
    },
    cta: {
      titre: "Un deal grand compte bloqué par un questionnaire de sécurité ?",
      texte: "Obtenez un audit de votre posture et une feuille de route ISO 27001 / SOC 2 en 48h.",
      bouton: "Débloquer mes certifications",
    },
  },

  "public": {
    slug: "public",
    label: "Secteur Public",
    eyebrow: "Collectivités · Opérateurs essentiels",
    hero: {
      titre: "La cybersécurité au service de la continuité du service public.",
      sousTitre:
        "Collectivités territoriales, administrations, organismes publics : vous êtes une cible privilégiée et désormais directement concernés par NIS2. SecuriTrust vous accompagne avec pédagogie vers la conformité.",
    },
    stats: [
      { valeur: "18", legende: "secteurs couverts par NIS2, dont l'administration publique" },
      { valeur: "15 000+", legende: "entités françaises désormais concernées (vs 500 sous NIS1)" },
      { valeur: "ANSSI", legende: "autorité de supervision et de sanction" },
    ],
    pourquoi: {
      titre: "Pourquoi vous avez besoin d'un accompagnement",
      intro:
        "Les collectivités et administrations gèrent des données citoyennes sensibles et des services essentiels. Elles sont régulièrement visées par des rançongiciels qui paralysent l'état civil, la fiscalité locale ou les services hospitaliers. Beaucoup découvrent qu'elles sont désormais concernées par NIS2 alors qu'elles ne l'étaient pas auparavant.",
      points: [
        {
          titre: "L'administration publique dans le périmètre NIS2",
          texte:
            "L'administration publique figure parmi les secteurs hautement critiques (entités essentielles) de NIS2. La transposition française est portée par la loi du 30 juillet 2025, complétée par décret en novembre 2025, et s'applique progressivement en 2026.",
        },
        {
          titre: "Des moyens limités, des risques maximaux",
          texte:
            "Les collectivités disposent rarement d'une équipe cyber dédiée. C'est précisément cette vulnérabilité que les attaquants exploitent. L'accompagnement externalisé permet une posture solide à coût maîtrisé.",
        },
        {
          titre: "Une approche progressive de l'ANSSI",
          texte:
            "L'ANSSI a annoncé un calendrier en plusieurs phases : sensibilisation en 2025-2026, audits ciblés en 2026-2027, puis sanctions pour les non-conformités persistantes. Anticiper, c'est éviter la sanction.",
        },
      ],
    },
    normes: {
      titre: "Le cadre réglementaire applicable",
      items: [
        {
          nom: "NIS2 (Directive UE 2022/2555)",
          statut: "Obligatoire",
          desc: "Transposée en France par la loi du 30 juillet 2025. Impose 10 mesures de cybersécurité (article 21), une gouvernance formalisée et la notification des incidents significatifs à l'ANSSI via un guichet unique.",
        },
        {
          nom: "Référentiel Cyber France (ReCyF)",
          statut: "Recommandé",
          desc: "Mis à disposition par l'ANSSI depuis le 17 mars 2026, il liste les mesures concrètes pour atteindre les objectifs de sécurité fixés par NIS2.",
        },
        {
          nom: "RGPD",
          statut: "Obligatoire",
          desc: "Protection des données des administrés, désignation d'un DPO, registre des traitements, notification CNIL sous 72h.",
        },
        {
          nom: "RGS (Référentiel Général de Sécurité)",
          statut: "Applicable",
          desc: "Cadre de sécurité des téléservices des autorités administratives : authentification, signature électronique, homologation de sécurité.",
        },
        {
          nom: "Notification d'incident",
          statut: "Obligation NIS2",
          desc: "Alerte précoce à l'ANSSI sous 24h, notification détaillée sous 72h, rapport final sous un mois en cas d'incident significatif.",
        },
      ],
    },
    accompagnement: {
      titre: "Comment SecuriTrust vous accompagne",
      etapes: [
        { titre: "État des lieux cyber", texte: "Diagnostic de votre posture et identification de votre statut (entité essentielle ou importante)." },
        { titre: "Feuille de route NIS2", texte: "Plan de mise en conformité aligné sur le ReCyF, priorisé selon vos moyens." },
        { titre: "Procédures d'incident", texte: "Mise en place de la chaîne de notification ANSSI et des plans de réponse documentés." },
        { titre: "Sensibilisation des agents", texte: "Formation des équipes : le facteur humain reste le premier vecteur d'attaque." },
      ],
    },
    cta: {
      titre: "Votre collectivité est-elle concernée par NIS2 ?",
      texte: "Vérifiez votre statut et obtenez une feuille de route de conformité adaptée à vos moyens.",
      bouton: "Évaluer mon éligibilité NIS2",
    },
  },

  "retail": {
    slug: "retail",
    label: "Retail & E-commerce",
    eyebrow: "Paiement en ligne · Données clients",
    hero: {
      titre: "Protégez vos données, vos ventes et votre image en ligne.",
      sousTitre:
        "E-commerçants, enseignes, marketplaces : une faille de paiement ou une fuite de données clients, et c'est votre chiffre d'affaires et votre réputation qui s'effondrent. SecuriTrust sécurise toute votre chaîne de vente.",
    },
    stats: [
      { valeur: "PCI DSS 4.0", legende: "obligatoire dès le premier paiement par carte" },
      { valeur: "72h", legende: "délai de notification CNIL en cas de fuite de données" },
      { valeur: "4%", legende: "du CA mondial : sanction RGPD maximale" },
    ],
    pourquoi: {
      titre: "Pourquoi vous avez besoin d'un accompagnement",
      intro:
        "Le commerce en ligne concentre tout ce que recherchent les attaquants : données de paiement, données personnelles, et une dépendance totale à la disponibilité du site. Une attaque pendant les soldes ou le Black Friday peut anéantir une année de marge. La conformité PCI DSS n'est pas une option commerciale, c'est une exigence des réseaux de cartes.",
      points: [
        {
          titre: "PCI DSS 4.0 : la nouvelle norme est en vigueur",
          texte:
            "La version 4.0 de la norme de sécurité des cartes de paiement renforce les exigences (authentification multifacteur étendue, gestion des scripts de paiement, lutte contre le web skimming). La conformité est obligatoire pour tout marchand traitant des cartes.",
        },
        {
          titre: "Le web skimming, menace silencieuse",
          texte:
            "Des scripts malveillants injectés dans les pages de paiement (attaques Magecart) volent les données de carte sans que le marchand s'en aperçoive. PCI DSS 4.0 impose désormais des contrôles spécifiques sur ces scripts.",
        },
        {
          titre: "Le RGPD protège vos clients et votre marque",
          texte:
            "Fuite de la base clients, panier abandonné mal sécurisé, cookies non conformes : les sanctions CNIL peuvent atteindre 4% du chiffre d'affaires mondial, sans compter l'impact réputationnel.",
        },
      ],
    },
    normes: {
      titre: "Le cadre réglementaire applicable",
      items: [
        {
          nom: "PCI DSS 4.0",
          statut: "Obligatoire (contractuel)",
          desc: "Norme imposée par les réseaux de cartes (Visa, Mastercard) à tout acteur traitant, stockant ou transmettant des données de cartes. Audit annuel : questionnaire d'auto-évaluation (SAQ) ou audit QSA selon le volume de transactions.",
        },
        {
          nom: "RGPD",
          statut: "Obligatoire",
          desc: "Consentement aux cookies, registre des traitements, sécurité de la base clients, notification CNIL sous 72h. Sanctions jusqu'à 20 M€ ou 4% du CA mondial.",
        },
        {
          nom: "Directive DSP2 / SCA",
          statut: "Obligatoire",
          desc: "Authentification forte du client (3-D Secure 2) pour sécuriser les paiements en ligne et réduire la fraude.",
        },
        {
          nom: "NIS2",
          statut: "Selon seuils",
          desc: "Les marketplaces et plateformes de e-commerce d'une certaine taille peuvent être qualifiées d'entités importantes au titre des fournisseurs numériques.",
        },
        {
          nom: "Tests d'intrusion & WAF",
          statut: "Bonne pratique",
          desc: "Pentests réguliers du site, pare-feu applicatif (WAF), protection anti-DDoS pour garantir la disponibilité en période de forte affluence.",
        },
      ],
    },
    accompagnement: {
      titre: "Comment SecuriTrust vous accompagne",
      etapes: [
        { titre: "Audit PCI DSS & site", texte: "Évaluation de votre conformité PCI DSS et test d'intrusion de votre boutique en ligne." },
        { titre: "Sécurisation du paiement", texte: "Mise en conformité du tunnel de paiement, gestion des scripts, protection anti-skimming." },
        { titre: "Conformité RGPD", texte: "Audit cookies, registre des traitements, sécurisation de la base clients." },
        { titre: "Résilience opérationnelle", texte: "WAF, anti-DDoS et plan de continuité pour tenir les pics de trafic (soldes, Black Friday)." },
      ],
    },
    cta: {
      titre: "Votre boutique est-elle conforme PCI DSS 4.0 ?",
      texte: "Obtenez un audit de sécurité complet de votre site e-commerce et un plan de mise en conformité.",
      bouton: "Auditer ma boutique en ligne",
    },
  },

  "industrie": {
    slug: "industrie",
    label: "Industrie",
    eyebrow: "OT / IT · Continuité opérationnelle",
    hero: {
      titre: "Sécurisez vos environnements industriels et votre continuité opérationnelle.",
      sousTitre:
        "Usines, sites de production, opérateurs industriels : la convergence IT/OT a ouvert vos lignes de production aux cybermenaces. Un arrêt de production se compte en millions. SecuriTrust protège vos systèmes industriels et vos données sensibles.",
    },
    stats: [
      { valeur: "NIS2", legende: "la fabrication industrielle entre dans le périmètre" },
      { valeur: "IEC 62443", legende: "le standard de référence pour la cybersécurité OT" },
      { valeur: "10 M€", legende: "sanction maximale pour les entités essentielles" },
    ],
    pourquoi: {
      titre: "Pourquoi vous avez besoin d'un accompagnement",
      intro:
        "Les systèmes industriels (SCADA, automates, IoT industriel) ont été conçus pour la disponibilité, rarement pour la sécurité. Leur connexion croissante aux réseaux IT les expose à des attaques qui peuvent arrêter une chaîne de production, compromettre la sécurité physique des opérateurs ou voler vos secrets de fabrication. NIS2 fait désormais entrer une grande partie de l'industrie dans son périmètre.",
      points: [
        {
          titre: "L'industrie désormais soumise à NIS2",
          texte:
            "La fabrication (chimique, automobile, alimentation, électronique critique) relève des entités essentielles ou importantes selon les seuils (50 salariés / 10 M€ de CA pour les EI). Les 10 mesures de l'article 21 deviennent obligatoires.",
        },
        {
          titre: "Le risque OT : l'arrêt de production",
          texte:
            "Contrairement à l'IT, une attaque sur l'OT a des conséquences physiques immédiates : arrêt de ligne, défaut qualité, voire risque pour la sécurité des personnes. Le coût d'une heure d'arrêt se chiffre souvent en dizaines de milliers d'euros.",
        },
        {
          titre: "Responsabilité personnelle des dirigeants",
          texte:
            "Nouveauté majeure de NIS2 : les dirigeants (PDG, DSI, RSSI) engagent leur responsabilité personnelle en cas de non-conformité grave, avec possibilité de suspension temporaire de fonctions.",
        },
      ],
    },
    normes: {
      titre: "Le cadre réglementaire applicable",
      items: [
        {
          nom: "NIS2 (Directive UE 2022/2555)",
          statut: "Obligatoire selon seuils",
          desc: "Transposée par la loi du 30 juillet 2025. Entités essentielles (jusqu'à 10 M€ ou 2% du CA mondial de sanction) ou importantes (7 M€ ou 1,4%). 10 mesures cyber obligatoires, notification d'incident à l'ANSSI.",
        },
        {
          nom: "IEC 62443 (SL2 recommandé)",
          statut: "Standard de référence",
          desc: "Norme internationale dédiée à la cybersécurité des systèmes d'automatisation et de contrôle industriels (IACS). Alignement SL2 recommandé pour répondre aux attentes NIS2.",
        },
        {
          nom: "Segmentation IT / OT",
          statut: "Mesure prioritaire",
          desc: "Cloisonnement des réseaux de production et bureautiques, zones démilitarisées (DMZ industrielles), contrôle des accès distants aux automates.",
        },
        {
          nom: "ISO/IEC 27001:2022",
          statut: "Recommandé",
          desc: "Système de management de la sécurité de l'information, base d'une gouvernance cyber structurée et souvent attendue par les donneurs d'ordre.",
        },
        {
          nom: "Plan de continuité (PCA/PRA)",
          statut: "Exigence NIS2",
          desc: "Plan de continuité et de reprise d'activité testé et documenté, sauvegardes isolées pour résister aux rançongiciels visant la production.",
        },
      ],
    },
    accompagnement: {
      titre: "Comment SecuriTrust vous accompagne",
      etapes: [
        { titre: "Cartographie IT/OT", texte: "Inventaire de vos systèmes industriels et analyse de risques alignée IEC 62443." },
        { titre: "Segmentation & durcissement", texte: "Cloisonnement des réseaux, sécurisation des accès distants, durcissement des automates." },
        { titre: "Conformité NIS2", texte: "Mise en œuvre des 10 mesures de l'article 21 et de la chaîne de notification ANSSI." },
        { titre: "Continuité opérationnelle", texte: "Plans PCA/PRA testés, sauvegardes isolées et pilotage continu via Cyber-Pilote." },
      ],
    },
    cta: {
      titre: "Combien vous coûterait une heure d'arrêt de production ?",
      texte: "Obtenez une cartographie de vos risques IT/OT et une feuille de route de conformité NIS2.",
      bouton: "Cartographier mes risques industriels",
    },
  },
};

export const SECTEURS_ORDRE = [
  "banque-finance",
  "sante",
  "tech",
  "public",
  "retail",
  "industrie",
];
