/**
 * E2E tests for English language features
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import { createTestDocument, createTestWord, expectWordText, expectDocumentWordCount } from "../test-helpers.js";
import { getAllWords } from "glost";

describe("English Language E2E Tests", () => {
  describe("Basic Processing", () => {
    it("should process English words", async () => {
      const words = [
        createTestWord("hello", "en", "latin"),
        createTestWord("world", "en", "latin"),
      ];
      const document = createTestDocument(words, "en", "latin", "hello world");

      // Process with empty extensions (basic document structure test)
      const result = await processGLOSTWithExtensionsAsync(document, []);

      expectDocumentWordCount(result.document, 2);
      
      const processedWords = getAllWords(result.document);
      expectWordText(processedWords[0], "hello");
      expectWordText(processedWords[1], "world");
    });

    it("should handle multiple sentences", async () => {
      const words = [
        createTestWord("hello", "en", "latin"),
        createTestWord("world", "en", "latin"),
      ];
      const document = createTestDocument(words, "en", "latin", "hello world");

      const result = await processGLOSTWithExtensionsAsync(document, []);

      expect(result.document).toBeDefined();
      expect(result.document.children).toBeDefined();
      expect(result.document.children.length).toBeGreaterThan(0);
    });
  });

  describe("Document Structure", () => {
    it("should maintain document structure", async () => {
      const words = [
        createTestWord("hello", "en", "latin"),
        createTestWord("world", "en", "latin"),
      ];
      const document = createTestDocument(words, "en", "latin", "hello world");

      const result = await processGLOSTWithExtensionsAsync(document, []);

      expect(result.document.type).toBe("RootNode");
      expect(result.document.lang).toBe("en");
      expect(result.document.script).toBe("latin");
    });
  });
});
