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
import type { DataLoader, GlostLanguage } from "glost-common";
import type { POSProvider } from "glost-pos";

/**
 * Thai POS data structure
 */
export interface ThaiPOSData {
  [word: string]: string; // POS tag
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
export class ThaiPOSProvider extends BaseDataProvider<ThaiPOSData> implements POSProvider {
  protected supportedLanguages = ["th" as const];
  private dataLoader?: DataLoader<ThaiPOSData>;
  private tagset: "universal" | "orchid";

  constructor(options: ThaiPOSProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
    this.tagset = options.tagset || "universal";
  }

  /**
   * Load POS data
   */
  protected async loadData(): Promise<ThaiPOSData> {
    if (!this.dataLoader) {
      this.log(
        "No data loader provided for Thai POS. Provider will return undefined.",
        "warn"
      );
      return {};
    }

    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded POS tags for ${Object.keys(data).length} Thai words (tagset: ${this.tagset})`, "info");
      return data;
    } catch (error) {
      this.log(
        `Failed to load Thai POS data: ${error instanceof Error ? error.message : String(error)}`,
        "error"
      );
      return {};
    }
  }

  /**
   * Get POS tag for a Thai word
   * 
   * @param word - Thai word to tag
   * @param language - Language code (must be 'th')
   * @returns POS tag or undefined
   */
  async getPOS(
    word: string,
    language: string
  ): Promise<string | undefined> {
    if (!language.startsWith("th")) {
      return undefined;
    }

    if (!word || typeof word !== "string" || word.trim().length === 0) {
      return undefined;
    }

    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      return data[word.trim()];
    });
  }
}

/**
 * Create Thai POS provider
 * 
 * @param options - Provider options
 * @returns ThaiPOSProvider instance
 */
export function createThaiPOSProvider(
  options: ThaiPOSProviderOptions = {}
): ThaiPOSProvider {
  return new ThaiPOSProvider(options);
}

/**
 * Default Thai POS provider instance
 * 
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiPOSProvider = new ThaiPOSProvider();
