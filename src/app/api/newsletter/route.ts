// src/app/api/newsletter/route.ts
// FUTURE: API routes (monetization)
// POST /api/newsletter – join list

import { NextRequest, NextResponse } from 'next/server';

import { checkRateLimit, startRateLimitCleanup } from '@/lib/rateLimit';

// Initialize rate limit cleanup on module load
startRateLimitCleanup();

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             null;

  if (!ip) {
    return NextResponse.json(
      { error: 'Unable to identify request origin' },
      { status: 400 }
    );
  }

  const rateLimitResult = await checkRateLimit(ip);  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
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