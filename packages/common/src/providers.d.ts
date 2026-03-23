/**
 * Standard Provider Interfaces for GLOST Extensions
 *
 * Defines standard interfaces for data providers used by GLOST extensions.
 * These interfaces promote consistency across the ecosystem and enable
 * better composition, caching, and batch processing.
 *
 * @packageDocumentation
 */
/**
 * Context passed to provider methods
 */
export interface ProviderContext {
    /** Language of the content being processed */
    language?: string;
    /** Current GLOST document (if available) */
    document?: any;
    /** Shared cache for memoization */
    cache?: Map<string, any>;
    /** Additional custom context data */
    [key: string]: any;
}
/**
 * Standard data provider interface
 *
 * All GLOST data providers should implement this interface for consistency.
 *
 * @template TInput - Type of input data (e.g., string for word lookup)
 * @template TOutput - Type of output data (e.g., translation, frequency, etc.)
 *
 * @example
 * ```typescript
 * // Simple translation provider
 * class TranslationProvider implements GLOSTDataProvider<string, string> {
 *   constructor(private dictionary: Map<string, string>) {}
 *
 *   async getData(word: string): Promise<string | undefined> {
 *     return this.dictionary.get(word);
 *   }
 *
 *   cacheKey(word: string): string {
 *     return word.toLowerCase();
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Provider with batch support
 * class FrequencyProvider implements GLOSTDataProvider<string, FrequencyData> {
 *   async getData(word: string): Promise<FrequencyData | undefined> {
 *     const response = await fetch(`/api/frequency/${word}`);
 *     return response.json();
 *   }
 *
 *   async batchGetData(words: string[]): Promise<Map<string, FrequencyData>> {
 *     const response = await fetch('/api/frequency/batch', {
 *       method: 'POST',
 *       body: JSON.stringify({ words })
 *     });
 *     const data = await response.json();
 *     return new Map(Object.entries(data));
 *   }
 * }
 * ```
 */
export interface GLOSTDataProvider<TInput, TOutput> {
    /**
     * Get data for a single input
     *
     * @param input - Input data to look up
     * @param context - Optional context information
     * @returns Output data if found, undefined otherwise
     *
     * @remarks
     * Providers should return `undefined` when data is not available
     * rather than throwing errors. This allows graceful degradation.
     */
    getData(input: TInput, context?: ProviderContext): Promise<TOutput | undefined>;
    /**
     * Get data for multiple inputs in batch (optional)
     *
     * Implementing this method can significantly improve performance
     * when processing many items, as it allows providers to:
     * - Make fewer API calls
     * - Perform bulk database queries
     * - Utilize caching more effectively
     *
     * @param inputs - Array of inputs to look up
     * @param context - Optional context information
     * @returns Map of inputs to their corresponding outputs
     *
     * @remarks
     * If not implemented, the extension will fall back to calling
     * `getData()` for each input sequentially.
     */
    batchGetData?(inputs: TInput[], context?: ProviderContext): Promise<Map<TInput, TOutput>>;
    /**
     * Generate a cache key for an input (optional)
     *
     * Used for memoization to avoid redundant lookups.
     * If not provided, the input will be converted to string.
     *
     * @param input - Input to generate cache key for
     * @returns Cache key string
     *
     * @example
     * ```typescript
     * cacheKey(word: string): string {
     *   // Normalize for case-insensitive caching
     *   return word.toLowerCase();
     * }
     * ```
     */
    cacheKey?(input: TInput): string;
    /**
     * Clean up resources (optional)
     *
     * Called when the provider is no longer needed.
     * Use this to close connections, clear caches, etc.
     *
     * @example
     * ```typescript
     * async dispose(): Promise<void> {
     *   await this.dbConnection.close();
     *   this.cache.clear();
     * }
     * ```
     */
    dispose?(): Promise<void>;
}
/**
 * Create a simple provider from a data source
 *
 * Utility function to create a provider from a Map, Record, or function.
 *
 * @param source - Data source (Map, Record, or lookup function)
 * @returns GLOSTDataProvider instance
 *
 * @example
 * ```typescript
 * // From a Record
 * const provider = createSimpleProvider({
 *   hello: "สวัสดี",
 *   goodbye: "ลาก่อน"
 * });
 *
 * // From a Map
 * const provider = createSimpleProvider(
 *   new Map([
 *     ["hello", "สวัสดี"],
 *     ["goodbye", "ลาก่อน"]
 *   ])
 * );
 *
 * // From a function
 * const provider = createSimpleProvider(async (word) => {
 *   return await dictionary.lookup(word);
 * });
 * ```
 */
export declare function createSimpleProvider<TInput extends string | number, TOutput>(source: Map<TInput, TOutput> | Record<string, TOutput> | ((input: TInput, context?: ProviderContext) => Promise<TOutput | undefined> | TOutput | undefined)): GLOSTDataProvider<TInput, TOutput>;
/**
 * Create a provider with caching
 *
 * Wraps another provider with automatic caching.
 *
 * @param provider - Base provider to wrap
 * @param options - Caching options
 * @returns Cached provider
 *
 * @example
 * ```typescript
 * const cachedProvider = createCachedProvider(apiProvider, {
 *   maxSize: 1000,
 *   ttl: 3600000 // 1 hour
 * });
 * ```
 */
export declare function createCachedProvider<TInput, TOutput>(provider: GLOSTDataProvider<TInput, TOutput>, options?: {
    maxSize?: number;
    ttl?: number;
}): GLOSTDataProvider<TInput, TOutput>;
/**
 * Create a fallback provider chain
 *
 * Tries providers in order until one returns data.
 *
 * @param providers - Array of providers to try in order
 * @returns Chained provider
 *
 * @example
 * ```typescript
 * const provider = createFallbackProviderChain([
 *   primaryDictionaryProvider,
 *   coreWordsProvider,
 *   apiProvider
 * ]);
 * ```
 */
export declare function createFallbackProviderChain<TInput, TOutput>(providers: GLOSTDataProvider<TInput, TOutput>[]): GLOSTDataProvider<TInput, TOutput>;
//# sourceMappingURL=providers.d.ts.map