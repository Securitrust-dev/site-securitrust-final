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
    const searchParams = req.nextUrl.searchParams;
    const domain = searchParams.get('domain');
    
    if (!domain) {
      return NextResponse.json(
        { error: 'Le paramètre domain est requis' },
        { status: 400 }
      );
    }

    const apiKey = process.env.HIBP_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Clé API HIBP non configurée' },
        { status: 500 }
      );
    }

    // Call HIBP API to get breaches for domain
    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breaches`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'User-Agent': 'Securitrust-OSINT'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
          { status: 429 }
        );
      }
      throw new Error(`HIBP API error: ${response.status}`);
    }

    const allBreaches = await response.json();
    
    // Filter breaches that might be relevant to the domain
    const relevantBreaches = allBreaches.filter((breach: any) => {
      const domainMatch = breach.Domain?.toLowerCase().includes(domain.toLowerCase()) ||
                         breach.Name?.toLowerCase().includes(domain.toLowerCase());
      return domainMatch;
    });

    const breachData = {
      totalBreaches: relevantBreaches.length,
      breaches: relevantBreaches.slice(0, 5).map((breach: any) => ({
        name: breach.Name,
        title: breach.Title,
        domain: breach.Domain,
        breachDate: breach.BreachDate,
        addedDate: breach.AddedDate,
        modifiedDate: breach.ModifiedDate,
        pwnCount: breach.PwnCount,
        description: breach.Description,
        dataClasses: breach.DataClasses,
        isVerified: breach.IsVerified,
        isFabricated: breach.IsFabricated,
        isSensitive: breach.IsSensitive,
        isRetired: breach.IsRetired,
        isSpamList: breach.IsSpamList
      }))
    };

    return NextResponse.json(breachData);

  } catch (error) {
    console.error('HIBP API error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification des fuites de données', totalBreaches: 0, breaches: [] },
      { status: 500 }
    );
  }
}
