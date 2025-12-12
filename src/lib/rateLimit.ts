// src/lib/rateLimit.ts
// Database-backed rate limiter for multi-instance deployments
import { prisma } from './prisma';
import crypto from 'crypto';

// Rate limit configuration
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per window
const MEMORY_CLEANUP_INTERVAL = 60 * 1000; // Clean memory store every minute
const MAX_MEMORY_ENTRIES = 1000; // Max entries in memory store before LRU eviction

// In-memory fallback store for when database is unavailable
const memoryStore = new Map<string, { count: number; resetTime: number; lastAccess: number }>();
let memoryCleanupInterval: NodeJS.Timeout | null = null;
let cleanupInitialized = false;

/**
 * Initialize cleanup handlers lazily to prevent issues in serverless/edge environments
 * and avoid duplicate handlers during hot reloads
 */
function initializeCleanup(): void {
  if (cleanupInitialized || typeof window !== 'undefined') {
    return; // Already initialized or not in Node.js environment
  }
  
  cleanupInitialized = true;
  
  // Start periodic cleanup
  memoryCleanupInterval = setInterval(cleanupMemoryStore, MEMORY_CLEANUP_INTERVAL);
  
  // Clean up interval on process exit
  process.on('SIGTERM', () => {
    if (memoryCleanupInterval) {
      clearInterval(memoryCleanupInterval);
      memoryCleanupInterval = null;
    }
  });
  
  process.on('SIGINT', () => {
    if (memoryCleanupInterval) {
      clearInterval(memoryCleanupInterval);
      memoryCleanupInterval = null;
    }
  });
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime?: number;
  retryAfter?: number; // seconds until next request allowed
}

/**
 * Clean up expired entries from memory store and enforce size limits
 */
function cleanupMemoryStore(): void {
  const now = Date.now();
  let removedCount = 0;
  
  // Remove expired entries
  for (const [key, entry] of memoryStore.entries()) {
    if (now > entry.resetTime) {
      memoryStore.delete(key);
      removedCount++;
    }
  }
  
  // Enforce maximum size with LRU eviction
  if (memoryStore.size > MAX_MEMORY_ENTRIES) {
    // Convert to array and sort by lastAccess (oldest first)
    const entries = Array.from(memoryStore.entries()).sort(
      (a, b) => a[1].lastAccess - b[1].lastAccess
    );
    
    // Remove oldest entries until we're under the limit
    const entriesToRemove = memoryStore.size - MAX_MEMORY_ENTRIES;
    for (let i = 0; i < entriesToRemove; i++) {
      memoryStore.delete(entries[i][0]);
      removedCount++;
    }
  }
  
  if (removedCount > 0) {
    console.log(`Rate limit memory store cleanup: removed ${removedCount} entries, ${memoryStore.size} remaining`);
  }
}

/**
 * Check rate limit for an IP address using database-backed storage
 * Uses atomic transactions to prevent race conditions in multi-instance deployments
 */
