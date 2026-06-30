import Anthropic from '@anthropic-ai/sdk';

export interface SynthesizedArticle {
  titleFr: string;
  excerptFr: string;
  contentFr: string;
  category: string;
  tags: string[];
}

const SYSTEM_PROMPT = `Tu es un rédacteur expert en cybersécurité et en SEO pour le blog de SecuriTrust, un cabinet de cybersécurité français.

À partir de l'article technique en anglais que je te fournis, rédige une synthèse originale en français, sans copier le texte source et sans laisser penser qu'elle est générée par une IA.

Respecte impérativement ce format de sortie (JSON UNIQUEMENT, sans markdown, sans code fence) :

{
  "titleFr": "Titre informatif de 8 à 12 mots intégrant les principaux mots-clés SEO",
  "excerptFr": "Maximum 10 lignes. Résumer uniquement les informations essentielles. Expliquer brièvement ce qui s'est passé et pourquoi c'est important. Utiliser un style professionnel, fluide et journalistique. Intégrer naturellement les mots-clés SEO sans sur-optimisation. Ne jamais inventer d'informations ni donner d'opinions.",
  "theme": "3 à 5 mots-clés séparés par des slash (ex: Ransomware / Phishing / Microsoft 365)",
  "impacts": ["Impact 1 - une ligne", "Impact 2 - une ligne", "Impact 3 - une ligne", "Impact 4 - une ligne"],
  "contentFr": "Article complet formaté en HTML. D'abord la synthèse en un paragraphe <p>. Puis <strong>Impacts pour les organisations</strong> suivi d'une liste <ul><li>. Enfin la source en <p> avec <a>.",
  "category": "Une catégorie parmi : Vulnérabilités & CVE, Ransomware, Phishing & Fraude, Threat Intelligence, Cloud & IAM, Malware & Exploits, Zero Trust & Architecture, SOC / SecOps, Conformité & GRC, Red Team & Pentest, Supply Chain, Actualités & Réglementation",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Contraintes :
- Ne pas dépasser 250 mots au total
- Aucun texte en gras ni emoji dans le texte
- Éviter les formulations typiques d'une IA
- Le texte doit pouvoir être publié directement sur un blog de veille cybersécurité
- Ne mets surtout pas de balises de code (\`\`\`) autour du JSON, retourne le JSON brut`;

export async function synthesizeArticle(articleContent: {
  title: string;
  content: string;
  excerpt: string;
  sourceUrl: string;
}): Promise<SynthesizedArticle | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const anthropic = new Anthropic({
    apiKey,
    baseURL: 'https://api.anthropic.com',
  });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Synthétise et traduis en français l'article suivant pour le blog SecuriTrust :\n\nTitre original : ${articleContent.title}\n\nRésumé : ${articleContent.excerpt}\n\nContenu : ${articleContent.content}\n\nSource : ${articleContent.sourceUrl}`,
      },
    ],
  });

  const textContent =
    response.content[0]?.type === 'text' ? response.content[0].text : '';

  // Claude might wrap the JSON in markdown code fences
  const jsonStr = textContent
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(jsonStr) as SynthesizedArticle;
  } catch (e) {
    console.error('Failed to parse Claude response:', textContent.slice(0, 500));
    return null;
  }
}