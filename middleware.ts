import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiting (for production, use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration per route pattern
const RATE_LIMITS = {
  '/api/stripe': { limit: 10, window: 60000 }, // 10 req/min
  '/api/webhooks': { limit: 100, window: 60000 }, // 100 req/min (webhooks burst)
  '/api/upload': { limit: 5, window: 60000 }, // 5 req/min
  '/api/osint': { limit: 10, window: 60000 }, // 10 req/min
  '/api/hibp': { limit: 10, window: 60000 }, // 10 req/min
  '/api/checkout': { limit: 5, window: 60000 }, // 5 req/min
  '/api/proposal': { limit: 10, window: 60000 }, // 10 req/min
  '/api/docusign': { limit: 5, window: 60000 }, // 5 req/min
  '/api/opensign': { limit: 5, window: 60000 }, // 5 req/min
  default: { limit: 30, window: 60000 }, // 30 req/min for all other APIs
};

function getRateLimitKey(ip: string, path: string): string {
  return `${ip}:${path}`;
}

function getRateLimitConfig(path: string): { limit: number; window: number } {
  for (const [pattern, config] of Object.entries(RATE_LIMITS)) {
    if (pattern !== 'default' && path.startsWith(pattern)) {
      return config;
    }
  }
  return RATE_LIMITS.default;
}

function checkRateLimit(
  ip: string,
  path: string,
  limit: number,
  window: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const key = getRateLimitKey(ip, path);
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + window });
    return { allowed: true, remaining: limit - 1, resetTime: now + window };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime };
}

// Clean up old entries periodically (basic memory management)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 300000); // Clean every 5 minutes

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only apply to API routes
  if (pathname.startsWith('/api')) {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Rate limiting
    const config = getRateLimitConfig(pathname);
    const rateLimitResult = checkRateLimit(ip, pathname, config.limit, config.window);

    // CORS handling
    const origin = request.headers.get('origin');
    const isProduction = process.env.NODE_ENV === 'production';
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    
    // In production, only allow specific origins. In dev, allow localhost
    const isAllowedOrigin = isProduction
      ? origin && allowedOrigins.includes(origin)
      : origin?.includes('localhost') || origin?.includes('127.0.0.1');

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 204 });
      
      if (isAllowedOrigin && origin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
      
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, stripe-signature');
      response.headers.set('Access-Control-Max-Age', '86400');
      
      return response;
    }

    // Block if rate limit exceeded
    if (!rateLimitResult.allowed) {
      const response = NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        },
        { status: 429 }
      );

      response.headers.set('X-RateLimit-Limit', String(config.limit));
      response.headers.set('X-RateLimit-Remaining', '0');
      response.headers.set('X-RateLimit-Reset', String(Math.ceil(rateLimitResult.resetTime / 1000)));
      response.headers.set('Retry-After', String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)));

      // Security logging (without PII)
      console.warn(`[SECURITY] Rate limit exceeded: ${pathname} from IP ${ip.slice(0, 8)}***`);

      return response;
    }

    // Create response and add rate limit headers
    const response = NextResponse.next();
    
    response.headers.set('X-RateLimit-Limit', String(config.limit));
    response.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(rateLimitResult.resetTime / 1000)));

    // Add CORS headers for allowed origins
    if (isAllowedOrigin && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    } else if (pathname.startsWith('/api/webhooks')) {
      // Webhooks from Stripe/DocuSign/OpenSign don't need CORS
      // They're server-to-server
    } else if (!isProduction) {
      // In development, allow all origins for easier testing
      response.headers.set('Access-Control-Allow-Origin', origin || '*');
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
