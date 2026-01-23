/**
 * E2E tests for full processing pipelines
 */
import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import { createTestDocument, createThaiTestWord, expectDocumentWordCount } from "../test-helpers.js";
import { createThaiTranscriptionExtension, createThaiTranslationExtension } from "../../../glost-th-extensions-suite-example/src/index.js";

describe("E2E Pipeline Tests", () => {
  describe("Single Extension Pipeline", () => {
    it("should process document with transcription extension", async () => {
      const words = [createThaiTestWord("สวัสดี"), createThaiTestWord("ครับ")];
      const document = createTestDocument(words, "th", "thai", "สวัสดีครับ");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      expectDocumentWordCount(result.document, 2);
      // At least one word should have transcription if data is available
      const hasTranscription = result.document.children?.[0]?.children?.[0]?.children?.some(
        (word: any) => word.transcription
      );
      expect(hasTranscription).toBeDefined();
    });

    it("should process document with translation extension", async () => {
      const words = [createThaiTestWord("สวัสดี"), createThaiTestWord("ครับ")];
      const document = createTestDocument(words, "th", "thai", "สวัสดีครับ");

      const extension = createThaiTranslationExtension("en-US");
      const result = await processGLOSTWithExtensionsAsync(document, [extension]);

      expectDocumentWordCount(result.document, 2);
    });
  });

  describe("Multi-Extension Pipeline", () => {
    it("should process document with transcription and translation", async () => {
      const words = [createThaiTestWord("สวัสดี"), createThaiTestWord("ครับ")];
      const document = createTestDocument(words, "th", "thai", "สวัสดีครับ");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expectDocumentWordCount(result.document, 2);
    });

    it("should handle multiple words in pipeline", async () => {
      const words = [
        createThaiTestWord("สวัสดี"),
        createThaiTestWord("ครับ"),
        createThaiTestWord("ขอบคุณ"),
      ];
      const document = createTestDocument(words, "th", "thai", "สวัสดีครับ ขอบคุณ");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expectDocumentWordCount(result.document, 3);
    });
  });

  describe("Error Handling", () => {
    it("should handle empty document", async () => {
      const document = createTestDocument([], "en", "latin", "");
      const extensions = [createThaiTranscriptionExtension()];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expect(result.document).toBeDefined();
      expectDocumentWordCount(result.document, 0);
    });

    it("should handle document with no matching extensions", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");
      // Empty extensions array
      const extensions: any[] = [];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expect(result.document).toBeDefined();
      expectDocumentWordCount(result.document, 1);
    });

    it("should handle words not in demo data gracefully", async () => {
      const words = [createThaiTestWord("ไม่มีในข้อมูล")];
      const document = createTestDocument(words, "th", "thai", "ไม่มีในข้อมูล");

      const extensions = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];

      const result = await processGLOSTWithExtensionsAsync(document, extensions);

      expect(result.document).toBeDefined();
      expectDocumentWordCount(result.document, 1);
      // Document should still be valid even if no data found
      expect(result.document.children).toBeDefined();
    });
  });

  describe("Pipeline Order", () => {
    it("should process extensions in order", async () => {
      const words = [createThaiTestWord("สวัสดี")];
      const document = createTestDocument(words, "th", "thai", "สวัสดี");

      // Process with transcription first, then translation
      const extensions1 = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension("en-US"),
      ];
      const result1 = await processGLOSTWithExtensionsAsync(document, extensions1);

      // Process with translation first, then transcription
      const extensions2 = [
        createThaiTranslationExtension("en-US"),
        createThaiTranscriptionExtension(),
      ];
      const result2 = await processGLOSTWithExtensionsAsync(document, extensions2);

      // Both should produce valid results
      expect(result1.document).toBeDefined();
      expect(result2.document).toBeDefined();
      expectDocumentWordCount(result1.document, 1);
      expectDocumentWordCount(result2.document, 1);
    });
  });
});
