/**
 * API data loader
 *
 * Loads data from HTTP APIs with retry and timeout support
 *
 * @packageDocumentation
 */
import type { DataLoader, ApiLoaderOptions, DataSourceMetadata } from "./types.js";
/**
 * API data loader with retry logic
 *
 * @example
 * ```typescript
 * const loader = new ApiLoader({
 *   url: 'https://api.example.com/dictionary',
 *   headers: { 'Authorization': 'Bearer token' },
 *   retry: { maxAttempts: 3, delayMs: 1000 }
 * });
 *
 * const data = await loader.load();
 * ```
 */
export declare class ApiLoader<TData = any> implements DataLoader<TData> {
    private options;
    constructor(options: ApiLoaderOptions);
    /**
     * Load data from API
     */
    load(): Promise<TData>;
    /**
     * Load with retry logic
     */
    private loadWithRetry;
    /**
     * Fetch data from API
     */
    private fetchData;
    /**
     * Check if API is available
     */
    isAvailable(): Promise<boolean>;
    /**
     * Get API metadata
     */
    getMetadata(): Promise<DataSourceMetadata>;
}
/**
 * Create an API loader
 *
 * @param options - Loader options
 * @returns ApiLoader instance
 *
 * @example
 * ```typescript
 * const loader = createApiLoader({
 *   url: 'https://api.example.com/data',
 *   headers: { 'API-Key': 'xxx' },
 *   retry: { maxAttempts: 3, delayMs: 1000 }
 * });
 * ```
 */
export declare function createApiLoader<TData = any>(options: ApiLoaderOptions): ApiLoader<TData>;
//# sourceMappingURL=api-loader.d.ts.map