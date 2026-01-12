/**
 * Cached data loader
 * 
 * Wraps another loader with caching support (in-memory and optional persistent)
 * 
 * @packageDocumentation
 */

import type { DataLoader, CachedLoaderOptions, DataSourceMetadata } from "./types.js";

interface CacheEntry<TData> {
  data: TData;
  timestamp: number;
}

/**
 * Cached data loader
 * 
 * Caches loaded data to avoid repeated loads
 * 
 * @example
 * ```typescript
 * const loader = new CachedLoader({
 *   loader: baseLoader,
 *   ttl: 3600000, // 1 hour
 *   storageKey: 'my-dictionary-cache'
 * });
 * 
 * const data = await loader.load(); // Loads from source
 * const data2 = await loader.load(); // Returns cached data
 * ```
 */
export class CachedLoader<TData> implements DataLoader<TData> {
  private options: CachedLoaderOptions<TData>;
  private cache?: CacheEntry<TData>;

  constructor(options: CachedLoaderOptions<TData>) {
    this.options = options;
    
    // Try to load from persistent storage if key provided
    if (options.storageKey) {
      this.loadFromStorage();
    }
  }

  /**
   * Load data (from cache or source)
   */
  async load(): Promise<TData> {
    // Check if cached data is still valid
    if (this.cache && this.isCacheValid(this.cache)) {
      return this.cache.data;
    }

    // Load from source
    const data = await this.options.loader.load();

    // Cache the data
    this.cache = {
      data,
      timestamp: Date.now(),
    };

    // Persist if storage key provided
    if (this.options.storageKey) {
      this.saveToStorage();
    }

    return data;
  }

  /**
   * Check if cache is valid
   */
  private isCacheValid(cache: CacheEntry<TData>): boolean {
    if (!this.options.ttl) {
      return true; // No TTL = cache forever
    }

    const age = Date.now() - cache.timestamp;
    return age < this.options.ttl;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache = undefined;
    
    if (this.options.storageKey && typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
      try {
        (globalThis as any).localStorage.removeItem(this.options.storageKey);
      } catch {
        // Ignore storage errors
      }
    }
  }

  /**
   * Load from persistent storage
   */
  private loadFromStorage(): void {
    if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
      return;
    }

    try {
      const stored = (globalThis as any).localStorage.getItem(this.options.storageKey!);
      if (stored) {
        const parsed = JSON.parse(stored) as CacheEntry<TData>;
        if (this.isCacheValid(parsed)) {
          this.cache = parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Save to persistent storage
   */
  private saveToStorage(): void {
    if (typeof globalThis === 'undefined' || !('localStorage' in globalThis) || !this.cache) {
      return;
    }

    try {
      (globalThis as any).localStorage.setItem(
        this.options.storageKey!,
        JSON.stringify(this.cache)
      );
    } catch {
      // Ignore storage errors (quota exceeded, etc.)
    }
  }

  /**
   * Check if source is available
   */
  async isAvailable(): Promise<boolean> {
    // If cached, consider available
    if (this.cache && this.isCacheValid(this.cache)) {
      return true;
    }

    // Check base loader
    if (this.options.loader.isAvailable) {
      return this.options.loader.isAvailable();
    }

    return true;
  }

  /**
   * Get metadata
   */
  async getMetadata(): Promise<DataSourceMetadata> {
    const baseMetadata = this.options.loader.getMetadata
      ? await this.options.loader.getMetadata()
      : { name: 'Unknown' };

    return {
      ...baseMetadata,
      cached: this.cache !== undefined,
      cacheAge: this.cache ? Date.now() - this.cache.timestamp : undefined,
    };
  }
}

/**
 * Create a cached loader
 * 
 * @param options - Cached loader options
 * @returns CachedLoader instance
 * 
 * @example
 * ```typescript
 * const loader = createCachedLoader({
 *   loader: jsonLoader,
 *   ttl: 3600000, // 1 hour
 *   storageKey: 'dictionary-cache'
 * });
 * ```
 */
export function createCachedLoader<TData>(
  options: CachedLoaderOptions<TData>
): CachedLoader<TData> {
  return new CachedLoader<TData>(options);
}
