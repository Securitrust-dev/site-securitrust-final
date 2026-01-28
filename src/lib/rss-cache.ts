
// Simple in-memory cache for RSS translations to avoid repeated API calls
// Shared across API routes
export const rssCache: Record<string, any> = {};
export const CACHE_TTL = 3600 * 1000; // 1 hour
