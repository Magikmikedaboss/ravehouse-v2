// src/lib/ipExtraction.ts
import { NextRequest } from 'next/server';

/**
 * Normalize and validate an IP address, stripping port if present
 * @param candidate - Raw IP candidate that may include port
 * @returns Validated IP address or null if invalid
 */
function normalizeIp(candidate: string): string | null {
  if (!candidate) return null;
  
  // Strip port from IPv4 (e.g., "192.168.1.1:8080" -> "192.168.1.1")
  // For IPv6, this is more complex but we'll handle basic cases
  let ip = candidate;
  
  // Handle IPv4 with port
  if (ip.includes(':') && !ip.includes('::')) {
    const lastColonIndex = ip.lastIndexOf(':');
    const afterColon = ip.slice(lastColonIndex + 1);
    // Check if after colon is a port number (digits only)
    if (/^\d+$/.test(afterColon)) {
      ip = ip.slice(0, lastColonIndex);
    }
  }
  
  // Handle IPv6 with port [::1]:8080
  if (ip.startsWith('[') && ip.includes(']:')) {
    const bracketIndex = ip.lastIndexOf(']:');
    ip = ip.slice(1, bracketIndex); // Remove brackets
  }
  
  ip = ip.trim();
  
  // Basic IPv4 validation
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(ip)) {
    return ip;
  }
  
  // Basic IPv6 validation (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/;
  if (ipv6Regex.test(ip)) {
    return ip;
  }
  
  // Invalid IP format
  return null;
}

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
      const trimmedIp = vercelForwardedFor.split(',')[0]?.trim();
      if (trimmedIp && trimmedIp.length > 0) {
        return trimmedIp;
      }
    }
    
    const vercelRealIp = request.headers.get('x-real-ip');
    if (vercelRealIp) {
      const trimmedIp = vercelRealIp.trim();
      if (trimmedIp && trimmedIp.length > 0) {
        return trimmedIp;
      }
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
    const trimmedIp = forwardedFor.split(',')[0]?.trim();
    if (trimmedIp && trimmedIp.length > 0) {
      const normalizedIp = normalizeIp(trimmedIp);
      if (normalizedIp) {
        return normalizedIp;
      }
    }
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    const trimmedIp = realIp.trim();
    if (trimmedIp && trimmedIp.length > 0) {
      const normalizedIp = normalizeIp(trimmedIp);
      if (normalizedIp) {
        return normalizedIp;
      }
    }
  }
  
  return 'unknown';
}