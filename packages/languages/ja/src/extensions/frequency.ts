/**
 * Japanese Frequency Provider
 * 
 * Provides word frequency data for Japanese based on corpus analysis (e.g., BCCWJ).
 * 
 * @packageDocumentation
 */

import { BaseDataProvider, type BaseProviderOptions } from "glost-common";
import type { DataLoader, GlostLanguage } from "glost-common";
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";

/**
 * Japanese frequency data structure
 */
export interface JapaneseFrequencyData {
  [word: string]: FrequencyLevel;
}

/**
 * Japanese frequency provider options
 */
export interface JapaneseFrequencyProviderOptions extends BaseProviderOptions {
  /**
   * Custom data loader for frequency data
   * 
   * Recommended sources:
   * - BCCWJ (Balanced Corpus of Contemporary Written Japanese)
   * - JMDict frequency rankings
   * - Other Japanese language resources
   */
  dataLoader?: DataLoader<JapaneseFrequencyData>;
}

/**
 * Japanese frequency provider class
 */
export class JapaneseFrequencyProvider extends BaseDataProvider<JapaneseFrequencyData> implements FrequencyProvider {
  protected supportedLanguages = ["ja" as const];
  private dataLoader?: DataLoader<JapaneseFrequencyData>;

  constructor(options: JapaneseFrequencyProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  protected async loadData(): Promise<JapaneseFrequencyData> {
    if (!this.dataLoader) {
      this.log(
        "No data loader provided for Japanese frequency. Provider will return undefined.",
        "warn"
      );
      return {};
    }

    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded frequency data for ${Object.keys(data).length} Japanese words`, "info");
      return data;
    } catch (error) {
      this.log(
        `Failed to load Japanese frequency data: ${error instanceof Error ? error.message : String(error)}`,
        "error"
      );
      return {};
    }
  }

  async getFrequency(
    word: string,
    language: GlostLanguage
  ): Promise<FrequencyLevel | undefined> {
    if (language !== "ja") {
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

export function createJapaneseFrequencyProvider(
  options: JapaneseFrequencyProviderOptions = {}
): JapaneseFrequencyProvider {
  return new JapaneseFrequencyProvider(options);
}

export const japaneseFrequencyProvider = new JapaneseFrequencyProvider();
