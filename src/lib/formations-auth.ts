import { cookies } from 'next/headers';

const COOKIE_NAME = 'formation_access';
const SECRET = process.env.STRIPE_SECRET_KEY!; // Reuse as HMAC secret

export async function generateAccessToken(email: string, formationSlug: string): Promise<string> {
  const payload = {
    email,
    formationSlug,
    iat: Date.now(),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET.slice(0, 32)),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, data);
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const token = btoa(JSON.stringify(payload)) + '.' + sigHex;
  return token;
}

export async function verifyAccessToken(
  token: string
): Promise<{ valid: boolean; email?: string; formationSlug?: string }> {
  try {
    const [payloadB64, sigHex] = token.split('.');
    if (!payloadB64 || !sigHex) return { valid: false };

    const payload = JSON.parse(atob(payloadB64));
    if (payload.exp < Date.now()) return { valid: false };

    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(payload));
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(SECRET.slice(0, 32)),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const sigBytes = new Uint8Array(
      sigHex.match(/.{2}/g)!.map((byte: string) => parseInt(byte, 16))
    );
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, data);
    if (!valid) return { valid: false };

    return { valid: true, email: payload.email, formationSlug: payload.formationSlug };
  } catch {
    return { valid: false };
  }
}

export async function setAccessCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/',
  });
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function getAccessTokensFromCookie(): Promise<string[]> {
  const cookieStore = await cookies();
  const all: string[] = [];
  // We store multiple tokens as formation_access_<slug>
  for (const cookie of cookieStore.getAll()) {
    if (cookie.name.startsWith('formation_access_')) {
      all.push(cookie.value);
    }
  }
  // Also check the legacy single cookie
  const single = cookieStore.get(COOKIE_NAME)?.value;
  if (single) all.push(single);
  return all;
}

export async function setFormationAccessCookie(formationSlug: string, token: string) {
  const cookieStore = await cookies();
  cookieStore.set(`formation_access_${formationSlug}`, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
}

export async function getFormationAccessToken(formationSlug: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(`formation_access_${formationSlug}`)?.value;
}
