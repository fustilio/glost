/**
 * Japanese Translation Provider - JMDict integration patterns
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { TranslationProvider } from "glost-translation";

export interface JapaneseTranslationData {
  [word: string]: string | string[];
}

export interface JapaneseTranslationProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<JapaneseTranslationData>;
  targetLanguage?: string;
}

export class JapaneseTranslationProvider extends BaseDataProvider<JapaneseTranslationData> implements TranslationProvider {
  protected supportedLanguages = ["ja" as const];
  private dataLoader?: DataLoader<JapaneseTranslationData>;
  private targetLang: string;

  constructor(options: JapaneseTranslationProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
    this.targetLang = options.targetLanguage || "en";
  }

  protected async loadData(): Promise<JapaneseTranslationData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Japanese translation.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded translations for ${Object.keys(data).length} Japanese words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Japanese translation data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getTranslation(word: string, sourceLanguage: string, targetLanguage: string): Promise<string | undefined> {
    if (!sourceLanguage.startsWith("ja") || !targetLanguage.startsWith(this.targetLang)) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      const result = data[word.trim()];
      if (result === undefined) return undefined;
      return Array.isArray(result) ? result[0] : result;
    });
  }
}

export function createJapaneseTranslationProvider(options: JapaneseTranslationProviderOptions = {}): JapaneseTranslationProvider {
  return new JapaneseTranslationProvider(options);
}

export const japaneseTranslationProvider = new JapaneseTranslationProvider();
