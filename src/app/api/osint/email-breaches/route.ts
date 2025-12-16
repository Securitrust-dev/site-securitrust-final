import { NextRequest, NextResponse } from 'next/server';
import { emailBreachesSchema } from '@/lib/validation';
import { handleApiError, logSecurityEvent } from '@/lib/errorHandler';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    // Validate input
    const validated = emailBreachesSchema.parse({ email });

    const apiKey = process.env.HIBP_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'HIBP API key not configured' },
        { status: 500 }
      );
    }

    // Log request (sanitized)
    logSecurityEvent('HIBP breach check', { 
      email: validated.email.substring(0, 3) + '***'
    }, 'low');

    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(validated.email)}?truncateResponse=false`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'user-agent': 'SecuriTrust-OSINT',
        },
      }
    );

    if (response.status === 404) {
      return NextResponse.json({
        email: validated.email,
        totalBreaches: 0,
        breaches: [],
      });
    }

    if (!response.ok) {
      throw new Error(`HIBP API error: ${response.status}`);
    }

    const breaches = await response.json();

    return NextResponse.json({
      email: validated.email,
      totalBreaches: breaches.length,
      breaches: breaches.map((breach: any) => ({
        name: breach.Name,
        title: breach.Title,
        domain: breach.Domain,
        breachDate: breach.BreachDate,
        addedDate: breach.AddedDate,
        pwnCount: breach.PwnCount,
        description: breach.Description,
        dataClasses: breach.DataClasses,
        isVerified: breach.IsVerified,
        isSensitive: breach.IsSensitive,
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}