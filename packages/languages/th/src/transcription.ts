/**
 * Thai Transcription Provider Interface
 * 
 * Defines the interface for Thai transcription providers.
 * Implementations should be provided separately based on your data source.
 */

import type { TranscriptionProvider } from 'glost-common';

/**
 * Thai transcription schemes
 */
export type ThaiTranscriptionScheme = 'rtgs' | 'paiboon' | 'paiboon+' | 'aua' | 'ipa';

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
 *     const names: Record<string, string> = {
 *       'rtgs': 'RTGS',
 *       'paiboon': 'Paiboon',
 *       'paiboon+': 'Paiboon+',
 *       'aua': 'AUA',
 *       'ipa': 'IPA'
 *     };
 *     return names[scheme] ?? scheme;
 *   }
 * };
 * ```
 */
export type ThaiTranscriptionProvider = TranscriptionProvider;

/**
 * Helper function to validate Thai transcription scheme
 */
export function isValidThaiScheme(scheme: string): scheme is ThaiTranscriptionScheme {
  return ['rtgs', 'paiboon', 'paiboon+', 'aua', 'ipa'].includes(scheme);
}

/**
 * Get display name for Thai transcription scheme
 */
export function getThaiSchemeDisplayName(scheme: string): string {
  const names: Record<string, string> = {
    'rtgs': 'RTGS',
    'paiboon': 'Paiboon',
    'paiboon+': 'Paiboon+',
    'aua': 'AUA',
    'ipa': 'IPA'
  };
  return names[scheme] ?? scheme;
}
