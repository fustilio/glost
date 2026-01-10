/**
 * Tests for traversal helper functions
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleDocument,
  createGLOSTWordNode,
  getAllWords,
  getFirstWord,
  getWordAtPath,
  getWordText,
  createSentenceFromWords,
  createDocumentFromSentences,
} from "../index.js";

describe("Traversal Helper Functions", () => {
  describe("getFirstWord", () => {
    it("should return first word from document", () => {
      const words = [
        createGLOSTWordNode({ value: "first", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "second", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "third", lang: "en", script: "latin" }),
      ];

      const doc = createSimpleDocument(words, "en", "latin");
      const firstWord = getFirstWord(doc);

      expect(firstWord).toBeDefined();
      expect(getWordText(firstWord!)).toBe("first");
    });

    it("should return undefined for empty document", () => {
      const doc = createSimpleDocument([], "en", "latin");
      const firstWord = getFirstWord(doc);

      expect(firstWord).toBeUndefined();
    });

    it("should return first word even with multiple sentences", () => {
      const words1 = [
        createGLOSTWordNode({ value: "first", lang: "en", script: "latin" }),
      ];
      const words2 = [
        createGLOSTWordNode({ value: "second", lang: "en", script: "latin" }),
      ];

      const sentence1 = createSentenceFromWords(words1, "en", "latin");
      const sentence2 = createSentenceFromWords(words2, "en", "latin");
      const doc = createDocumentFromSentences([sentence1, sentence2], "en", "latin");

      const firstWord = getFirstWord(doc);

      expect(firstWord).toBeDefined();
      expect(getWordText(firstWord!)).toBe("first");
    });
  });

  describe("getWordAtPath", () => {
    it("should get word at valid path", () => {
      const words = [
        createGLOSTWordNode({ value: "one", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "two", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "three", lang: "en", script: "latin" }),
      ];

      const doc = createSimpleDocument(words, "en", "latin");

      // Get first word (paragraph 0, sentence 0, word 0)
      const word0 = getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 0 });
      expect(word0).toBeDefined();
      expect(getWordText(word0!)).toBe("one");

      // Get second word
      const word1 = getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 1 });
      expect(word1).toBeDefined();
      expect(getWordText(word1!)).toBe("two");

      // Get third word
      const word2 = getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 2 });
      expect(word2).toBeDefined();
      expect(getWordText(word2!)).toBe("three");
    });

    it("should return undefined for invalid paragraph index", () => {
      const words = [
        createGLOSTWordNode({ value: "test", lang: "en", script: "latin" }),
      ];
      const doc = createSimpleDocument(words, "en", "latin");

      const word = getWordAtPath(doc, { paragraph: 99, sentence: 0, word: 0 });
      expect(word).toBeUndefined();
    });

    it("should return undefined for invalid sentence index", () => {
      const words = [
        createGLOSTWordNode({ value: "test", lang: "en", script: "latin" }),
      ];
      const doc = createSimpleDocument(words, "en", "latin");

      const word = getWordAtPath(doc, { paragraph: 0, sentence: 99, word: 0 });
      expect(word).toBeUndefined();
    });

    it("should return undefined for invalid word index", () => {
      const words = [
        createGLOSTWordNode({ value: "test", lang: "en", script: "latin" }),
      ];
      const doc = createSimpleDocument(words, "en", "latin");

      const word = getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 99 });
      expect(word).toBeUndefined();
    });

    it("should handle multi-sentence documents", () => {
      const words1 = [
        createGLOSTWordNode({ value: "first", lang: "en", script: "latin" }),
      ];
      const words2 = [
        createGLOSTWordNode({ value: "second", lang: "en", script: "latin" }),
      ];

      const sentence1 = createSentenceFromWords(words1, "en", "latin");
      const sentence2 = createSentenceFromWords(words2, "en", "latin");
      const doc = createDocumentFromSentences([sentence1, sentence2], "en", "latin");

      // Get word from first sentence
      const word1 = getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 0 });
      expect(getWordText(word1!)).toBe("first");

      // Get word from second sentence
      const word2 = getWordAtPath(doc, { paragraph: 0, sentence: 1, word: 0 });
      expect(getWordText(word2!)).toBe("second");
    });
  });

  describe("Helper integration", () => {
    it("getFirstWord should match first result from getAllWords", () => {
      const words = [
        createGLOSTWordNode({ value: "alpha", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "beta", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "gamma", lang: "en", script: "latin" }),
      ];

      const doc = createSimpleDocument(words, "en", "latin");

      const firstWord = getFirstWord(doc);
      const allWords = getAllWords(doc);

      expect(firstWord).toBe(allWords[0]);
      expect(getWordText(firstWord!)).toBe(getWordText(allWords[0]));
    });

    it("getWordAtPath should match getAllWords result by index", () => {
      const words = [
        createGLOSTWordNode({ value: "one", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "two", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "three", lang: "en", script: "latin" }),
      ];

      const doc = createSimpleDocument(words, "en", "latin");

      const allWords = getAllWords(doc);
      const wordAtPath1 = getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 1 });

      expect(wordAtPath1).toBe(allWords[1]);
      expect(getWordText(wordAtPath1!)).toBe("two");
    });
  });
});