export async function checkRateLimit(
  ip: string, 
  fingerprint?: { userAgent?: string; acceptLanguage?: string; sessionId?: string }
): Promise<RateLimitResult> {
export async function checkRateLimit(
  ip: string,
  fingerprint?: { userAgent?: string; acceptLanguage?: string; sessionId?: string }
): Promise<RateLimitResult> {
  // Initialize cleanup handlers lazily on first invocation
  initializeCleanup();
  
  // Handle missing or unknown IPs with more granular fallback keys
  let rateLimitKey = ip;
  let isUsingFallback = false;
  
  if (!ip || ip === 'unknown') {
    isUsingFallback = true;
    
    // Create a composite fallback key from available fingerprinting data
    const fallbackComponents: string[] = ['fallback'];
    
    if (fingerprint?.userAgent) {
      // Hash user agent to avoid storing raw data
      const uaHash = crypto.createHash('sha256').update(fingerprint.userAgent, 'utf8').digest('hex').slice(0, 16);
      fallbackComponents.push(`ua:${uaHash}`);
    }
    
    if (fingerprint?.acceptLanguage) {
      // Normalize and hash acceptLanguage to avoid PII and key explosion
      const normalizedLang = fingerprint.acceptLanguage.toLowerCase().split(/[,;-]/)[0].slice(0, 5);
      const langHash = crypto.createHash('sha256').update(normalizedLang, 'utf8').digest('hex').slice(0, 16);
      fallbackComponents.push(`lang:${langHash}`);
    }
    
    if (fingerprint?.sessionId) {
      // Hash sessionId to avoid storing raw session data
      const sessHash = crypto.createHash('sha256').update(fingerprint.sessionId, 'utf8').digest('hex').slice(0, 16);
      fallbackComponents.push(`sess:${sessHash}`);    }
    
    // If no fingerprinting data available, use a very restrictive shared bucket
    if (fallbackComponents.length === 1) {
      fallbackComponents.push('anonymous');
    }
    
    rateLimitKey = fallbackComponents.join(':');
    
    console.warn('Rate limit check with missing/unknown IP', {
      fallbackUsed: true,
      componentCount: fallbackComponents.length - 1, // Exclude 'fallback' prefix from count
      timestamp: new Date().toISOString(),
    });  }

  const now = Date.now();
  const resetTime = now + WINDOW_MS;
  
  // Use more restrictive limits for fallback buckets to prevent abuse
  const maxRequests = isUsingFallback ? Math.max(1, Math.floor(MAX_REQUESTS / 2)) : MAX_REQUESTS;

  try {
    // Use a single atomic SQL operation to handle both insert and update cases
    // This prevents race conditions between concurrent requests
    const result = await prisma.$queryRaw<{ count: number; reset_time: string }[]>`
      INSERT INTO "RateLimit" (ip, count, "resetTime")
      VALUES (${rateLimitKey}, 1, ${BigInt(resetTime)})
      ON CONFLICT (ip) DO UPDATE SET
        count = CASE 
          WHEN ${BigInt(now)} > "RateLimit"."resetTime" THEN 1
          ELSE "RateLimit".count + 1
        END,
        "resetTime" = CASE 
          WHEN ${BigInt(now)} > "RateLimit"."resetTime" THEN ${BigInt(resetTime)}
          ELSE "RateLimit"."resetTime"
        END
      RETURNING count, CAST("resetTime" AS TEXT) as reset_time;
    `;

    const entry = result[0];
    if (!entry) {
      throw new Error('Failed to get rate limit entry from database');
    }

    const currentCount = entry.count;
    const currentResetTime = Number(entry.reset_time);

    // Check if rate limit is exceeded
    if (currentCount > maxRequests) {
      const retryAfter = Math.ceil((currentResetTime - now) / 1000);
      
      return {
        allowed: false,
        remaining: 0,
        resetTime: currentResetTime,
        retryAfter: Math.max(1, retryAfter)
      };
    }

    return {
      allowed: true,
      remaining: maxRequests - currentCount,
      resetTime: currentResetTime
    };
  } catch (error) {
    console.error('Rate limit check failed, using in-memory fallback:', error);
    } catch (error) {
      console.error('Rate limit check failed, using in-memory fallback:', error);
    }    cleanupMemoryStore();
    
    // Use in-memory fallback to avoid disabling rate limits
    const memoryEntry = memoryStore.get(rateLimitKey);
    
    // If no entry exists or resetTime has passed, create/reset entry
    if (!memoryEntry || now > memoryEntry.resetTime) {
      memoryStore.set(rateLimitKey, { count: 1, resetTime, lastAccess: now });
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime
      };
    }
    
    // Update last access time and increment existing entry
    memoryEntry.lastAccess = now;
    memoryEntry.count++;
    
    // Check if rate limit exceeded
    if (memoryEntry.count > maxRequests) {
      const retryAfter = Math.ceil((memoryEntry.resetTime - now) / 1000);
      return {
        allowed: false,
        remaining: 0,
        resetTime: memoryEntry.resetTime,
        retryAfter: Math.max(1, retryAfter)
      };
    }
    
    // Request allowed
    return {
      allowed: true,
      remaining: maxRequests - memoryEntry.count,
      resetTime: memoryEntry.resetTime
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