/**
 * JSON file data loader
 *
 * Loads data from JSON files (Node.js) or URLs (browser)
 *
 * @packageDocumentation
 */
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
export class JsonLoader {
    options;
    constructor(options) {
        this.options = options;
    }
    /**
     * Load JSON data from file or URL
     */
    async load() {
        try {
            let data;
            // Detect environment and load accordingly
            if (typeof globalThis !== 'undefined' && 'window' in globalThis && typeof fetch !== 'undefined') {
                // Browser environment
                data = await this.loadFromUrl();
            }
            else if (typeof process !== 'undefined' && process.versions?.node) {
                // Node.js environment
                data = await this.loadFromFile();
            }
            else {
                throw new Error('Unsupported environment for JsonLoader');
            }
            // Validate if validator provided
            if (this.options.validate && !this.options.validate(data)) {
                throw new Error('Data validation failed');
            }
            // Transform if transformer provided
            if (this.options.transform) {
                data = this.options.transform(data);
            }
            return data;
        }
        catch (error) {
            throw new Error(`Failed to load JSON from ${this.options.path}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    /**
     * Load from URL using fetch
     */
    async loadFromUrl() {
        const response = await fetch(this.options.path);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }
    /**
     * Load from file using Node.js fs
     */
    async loadFromFile() {
        // Dynamic import to avoid bundling issues in browser
        const fs = await import('fs/promises');
        const content = await fs.readFile(this.options.path, 'utf-8');
        return JSON.parse(content);
    }
    /**
     * Check if source is available
     */
    async isAvailable() {
        try {
            if (typeof globalThis !== 'undefined' && 'window' in globalThis && typeof fetch !== 'undefined') {
                const response = await fetch(this.options.path, { method: 'HEAD' });
                return response.ok;
            }
            else if (typeof process !== 'undefined' && process.versions?.node) {
                const fs = await import('fs/promises');
                await fs.access(this.options.path);
                return true;
            }
            return false;
        }
        catch {
            return false;
        }
    }
    /**
     * Get metadata about the JSON file
     */
    async getMetadata() {
        const metadata = {
            name: this.options.path,
        };
        try {
            if (typeof process !== 'undefined' && process.versions?.node) {
                const fs = await import('fs/promises');
                const stats = await fs.stat(this.options.path);
                metadata.lastUpdated = stats.mtime;
            }
        }
        catch {
            // Metadata is optional
        }
        return metadata;
    }
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
export function createJsonLoader(options) {
    return new JsonLoader(options);
}
//# sourceMappingURL=json-loader.js.map