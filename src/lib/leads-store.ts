// Stockage des leads dans Turso (base déjà utilisée par le site) : filet de sécurité
// pour qu'aucune demande ne soit perdue, même si l'e-mail, Notion et Dolibarr échouent.
// Consultable dans /admin-stats (section « Derniers leads »).
//
// La table est créée à la volée (CREATE TABLE IF NOT EXISTS) : pas de migration à
// lancer à la main. Conservation : 24 mois, comme annoncé dans la mention RGPD des
// formulaires ; les leads plus anciens sont purgés à chaque nouvel enregistrement.

import { client } from '@/db';

let ready: Promise<void> | null = null;

function ensureTable(): Promise<void> {
  if (!ready) {
    ready = client
      .batch(
        [
          `CREATE TABLE IF NOT EXISTS leads (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            name TEXT, email TEXT, phone TEXT, company TEXT,
            subject TEXT, message TEXT, source TEXT, page TEXT,
            email_sent INTEGER NOT NULL DEFAULT 0,
            email_error TEXT
          )`,
          'CREATE INDEX IF NOT EXISTS leads_created_at ON leads (created_at)',
        ],
        'write',
      )
      .then(() => undefined)
      .catch((e) => {
        ready = null; // nouvel essai au prochain lead
        throw e;
      });
  }
  return ready;
}

export type StoredLead = {
  id: string;
  name?: string; email?: string; phone?: string; company?: string;
  subject?: string; message?: string; source?: string; page?: string;
};

const clip = (v: unknown, max = 2000) => (v == null || v === '' ? null : String(v).slice(0, max));

export async function saveLead(lead: StoredLead): Promise<void> {
  await ensureTable();
  await client.batch(
    [
      {
        sql: `INSERT INTO leads (id, created_at, name, email, phone, company, subject, message, source, page)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          lead.id, new Date().toISOString(),
          clip(lead.name, 200), clip(lead.email, 200), clip(lead.phone, 50), clip(lead.company, 200),
          clip(lead.subject, 500), clip(lead.message), clip(lead.source, 200), clip(lead.page, 200),
        ],
      },
      { sql: "DELETE FROM leads WHERE created_at < datetime('now', '-24 months')", args: [] },
    ],
    'write',
  );
}

export async function markLeadEmail(id: string, sent: boolean, error?: string): Promise<void> {
  await client.execute({
    sql: 'UPDATE leads SET email_sent = ?, email_error = ? WHERE id = ?',
    args: [sent ? 1 : 0, error ? error.slice(0, 300) : null, id],
  });
}

export type LeadRow = {
  id: string; created_at: string; name: string | null; email: string | null; phone: string | null;
  company: string | null; subject: string | null; source: string | null; page: string | null;
  email_sent: number; email_error: string | null;
};

export async function recentLeads(limit = 50): Promise<LeadRow[]> {
  await ensureTable();
  const res = await client.execute({
    sql: `SELECT id, created_at, name, email, phone, company, subject, source, page, email_sent, email_error
          FROM leads ORDER BY created_at DESC LIMIT ?`,
    args: [limit],
  });
  return res.rows as unknown as LeadRow[];
}
