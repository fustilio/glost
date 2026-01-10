/**
 * Thai Transcription Provider Interface
 * 
 * Defines the interface for Thai transcription providers.
 * Implementations should be provided separately based on your data source.
 */

import type { TranscriptionProvider } from 'glost-common';
import { 
  THAI_TRANSCRIPTION_SCHEMES, 
  THAI_TRANSCRIPTION_SCHEME_NAMES,
  type ThaiTranscriptionScheme 
} from './constants.js';

// Re-export for convenience
export { THAI_TRANSCRIPTION_SCHEMES, THAI_TRANSCRIPTION_SCHEME_NAMES };
export type { ThaiTranscriptionScheme };

/**
 * Thai transcription provider interface
 * 
 * Implement this interface to provide Thai transcription functionality.
 * Common schemes include:
 * - rtgs: Royal Thai General System of Transcription
 * - paiboon: Paiboon romanization
 * - paiboon+: Paiboon+ with tone marks
 * - aua: American University Alumni (AUA) system
 * - ipa: International Phonetic Alphabet
 * 
 * @example
 * ```typescript
 * const provider: ThaiTranscriptionProvider = {
 *   getTranscription(text: string, scheme: string): string | undefined {
 *     // Your implementation here
 *     return transcription;
 *   },
 *   getDefaultScheme(): string {
 *     return 'paiboon+';
 *   },
 *   hasScheme(scheme: string): boolean {
 *     return ['rtgs', 'paiboon+', 'ipa'].includes(scheme);
 *   },
 *   getAvailableSchemes(): string[] {
 *     return ['rtgs', 'paiboon', 'paiboon+', 'aua', 'ipa'];
 *   },
 *   getSchemeDisplayName(scheme: string): string {
 *     return THAI_TRANSCRIPTION_SCHEME_NAMES[scheme] ?? scheme;
 *   }
 * };
 * ```
 */
export type ThaiTranscriptionProvider = TranscriptionProvider;

/**
 * Helper function to validate Thai transcription scheme
 * 
 * @deprecated Use isValidThaiTranscriptionScheme from constants module instead
 */
export function isValidThaiScheme(scheme: string): scheme is ThaiTranscriptionScheme {
  return Object.values(THAI_TRANSCRIPTION_SCHEMES).includes(scheme as ThaiTranscriptionScheme);
}

/**
 * Get display name for Thai transcription scheme
 * 
 * @deprecated Use getThaiTranscriptionSchemeName from constants module instead
 */
export function getThaiSchemeDisplayName(scheme: string): string {
  return THAI_TRANSCRIPTION_SCHEME_NAMES[scheme] ?? scheme;
}
