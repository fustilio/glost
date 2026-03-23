/**
 * Thai Part-of-Speech Provider
 *
 * Provides POS tagging for Thai words using:
 * - ORCHID corpus tagset
 * - Universal Dependencies (UD) tags
 * - Custom Thai linguistic categories
 *
 * @packageDocumentation
 */
import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader } from "glost-common";
import type { POSProvider } from "glost-pos";
/**
 * Thai POS data structure
 */
export interface ThaiPOSData {
    [word: string]: string;
}
/**
 * Thai POS provider options
 */
export interface ThaiPOSProviderOptions extends BaseProviderOptions {
    /**
     * Custom data loader for POS data
     *
     * Can include:
     * - ORCHID corpus POS tags
     * - Universal Dependencies tags
     * - Dictionary-based POS classifications
     *
     * @example
     * ```typescript
     * import { createJsonLoader } from "glost-common";
     *
     * const provider = createThaiPOSProvider({
     *   dataLoader: createJsonLoader({
     *     path: './data/thai-pos.json'
     *   })
     * });
     * ```
     */
    dataLoader?: DataLoader<ThaiPOSData>;
    /**
     * Tagset to use (default: 'universal')
     * - 'universal': Universal Dependencies tags (NOUN, VERB, ADJ, etc.)
     * - 'orchid': ORCHID corpus Thai-specific tags
     */
    tagset?: "universal" | "orchid";
}
/**
 * Thai POS provider class
 *
 * @example
 * ```typescript
 * import { createThaiPOSProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 *
 * const provider = createThaiPOSProvider({
 *   dataLoader: createJsonLoader({
 *     path: './thai-pos.json'
 *   }),
 *   tagset: 'universal',
 *   debug: true
 * });
 *
 * // Use with extension
 * import { createPOSExtension } from "glost-pos";
 *
 * const extension = createPOSExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export declare class ThaiPOSProvider extends BaseDataProvider<ThaiPOSData> implements POSProvider {
    protected supportedLanguages: "th"[];
    private dataLoader?;
    private tagset;
    constructor(options?: ThaiPOSProviderOptions);
    /**
     * Load POS data
     */
    protected loadData(): Promise<ThaiPOSData>;
    /**
     * Get POS tag for a Thai word
     *
     * @param word - Thai word to tag
     * @param language - Language code (must be 'th')
     * @returns POS tag or undefined
     */
    getPOS(word: string, language: string): Promise<string | undefined>;
}
/**
 * Create Thai POS provider
 *
 * @param options - Provider options
 * @returns ThaiPOSProvider instance
 */
export declare function createThaiPOSProvider(options?: ThaiPOSProviderOptions): ThaiPOSProvider;
/**
 * Default Thai POS provider instance
 *
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export declare const thaiPOSProvider: ThaiPOSProvider;
//# sourceMappingURL=pos.d.ts.map