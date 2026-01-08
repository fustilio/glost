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
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
  getAllWords,
  getWordText,
} from "glost";

import {
  processGLOSTWithExtensions,
  processGLOSTWithExtensionsAsync,
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension,
  createFrequencyExtension,
  createDifficultyExtension,
} from "glost-extensions";

// Helper to create a sample document
function createSampleDocument() {
  const words = [
    { text: "learn", ipa: "lɜːrn", pos: "verb", frequency: "very-common", difficulty: "beginner" },
    { text: "linguistics", ipa: "lɪŋˈɡwɪstɪks", pos: "noun", frequency: "uncommon", difficulty: "advanced" },
    { text: "today", ipa: "təˈdeɪ", pos: "adverb", frequency: "very-common", difficulty: "beginner" },
  ].map(({ text, ipa, pos, frequency, difficulty }) => {
    const word = createSimpleWord(text, ipa, "ipa", pos);
    word.extras = { frequency, difficulty };
    return word;
  });

  const sentence = createSentenceFromWords(words, "en", "latin", "Learn linguistics today.");
  const paragraph = createParagraphFromSentences([sentence]);
  return createDocumentFromParagraphs([paragraph], "en", "latin", { title: "Language Learning" });
}

describe("Using Built-in Extensions", () => {
  describe("Single Extension Processing", () => {
    it("processes a document with FrequencyExtension", () => {
      const document = createSampleDocument();

      const result = processGLOSTWithExtensions(document, [FrequencyExtension]);

      expect(result.metadata.appliedExtensions).toContain("frequency");
      expect(result.metadata.errors).toHaveLength(0);

      const words = getAllWords(result.document);
      expect(words[0].extras?.frequency).toMatchObject({
        level: "very-common",
        display: "Very Common",
      });
    });

    it("processes a document with DifficultyExtension using customMapping", () => {
      const document = createSampleDocument();

      // DifficultyExtension requires difficulty at node.difficulty or extras.metadata.difficulty
      // or via customMapping - we use customMapping here
      const customDifficulty = createDifficultyExtension({
        customMapping: {
          learn: "beginner",
          linguistics: "advanced",
          today: "beginner",
        },
      });

      const result = processGLOSTWithExtensions(document, [customDifficulty]);

      expect(result.metadata.appliedExtensions).toContain("difficulty");

      const words = getAllWords(result.document);
      expect(words[0].extras?.difficulty?.level).toBe("beginner");
      expect(words[1].extras?.difficulty?.level).toBe("advanced");
    });
  });

  describe("Multiple Extensions Processing", () => {
    it("applies multiple extensions in sequence", () => {
      const document = createSampleDocument();

      const result = processGLOSTWithExtensions(document, [
        FrequencyExtension,
        DifficultyExtension,
        PartOfSpeechExtension,
      ]);

      expect(result.metadata.appliedExtensions).toEqual([
        "frequency",
        "difficulty",
        "part-of-speech",
      ]);

      const words = getAllWords(result.document);
      words.forEach((word) => {
        expect(word.extras?.frequency).toBeDefined();
        expect(word.extras?.difficulty).toBeDefined();
      });
    });
  });

  describe("Custom Extension Options", () => {
    it("creates FrequencyExtension with custom mapping", () => {
      // Create a fresh document without pre-set frequency metadata
      const word = createSimpleWord("linguistics", "lɪŋˈɡwɪstɪks", "ipa", "noun");
      const sentence = createSentenceFromWords([word], "en", "latin", "linguistics");
      const paragraph = createParagraphFromSentences([sentence]);
      const document = createDocumentFromParagraphs([paragraph], "en", "latin");

      const customFrequency = createFrequencyExtension({
        normalize: true,
        customMapping: {
          linguistics: "common",
        },
      });

      const result = processGLOSTWithExtensions(document, [customFrequency]);

      const words = getAllWords(result.document);
      expect(words[0].extras?.frequency?.level).toBe("common");
    });

    it("creates DifficultyExtension with custom mapping", () => {
      const word = createSimpleWord("test", "test", "ipa", "noun");
      const sentence = createSentenceFromWords([word], "en", "latin", "test");
      const paragraph = createParagraphFromSentences([sentence]);
      const document = createDocumentFromParagraphs([paragraph], "en", "latin");

      const customDifficulty = createDifficultyExtension({
        customMapping: {
          test: "intermediate",
        },
      });

      const result = processGLOSTWithExtensions(document, [customDifficulty]);

      const words = getAllWords(result.document);
      expect(words[0].extras?.difficulty?.level).toBe("intermediate");
    });
  });

  describe("Async Extension Processing", () => {
    it("processes extensions asynchronously", async () => {
      const document = createSampleDocument();

      const result = await processGLOSTWithExtensionsAsync(document, [
        FrequencyExtension,
        DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("frequency");
      expect(result.metadata.appliedExtensions).toContain("difficulty");
    });
  });

  describe("Error Handling", () => {
    it("skips broken extensions and continues processing", () => {
      const document = createSampleDocument();

      const brokenExtension = {
        id: "broken-extension",
        name: "Broken Extension",
        transform: () => {
          throw new Error("This extension is broken!");
        },
      };

      const result = processGLOSTWithExtensions(document, [
        FrequencyExtension,
        brokenExtension,
        DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("frequency");
      expect(result.metadata.appliedExtensions).toContain("difficulty");
      expect(result.metadata.skippedExtensions).toContain("broken-extension");
      expect(result.metadata.errors).toHaveLength(1);
      expect(result.metadata.errors[0].extensionId).toBe("broken-extension");
      expect(result.metadata.errors[0].error.message).toBe("This extension is broken!");
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
