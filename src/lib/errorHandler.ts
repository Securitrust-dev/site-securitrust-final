import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
}

export class AppError extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number = 500, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  // Security: Never expose stack traces or detailed error info to client
  
  // Log error server-side (sanitized)
  if (error instanceof Error) {
    console.error('[API_ERROR]', {
      name: error.name,
      message: error.message,
      // Don't log full stack trace in production
      ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
    });
  } else {
    console.error('[API_ERROR]', error);
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        details: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 400 }
    );
  }

  // Handle custom AppError
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        ...(error.code && { code: error.code }),
      },
      { status: error.statusCode }
    );
  }

  // Handle Stripe errors
  if (error && typeof error === 'object' && 'type' in error) {
    const stripeError = error as { type: string; message?: string };
    
    if (stripeError.type === 'StripeCardError') {
      return NextResponse.json(
        { error: 'Payment failed. Please check your card details.' },
        { status: 400 }
      );
    }
    
    if (stripeError.type === 'StripeRateLimitError') {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    if (stripeError.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid request. Please check your input.' },
        { status: 400 }
      );
    }
  }

  // Generic error response (don't expose internal details)
  return NextResponse.json(
    {
      error: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : (error instanceof Error ? error.message : 'Unknown error'),
    },
    { status: 500 }
  );
}

// Utility to log security events
export function logSecurityEvent(
  event: string,
  details: Record<string, any>,
  severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
) {
  // Sanitize details to avoid logging PII
  const sanitized = { ...details };
  
  // Redact sensitive fields
  if (sanitized.email) {
    const [user, domain] = sanitized.email.split('@');
    sanitized.email = `${user.substring(0, 2)}***@${domain}`;
  }
  
  if (sanitized.ip) {
    sanitized.ip = sanitized.ip.substring(0, 8) + '***';
  }

  console.warn(`[SECURITY_${severity.toUpperCase()}]`, event, sanitized);
  
  // In production, you should send this to a logging service
  // e.g., Sentry, Datadog, CloudWatch, etc.
}
