/**
 * Korean Frequency Provider
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { FrequencyProvider, FrequencyLevel } from "glost-frequency";

export interface KoreanFrequencyData {
  [word: string]: FrequencyLevel;
}

export interface KoreanFrequencyProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<KoreanFrequencyData>;
}

export class KoreanFrequencyProvider extends BaseDataProvider<KoreanFrequencyData> implements FrequencyProvider {
  protected supportedLanguages = ["ko" as const];
  private dataLoader?: DataLoader<KoreanFrequencyData>;

  constructor(options: KoreanFrequencyProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  protected async loadData(): Promise<KoreanFrequencyData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Korean frequency.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded frequency data for ${Object.keys(data).length} Korean words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Korean frequency data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getFrequency(word: string, language: GlostLanguage): Promise<FrequencyLevel | undefined> {
    if (language !== "ko") return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      return data[word.trim()];
    });
  }
}

export function createKoreanFrequencyProvider(options: KoreanFrequencyProviderOptions = {}): KoreanFrequencyProvider {
  return new KoreanFrequencyProvider(options);
}

export const koreanFrequencyProvider = new KoreanFrequencyProvider();
