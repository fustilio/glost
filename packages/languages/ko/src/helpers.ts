/**
 * Korean Language Helper Functions
 * 
 * Convenience functions for creating Korean GLOST nodes with romanization.
 */

import type { GLOSTWord, TransliterationData, LinguisticMetadata } from 'glost';
import { createGLOSTWordNode } from 'glost';

/**
 * Options for creating a Korean word node
 */
export interface CreateKoreanWordOptions {
  /** Korean text (Hangul) */
  text: string;
  /** Romanization (RR: Revised Romanization) */
  romanization: string;
  /** Part of speech (default: "unknown") */
  partOfSpeech?: string;
}

/**
 * Create a Korean word node with romanization
 *
 * @example
 * ```typescript
 * const word = createKoreanWord({
 *   text: "안녕하세요",
 *   romanization: "annyeonghaseyo",
 *   partOfSpeech: "interjection"
 * });
 * ```
 */
export function createKoreanWord(
  options: CreateKoreanWordOptions,
): GLOSTWord {
  const { text, romanization, partOfSpeech = "unknown" } = options;

  const transcription: TransliterationData = {
    romanization: {
      text: romanization,
      syllables: [text],
    },
  };

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode({
    value: text,
    transcription,
    metadata,
    lang: "ko",
    script: "hangul",
  });
}
