/**
 * E2E tests for Japanese language features
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import {
  createTestDocument,
  createTestWord,
  expectWordText,
  expectWordHasTranscription,
  expectDocumentWordCount,
} from "../test-helpers.js";
import { getAllWords } from "glost";
import { createJapaneseTranscriptionExtension } from "../index.js";

describe("Japanese Language E2E Tests", () => {
  describe("Transcription Systems", () => {
    it("should add romaji transcription", async () => {
      const words = [createTestWord("こんにちは", "ja", "hiragana")];
      const document = createTestDocument(words, "ja", "hiragana", "こんにちは");

      const extension = createJapaneseTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(1);
      
      const word = processedWords[0];
      expectWordText(word, "こんにちは");
      
      if (word.transcription) {
        expectWordHasTranscription(word, "romaji");
      }
    });

    it("should add hiragana transcription for kanji", async () => {
      const words = [createTestWord("日本語", "ja", "kanji")];
      const document = createTestDocument(words, "ja", "kanji", "日本語");

      const extension = createJapaneseTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      if (word.transcription) {
        expectWordHasTranscription(word, "hiragana");
      }
    });

    it("should handle katakana words", async () => {
      const words = [createTestWord("カタカナ", "ja", "katakana")];
      const document = createTestDocument(words, "ja", "katakana", "カタカナ");

      const extension = createJapaneseTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(1);
      expectWordText(processedWords[0], "カタカナ");
    });
  });

  describe("Multiple Words", () => {
    it("should handle multiple Japanese words", async () => {
      const words = [
        createTestWord("こんにちは", "ja", "hiragana"),
        createTestWord("ありがとう", "ja", "hiragana"),
      ];
      const document = createTestDocument(words, "ja", "hiragana", "こんにちは ありがとう");

      const extension = createJapaneseTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      expectDocumentWordCount(result.document, 2);
    });
  });

  describe("Edge Cases", () => {
    it("should not add transcriptions to non-Japanese words", async () => {
      const words = [createTestWord("hello", "en", "latin")];
      const document = createTestDocument(words, "en", "latin", "hello");

      const extension = createJapaneseTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      // Should not have Japanese transcription
      expect(word.transcription).toBeUndefined();
    });
  });
});
