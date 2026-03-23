/**
 * JSON file data loader
 *
 * Loads data from JSON files (Node.js) or URLs (browser)
 *
 * @packageDocumentation
 */
import type { DataLoader, JsonLoaderOptions, DataSourceMetadata } from "./types.js";
/**
 * JSON file/URL loader
 *
 * @example
 * ```typescript
 * // Load from file (Node.js)
 * const loader = new JsonLoader({
 *   path: './data/dictionary.json',
 *   transform: (data) => new Map(Object.entries(data))
 * });
 *
 * // Load from URL (browser)
 * const loader = new JsonLoader({
 *   path: 'https://example.com/data.json'
 * });
 *
 * const data = await loader.load();
 * ```
 */
export declare class JsonLoader<TData = any> implements DataLoader<TData> {
    private options;
    constructor(options: JsonLoaderOptions);
    /**
     * Load JSON data from file or URL
     */
    load(): Promise<TData>;
    /**
     * Load from URL using fetch
     */
    private loadFromUrl;
    /**
     * Load from file using Node.js fs
     */
    private loadFromFile;
    /**
     * Check if source is available
     */
    isAvailable(): Promise<boolean>;
    /**
     * Get metadata about the JSON file
     */
    getMetadata(): Promise<DataSourceMetadata>;
}
/**
 * Create a JSON loader
 *
 * @param options - Loader options
 * @returns JsonLoader instance
 *
 * @example
 * ```typescript
 * const loader = createJsonLoader({
 *   path: './dictionary.json',
 *   transform: (obj) => new Map(Object.entries(obj))
 * });
 * ```
 */
export declare function createJsonLoader<TData = any>(options: JsonLoaderOptions): JsonLoader<TData>;
//# sourceMappingURL=json-loader.d.ts.map