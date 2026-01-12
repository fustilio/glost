/**
 * Korean POS Provider - Korean morphological analyzer integration
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { POSProvider } from "glost-pos";

export interface KoreanPOSData {
  [word: string]: string;
}

export interface KoreanPOSProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<KoreanPOSData>;
  tagset?: "universal" | "sejong";
}

export class KoreanPOSProvider extends BaseDataProvider<KoreanPOSData> implements POSProvider {
  protected supportedLanguages = ["ko" as const];
  private dataLoader?: DataLoader<KoreanPOSData>;
  private tagset: "universal" | "sejong";

  constructor(options: KoreanPOSProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
    this.tagset = options.tagset || "universal";
  }

  protected async loadData(): Promise<KoreanPOSData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Korean POS.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded POS tags for ${Object.keys(data).length} Korean words (tagset: ${this.tagset})`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Korean POS data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getPOS(word: string, language: string): Promise<string | undefined> {
    if (!language.startsWith("ko")) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      return data[word.trim()];
    });
  }
}

export function createKoreanPOSProvider(options: KoreanPOSProviderOptions = {}): KoreanPOSProvider {
  return new KoreanPOSProvider(options);
}

export const koreanPOSProvider = new KoreanPOSProvider();
