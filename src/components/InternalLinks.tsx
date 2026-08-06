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
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Première offre de pentest au résultat en France — remboursé si aucune faille détectée.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT complète pour tester votre capacité de détection en conditions réelles.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez le pentest par un audit organisationnel pour une vision 360° de votre posture.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'NIS2 impose des tests réguliers — validez votre conformité avec un pentest certifié.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotez vos pentests récurrents avec un RSSI externalisé expert.' },
    { title: 'Pentest Paris', href: '/pentest-paris', desc: 'Tests d\'intrusion à Paris par des experts certifiés OSCP & CEH. Devis sous 24h.' },
  ],
  'pentest-externe': [
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Simulation d\'un attaquant déjà dans votre réseau : mouvement latéral, Active Directory.' },
    { title: 'Pentest Web & Mobile', href: '/pentest-web-mobile', desc: 'Audit OWASP de vos applications web, API REST et mobiles iOS/Android.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT complète sur plusieurs semaines pour tester votre détection réelle.' },
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Offre unique en France : remboursé si aucune vulnérabilité trouvée.' },
    { title: 'OSINT', href: '/osint', desc: 'Vérifiez ce que les attaquants peuvent trouver sur votre organisation en open source.' },
  ],
  'pentest-interne': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Simulez une attaque depuis Internet sur votre périmètre réseau exposé.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT persistante pour tester votre réponse à incident en conditions réelles.' },
    { title: 'Audit Sécurité Technique', href: '/audit-securite-technique', desc: 'Analyse approfondie de votre infrastructure IT : configurations, vulnérabilités, hardening.' },
    { title: 'Gestion des Risques', href: '/gestion-risques', desc: 'Traduisez les vulnérabilités détectées en risques métier quantifiés.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotez vos pentests internes récurrents avec un expert dédié.' },
  ],
  'pentest-web-mobile': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Étendez les tests à l\'ensemble de votre périmètre réseau exposé sur Internet.' },
    { title: 'Audit de Code Source', href: '/audit-code-source', desc: 'Revue SAST manuelle et automatisée pour sécuriser votre code à la source.' },
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Offre unique : remboursé si aucune vulnérabilité n\'est détectée dans vos applications.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Vue 360° de votre posture sécurité au-delà des seules applications.' },
  ],
  'pentest-physique': [
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT combinant intrusion physique, numérique et social engineering.' },
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Couverture complète : testez aussi votre périmètre réseau depuis Internet.' },
    { title: 'Cyber Vigilance Humaine', href: '/cyber-vigilance-humaine', desc: 'Renforcez la résistance de vos équipes aux manipulations et au social engineering.' },
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formez vos collaborateurs pour réduire le risque humain.' },
  ],
  'red-team': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Tests ciblés sur votre périmètre Internet — complémentaires à une opération Red Team.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Évaluez la sécurité de votre réseau interne avant une simulation APT complète.' },
    { title: 'Pentest Physique', href: '/pentest-physique', desc: 'Ajoutez une composante d\'intrusion physique à votre scénario Red Team.' },
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Offre garantie pour tester vos défenses sans risque financier.' },
    { title: 'Protection Ransomware', href: '/protection-ransomware', desc: 'Protégez-vous contre le scénario d\'attaque le plus fréquent après une intrusion.' },
  ],
  'pentest-paris': [
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Offre unique en France : remboursé si aucune vulnérabilité n\'est trouvée.' },
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Test d\'intrusion depuis Internet sur vos actifs exposés.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Simulation d\'un attaquant interne sur votre réseau local et Active Directory.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez les tests d\'intrusion par un audit organisationnel complet.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT avancée pour les entreprises souhaitant tester leur résilience maximale.' },
  ],
  'pentest-au-resultat': [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Tests d\'intrusion sur votre périmètre Internet — inclus dans l\'offre au résultat.' },
    { title: 'Pentest Web & Mobile', href: '/pentest-web-mobile', desc: 'Audit OWASP de vos applications dans le cadre de l\'offre garantie.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Test de votre réseau interne avec la même garantie de résultat.' },
    { title: 'Red Team', href: '/red-team', desc: 'Allez plus loin avec une simulation APT complète après avoir sécurisé les bases.' },
    { title: 'Contact', href: '/contact', desc: 'Obtenez votre devis personnalisé sous 24h.' },
  ],

  // ─── AUDIT ──────────────────────────────────────────────────
  audit: [
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Validez vos corrections par un test d\'intrusion réel avec garantie de résultat.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'L\'audit identifie vos écarts NIS2 — on vous accompagne pour les combler.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Confiez le pilotage de vos audits récurrents à un RSSI externalisé expert.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez vos audits dans un pilotage global de la gouvernance et conformité.' },
  ],
  'audit-flash': [
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Approfondissez le diagnostic flash avec un audit complet technique et organisationnel.' },
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Testez en conditions réelles les vulnérabilités identifiées lors de l\'audit flash.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Complétez le diagnostic avec un scoring de maturité cybersécurité formalisé.' },
    { title: 'Audit Organisationnel', href: '/audit-organisationnel', desc: 'Évaluez aussi les aspects humains et processuels de votre cybersécurité.' },
    { title: 'Contact', href: '/contact', desc: 'Demandez votre audit flash — diagnostic en 48h, devis sous 24h.' },
  ],
  'audit-cybersecurite': [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion offensifs pour valider la résistance de votre SI aux attaques réelles.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — le pilier stratégique après l\'audit.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un expert pour piloter la mise en œuvre des recommandations de l\'audit.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'L\'audit identifie vos écarts NIS2 — on vous accompagne pour les combler.' },
  ],
  'audit-securite-technique': [
    { title: 'Audit Architecture SI', href: '/audit-architecture', desc: 'Évaluez aussi la conception de votre SI : réseau, cloud, applicatif.' },
    { title: 'Audit Configuration', href: '/audit-configuration', desc: 'Analysez vos configurations selon les CIS Benchmarks et bonnes pratiques.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Testez en conditions réelles les vulnérabilités détectées lors de l\'audit technique.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Élargissez l\'audit technique aux dimensions organisationnelles pour une vue 360°.' },
  ],
  'audit-architecture': [
    { title: 'Audit Sécurité Technique', href: '/audit-securite-technique', desc: 'Analyse opérationnelle de votre infrastructure en complément de l\'audit d\'architecture.' },
    { title: 'Audit Configuration', href: '/audit-configuration', desc: 'Vérifiez le hardening de vos équipements selon les CIS Benchmarks.' },
    { title: 'Stratégie Cybersécurité', href: '/strategie-cybersecurite', desc: 'Définissez une feuille de route pour corriger les failles architecturales identifiées.' },
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Validez que votre architecture réseau résiste à une attaque depuis Internet.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter la refonte architecturale recommandée.' },
  ],
  'audit-configuration': [
    { title: 'Audit Sécurité Technique', href: '/audit-securite-technique', desc: 'Complétez l\'audit de configuration par une analyse complète de l\'infrastructure.' },
    { title: 'Audit Architecture SI', href: '/audit-architecture', desc: 'Évaluez la conception globale de votre SI en plus de la configuration des équipements.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'Le hardening est un prérequis clé pour les certifications ISO 27001 et HDS.' },
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Testez si les mauvaises configurations peuvent être exploitées depuis le réseau interne.' },
  ],
  'audit-code-source': [
    { title: 'Pentest Web & Mobile', href: '/pentest-web-mobile', desc: 'Complétez l\'analyse statique de code par des tests d\'intrusion sur vos applications.' },
    { title: 'Audit Sécurité Technique', href: '/audit-securite-technique', desc: 'Étendez l\'audit à toute l\'infrastructure hébergeant vos applications.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Vérifiez que votre code est conforme aux exigences RGPD et NIS2.' },
    { title: 'Stratégie Cybersécurité', href: '/strategie-cybersecurite', desc: 'Intégrez la sécurité du code dans une démarche DevSecOps globale.' },
  ],
  'audit-organisationnel': [
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez l\'audit organisationnel par une évaluation technique complète.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Renforcez la gouvernance identifiée lors de l\'audit avec notre service GRC.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour structurer l\'organisation sécurité après l\'audit.' },
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formez vos équipes sur les lacunes humaines identifiées lors de l\'audit.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Mesurez formellement votre niveau de maturité cybersécurité organisationnelle.' },
  ],
  'audit-conformite': [
    { title: 'Gap Analysis', href: '/gap-analysis', desc: 'Notre méthodologie dédiée d\'audit d\'écart face à un référentiel cible précis.' },
    { title: 'Mise en Conformité RGPD', href: '/mise-en-conformite-rgpd', desc: 'Accompagnement complet pour combler les écarts RGPD identifiés lors de l\'audit.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'Plan d\'action pour atteindre la conformité NIS2 après l\'audit d\'écarts.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'Préparez votre certification ISO 27001 suite aux résultats de l\'audit de conformité.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Confiez le suivi de conformité RGPD à un DPO externalisé expert.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — pilotez l\'ensemble dans un cadre unifié.' },
  ],

  // ─── CONFORMITÉ ─────────────────────────────────────────────
  conformite: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion pour valider techniquement votre niveau de sécurité réel.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez gouvernance, risques et conformité dans un cadre intégré.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un expert pour piloter votre conformité dans la durée.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Identifiez précisément vos écarts réglementaires avec un audit dédié.' },
  ],
  'conformite-nis2': [
    { title: 'Conformité DORA', href: '/conformite-dora', desc: 'Le règlement DORA concerne les entités financières — souvent cumulable avec NIS2.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez votre conformité NIS2 dans un cadre de gouvernance global.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Évaluez précisément vos écarts NIS2 avec un audit certifié AFNOR.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre mise en conformité NIS2 dans la durée.' },
    { title: 'Pentest', href: '/pentest', desc: 'NIS2 impose des tests de sécurité réguliers — respectez l\'exigence avec nos experts.' },
  ],
  'conformite-dora': [
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'La directive NIS2 s\'applique souvent en parallèle de DORA pour les entités financières.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — un cadre unifié pour DORA.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Audit d\'écarts DORA par des experts certifiés pour identifier vos obligations.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Pilotage de la conformité DORA dans la durée avec un RSSI expert.' },
    { title: 'Pentest', href: '/pentest', desc: 'DORA exige des tests de résilience — respectez l\'obligation avec des pentests certifiés.' },
  ],
  'mise-en-conformite-rgpd': [
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Désignez un DPO externalisé pour piloter votre conformité RGPD en continu.' },
    { title: 'DPA & RGPD', href: '/dpa-rgpd', desc: 'Sécurisez vos accords de sous-traitance avec vos prestataires (article 28 RGPD).' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Mesurez vos écarts RGPD actuels avec un audit certifié.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'NIS2 renforce les exigences de sécurité autour des données personnelles — à combiner.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le RGPD dans un pilotage global de la conformité et des risques.' },
  ],
  dora: [
    { title: 'Conformité DORA', href: '/conformite-dora', desc: 'Accompagnement opérationnel complet pour votre mise en conformité DORA.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'Directives complémentaires pour les entités financières concernées par les deux textes.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez vos obligations DORA dans un cadre GRC structuré.' },
    { title: 'Pentest', href: '/pentest', desc: 'DORA exige des tests de pénétration TLPT — réalisez-les avec des experts certifiés.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI pour superviser l\'ensemble de vos obligations DORA.' },
  ],
  'iso27001-hds': [
    { title: 'HDS Certification', href: '/hds-certification', desc: 'La certification HDS est souvent complémentaire à ISO 27001 pour les acteurs de santé.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Évaluez vos écarts ISO 27001 avec un auditeur AFNOR certifié.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez ISO 27001 dans un système de management global de la sécurité.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre projet de certification ISO 27001.' },
    { title: 'Pentest', href: '/pentest', desc: 'ISO 27001 exige des tests techniques réguliers — respectez l\'Annexe A avec nos experts.' },
  ],
  'hds-certification': [
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'HDS s\'appuie sur ISO 27001 — combinez les deux certifications pour maximiser la valeur.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Audit d\'écarts HDS par nos experts certifiés auditeur AFNOR.' },
    { title: 'Mise en Conformité RGPD', href: '/mise-en-conformite-rgpd', desc: 'Les données de santé nécessitent aussi une conformité RGPD renforcée.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Un DPO externalisé pour gérer les obligations liées aux données de santé.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Pilotez la certification HDS dans un cadre de gouvernance global.' },
  ],
  'tisax-security': [
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'TISAX s\'appuie sur ISO 27001 — obtenez les deux certifications en parallèle.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Évaluez vos écarts TISAX avant l\'évaluation officielle.' },
    { title: 'Pentest', href: '/pentest', desc: 'TISAX exige des tests de sécurité techniques — validez vos contrôles.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gérez votre certification TISAX dans un cadre GRC structuré.' },
  ],
  pcapra: [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez PCAPR A dans un pilotage global de la gouvernance et des risques.' },
    { title: 'Gestion des Risques', href: '/gestion-risques', desc: 'Méthode structurée de qualification et traitement des risques cyber.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Complétez l\'analyse PCAPR A par un audit de conformité réglementaire.' },
    { title: 'Stratégie Cybersécurité', href: '/strategie-cybersecurite', desc: 'Construisez votre feuille de route cyber sur la base des analyses de risques PCAPR A.' },
  ],
  'ia-act': [
    { title: 'Gouvernance & Conformité', href: '/gouvernance-conformite', desc: 'Retrouvez l\'ensemble de nos prestations de gouvernance et de mise en conformité.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'ISO 42001 (management de l\'IA) s\'articule naturellement avec un SMSI ISO 27001 existant.' },
    { title: 'Mise en Conformité RGPD', href: '/mise-en-conformite-rgpd', desc: 'Un système d\'IA traitant des données personnelles reste soumis au RGPD en parallèle de l\'IA Act.' },
    { title: 'EBIOS RM', href: '/ebios-rm', desc: 'Analysez les risques spécifiques de vos systèmes d\'IA avec la méthode EBIOS RM.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez la conformité IA Act dans un pilotage global de la gouvernance et des risques.' },
  ],
  'ebios-rm': [
    { title: 'Gestion des Risques', href: '/gestion-risques', desc: 'EBIOS RM est la méthode structurante de notre service de gestion des risques cyber.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez votre analyse de risques dans un pilotage global de la gouvernance.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'NIS2 exige une gestion des risques formalisée — EBIOS RM y répond directement.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'EBIOS RM couvre l\'exigence d\'analyse de risques de l\'Annexe A d\'ISO 27001.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter la gestion des risques dans la durée.' },
  ],
  'gap-analysis': [
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Élargissez la Gap Analysis à un audit de conformité réglementaire complet.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Complétez l\'audit d\'écart par une évaluation formelle de votre maturité sécurité.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'La Gap Analysis est la première étape avant un projet de certification ISO 27001.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le plan d\'action de votre Gap Analysis dans un pilotage GRC global.' },
  ],
  'pilotage-smsi': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Le pilotage SMSI est l\'un des piliers de notre offre de RSSI à temps partagé.' },
    { title: 'ISO 27001 & HDS', href: '/iso27001-hds', desc: 'Préparez votre certification ISO 27001 grâce à un SMSI activement piloté.' },
    { title: 'EBIOS RM', href: '/ebios-rm', desc: 'La gestion des risques de votre SMSI s\'appuie sur la méthode EBIOS RM.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le pilotage SMSI dans une gouvernance cybersécurité globale.' },
  ],
  'dpa-rgpd': [
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Le suivi de vos DPA s\'inscrit naturellement dans une mission de DPO externalisé.' },
    { title: 'Mise en Conformité RGPD', href: '/mise-en-conformite-rgpd', desc: 'Élargissez la sécurisation de vos DPA à un accompagnement RGPD complet.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Vérifiez l\'ensemble de vos écarts de conformité RGPD au-delà des seuls DPA.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez la gouvernance des données dans un pilotage GRC global.' },
  ],

  // ─── GRC & SERVICES MANAGÉS ─────────────────────────────────
  'grc-cyber': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI expert pour piloter opérationnellement votre GRC au quotidien.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Complétez votre GRC avec un DPO pour le volet protection des données.' },
    { title: 'Gestion des Risques', href: '/gestion-risques', desc: 'Méthode structurée pour identifier, évaluer et traiter vos risques cyber.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Mesurez votre niveau de maturité cybersécurité actuel avant de structurer la GRC.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Évaluez vos écarts réglementaires en complément de la GRC.' },
  ],
  'rssi-externalise': [
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'Complétez le RSSI par un DPO externalisé pour la gouvernance des données.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — le cadre dans lequel évolue votre RSSI externalisé.' },
    { title: 'Stratégie Cybersécurité', href: '/strategie-cybersecurite', desc: 'Votre RSSI définit et pilote votre feuille de route cybersécurité.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Le premier chantier de votre RSSI externalisé : un audit complet de l\'existant.' },
    { title: 'Cyber Pilote', href: '/cyber-pilote', desc: 'Notre offre d\'abonnement cybersécurité tout-en-un pour PME.' },
  ],
  'dpo-externalise': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'RSSI et DPO travaillent ensemble — externalisez les deux pour une couverture complète.' },
    { title: 'DPA & RGPD', href: '/dpa-rgpd', desc: 'Sécurisez vos accords de sous-traitance dans le cadre de votre mission DPO.' },
    { title: 'Mise en Conformité RGPD', href: '/mise-en-conformite-rgpd', desc: 'Votre DPO pilote et met en œuvre votre conformité RGPD.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Intégrez le rôle DPO dans votre gouvernance cybersécurité globale.' },
    { title: 'Audit Conformité', href: '/audit-conformite', desc: 'Le DPO s\'appuie sur l\'audit de conformité pour prioriser ses actions.' },
  ],
  'strategie-cybersecurite': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour déployer et piloter votre stratégie cybersécurité.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Ancrez votre stratégie dans un cadre de gouvernance, risques et conformité.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Évaluez votre maturité actuelle pour fixer les bons objectifs stratégiques.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Commencez par un audit complet pour construire votre stratégie sur des faits.' },
    { title: 'Pentest', href: '/pentest', desc: 'Validez techniquement vos défenses dans le cadre de votre plan stratégique.' },
  ],
  'gestion-risques': [
    { title: 'EBIOS RM', href: '/ebios-rm', desc: 'Notre méthode de référence pour structurer votre analyse de risques cyber.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'La gestion des risques est le cœur du pilier GRC — gérez l\'ensemble dans un cadre unifié.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Évaluez votre maturité de gestion des risques avant de structurer la démarche.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'L\'audit alimente le registre des risques avec des vulnérabilités concrètes.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre gestion des risques au quotidien.' },
    { title: 'Stratégie Cybersécurité', href: '/strategie-cybersecurite', desc: 'Intégrez la gestion des risques dans votre feuille de route cyber globale.' },
  ],
  'evaluation-maturite': [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Structurez votre gouvernance sur la base de votre score de maturité.' },
    { title: 'Gestion des Risques', href: '/gestion-risques', desc: 'Passez de l\'évaluation à la gestion concrète des risques identifiés.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Complétez l\'évaluation de maturité par un audit technique approfondi.' },
    { title: 'Stratégie Cybersécurité', href: '/strategie-cybersecurite', desc: 'Construisez votre feuille de route en partant de votre niveau de maturité actuel.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter l\'amélioration de votre maturité.' },
  ],
  'cyber-vigilance-humaine': [
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formations cybersécurité pour renforcer la vigilance de tous vos collaborateurs.' },
    { title: 'Pentest Physique', href: '/pentest-physique', desc: 'Testez concrètement la résistance de vos équipes et de vos locaux aux intrusions.' },
    { title: 'Red Team', href: '/red-team', desc: 'Simulation APT intégrant social engineering et phishing ciblé.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour structurer et piloter votre programme de vigilance humaine.' },
  ],
  'sensibilisation-formation': [
    { title: 'Cyber Vigilance Humaine', href: '/cyber-vigilance-humaine', desc: 'Programme de vigilance continue pour maintenir le niveau de sensibilisation acquis.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'La formation est un pilier de votre gouvernance cybersécurité.' },
    { title: 'Formations', href: '/formations', desc: 'Catalogue complet de formations certifiantes en cybersécurité pour vos équipes.' },
    { title: 'Pentest Physique', href: '/pentest-physique', desc: 'Testez l\'efficacité de vos formations avec un exercice de phishing ou d\'intrusion physique.' },
  ],
  'protection-ransomware': [
    { title: 'Pentest Interne', href: '/pentest-interne', desc: 'Identifiez les chemins d\'attaque que les ransomwares exploitent dans votre réseau.' },
    { title: 'Gestion des Risques', href: '/gestion-risques', desc: 'Quantifiez l\'impact financier d\'un ransomware sur votre activité.' },
    { title: 'Cyber Vigilance Humaine', href: '/cyber-vigilance-humaine', desc: 'Les ransomwares arrivent souvent par phishing — formez vos équipes.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre plan anti-ransomware.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'NIS2 exige des plans de continuité — renforcez votre résilience aux ransomwares.' },
  ],

  // ─── AUTRES SERVICES ────────────────────────────────────────
  osint: [
    { title: 'Pentest Externe', href: '/pentest-externe', desc: 'Allez plus loin que l\'OSINT avec un test d\'intrusion sur votre périmètre exposé.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Contextualisez vos résultats OSINT dans un audit de posture complet.' },
    { title: 'Cyber Vigilance Humaine', href: '/cyber-vigilance-humaine', desc: 'Protégez vos collaborateurs exposés dans les résultats de recherche open source.' },
    { title: 'Red Team', href: '/red-team', desc: 'L\'OSINT est la première phase de toute opération Red Team — combinez les deux.' },
  ],
  'cyber-pilote': [
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Option avancée : un RSSI dédié pour piloter votre cybersécurité.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité — le cadre dans lequel s\'inscrit Cyber Pilote.' },
    { title: 'Évaluation Maturité', href: '/evaluation-maturite', desc: 'Mesurez votre niveau de maturité actuel avant de souscrire.' },
    { title: 'Audit Flash', href: '/audit-flash', desc: 'Démarrez par un diagnostic rapide de votre posture de sécurité.' },
    { title: 'Contact', href: '/contact', desc: 'Discutez avec un expert pour choisir la formule Cyber Pilote adaptée.' },
  ],
  'cyber-pilote2': [
    { title: 'Cyber Pilote', href: '/cyber-pilote', desc: 'Notre offre d\'abonnement cybersécurité tout-en-un pour PME.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Option avancée pour les entreprises souhaitant un RSSI dédié.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité dans un cadre intégré.' },
    { title: 'Contact', href: '/contact', desc: 'Échangez avec nos experts pour choisir la formule adaptée à vos besoins.' },
  ],
  'cybersecurite-operationnelle': [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion pour valider votre sécurité opérationnelle en conditions réelles.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Audit complet de votre posture opérationnelle technique et organisationnelle.' },
    { title: 'Protection Ransomware', href: '/protection-ransomware', desc: 'Protégez votre continuité opérationnelle contre la menace ransomware.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour piloter votre cybersécurité opérationnelle.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance et conformité pour structurer votre sécurité opérationnelle.' },
  ],
  'gouvernance-conformite': [
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Service GRC complet pour piloter votre gouvernance et conformité au quotidien.' },
    { title: 'RSSI Externalisé', href: '/rssi-externalise', desc: 'Un RSSI externalisé pour incarner et piloter votre gouvernance cybersécurité.' },
    { title: 'Gap Analysis', href: '/gap-analysis', desc: 'Identifiez vos écarts face à un référentiel cible avec un plan d\'action priorisé.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'Mise en conformité avec la directive NIS2 pour les entités concernées.' },
    { title: 'DPO Externalisé', href: '/dpo-externalise', desc: 'DPO externalisé pour le volet protection des données personnelles.' },
    { title: 'IA Act', href: '/ia-act', desc: 'Mise en conformité avec le règlement européen sur l\'intelligence artificielle.' },
  ],
  services: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion — validez la résistance de votre SI aux attaques réelles.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Évaluez objectivement votre posture de sécurité avec nos auditeurs certifiés.' },
    { title: 'Conformité', href: '/conformite', desc: 'NIS2, RGPD, DORA, ISO 27001 — accompagnement sur toutes les réglementations.' },
    { title: 'GRC Cyber', href: '/grc-cyber', desc: 'Gouvernance, risques et conformité dans un cadre de pilotage unifié.' },
    { title: 'Formations', href: '/formations', desc: 'Formations certifiantes en cybersécurité pour vos équipes.' },
    { title: 'Cyber Pilote', href: '/cyber-pilote', desc: 'Abonnement cybersécurité tout-en-un pour PME — notre offre managée.' },
  ],
  formations: [
    { title: 'Sensibilisation Formation', href: '/sensibilisation-formation', desc: 'Formations de sensibilisation intra-entreprise pour tous vos collaborateurs.' },
    { title: 'Cyber Vigilance Humaine', href: '/cyber-vigilance-humaine', desc: 'Programme de vigilance continue au-delà des sessions de formation.' },
    { title: 'Cyber Pilote', href: '/cyber-pilote', desc: 'Notre abonnement cybersécurité inclut des modules de formation. ' },
    { title: 'Contact', href: '/contact', desc: 'Discutez avec nous de votre programme de formation sur mesure.' },
  ],
  articles: [
    { title: 'Pentest', href: '/pentest', desc: 'Testez vos systèmes avec nos experts — guides pratiques et offre au résultat.' },
    { title: 'Audit Cybersécurité', href: '/audit-cybersecurite', desc: 'Évaluez votre posture de sécurité avec nos auditeurs certifiés AFNOR.' },
    { title: 'Conformité NIS2', href: '/conformite-nis2', desc: 'Tout sur la directive NIS2 — êtes-vous concerné ? Quelles obligations ?' },
    { title: 'OSINT', href: '/osint', desc: 'Vérifiez ce que les attaquants peuvent trouver sur votre organisation.' },
    { title: 'Contact', href: '/contact', desc: 'Une question sur un article ? Contactez nos experts directement.' },
  ],
  contact: [
    { title: 'Services', href: '/services', desc: 'Découvrez l\'ensemble de nos services cybersécurité.' },
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion par des experts certifiés OSCP — devis sous 24h.' },
    { title: 'Audit Flash', href: '/audit-flash', desc: 'Diagnostic cybersécurité express en 48h.' },
    { title: 'Formations', href: '/formations', desc: 'Formations certifiantes pour vos équipes.' },
    { title: 'Prendre rendez-vous', href: 'https://calendly.com/expert-securitrust', desc: 'Choisissez directement un créneau avec nos experts.' },
  ],
  portfolio: [
    { title: 'Pentest', href: '/pentest', desc: 'Tests d\'intrusion — découvrez nos cas clients en cybersécurité offensive.' },
    { title: 'Services', href: '/services', desc: 'L\'ensemble de nos offres cybersécurité pour entreprises.' },
    { title: 'Nous Rejoindre', href: '/nous-rejoindre', desc: 'Rejoignez l\'équipe SecuriTrust — postes ouverts en cybersécurité.' },
    { title: 'Contact', href: '/contact', desc: 'Discutez de votre projet avec nos experts.' },
  ],
  'nous-rejoindre': [
    { title: 'Services', href: '/services', desc: 'Découvrez les missions sur lesquelles vous travaillerez.' },
    { title: 'Portfolio', href: '/portfolio', desc: 'Nos réalisations — ce que vous pourrez accomplir chez SecuriTrust.' },
    { title: 'Formations', href: '/formations', desc: 'Certifications et formations que nous valorisons chez nos experts.' },
    { title: 'Contact', href: '/contact', desc: 'Postulez ou posez vos questions à notre équipe RH.' },
  ],
  'pentest-paris-geo': [
    { title: 'Pentest', href: '/pentest', desc: 'Vue d\'ensemble de nos services de tests d\'intrusion.' },
    { title: 'Pentest au Résultat', href: '/pentest-au-resultat', desc: 'Offre unique : remboursé si aucune vulnérabilité n\'est trouvée.' },
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
