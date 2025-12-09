// src/lib/rateLimit.ts
// Database-backed rate limiter for multi-instance deployments
import { PrismaClient } from '.prisma/client/default';

// Create a global Prisma instance to avoid connection exhaustion
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

globalForPrisma.prisma = prisma;
// Rate limit configuration
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per window

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime?: number;
  retryAfter?: number; // seconds until next request allowed
}

/**
 * Check rate limit for an IP address using database-backed storage
 * Uses atomic transactions to prevent race conditions in multi-instance deployments
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  // Handle missing or unknown IPs as fallback case (fail-open with shared bucket)
  let rateLimitKey = ip;
  
  if (!ip || ip === 'unknown') {
    rateLimitKey = 'fallback:unknown';
    console.warn('Rate limit check with missing/unknown IP', {
      originalIp: ip,
      fallbackKey: rateLimitKey,
      timestamp: new Date().toISOString(),
      context: 'Using shared fallback bucket for rate limiting'
    });
  }

  const now = Date.now();
  const resetTime = now + WINDOW_MS;

  try {
    // Use a transaction to atomically check and update the rate limit
    const result = await prisma.$transaction(async (tx) => {
      // Try to find existing rate limit entry
      const existingEntry = await tx.rateLimit.findUnique({
        where: { ip: rateLimitKey }
      });

      if (!existingEntry || now > Number(existingEntry.resetTime)) {
        // No entry exists or window has expired - create/reset
        await tx.rateLimit.upsert({
          where: { ip: rateLimitKey },
          update: {
            count: 1,
            resetTime: BigInt(resetTime)
          },
          create: {
            ip: rateLimitKey,
            count: 1,
            resetTime: BigInt(resetTime)
          }
        });

        return {
          allowed: true,
          remaining: MAX_REQUESTS - 1,
          resetTime
        };
      }

      // Entry exists and window is still active
      if (existingEntry.count >= MAX_REQUESTS) {
        // Rate limit exceeded
        const remaining = 0;
        const retryAfter = Math.ceil((Number(existingEntry.resetTime) - now) / 1000);
        
        return {
          allowed: false,
          remaining,
          resetTime: Number(existingEntry.resetTime),
          retryAfter: Math.max(1, retryAfter) // Ensure at least 1 second
        };
      }

      // Increment counter
      const newCount = existingEntry.count + 1;
      await tx.rateLimit.update({
        where: { ip: rateLimitKey },
        data: { count: newCount }
      });

      return {
        allowed: true,
        remaining: MAX_REQUESTS - newCount,
        resetTime: Number(existingEntry.resetTime)
      };
    });

    return result;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open - allow request but with minimal remaining
    return {
      allowed: true,
      remaining: 1,
      resetTime: now + WINDOW_MS
    };
  }
}

/**
 * Clean up expired rate limit entries
 * Should be called periodically to prevent database bloat
 */
export async function cleanupExpiredRateLimits(): Promise<void> {
  const now = Date.now();
  
  try {
    const result = await prisma.rateLimit.deleteMany({
      where: {
        resetTime: {
          lt: BigInt(now)
        }
      }
    });
    
    if (result.count > 0) {
      console.log(`Cleaned up ${result.count} expired rate limit entries`);
    }
  } catch (error) {
    console.error('Failed to clean up expired rate limits:', error);
  }
}

/**
 * For backward compatibility - these functions are no-ops now
 * since cleanup is handled on-demand or via cron jobs
 */
export function startRateLimitCleanup(): void {
  // No-op: cleanup now handled differently for database-backed storage
}

export function stopRateLimitCleanup(): void {
  // No-op: cleanup now handled differently for database-backed storage
}