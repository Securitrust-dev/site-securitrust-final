// Client minimal pour pousser des leads (prospects) dans Dolibarr via l'API REST.
// Auth : clé API (DOLAPIKEY) en priorité, sinon fallback login/mot de passe.
// À utiliser en best-effort côté serveur : un échec Dolibarr NE DOIT PAS casser le formulaire.

const RAW_URL = (process.env.DOLIBARR_URL ?? '').replace(/\/+$/, '');
const API_KEY = process.env.DOLIBARR_API_KEY ?? '';
const LOGIN = process.env.DOLIBARR_LOGIN ?? '';
const PASSWORD = process.env.DOLIBARR_PASSWORD ?? '';

const API_BASE = RAW_URL ? `${RAW_URL}/api/index.php` : '';

/** True si assez de variables d'env sont présentes pour appeler l'API. */
export function isDolibarrConfigured(): boolean {
  return Boolean(API_BASE && (API_KEY || (LOGIN && PASSWORD)));
}

export type LeadInput = {
  /** Nom du tiers/prospect (société de préférence, sinon contact ou email). */
  name: string;
  email?: string;
  phone?: string;
  /** Texte libre : coordonnées du contact, réponses au questionnaire, message, etc. */
  note?: string;
  /** Origine du lead (hero, contact, eligibilite) — ajoutée en tête de la note. */
  source?: string;
};

// Token obtenu via login/mdp, mis en cache tant qu'il est valide (fallback uniquement).
let cachedToken: string | null = null;

/** Récupère la clé DOLAPIKEY : clé API directe, ou token obtenu via login/mdp. */
async function resolveApiKey(): Promise<string> {
  if (API_KEY) return API_KEY;
  if (cachedToken) return cachedToken;

  const url = `${API_BASE}/login?login=${encodeURIComponent(LOGIN)}&password=${encodeURIComponent(PASSWORD)}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
  if (!res.ok) {
    throw new Error(`Dolibarr login échoué (HTTP ${res.status})`);
  }
  const data = await res.json();
  const token = data?.success?.token;
  if (!token) throw new Error('Dolibarr login : token absent de la réponse');
  cachedToken = token;
  return token;
}

/**
 * Crée un prospect (tiers en statut prospect) dans Dolibarr.
 * Retourne l'id Dolibarr du tiers créé.
 * À appeler dans un try/catch — cette fonction lève en cas d'échec.
 */
export async function createLead(lead: LeadInput): Promise<number> {
  if (!isDolibarrConfigured()) {
    throw new Error('Dolibarr non configuré (variables .env manquantes)');
  }
  const apiKey = await resolveApiKey();

  const note = [lead.source ? `Source : ${lead.source}` : null, lead.note ?? null]
    .filter(Boolean)
    .join('\n\n');

  const body: Record<string, unknown> = {
    name: lead.name,
    client: 2, // 0 = aucun, 1 = client, 2 = prospect, 3 = client + prospect
  };
  if (lead.email) body.email = lead.email;
  if (lead.phone) body.phone = lead.phone;
  if (note) body.note_private = note;

  const res = await fetch(`${API_BASE}/thirdparties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      DOLAPIKEY: apiKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000), // ne jamais bloquer le formulaire si le CRM ne répond pas
  });

  if (!res.ok) {
    // Un token expiré (fallback) : on l'invalide pour forcer un refresh au prochain appel.
    if (!API_KEY && (res.status === 401 || res.status === 403)) cachedToken = null;
    const text = await res.text().catch(() => '');
    throw new Error(`Dolibarr createLead échoué (HTTP ${res.status}) : ${text.slice(0, 300)}`);
  }

  // Dolibarr renvoie l'id du tiers créé (nombre) en cas de succès.
  const data = await res.json();
  return typeof data === 'number' ? data : Number(data);
}
