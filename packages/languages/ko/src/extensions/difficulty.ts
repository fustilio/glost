/**
 * Korean Difficulty Provider - TOPIK level mapping
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";

export interface KoreanDifficultyData {
  [word: string]: DifficultyLevel | string;
}

export interface KoreanDifficultyProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<KoreanDifficultyData>;
}

export class KoreanDifficultyProvider extends BaseDataProvider<KoreanDifficultyData> implements DifficultyProvider {
  protected supportedLanguages = ["ko" as const];
  private dataLoader?: DataLoader<KoreanDifficultyData>;

  constructor(options: KoreanDifficultyProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  protected async loadData(): Promise<KoreanDifficultyData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Korean difficulty.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded difficulty data for ${Object.keys(data).length} Korean words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Korean difficulty data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getDifficulty(word: string, language: string): Promise<DifficultyLevel | string | undefined> {
    if (!language.startsWith("ko")) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      return data[word.trim()];
    });
  }
}

export function createKoreanDifficultyProvider(options: KoreanDifficultyProviderOptions = {}): KoreanDifficultyProvider {
  return new KoreanDifficultyProvider(options);
}

export const koreanDifficultyProvider = new KoreanDifficultyProvider();
