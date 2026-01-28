
/**
 * Cybersecurity Taxonomy and Classification Logic
 */

export const CYBER_CATEGORIES = [
  "Vulnérabilités & CVE",
  "Ransomware",
  "Phishing & Fraude",
  "Threat Intelligence",
  "Cloud & IAM",
  "Malware & Exploits",
  "Zero Trust & Architecture",
  "SOC / SecOps",
  "Conformité & GRC",
  "Red Team & Pentest",
  "Supply Chain",
  "Actualités & Réglementation"
] as const;

export type CyberCategory = typeof CYBER_CATEGORIES[number];

interface KeywordMap {
  category: CyberCategory;
  keywords: string[];
  tags: string[];
}

const TAXONOMY_MAP: KeywordMap[] = [
  {
    category: "Vulnérabilités & CVE",
    keywords: ["cve-", "vulnerability", "vulnerabilite", "bug bounty", "zero-day", "0-day", "patch", "security update", "critical flaw", "buffer overflow", "rce", "sqli", "xss"],
    tags: ["cve", "vulnerabilite", "patch", "rce", "security-flaw"]
  },
  {
    category: "Ransomware",
    keywords: ["ransomware", "ransom", "encryption attack", "lockbit", "clop", "conti", "revil", "darkside", "blackcat", "extortion"],
    tags: ["ransomware", "cyber-extorsion", "malware", "data-encryption"]
  },
  {
    category: "Phishing & Fraude",
    keywords: ["phishing", "smishing", "vishing", "social engineering", "fraude", "scam", "impersonation", "business email compromise", "bec", "credential harvesting"],
    tags: ["phishing", "social-engineering", "fraude", "bec", "cyber-arnaque"]
  },
  {
    category: "Threat Intelligence",
    keywords: ["threat intelligence", "apt", "advanced persistent threat", "threat actor", "cyber espionage", "ioc", "indicators of compromise", "attribution", "espionnage", "state-sponsored"],
    tags: ["threat-intel", "apt", "cyber-espionnage", "ioc", "threat-actor"]
  },
  {
    category: "Cloud & IAM",
    keywords: ["cloud", "aws", "azure", "gcp", "iam", "identity access management", "s3 bucket", "misconfiguration", "cloud security", "active directory", "okta", "auth0"],
    tags: ["cloud-security", "iam", "aws", "azure", "active-directory"]
  },
  {
    category: "Malware & Exploits",
    keywords: ["malware", "trojan", "spyware", "adware", "rootkit", "botnet", "loader", "stealer", "infostealer", "exploit kit", "payload", "obfuscation"],
    tags: ["malware", "virus", "botnet", "infostealer", "exploit"]
  },
  {
    category: "Zero Trust & Architecture",
    keywords: ["zero trust", "ztna", "vpn", "firewall", "network security", "segmentation", "microsegmentation", "sase", "sd-wan", "casb", "architecture"],
    tags: ["zero-trust", "network-security", "firewall", "architecture-cyber"]
  },
  {
    category: "SOC / SecOps",
    keywords: ["soc", "siem", "soar", "edr", "xdr", "mdr", "monitoring", "incident response", "threat hunting", "log analysis", "securite operationnelle", "secops"],
    tags: ["soc", "siem", "edr", "incident-response", "secops"]
  },
  {
    category: "Conformité & GRC",
    keywords: ["grc", "compliance", "conformite", "iso 27001", "gdpr", "rgpd", "hipaa", "pci dss", "dora", "nis2", "audit", "risk management", "gestion des risques"],
    tags: ["grc", "compliance", "rgpd", "iso27001", "nis2", "dora"]
  },
  {
    category: "Red Team & Pentest",
    keywords: ["pentest", "penetration test", "red team", "ethical hacking", "hacking", "offensive security", "metasploit", "burp suite", "nmap", "intrusion"],
    tags: ["pentest", "redteam", "ethical-hacking", "hacking-offensif"]
  },
  {
    category: "Supply Chain",
    keywords: ["supply chain", "software supply chain", "solarwinds", "log4j", "npm", "pypi", "dependency", "sbom", "vendor risk", "tiers", "fournisseur"],
    tags: ["supply-chain", "sbom", "log4j", "vendor-risk"]
  }
];

export interface ClassificationResult {
  category: CyberCategory;
  tags: string[];
  confidence: number;
}

export function classifyArticle(title: string, summary: string, content: string): ClassificationResult {
  const textToAnalyze = `${title} ${summary} ${content}`.toLowerCase();
  
  let bestCategory: CyberCategory = "Actualités & Réglementation";
  let maxScore = 0;
  let detectedTags: Set<string> = new Set();

  for (const item of TAXONOMY_MAP) {
    let score = 0;
    let foundInThisCategory = false;

    for (const keyword of item.keywords) {
      if (textToAnalyze.includes(keyword.toLowerCase())) {
        score += 1;
        foundInThisCategory = true;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestCategory = item.category;
    }

    if (foundInThisCategory) {
      item.tags.forEach(tag => detectedTags.add(tag));
    }
  }

  // Calculate confidence (simple heuristic)
  const confidence = maxScore > 0 ? Math.min(0.95, 0.4 + (maxScore * 0.1)) : 0;

  // Fallback if confidence is too low
  if (confidence < 0.55) {
    bestCategory = "Actualités & Réglementation";
  }

  // Refine tags: pick at most 5 tags, prioritizing those from the best category
  const finalTagsList: string[] = [];
  const bestCategoryMap = TAXONOMY_MAP.find(m => m.category === bestCategory);
  
  if (bestCategoryMap) {
    bestCategoryMap.tags.forEach(tag => {
      if (finalTagsList.length < 5) finalTagsList.push(tag);
    });
  }

  // Add more tags if we have space
  for (const tag of detectedTags) {
    if (finalTagsList.length < 5 && !finalTagsList.includes(tag)) {
      finalTagsList.push(tag);
    }
  }

  return {
    category: bestCategory,
    tags: finalTagsList,
    confidence
  };
}

/**
 * LinkedIn Post Preparation
 */
export function prepareLinkedInPost(article: {
  title: string;
  summary: string;
  category: string;
  tags: string[] | string;
  sourceType: 'internal' | 'rss';
  sourceUrl?: string;
  url: string;
}) {
  const tags = typeof article.tags === 'string' ? JSON.parse(article.tags) : article.tags;
  const hashtags = tags.map((t: string) => `#${t.replace(/[^a-z0-9]/g, '')}`).slice(0, 5).join(' ');
  
  const prefix = article.sourceType === 'internal' ? '🚀 [Expertise SecuriTrust]' : '📌 [Veille Cybersécurité]';
  const sourceInfo = article.sourceType === 'rss' ? `\n\nSource : ${article.sourceUrl || 'The Hacker News'}` : '';
  
  const message = `${prefix}
  
${article.title}

${article.summary}

📌 Catégorie : ${article.category}

Lire l'article complet : ${article.url}${sourceInfo}

${hashtags} #cybersecurite #infosec #securitrust`;

  return {
    message,
    category: article.category,
    tags: tags
  };
}
