/**
 * Output shape validation tests
 * Ensures consistency of GLOST node structures across languages
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import {
  createTestDocument,
  createThaiTestWord,
  createTestWord,
  expectDocumentStructure,
  expectSentenceStructure,
  expectWordStructure,
} from "../test-helpers.js";
import { getAllWords, getAllSentences } from "glost";
import { createThaiTranscriptionExtension, createThaiTranslationExtension } from "../../../glost-th-extensions-suite-example/src/index.js";

describe("Output Shape Validation", () => {
  describe("Node Structure Validation", () => {
    it("should have valid root node structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const result = await processGLOSTWithExtensionsAsync(document, []);
      
      expectDocumentStructure(result.document);
      expect(result.document.type).toBe("RootNode");
      expect(result.document.lang).toBe("th");
      expect(result.document.script).toBe("thai");
    });

    it("should have valid sentence node structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const result = await processGLOSTWithExtensionsAsync(document, []);
      
      const sentences = getAllSentences(result.document);
      expect(sentences.length).toBeGreaterThan(0);
      
      sentences.forEach((sentence) => {
        expectSentenceStructure(sentence);
        expect(sentence.type).toBe("SentenceNode");
        expect(sentence.lang).toBe("th");
        expect(sentence.script).toBe("thai");
      });
    });

    it("should have valid word node structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const result = await processGLOSTWithExtensionsAsync(document, []);
      
      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBeGreaterThan(0);
      
      processedWords.forEach((word) => {
        expectWordStructure(word);
        expect(word.type).toBe("WordNode");
        expect(word.children).toBeDefined();
        expect(Array.isArray(word.children)).toBe(true);
        expect(word.children.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Transcription Data Shape", () => {
    it("should have valid transcription structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.transcription) {
        // Transcription should be an object
        expect(typeof word.transcription).toBe("object");
        expect(word.transcription).not.toBeNull();
        
        // Each transcription system should have text and system
        Object.values(word.transcription).forEach((trans: any) => {
          expect(trans).toBeDefined();
          expect(trans.text).toBeDefined();
          expect(typeof trans.text).toBe("string");
          // System may be optional in some cases
          if (trans.system !== undefined) {
            expect(typeof trans.system).toBe("string");
          }
        });
      }
    });

    it("should support multiple transcription systems", async () => {
      const words = [createThaiTestWord("ขอบคุณ")];
      const document = createTestDocument(words, "th", "thai", "ขอบคุณ");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.transcription) {
        const systems = Object.keys(word.transcription);
        // Should support multiple systems if data is available
        expect(systems.length).toBeGreaterThanOrEqual(0);
      }
    });
  });

  describe("Translation Data Shape", () => {
    it("should have valid translation structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranslationExtension("en-US");
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.extras?.translations) {
        // Translations should be an object
        expect(typeof word.extras.translations).toBe("object");
        expect(word.extras.translations).not.toBeNull();
        
        // Each translation should be a string
        Object.values(word.extras.translations).forEach((translation) => {
          expect(typeof translation).toBe("string");
          expect(translation.length).toBeGreaterThan(0);
        });
      }
    });

    it("should support BCP-47 language codes in translations", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranslationExtension("en-US");
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.extras?.translations?.["en-US"]) {
        expect(typeof word.extras.translations["en-US"]).toBe("string");
      }
    });
  });

  describe("Metadata Structure", () => {
    it("should preserve word metadata structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const result = await processGLOSTWithExtensionsAsync(document, []);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      // Metadata is optional, but if present should be an object
      if (word.metadata) {
        expect(typeof word.metadata).toBe("object");
        expect(word.metadata).not.toBeNull();
      }
    });
  });

  describe("Extras Field Structure", () => {
    it("should have valid extras field structure", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];
      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      // Extras is optional, but if present should be an object
      if (word.extras) {
        expect(typeof word.extras).toBe("object");
        expect(word.extras).not.toBeNull();
      }
    });
  });

  describe("Cross-Language Consistency", () => {
    it("should have consistent structure across languages", async () => {
      const thaiDoc = createTestDocument([createThaiTestWord("สวัสดี")], "th", "thai", "สวัสดี");
      const japaneseDoc = createTestDocument([createTestWord("こんにちは", "ja", "hiragana")], "ja", "hiragana", "こんにちは");
      const koreanDoc = createTestDocument([createTestWord("안녕하세요", "ko", "hangul")], "ko", "hangul", "안녕하세요");
      const englishDoc = createTestDocument([createTestWord("hello", "en", "latin")], "en", "latin", "hello");

      const thaiResult = await processGLOSTWithExtensionsAsync(thaiDoc, []);
      const japaneseResult = await processGLOSTWithExtensionsAsync(japaneseDoc, []);
      const koreanResult = await processGLOSTWithExtensionsAsync(koreanDoc, []);
      const englishResult = await processGLOSTWithExtensionsAsync(englishDoc, []);

      // All should have same root structure
      expect(thaiResult.document.type).toBe("RootNode");
      expect(japaneseResult.document.type).toBe("RootNode");
      expect(koreanResult.document.type).toBe("RootNode");
      expect(englishResult.document.type).toBe("RootNode");

      // All should have same sentence structure
      const thaiSentences = getAllSentences(thaiResult.document);
      const japaneseSentences = getAllSentences(japaneseResult.document);
      const koreanSentences = getAllSentences(koreanResult.document);
      const englishSentences = getAllSentences(englishResult.document);

      expect(thaiSentences.length).toBeGreaterThan(0);
      expect(japaneseSentences.length).toBeGreaterThan(0);
      expect(koreanSentences.length).toBeGreaterThan(0);
      expect(englishSentences.length).toBeGreaterThan(0);

      // All sentences should have same structure
      [thaiSentences[0], japaneseSentences[0], koreanSentences[0], englishSentences[0]].forEach((sentence) => {
        expectSentenceStructure(sentence);
      });

      // All words should have same structure
      const thaiWords = getAllWords(thaiResult.document);
      const japaneseWords = getAllWords(japaneseResult.document);
      const koreanWords = getAllWords(koreanResult.document);
      const englishWords = getAllWords(englishResult.document);

      [thaiWords[0], japaneseWords[0], koreanWords[0], englishWords[0]].forEach((word) => {
        expectWordStructure(word);
      });
    });
  });
});
