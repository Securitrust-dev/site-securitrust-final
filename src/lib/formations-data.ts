export interface FormationModule {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface Formation {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  price: number; // centimes
  priceMonthly: number; // centimes
  duration: string;
  level: 'Debutant' | 'Intermediaire' | 'Avance';
  category: string;
  instructor: string;
  modules: FormationModule[];
  published: boolean;
}

export const FORMATIONS: Formation[] = [
  {
    slug: 'pentest-web-owasp',
    title: 'Pentest Web & OWASP Top 10',
    shortDescription: "Maitrisez les tests d'intrusion web et les vulnerabilites OWASP les plus critiques.",
    description: `Formation complete sur les tests d'intrusion web couvrant l'ensemble du OWASP Top 10. Vous apprendrez a identifier, exploiter et remedier les vulnerabilites web les plus courantes : injections SQL, XSS, CSRF, SSRF, et bien plus. Chaque module inclut des demonstrations pratiques sur des environnements de lab dedies.

A l'issue de cette formation, vous serez capable de realiser un audit de securite web complet, de rediger un rapport professionnel et de proposer des recommandations adaptees.`,
    thumbnail: '/formations/pentest-web.jpg',
    price: 49900,
    priceMonthly: 4900,
    duration: '18h',
    level: 'Intermediaire',
    category: 'Pentest',
    instructor: 'SecuriTrust Expert',
    modules: [
      { id: 1, title: 'Introduction au Pentest Web', duration: '45min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 2, title: 'Reconnaissance et collecte d\'informations', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 3, title: 'Injection SQL - Fondamentaux', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 4, title: 'Injection SQL - Techniques avancees', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 5, title: 'Cross-Site Scripting (XSS)', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 6, title: 'CSRF et manipulation de sessions', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 7, title: 'SSRF et injections de commandes', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 8, title: 'Broken Access Control', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 9, title: 'Security Misconfiguration', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 10, title: 'Cryptographic Failures', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 11, title: 'Outils du pentester web', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 12, title: 'Redaction de rapport et remediation', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ],
    published: true,
  },
  {
    slug: 'hacking-ethique-fondamentaux',
    title: 'Hacking Ethique - Les Fondamentaux',
    shortDescription: 'Decouvrez les bases du hacking ethique et de la securite offensive.',
    description: `Formation d'initiation au hacking ethique destinee aux debutants souhaitant comprendre les fondamentaux de la securite offensive. Vous apprendrez les methodologies de test d'intrusion, les outils essentiels (Kali Linux, Nmap, Metasploit) et les principes de la securite informatique.

Cette formation couvre la configuration d'un laboratoire de test, les techniques de scanning, l'exploitation de vulnerabilites basiques et les bonnes pratiques legales et ethiques du pentesting.`,
    thumbnail: '/formations/hacking-ethique.jpg',
    price: 29900,
    priceMonthly: 2900,
    duration: '12h',
    level: 'Debutant',
    category: 'Hacking Ethique',
    instructor: 'SecuriTrust Expert',
    modules: [
      { id: 1, title: 'Introduction au hacking ethique', duration: '45min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 2, title: 'Configuration du lab (Kali Linux)', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 3, title: 'Scanning et enumeration avec Nmap', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 4, title: 'Exploitation avec Metasploit', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 5, title: 'Cracking de mots de passe', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 6, title: 'Attaques reseau (MITM, ARP)', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 7, title: 'Escalade de privileges', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 8, title: 'Post-exploitation et persistance', duration: '1h15', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 9, title: 'Cadre legal et ethique', duration: '30min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 10, title: 'Projet final : Pentest complet', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ],
    published: true,
  },
  {
    slug: 'securite-reseaux-entreprise',
    title: 'Securite des Reseaux d\'Entreprise',
    shortDescription: 'Protegez les infrastructures reseau de votre organisation contre les cybermenaces.',
    description: `Formation avancee sur la securite des reseaux d'entreprise. Apprenez a concevoir, deployer et maintenir une architecture reseau securisee. Couvre les firewalls, IDS/IPS, segmentation, VPN, monitoring et reponse aux incidents reseau.

Destinee aux administrateurs reseaux et ingenieurs securite souhaitant renforcer la posture de securite de leur infrastructure.`,
    thumbnail: '/formations/securite-reseaux.jpg',
    price: 59900,
    priceMonthly: 5900,
    duration: '20h',
    level: 'Avance',
    category: 'Reseaux',
    instructor: 'SecuriTrust Expert',
    modules: [
      { id: 1, title: 'Architecture reseau securisee', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 2, title: 'Configuration firewall avancee', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 3, title: 'IDS/IPS : Snort et Suricata', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 4, title: 'Segmentation et Zero Trust', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 5, title: 'VPN et tunneling securise', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 6, title: 'Monitoring avec SIEM', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 7, title: 'Analyse de trafic et forensics', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 8, title: 'Securite Wi-Fi entreprise', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 9, title: 'Reponse aux incidents reseau', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 10, title: 'Lab final : Audit reseau complet', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ],
    published: true,
  },
  {
    slug: 'rgpd-conformite-pratique',
    title: 'RGPD & Conformite en Pratique',
    shortDescription: 'Mettez votre organisation en conformite RGPD de A a Z.',
    description: `Formation pratique sur la mise en conformite RGPD. Destinee aux DPO, responsables conformite et dirigeants, cette formation couvre l'ensemble des obligations reglementaires, de l'analyse d'impact (AIPD) a la gestion des droits des personnes concernees.

Inclut des templates, checklists et cas pratiques pour une mise en oeuvre immediate dans votre organisation.`,
    thumbnail: '/formations/rgpd.jpg',
    price: 39900,
    priceMonthly: 3900,
    duration: '10h',
    level: 'Debutant',
    category: 'GRC',
    instructor: 'SecuriTrust Expert',
    modules: [
      { id: 1, title: 'Principes fondamentaux du RGPD', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 2, title: 'Cartographie des traitements', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 3, title: 'Analyse d\'impact (AIPD)', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 4, title: 'Droits des personnes concernees', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 5, title: 'Gestion du consentement', duration: '45min', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 6, title: 'Notification de violations', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 7, title: 'Sous-traitance et transferts', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 8, title: 'Mise en pratique et templates', duration: '1h15', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ],
    published: true,
  },
  {
    slug: 'reponse-incidents-forensics',
    title: 'Reponse aux Incidents & Forensics',
    shortDescription: 'Apprenez a detecter, analyser et repondre efficacement aux incidents de securite.',
    description: `Formation avancee couvrant l'ensemble du cycle de reponse aux incidents : preparation, detection, containment, eradication et recovery. Inclut les techniques de forensics numerique pour analyser les compromissions et preserver les preuves.

Vous apprendrez a utiliser les outils professionnels de forensics (Volatility, Autopsy, Wireshark) et a mettre en place un processus de reponse aux incidents structure.`,
    thumbnail: '/formations/forensics.jpg',
    price: 69900,
    priceMonthly: 6900,
    duration: '22h',
    level: 'Avance',
    category: 'Forensics',
    instructor: 'SecuriTrust Expert',
    modules: [
      { id: 1, title: 'Introduction a la reponse aux incidents', duration: '1h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 2, title: 'Preparation et processus IR', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 3, title: 'Detection et triage', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 4, title: 'Analyse memoire avec Volatility', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 5, title: 'Analyse disque avec Autopsy', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 6, title: 'Analyse reseau avec Wireshark', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 7, title: 'Analyse de malware basique', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 8, title: 'Timeline et correlation', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 9, title: 'Containment et eradication', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 10, title: 'Recovery et lessons learned', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 11, title: 'Redaction de rapport forensic', duration: '1h30', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 12, title: 'Lab final : Investigation complete', duration: '2h', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ],
    published: true,
  },
];

export function getFormationBySlug(slug: string): Formation | undefined {
  return FORMATIONS.find((f) => f.slug === slug);
}

export function getPublishedFormations(): Formation[] {
  return FORMATIONS.filter((f) => f.published);
}

export function getFormationCategories(): string[] {
  return [...new Set(FORMATIONS.map((f) => f.category))];
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100);
}
