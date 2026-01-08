/**
 * Composition Pattern Examples
 *
 * Demonstrates SRP (Single Responsibility Principle) and SSOT (Single Source of Truth)
 * using the example data system with composable lookup functions.
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleWord,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
  getAllWords,
} from "glost";
import {
  processGLOSTWithExtensionsAsync,
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension,
} from "glost-extensions";

// Import example data helpers (SSOT for data access)
import {
  findWord,
  getTranscription,
  getAllTranscriptions,
  getTranslation,
  loadVocabulary,
  getAvailableLanguages,
} from "glost-extensions/example-data";

// Import lookup function factories (composition layer)
import {
  createTranslationLookup,
  createTranscriptionLookup,
  createMultiSystemTranscriptionLookup,
  createFallbackLookup,
  createEnrichedLookup,
} from "glost-extensions/example-data";

describe("SRP & SSOT Composition Pattern", () => {
  describe("Single Responsibility - Data Access", () => {
    it("findWord has single responsibility: find ONE word", () => {
      // Each function does ONE thing
      const thaiWord = findWord("สวัสดี", "th");
      
      expect(thaiWord).toBeDefined();
      expect(thaiWord?.word).toBe("สวัสดี");
      expect(thaiWord?.frequency).toBe("very-common");
    });

    it("getTranscription has single responsibility: get ONE transcription", () => {
      // Gets transcription in ONE system only
      const ipa = getTranscription("สวัสดี", "th", "ipa");
      const paiboon = getTranscription("สวัสดี", "th", "paiboon");
      
      expect(ipa).toBe("sà.wàt.diː");
      expect(paiboon).toBe("sà-wàt-dii");
    });

    it("getTranslation has single responsibility: translate ONE word", () => {
      // Translates from source to target only
      const thaiTranslation = getTranslation("hello", "en", "th");
      const japaneseTranslation = getTranslation("hello", "en", "ja");
      
      expect(thaiTranslation).toBe("สวัสดี");
      expect(japaneseTranslation).toBe("こんにちは");
    });
  });

  describe("Single Source of Truth - No Duplication", () => {
    it("vocabulary data loaded from single source", () => {
      // All functions use the SAME data source
      const vocab1 = loadVocabulary("th");
      const vocab2 = loadVocabulary("th");
      
      // Same reference - SSOT
      expect(vocab1).toBe(vocab2);
    });

    it("available languages from single source", () => {
      const languages = getAvailableLanguages();
      
      // Single source of truth for available languages
      expect(languages).toContain("en");
      expect(languages).toContain("th");
      expect(languages).toContain("ja");
      expect(languages).toContain("fr");
      expect(languages).toContain("es");
    });
  });

  describe("Composition - Building Complex from Simple", () => {
    it("compose lookup functions without duplicating logic", async () => {
      // Create lookup function by COMPOSING helpers (no duplication)
      const lookupThaiPaiboon = createTranscriptionLookup("th", "paiboon");
      
      const result = await lookupThaiPaiboon("สวัสดี", "th");
      
      expect(result).toEqual({ paiboon: "sà-wàt-dii" });
    });

    it("compose multiple systems without duplicating data access", async () => {
      // Get ALL systems - still uses SAME data source (SSOT)
      const lookupAllSystems = createMultiSystemTranscriptionLookup("th");
      
      const result = await lookupAllSystems("สวัสดี", "th");
      
      expect(result).toHaveProperty("ipa");
      expect(result).toHaveProperty("rtgs");
      expect(result).toHaveProperty("paiboon");
      expect(result.ipa).toBe("sà.wàt.diː");
      expect(result.paiboon).toBe("sà-wàt-dii");
    });

    it("compose fallback behavior", async () => {
      // Compose two lookups into fallback pattern
      const primary = createTranscriptionLookup("th", "paiboon");
      const fallback = createTranscriptionLookup("th", "ipa");
      const lookupWithFallback = createFallbackLookup(primary, fallback);
      
      // Word exists in primary - uses primary
      const result1 = await lookupWithFallback("สวัสดี", "th");
      expect(result1).toHaveProperty("paiboon");
      
      // Word doesn't exist - would use fallback
      const result2 = await lookupWithFallback("nonexistent", "th");
      expect(result2).toEqual({});
    });
  });

  describe("Mix & Match - Different Combinations", () => {
    it("same data source, different transcription systems", async () => {
      // Create THREE different lookups from SAME data source
      const lookupIPA = createTranscriptionLookup("th", "ipa");
      const lookupRTGS = createTranscriptionLookup("th", "rtgs");
      const lookupPaiboon = createTranscriptionLookup("th", "paiboon");
      
      const word = "สวัสดี";
      
      // All use same data, different processing
      const ipa = await lookupIPA(word, "th");
      const rtgs = await lookupRTGS(word, "th");
      const paiboon = await lookupPaiboon(word, "th");
      
      expect(ipa).toEqual({ ipa: "sà.wàt.diː" });
      expect(rtgs).toEqual({ rtgs: "sawatdi" });
      expect(paiboon).toEqual({ paiboon: "sà-wàt-dii" });
    });

    it("same system, different languages", async () => {
      // IPA works with ANY language
      const lookupThaiIPA = createTranscriptionLookup("th", "ipa");
      const lookupEnglishIPA = createTranscriptionLookup("en", "ipa");
      const lookupJapaneseIPA = createTranscriptionLookup("ja", "ipa");
      
      const thai = await lookupThaiIPA("สวัสดี", "th");
      const english = await lookupEnglishIPA("hello", "en");
      const japanese = await lookupJapaneseIPA("こんにちは", "ja");
      
      expect(thai).toHaveProperty("ipa");
      expect(english).toHaveProperty("ipa");
      expect(japanese).toHaveProperty("ipa");
    });

    it("enriched lookup combines multiple data points", async () => {
      // Enriched lookup uses findWord (SSOT) and composes all data
      const lookupEnriched = createEnrichedLookup("th");
      
      const result = await lookupEnriched("สวัสดี", "th");
      
      // Contains ALL metadata from SINGLE source
      expect(result).toHaveProperty("word");
      expect(result).toHaveProperty("frequency");
      expect(result).toHaveProperty("difficulty");
      expect(result).toHaveProperty("partOfSpeech");
      expect(result).toHaveProperty("transcriptions");
      expect(result).toHaveProperty("translations");
      expect(result).toHaveProperty("tone");
    });
  });

  describe("Real-World Usage with Extensions", () => {
    it("uses example data with actual extensions", async () => {
      // Create document with Thai words
      const words = [
        { text: "สวัสดี", ipa: "sà.wàt.diː", pos: "interjection" },
        { text: "ขอบคุณ", ipa: "kʰɔ̀ːp.kʰun", pos: "verb" },
      ].map(({ text, ipa, pos }) => {
        const word = createSimpleWord(text, ipa, "ipa", pos);
        // Use example data to enrich
        const entry = findWord(text, "th");
        if (entry) {
          word.extras = {
            frequency: entry.frequency,
            difficulty: entry.difficulty,
            metadata: {
              culturalNotes: entry.culturalNotes,
            },
          };
        }
        return word;
      });

      const sentence = createSentenceFromWords(words, "th", "thai", "สวัสดีขอบคุณ");
      const paragraph = createParagraphFromSentences([sentence]);
      const document = createDocumentFromParagraphs([paragraph], "th", "thai");

      // Process with enhancer extensions
      const result = await processGLOSTWithExtensionsAsync(document, [
        FrequencyExtension,
        DifficultyExtension,
        PartOfSpeechExtension,
      ]);

      const processedWords = getAllWords(result.document);
      
      // Verify enhancements applied
      expect(processedWords[0].extras?.frequency).toHaveProperty("display");
      expect(processedWords[0].extras?.difficulty).toHaveProperty("level");
      expect(processedWords[0].extras?.frequency?.level).toBe("very-common");
    });
  });

  describe("Benefits of SRP & SSOT", () => {
    it("demonstrates maintainability - change data in ONE place", () => {
      // If we need to update Thai data, we only change the JSON file
      // All lookup functions automatically use the updated data
      const vocab = loadVocabulary("th");
      const entry = findWord("สวัสดี", "th");
      
      // Both use SAME source - update once, reflects everywhere
      expect(vocab?.vocabulary).toContain(entry);
    });

    it("demonstrates testability - test each component in isolation", () => {
      // Test data access separately
      const entry = findWord("hello", "en");
      expect(entry).toBeDefined();
      
      // Test transcription separately
      const ipa = getTranscription("hello", "en", "ipa");
      expect(ipa).toBeDefined();
      
      // Test translation separately
      const translation = getTranslation("hello", "en", "th");
      expect(translation).toBe("สวัสดี");
    });

    it("demonstrates reusability - same components, different combinations", async () => {
      // Reuse helpers in different combinations
      const lookup1 = createTranscriptionLookup("th", "paiboon");
      const lookup2 = createTranscriptionLookup("th", "ipa");
      const lookup3 = createMultiSystemTranscriptionLookup("th");
      
      // All use SAME helpers, different compositions
      const result1 = await lookup1("สวัสดี", "th");
      const result2 = await lookup2("สวัสดี", "th");
      const result3 = await lookup3("สวัสดี", "th");
      
      expect(result1).toHaveProperty("paiboon");
      expect(result2).toHaveProperty("ipa");
      expect(result3).toHaveProperty("paiboon");
      expect(result3).toHaveProperty("ipa");
    });
  });
});
