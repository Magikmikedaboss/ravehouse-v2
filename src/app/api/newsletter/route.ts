// src/app/api/newsletter/route.ts
// FUTURE: API routes (monetization)
// POST /api/newsletter – join list

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown';

  const rateLimitResult = await checkRateLimit(ip);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        error: 'Too many requests',
        retryAfter: rateLimitResult.retryAfter 
      },
      { 
        status: 429,
        headers: {
          'Retry-After': rateLimitResult.retryAfter?.toString() || '60'
        }
      }
    );
  }

  // TODO: Implement newsletter signup
  // - Validate email
  // - Add to mailing list
  // - Return success/error

  return NextResponse.json(
    {
      message: 'Newsletter signup coming in Phase 1',
      status: 'pending'
    },
    { status: 501 }
  );
}