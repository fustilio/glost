/**
 * Cached data loader
 *
 * Wraps another loader with caching support (in-memory and optional persistent)
 *
 * @packageDocumentation
 */
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
export class CachedLoader {
    options;
    cache;
    constructor(options) {
        this.options = options;
        // Try to load from persistent storage if key provided
        if (options.storageKey) {
            this.loadFromStorage();
        }
    }
    /**
     * Load data (from cache or source)
     */
    async load() {
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
    isCacheValid(cache) {
        if (!this.options.ttl) {
            return true; // No TTL = cache forever
        }
        const age = Date.now() - cache.timestamp;
        return age < this.options.ttl;
    }
    /**
     * Clear cache
     */
    clearCache() {
        this.cache = undefined;
        if (this.options.storageKey && typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
            try {
                globalThis.localStorage.removeItem(this.options.storageKey);
            }
            catch {
                // Ignore storage errors
            }
        }
    }
    /**
     * Load from persistent storage
     */
    loadFromStorage() {
        if (typeof globalThis === 'undefined' || !('localStorage' in globalThis)) {
            return;
        }
        try {
            const stored = globalThis.localStorage.getItem(this.options.storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (this.isCacheValid(parsed)) {
                    this.cache = parsed;
                }
            }
        }
        catch {
            // Ignore storage errors
        }
    }
    /**
     * Save to persistent storage
     */
    saveToStorage() {
        if (typeof globalThis === 'undefined' || !('localStorage' in globalThis) || !this.cache) {
            return;
        }
        try {
            globalThis.localStorage.setItem(this.options.storageKey, JSON.stringify(this.cache));
        }
        catch {
            // Ignore storage errors (quota exceeded, etc.)
        }
    }
    /**
     * Check if source is available
     */
    async isAvailable() {
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
    async getMetadata() {
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
export function createCachedLoader(options) {
    return new CachedLoader(options);
}
//# sourceMappingURL=cached-loader.js.map