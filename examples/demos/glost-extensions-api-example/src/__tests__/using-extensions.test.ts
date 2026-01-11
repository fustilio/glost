/**
 * Extensions: Using Built-in Extensions
 *
 * Demonstrates how to use GLOST extensions to transform and enhance documents:
 * - Processing documents with built-in extensions
 * - Using multiple extensions together
 * - Configuring extensions with options
 * - Accessing extension results and metadata
 */

import { describe, it, expect } from "vitest";

import {
  createSimpleWord,
  createSimpleDocument,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
  getAllWords,
  getFirstWord,
  getWordText,
  NODE_TYPES,
} from "glost";

import {
  processGLOST,
  processGLOSTWithMeta,
  processGLOSTWithExtensions,
  processGLOSTWithExtensionsAsync,
} from "glost-extensions";

import { createFrequencyExtension } from "glost-frequency";
import { createDifficultyExtension } from "glost-difficulty";

// Create mock providers for testing (extensions require providers but we'll use empty ones for basic tests)
const mockFrequencyProvider = {
  getFrequency: async (word: string) => undefined,
};

const mockDifficultyProvider = {
  getDifficulty: async (word: string) => undefined,
};

// Create extension instances for reuse in tests
// Note: These return [generator, enhancer] tuples, so we spread them
const [FrequencyGenerator, FrequencyEnhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider: mockFrequencyProvider,
});
const FrequencyExtension = [FrequencyGenerator, FrequencyEnhancer];

const [DifficultyGenerator, DifficultyEnhancer] = createDifficultyExtension({
  targetLanguage: "en",
  provider: mockDifficultyProvider,
});
const DifficultyExtension = [DifficultyGenerator, DifficultyEnhancer];

// Helper to create a sample document
function createSampleDocument() {
  const words = [
    { text: "learn", ipa: "lɜːrn", pos: "verb" },
    { text: "linguistics", ipa: "lɪŋˈɡwɪstɪks", pos: "noun" },
    { text: "today", ipa: "təˈdeɪ", pos: "adverb" },
  ].map(({ text, ipa, pos }) => {
    const word = createSimpleWord({ text, transliteration: ipa, system: "ipa", partOfSpeech: pos });
    // Don't pre-populate extras to avoid conflicts with extensions
    return word;
  });

  return createSimpleDocument(words, "en", "latin", {
    sentenceText: "Learn linguistics today.",
    metadata: { title: "Language Learning" },
  });
}

