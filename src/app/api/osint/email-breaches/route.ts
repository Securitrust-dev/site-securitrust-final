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
      const errorText = await response.text();
      console.error('❌ Erreur API XON:', response.status, errorText);
      throw new Error(`XON API error: ${response.status}`);
    }

    const rawData = await response.json();
    console.log('📦 Données brutes XON:', JSON.stringify(rawData, null, 2));

    // XON peut retourner différents formats selon les cas
    // Format possible 1: { breaches: [...], exposures: [...] }
    // Format possible 2: { ExposedBreaches: { breaches_details: [...] } }
    // Format possible 3: Array direct de breaches
    
    let breachList: string[] = [];
    let exposureDetails: any[] = [];

    // Essayer de détecter le format
    if (Array.isArray(rawData)) {
      // Format: tableau direct
      breachList = rawData;
      exposureDetails = rawData.map((item: any) => {
        if (typeof item === 'string') {
          return { breach: item };
        }
        return item;
      });
    } else if (rawData.breaches) {
      // Format: { breaches: [...], ... }
      breachList = Array.isArray(rawData.breaches) ? rawData.breaches : [];
      exposureDetails = rawData.exposures || rawData.breaches_details || [];
    } else if (rawData.ExposedBreaches) {
      // Format: { ExposedBreaches: { ... } }
      breachList = rawData.ExposedBreaches.breaches || [];
      exposureDetails = rawData.ExposedBreaches.breaches_details || [];
    } else if (rawData.exposures) {
      // Format: { exposures: [...] }
      exposureDetails = rawData.exposures;
      breachList = exposureDetails.map((e: any) => e.breach || e.name);
    }

    console.log('🔢 Nombre de fuites détectées:', breachList.length);
    console.log('📋 Liste des fuites:', breachList);

    // Si on n'a que la liste de noms sans détails, créer des objets basiques
    if (breachList.length > 0 && exposureDetails.length === 0) {
      exposureDetails = breachList.map((breachName: string) => ({
        breach: breachName,
        name: breachName,
      }));
    }

    // Transformer les données au format attendu par le frontend
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

    console.log('✅ Fuites formatées:', formattedBreaches.length);

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
    console.error('Stack trace:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors de la vérification',
        details: error.message,
        email: new URL(req.url).searchParams.get('email'),
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

---

## 🔍 Vérification des logs

Une fois déployé, faites un test et allez voir les logs Vercel :
```
Vercel → Functions → /api/osint/email-breaches → Logs