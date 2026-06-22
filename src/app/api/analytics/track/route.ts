import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/db';

function isAuthorizedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://securitrust.fr';
  return origin.startsWith(appUrl) || origin.startsWith('http://localhost');
}

// Create table on first use
async function ensureTable() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      referrer TEXT,
      device_type TEXT,
      country TEXT,
      ip TEXT,
      duration INTEGER,
      created_at TEXT NOT NULL
    )
  `);
  // Add ip column if table already existed without it
  try {
    await client.execute(`ALTER TABLE page_views ADD COLUMN ip TEXT`);
  } catch { /* column already exists */ }
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedOrigin(req)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  try {
    const body = await req.json();

    // sendBeacon sends POST with _method PATCH for duration updates
    if (body._method === 'PATCH') {
      const { sessionId, path, duration } = body;
      if (!sessionId || !path || !duration) return NextResponse.json({ ok: true });
      await ensureTable();
      await client.execute({
        sql: `UPDATE page_views SET duration = ? WHERE session_id = ? AND path = ? AND id = (
          SELECT id FROM page_views WHERE session_id = ? AND path = ? ORDER BY id DESC LIMIT 1
        )`,
        args: [duration, sessionId, path, sessionId, path],
      });
      return NextResponse.json({ ok: true });
    }

    const { path, sessionId, referrer, deviceType } = body;
    if (!path || !sessionId) return NextResponse.json({ ok: false }, { status: 400 });

    // Get country and IP from headers
    const country = req.headers.get('x-vercel-ip-country') || null;
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null;

    await ensureTable();
    await client.execute({
      sql: `INSERT INTO page_views (session_id, path, referrer, device_type, country, ip, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        sessionId,
        path,
        referrer || null,
        deviceType || 'desktop',
        country,
        ip,
        new Date().toISOString(),
      ],
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
