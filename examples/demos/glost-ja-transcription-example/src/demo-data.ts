/**
 * Demo Japanese Transcription Data
 * 
 * Minimal vocabulary data for demonstrating Japanese transcription.
 */

export interface JapaneseTranscriptionEntry {
  word: string;
  transcriptions: {
    romaji?: string;
    hiragana?: string;
    katakana?: string;
    hepburn?: string;
  };
}

/**
 * Demo Japanese vocabulary with transcriptions
 */
export const DEMO_TRANSCRIPTIONS: JapaneseTranscriptionEntry[] = [
  {
    word: "こんにちは",
    transcriptions: {
      romaji: "konnichiwa",
      hiragana: "こんにちは",
      hepburn: "konnichiwa",
    },
  },
  {
    word: "ありがとう",
    transcriptions: {
      romaji: "arigatou",
      hiragana: "ありがとう",
      hepburn: "arigatō",
    },
  },
  {
    word: "日本語",
    transcriptions: {
      romaji: "nihongo",
      hiragana: "にほんご",
      hepburn: "nihongo",
    },
  },
  {
    word: "勉強",
    transcriptions: {
      romaji: "benkyou",
      hiragana: "べんきょう",
      hepburn: "benkyō",
    },
  },
  {
    word: "カタカナ",
    transcriptions: {
      romaji: "katakana",
      hiragana: "かたかな",
      katakana: "カタカナ",
      hepburn: "katakana",
    },
  },
];

/**
 * Get transcriptions for a Japanese word
 */
export function getJapaneseTranscriptions(
  word: string,
  schemes?: string[]
): Record<string, string> | undefined {
  const entry = DEMO_TRANSCRIPTIONS.find((e) => e.word === word);
  if (!entry) return undefined;

  const result: Record<string, string> = {};

  if (schemes && schemes.length > 0) {
    for (const scheme of schemes) {
      const value = entry.transcriptions[scheme as keyof typeof entry.transcriptions];
      if (value) {
        result[scheme] = value;
      }
    }
  } else {
    Object.entries(entry.transcriptions).forEach(([scheme, value]) => {
      if (value) result[scheme] = value;
    });
  }

  return Object.keys(result).length > 0 ? result : undefined;
}
