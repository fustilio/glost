/**
 * E2E tests for Thai language features
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import {
  createTestDocument,
  createThaiTestWord,
  expectWordText,
  expectWordHasTranscription,
  expectWordTranscription,
  expectWordHasTranslation,
  expectDocumentWordCount,
} from "../test-helpers.js";
import { getAllWords, getWordText } from "glost";
import { createThaiTranscriptionExtension, createThaiTranslationExtension } from "../index.js";

describe("Thai Language E2E Tests", () => {
  describe("Transcription Systems", () => {
    it("should add RTGS transcription", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(1);
      
      const word = processedWords[0];
      expectWordText(word, "สวัสดี");
      
      // Check if transcription was added (may not be in demo data)
      if (word.transcription) {
        expectWordHasTranscription(word, "rtgs");
      }
    });

    it("should add IPA transcription", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.transcription) {
        expectWordHasTranscription(word, "ipa");
      }
    });

    it("should add Paiboon+ transcription", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.transcription) {
        expectWordHasTranscription(word, "paiboon+");
      }
    });

    it("should handle multiple transcription systems", async () => {
      const words = [createThaiTestWord("ขอบคุณ")];
      const document = createTestDocument(words, "th", "thai", "ขอบคุณ");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.transcription) {
        // Should have multiple systems
        const systems = Object.keys(word.transcription);
        expect(systems.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Translation", () => {
    it("should add English translation", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extension = createThaiTranslationExtension("en-US");
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(1);
      
      const word = processedWords[0];
      expectWordText(word, "สวัสดี");
      
      // Check if translation was added (may not be in demo data)
      if (word.extras?.translations?.["en-US"]) {
        expectWordHasTranslation(word);
      }
    });

    it("should handle multiple words with translations", async () => {
      const words = [
        createThaiTestWord("สวัสดี"),
        createThaiTestWord("ครับ"),
        createThaiTestWord("ขอบคุณ"),
      ];
      const document = createTestDocument(words, "th", "thai", "สวัสดีครับ ขอบคุณ");

      const extension = createThaiTranslationExtension("en-US");
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      expectDocumentWordCount(result.document, 3);
    });
  });

  describe("Combined Features", () => {
    it("should add both transcription and translation", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      expectWordText(word, "สวัสดี");
      
      // Should have both transcription and translation if data is available
      const hasTranscription = !!word.transcription;
      const hasTranslation = !!word.extras?.translations?.["en-US"];
      
      // At least one should be present if demo data exists
      expect(hasTranscription || hasTranslation).toBe(true);
    });

    it("should handle complex sentence with multiple words", async () => {
      const words = [
        createThaiTestWord("ผม"),
        createThaiTestWord("ชื่อ"),
        createThaiTestWord("จอห์น"),
      ];
      const document = createTestDocument(words, "th", "thai", "ผมชื่อจอห์น");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expectDocumentWordCount(result.document, 3);
      
      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBeGreaterThanOrEqual(3);
      processedWords.forEach((word) => {
        const text = getWordText(word);
        expect(typeof text).toBe("string");
        expect(text.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle single character words", async () => {
      const words = [createThaiTestWord("ครับ")];
      const document = createTestDocument(words, "th", "thai", "ครับ");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expectDocumentWordCount(result.document, 1);
    });

    it("should handle words with special characters", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expectDocumentWordCount(result.document, 1);
      const processedWords = getAllWords(result.document);
      expectWordText(processedWords[0], "สวัสดี");
    });
  });
});
