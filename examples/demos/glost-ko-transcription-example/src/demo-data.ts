/**
 * Demo Korean Transcription Data
 * 
 * Minimal vocabulary data for demonstrating Korean transcription.
 */

export interface KoreanTranscriptionEntry {
  word: string;
  transcriptions: {
    rr?: string;           // Revised Romanization
    mr?: string;           // McCune-Reischauer
    yale?: string;         // Yale romanization
    hangul?: string;       // Hangul (original)
  };
}

/**
 * Demo Korean vocabulary with transcriptions
 */
export const DEMO_TRANSCRIPTIONS: KoreanTranscriptionEntry[] = [
  {
    word: "안녕하세요",
    transcriptions: {
      rr: "annyeonghaseyo",
      mr: "annyŏnghaseyo",
      yale: "annyenghaseyyo",
      hangul: "안녕하세요",
    },
  },
  {
    word: "감사합니다",
    transcriptions: {
      rr: "gamsahamnida",
      mr: "kamsahamnida",
      yale: "kamsa hamnita",
      hangul: "감사합니다",
    },
  },
  {
    word: "한국어",
    transcriptions: {
      rr: "hangugeo",
      mr: "han'gugŏ",
      yale: "hankwuke",
      hangul: "한국어",
    },
  },
  {
    word: "공부",
    transcriptions: {
      rr: "gongbu",
      mr: "kongbu",
      yale: "kongpu",
      hangul: "공부",
    },
  },
  {
    word: "사랑",
    transcriptions: {
      rr: "sarang",
      mr: "sarang",
      yale: "salang",
      hangul: "사랑",
    },
  },
];

/**
 * Get transcriptions for a Korean word
 */
export function getKoreanTranscriptions(
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
