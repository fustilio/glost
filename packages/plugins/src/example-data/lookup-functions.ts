/**
 * Example Lookup Function Factories
 *
 * Pre-built lookup functions demonstrating SRP and SSOT principles.
 * These compose data helpers (data sources) with processing logic.
 *
 * @packageDocumentation
 */

import type { GlostLanguage } from "glost-common";
import {
  findWord,
  getTranscription,
  getAllTranscriptions,
  getTranslation,
} from "./helpers.js";

/**
 * Create translation lookup function
 *
 * Single Responsibility: Create lookup function for translations
 * Composition: Uses helpers (data source) without duplicating logic
 *
 * @param sourceLanguage - Source language code
 * @param targetLanguage - Target language code
 * @returns Async lookup function for translations
 *
 * @example
 * ```typescript
 * import { createTranslationLookup } from "glost-plugins/example-data";
 * import { createTranslationGeneratorExtension } from "glost-plugins-translation";
 *
 * // Create lookup function (pure composition)
 * const lookupEnglishToThai = createTranslationLookup("en", "th");
 *
 * // Use with extension
 * const extension = createTranslationGeneratorExtension({
 *   targetLanguage: "th",
 *   nativeLanguage: "en",
 *   lookupTranslation: lookupEnglishToThai
 * });
 * ```
 */
export function createTranslationLookup(
  sourceLanguage: GlostLanguage,
  targetLanguage: GlostLanguage,
) {
  return async function lookupTranslation(
    word: string,
    _language: GlostLanguage,
  ): Promise<string | undefined> {
    // Delegates to helper (SSOT for data access)
    return getTranslation(word, sourceLanguage, targetLanguage);
  };
}

/**
 * Create transcription lookup function for specific system
 *
 * Single Responsibility: Create lookup function for ONE transcription system
 * Composition: Uses helpers (data source) without duplicating logic
 *
 * @param language - Language code
 * @param system - Transcription system (e.g., "ipa", "rtgs", "paiboon", "romaji")
 * @returns Async lookup function for transcriptions
 *
 * @example
 * ```typescript
 * import { createTranscriptionLookup } from "glost-plugins/example-data";
 * import { createTranscriptionGeneratorExtension } from "glost-plugins-transcription";
 *
 * // Create lookup for Thai Paiboon+ system
 * const lookupThaiPaiboon = createTranscriptionLookup("th", "paiboon");
 *
 * // Use with extension
 * const extension = createTranscriptionGeneratorExtension({
 *   targetLanguage: "th",
 *   lookupTranscription: lookupThaiPaiboon
 * });
 * ```
 */
export function createTranscriptionLookup(
  language: GlostLanguage,
  system: string,
) {
  return async function lookupTranscription(
    word: string,
    _language: GlostLanguage,
  ): Promise<Record<string, string>> {
    // Delegates to helper (SSOT for data access)
    const transcription = getTranscription(word, language, system);
    
    if (!transcription) {
      return {};
    }

    return { [system]: transcription };
  };
}

/**
 * Create multi-system transcription lookup function
 *
 * Single Responsibility: Create lookup function for ALL transcription systems
 * Composition: Uses helpers (data source) without duplicating logic
 *
 * @param language - Language code
 * @returns Async lookup function returning all available transcriptions
 *
 * @example
 * ```typescript
 * import { createMultiSystemTranscriptionLookup } from "glost-plugins/example-data";
 * import { createTranscriptionGeneratorExtension } from "glost-plugins-transcription";
 *
 * // Get ALL transcription systems for Thai
 * const lookupAllThaiSystems = createMultiSystemTranscriptionLookup("th");
 *
 * // Use with extension - will add IPA, RTGS, and Paiboon+ all at once
 * const extension = createTranscriptionGeneratorExtension({
 *   targetLanguage: "th",
 *   lookupTranscription: lookupAllThaiSystems
 * });
 * ```
 */
export function createMultiSystemTranscriptionLookup(language: GlostLanguage) {
  return async function lookupMultiSystemTranscription(
    word: string,
    _language: GlostLanguage,
  ): Promise<Record<string, string>> {
    // Delegates to helper (SSOT for data access)
    const transcriptions = getAllTranscriptions(word, language);
    return transcriptions ?? {};
  };
}

