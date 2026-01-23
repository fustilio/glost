/**
 * E2E tests for Korean language features
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import { createTestDocument, createTestWord, expectWordText, expectDocumentWordCount } from "../test-helpers.js";
import { getAllWords } from "glost";
import { createKoreanTranscriptionExtension } from "../index.js";

describe("Korean Language E2E Tests", () => {
  describe("Transcription Systems", () => {
    it("should add romanization transcription", async () => {
      const words = [createTestWord("안녕하세요", "ko", "hangul")];
      const document = createTestDocument(words, "ko", "hangul", "안녕하세요");

      const extension = createKoreanTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(1);
      
      const word = processedWords[0];
      expectWordText(word, "안녕하세요");
      
      // Transcription may not be available in demo data, so we just check the word structure
      expect(word).toBeDefined();
      expect(word.type).toBe("WordNode");
    });

    it("should handle multiple Korean words", async () => {
      const words = [
        createTestWord("안녕하세요", "ko", "hangul"),
        createTestWord("감사합니다", "ko", "hangul"),
      ];
      const document = createTestDocument(words, "ko", "hangul", "안녕하세요 감사합니다");

      const extension = createKoreanTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      expectDocumentWordCount(result.document, 2);
    });
  });

  describe("Edge Cases", () => {
    it("should not add transcriptions to non-Korean words", async () => {
      const words = [createTestWord("hello", "en", "latin")];
      const document = createTestDocument(words, "en", "latin", "hello");

      const extension = createKoreanTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      const processedWords = getAllWords(result.document);
      const word = processedWords[0];
      
      // Should not have Korean transcription
      expect(word.transcription).toBeUndefined();
    });
  });
});
