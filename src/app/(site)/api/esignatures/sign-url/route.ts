import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      companyName, 
      email, 
      siret, 
      signerName,
      activeDirectoryList,
      testAccounts,
      timeSlots,
      urgencyContact,
      techRestrictions
    } = body;

    if (!companyName || !email) {
      return NextResponse.json(
        { error: 'Données manquantes (companyName, email requis)' },
        { status: 400 }
      );
    }

    const apiToken = process.env.ESIGNATURES_API_TOKEN;
    const templateId = process.env.ESIGNATURES_TEMPLATE_ID || '7106054d-70b9-43b0-8233-9efed49d8053';

    if (!apiToken) {
      return NextResponse.json(
        { error: 'Configuration manquante: ESIGNATURES_API_TOKEN' },
        { status: 500 }
      );
    }

    const apiUrl = `https://esignatures.io/api/contracts?token=${apiToken}`;
    
    const webhookUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/esignatures`
      : 'https://site-securitrust-final.vercel.app/api/webhooks/esignatures';

    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/signer-proposition/success`
      : 'https://site-web-aura-3d-s-curitrust.vercel.app/signer-proposition/success';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        template_id: templateId,
        title: `Proposition SecuriTrust - ${companyName}`,
        custom_webhook_url: webhookUrl,
        signers: [{
          name: signerName || companyName,
          email: email,
          mobile: '+33600000000',
          redirect_url: redirectUrl,
          // CONFIGURATION SANS CHECKBOX
            fields: [
              {
                api_key: 'siret',
                // On laisse "value" vide pour forcer l'utilisateur à taper.
                value: '', 
                required: true
              },
              {
                api_key: 'signer_name',
                value: '', 
                required: true
              },
              {
                api_key: 'active_directory_list',
                value: activeDirectoryList || '',
                required: false
              },
              {
                api_key: 'test_accounts',
                value: testAccounts || '',
                required: false
              },
              {
                api_key: 'time_slots',
                value: timeSlots || '',
                required: false
              },
              {
                api_key: 'urgency_contact',
                value: urgencyContact || '',
                required: false
              },
              {
                api_key: 'tech_restrictions',
                value: techRestrictions || '',
                required: false
              }
            ]
          }],
          placeholder_fields: [
            { api_key: 'company_name', value: companyName },
            { api_key: 'siret', value: siret },
            { api_key: 'signer_name', value: signerName },
            { api_key: 'active_directory_list', value: activeDirectoryList || 'À préciser' },
            { api_key: 'test_accounts', value: testAccounts || 'À préciser' },
            { api_key: 'time_slots', value: timeSlots || 'À préciser' },
            { api_key: 'urgency_contact', value: urgencyContact || 'À préciser' },
            { api_key: 'tech_restrictions', value: techRestrictions || 'À préciser' }
          ],
        test: 'no'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Erreur API eSignatures.io: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const signPageUrl = data?.data?.contract?.signers?.[0]?.sign_page_url;

    if (!signPageUrl) {
      return NextResponse.json({ error: 'URL non trouvée' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      url: signPageUrl,
      contractId: data?.data?.contract?.id
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('contractId');
    const apiToken = process.env.ESIGNATURES_API_TOKEN;
    if (!contractId || !apiToken) return NextResponse.json({ error: 'Manquant' }, { status: 400 });
    const apiUrl = `https://esignatures.io/api/contracts/${contractId}?token=${apiToken}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return NextResponse.json({ success: true, status: data?.data?.contract?.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}