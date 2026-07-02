import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// --- Récupère le token + l'id de base depuis .env.local (le test interroge Notion directement) ---
function loadEnvLocal(): Record<string, string> {
  const p = path.resolve(process.cwd(), '.env.local');
  const env: Record<string, string> = {};
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}
const ENV = loadEnvLocal();
const NOTION_TOKEN = ENV.NOTION_TOKEN;
const DB_ID = ENV.NOTION_LEADS_DB_ID;
const NOTION_HEADERS = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

async function queryByEmail(email: string): Promise<any[]> {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: 'POST',
    headers: NOTION_HEADERS,
    body: JSON.stringify({ filter: { property: 'Email', email: { equals: email } } }),
  });
  if (!res.ok) throw new Error(`Notion query ${res.status}: ${await res.text()}`);
  return (await res.json()).results ?? [];
}

async function archivePage(id: string) {
  await fetch(`https://api.notion.com/v1/pages/${id}`, {
    method: 'PATCH',
    headers: NOTION_HEADERS,
    body: JSON.stringify({ archived: true }),
  });
}

const title = (p: any) => p?.title?.[0]?.plain_text ?? '';
const rt = (p: any) => p?.rich_text?.[0]?.plain_text ?? '';

test('formulaire /contact → la ligne arrive complète dans Notion', async ({ page }) => {
  expect(NOTION_TOKEN, 'NOTION_TOKEN doit être présent dans .env.local').toBeTruthy();

  const stamp = Date.now();
  const lead = {
    name: `E2E Playwright ${stamp}`,
    email: `e2e-${stamp}@test.securitrust.fr`,
    phone: '0611223344',
    company: `NavCorp ${stamp}`,
    subject: 'Sujet E2E Playwright',
    message: 'Message de test E2E envoyé par Playwright.',
  };

  // 1. Remplir et soumettre le vrai formulaire
  await page.goto('/contact');
  await page.fill('#name', lead.name);
  await page.fill('#email', lead.email);
  await page.fill('#phone', lead.phone);
  await page.fill('#company', lead.company);
  await page.fill('#subject', lead.subject);
  await page.fill('#message', lead.message);
  // 2. Soumettre et vérifier la réponse de l'API (robuste vs toast/hydratation)
  const [resp] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes('/api/contact') && r.request().method() === 'POST',
      { timeout: 25000 },
    ),
    page.click('form button[type="submit"]'),
  ]);
  expect(resp.status(), 'POST /api/contact doit répondre 200').toBe(200);

  // 3. La ligne existe dans Notion (petit polling le temps de l'écriture)
  let rows: any[] = [];
  for (let i = 0; i < 12 && rows.length === 0; i++) {
    rows = await queryByEmail(lead.email);
    if (rows.length === 0) await page.waitForTimeout(1000);
  }
  expect(rows.length, 'exactement 1 ligne dans Notion pour cet email').toBe(1);

  // 4. TOUS les champs sont corrects
  const props = rows[0].properties;
  try {
    expect(title(props['Nom'])).toBe(lead.name);
    expect(props['Email'].email).toBe(lead.email);
    expect(props['Téléphone'].phone_number).toBe(lead.phone);
    expect(rt(props['Société'])).toBe(lead.company);
    expect(props['Source'].select?.name).toBe('Contact');
    expect(props['Statut'].select?.name).toBe('Nouveau');
    expect(rt(props['Sujet & message'])).toContain(lead.subject);
    expect(rt(props['Sujet & message'])).toContain(lead.message);
  } finally {
    // 5. Nettoyage : on archive la ligne de test créée
    await archivePage(rows[0].id);
  }
});
