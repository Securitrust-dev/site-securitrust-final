import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LinkItem {
  title: string;
  href: string;
  desc: string;
}

const LINKS_MAP: Record<string, LinkItem[]> = {
  // ─── PENTEST ────────────────────────────────────────────────
  pentest: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion externe, interne, web et mobile menés par des experts certifiés OSCP.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT complète pour tester votre capacité de détection en conditions réelles.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez le pentest par un audit organisationnel pour une vision 360° de votre posture.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'NIS2 impose des tests réguliers — validez votre conformité avec un pentest certifié.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotez vos pentests récurrents avec un RSSI externalisé expert.' },
    { title: 'Pentest Paris', href: '/pentest-paris', desc: 'Tests d\'intrusion à Paris par des experts certifiés OSCP & CEH. Devis sous 24h.' },
  ],
  'pentest-externe': [
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Simulation d\'un attaquant déjà dans votre réseau : mouvement latéral, Active Directory.' },
    { title: 'Pentest Web & Mobile', href: '/pentest-web', desc: 'Audit OWASP de vos applications web, API REST et mobiles iOS/Android.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT complète sur plusieurs semaines pour tester votre détection réelle.' },
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion externe, interne, web et mobile menés par des experts certifiés OSCP.' },
  ],
  'pentest-interne': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Simulez une attaque depuis Internet sur votre périmètre réseau exposé.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT persistante pour tester votre réponse à incident en conditions réelles.' },
    { title: 'Audit Sécurité Technique', href: '/audit-securite-technique', desc: 'Analyse approfondie de votre infrastructure IT : configurations, vulnérabilités, hardening.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotez vos pentests internes récurrents avec un expert dédié.' },
  ],
  'pentest-web-mobile': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Étendez les tests à l\'ensemble de votre périmètre réseau exposé sur Internet.' },
    { title: 'Audit de Code Source', href: '/audit-code-source', desc: 'Revue SAST manuelle et automatisée pour sécuriser votre code à la source.' },
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion externe, interne, web et mobile menés par des experts certifiés OSCP.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Vue 360° de votre posture sécurité au-delà des seules applications.' },
  ],
  'pentest-physique': [
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT combinant intrusion physique, numérique et social engineering.' },
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Couverture complète : testez aussi votre périmètre réseau depuis Internet.' },
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formez vos collaborateurs pour réduire le risque humain.' },
  ],
  'red-team': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Tests ciblés sur votre périmètre Internet — complémentaires à une opération Red Team.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Évaluez la sécurité de votre réseau interne avant une simulation APT complète.' },
    { title: 'Pentest Physique', href: '/pentest-physique', desc: 'Ajoutez une composante d\'intrusion physique à votre scénario Red Team.' },
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion externe, interne, web et mobile menés par des experts certifiés OSCP.' },
  ],
  'pentest-paris': [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion externe, interne, web et mobile menés par des experts certifiés OSCP.' },
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Test d\'intrusion depuis Internet sur vos actifs exposés.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Simulation d\'un attaquant interne sur votre réseau local et Active Directory.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez les tests d\'intrusion par un audit organisationnel complet.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT avancée pour les entreprises souhaitant tester leur résilience maximale.' },
    { title: 'Pentest physique', href: '/pentest-physique', desc: 'Tester l\'accès physique à vos locaux et à vos équipements.' },
  ],

  // ─── AUDIT ──────────────────────────────────────────────────
  audit: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion externe, interne, web et mobile menés par des experts certifiés OSCP.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'L\'audit identifie vos écarts NIS2 — on vous accompagne pour les combler.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Confiez le pilotage de vos audits récurrents à un RSSI externalisé expert.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez vos audits dans un pilotage global de la gouvernance et conformité.' },
  ],
  'audit-flash': [
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Approfondissez le diagnostic flash avec un audit complet technique et organisationnel.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Complétez le diagnostic avec un scoring de maturité cybersécurité formalisé.' },
    { title: 'Audit Organisationnel', href: '/audit-organisationnel', desc: 'Évaluez aussi les aspects humains et processuels de votre cybersécurité.' },
    { title: 'Contact', href: '/contact', desc: 'Demandez votre audit flash — diagnostic en 48h, devis sous 24h.' },
  ],
  'audit-cybersecurite': [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion offensifs pour valider la résistance de votre SI aux attaques réelles.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — le pilier stratégique après l\'audit.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un expert pour piloter la mise en œuvre des recommandations de l\'audit.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'L\'audit identifie vos écarts NIS2 — on vous accompagne pour les combler.' },
  ],
  'audit-securite-technique': [
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Testez en conditions réelles les vulnérabilités détectées lors de l\'audit technique.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Élargissez l\'audit technique aux dimensions organisationnelles pour une vue 360°.' },
    { title: 'Audit organisationnel', href: '/audit-organisationnel', desc: 'Gouvernance, processus et organisation de la sécurité : le pendant organisationnel de l\'audit technique.' },
    { title: 'Audit de code source', href: '/audit-code-source', desc: 'Détecter les vulnérabilités applicatives directement dans le code.' },
  ],
  'audit-code-source': [
    { title: 'Pentest Web & Mobile', href: '/pentest-web', desc: 'Complétez l\'analyse statique de code par des tests d\'intrusion sur vos applications.' },
    { title: 'Audit Sécurité Technique', href: '/audit-securite-technique', desc: 'Étendez l\'audit à toute l\'infrastructure hébergeant vos applications.' },
    { title: 'Secteur tech & SaaS', href: '/secteurs/tech', desc: 'Sécuriser le développement et l\'infrastructure sans freiner les équipes.' },
  ],
  'audit-organisationnel': [
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez l\'audit organisationnel par une évaluation technique complète.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Renforcez la gouvernance identifiée lors de l\'audit avec notre service GRC.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour structurer l\'organisation sécurité après l\'audit.' },
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formez vos équipes sur les lacunes humaines identifiées lors de l\'audit.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Mesurez formellement votre niveau de maturité cybersécurité organisationnelle.' },
  ],

  // ─── CONFORMITÉ ─────────────────────────────────────────────
  conformite: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion pour valider techniquement votre niveau de sécurité réel.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez gouvernance, risques et conformité dans un cadre intégré.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un expert pour piloter votre conformité dans la durée.' },
  ],
  'conformite-nis2': [
    { title: 'Conformité DORA', href: '/dora', desc: 'Le règlement DORA concerne les entités financières — souvent cumulable avec NIS2.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez votre conformité NIS2 dans un cadre de gouvernance global.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre mise en conformité NIS2 dans la durée.' },
    { title: 'Pentest', href: '/pentest', desc: 'NIS2 impose des tests de sécurité réguliers — respectez l\'exigence avec nos experts.' },
  ],
  'conformite-dora': [
    { title: 'Conformité NIS2', href: '/nis2', desc: 'La directive NIS2 s\'applique souvent en parallèle de DORA pour les entités financières.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — un cadre unifié pour DORA.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotage de la conformité DORA dans la durée avec un RSSI expert.' },
    { title: 'Pentest', href: '/pentest', desc: 'DORA exige des tests de résilience — respectez l\'obligation avec des pentests certifiés.' },
  ],
  'mise-en-conformite-rgpd': [
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Désignez un DPO externalisé pour piloter votre conformité RGPD en continu.' },
    { title: 'DPA & RGPD', href: '/dpa-rgpd', desc: 'Sécurisez vos accords de sous-traitance avec vos prestataires (article 28 RGPD).' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'NIS2 renforce les exigences de sécurité autour des données personnelles — à combiner.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le RGPD dans un pilotage global de la conformité et des risques.' },
  ],
  dora: [
    { title: 'Conformité DORA', href: '/dora', desc: 'Accompagnement opérationnel complet pour votre mise en conformité DORA.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'Directives complémentaires pour les entités financières concernées par les deux textes.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez vos obligations DORA dans un cadre GRC structuré.' },
    { title: 'Pentest', href: '/pentest', desc: 'DORA exige des tests de pénétration TLPT — réalisez-les avec des experts certifiés.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI pour superviser l\'ensemble de vos obligations DORA.' },
  ],
  'iso27001-hds': [
    { title: 'HDS Certification', href: '/hds', desc: 'La certification HDS est souvent complémentaire à ISO 27001 pour les acteurs de santé.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez ISO 27001 dans un système de management global de la sécurité.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre projet de certification ISO 27001.' },
    { title: 'Pentest', href: '/pentest', desc: 'ISO 27001 exige des tests techniques réguliers — respectez l\'Annexe A avec nos experts.' },
  ],
  'hds-certification': [
    { title: 'ISO 27001 & HDS', href: '/iso27001', desc: 'HDS s\'appuie sur ISO 27001 — combinez les deux certifications pour maximiser la valeur.' },
    { title: 'Mise en Conformité RGPD', href: '/rgpd', desc: 'Les données de santé nécessitent aussi une conformité RGPD renforcée.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Un DPO externalisé pour gérer les obligations liées aux données de santé.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez la certification HDS dans un cadre de gouvernance global.' },
  ],
  'tisax-security': [
    { title: 'ISO 27001 & HDS', href: '/iso27001', desc: 'TISAX s\'appuie sur ISO 27001 — obtenez les deux certifications en parallèle.' },
    { title: 'Pentest', href: '/pentest', desc: 'TISAX exige des tests de sécurité techniques — validez vos contrôles.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gérez votre certification TISAX dans un cadre GRC structuré.' },
  ],
  pcapra: [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez PCAPR A dans un pilotage global de la gouvernance et des risques.' },
    { title: 'Secteur public', href: '/secteurs/public', desc: 'Cybersécurité et continuité du service public.' },
  ],
  'ia-act': [
    { title: 'Gouvernance & Conformité', href: '/gouvernance-conformite', desc: 'Retrouvez l\'ensemble de nos prestations de gouvernance et de mise en conformité.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001', desc: 'ISO 42001 (management de l\'IA) s\'articule naturellement avec un SMSI ISO 27001 existant.' },
    { title: 'Mise en Conformité RGPD', href: '/rgpd', desc: 'Un système d\'IA traitant des données personnelles reste soumis au RGPD en parallèle de l\'IA Act.' },
    { title: 'EBIOS RM', href: '/ebios-rm', desc: 'Analysez les risques spécifiques de vos systèmes d\'IA avec la méthode EBIOS RM.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez la conformité IA Act dans un pilotage global de la gouvernance et des risques.' },
    { title: 'DPA & sous-traitance RGPD', href: '/dpa-rgpd', desc: 'Encadrer contractuellement les traitements confiés à vos prestataires.' },
  ],
  'ebios-rm': [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez votre analyse de risques dans un pilotage global de la gouvernance.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'NIS2 exige une gestion des risques formalisée — EBIOS RM y répond directement.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001', desc: 'EBIOS RM couvre l\'exigence d\'analyse de risques de l\'Annexe A d\'ISO 27001.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter la gestion des risques dans la durée.' },
    { title: 'IA Act', href: '/ia-act', desc: 'Se conformer au règlement européen sur l\'intelligence artificielle.' },
  ],
  'gap-analysis': [
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Complétez l\'audit d\'écart par une évaluation formelle de votre maturité sécurité.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001', desc: 'La Gap Analysis est la première étape avant un projet de certification ISO 27001.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le plan d\'action de votre Gap Analysis dans un pilotage GRC global.' },
    { title: 'Audit organisationnel', href: '/audit-organisationnel', desc: 'Gouvernance, processus et organisation de la sécurité : le pendant organisationnel de l\'audit technique.' },
  ],
  'pilotage-smsi': [
    { title: 'Formation SMSI ISO 27001', href: '/formations/construire-smsi-iso-27001', desc: 'Formez vos équipes à la construction et au pilotage d\'un SMSI : 3 jours en présentiel.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Le pilotage SMSI est l\'un des piliers de notre offre de RSSI à temps partagé.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001', desc: 'Préparez votre certification ISO 27001 grâce à un SMSI activement piloté.' },
    { title: 'EBIOS RM', href: '/ebios-rm', desc: 'La gestion des risques de votre SMSI s\'appuie sur la méthode EBIOS RM.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le pilotage SMSI dans une gouvernance cybersécurité globale.' },
  ],
  'dpa-rgpd': [
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Le suivi de vos DPA s\'inscrit naturellement dans une mission de DPO externalisé.' },
    { title: 'Mise en Conformité RGPD', href: '/rgpd', desc: 'Élargissez la sécurisation de vos DPA à un accompagnement RGPD complet.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez la gouvernance des données dans un pilotage GRC global.' },
    { title: 'IA Act', href: '/ia-act', desc: 'Se conformer au règlement européen sur l\'intelligence artificielle.' },
    { title: 'Secteur santé', href: '/secteurs/sante', desc: 'Données de santé, HDS et RGPD : protéger les patients.' },
  ],

  // ─── GRC & SERVICES MANAGÉS ─────────────────────────────────
  'grc-cyber': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI expert pour piloter opérationnellement votre GRC au quotidien.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Complétez votre GRC avec un DPO pour le volet protection des données.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Mesurez votre niveau de maturité cybersécurité actuel avant de structurer la GRC.' },
  ],
  'rssi-externalise': [
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Complétez le RSSI par un DPO externalisé pour la gouvernance des données.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — le cadre dans lequel évolue votre RSSI externalisé.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Le premier chantier de votre RSSI externalisé : un audit complet de l\'existant.' },
  ],
  'dpo-externalise': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'RSSI et DPO travaillent ensemble — externalisez les deux pour une couverture complète.' },
    { title: 'DPA & RGPD', href: '/dpa-rgpd', desc: 'Sécurisez vos accords de sous-traitance dans le cadre de votre mission DPO.' },
    { title: 'Mise en Conformité RGPD', href: '/rgpd', desc: 'Votre DPO pilote et met en œuvre votre conformité RGPD.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le rôle DPO dans votre gouvernance cybersécurité globale.' },
  ],
  'evaluation-maturite': [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Structurez votre gouvernance sur la base de votre score de maturité.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez l\'évaluation de maturité par un audit technique approfondi.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter l\'amélioration de votre maturité.' },
    { title: 'Audit organisationnel', href: '/audit-organisationnel', desc: 'Gouvernance, processus et organisation de la sécurité : le pendant organisationnel de l\'audit technique.' },
  ],
  'sensibilisation-formation': [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'La formation est un pilier de votre gouvernance cybersécurité.' },
    { title: 'Formations', href: '/formations', desc: 'Catalogue complet de formations certifiantes en cybersécurité pour vos équipes.' },
    { title: 'Pentest Physique', href: '/pentest-physique', desc: 'Testez l\'efficacité de vos formations avec un exercice de phishing ou d\'intrusion physique.' },
  ],

  // ─── AUTRES SERVICES ────────────────────────────────────────
  'cybersecurite-operationnelle': [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion pour valider votre sécurité opérationnelle en conditions réelles.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Audit complet de votre posture opérationnelle technique et organisationnelle.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre cybersécurité opérationnelle.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance et conformité pour structurer votre sécurité opérationnelle.' },
    { title: 'PCA / PRA', href: '/pcapra', desc: 'Plans de continuité et de reprise d\'activité.' },
  ],
  'gouvernance-conformite': [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Service GRC complet pour piloter votre gouvernance et conformité au quotidien.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour incarner et piloter votre gouvernance cybersécurité.' },
    { title: 'Gap Analysis', href: '/gap-analysis', desc: 'Identifiez vos écarts face à un référentiel cible avec un plan d\'action priorisé.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'Mise en conformité avec la directive NIS2 pour les entités concernées.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'DPO externalisé pour le volet protection des données personnelles.' },
    { title: 'IA Act', href: '/ia-act', desc: 'Mise en conformité avec le règlement européen sur l\'intelligence artificielle.' },
  ],
  services: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion — validez la résistance de votre SI aux attaques réelles.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Évaluez objectivement votre posture de sécurité avec nos auditeurs certifiés.' },
    { title: 'Conformité', href: '/gouvernance-conformite', desc: 'NIS2, RGPD, DORA, ISO 27001 — accompagnement sur toutes les réglementations.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité dans un cadre de pilotage unifié.' },
    { title: 'Formations', href: '/formations', desc: 'Formations certifiantes en cybersécurité pour vos équipes.' },
    { title: 'Prendre rendez-vous', href: '/prise-de-rdv', desc: '30 minutes avec un expert pour cadrer votre projet, sans engagement.' },
  ],
  formations: [
    { title: 'Formation SMSI ISO 27001', href: '/formations/construire-smsi-iso-27001', desc: 'Construire un SMSI ISO 27001 : 3 jours en présentiel à Paris, du cadrage à la certification.' },
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formations de sensibilisation intra-entreprise pour tous vos collaborateurs.' },
    { title: 'Contact', href: '/contact', desc: 'Discutez avec nous de votre programme de formation sur mesure.' },
  ],
  articles: [
    { title: 'Pentest', href: '/pentest', desc: 'Testez vos systèmes avec nos experts — guides pratiques et tests d\'intrusion.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Évaluez votre posture de sécurité avec nos auditeurs certifiés AFNOR.' },
    { title: 'Conformité NIS2', href: '/nis2', desc: 'Tout sur la directive NIS2 — êtes-vous concerné ? Quelles obligations ?' },
    { title: 'Contact', href: '/contact', desc: 'Une question sur un article ? Contactez nos experts directement.' },
  ],
  contact: [
    { title: 'Services', href: '/services', desc: 'Découvrez l\'ensemble de nos services cybersécurité.' },
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion par des experts certifiés OSCP — devis sous 24h.' },
    { title: 'Audit Flash', href: '/audit-flash', desc: 'Diagnostic cybersécurité express en 48h.' },
    { title: 'Formations', href: '/formations', desc: 'Formations certifiantes pour vos équipes.' },
    { title: 'Prendre rendez-vous', href: 'https://calendly.com/expert-securitrust', desc: 'Choisissez directement un créneau avec nos experts.' },
    { title: 'Pentest à Paris', href: '/pentest-paris', desc: 'Tests d\'intrusion menés sur place par nos experts parisiens.' },
  ],
  portfolio: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion — découvrez nos cas clients en cybersécurité offensive.' },
    { title: 'Services', href: '/services', desc: 'L\'ensemble de nos offres cybersécurité pour entreprises.' },
    { title: 'Nous Rejoindre', href: '/nous-rejoindre', desc: 'Rejoignez l\'équipe SecuriTrust — postes ouverts en cybersécurité.' },
    { title: 'Contact', href: '/contact', desc: 'Discutez de votre projet avec nos experts.' },
    { title: 'Prendre rendez-vous', href: '/prise-de-rdv', desc: '30 minutes avec un expert pour cadrer votre projet, sans engagement.' },
  ],
  'nous-rejoindre': [
    { title: 'Services', href: '/services', desc: 'Découvrez les missions sur lesquelles vous travaillerez.' },
    { title: 'Cas clients', href: '/cas-clients', desc: 'Nos missions — ce que vous pourrez accomplir chez SecuriTrust.' },
    { title: 'Formations', href: '/formations', desc: 'Certifications et formations que nous valorisons chez nos experts.' },
    { title: 'Contact', href: '/contact', desc: 'Postulez ou posez vos questions à notre équipe RH.' },
  ],
  'pentest-paris-geo': [
    { title: 'Pentest', href: '/pentest', desc: 'Vue d\'ensemble de nos services de tests d\'intrusion.' },
    { title: 'Contact', href: '/contact', desc: 'Obtenez votre devis sous 24h depuis Paris.' },
  ],
};

interface InternalLinksProps {
  pageKey: string;
  title?: string;
  /** Maximum number of links to show (default: 3 on mobile, up to 6) */
  maxLinks?: number;
}

export function InternalLinks({ pageKey, title = 'À explorer également', maxLinks = 6 }: InternalLinksProps) {
  const links = LINKS_MAP[pageKey];
  if (!links || links.length === 0) return null;

  const displayed = links.slice(0, maxLinks);

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-light text-white mb-6 border-b border-white/10 pb-3">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group glass-panel rounded-xl p-5 border border-white/5 hover:border-cyan-500/30 transition-all"
            >
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors text-sm">
                {link.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{link.desc}</p>
              <span className="text-cyan-400 text-xs font-mono flex items-center gap-1">
                En savoir plus <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
