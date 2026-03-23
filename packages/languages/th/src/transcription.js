/**
 * Thai Transcription Provider Interface
 *
 * Defines the interface for Thai transcription providers.
 * Implementations should be provided separately based on your data source.
 */
import { THAI_TRANSCRIPTION_SCHEMES, THAI_TRANSCRIPTION_SCHEME_NAMES } from './constants.js';
// Re-export for convenience
export { THAI_TRANSCRIPTION_SCHEMES, THAI_TRANSCRIPTION_SCHEME_NAMES };
/**
 * Helper function to validate Thai transcription scheme
 *
 * @deprecated Use isValidThaiTranscriptionScheme from constants module instead
 */
export function isValidThaiScheme(scheme) {
    return Object.values(THAI_TRANSCRIPTION_SCHEMES).includes(scheme);
}
/**
 * Get display name for Thai transcription scheme
 *
 * @deprecated Use getThaiTranscriptionSchemeName from constants module instead
 */
export function getThaiSchemeDisplayName(scheme) {
    return THAI_TRANSCRIPTION_SCHEME_NAMES[scheme] ?? scheme;
}
//# sourceMappingURL=transcription.js.map