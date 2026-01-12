/**
 * Thai Frequency Provider
 * 
 * Provides word frequency data for Thai language based on corpus analysis.
 * 
 * @packageDocumentation
 */

import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader, GlostLanguage } from "glost-common";
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";

/**
 * Thai frequency data structure
 */
export interface ThaiFrequencyData {
  [word: string]: FrequencyLevel;
}

/**
 * Thai frequency provider options
 */
export interface ThaiFrequencyProviderOptions extends BaseProviderOptions {
  /**
   * Custom data loader for frequency data
   * 
   * Load from:
   * - Thai National Corpus frequency data
   * - Dictionary-based frequency rankings
   * - Custom Thai language resources
   * 
   * @example
   * ```typescript
   * import { createJsonLoader } from "glost-common";
   * 
   * const provider = createThaiFrequencyProvider({
   *   dataLoader: createJsonLoader({
   *     path: './data/thai-frequency.json'
   *   })
   * });
   * ```
   */
  dataLoader?: DataLoader<ThaiFrequencyData>;
}

/**
 * Thai frequency provider class
 * 
 * Provides lazy-loaded frequency data with proper error handling.
 * 
 * @example
 * ```typescript
 * import { createThaiFrequencyProvider } from "glost-th/extensions";
 * import { createJsonLoader, createCachedLoader } from "glost-common";
 * 
 * // With caching
 * const provider = createThaiFrequencyProvider({
 *   dataLoader: createCachedLoader({
 *     loader: createJsonLoader({
 *       path: './thai-frequency.json'
 *     }),
 *     ttl: 3600000, // 1 hour
 *     storageKey: 'thai-frequency-cache'
 *   }),
 *   debug: true
 * });
 * 
 * // Use with extension
 * import { createFrequencyExtension } from "glost-frequency";
 * 
 * const extension = createFrequencyExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export class ThaiFrequencyProvider extends BaseDataProvider<ThaiFrequencyData> implements FrequencyProvider {
  protected supportedLanguages = ["th" as const];
  private dataLoader?: DataLoader<ThaiFrequencyData>;

  constructor(options: ThaiFrequencyProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  /**
   * Load frequency data
   */
  protected async loadData(): Promise<ThaiFrequencyData> {
    if (!this.dataLoader) {
      this.log(
        "No data loader provided for Thai frequency. Provider will return undefined.",
        "warn"
      );
      return {};
    }

    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded frequency data for ${Object.keys(data).length} Thai words`, "info");
      return data;
    } catch (error) {
      this.log(
        `Failed to load Thai frequency data: ${error instanceof Error ? error.message : String(error)}`,
        "error"
      );
      return {};
    }
  }

  /**
   * Get frequency level for a Thai word
   * 
   * @param word - Thai word to check
   * @param language - Language code (must be 'th')
   * @returns Frequency level or undefined
   */
  async getFrequency(
    word: string,
    language: GlostLanguage
  ): Promise<FrequencyLevel | undefined> {
    if (language !== "th") {
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
 * Create Thai frequency provider
 * 
 * @param options - Provider options
 * @returns ThaiFrequencyProvider instance
 */
export function createThaiFrequencyProvider(
  options: ThaiFrequencyProviderOptions = {}
): ThaiFrequencyProvider {
  return new ThaiFrequencyProvider(options);
}

/**
 * Default Thai frequency provider instance
 * 
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiFrequencyProvider = new ThaiFrequencyProvider();
