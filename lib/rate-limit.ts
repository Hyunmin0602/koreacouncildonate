type RateLimitStore = Map<string, number[]>;
const rateLimitMap: RateLimitStore = new Map();

interface RateLimitConfig {
    limit: number; // Max requests
    windowMs: number; // Time window in milliseconds
}

/**
 * Basic in-memory rate limiter.
 * returns true if allowed, false if limited.
 */
export function checkRateLimit(ip: string, config: RateLimitConfig = { limit: 5, windowMs: 60 * 1000 }): boolean {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Get existing timestamps for this IP
    const timestamps = rateLimitMap.get(ip) || [];

    // Filter out timestamps older than the window
    const windowTimestamps = timestamps.filter(timestamp => timestamp > windowStart);

    if (windowTimestamps.length >= config.limit) {
        return false;
    }

    // Add current timestamp and update map
    windowTimestamps.push(now);
    rateLimitMap.set(ip, windowTimestamps);

    // Optional: Cleanup old entries occasionally (simple approach: just rely on overwrites or manual cleanup if needed, but for this scale it's fine)
    // To prevent memory leak in long running process, we could clean up the map lazily.
    if (rateLimitMap.size > 10000) {
        rateLimitMap.clear(); // Reset if too big (simple safety valve)
    }

    return true;
}
