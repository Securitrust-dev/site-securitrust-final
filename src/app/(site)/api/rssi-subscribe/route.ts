import { NextRequest, NextResponse } from 'next/server';

function isAuthorizedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.securitrust.fr';
  return origin.startsWith(appUrl) || origin.startsWith('http://localhost');
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedOrigin(req)) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
  }

  const formData = await req.formData();

  const plan      = formData.get('plan')      as string;
  const planName  = formData.get('planName')  as string;
  const firstName = formData.get('firstName') as string;
  const lastName  = formData.get('lastName')  as string;
  const email     = formData.get('email')     as string;
  const company   = formData.get('company')   as string;
  const phone     = formData.get('phone')     as string;

  if (!firstName || !lastName || !email || !company || !phone || !plan) {
    return NextResponse.redirect(
      new URL(`/cyber-pilote/souscrire/${plan}?error=1`, req.url),
      { status: 303 }
    );
  }

  const apiToken    = process.env.SIGNWELL_API_KEY;
  const templateId  = process.env.SIGNWELL_TEMPLATE_ID;
  const appUrl      = process.env.NEXT_PUBLIC_APP_URL || 'https://www.securitrust.fr';

  if (!apiToken || !templateId) {
    return NextResponse.redirect(
      new URL(`/cyber-pilote/souscrire/${plan}?error=config`, req.url),
      { status: 303 }
    );
  }

  const signerName  = `${firstName} ${lastName}`;
  const confirmUrl  = `${appUrl}/cyber-pilote/souscrire/confirmation?plan=${plan}&nom=${encodeURIComponent(firstName)}`;

  const swRes = await fetch('https://www.signwell.com/api/v1/document_templates/documents/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': apiToken,
    },
    body: JSON.stringify({
      test_mode: false,
      template_id: templateId,
      subject: `Contrat Cyber-Pilote — Plan ${planName}`,
      name: `Contrat RSSI ${planName} - ${signerName}`,
      recipients: [
        {
          id: '1',
          placeholder_name: 'Client',
          name: signerName,
          email: email,
          redirect_url: confirmUrl,
        },
        {
          id: '2',
          placeholder_name: 'Jad Joumblat',
          name: 'Jad Joumblat',
          email: 'jad.joumblat@securitrust.fr',
        },
      ],
      fields: [
        { api_id: 'company',   value: company },
        { api_id: 'phone',     value: phone },
        { api_id: 'plan',      value: `RSSI ${planName}` },
      ],
      draft: false,
      embedded_signing: false,
    }),
  });

  if (!swRes.ok) {
    console.error('SignWell error', swRes.status, await swRes.text());
    return NextResponse.redirect(
      new URL(`/cyber-pilote/souscrire/${plan}?error=signwell`, req.url),
      { status: 303 }
    );
  }

  const data = await swRes.json();
  const signingUrl: string | undefined = data.recipients?.[0]?.signing_url;

  if (!signingUrl) {
    console.error('SignWell: no signing_url', JSON.stringify(data));
    return NextResponse.redirect(
      new URL(`/cyber-pilote/souscrire/${plan}?error=nourl`, req.url),
      { status: 303 }
    );
  }

  // Redirect user directly to SignWell to sign their contract
  return NextResponse.redirect(signingUrl, { status: 303 });
}