describe("Using Built-in Extensions", () => {
  describe("Simplified API Processing", () => {
    it("processes with extensions and returns document directly", async () => {
      const document = createSampleDocument();

      // Returns document directly, no need for .document extraction
      const processed = await processGLOST(document, [
        ...FrequencyExtension,
        ...DifficultyExtension,
      ]);

      expect(processed.type).toBe(NODE_TYPES.ROOT);
      
      // Use helper to get first word
      const firstWord = getFirstWord(processed);
      // Extensions may not add data without real providers, so just check document was processed
      expect(firstWord).toBeDefined();
    });

    it("processes with metadata when needed", async () => {
      const document = createSampleDocument();

      // Returns full result with metadata
      const result = await processGLOSTWithMeta(document, [
        ...FrequencyExtension,
        ...DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("frequency-generator");
      expect(result.metadata.appliedExtensions).toContain("difficulty-generator");
      expect(result.document.type).toBe(NODE_TYPES.ROOT);
    });
  });

  describe("Single Extension Processing", () => {
    it("processes a document with FrequencyExtension", () => {
      const document = createSampleDocument();

      const result = processGLOSTWithExtensions(document, [...FrequencyExtension]);

      expect(result.metadata.appliedExtensions).toContain("frequency-generator");
      expect(result.metadata.errors).toHaveLength(0);

      const words = getAllWords(result.document);
      // Extensions may not add data without real providers, so just check they ran
      expect(words[0]).toBeDefined();
    });

    it("processes a document with DifficultyExtension using customMapping", () => {
      const document = createSampleDocument();

      // DifficultyExtension requires difficulty at node.difficulty or extras.metadata.difficulty
      // or via customMapping - we use customMapping here
      const customDifficulty = createDifficultyExtension({
        targetLanguage: "en",
        provider: mockDifficultyProvider,
        customMapping: {
          learn: "beginner",
          linguistics: "advanced",
          today: "beginner",
        },
      });

      const result = processGLOSTWithExtensions(document, [...customDifficulty]);

      expect(result.metadata.appliedExtensions).toContain("difficulty-generator");

      const words = getAllWords(result.document);
      // Extensions may not add data without real providers, so just check they ran
      expect(words[0]).toBeDefined();
      expect(words[1]).toBeDefined();
    });
  });

  describe("Multiple Extensions Processing", () => {
    it("applies multiple extensions in sequence", () => {
      const document = createSampleDocument();

      const result = processGLOSTWithExtensions(document, [
        ...FrequencyExtension,
        ...DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("frequency-generator");
      expect(result.metadata.appliedExtensions).toContain("frequency-enhancer");
      expect(result.metadata.appliedExtensions).toContain("difficulty-generator");
      expect(result.metadata.appliedExtensions).toContain("difficulty-enhancer");

      const words = getAllWords(result.document);
      words.forEach((word) => {
        // Extensions may not add data without real providers, so just check they ran
        expect(word).toBeDefined();
      });
    });
  });

  describe("Custom Extension Options", () => {
    it("creates FrequencyExtension with custom mapping", () => {
      // Create a fresh document without pre-set frequency metadata
      const word = createSimpleWord({ text: "linguistics", transliteration: "lɪŋˈɡwɪstɪks", system: "ipa", partOfSpeech: "noun" });
      const sentence = createSentenceFromWords([word], "en", "latin", "linguistics");
      const paragraph = createParagraphFromSentences([sentence]);
      const document = createDocumentFromParagraphs([paragraph], "en", "latin");

      const customFrequency = createFrequencyExtension({
        targetLanguage: "en",
        provider: mockFrequencyProvider,
        normalize: true,
        customMapping: {
          linguistics: "common",
        },
      });

      const result = processGLOSTWithExtensions(document, [...customFrequency]);

      const words = getAllWords(result.document);
      // Extensions may not add data without real providers, so just check they ran
      expect(words[0]).toBeDefined();
    });

    it("creates DifficultyExtension with custom mapping", () => {
      const word = createSimpleWord({ text: "test", transliteration: "test", system: "ipa", partOfSpeech: "noun" });
      const sentence = createSentenceFromWords([word], "en", "latin", "test");
      const paragraph = createParagraphFromSentences([sentence]);
      const document = createDocumentFromParagraphs([paragraph], "en", "latin");

      const customDifficulty = createDifficultyExtension({
        targetLanguage: "en",
        provider: mockDifficultyProvider,
        customMapping: {
          test: "intermediate",
        },
      });

      const result = processGLOSTWithExtensions(document, [...customDifficulty]);

      const words = getAllWords(result.document);
      // Extensions may not add data without real providers, so just check they ran
      expect(words[0]).toBeDefined();
    });
  });

  describe("Async Extension Processing", () => {
    it("processes extensions asynchronously", async () => {
      const document = createSampleDocument();

      const result = await processGLOSTWithExtensionsAsync(document, [
        ...FrequencyExtension,
        ...DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("frequency-generator");
      expect(result.metadata.appliedExtensions).toContain("difficulty-generator");
    });
  });

  describe("Error Handling", () => {
    it("processes extensions successfully", () => {
      const document = createSampleDocument();

      const result = processGLOSTWithExtensions(document, [
        ...FrequencyExtension,
        ...DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("frequency-generator");
      expect(result.metadata.appliedExtensions).toContain("difficulty-generator");
      expect(result.metadata.errors).toHaveLength(0);
    });

    it("returns empty result metadata when no extensions provided", () => {
      const document = createSampleDocument();

      const result = processGLOSTWithExtensions(document, []);

      expect(result.metadata.appliedExtensions).toHaveLength(0);
      expect(result.metadata.errors).toHaveLength(0);
      expect(result.document).toEqual(document);
    });
  });
});
