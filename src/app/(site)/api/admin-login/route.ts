import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const COOKIE_NAME = 'st_admin_auth';

function createSessionToken(key: string): string {
  return createHmac('sha256', key).update('admin:session:v1').digest('hex');
}

export async function POST(req: NextRequest) {
  const dashboardKey = process.env.DASHBOARD_KEY;

  if (!dashboardKey) {
    console.error('DASHBOARD_KEY non configurée');
    return NextResponse.json({ error: 'Configuration serveur manquante' }, { status: 500 });
  }

  const { password } = await req.json();

  if (password !== dashboardKey) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
  }

  const sessionToken = createSessionToken(dashboardKey);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8h
    path: '/',
  });
  return res;
}
