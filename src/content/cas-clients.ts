// Cas clients SecuriTrust — /cas-clients et /cas-clients/[slug].
// Gabarit inspiré des pages « cas client » : contexte et objectifs → enjeux →
// réponse et méthode → facteurs clés de succès.
//
// Règles éditoriales (validées le 29/10/2026) :
// - aucun montant, aucune date, aucun nombre de jours ;
// - aucune mention de test d'intrusion ni de vulnérabilité : on parle d'« audit de
//   sécurité » et d'« accompagnement » (confidentialité des clients) ;
// - rien d'inventé : chaque cas reprend la fiche mission fournie par SecuriTrust.
//   Un chiffre de résultat ou un verbatim ne s'ajoute qu'avec l'accord du client.

export type OffreKey =
  | 'dora'
  | 'tisax'
  | 'iso27001'
  | 'rgpd'
  | 'rssi'
  | 'risques'
  | 'audit';

export type SecteurKey = 'finance' | 'industrie' | 'sante' | 'public' | 'tech' | 'services';

export const OFFRES: Record<OffreKey, { label: string; href: string }> = {
  dora: { label: 'DORA', href: '/dora' },
  tisax: { label: 'TISAX', href: '/tisax' },
  iso27001: { label: 'ISO 27001', href: '/iso27001' },
  rgpd: { label: 'RGPD & DPO externalisé', href: '/dpo-externalise' },
  rssi: { label: 'RSSI externalisé', href: '/rssi-externalise' },
  risques: { label: 'Analyse de risques', href: '/ebios-rm' },
  audit: { label: 'Audit de sécurité', href: '/audit-cybersecurite' },
};

export const SECTEURS: Record<SecteurKey, { label: string; href: string }> = {
  finance: { label: 'Banque, assurance & finance', href: '/secteurs/banque-finance' },
  industrie: { label: 'Industrie & automobile', href: '/secteurs/industrie' },
  sante: { label: 'Santé', href: '/secteurs/sante' },
  public: { label: 'Secteur public', href: '/secteurs/public' },
  tech: { label: 'Tech, SaaS & numérique', href: '/secteurs/tech' },
  services: { label: 'Services', href: '/secteurs' },
};

export type CasClient = {
  slug: string;
  client: string;
  /** Activité du client, telle qu'affichée sous le titre. */
  activite: string;
  secteur: SecteurKey;
  offres: OffreKey[];
  /** Intitulé de la mission (H1 : « Client : mission »). */
  mission: string;
  referentiels: string[];
  chapeau: string;
  contexte: string[];
  enjeux: string[];
  methode: string[];
  facteurs: string[];
  /** Pages d'expertise liées (libellé, URL). */
  liens: [string, string][];
};

