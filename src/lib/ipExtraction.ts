// src/lib/ipExtraction.ts
import { NextRequest } from 'next/server';

/**
 * Extract client IP address from NextRequest headers
 * Prioritizes Vercel-specific headers for security and reliability when deployed on Vercel.
 * Falls back to standard headers for other deployment environments with trusted proxy configs.
 * 
 * @param request - The NextRequest object
 * @returns The client IP address or 'unknown' if not found
 */
export function extractClientIp(request: NextRequest): string {
  // Check if running on Vercel by looking for Vercel-specific environment
  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
  
  if (isVercel) {
    // Prioritize Vercel's proprietary headers (sanitized and trusted)
    const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
    if (vercelForwardedFor) {
      return vercelForwardedFor.split(',')[0]?.trim();
    }
    
    const vercelRealIp = request.headers.get('x-real-ip');
    if (vercelRealIp) {
      return vercelRealIp.trim();
    }
    
    // Check for other Vercel IP headers for validation (these indicate Vercel processing is active)
    const vercelIpCountry = request.headers.get('x-vercel-ip-country');
    const vercelIpRegion = request.headers.get('x-vercel-ip-region');
    // Note: These headers don't contain the actual IP but confirm Vercel's IP processing
    
    // If we're on Vercel but don't have the expected headers, something may be wrong
    if (!vercelForwardedFor && !vercelRealIp && !vercelIpCountry && !vercelIpRegion) {
      console.warn('Running on Vercel but no Vercel IP headers found');
    }
  }
  
  // Fallback to standard headers for non-Vercel deployments with trusted proxy configs
  // WARNING: These can be spoofed by clients and should only be used with verified trusted proxies
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  
  return 'unknown';
}