/**
 * Tests for document creation helper functions
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleDocument,
  createDocumentFromSentences,
  createSentenceFromWords,
  createGLOSTWordNode,
  getAllWords,
} from "../index.js";

describe("Document Helper Functions", () => {
  describe("createSimpleDocument", () => {
    it("should create document from words with all required structure", () => {
      const words = [
        createGLOSTWordNode({
          value: "hello",
          lang: "en",
          script: "latin",
        }),
        createGLOSTWordNode({
          value: "world",
          lang: "en",
          script: "latin",
        }),
      ];

      const doc = createSimpleDocument(words, "en", "latin");

      expect(doc.type).toBe("RootNode");
      expect(doc.lang).toBe("en");
      expect(doc.script).toBe("latin");
      expect(doc.children.length).toBe(1); // One paragraph

      const paragraph = doc.children[0];
      expect(paragraph.type).toBe("ParagraphNode");
      expect(paragraph.children.length).toBe(1); // One sentence

      const sentence = paragraph.children[0];
      expect(sentence.type).toBe("SentenceNode");
      expect(sentence.children.length).toBe(2); // Two words
    });

    it("should accept custom sentence text", () => {
      const words = [
        createGLOSTWordNode({
          value: "hello",
          lang: "en",
          script: "latin",
        }),
      ];

      const doc = createSimpleDocument(words, "en", "latin", {
        sentenceText: "Hello!",
      });

      const sentence = doc.children[0].children[0];
      expect(sentence.originalText).toBe("Hello!");
    });

    it("should accept document metadata", () => {
      const words = [
        createGLOSTWordNode({
          value: "test",
          lang: "en",
          script: "latin",
        }),
      ];

      const doc = createSimpleDocument(words, "en", "latin", {
        metadata: {
          title: "Test Document",
          author: "Test Author",
        },
      });

      expect(doc.metadata?.title).toBe("Test Document");
      expect(doc.metadata?.author).toBe("Test Author");
    });

    it("should work with getAllWords utility", () => {
      const words = [
        createGLOSTWordNode({ value: "one", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "two", lang: "en", script: "latin" }),
        createGLOSTWordNode({ value: "three", lang: "en", script: "latin" }),
      ];

      const doc = createSimpleDocument(words, "en", "latin");
      const extractedWords = getAllWords(doc);

      expect(extractedWords.length).toBe(3);
      expect(extractedWords[0].children[0].value).toBe("one");
      expect(extractedWords[1].children[0].value).toBe("two");
      expect(extractedWords[2].children[0].value).toBe("three");
    });
  });

  describe("createDocumentFromSentences", () => {
    it("should create document from sentences with paragraph wrapper", () => {
      const words1 = [
        createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
      ];
      const words2 = [
        createGLOSTWordNode({ value: "world", lang: "en", script: "latin" }),
      ];

      const sentence1 = createSentenceFromWords(words1, "en", "latin", "Hello");
      const sentence2 = createSentenceFromWords(words2, "en", "latin", "World");

      const doc = createDocumentFromSentences([sentence1, sentence2], "en", "latin");

      expect(doc.type).toBe("RootNode");
      expect(doc.children.length).toBe(1); // One paragraph

      const paragraph = doc.children[0];
      expect(paragraph.type).toBe("ParagraphNode");
      expect(paragraph.children.length).toBe(2); // Two sentences
    });

    it("should accept document metadata", () => {
      const words = [
        createGLOSTWordNode({ value: "test", lang: "en", script: "latin" }),
      ];
      const sentence = createSentenceFromWords(words, "en", "latin");

      const doc = createDocumentFromSentences([sentence], "en", "latin", {
        title: "Test",
        author: "Author",
      });

      expect(doc.metadata?.title).toBe("Test");
      expect(doc.metadata?.author).toBe("Author");
    });

    it("should preserve sentence structure", () => {
      const words1 = [
        createGLOSTWordNode({ value: "first", lang: "en", script: "latin" }),
      ];
      const words2 = [
        createGLOSTWordNode({ value: "second", lang: "en", script: "latin" }),
      ];

      const sentence1 = createSentenceFromWords(words1, "en", "latin");
      const sentence2 = createSentenceFromWords(words2, "en", "latin");

      const doc = createDocumentFromSentences([sentence1, sentence2], "en", "latin");

      const sentences = doc.children[0].children;
      expect(sentences.length).toBe(2);
      expect(sentences[0].children[0].children[0].value).toBe("first");
      expect(sentences[1].children[0].children[0].value).toBe("second");
    });
  });

  describe("Helper comparison", () => {
    it("createSimpleDocument should produce same structure as manual creation", () => {
      const word = createGLOSTWordNode({
        value: "test",
        lang: "en",
        script: "latin",
      });

      // Using helper
      const docHelper = createSimpleDocument([word], "en", "latin");

      // Manual creation
      const sentence = createSentenceFromWords([word], "en", "latin");
      const docManual = createDocumentFromSentences([sentence], "en", "latin");

      expect(docHelper.type).toBe(docManual.type);
      expect(docHelper.lang).toBe(docManual.lang);
      expect(docHelper.script).toBe(docManual.script);
      expect(docHelper.children.length).toBe(docManual.children.length);
    });
  });
});
