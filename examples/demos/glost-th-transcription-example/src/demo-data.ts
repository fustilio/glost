/**
 * Demo Thai Transcription Data
 * 
 * Minimal vocabulary data for demonstrating Thai transcription.
 * This shows how to structure transcription data for use with glost-transcription.
 */

export interface ThaiTranscriptionEntry {
  word: string;
  transcriptions: {
    rtgs?: string;
    ipa?: string;
    "paiboon+"?: string;
    aua?: string;
  };
}

/**
 * Demo Thai vocabulary with transcriptions
 * 
 * In a real application, this would come from:
 * - A comprehensive Thai dictionary database
 * - An API service
 * - Dictionary files (JSON, SQLite, etc.)
 */
export const DEMO_TRANSCRIPTIONS: ThaiTranscriptionEntry[] = [
  {
    word: "สวัสดี",
    transcriptions: {
      rtgs: "sawatdi",
      ipa: "sà.wàt.diː",
      "paiboon+": "sà-wàt-dii",
      aua: "sawatdi",
    },
  },
  {
    word: "ขอบคุณ",
    transcriptions: {
      rtgs: "khop khun",
      ipa: "kʰɔ̀ːp.kʰun",
      "paiboon+": "kòrp-kun",
      aua: "khop khun",
    },
  },
  {
    word: "ภาษา",
    transcriptions: {
      rtgs: "phasa",
      ipa: "pʰaː.sǎː",
      "paiboon+": "paa-săa",
      aua: "phasa",
    },
  },
  {
    word: "ไทย",
    transcriptions: {
      rtgs: "thai",
      ipa: "tʰaj",
      "paiboon+": "tai",
      aua: "thai",
    },
  },
  {
    word: "เรียน",
    transcriptions: {
      rtgs: "rian",
      ipa: "riːan",
      "paiboon+": "riian",
      aua: "rian",
    },
  },
];

/**
 * Get transcriptions for a Thai word
 * 
 * @param word - Thai word to look up
 * @param schemes - Optional array of specific schemes to return
 * @returns Transcriptions object or undefined if not found
 */
export function getThaiTranscriptions(
  word: string,
  schemes?: string[]
): Record<string, string> | undefined {
  const entry = DEMO_TRANSCRIPTIONS.find((e) => e.word === word);
  if (!entry) return undefined;

  const result: Record<string, string> = {};

  if (schemes && schemes.length > 0) {
    // Return only requested schemes
    for (const scheme of schemes) {
      const value = entry.transcriptions[scheme as keyof typeof entry.transcriptions];
      if (value) {
        result[scheme] = value;
      }
    }
  } else {
    // Return all available transcriptions
    Object.entries(entry.transcriptions).forEach(([scheme, value]) => {
      if (value) result[scheme] = value;
    });
  }

  return Object.keys(result).length > 0 ? result : undefined;
}
