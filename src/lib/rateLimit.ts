// src/lib/rateLimit.ts
// Simple in-memory rate limiter for API endpoints
// FUTURE: Replace with Redis-based rate limiting for production

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Rate limit configuration
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5; // 5 requests per window

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; resetTime?: number }> {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // First request or window expired, create new entry
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    // Rate limit exceeded
    return { allowed: false, resetTime: entry.resetTime };
  }

  // Increment counter
  entry.count++;
  return { allowed: true };
}