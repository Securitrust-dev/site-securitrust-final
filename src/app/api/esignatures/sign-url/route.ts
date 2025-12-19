import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, email, siret } = body;

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

      console.log('📄 Création du contrat eSignatures.io');
      console.log('📧 Email:', email);
      console.log('🏢 Entreprise:', companyName);
      console.log('📋 Template ID:', templateId);

        // Créer le contrat via l'API eSignatures.io (token dans URL)
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
                  name: companyName,
                  email: email,
                  mobile: '+33600000000',
                  redirect_url: redirectUrl
                }],
              placeholder_fields: siret ? [{
                api_key: 'siret',
                value: siret
              }] : [],
              test: 'yes'
            })
          });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API eSignatures.io:', response.status, errorText);
      return NextResponse.json(
        { error: `Erreur API eSignatures.io: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

      const data = await response.json();
      console.log('✅ Contrat créé avec succès');
      console.log('📝 Contract ID:', data?.data?.contract?.id);
      console.log('📊 Signers data:', JSON.stringify(data?.data?.contract?.signers, null, 2));

        // Extraire l'URL de signature du premier signataire
        const contractData = data?.data?.contract;
        const firstSigner = contractData?.signers?.[0];
        
        console.log('👤 Premier signataire:', JSON.stringify(firstSigner, null, 2));
        
        const signPageUrl = firstSigner?.sign_page_url;

      if (!signPageUrl) {
        console.error('❌ URL de signature non trouvée');
        console.error('Structure reçue:', JSON.stringify(data, null, 2));
        return NextResponse.json(
          { error: 'URL de signature non trouvée dans la réponse API', apiResponse: data },
          { status: 500 }
        );
      }

      console.log('✅ URL de signature trouvée:', signPageUrl);

      return NextResponse.json({
        success: true,
        url: signPageUrl,
        contractId: contractData?.id,
        message: 'Contrat créé avec succès'
      });

  } catch (error: any) {
    console.error('❌ Erreur lors de la création du contrat:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erreur lors de la création du contrat',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}

// GET endpoint pour vérifier le statut d'un contrat
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contractId = searchParams.get('contractId');

    if (!contractId) {
      return NextResponse.json(
        { error: 'contractId requis' },
        { status: 400 }
      );
    }

    const apiToken = process.env.ESIGNATURES_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'Configuration manquante: ESIGNATURES_API_TOKEN' },
        { status: 500 }
      );
    }

        const apiUrl = `https://esignatures.io/api/contracts/${contractId}?token=${apiToken}`;
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erreur API eSignatures.io:', response.status, errorText);
      return NextResponse.json(
        { error: `Erreur API eSignatures.io: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      status: data?.data?.contract?.status,
      contract: data?.data?.contract
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de la vérification du statut:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Erreur lors de la vérification du statut',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
