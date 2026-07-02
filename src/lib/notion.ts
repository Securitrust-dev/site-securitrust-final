// Client minimal pour enregistrer les leads dans une base Notion (API REST publique).
// Best-effort côté serveur : un échec Notion ne doit jamais casser le formulaire.
// Contrairement à Dolibarr, l'API Notion est publique (HTTPS) → marche aussi depuis Vercel.

const TOKEN = process.env.NOTION_TOKEN ?? '';
const DB_ID = process.env.NOTION_LEADS_DB_ID ?? '';
const NOTION_VERSION = '2022-06-28';

/** True si le token + l'id de base sont présents. */
export function isNotionConfigured(): boolean {
  return Boolean(TOKEN && DB_ID);
}

export type NotionLeadInput = {
  /** Colonne "Nom" (titre) — personne de préférence, sinon société/email. */
  name: string;
  email?: string;
  phone?: string;
  /** Colonne "Société". */
  company?: string;
  /** Colonne "Source" — l'option du select est créée automatiquement si absente. */
  source?: 'Hero' | 'Contact' | 'Éligibilité' | 'LP RSSI';
  /** Colonne "Sujet & message". */
  subjectMessage?: string;
  /** Colonne "SIRET & activité". */
  siretActivity?: string;
};

function richText(value: string) {
  return { rich_text: [{ text: { content: value.slice(0, 2000) } }] };
}

/**
 * Crée une ligne (lead) dans la base Notion "Leads SecuriTrust".
 * Retourne l'id de la page créée. Lève en cas d'échec → à appeler dans un try/catch.
 */
export async function createLeadInNotion(lead: NotionLeadInput): Promise<string> {
  if (!isNotionConfigured()) {
    throw new Error('Notion non configuré (NOTION_TOKEN / NOTION_LEADS_DB_ID manquants)');
  }

  const properties: Record<string, unknown> = {
    Nom: { title: [{ text: { content: lead.name || 'Lead sans nom' } }] },
    Statut: { select: { name: 'Nouveau' } },
  };
  if (lead.email) properties['Email'] = { email: lead.email };
  if (lead.phone) properties['Téléphone'] = { phone_number: lead.phone };
  if (lead.company) properties['Société'] = richText(lead.company);
  if (lead.source) properties['Source'] = { select: { name: lead.source } };
  if (lead.subjectMessage) properties['Sujet & message'] = richText(lead.subjectMessage);
  if (lead.siretActivity) properties['SIRET & activité'] = richText(lead.siretActivity);

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parent: { database_id: DB_ID }, properties }),
    signal: AbortSignal.timeout(10000), // ne jamais bloquer le formulaire si Notion ne répond pas
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Notion createLead échoué (HTTP ${res.status}) : ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  return data?.id ?? '';
}
