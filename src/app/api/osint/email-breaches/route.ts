import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    console.log('🔍 Vérification XON pour:', email);

    // Appel à l'API XposedOrNot
    const response = await fetch(
      `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'SecuriTrust-OSINT/1.0',
        },
      }
    );

    console.log('📊 Statut réponse XON:', response.status);

    // Si 404, aucune fuite trouvée
    if (response.status === 404) {
      return NextResponse.json({
        email,
        totalBreaches: 0,
        breaches: [],
        message: '✅ Aucune fuite de données détectée',
      });
    }

    if (!response.ok) {
      throw new Error(`XON API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Données XON reçues:', data);

    // Format XON response
    // XON retourne: { "breaches": ["breach1", "breach2", ...], "exposures": [...] }
    const breaches = data.breaches || [];
    const exposures = data.exposures || data.ExposedBreaches?.breaches_details || [];

    // Transformer les données XON au format attendé par le frontend
    const formattedBreaches = exposures.map((breach: any) => ({
      name: breach.breach || breach.name || 'Inconnu',
      title: breach.breach || breach.name || 'Fuite de données',
      breachDate: breach.breach_date || breach.date || new Date().toISOString(),
      pwnCount: breach.passwords_count || breach.records || 0,
      description: breach.description || `Données exposées de ${breach.breach || 'source inconnue'}`,
      domain: breach.domain || null,
      dataClasses: breach.data_classes || breach.exposed_data || [],
      isVerified: breach.verified || false,
      logo: breach.logo || null,
      industry: breach.industry || null,
    }));

    return NextResponse.json({
      email,
      totalBreaches: breaches.length,
      breaches: formattedBreaches,
      message: breaches.length > 0 
        ? `⚠️ ${breaches.length} fuite(s) détectée(s)` 
        : '✅ Aucune fuite détectée',
    });

  } catch (error: any) {
    console.error('❌ Erreur XON API:', error);
    
    // En cas d'erreur, retourner une réponse neutre plutôt qu'une erreur
    return NextResponse.json(
      { 
        error: 'Service temporairement indisponible',
        details: error.message 
      },
      { status: 503 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';