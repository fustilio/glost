/**
 * Korean Transcription Provider - Revised Romanization + IPA
 */
import { BaseDataProvider, type BaseProviderOptions, type DataLoader, type GlostLanguage } from "glost-common";
import type { TranscriptionProvider } from "glost-transcription";

export interface KoreanTranscriptionData {
  [word: string]: { rr?: string; ipa?: string; [scheme: string]: string | undefined };
}

export interface KoreanTranscriptionProviderOptions extends BaseProviderOptions {
  dataLoader?: DataLoader<KoreanTranscriptionData>;
}

export class KoreanTranscriptionProvider extends BaseDataProvider<KoreanTranscriptionData> implements TranscriptionProvider {
  protected supportedLanguages = ["ko" as const];
  private dataLoader?: DataLoader<KoreanTranscriptionData>;

  constructor(options: KoreanTranscriptionProviderOptions = {}) {
    super(options);
    this.dataLoader = options.dataLoader;
  }

  protected async loadData(): Promise<KoreanTranscriptionData> {
    if (!this.dataLoader) {
      this.log("No data loader provided for Korean transcription.", "warn");
      return {};
    }
    try {
      const data = await this.dataLoader.load();
      this.log(`Loaded transcriptions for ${Object.keys(data).length} Korean words`, "info");
      return data;
    } catch (error) {
      this.log(`Failed to load Korean transcription data: ${error instanceof Error ? error.message : String(error)}`, "error");
      return {};
    }
  }

  async getTranscriptions(word: string, language: string): Promise<Record<string, string> | undefined> {
    if (!language.startsWith("ko")) return undefined;
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

export function createKoreanTranscriptionProvider(options: KoreanTranscriptionProviderOptions = {}): KoreanTranscriptionProvider {
  return new KoreanTranscriptionProvider(options);
}

export const koreanTranscriptionProvider = new KoreanTranscriptionProvider();
