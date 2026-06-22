import { NextRequest, NextResponse } from 'next/server';

function isAuthorizedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://securitrust.fr';
  return origin.startsWith(appUrl) || origin.startsWith('http://localhost');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  if (!isAuthorizedOrigin(request)) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      companyName,
      email,
      signerName,
    } = body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      );
    }

    const apiToken = process.env.SIGNWELL_API_KEY;
    const templateId = process.env.SIGNWELL_TEMPLATE_ID;

    if (!apiToken || !templateId) {
      return NextResponse.json(
        { error: 'Configuration manquante: SIGNWELL_API_KEY ou SIGNWELL_TEMPLATE_ID' },
        { status: 500 }
      );
    }

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const apiUrl = 'https://www.signwell.com/api/v1/document_templates/documents/';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiToken
        },
        body: JSON.stringify({
          test_mode: process.env.NODE_ENV !== 'production',
          template_id: templateId,
          subject: 'Complétez votre contrat pentest au résultat',
          name: `Contrat - ${signerName || companyName || 'Client'}`,
          recipients: [
            {
              id: '1',
              placeholder_name: 'Client',
              name: signerName || companyName || 'Client',
              email: email,
              redirect_url: `${appUrl}/signature-complete`
            },
            {
              id: '2',
              placeholder_name: 'Jad Joumblat',
              name: 'Jad Joumblat',
              email: 'jad.joumblat@securitrust.fr'
            }
          ],
          draft: false,
          embedded_signing: false
        })
      });

      // Read body once as raw text
      const rawText = await response.text();

      if (!response.ok) {
        console.error(`SignWell HTTP ${response.status}:`, rawText);
        let errorData: any = { raw: rawText };
        try { errorData = JSON.parse(rawText); } catch (_) {}
        return NextResponse.json(
          { error: `Erreur API SignWell (HTTP ${response.status})`, details: errorData, httpStatus: response.status },
          { status: 502 }
        );
      }

      let data: any = {};
      try {
        data = JSON.parse(rawText);
      } catch (_) {
        return NextResponse.json({ error: 'Réponse SignWell non-JSON', raw: rawText }, { status: 502 });
      }

      // SignWell returns the signing URL in recipients[0].signing_url
      const signingUrl = data.recipients?.[0]?.signing_url || data.recipients?.[0]?.embedded_signing_url;

    if (!signingUrl) {
      console.error('SignWell success response (no URL):', JSON.stringify(data, null, 2));
      return NextResponse.json({ error: 'URL de signature non trouvée', data }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: signingUrl,
      documentId: data.id
    });

  } catch (error: any) {
    console.error('SignWell API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur interne' },
      { status: 500 }
    );
  }
}
