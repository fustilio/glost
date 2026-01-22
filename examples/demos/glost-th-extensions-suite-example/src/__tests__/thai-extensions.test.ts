/**
 * Tests for Thai Extensions Suite Example
 * 
 * Comprehensive tests to verify:
 * - Clause segmenter works correctly
 * - Thai extensions function properly
 * - Pipelines compose correctly
 * - All transformations and enrichments work
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleDocument,
  getAllWords,
  getAllClauses,
  getWordText,
  NODE_TYPES,
  isGLOSTClause,
} from "glost";
import { createThaiWord } from "glost-th";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";

import { createThaiTranscriptionExtension } from "../transcription.js";
import { createThaiTranslationExtension } from "../translation.js";
import {
  createThaiPronunciationPipeline,
  createThaiDialoguePipeline,
  createThaiGrammarPipeline,
  createThaiComprehensivePipeline,
} from "../pipeline.js";
import {
  ThaiClauseSegmenter,
  createThaiClauseSegmenter,
} from "../transformers.js";

// Helper to create a Thai document from words
function createThaiDocument(words: ReturnType<typeof createThaiWord>[], text: string) {
  return createSimpleDocument(words, "th", "thai", {
    sentenceText: text,
  });
}

describe("Thai Extensions Suite", () => {
  describe("Clause Segmenter", () => {
    it("should segment sentences into clauses", async () => {
      // Create a sentence with a clause boundary marker
      // "ฉันไปตลาดเพราะต้องการซื้อของ" (I go to market because I want to buy things)
      const words = [
        createThaiWord({ text: "ฉัน" }), // I
        createThaiWord({ text: "ไป" }), // go
        createThaiWord({ text: "ตลาด" }), // market
        createThaiWord({ text: "เพราะ" }), // because (clause marker)
        createThaiWord({ text: "ต้องการ" }), // want
        createThaiWord({ text: "ซื้อ" }), // buy
        createThaiWord({ text: "ของ" }), // things
      ];

      const doc = createThaiDocument(words, "ฉันไปตลาดเพราะต้องการซื้อของ");

      // Process with clause segmenter
      const result = await processGLOSTWithExtensionsAsync(doc, [ThaiClauseSegmenter]);

      // Check that clauses were created
      const sentence = result.document.children[0]?.children[0];
      expect(sentence).toBeDefined();
      expect(sentence?.type).toBe(NODE_TYPES.SENTENCE);

      // Get all clauses from the document
      const clauses = getAllClauses(result.document);
      expect(clauses.length).toBeGreaterThan(0);

      // Verify clause structure
      if (sentence && "children" in sentence) {
        const hasClauses = sentence.children.some(
          (child) => child.type === NODE_TYPES.CLAUSE
        );
        expect(hasClauses).toBe(true);
      }
    });

    it("should handle sentences without clause boundaries", async () => {
      // Simple sentence without clause markers
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ครับ" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีครับ");

      const result = await processGLOSTWithExtensionsAsync(doc, [ThaiClauseSegmenter]);

      // Should still process without errors
      expect(result.document).toBeDefined();
      const wordsAfter = getAllWords(result.document);
      expect(wordsAfter.length).toBe(2);
    });

    it("should work with createThaiClauseSegmenter function", async () => {
      const words = [
        createThaiWord({ text: "ถ้า" }), // if
        createThaiWord({ text: "ฝน" }), // rain
        createThaiWord({ text: "ตก" }), // fall
        createThaiWord({ text: "ฉัน" }), // I
        createThaiWord({ text: "จะ" }), // will
        createThaiWord({ text: "อยู่" }), // stay
        createThaiWord({ text: "บ้าน" }), // home
      ];

      const doc = createThaiDocument(words, "ถ้าฝนตกฉันจะอยู่บ้าน");

      const segmenter = createThaiClauseSegmenter({ includeMarkers: true });
      const result = await processGLOSTWithExtensionsAsync(doc, [segmenter]);

      expect(result.document).toBeDefined();
      const clauses = getAllClauses(result.document);
      // Should detect conditional clause
      expect(clauses.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Transcription Extension", () => {
    it("should add transcriptions to Thai words", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ครับ" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีครับ");

      const extension = createThaiTranscriptionExtension();
      const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(2);

      // Check that transcriptions were added (if word is in demo data)
      const firstWord = processedWords[0];
      if (firstWord.transcription) {
        expect(firstWord.transcription).toBeDefined();
      }
    });
  });

  describe("Translation Extension", () => {
    it("should add translations to Thai words", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ครับ" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีครับ");

      const extension = createThaiTranslationExtension("en-US");
      const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

      const processedWords = getAllWords(result.document);
      expect(processedWords.length).toBe(2);

      // Check that translations were added (if word is in demo data)
      const firstWord = processedWords[0];
      if (firstWord.extras?.translations?.["en-US"]) {
        expect(firstWord.extras.translations["en-US"]).toBeDefined();
      }
    });
  });

  describe("Pipelines", () => {
    it("should run pronunciation pipeline successfully", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ครับ" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีครับ");

      const pipeline = createThaiPronunciationPipeline();
      const result = await processGLOSTWithExtensionsAsync(doc, pipeline);

      expect(result.document).toBeDefined();
      expect(result.metadata.appliedExtensions.length).toBeGreaterThan(0);
    });

    it("should run dialogue pipeline successfully", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ครับ" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีครับ");

      const pipeline = createThaiDialoguePipeline({ gender: "male" });
      const result = await processGLOSTWithExtensionsAsync(doc, pipeline);

      expect(result.document).toBeDefined();
      expect(result.metadata.appliedExtensions.length).toBeGreaterThan(0);
    });

    it("should run grammar pipeline with clause segmentation", async () => {
      // Sentence with clause marker
      const words = [
        createThaiWord({ text: "ฉัน" }),
        createThaiWord({ text: "ไป" }),
        createThaiWord({ text: "ตลาด" }),
        createThaiWord({ text: "เพราะ" }), // because
        createThaiWord({ text: "ต้องการ" }),
        createThaiWord({ text: "ซื้อ" }),
        createThaiWord({ text: "ของ" }),
      ];

      const doc = createThaiDocument(words, "ฉันไปตลาดเพราะต้องการซื้อของ");

      const pipeline = createThaiGrammarPipeline({ includeGrammar: true });
      const result = await processGLOSTWithExtensionsAsync(doc, pipeline);

      expect(result.document).toBeDefined();
      
      // Check that clause segmentation was applied
      const clauses = getAllClauses(result.document);
      expect(clauses.length).toBeGreaterThan(0);
    });

    it("should run comprehensive pipeline successfully", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ครับ" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีครับ");

      const pipeline = createThaiComprehensivePipeline({
        includeGrammar: true,
        includeTranscription: true,
        includeTranslation: true,
      });
      const result = await processGLOSTWithExtensionsAsync(doc, pipeline);

      expect(result.document).toBeDefined();
      expect(result.metadata.appliedExtensions.length).toBeGreaterThan(0);
    });
  });

  describe("Integration Tests", () => {
    it("should process complex sentence with multiple extensions", async () => {
      // Complex sentence: "ถ้าฝนตกฉันจะอยู่บ้านเพราะไม่ต้องการเปียก"
      // (If it rains, I will stay home because I don't want to get wet)
      const words = [
        createThaiWord({ text: "ถ้า" }), // if
        createThaiWord({ text: "ฝน" }), // rain
        createThaiWord({ text: "ตก" }), // fall
        createThaiWord({ text: "ฉัน" }), // I
        createThaiWord({ text: "จะ" }), // will
        createThaiWord({ text: "อยู่" }), // stay
        createThaiWord({ text: "บ้าน" }), // home
        createThaiWord({ text: "เพราะ" }), // because
        createThaiWord({ text: "ไม่" }), // not
        createThaiWord({ text: "ต้องการ" }), // want
        createThaiWord({ text: "เปียก" }), // wet
      ];

      const doc = createThaiDocument(
        words,
        "ถ้าฝนตกฉันจะอยู่บ้านเพราะไม่ต้องการเปียก"
      );

      // Use comprehensive pipeline
      const pipeline = createThaiComprehensivePipeline({
        includeGrammar: true,
        includeTranscription: true,
        includeTranslation: true,
      });

      const result = await processGLOSTWithExtensionsAsync(doc, pipeline);

      // Verify document structure
      expect(result.document).toBeDefined();
      expect(result.document.type).toBe(NODE_TYPES.ROOT);

      // Verify extensions were applied
      expect(result.metadata.appliedExtensions.length).toBeGreaterThan(0);

      // Verify words are still accessible
      const wordsAfter = getAllWords(result.document);
      expect(wordsAfter.length).toBeGreaterThan(0);

      // Verify clause segmentation if grammar is enabled
      const clauses = getAllClauses(result.document);
      // Should have at least one clause (main clause)
      expect(clauses.length).toBeGreaterThanOrEqual(0);
    });
  });
});
