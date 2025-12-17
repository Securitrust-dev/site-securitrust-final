import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { companyName, email, siret } = await req.json();

    // Vérification de base
    if (!companyName || !email) {
      console.error("❌ Données manquantes:", { companyName, email });
      return NextResponse.json(
        { error: 'Données manquantes (companyName, email)' },
        { status: 400 }
      );
    }

    console.log("🚀 Envoi vers eSignatures.io...", { companyName, email });

    const response = await fetch(`https://esignatures.io/api/contracts?token=${process.env.ESIGNATURES_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        // ON ENVOIE SEULEMENT COMPANYNAME
        placeholder_fields: [
          {
            api_key: "companyName", 
            value: companyName
          }
        ],
        test: "no", // Passez à "yes" si vous voulez économiser vos crédits
        metadata: {
          custom_ref: "PROPOSITION-" + Date.now()
        }
      }),
    });

    const result = await response.json();

    // Si eSignatures renvoie une erreur, on l'affiche dans les logs Vercel pour comprendre
    if (!response.ok) {
      console.error("❌ ERREUR E-SIGNATURES:", JSON.stringify(result, null, 2));
      return NextResponse.json(
        { error: `Erreur fournisseur: ${result.message || JSON.stringify(result)}` }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.data.sign_page_url });

  } catch (error: any) {
    console.error('❌ CRASH API:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
