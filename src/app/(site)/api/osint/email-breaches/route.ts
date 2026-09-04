import { NextRequest, NextResponse } from 'next/server';

function isAuthorizedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer') ?? '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.securitrust.fr';
  return origin.startsWith(appUrl) || origin.startsWith('http://localhost');
}

export async function GET(req: NextRequest) {
  if (!isAuthorizedOrigin(req)) {
    return NextResponse.json({ error: 'Accès non autorisé' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

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

    if (response.status === 404) {
      return NextResponse.json({
        email,
        totalBreaches: 0,
        breaches: [],
        message: '✅ Aucune fuite de données détectée',
      });
    }

    if (!response.ok) {
      console.error('❌ Erreur API XON:', response.status);
      throw new Error(`XON API error: ${response.status}`);
    }

    const rawData = await response.json();

    let breachList: string[] = [];
    let exposureDetails: any[] = [];

    if (Array.isArray(rawData)) {
      breachList = rawData;
      exposureDetails = rawData.map((item: any) => {
        if (typeof item === 'string') {
          return { breach: item };
        }
        return item;
      });
    } else if (rawData.breaches) {
      breachList = Array.isArray(rawData.breaches) ? rawData.breaches : [];
      exposureDetails = rawData.exposures || rawData.breaches_details || [];
    } else if (rawData.ExposedBreaches) {
      breachList = rawData.ExposedBreaches.breaches || [];
      exposureDetails = rawData.ExposedBreaches.breaches_details || [];
    } else if (rawData.exposures) {
      exposureDetails = rawData.exposures;
      breachList = exposureDetails.map((e: any) => e.breach || e.name);
    }

    if (breachList.length > 0 && exposureDetails.length === 0) {
      exposureDetails = breachList.map((breachName: string) => ({
        breach: breachName,
        name: breachName,
      }));
    }

    const formattedBreaches = exposureDetails.map((breach: any) => {
      const breachName = breach.breach || breach.name || breach.title || 'Fuite de données';
      
      return {
        name: breachName,
        title: breachName,
        breachDate: breach.breach_date || breach.date || breach.BreachDate || new Date().toISOString(),
        pwnCount: breach.passwords_count || breach.records || breach.PwnCount || 0,
        description: breach.description || breach.Description || `Données compromises dans ${breachName}`,
        domain: breach.domain || breach.Domain || null,
        dataClasses: breach.data_classes || breach.exposed_data || breach.DataClasses || ['Données personnelles'],
        isVerified: breach.verified || breach.IsVerified || false,
        logo: breach.logo || breach.LogoPath || null,
        industry: breach.industry || breach.Industry || null,
      };
    });

    return NextResponse.json({
      email,
      totalBreaches: breachList.length,
      breaches: formattedBreaches,
      message: breachList.length > 0 
        ? `⚠️ ${breachList.length} fuite(s) détectée(s)` 
        : '✅ Aucune fuite détectée',
    });

  } catch (error: any) {
    console.error('❌ Erreur XON API:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';