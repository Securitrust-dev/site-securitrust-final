import Anthropic from '@anthropic-ai/sdk';

/**
 * Ligne éditoriale de la veille automatique (validée le 29/10/2026).
 * Une actualité hors ligne n'est ni synthétisée ni publiée en français : elle reste
 * seulement visible telle quelle dans le flux de veille, en noindex.
 */
export const VEILLE_EDITORIAL_LINE = `Lecteurs : dirigeants, DSI et RSSI d'entreprises et d'organisations françaises.

À ÉCARTER :
- IA grand public (nouveaux modèles, chatbots, comparatifs d'outils)
- Messageries et applications grand public (WhatsApp, Telegram, Signal)
- Cryptomonnaies, NFT, plateformes d'échange
- Géopolitique sans conséquence directe sur une entreprise française
- Failles sur des produits grand public (box internet, smartphones, jeux vidéo)

À GARDER :
- Failles sur des produits d'entreprise (VPN, pare-feu, serveurs, Active Directory)
- Réglementation : NIS2, DORA, ISO 27001, HDS, RGPD
- Incidents chez des entreprises françaises ou européennes
- Ransomware touchant des secteurs cibles (santé, industrie, collectivités)`;

const PROMPT = `Tu tries les actualités de cybersécurité pour la veille du cabinet SecuriTrust.

${VEILLE_EDITORIAL_LINE}

En cas de doute, une actualité est pertinente si un RSSI d'entreprise française doit agir ou s'en inquiéter.
Réponds en JSON brut, sans balises de code : {"pertinent": true|false, "raison": "une phrase"}`;

export interface VeilleVerdict {
  pertinent: boolean;
  raison: string;
}

/**
 * Indique si une actualité entre dans la ligne éditoriale. En cas d'erreur (API
 * indisponible, réponse illisible), l'actualité est laissée passer : la veille ne doit
 * pas s'arrêter en silence, et l'erreur est journalisée.
 */
export async function checkVeilleRelevance(item: { title: string; excerpt?: string }): Promise<VeilleVerdict> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return { pertinent: true, raison: 'ANTHROPIC_API_KEY absente : filtre non appliqué' };
  try {
    const anthropic = new Anthropic({ apiKey, baseURL: 'https://api.anthropic.com' });
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 200,
      system: PROMPT,
      messages: [{ role: 'user', content: `Titre : ${item.title}\n\nRésumé : ${(item.excerpt || '').slice(0, 600)}` }],
    });
    const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
    const parsed = JSON.parse(text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim());
    return { pertinent: parsed.pertinent !== false, raison: String(parsed.raison || '') };
  } catch (error) {
    console.error('[veille] filtre éditorial indisponible, actualité conservée', error);
    return { pertinent: true, raison: 'filtre indisponible' };
  }
}
