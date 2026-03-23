/**
 * Cached data loader
 *
 * Wraps another loader with caching support (in-memory and optional persistent)
 *
 * @packageDocumentation
 */
import type { DataLoader, CachedLoaderOptions, DataSourceMetadata } from "./types.js";
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
export declare class CachedLoader<TData> implements DataLoader<TData> {
    private options;
    private cache?;
    constructor(options: CachedLoaderOptions<TData>);
    /**
     * Load data (from cache or source)
     */
    load(): Promise<TData>;
    /**
     * Check if cache is valid
     */
    private isCacheValid;
    /**
     * Clear cache
     */
    clearCache(): void;
    /**
     * Load from persistent storage
     */
    private loadFromStorage;
    /**
     * Save to persistent storage
     */
    private saveToStorage;
    /**
     * Check if source is available
     */
    isAvailable(): Promise<boolean>;
    /**
     * Get metadata
     */
    getMetadata(): Promise<DataSourceMetadata>;
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
export declare function createCachedLoader<TData>(options: CachedLoaderOptions<TData>): CachedLoader<TData>;
//# sourceMappingURL=cached-loader.d.ts.map