/**
 * Thai translation provider for glost-translation extension
 * 
 * Provides Thai-to-English translations from dictionary sources.
 * 
 * @packageDocumentation
 */

import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader } from "glost-common";
import type { GlostLanguage } from "glost-common";
import type { TranslationProvider } from "glost-translation";

/**
 * Thai translation data structure
 */
export interface ThaiTranslationData {
  [word: string]: string | string[];
}

/**
 * Options for Thai translation provider
 */
export interface ThaiTranslationProviderOptions extends BaseProviderOptions {
  /**
   * Custom data loader for translation data
   */
  dataLoader?: DataLoader<ThaiTranslationData>;

  /**
   * Target language for translations (default: 'en')
   */
  targetLanguage?: string;
}

/**
 * Thai translation provider class
 * 
 * @example
 * ```typescript
 * import { createThaiTranslationProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 * 
 * const provider = createThaiTranslationProvider({
 *   dataLoader: createJsonLoader({
 *     path: './data/thai-english-dictionary.json'
 *   }),
 *   targetLanguage: 'en'
 * });
 * ```
 */
export class ThaiTranslationProvider extends BaseDataProvider<ThaiTranslationData> implements TranslationProvider {
  protected supportedLanguages = ["th" as const];
  private dataLoader?: DataLoader<ThaiTranslationData>;
  private targetLang: string;

  constructor(options: ThaiTranslationProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
    this.targetLang = options.targetLanguage || "en";
  }

  /**
   * Load translation data
   */
  protected async loadData(): Promise<ThaiTranslationData> {
    if (!this.dataLoader) {
      this.log(
        "No data loader provided for Thai translation. Provider will return undefined.",
        "warn"
      );
      return {};
    }

    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded translations for ${Object.keys(data).length} Thai words`, "info");
      return data;
    } catch (error) {
      this.log(
        `Failed to load Thai translation data: ${error instanceof Error ? error.message : String(error)}`,
        "error"
      );
      return {};
    }
  }

  /**
   * Get translation for a Thai word
   * 
   * @param word - Thai word to translate
   * @param sourceLanguage - Source language (must be 'th')
   * @param targetLanguage - Target language (default: 'en')
   * @returns Translation string or undefined
   */
  async getTranslation(
    word: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string | undefined> {
    if (!sourceLanguage.startsWith("th")) {
      return undefined;
    }

    if (!targetLanguage.startsWith(this.targetLang)) {
      return undefined;
    }

    if (!word || typeof word !== "string" || word.trim().length === 0) {
      return undefined;
    }

    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      const result = data[word.trim()];
      
      if (result === undefined) {
        return undefined;
      }

      // Return first translation if array
      if (Array.isArray(result)) {
        return result[0];
      }

      return result;
    });
  }
}

/**
 * Create Thai translation provider
 * 
 * @param options - Provider options
 * @returns ThaiTranslationProvider instance
 */
export function createThaiTranslationProvider(
  options: ThaiTranslationProviderOptions = {}
): ThaiTranslationProvider {
  return new ThaiTranslationProvider(options);
}

/**
 * Default Thai translation provider instance
 * 
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiTranslationProvider = new ThaiTranslationProvider();
