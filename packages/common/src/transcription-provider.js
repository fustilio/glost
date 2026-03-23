/**
 * Standard transcription provider interface
 *
 * This interface has been proven across 17+ transcription systems
 * in production implementations.
 */
/**
 * Create a mapping-based transcription provider
 *
 * This helper reduces boilerplate for character-to-character
 * transcription systems.
 *
 * @param config - Provider configuration
 * @returns TranscriptionProvider instance
 *
 * @example
 * ```typescript
 * const provider = createMappingProvider({
 *   transliterate: (text, scheme) => {
 *     const mappings = schemeMappings[scheme];
 *     return Array.from(text)
 *       .map(char => mappings[char] ?? char)
 *       .join('');
 *   },
 *   availableSchemes: ['iast', 'national', 'ipa'] as const,
 *   defaultScheme: 'national' as const,
 *   schemeDisplayNames: {
 *     iast: 'IAST',
 *     national: 'National',
 *     ipa: 'IPA'
 *   }
 * });
 * ```
 */
export function createMappingProvider(config) {
    return {
        getTranscription(text, scheme) {
            if (!this.hasScheme(scheme))
                return undefined;
            return config.transliterate(text, scheme);
        },
        getDefaultScheme() {
            return config.defaultScheme;
        },
        hasScheme(scheme) {
            return config.availableSchemes.includes(scheme);
        },
        getAvailableSchemes() {
            return [...config.availableSchemes];
        },
        getSchemeDisplayName(scheme) {
            return config.schemeDisplayNames[scheme] ?? scheme;
        }
    };
}
/**
 * Create a lookup-based transcription provider
 *
 * This helper is useful for dictionary-based transcription
 * where pronunciation varies by word.
 *
 * @param config - Provider configuration
 * @returns TranscriptionProvider instance
 *
 * @example
 * ```typescript
 * const transcriptions: Record<string, Record<string, string>> = {
 *   'hello': { ipa: 'həˈloʊ', simplified: 'huh-LOW' },
 *   'goodbye': { ipa: 'ɡʊdˈbaɪ', simplified: 'good-BYE' }
 * };
 *
 * const provider = createLookupProvider({
 *   lookup: (word, scheme) => transcriptions[word]?.[scheme],
 *   availableSchemes: ['ipa', 'simplified'] as const,
 *   defaultScheme: 'ipa' as const,
 *   schemeDisplayNames: {
 *     ipa: 'IPA',
 *     simplified: 'Simplified'
 *   }
 * });
 * ```
 */
export function createLookupProvider(config) {
    return {
        getTranscription(text, scheme) {
            if (!this.hasScheme(scheme))
                return undefined;
            return config.lookup(text, scheme);
        },
        getDefaultScheme() {
            return config.defaultScheme;
        },
        hasScheme(scheme) {
            return config.availableSchemes.includes(scheme);
        },
        getAvailableSchemes() {
            return [...config.availableSchemes];
        },
        getSchemeDisplayName(scheme) {
            return config.schemeDisplayNames[scheme] ?? scheme;
        }
    };
}
/**
 * Combine multiple transcription providers with fallback behavior
 *
 * @param providers - Array of providers to try in order
 * @returns Combined provider that tries each in sequence
 *
 * @example
 * ```typescript
 * const combined = createFallbackProvider([
 *   dictionaryProvider,  // Try dictionary first
 *   ruleBasedProvider    // Fall back to rules
 * ]);
 * ```
 */
export function createFallbackProvider(providers) {
    if (providers.length === 0) {
        throw new Error('At least one provider is required');
    }
    return {
        getTranscription(text, scheme) {
            for (const provider of providers) {
                const result = provider.getTranscription(text, scheme);
                if (result !== undefined)
                    return result;
            }
            return undefined;
        },
        getDefaultScheme() {
            return providers[0].getDefaultScheme();
        },
        hasScheme(scheme) {
            return providers.some(p => p.hasScheme(scheme));
        },
        getAvailableSchemes() {
            const schemes = new Set();
            for (const provider of providers) {
                provider.getAvailableSchemes().forEach(s => schemes.add(s));
            }
            return Array.from(schemes);
        },
        getSchemeDisplayName(scheme) {
            for (const provider of providers) {
                if (provider.hasScheme(scheme)) {
                    return provider.getSchemeDisplayName(scheme);
                }
            }
            return scheme;
        }
    };
}
//# sourceMappingURL=transcription-provider.js.map