/**
 * Thai Language Helper Functions
 * 
 * Convenience functions for creating Thai GLOST nodes with RTGS transcription.
 */

import type { GLOSTWord, TransliterationData, LinguisticMetadata } from 'glost';
import { createGLOSTWordNode } from 'glost';

/**
 * Options for creating a Thai word node
 */
export interface CreateThaiWordOptions {
  /** Thai text */
  text: string;
  /** RTGS romanization */
  rtgs: string;
  /** Part of speech (default: "unknown") */
  partOfSpeech?: string;
  /** Tone number */
  tone?: number;
  /** Syllable breakdown */
  syllables?: string[];
}

/**
 * Create a Thai word node with RTGS transcription
 *
 * @example
 * ```typescript
 * const word = createThaiWord({
 *   text: "สวัสดี",
 *   rtgs: "sawatdi",
 *   partOfSpeech: "interjection",
 *   tone: 2,
 *   syllables: ["sa", "wat", "di"]
 * });
 * ```
 */
export function createThaiWord(options: CreateThaiWordOptions): GLOSTWord {
  const { text, rtgs, partOfSpeech = "unknown", tone, syllables } = options;

  const transcription: TransliterationData = {
    rtgs: {
      text: rtgs,
      tone,
      syllables: syllables || [text],
    },
  };

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode({
    value: text,
    transcription,
    metadata,
    lang: "th",
    script: "thai",
  });
}
