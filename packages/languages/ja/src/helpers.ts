/**
 * Japanese Language Helper Functions
 * 
 * Convenience functions for creating Japanese GLOST nodes with romaji and furigana.
 */

import type { GLOSTWord, TransliterationData, LinguisticMetadata } from 'glost';
import { createGLOSTWordNode } from 'glost';

/**
 * Options for creating a Japanese word node
 */
export interface CreateJapaneseWordOptions {
  /** Japanese text */
  text: string;
  /** Romaji romanization */
  romaji: string;
  /** Part of speech (default: "unknown") */
  partOfSpeech?: string;
  /** Furigana reading */
  furigana?: string;
}

/**
 * Create a Japanese word node with romaji transcription
 *
 * @example
 * ```typescript
 * const word = createJapaneseWord({
 *   text: "こんにちは",
 *   romaji: "konnichiwa",
 *   partOfSpeech: "interjection",
 *   furigana: "こんにちは"
 * });
 * ```
 */
export function createJapaneseWord(
  options: CreateJapaneseWordOptions,
): GLOSTWord {
  const { text, romaji, partOfSpeech = "unknown", furigana } = options;

  const transcription: TransliterationData = {
    romaji: {
      text: romaji,
      system: "romaji",
      syllables: [text],
    },
  };

  if (furigana) {
    transcription.furigana = {
      text: furigana,
      system: "furigana",
      syllables: [text],
    };
  }

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode({
    value: text,
    transcription,
    metadata,
    lang: "ja",
    script: "hiragana",
  });
}
