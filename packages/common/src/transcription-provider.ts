/**
 * Standard transcription provider interface
 * 
 * This interface has been proven across 17+ transcription systems
 * in production implementations.
 */

/**
 * Transcription provider interface
 * 
 * Transcription providers convert text from one script to another
 * representation system (romanization, IPA, etc.)
 * 
 * @example
 * ```typescript
 * const provider: TranscriptionProvider = {
 *   getTranscription: (text, scheme) => {
 *     if (scheme === 'romaji') return romanize(text);
 *     if (scheme === 'ipa') return toIPA(text);
 *     return undefined;
 *   },
 *   getDefaultScheme: () => 'romaji',
 *   hasScheme: (scheme) => ['romaji', 'ipa'].includes(scheme),
 *   getAvailableSchemes: () => ['romaji', 'ipa'],
 *   getSchemeDisplayName: (scheme) => 
 *     scheme === 'romaji' ? 'Romaji' : 'IPA'
 * };
 * ```
 */
export interface TranscriptionProvider {
  /**
   * Get transcription for text in specific scheme
   * 
   * @param text - Text to transcribe
   * @param scheme - Transcription scheme (e.g., 'ipa', 'romaji', 'pinyin')
   * @returns Transcribed text, or undefined if not available
   */
  getTranscription(text: string, scheme: string): string | undefined;
  
  /**
   * Get the default transcription scheme
   * 
   * @returns Default scheme identifier
   */
  getDefaultScheme(): string;
  
  /**
   * Check if scheme is supported
   * 
   * @param scheme - Scheme identifier to check
   * @returns True if scheme is supported
   */
  hasScheme(scheme: string): boolean;
  
  /**
   * List all available schemes
   * 
   * @returns Array of scheme identifiers
   */
  getAvailableSchemes(): string[];
  
  /**
   * Get human-readable scheme name
   * 
   * @param scheme - Scheme identifier
   * @returns Display name for the scheme
   */
  getSchemeDisplayName(scheme: string): string;
}

/**
 * Configuration for creating a mapping-based transcription provider
 */
export interface MappingProviderConfig<TScheme extends string> {
  /**
   * Function to transliterate text in a specific scheme
   */
  transliterate: (text: string, scheme: TScheme) => string;
  
  /**
   * Available transcription schemes
   */
  availableSchemes: readonly TScheme[];
  
  /**
   * Default scheme
   */
  defaultScheme: TScheme;
  
  /**
   * Display names for schemes
   */
  schemeDisplayNames: Record<TScheme, string>;
}

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
export function createMappingProvider<TScheme extends string>(
  config: MappingProviderConfig<TScheme>
): TranscriptionProvider {
  return {
    getTranscription(text: string, scheme: string): string | undefined {
      if (!this.hasScheme(scheme)) return undefined;
      return config.transliterate(text, scheme as TScheme);
    },
    
    getDefaultScheme(): string {
      return config.defaultScheme;
    },
    
    hasScheme(scheme: string): boolean {
      return (config.availableSchemes as readonly string[]).includes(scheme);
    },
    
    getAvailableSchemes(): string[] {
      return [...config.availableSchemes];
    },
    
    getSchemeDisplayName(scheme: string): string {
      return config.schemeDisplayNames[scheme as TScheme] ?? scheme;
    }
  };
}

/**
 * Configuration for creating a lookup-based transcription provider
 */
export interface LookupProviderConfig<TScheme extends string> {
  /**
   * Function to lookup transcription for a word
   */
  lookup: (word: string, scheme: TScheme) => string | undefined;
  
  /**
   * Available transcription schemes
   */
  availableSchemes: readonly TScheme[];
  
  /**
   * Default scheme
   */
  defaultScheme: TScheme;
  
  /**
   * Display names for schemes
   */
  schemeDisplayNames: Record<TScheme, string>;
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
export function createLookupProvider<TScheme extends string>(
  config: LookupProviderConfig<TScheme>
): TranscriptionProvider {
  return {
    getTranscription(text: string, scheme: string): string | undefined {
      if (!this.hasScheme(scheme)) return undefined;
      return config.lookup(text, scheme as TScheme);
    },
    
    getDefaultScheme(): string {
      return config.defaultScheme;
    },
    
    hasScheme(scheme: string): boolean {
      return (config.availableSchemes as readonly string[]).includes(scheme);
    },
    
    getAvailableSchemes(): string[] {
      return [...config.availableSchemes];
    },
    
    getSchemeDisplayName(scheme: string): string {
      return config.schemeDisplayNames[scheme as TScheme] ?? scheme;
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
export function createFallbackProvider(
  providers: TranscriptionProvider[]
): TranscriptionProvider {
  if (providers.length === 0) {
    throw new Error('At least one provider is required');
  }
  
  return {
    getTranscription(text: string, scheme: string): string | undefined {
      for (const provider of providers) {
        const result = provider.getTranscription(text, scheme);
        if (result !== undefined) return result;
      }
      return undefined;
    },
    
    getDefaultScheme(): string {
      return providers[0].getDefaultScheme();
    },
    
    hasScheme(scheme: string): boolean {
      return providers.some(p => p.hasScheme(scheme));
    },
    
    getAvailableSchemes(): string[] {
      const schemes = new Set<string>();
      for (const provider of providers) {
        provider.getAvailableSchemes().forEach(s => schemes.add(s));
      }
      return Array.from(schemes);
    },
    
    getSchemeDisplayName(scheme: string): string {
      for (const provider of providers) {
        if (provider.hasScheme(scheme)) {
          return provider.getSchemeDisplayName(scheme);
        }
      }
      return scheme;
    }
  };
}
