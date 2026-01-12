/**
 * Korean Translation Provider
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { TranslationProvider } from "glost-translation";

export interface KoreanTranslationData {
  [word: string]: string | string[];
}

export interface KoreanTranslationProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<KoreanTranslationData>;
  targetLanguage?: string;
}

export class KoreanTranslationProvider extends BaseDataProvider<KoreanTranslationData> implements TranslationProvider {
  protected supportedLanguages = ["ko" as const];
  private dataLoader?: DataLoader<KoreanTranslationData>;
  private targetLang: string;

  constructor(options: KoreanTranslationProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
    this.targetLang = options.targetLanguage || "en";
  }

  protected async loadData(): Promise<KoreanTranslationData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Korean translation.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded translations for ${Object.keys(data).length} Korean words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Korean translation data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getTranslation(word: string, sourceLanguage: string, targetLanguage: string): Promise<string | undefined> {
    if (!sourceLanguage.startsWith("ko") || !targetLanguage.startsWith(this.targetLang)) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      const result = data[word.trim()];
      if (result === undefined) return undefined;
      return Array.isArray(result) ? result[0] : result;
    });
  }
}

export function createKoreanTranslationProvider(options: KoreanTranslationProviderOptions = {}): KoreanTranslationProvider {
  return new KoreanTranslationProvider(options);
}

export const koreanTranslationProvider = new KoreanTranslationProvider();
