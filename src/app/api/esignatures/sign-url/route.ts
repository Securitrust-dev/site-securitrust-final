import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { companyName, email, siret } = await req.json();

    if (!companyName || !email) {
      return NextResponse.json(
        { error: 'Données manquantes (companyName, email)' },
        { status: 400 }
      );
    }

    // On prépare l'envoi à eSignatures.io
    const response = await fetch(`https://esignatures.io/api/contracts?token=${process.env.ESIGNATURES_API_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_id: process.env.ESIGNATURES_TEMPLATE_ID,
        signers: [
          {
            name: "Client",
            email: email,
            signature_request_delivery_method: "",
            signed_document_delivery_method: "email",
          }
        ],
        placeholder_fields: [
          {
            api_key: "companyName",
            value: companyName
          },
          {
            api_key: "siret",
            value: siret
          }
        ],
        test: "no",
        metadata: {
          custom_ref: "PROPOSITION-" + Date.now()
        }
      }),
    });

    const result = await response.json();

    if (result.data?.sign_page_url) {
      return NextResponse.json({ url: result.data.sign_page_url });
    } else {
      console.error("Erreur eSignature:", result);
      return NextResponse.json(
        { error: 'Erreur lors de la création du contrat chez le fournisseur' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
