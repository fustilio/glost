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
export function createSimpleProvider(source) {
    if (typeof source === 'function') {
        return {
            async getData(input, context) {
                return await source(input, context);
            },
        };
    }
    if (source instanceof Map) {
        return {
            async getData(input) {
                return source.get(input);
            },
            async batchGetData(inputs) {
                const result = new Map();
                for (const input of inputs) {
                    const value = source.get(input);
                    if (value !== undefined) {
                        result.set(input, value);
                    }
                }
                return result;
            },
        };
    }
    // Record
    return {
        async getData(input) {
            return source[String(input)];
        },
        async batchGetData(inputs) {
            const result = new Map();
            for (const input of inputs) {
                const value = source[String(input)];
                if (value !== undefined) {
                    result.set(input, value);
                }
            }
            return result;
        },
    };
}
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
export function createCachedProvider(provider, options = {}) {
    const cache = new Map();
    const { maxSize = 1000, ttl } = options;
    const getCacheKey = (input) => {
        return provider.cacheKey ? provider.cacheKey(input) : String(input);
    };
    const isExpired = (timestamp) => {
        return ttl !== undefined && Date.now() - timestamp > ttl;
    };
    return {
        async getData(input, context) {
            const key = getCacheKey(input);
            const cached = cache.get(key);
            if (cached && !isExpired(cached.timestamp)) {
                return cached.value;
            }
            const value = await provider.getData(input, context);
            if (value !== undefined) {
                // Evict oldest if at capacity
                if (cache.size >= maxSize) {
                    const firstKey = cache.keys().next().value;
                    if (firstKey !== undefined) {
                        cache.delete(firstKey);
                    }
                }
                cache.set(key, { value, timestamp: Date.now() });
            }
            return value;
        },
        async batchGetData(inputs, context) {
            const result = new Map();
            const uncached = [];
            // Check cache first
            for (const input of inputs) {
                const key = getCacheKey(input);
                const cached = cache.get(key);
                if (cached && !isExpired(cached.timestamp)) {
                    result.set(input, cached.value);
                }
                else {
                    uncached.push(input);
                }
            }
            // Fetch uncached items
            if (uncached.length > 0) {
                let batchResult;
                if (provider.batchGetData) {
                    batchResult = await provider.batchGetData(uncached, context);
                }
                else {
                    // Fallback to sequential getData
                    batchResult = new Map();
                    for (const input of uncached) {
                        const value = await provider.getData(input, context);
                        if (value !== undefined) {
                            batchResult.set(input, value);
                        }
                    }
                }
                // Add to result and cache
                for (const [input, value] of batchResult.entries()) {
                    result.set(input, value);
                    // Cache
                    if (cache.size >= maxSize) {
                        const firstKey = cache.keys().next().value;
                        if (firstKey !== undefined) {
                            cache.delete(firstKey);
                        }
                    }
                    const key = getCacheKey(input);
                    cache.set(key, { value, timestamp: Date.now() });
                }
            }
            return result;
        },
        cacheKey: provider.cacheKey,
        async dispose() {
            cache.clear();
            if (provider.dispose) {
                await provider.dispose();
            }
        },
    };
}
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
export function createFallbackProviderChain(providers) {
    return {
        async getData(input, context) {
            for (const provider of providers) {
                const result = await provider.getData(input, context);
                if (result !== undefined) {
                    return result;
                }
            }
            return undefined;
        },
        async batchGetData(inputs, context) {
            const result = new Map();
            let remaining = [...inputs];
            for (const provider of providers) {
                if (remaining.length === 0)
                    break;
                let providerResults;
                if (provider.batchGetData) {
                    providerResults = await provider.batchGetData(remaining, context);
                }
                else {
                    providerResults = new Map();
                    for (const input of remaining) {
                        const value = await provider.getData(input, context);
                        if (value !== undefined) {
                            providerResults.set(input, value);
                        }
                    }
                }
                for (const [input, value] of providerResults.entries()) {
                    result.set(input, value);
                }
                // Update remaining to only include items not yet found
                remaining = remaining.filter(input => !result.has(input));
            }
            return result;
        },
        async dispose() {
            for (const provider of providers) {
                if (provider.dispose) {
                    await provider.dispose();
                }
            }
        },
    };
}
//# sourceMappingURL=providers.js.map