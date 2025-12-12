// src/app/api/newsletter/route.ts
// FUTURE: API routes (monetization)
// POST /api/newsletter – join list

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
import { extractClientIp } from '@/lib/ipExtraction';

import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  // Validate input first
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const validation = newsletterSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid email', details: validation.error.flatten() },
      { status: 400 }
    );
  }

  // Rate limiting
  const ip = extractClientIp(request);

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