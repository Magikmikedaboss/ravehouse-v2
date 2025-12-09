// src/lib/rateLimit.ts
// Simple in-memory rate limiter for API endpoints
// FUTURE: Replace with Redis-based rate limiting for production

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Per-IP locks to prevent race conditions
const locks = new Map<string, Promise<void>>();

// Rate limit configuration
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per window

// Background cleanup job - lazy initialized
let cleanupIntervalId: NodeJS.Timeout | null = null;

export function startRateLimitCleanup() {
  if (cleanupIntervalId !== null) return; // Already started
  
  cleanupIntervalId = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000); // 5 minutes
}

export function stopRateLimitCleanup() {
  if (cleanupIntervalId !== null) {
    clearInterval(cleanupIntervalId);
    cleanupIntervalId = null;
  }
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; resetTime?: number }> {
  if (!ip || ip === 'unknown') {
    return { allowed: false };
  }

  // Acquire lock with atomic check-and-set to avoid TOCTOU
  let resolveLock!: () => void;
  const newLock = new Promise<void>((resolve) => {
    resolveLock = resolve;
  });
  // Loop until we can set our lock without awaiting between check and set
  for (;;) {
    const existing = locks.get(ip);
    if (existing) {
      await existing; // wait for current holder to finish, then retry
      continue;
    }
    // No existing lock; set ours atomically and break
    locks.set(ip, newLock);
    break;
  }
  try {
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
  } finally {
    // Release the lock
    if (resolveLock) {
      resolveLock();
    }
    locks.delete(ip);
  }
}