export const CAS_CLIENTS: CasClient[] = [
  {
    slug: 'cfdp-conformite-dora-iso-27001',
    client: 'CFDP',
    activite: 'Assurance',
    secteur: 'finance',
    offres: ['dora', 'iso27001', 'rssi', 'risques'],
    mission: 'mise en conformité DORA et ISO 27001, RSSI externalisé',
    referentiels: ['DORA', 'ISO 27001', 'EBIOS RM', 'AI Act'],
    chapeau:
      'Assureur soumis au règlement DORA, CFDP a confié à SecuriTrust le pilotage de sa sécurité et de sa mise en conformité réglementaire.',
    contexte: [
      'Entité financière au sens du règlement européen DORA, CFDP doit démontrer la maîtrise de ses risques numériques, de ses incidents et de ses prestataires informatiques.',
      'L’assureur a fait appel à SecuriTrust pour assurer la fonction de RSSI externalisé, conduire la mise en conformité DORA et ISO 27001 et renforcer sa gouvernance de la cybersécurité, y compris sur les nouveaux usages de l’intelligence artificielle.',
    ],
    enjeux: [
      'Répondre aux exigences de DORA : cadre de gestion du risque informatique, incidents, tiers prestataires.',
      'Structurer un système de management de la sécurité aligné sur l’ISO 27001.',
      'Encadrer les usages de l’intelligence artificielle au regard de l’AI Act.',
    ],
    methode: [
      'Prise de fonction d’un RSSI externalisé, interlocuteur unique de la direction.',
      'Analyses de risques selon la méthode EBIOS RM.',
      'Plan de mise en conformité commun DORA et ISO 27001, pour éviter les doublons.',
      'Renforcement de la gouvernance : instances de pilotage, politiques et procédures.',
    ],
    facteurs: [
      'Une seule démarche pour plusieurs référentiels.',
      'Un RSSI présent dans la durée, qui connaît l’organisation.',
      'Une double compétence sécurité et réglementation financière.',
    ],
    liens: [['Conformité DORA', '/dora'], ['RSSI externalisé', '/rssi-externalise'], ['Analyse de risques EBIOS RM', '/ebios-rm'], ['AI Act', '/ia-act']],
  },
  {
    slug: 'aramisauto-accompagnement-conformite-dora',
    client: 'Aramisauto',
    activite: 'Assurance',
    secteur: 'finance',
    offres: ['dora', 'audit'],
    mission: 'accompagnement à la mise en conformité DORA',
    referentiels: ['DORA'],
    chapeau:
      'SecuriTrust a mesuré l’écart entre les pratiques d’Aramisauto et les exigences de DORA, puis accompagné la mise en œuvre du plan d’action.',
    contexte: [
      'Pour ses activités d’assurance, Aramisauto entre dans le champ du règlement DORA sur la résilience opérationnelle numérique.',
      'L’objectif : savoir précisément où se situer par rapport au règlement, puis combler les écarts avec un plan d’action réaliste.',
    ],
    enjeux: [
      'Disposer d’un état des lieux complet face aux exigences de DORA.',
      'Prioriser les actions de mise en conformité.',
      'Être accompagné pendant la mise en œuvre, pas seulement au diagnostic.',
    ],
    methode: [
      'Gap analysis article par article du règlement DORA.',
      'Plan d’action priorisé, avec responsables et jalons.',
      'Aide à la mise en œuvre des actions aux côtés des équipes internes.',
    ],
    facteurs: [
      'Un diagnostic directement transformé en plan d’action.',
      'Un accompagnement qui se poursuit au-delà du rapport.',
      'Une lecture opérationnelle d’un règlement dense.',
    ],
    liens: [['Conformité DORA', '/dora'], ['Audit d’écart (gap analysis)', '/gap-analysis']],
  },
  {
    slug: 'cegedim-activ-audits-internes-iso-27001-dora',
    client: 'Cegedim Activ',
    activite: 'Hébergement de données et solutions SaaS pour les professionnels de santé',
    secteur: 'sante',
    offres: ['audit', 'iso27001', 'dora'],
    mission: 'audits internes ISO 27001, ISO 20000-1 et DORA',
    referentiels: ['ISO 27001', 'ISO 20000-1', 'DORA', 'OWASP', 'SANS Institute'],
    chapeau:
      'SecuriTrust réalise les audits internes de Cegedim Activ sur la sécurité, la gestion des services et la résilience opérationnelle.',
    contexte: [
      'Cegedim Activ héberge des données et fournit des solutions SaaS aux professionnels de santé. Ses clients, dont des acteurs financiers, attendent des garanties fortes de sécurité et de continuité.',
      'SecuriTrust intervient comme auditeur interne indépendant sur plusieurs référentiels à la fois.',
    ],
    enjeux: [
      'Maintenir les certifications ISO 27001 et ISO 20000-1.',
      'Démontrer la conformité aux attentes DORA de ses clients financiers.',
      'Évaluer la sécurité et la continuité des services applicatifs du groupe.',
    ],
    methode: [
      'Programme d’audits internes couvrant ISO 27001, ISO 20000-1 et DORA.',
      'Évaluation des pratiques de sécurité applicative à partir des référentiels OWASP et SANS Institute.',
      'Revue de la continuité des services applicatifs.',
      'Rapports d’audit et suivi des actions correctives.',
    ],
    facteurs: [
      'Un auditeur unique pour plusieurs référentiels.',
      'Une connaissance de l’environnement santé et hébergement.',
      'Un regard indépendant, renouvelé d’un cycle d’audit à l’autre.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Audit de conformité', '/audit-conformite'], ['Conformité DORA', '/dora'], ['Certification HDS', '/hds']],
  },
  {
    slug: 'abeille-assurances-rssi-externalise',
    client: 'Abeille Assurances',
    activite: 'Assurance',
    secteur: 'finance',
    offres: ['rssi', 'iso27001'],
    mission: 'RSSI externalisé',
    referentiels: ['ISO 27001'],
    chapeau:
      'SecuriTrust a assuré la fonction de RSSI d’Abeille Assurances, de la gouvernance au management des équipes sécurité internes.',
    contexte: [
      'Abeille Assurances avait besoin d’un responsable de la sécurité des systèmes d’information expérimenté, immédiatement opérationnel.',
      'SecuriTrust a mis à disposition un RSSI externalisé chargé de l’ensemble du périmètre sécurité.',
    ],
    enjeux: [
      'Piloter la gouvernance de la sécurité au niveau d’un grand assureur.',
      'Coordonner la surveillance, la gestion des identités et le traitement des vulnérabilités.',
      'Encadrer et faire monter en compétence les équipes internes.',
    ],
    methode: [
      'Gouvernance : politique de sécurité, comités, reporting à la direction.',
      'Pilotage du SOC et de la gestion des identités et des accès (IAM).',
      'Animation du SMSI selon l’ISO 27001.',
      'Suivi du traitement des vulnérabilités et management des équipes internes.',
    ],
    facteurs: [
      'Un RSSI senior, opérationnel dès la prise de poste.',
      'Une approche structurée par l’ISO 27001.',
      'Un rôle de manager autant que d’expert.',
    ],
    liens: [['RSSI externalisé', '/rssi-externalise'], ['Pilotage SMSI', '/pilotage-smsi'], ['Certification ISO 27001', '/iso27001']],
  },
  {
    slug: 'verspieren-audit-annuel-iso-27001',
    client: 'Verspieren',
    activite: 'Courtage en assurance',
    secteur: 'finance',
    offres: ['audit', 'iso27001'],
    mission: 'audit annuel ISO 27001',
    referentiels: ['ISO 27001'],
    chapeau:
      'SecuriTrust réalise l’audit annuel ISO 27001 de Verspieren, courtier en assurance.',
    contexte: [
      'Pour un courtier en assurance, la sécurité de l’information est un argument de confiance vis-à-vis des clients et des assureurs partenaires.',
      'Verspieren s’appuie sur SecuriTrust pour l’audit annuel de son système de management de la sécurité de l’information.',
    ],
    enjeux: [
      'Vérifier chaque année l’efficacité du SMSI.',
      'Préparer sereinement les audits de certification.',
      'Alimenter l’amélioration continue.',
    ],
    methode: [
      'Audit des exigences de la norme et des mesures de l’annexe A.',
      'Entretiens avec les responsables de processus et revue des preuves.',
      'Rapport d’audit avec constats et recommandations priorisées.',
    ],
    facteurs: [
      'Une méthode d’audit alignée sur celle des organismes de certification.',
      'Des recommandations concrètes, directement exploitables.',
      'Un regard extérieur renouvelé chaque année.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Audit de conformité', '/audit-conformite']],
  },
  {
    slug: 'munich-re-accompagnement-rgpd-dpo-externalise',
    client: 'Munich Re',
    activite: 'Réassurance',
    secteur: 'finance',
    offres: ['rgpd'],
    mission: 'audit RGPD et DPO externalisé',
    referentiels: ['RGPD'],
    chapeau:
      'SecuriTrust a audité et accompagne la conformité RGPD de Munich Re, dont il assure la fonction de délégué à la protection des données.',
    contexte: [
      'Un réassureur traite des données personnelles sensibles, issues notamment des contrats de ses clients assureurs.',
      'Munich Re a confié à SecuriTrust l’audit de sa conformité RGPD puis la fonction de DPO externalisé.',
    ],
    enjeux: [
      'Mesurer le niveau de conformité RGPD.',
      'Disposer d’un DPO indépendant et disponible.',
      'Tenir la conformité dans la durée.',
    ],
    methode: [
      'Audit de conformité RGPD et plan d’action.',
      'Accompagnement à la mise en œuvre des actions.',
      'Exercice de la fonction de DPO : conseil, registre, réponse aux demandes, veille.',
    ],
    facteurs: [
      'Un DPO qui connaît le secteur de l’assurance.',
      'Un audit suivi d’un accompagnement opérationnel.',
      'Une présence dans la durée.',
    ],
    liens: [['DPO externalisé', '/dpo-externalise'], ['Mise en conformité RGPD', '/rgpd']],
  },
  {
    slug: 'nippon-paint-accompagnement-labellisation-tisax',
    client: 'Nippon Paint',
    activite: 'Sous-traitant automobile',
    secteur: 'industrie',
    offres: ['tisax'],
    mission: 'accompagnement à la labellisation TISAX',
    referentiels: ['TISAX'],
    chapeau:
      'Les constructeurs automobiles imposent le label TISAX à leurs fournisseurs : SecuriTrust a accompagné Nippon Paint dans sa mise en conformité.',
    contexte: [
      'Pour continuer à travailler avec les constructeurs automobiles, un sous-traitant doit obtenir le label TISAX, fondé sur le référentiel VDA ISA.',
      'Nippon Paint a confié à SecuriTrust l’accompagnement de sa mise en conformité, jusqu’à l’évaluation.',
    ],
    enjeux: [
      'Répondre à une exigence contractuelle des constructeurs.',
      'Mettre les pratiques de sécurité au niveau attendu par le référentiel.',
      'Aborder l’évaluation en confiance.',
    ],
    methode: [
      'Analyse des exigences TISAX applicables au périmètre.',
      'Plan de mise en conformité et accompagnement des équipes.',
      'Préparation de l’évaluation par l’organisme d’audit.',
    ],
    facteurs: [
      'Une connaissance des attentes propres à l’automobile.',
      'Un accompagnement pas à pas jusqu’au label.',
      'Une démarche adaptée à un site industriel.',
    ],
    liens: [['Labellisation TISAX', '/tisax'], ['Secteur industrie', '/secteurs/industrie']],
  },
  {
    slug: 'amphenol-gap-analysis-tisax-audit-securite',
    client: 'Amphenol',
    activite: 'Sous-traitant automobile',
    secteur: 'industrie',
    offres: ['tisax', 'audit'],
    mission: 'audit de sécurité et accompagnement TISAX',
    referentiels: ['TISAX'],
    chapeau:
      'SecuriTrust a combiné audit de sécurité, gap analysis TISAX et accompagnement au plan d’action pour préparer la labellisation d’Amphenol.',
    contexte: [
      'Sous-traitant automobile, Amphenol vise le label TISAX exigé par les constructeurs.',
      'SecuriTrust est intervenu sur la sécurité technique comme sur l’organisation, puis dans la mise en œuvre des actions.',
    ],
    enjeux: [
      'Mesurer l’écart avec les exigences TISAX.',
      'Évaluer la sécurité du système d’information exposé.',
      'Transformer le diagnostic en actions concrètes.',
    ],
    methode: [
      'Audit de sécurité du périmètre exposé sur Internet.',
      'Gap analysis TISAX et plan d’action priorisé.',
      'Accompagnement des équipes dans la mise en œuvre du plan d’action.',
    ],
    facteurs: [
      'Une vision technique et organisationnelle réunie.',
      'Un plan d’action ancré dans les exigences du label.',
      'Un accompagnement jusqu’à la mise en œuvre.',
    ],
    liens: [['Labellisation TISAX', '/tisax'], ['Audit de sécurité technique', '/audit-securite-technique'], ['Audit d’écart (gap analysis)', '/gap-analysis']],
  },
  {
    slug: 'filec-audit-tisax',
    client: 'FILEC',
    activite: 'Industrie',
    secteur: 'industrie',
    offres: ['tisax', 'audit'],
    mission: 'audit TISAX',
    referentiels: ['TISAX'],
    chapeau: 'SecuriTrust a réalisé l’audit TISAX de FILEC, en préparation de sa labellisation.',
    contexte: [
      'Le label TISAX conditionne l’accès aux marchés des constructeurs automobiles.',
      'FILEC a confié à SecuriTrust l’audit de ses pratiques au regard du référentiel.',
    ],
    enjeux: [
      'Connaître son niveau face aux exigences TISAX.',
      'Identifier les écarts à corriger avant l’évaluation officielle.',
      'Prioriser les efforts.',
    ],
    methode: [
      'Audit des exigences du référentiel VDA ISA applicables.',
      'Entretiens, visites et revue des preuves.',
      'Rapport et recommandations priorisées.',
    ],
    facteurs: [
      'Une grille d’audit identique à celle de l’évaluation officielle.',
      'Des recommandations adaptées à l’industrie.',
      'Un diagnostic clair pour décider vite.',
    ],
    liens: [['Labellisation TISAX', '/tisax'], ['Audit de conformité', '/audit-conformite']],
  },
  {
    slug: 'sogefi-audit-securite-conformite-iso-27001',
    client: 'Sogefi',
    activite: 'Sous-traitant automobile',
    secteur: 'industrie',
    offres: ['iso27001', 'audit'],
    mission: 'audit de sécurité et accompagnement ISO 27001',
    referentiels: ['ISO 27001'],
    chapeau:
      'SecuriTrust a évalué la sécurité du système d’information de Sogefi et accompagne sa conformité ISO 27001.',
    contexte: [
      'Équipementier automobile, Sogefi doit garantir à ses clients la protection des informations qui lui sont confiées.',
      'SecuriTrust intervient à la fois sur l’évaluation technique et sur la démarche de conformité ISO 27001.',
    ],
    enjeux: [
      'Évaluer la sécurité du système d’information, en externe comme en interne.',
      'Structurer la démarche ISO 27001.',
      'Relier les constats techniques au plan de conformité.',
    ],
    methode: [
      'Audits de sécurité technique externes et internes.',
      'Accompagnement à la conformité ISO 27001.',
      'Intégration des recommandations techniques dans le plan de traitement des risques.',
    ],
    facteurs: [
      'Des constats techniques qui nourrissent la démarche de conformité.',
      'Une équipe compétente sur les deux volets.',
      'Une connaissance du secteur automobile.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Audit de sécurité technique', '/audit-securite-technique']],
  },
  {
    slug: 'pizzorno-audits-securite-technique',
    client: 'Pizzorno Environnement',
    activite: 'Gestion des déchets',
    secteur: 'services',
    offres: ['audit'],
    mission: 'audits de sécurité technique',
    referentiels: [],
    chapeau:
      'SecuriTrust a évalué la sécurité du système d’information de Pizzorno Environnement, depuis Internet et depuis le réseau interne.',
    contexte: [
      'Un acteur de la gestion des déchets opère des services essentiels pour les collectivités : leur continuité dépend de son système d’information.',
      'Pizzorno Environnement a confié à SecuriTrust une évaluation technique de sa sécurité.',
    ],
    enjeux: [
      'Connaître son exposition depuis Internet.',
      'Évaluer la résistance du réseau interne.',
      'Prioriser les mesures de renforcement.',
    ],
    methode: [
      'Audit de sécurité du périmètre exposé sur Internet.',
      'Audit de sécurité du système d’information interne.',
      'Rapport confidentiel avec recommandations priorisées et restitution aux équipes.',
    ],
    facteurs: [
      'Une évaluation à la fois externe et interne.',
      'Des recommandations hiérarchisées par niveau de risque.',
      'Une restitution claire, pour les équipes techniques et la direction.',
    ],
    liens: [['Audit de sécurité technique', '/audit-securite-technique'], ['Audit de cybersécurité', '/audit-cybersecurite']],
  },
  {
    slug: 'ecm-group-audit-organisationnel-iso-27001',
    client: 'ECM Group',
    activite: 'Fabrication de fours industriels',
    secteur: 'industrie',
    offres: ['audit', 'iso27001'],
    mission: 'audit organisationnel et diagnostic ISO 27001',
    referentiels: ['ISO 27001'],
    chapeau:
      'SecuriTrust a réalisé un audit organisationnel de la sécurité d’ECM Group, au regard de la norme ISO 27001.',
    contexte: [
      'Fabricant de fours industriels, ECM Group protège un savoir-faire technique et des données clients à forte valeur.',
      'Le groupe souhaitait mesurer son niveau de sécurité organisationnelle et sa distance à l’ISO 27001.',
    ],
    enjeux: [
      'Obtenir une photographie objective de son organisation de la sécurité.',
      'Situer ses pratiques par rapport à l’ISO 27001.',
      'Définir les priorités.',
    ],
    methode: [
      'Audit organisationnel : gouvernance, processus, rôles et responsabilités.',
      'Diagnostic des écarts avec l’ISO 27001.',
      'Recommandations priorisées.',
    ],
    facteurs: [
      'Un diagnostic court et ciblé.',
      'Une grille de lecture reconnue, l’ISO 27001.',
      'Des priorités claires pour la suite.',
    ],
    liens: [['Audit organisationnel', '/audit-organisationnel'], ['Certification ISO 27001', '/iso27001']],
  },
  {
    slug: 'cavp-evaluation-maturite-cyber-guide-hygiene-anssi',
    client: 'CAVP',
    activite: 'Caisse de retraite (Caisse d’Assurance Vieillesse des Pharmaciens)',
    secteur: 'public',
    offres: ['audit', 'iso27001'],
    mission: 'évaluation de la maturité cyber et accompagnement',
    referentiels: ['Guide d’hygiène ANSSI', 'ISO 27001'],
    chapeau:
      'SecuriTrust a évalué la maturité cyber de la CAVP sur la base du guide d’hygiène de l’ANSSI, puis accompagne la mise en œuvre du plan d’action.',
    contexte: [
      'Caisse de retraite des pharmaciens, la CAVP gère des données personnelles et des services essentiels pour ses affiliés.',
      'Elle a souhaité objectiver son niveau de sécurité et bâtir une feuille de route.',
    ],
    enjeux: [
      'Savoir où sont ses données et qui y accède.',
      'Mesurer sa maturité avec une grille reconnue.',
      'Passer du diagnostic aux actions.',
    ],
    methode: [
      'Accompagnement à la cartographie des données.',
      'Évaluation de maturité fondée sur le guide d’hygiène de l’ANSSI, avec une échelle de notation spécifique.',
      'Plan d’action et accompagnement à sa mise en œuvre, en cohérence avec l’ISO 27001.',
    ],
    facteurs: [
      'Une échelle de maturité adaptée à l’organisation.',
      'Un référentiel national reconnu.',
      'Un accompagnement qui se poursuit après le diagnostic.',
    ],
    liens: [['Évaluation de maturité', '/evaluation-maturite'], ['Secteur public', '/secteurs/public']],
  },
  {
    slug: 'sunrise-conformite-iso-27001-iso-13485',
    client: 'Sunrise',
    activite: 'Dispositifs médicaux',
    secteur: 'sante',
    offres: ['iso27001'],
    mission: 'mise en conformité ISO 27001',
    referentiels: ['ISO 27001', 'ISO 13485'],
    chapeau:
      'SecuriTrust accompagne Sunrise dans sa mise en conformité ISO 27001, en s’appuyant sur son système de management ISO 13485 existant.',
    contexte: [
      'Fabricant de dispositifs médicaux, Sunrise dispose déjà d’un système de management de la qualité certifié ISO 13485.',
      'L’enjeu : intégrer la sécurité de l’information sans créer un second système en parallèle.',
    ],
    enjeux: [
      'Atteindre la conformité ISO 27001.',
      'Capitaliser sur le système ISO 13485 en place.',
      'Limiter la charge pour les équipes.',
    ],
    methode: [
      'Analyse des points communs entre ISO 13485 et ISO 27001.',
      'Intégration des exigences sécurité dans les processus existants.',
      'Accompagnement à la construction du SMSI et à la préparation de la certification.',
    ],
    facteurs: [
      'Un système de management intégré plutôt que deux systèmes.',
      'Une connaissance des exigences du secteur médical.',
      'Une démarche progressive.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Secteur santé', '/secteurs/sante']],
  },
  {
    slug: 'telediag-audit-interne-iso-27001',
    client: 'Télédiag',
    activite: 'Éditeur de logiciel de santé',
    secteur: 'sante',
    offres: ['audit', 'iso27001'],
    mission: 'audit interne ISO 27001',
    referentiels: ['ISO 27001', 'ISO 9001'],
    chapeau:
      'SecuriTrust a réalisé l’audit interne ISO 27001 de Télédiag, éditeur de logiciel de santé déjà certifié ISO 9001.',
    contexte: [
      'Éditeur de logiciel de santé, Télédiag dispose d’un système de management de la qualité ISO 9001.',
      'L’audit interne ISO 27001 est une étape obligatoire avant tout audit de certification.',
    ],
    enjeux: [
      'Répondre à l’exigence d’audit interne de la norme.',
      'Vérifier l’articulation avec le système ISO 9001.',
      'Lever les écarts avant la certification.',
    ],
    methode: [
      'Audit interne selon les exigences de l’ISO 27001.',
      'Prise en compte des processus ISO 9001 existants.',
      'Rapport et plan d’actions correctives.',
    ],
    facteurs: [
      'Un auditeur expérimenté en audits de certification.',
      'Une lecture intégrée qualité et sécurité.',
      'Des constats exploitables immédiatement.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Audit de conformité', '/audit-conformite']],
  },
  {
    slug: 'groupe-adp-audit-interne-iso-27001',
    client: 'Groupe ADP',
    activite: 'Transport aérien',
    secteur: 'public',
    offres: ['audit', 'iso27001'],
    mission: 'audit interne ISO 27001',
    referentiels: ['ISO 27001'],
    chapeau: 'SecuriTrust a réalisé un audit interne ISO 27001 pour le Groupe ADP.',
    contexte: [
      'Gestionnaire d’aéroports, le Groupe ADP opère des infrastructures critiques.',
      'Dans le cadre de son SMSI, le groupe a confié à SecuriTrust la réalisation d’un audit interne ISO 27001.',
    ],
    enjeux: [
      'Disposer d’un regard indépendant sur le SMSI.',
      'Répondre à l’exigence d’audit interne de la norme.',
      'Préparer les échéances de certification.',
    ],
    methode: [
      'Audit des exigences de l’ISO 27001 sur le périmètre défini.',
      'Entretiens et revue des preuves.',
      'Rapport avec constats et recommandations.',
    ],
    facteurs: [
      'Une expérience des environnements critiques.',
      'Une méthode alignée sur les audits de certification.',
      'Un rapport clair et priorisé.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Audit de conformité', '/audit-conformite']],
  },
  {
    slug: 'brgm-audit-interne-iso-27001-formation-auditeurs',
    client: 'BRGM',
    activite: 'Établissement public de recherche (Bureau de Recherches Géologiques et Minières)',
    secteur: 'public',
    offres: ['audit', 'iso27001'],
    mission: 'audit interne ISO 27001 et formation d’auditeurs internes',
    referentiels: ['ISO 27001'],
    chapeau:
      'SecuriTrust a réalisé l’audit interne ISO 27001 du BRGM et formé ses auditeurs internes.',
    contexte: [
      'Établissement public de référence dans les sciences de la Terre, le BRGM s’est engagé dans une démarche ISO 27001.',
      'Au-delà de l’audit, il souhaitait rendre ses équipes autonomes sur les audits internes.',
    ],
    enjeux: [
      'Réaliser l’audit interne exigé par la norme.',
      'Former des auditeurs internes.',
      'Pérenniser la démarche.',
    ],
    methode: [
      'Audit interne ISO 27001.',
      'Formation d’auditeurs internes : méthode, techniques d’entretien, rédaction des constats.',
      'Transmission des outils d’audit.',
    ],
    facteurs: [
      'Un transfert de compétences, pas seulement un rapport.',
      'Des formateurs qui pratiquent l’audit au quotidien.',
      'Une démarche adaptée au secteur public.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Formation SMSI ISO 27001', '/formations/construire-smsi-iso-27001'], ['Secteur public', '/secteurs/public']],
  },
  {
    slug: 'proges-plus-accompagnement-iso-27001',
    client: 'Proges Plus',
    activite: 'Hébergeur et organisme de formation',
    secteur: 'tech',
    offres: ['iso27001'],
    mission: 'accompagnement à la conformité ISO 27001',
    referentiels: ['ISO 27001'],
    chapeau: 'SecuriTrust a accompagné Proges Plus, hébergeur et organisme de formation, vers la conformité ISO 27001.',
    contexte: [
      'Pour un hébergeur, la sécurité de l’information est au cœur de la relation de confiance avec les clients.',
      'Proges Plus a fait appel à SecuriTrust pour structurer sa démarche ISO 27001.',
    ],
    enjeux: [
      'Construire un SMSI conforme à la norme.',
      'Rassurer clients et partenaires.',
      'Préparer la certification.',
    ],
    methode: [
      'Cadrage du périmètre et analyse de risques.',
      'Rédaction des politiques et procédures, déclaration d’applicabilité.',
      'Préparation à l’audit de certification.',
    ],
    facteurs: [
      'Une démarche dimensionnée pour une PME.',
      'Des livrables réutilisables par les équipes.',
      'Une préparation proche des conditions réelles d’audit.',
    ],
    liens: [['Certification ISO 27001', '/iso27001'], ['Pilotage SMSI', '/pilotage-smsi']],
  },
  {
    slug: 'afluens-gouvernance-cyber-rgpd-rssi-externalise',
    client: 'Afluens',
    activite: 'Production marketing',
    secteur: 'services',
    offres: ['rssi', 'rgpd', 'risques', 'iso27001'],
    mission: 'gouvernance cyber, conformité RGPD et RSSI externalisé',
    referentiels: ['EBIOS RM', 'ISO 27001', 'RGPD'],
    chapeau:
      'SecuriTrust accompagne Afluens dans la durée : gouvernance de la cybersécurité, conformité RGPD et fonction de RSSI externalisé.',
    contexte: [
      'Acteur de la production marketing, Afluens traite des données pour le compte de ses clients et doit leur apporter des garanties de sécurité et de conformité.',
      'Le groupe a confié à SecuriTrust la construction de sa gouvernance cyber et la fonction de RSSI externalisé.',
    ],
    enjeux: [
      'Mettre en place une gouvernance de la sécurité.',
      'Garantir la conformité RGPD.',
      'Disposer d’un RSSI sans recruter à temps plein.',
    ],
    methode: [
      'Comités de sécurité et pilotage de la gouvernance.',
      'Analyses de risques selon la méthode EBIOS RM.',
      'Organisation de la gestion des incidents.',
      'Mise en conformité RGPD et fonction de RSSI externalisé, en s’appuyant sur l’ISO 27001.',
    ],
    facteurs: [
      'Une relation de confiance installée dans la durée.',
      'Un interlocuteur unique pour la sécurité et le RGPD.',
      'Une gouvernance qui vit grâce à des comités réguliers.',
    ],
    liens: [['RSSI externalisé', '/rssi-externalise'], ['Mise en conformité RGPD', '/rgpd'], ['Analyse de risques EBIOS RM', '/ebios-rm']],
  },
  {
    slug: 'polyconseil-rssi-externalise-rgpd-iso-27001',
    client: 'Polyconseil',
    activite: 'Cabinet de conseil dans le numérique',
    secteur: 'tech',
    offres: ['rssi', 'rgpd', 'iso27001'],
    mission: 'RSSI externalisé, conformité RGPD et ISO 27001',
    referentiels: ['ISO 27001', 'RGPD'],
    chapeau:
      'SecuriTrust a assuré la fonction de RSSI de Polyconseil et conduit sa mise en conformité RGPD et ISO 27001.',
    contexte: [
      'Cabinet de conseil dans le numérique, Polyconseil intervient chez des clients exigeants en matière de sécurité.',
      'Il s’est appuyé sur SecuriTrust pour piloter sa sécurité et ses conformités.',
    ],
    enjeux: [
      'Répondre aux exigences de sécurité de ses clients.',
      'Atteindre la conformité ISO 27001 et RGPD.',
      'Disposer d’un RSSI expérimenté.',
    ],
    methode: [
      'RSSI externalisé : gouvernance, politiques, pilotage des risques.',
      'Mise en conformité ISO 27001.',
      'Mise en conformité RGPD.',
    ],
    facteurs: [
      'Une même équipe pour la sécurité et la protection des données.',
      'Un accompagnement inscrit dans la durée.',
      'Une compréhension des enjeux d’un cabinet de conseil.',
    ],
    liens: [['RSSI externalisé', '/rssi-externalise'], ['Certification ISO 27001', '/iso27001'], ['Mise en conformité RGPD', '/rgpd']],
  },
  {
    slug: 'mediarithmics-analyse-risques-ebios-rm',
    client: 'Mediarithmics',
    activite: 'Data marketing',
    secteur: 'tech',
    offres: ['risques'],
    mission: 'analyse de risques cyber EBIOS RM',
    referentiels: ['EBIOS RM'],
    chapeau: 'SecuriTrust a conduit l’analyse de risques cyber de Mediarithmics selon la méthode EBIOS RM de l’ANSSI.',
    contexte: [
      'Éditeur d’une plateforme de data marketing, Mediarithmics traite de grands volumes de données pour ses clients.',
      'L’entreprise souhaitait identifier ses scénarios de risque les plus critiques et prioriser ses mesures de sécurité.',
    ],
    enjeux: [
      'Identifier les scénarios de menace réalistes.',
      'Prioriser les investissements de sécurité.',
      'S’appuyer sur une méthode reconnue par l’ANSSI.',
    ],
    methode: [
      'Ateliers EBIOS RM : socle de sécurité, sources de risque, scénarios stratégiques et opérationnels.',
      'Évaluation des risques et cartographie.',
      'Plan de traitement des risques.',
    ],
    facteurs: [
      'Des ateliers courts et structurés.',
      'Une méthode reconnue, opposable aux clients.',
      'Un plan de traitement directement exploitable.',
    ],
    liens: [['Analyse de risques EBIOS RM', '/ebios-rm'], ['Gestion des risques cyber', '/gestion-risques']],
  },
  {
    slug: 'les-parents-zen-conformite-rgpd-dpo-externalise',
    client: 'Les Parents Zen',
    activite: 'Petite enfance',
    secteur: 'services',
    offres: ['rgpd'],
    mission: 'mise en conformité RGPD et DPO externalisé',
    referentiels: ['RGPD'],
    chapeau:
      'SecuriTrust a mis Les Parents Zen en conformité avec le RGPD et assure la fonction de DPO externalisé.',
    contexte: [
      'Acteur de la petite enfance, Les Parents Zen traite des données de familles et d’enfants, qui appellent une protection renforcée.',
      'L’entreprise a confié à SecuriTrust sa mise en conformité puis sa fonction de DPO.',
    ],
    enjeux: [
      'Protéger des données sensibles de familles.',
      'Se mettre en conformité avec le RGPD.',
      'Tenir la conformité dans la durée.',
    ],
    methode: [
      'Registre des traitements et cartographie des données.',
      'Mise à jour des mentions, contrats et procédures.',
      'Fonction de DPO externalisé : conseil, demandes des personnes, veille.',
    ],
    facteurs: [
      'Un accompagnement de long terme.',
      'Des réponses adaptées à une structure à taille humaine.',
      'Un DPO disponible.',
    ],
    liens: [['DPO externalisé', '/dpo-externalise'], ['Mise en conformité RGPD', '/rgpd']],
  },
  {
    slug: 'mytower-dpo-externalise',
    client: 'MyTower',
    activite: 'Éditeur de logiciel SaaS',
    secteur: 'tech',
    offres: ['rgpd'],
    mission: 'DPO externalisé',
    referentiels: ['RGPD'],
    chapeau: 'SecuriTrust a assuré la fonction de délégué à la protection des données de MyTower, éditeur SaaS.',
    contexte: [
      'Éditeur SaaS, MyTower traite des données personnelles pour le compte de ses clients et doit le démontrer.',
      'L’entreprise a confié la fonction de DPO à SecuriTrust.',
    ],
    enjeux: [
      'Disposer d’un DPO compétent sans recrutement.',
      'Répondre aux questionnaires RGPD des clients.',
      'Encadrer la sous-traitance de données.',
    ],
    methode: [
      'Fonction de DPO : conseil, registre, analyses d’impact si nécessaire.',
      'Appui aux réponses aux clients et aux contrats de sous-traitance (DPA).',
      'Veille réglementaire.',
    ],
    facteurs: [
      'Une expertise des contraintes d’un éditeur SaaS.',
      'Un DPO réactif.',
      'Des livrables réutilisables dans les échanges commerciaux.',
    ],
    liens: [['DPO externalisé', '/dpo-externalise'], ['DPA & sous-traitance RGPD', '/dpa-rgpd']],
  },
];

export const casBySlug = (slug: string) => CAS_CLIENTS.find((c) => c.slug === slug);

/** Six autres cas : même offre d'abord, puis même secteur, puis le reste. */
export function autresCas(cas: CasClient, n = 6): CasClient[] {
  const score = (c: CasClient) =>
    (c.offres.some((o) => cas.offres.includes(o)) ? 2 : 0) + (c.secteur === cas.secteur ? 1 : 0);
  return CAS_CLIENTS.filter((c) => c.slug !== cas.slug)
    .map((c, i) => ({ c, s: score(c), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((x) => x.c);
}
