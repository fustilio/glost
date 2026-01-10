/**
 * Japanese Transcription Provider Interface
 * 
 * Defines the interface for Japanese transcription providers.
 * Implementations should be provided separately based on your data source.
 */

import type { TranscriptionProvider } from 'glost-common';
import type { JapaneseTranscriptionScheme } from './constants.js';

/**
 * Japanese transcription provider interface
 * 
 * Implement this interface to provide Japanese transcription functionality.
 * Common schemes include:
 * - romaji: Generic romanization
 * - hepburn: Hepburn romanization (most common)
 * - kunrei: Kunrei-shiki romanization
 * - nihon: Nihon-shiki romanization
 * - furigana: Reading aid in kana
 * - hiragana: Hiragana reading
 * - katakana: Katakana reading
 * - ipa: International Phonetic Alphabet
 * 
 * @example
 * ```typescript
 * const provider: JapaneseTranscriptionProvider = {
 *   getTranscription(text: string, scheme: string): string | undefined {
 *     // Your implementation here
 *     return transcription;
 *   },
 *   getDefaultScheme(): string {
 *     return 'hepburn';
 *   },
 *   hasScheme(scheme: string): boolean {
 *     return ['hepburn', 'furigana', 'ipa'].includes(scheme);
 *   },
 *   getAvailableSchemes(): string[] {
 *     return ['romaji', 'hepburn', 'kunrei', 'furigana', 'ipa'];
 *   },
 *   getSchemeDisplayName(scheme: string): string {
 *     const names: Record<string, string> = {
 *       'romaji': 'Romaji',
 *       'hepburn': 'Hepburn',
 *       'kunrei': 'Kunrei-shiki',
 *       'nihon': 'Nihon-shiki',
 *       'furigana': 'Furigana',
 *       'ipa': 'IPA'
 *     };
 *     return names[scheme] ?? scheme;
 *   }
 * };
 * ```
 */
export type JapaneseTranscriptionProvider = TranscriptionProvider;

/**
 * Helper function to validate Japanese transcription scheme
 */
export function isValidJapaneseScheme(scheme: string): scheme is JapaneseTranscriptionScheme {
  return [
    'romaji', 
    'hepburn', 
    'kunrei', 
    'nihon',
    'furigana', 
    'hiragana', 
    'katakana',
    'ipa'
  ].includes(scheme);
}

/**
 * Get display name for Japanese transcription scheme
 */
export function getJapaneseSchemeDisplayName(scheme: string): string {
  const names: Record<string, string> = {
    'romaji': 'Romaji',
    'hepburn': 'Hepburn',
    'kunrei': 'Kunrei-shiki',
    'nihon': 'Nihon-shiki',
    'furigana': 'Furigana',
    'hiragana': 'Hiragana',
    'katakana': 'Katakana',
    'ipa': 'IPA'
  };
  return names[scheme] ?? scheme;
}
