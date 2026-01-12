/**
 * Japanese Transcription Provider - Romaji and IPA
 * See packages/extensions/templates/PROVIDER_TEMPLATE.md for usage guide
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { TranscriptionProvider } from "glost-transcription";

export interface JapaneseTranscriptionData {
  [word: string]: { romaji?: string; hepburn?: string; kunrei?: string; ipa?: string; [scheme: string]: string | undefined };
}

export interface JapaneseTranscriptionProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<JapaneseTranscriptionData>;
}

export class JapaneseTranscriptionProvider extends BaseDataProvider<JapaneseTranscriptionData> implements TranscriptionProvider {
  protected supportedLanguages = ["ja" as const];
  private dataLoader?: DataLoader<JapaneseTranscriptionData>;

  constructor(options: JapaneseTranscriptionProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  protected async loadData(): Promise<JapaneseTranscriptionData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Japanese transcription.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded transcriptions for ${Object.keys(data).length} Japanese words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Japanese transcription data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getTranscriptions(word: string, language: string): Promise<Record<string, string> | undefined> {
    if (!language.startsWith("ja")) return undefined;
    if (!word || typeof word !== "string" || word.trim().length === 0) return undefined;
    return this.withErrorHandling(async () => {
      const data = await this.ensureLoaded();
      const result = data[word.trim()];
      if (!result) return undefined;
      
      // Filter out undefined values to match Record<string, string>
      const filtered: Record<string, string> = {};
      for (const [key, value] of Object.entries(result)) {
        if (value !== undefined) {
          filtered[key] = value;
        }
      }
      
      return Object.keys(filtered).length > 0 ? filtered : undefined;
    });
  }
}

export function createJapaneseTranscriptionProvider(options: JapaneseTranscriptionProviderOptions = {}): JapaneseTranscriptionProvider {
  return new JapaneseTranscriptionProvider(options);
}

export const japaneseTranscriptionProvider = new JapaneseTranscriptionProvider();
