// src/app/api/membership/route.ts
// FUTURE: handle Stripe/intents

import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  // TODO: Implement membership payment processing
  // - Validate membership tier
  // - Process payment with Stripe
  // - Create membership record
  // - Send confirmation email

  return NextResponse.json({
    message: 'Membership processing coming in Phase 2',
    status: 'pending'
  });
}