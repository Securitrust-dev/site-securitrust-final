import { NextRequest, NextResponse } from 'next/server';

interface PageData {
  title: string;
  url: string;
  excerpt: string;
  category: string;
  keywords: string[];
}

const pages: PageData[] = [
  // Services de conformité
  {
    title: 'DORA - Digital Operational Resilience Act',
    url: '/dora',
    excerpt: 'Conformité au règlement européen DORA pour renforcer la résilience opérationnelle numérique des institutions financières',
    category: 'Conformité',
    keywords: ['dora', 'règlement européen', 'finance', 'résilience', 'banque', 'assurance', 'digital operational resilience act']
  },
  {
    title: 'Mise en conformité RGPD',
    url: '/mise-en-conformite-rgpd',
    excerpt: 'Accompagnement complet pour la mise en conformité RGPD de votre organisation',
    category: 'Conformité',
    keywords: ['rgpd', 'données personnelles', 'conformité', 'gdpr', 'protection des données']
  },
  {
    title: 'ISO 27001 & HDS',
    url: '/iso27001-hds',
    excerpt: 'Certification ISO 27001 et Hébergeur de Données de Santé pour garantir la sécurité de vos systèmes d\'information',
    category: 'Conformité',
    keywords: ['iso 27001', 'hds', 'certification', 'santé', 'données de santé', 'hébergement']
  },
  {
    title: 'HDS Certification',
    url: '/hds-certification',
    excerpt: 'Certification Hébergeur de Données de Santé pour les établissements de santé et hébergeurs',
    category: 'Conformité',
    keywords: ['hds', 'santé', 'données de santé', 'hébergement', 'certification']
  },
  {
    title: 'TISAX Security',
    url: '/tisax-security',
    excerpt: 'Certification TISAX pour l\'industrie automobile et la sécurité de l\'information',
    category: 'Conformité',
    keywords: ['tisax', 'automobile', 'vda', 'isms', 'sécurité information']
  },
  {
    title: 'DPO Externalisé',
    url: '/dpo-externalise',
    excerpt: 'Service de DPO externalisé pour assurer la conformité RGPD de votre organisation',
    category: 'Conformité',
    keywords: ['dpo', 'délégué protection données', 'rgpd', 'externalisation']
  },
  
  // Audits
  {
    title: 'Audit de Cybersécurité',
    url: '/audit-cybersecurite',
    excerpt: 'Audit complet de votre infrastructure pour identifier les vulnérabilités et renforcer votre posture de sécurité',
    category: 'Audit',
    keywords: ['audit', 'cybersécurité', 'vulnérabilités', 'infrastructure', 'sécurité']
  },
  {
    title: 'Audit de Code Source',
    url: '/audit-code-source',
    excerpt: 'Analyse approfondie de votre code source pour détecter les failles de sécurité et vulnérabilités',
    category: 'Audit',
    keywords: ['audit', 'code source', 'sast', 'revue de code', 'vulnérabilités', 'développement sécurisé']
  },
  {
    title: 'Audit d\'Architecture',
    url: '/audit-architecture',
    excerpt: 'Évaluation de la sécurité de votre architecture système et infrastructure',
    category: 'Audit',
    keywords: ['audit', 'architecture', 'infrastructure', 'cloud', 'réseau']
  },
  {
    title: 'Audit de Configuration',
    url: '/audit-configuration',
    excerpt: 'Vérification de la configuration sécurisée de vos systèmes et applications',
    category: 'Audit',
    keywords: ['audit', 'configuration', 'hardening', 'serveurs', 'systèmes']
  },
  {
    title: 'Audit de Conformité',
    url: '/audit-conformite',
    excerpt: 'Audit de conformité réglementaire RGPD, ISO 27001, HDS, DORA',
    category: 'Audit',
    keywords: ['audit', 'conformité', 'rgpd', 'iso', 'hds', 'dora', 'réglementation']
  },
  {
    title: 'Audit Flash',
    url: '/audit-flash',
    excerpt: 'Audit rapide pour identifier rapidement les risques de sécurité critiques',
    category: 'Audit',
    keywords: ['audit', 'flash', 'rapide', 'vulnérabilités', 'risques']
  },
  {
    title: 'Audit Organisationnel',
    url: '/audit-organisationnel',
    excerpt: 'Évaluation de vos processus et organisation en matière de cybersécurité',
    category: 'Audit',
    keywords: ['audit', 'organisation', 'processus', 'gouvernance', 'humain']
  },
  {
    title: 'Audit de Sécurité Technique',
    url: '/audit-securite-technique',
    excerpt: 'Audit technique approfondi de vos systèmes et infrastructures',
    category: 'Audit',
    keywords: ['audit', 'technique', 'infrastructure', 'systèmes', 'sécurité']
  },
  
  // Pentest
  {
    title: 'Pentest Web & Mobile',
    url: '/pentest-web-mobile',
    excerpt: 'Test d\'intrusion de vos applications web et mobiles pour identifier les vulnérabilités exploitables',
    category: 'Pentest',
    keywords: ['pentest', 'test intrusion', 'web', 'mobile', 'application', 'owasp']
  },
  {
    title: 'Pentest Externe',
    url: '/pentest-externe',
    excerpt: 'Test d\'intrusion de votre périmètre externe depuis Internet',
    category: 'Pentest',
    keywords: ['pentest', 'externe', 'internet', 'périmètre', 'réseau']
  },
  {
    title: 'Pentest Interne',
    url: '/pentest-interne',
    excerpt: 'Test d\'intrusion de votre réseau interne pour simuler une attaque depuis l\'intérieur',
    category: 'Pentest',
    keywords: ['pentest', 'interne', 'réseau', 'active directory', 'pivot']
  },
  {
    title: 'Pentest Physique',
    url: '/pentest-physique',
    excerpt: 'Test d\'intrusion physique de vos locaux et contrôles d\'accès',
    category: 'Pentest',
    keywords: ['pentest', 'physique', 'local', 'accès', 'social engineering']
  },
  {
    title: 'Red Team',
    url: '/red-team',
    excerpt: 'Simulation d\'attaque avancée pour tester la capacité de détection et réaction de vos équipes',
    category: 'Pentest',
    keywords: ['red team', 'atp', 'simulation', 'attaque', 'détection']
  },
  
  // Services stratégiques
  {
    title: 'GRC Cyber - Gouvernance, Risques et Conformité',
    url: '/grc-cyber',
    excerpt: 'Accompagnement stratégique en gouvernance, gestion des risques et conformité cybersécurité',
    category: 'Stratégie',
    keywords: ['grc', 'gouvernance', 'risques', 'conformité', 'stratégie']
  },
  {
    title: 'RSSI Externalisé',
    url: '/rssi-externalise',
    excerpt: 'Service de RSSI externalisé pour piloter votre stratégie de cybersécurité',
    category: 'Stratégie',
    keywords: ['rssi', 'ciso', 'externalisation', 'stratégie', 'gouvernance']
  },
  {
    title: 'Stratégie de Cybersécurité',
    url: '/strategie-cybersecurite',
    excerpt: 'Définition et mise en œuvre de votre stratégie de cybersécurité',
    category: 'Stratégie',
    keywords: ['stratégie', 'cybersécurité', 'roadmap', 'pilotage', 'gouvernance']
  },
  {
    title: 'Évaluation de Maturité',
    url: '/evaluation-maturite',
    excerpt: 'Évaluation du niveau de maturité de votre organisation en cybersécurité',
    category: 'Stratégie',
    keywords: ['maturité', 'évaluation', 'diagnostic', 'niveau', 'cybersécurité']
  },
  {
    title: 'Gestion des Risques',
    url: '/gestion-risques',
    excerpt: 'Identification, évaluation et traitement des risques cyber de votre organisation',
    category: 'Stratégie',
    keywords: ['risques', 'gestion', 'ebios', 'analyse', 'traitement']
  },
  
  // Services opérationnels
  {
    title: 'Protection Ransomware',
    url: '/protection-ransomware',
    excerpt: 'Solutions de protection et résilience contre les attaques par ransomware',
    category: 'Protection',
    keywords: ['ransomware', 'protection', 'sauvegarde', 'résilience', 'cryptolocker']
  },
  {
    title: 'OSINT - Renseignement Open Source',
    url: '/osint',
    excerpt: 'Investigation OSINT pour évaluer votre exposition sur Internet et le dark web',
    category: 'Investigation',
    keywords: ['osint', 'renseignement', 'dark web', 'exposition', 'fuite données']
  },
  {
    title: 'Cyber Vigilance Humaine',
    url: '/cyber-vigilance-humaine',
    excerpt: 'Sensibilisation et formation de vos équipes aux risques cyber',
    category: 'Formation',
    keywords: ['sensibilisation', 'formation', 'humain', 'phishing', 'awareness']
  },
  {
    title: 'Sensibilisation & Formation',
    url: '/sensibilisation-formation',
    excerpt: 'Programmes de sensibilisation et formation en cybersécurité',
    category: 'Formation',
    keywords: ['sensibilisation', 'formation', 'awareness', 'sécurité', 'équipes']
  },
  
  // Pages générales
  {
    title: 'Services de Cybersécurité',
    url: '/services',
    excerpt: 'Découvrez l\'ensemble de nos services en cybersécurité et conformité',
    category: 'Général',
    keywords: ['services', 'cybersécurité', 'sécurité', 'offres', 'prestations']
  },
  {
    title: 'Portfolio',
    url: '/portfolio',
    excerpt: 'Nos références et études de cas en cybersécurité',
    category: 'Général',
    keywords: ['portfolio', 'références', 'clients', 'projets', 'cas clients']
  },
  {
    title: 'Articles',
    url: '/articles',
    excerpt: 'Actualités et articles sur la cybersécurité',
    category: 'Ressources',
    keywords: ['articles', 'blog', 'actualités', 'veille', 'cybersécurité']
  },
  {
    title: 'Contact',
    url: '/contact',
    excerpt: 'Contactez-nous pour discuter de vos besoins en cybersécurité',
    category: 'Général',
    keywords: ['contact', 'devis', 'rdv', 'conseil', 'accompagnement']
  }
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const results = pages.filter((page) => {
    const titleMatch = page.title.toLowerCase().includes(query);
    const excerptMatch = page.excerpt.toLowerCase().includes(query);
    const keywordsMatch = page.keywords.some(keyword => 
      keyword.toLowerCase().includes(query) || query.includes(keyword.toLowerCase())
    );
    
    return titleMatch || excerptMatch || keywordsMatch;
  });

  // Sort results: exact title matches first, then keyword matches, then excerpt matches
  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0;
    const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0;
    return bTitle - aTitle;
  });

  return NextResponse.json(results.slice(0, 10));
}
