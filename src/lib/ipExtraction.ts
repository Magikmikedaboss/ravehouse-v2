// src/lib/ipExtraction.ts
import { NextRequest } from 'next/server';

/**
 * Extract client IP address from NextRequest headers
 * @param request - The NextRequest object
 * @returns The client IP address or 'unknown' if not found
 */
export function extractClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         request.headers.get('x-real-ip') ||
         'unknown';
}