/**
 * Create combined translation and transcription lookup
 *
 * Single Responsibility: Create combined lookup for BOTH translation and transcription
 * Composition: Uses multiple helpers without duplicating logic
 *
 * @param sourceLanguage - Source language code
 * @param targetLanguage - Target language code
 * @param transcriptionSystem - Transcription system to use
 * @returns Object with both translation and transcription lookup functions
 *
 * @example
 * ```typescript
 * import { createCombinedLookup } from "glost-plugins/example-data";
 * import { createTranslationGeneratorExtension } from "glost-plugins-translation";
 * import { createTranscriptionGeneratorExtension } from "glost-plugins-transcription";
 *
 * // Create combined lookups
 * const lookups = createCombinedLookup("en", "th", "paiboon");
 *
 * // Use with multiple extensions
 * const translationExt = createTranslationGeneratorExtension({
 *   targetLanguage: "th",
 *   nativeLanguage: "en",
 *   lookupTranslation: lookups.translation
 * });
 *
 * const transcriptionExt = createTranscriptionGeneratorExtension({
 *   targetLanguage: "th",
 *   lookupTranscription: lookups.transcription
 * });
 * ```
 */
export function createCombinedLookup(
  sourceLanguage: GlostLanguage,
  targetLanguage: GlostLanguage,
  transcriptionSystem: string,
) {
  return {
    translation: createTranslationLookup(sourceLanguage, targetLanguage),
    transcription: createTranscriptionLookup(targetLanguage, transcriptionSystem),
  };
}

/**
 * Create fallback lookup function
 *
 * Single Responsibility: Create lookup with fallback to secondary source
 * Composition: Composes multiple lookup functions
 *
 * @param primaryLookup - Primary lookup function to try first
 * @param fallbackLookup - Fallback lookup function if primary fails
 * @returns Combined lookup function with fallback behavior
 *
 * @example
 * ```typescript
 * import { createFallbackLookup, createTranscriptionLookup } from "glost-plugins/example-data";
 *
 * // Try Thai-specific transcription first, fall back to general IPA
 * const primary = createTranscriptionLookup("th", "paiboon");
 * const fallback = createTranscriptionLookup("th", "ipa");
 * const lookupWithFallback = createFallbackLookup(primary, fallback);
 * ```
 */
export function createFallbackLookup<T>(
  primaryLookup: (word: string, language: GlostLanguage) => Promise<T>,
  fallbackLookup: (word: string, language: GlostLanguage) => Promise<T>,
) {
  return async function lookupWithFallback(
    word: string,
    language: GlostLanguage,
  ): Promise<T> {
    try {
      const result = await primaryLookup(word, language);
      
      // Check if result is empty (for Record types)
      if (
        typeof result === "object" &&
        result !== null &&
        Object.keys(result).length === 0
      ) {
        return await fallbackLookup(word, language);
      }
      
      // Check if result is undefined or null
      if (result === undefined || result === null) {
        return await fallbackLookup(word, language);
      }
      
      return result;
    } catch {
      return await fallbackLookup(word, language);
    }
  };
}

/**
 * Create custom lookup with data enrichment
 *
 * Single Responsibility: Create lookup that enriches data with additional metadata
 * Composition: Uses findWord helper and enriches result
 *
 * @param language - Language code
 * @returns Async lookup function returning enriched data
 *
 * @example
 * ```typescript
 * import { createEnrichedLookup } from "glost-plugins/example-data";
 *
 * const lookup = createEnrichedLookup("th");
 * const result = await lookup("สวัสดี", "th");
 * // Returns full vocabulary entry with all metadata
 * ```
 */
export function createEnrichedLookup(language: GlostLanguage) {
  return async function lookupEnriched(
    word: string,
    _language: GlostLanguage,
  ): Promise<Record<string, unknown>> {
    // Delegates to helper (SSOT for data access)
    const entry = findWord(word, language);
    
    if (!entry) {
      return {};
    }

    // Return enriched data structure
    return {
      word: entry.word,
      frequency: entry.frequency,
      difficulty: entry.difficulty,
      partOfSpeech: entry.partOfSpeech,
      culturalNotes: entry.culturalNotes,
      transcriptions: entry.transcription,
      translations: entry.translations,
      examples: entry.examples,
      gender: entry.gender,
      tone: entry.tone,
    };
  };
}
