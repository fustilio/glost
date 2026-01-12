/**
 * Japanese POS Provider - MeCab/Universal Dependencies integration
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { POSProvider } from "glost-pos";

export interface JapanesePOSData {
  [word: string]: string;
}

export interface JapanesePOSProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<JapanesePOSData>;
  tagset?: "universal" | "mecab";
}

export class JapanesePOSProvider extends BaseDataProvider<JapanesePOSData> implements POSProvider {
  protected supportedLanguages = ["ja" as const];
  private dataLoader?: DataLoader<JapanesePOSData>;
  private tagset: "universal" | "mecab";

  constructor(options: JapanesePOSProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
    this.tagset = options.tagset || "universal";
  }

  protected async loadData(): Promise<JapanesePOSData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Japanese POS.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded POS tags for ${Object.keys(data).length} Japanese words (tagset: ${this.tagset})`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Japanese POS data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getPOS(word: string, language: string): Promise<string | undefined> {
    if (!language.startsWith("ja")) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      return data[word.trim()];
    });
  }
}

export function createJapanesePOSProvider(options: JapanesePOSProviderOptions = {}): JapanesePOSProvider {
  return new JapanesePOSProvider(options);
}

export const japanesePOSProvider = new JapanesePOSProvider();
