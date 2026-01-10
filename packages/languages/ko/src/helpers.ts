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
  /** Romanization (RR: Revised Romanization) - optional */
  romanization?: string;
  /** Part of speech (default: "unknown") */
  partOfSpeech?: string;
}

/**
 * Create a Korean word node with optional romanization
 *
 * @example
 * ```typescript
 * // With romanization
 * const word = createKoreanWord({
 *   text: "안녕하세요",
 *   romanization: "annyeonghaseyo",
 *   partOfSpeech: "interjection"
 * });
 * 
 * // Without romanization (to be added by extensions)
 * const word = createKoreanWord({ text: "안녕하세요" });
 * ```
 */
export function createKoreanWord(
  options: CreateKoreanWordOptions,
): GLOSTWord {
  const { text, romanization, partOfSpeech = "unknown" } = options;

  // Only create transcription if romanization is provided
  const transcription: TransliterationData | undefined = romanization ? {
    romanization: {
      text: romanization,
      syllables: [text],
    },
  } : undefined;

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
