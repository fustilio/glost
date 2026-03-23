/**
 * Japanese Transcription Provider Interface
 *
 * Defines the interface for Japanese transcription providers.
 * Implementations should be provided separately based on your data source.
 */
/**
 * Helper function to validate Japanese transcription scheme
 */
export function isValidJapaneseScheme(scheme) {
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
export function getJapaneseSchemeDisplayName(scheme) {
    const names = {
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
//# sourceMappingURL=transcription.js.map