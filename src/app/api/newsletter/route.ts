// src/app/api/newsletter/route.ts
// FUTURE: API routes (monetization)
// POST /api/newsletter – join list

import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {  // TODO: Implement newsletter signup
  // - Validate email
  // - Add to mailing list
  // - Return success/error

  return NextResponse.json({
    message: 'Newsletter signup coming in Phase 1',
    status: 'pending'
  });
}