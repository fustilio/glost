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
  /** Romaji romanization (optional) */
  romaji?: string;
  /** Part of speech (default: "unknown") */
  partOfSpeech?: string;
  /** Furigana reading */
  furigana?: string;
}

/**
 * Create a Japanese word node with optional romaji transcription
 *
 * @example
 * ```typescript
 * // With transcription
 * const word = createJapaneseWord({
 *   text: "こんにちは",
 *   romaji: "konnichiwa",
 *   partOfSpeech: "interjection",
 *   furigana: "こんにちは"
 * });
 * 
 * // Without transcription (to be added by extensions)
 * const word = createJapaneseWord({ text: "こんにちは" });
 * ```
 */
export function createJapaneseWord(
  options: CreateJapaneseWordOptions,
): GLOSTWord {
  const { text, romaji, partOfSpeech = "unknown", furigana } = options;

  // Only create transcription if romaji or furigana is provided
  const transcription: TransliterationData | undefined = (romaji || furigana) ? {
    ...(romaji && {
      romaji: {
        text: romaji,
        syllables: [text],
      },
    }),
    ...(furigana && {
      furigana: {
        text: furigana,
        syllables: [text],
      },
    }),
  } : undefined;

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
