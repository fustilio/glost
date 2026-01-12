/**
 * Thai Difficulty Provider
 * 
 * Provides difficulty level assessment for Thai words based on:
 * - CEFR levels (A1-C2)
 * - Frequency data
 * - Word length and complexity
 * - Educational level standards
 * 
 * @packageDocumentation
 */

import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader, GlostLanguage } from "glost-common";
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";

/**
 * Thai difficulty data structure
 */
export interface ThaiDifficultyData {
  [word: string]: DifficultyLevel | string;
}

/**
 * Thai difficulty provider options
 */
export interface ThaiDifficultyProviderOptions extends BaseProviderOptions {
  /**
   * Custom data loader for difficulty data
   * 
   * Can include:
   * - CEFR-mapped Thai vocabulary lists
   * - Educational grade-level word lists
   * - Custom difficulty assessments
   * 
   * @example
   * ```typescript
   * import { createJsonLoader } from "glost-common";
   * 
   * const provider = createThaiDifficultyProvider({
   *   dataLoader: createJsonLoader({
   *     path: './data/thai-difficulty.json'
   *   })
   * });
   * ```
   */
  dataLoader?: DataLoader<ThaiDifficultyData>;
}

/**
 * Thai difficulty provider class
 * 
 * @example
 * ```typescript
 * import { createThaiDifficultyProvider } from "glost-th/extensions";
 * import { createJsonLoader } from "glost-common";
 * 
 * const provider = createThaiDifficultyProvider({
 *   dataLoader: createJsonLoader({
 *     path: './thai-difficulty.json'
 *   }),
 *   debug: true
 * });
 * 
 * // Use with extension
 * import { createDifficultyExtension } from "glost-difficulty";
 * 
 * const extension = createDifficultyExtension({
 *   targetLanguage: "th",
 *   provider
 * });
 * ```
 */
export class ThaiDifficultyProvider extends BaseDataProvider<ThaiDifficultyData> implements DifficultyProvider {
  protected supportedLanguages = ["th" as const];
  private dataLoader?: DataLoader<ThaiDifficultyData>;

  constructor(options: ThaiDifficultyProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  /**
   * Load difficulty data
   */
  protected async loadData(): Promise<ThaiDifficultyData> {
    if (!this.dataLoader) {
      this.log(
        "No data loader provided for Thai difficulty. Provider will return undefined.",
        "warn"
      );
      return {};
    }

    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded difficulty data for ${Object.keys(data).length} Thai words`, "info");
      return data;
    } catch (error) {
      this.log(
        `Failed to load Thai difficulty data: ${error instanceof Error ? error.message : String(error)}`,
        "error"
      );
      return {};
    }
  }

  /**
   * Get difficulty level for a Thai word
   * 
   * @param word - Thai word to assess
   * @param language - Language code (must be 'th')
   * @returns Difficulty level or undefined
   */
  async getDifficulty(
    word: string,
    language: string
  ): Promise<DifficultyLevel | string | undefined> {
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
 * Create Thai difficulty provider
 * 
 * @param options - Provider options
 * @returns ThaiDifficultyProvider instance
 */
export function createThaiDifficultyProvider(
  options: ThaiDifficultyProviderOptions = {}
): ThaiDifficultyProvider {
  return new ThaiDifficultyProvider(options);
}

/**
 * Default Thai difficulty provider instance
 * 
 * Note: Returns undefined for all queries until a data loader is configured.
 */
export const thaiDifficultyProvider = new ThaiDifficultyProvider();
