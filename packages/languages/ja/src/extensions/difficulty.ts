/**
 * Japanese Difficulty Provider - JLPT level mapping
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { DifficultyProvider, DifficultyLevel } from "glost-difficulty";

export interface JapaneseDifficultyData {
  [word: string]: DifficultyLevel | string;
}

export interface JapaneseDifficultyProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<JapaneseDifficultyData>;
}

export class JapaneseDifficultyProvider extends BaseDataProvider<JapaneseDifficultyData> implements DifficultyProvider {
  protected supportedLanguages = ["ja" as const];
  private dataLoader?: DataLoader<JapaneseDifficultyData>;

  constructor(options: JapaneseDifficultyProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  protected async loadData(): Promise<JapaneseDifficultyData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Japanese difficulty.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded difficulty data for ${Object.keys(data).length} Japanese words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Japanese difficulty data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getDifficulty(word: string, language: string): Promise<DifficultyLevel | string | undefined> {
    if (!language.startsWith("ja")) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      return data[word.trim()];
    });
  }
}

export function createJapaneseDifficultyProvider(options: JapaneseDifficultyProviderOptions = {}): JapaneseDifficultyProvider {
  return new JapaneseDifficultyProvider(options);
}

export const japaneseDifficultyProvider = new JapaneseDifficultyProvider();
