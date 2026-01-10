/**
 * Core: Basic Usage
 *
 * Demonstrates how to create GLOST nodes from scratch:
 * - Creating word nodes with transcription and metadata
 * - Building sentences from words
 * - Creating paragraphs and documents
 */

import { describe, it, expect } from "vitest";

import {
  createGLOSTWordNode,
  createGLOSTSentenceNode,
  createGLOSTParagraphNode,
  createGLOSTRootNode,
  createSimpleWord,
  createSimpleDocument,
  createDocumentFromSentences,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
  getWordText,
  getWordTranscription,
  getAllWords,
  getFirstWord,
  NODE_TYPES,
  type GLOSTWord,
  type TransliterationData,
  type LinguisticMetadata,
} from "glost";

describe("Basic Usage", () => {
  describe("Simplified Document Creation", () => {
    it("creates a document from words with one function call", () => {
      const words = [
        createSimpleWord("Hello", "həˈloʊ", "ipa", "interjection"),
        createSimpleWord("world", "wɜːrld", "ipa", "noun"),
      ];

      const document = createSimpleDocument(words, "en", "latin", {
        sentenceText: "Hello world!",
        metadata: { title: "Greeting" },
      });

      expect(document.type).toBe(NODE_TYPES.ROOT);
      expect(document.metadata?.title).toBe("Greeting");

      // Use helper to get first word
      const firstWord = getFirstWord(document);
      expect(firstWord).toBeDefined();
      expect(getWordText(firstWord!)).toBe("Hello");

      // Get all words
      const allWords = getAllWords(document);
      expect(allWords).toHaveLength(2);
    });

    it("creates a document from sentences", () => {
      const words1 = [createSimpleWord("First", "fɜːrst", "ipa", "adjective")];
      const words2 = [createSimpleWord("Second", "ˈsekənd", "ipa", "adjective")];

      const sentence1 = createSentenceFromWords(words1, "en", "latin", "First.");
      const sentence2 = createSentenceFromWords(words2, "en", "latin", "Second.");

      const document = createDocumentFromSentences(
        [sentence1, sentence2],
        "en",
        "latin",
        { title: "Multiple Sentences" }
      );

      expect(document.metadata?.title).toBe("Multiple Sentences");
      expect(getAllWords(document)).toHaveLength(2);
    });
  });

  describe("Creating Word Nodes", () => {
    it("creates a word with full transcription and metadata", () => {
      const transcription: TransliterationData = {
        ipa: {
          text: "həˈloʊ",
          system: "ipa",
          syllables: ["hə", "loʊ"],
        },
      };

      const metadata: LinguisticMetadata = {
        partOfSpeech: "interjection",
        meaning: "a greeting",
        usage: "used as a greeting or to begin a conversation",
      };

      const word = createGLOSTWordNode(
        "hello",
        transcription,
        metadata,
        "word",
        "en",
        "latin",
        {
          // extras for extension data
          metadata: {
            frequency: "very-common",
            difficulty: "beginner",
          },
        }
      );

      expect(getWordText(word)).toBe("hello");
      expect(getWordTranscription(word, "ipa")).toBe("həˈloʊ");
      expect(word.metadata.partOfSpeech).toBe("interjection");
      expect(word.extras?.metadata?.frequency).toBe("very-common");
    });

    it("creates a simple word with helper function", () => {
      const word = createSimpleWord("world", "wɜːrld", "ipa", "noun");

      expect(getWordText(word)).toBe("world");
      expect(getWordTranscription(word, "ipa")).toBe("wɜːrld");
      expect(word.metadata.partOfSpeech).toBe("noun");
    });
  });

  describe("Building Sentences", () => {
    it("creates a sentence from words", () => {
      const words: GLOSTWord[] = [
        createSimpleWord("Hello", "həˈloʊ", "ipa", "interjection"),
        createSimpleWord("world", "wɜːrld", "ipa", "noun"),
      ];

      const sentence = createSentenceFromWords(
        words,
        "en",
        "latin",
        "Hello world!"
      );

      expect(sentence.originalText).toBe("Hello world!");
      expect(sentence.lang).toBe("en");
      expect(sentence.children).toHaveLength(2);
    });

    it("creates a sentence with extras for translations", () => {
      const words = [createSimpleWord("Test", "test", "ipa", "noun")];

      const sentence = createGLOSTSentenceNode(
        "Test sentence.",
        "en",
        "latin",
        words,
        { ipa: { text: "test ˈsentəns", system: "ipa", syllables: [] } },
        {
          translations: {
            th: "ประโยคทดสอบ",
            ja: "テスト文",
          },
          metadata: {
            difficulty: "beginner",
          },
        }
      );

      expect(sentence.extras?.translations?.th).toBe("ประโยคทดสอบ");
      expect(sentence.transcription?.ipa?.text).toBe("test ˈsentəns");
    });
  });

  describe("Building Documents", () => {
    it("creates a complete document hierarchy", () => {
      // Create words
      const sentence1Words = [
        createSimpleWord("The", "ðə", "ipa", "determiner"),
        createSimpleWord("quick", "kwɪk", "ipa", "adjective"),
        createSimpleWord("fox", "fɒks", "ipa", "noun"),
      ];

      const sentence2Words = [
        createSimpleWord("It", "ɪt", "ipa", "pronoun"),
        createSimpleWord("jumps", "dʒʌmps", "ipa", "verb"),
      ];

      // Create sentences
      const sentence1 = createSentenceFromWords(
        sentence1Words,
        "en",
        "latin",
        "The quick fox."
      );
      const sentence2 = createSentenceFromWords(
        sentence2Words,
        "en",
        "latin",
        "It jumps."
      );

      // Create paragraph
      const paragraph = createParagraphFromSentences([sentence1, sentence2]);
      expect(paragraph.children).toHaveLength(2);

      // Create document
      const document = createDocumentFromParagraphs([paragraph], "en", "latin", {
        title: "The Quick Fox",
        author: "GLOST Example",
      });

      expect(document.metadata?.title).toBe("The Quick Fox");
      expect(document.lang).toBe("en");
      expect(document.children).toHaveLength(1);

      // Use utility to get all words
      const allWords = getAllWords(document);
      expect(allWords).toHaveLength(5);
      expect(allWords.map((w) => getWordText(w))).toEqual([
        "The",
        "quick",
        "fox",
        "It",
        "jumps",
      ]);
    });

    it("creates a document with low-level API for full control", () => {
      const word = createSimpleWord("Custom", "ˈkʌstəm", "ipa", "adjective");

      const sentence = createGLOSTSentenceNode(
        "Custom sentence.",
        "en",
        "latin",
        [word],
        undefined,
        { metadata: { difficulty: "intermediate" } }
      );

      const paragraph = createGLOSTParagraphNode([sentence], {
        metadata: { theme: "customization" },
      });

      const document = createGLOSTRootNode(
        "en",
        "latin",
        [paragraph],
        { title: "Custom Document" },
        { version: "1.0" }
      );

      expect(document.extras?.version).toBe("1.0");
      expect(document.children[0].extras?.metadata?.theme).toBe("customization");
    });
  });
});
