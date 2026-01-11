/**
 * Multi-Extension Pipeline Tests
 * 
 * Comprehensive tests to discover system pain points through real usage.
 * These tests focus on:
 * - API ergonomics
 * - Type safety
 * - Composition patterns
 * - Data integration
 * - Performance
 * - Error handling
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleDocument,
  NODE_TYPES,
  getAllWords,
  getFirstWord,
} from "glost";
import { createThaiWord } from "glost-th";
import { processGLOST } from "glost-extensions";
import {
  createThaiTranscriptionExtension,
  createThaiTranslationExtension,
  createThaiFrequencyExtension,
  executePipeline,
  createPipeline,
  analyzeWordEnrichment,
  formatPipelineResult,
} from "../index.js";

// Helper to create a Thai document from words
function createThaiDocument(words: any[], text: string) {
  return createSimpleDocument(words, "th", "thai", {
    sentenceText: text,
  });
}

describe("Multi-Extension Pipeline", () => {
  describe("Basic Composition", () => {
    it("should compose three extensions in sequence", async () => {
      // Create test document
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "คน" }),
        createThaiWord({ text: "ดี" }),
      ];

      const doc = createThaiDocument(words, "สวัสดีคนดี");

      // Create extensions
      const transcriptionExt = createThaiTranscriptionExtension();
      const translationExt = createThaiTranslationExtension();
      const [freqGen, freqEnh] = createThaiFrequencyExtension();

      // Compose pipeline
      const pipeline = [transcriptionExt, translationExt, freqGen, freqEnh];

      // Process document - using new simplified API
      const result = await processGLOST(doc, pipeline);

      // Verify all extensions applied - using new getFirstWord helper
      const firstWord = getFirstWord(result) as any;
      expect(firstWord).toBeDefined();
      expect(firstWord.transcription).toBeDefined();
      expect(firstWord.extras?.translations).toBeDefined();
      expect(firstWord.extras?.metadata?.frequency).toBeDefined();
    });

    it("should work with createPipeline utility", () => {
      const pipeline = createPipeline([
        () => createThaiTranscriptionExtension(),
        () => createThaiTranslationExtension(),
        () => createThaiFrequencyExtension(), // Returns array
      ]);

      // Should have 4 extensions (frequency returns 2)
      expect(pipeline.length).toBe(4);
      expect(pipeline.map((e) => e.id)).toContain("transcription");
      expect(pipeline.map((e) => e.id)).toContain("translation");
      expect(pipeline.map((e) => e.id)).toContain("frequency-generator");
    });
  });

  describe("Execution Order", () => {
    it("should handle different execution orders gracefully", async () => {
      const words = [createThaiWord({ text: "ภาษา" })];
      const doc = createThaiDocument(words, "ภาษา");

      // Try: translation -> transcription -> frequency
      const result1 = await processGLOST(doc, [
        createThaiTranslationExtension(),
        createThaiTranscriptionExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      // Try: frequency -> transcription -> translation
      const doc2 = createThaiDocument([createThaiWord({ text: "ภาษา" })], "ภาษา");
      const result2 = await processGLOST(doc2, [
        ...createThaiFrequencyExtension(),
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
      ]);

      // Both should produce fully enriched words - using new getAllWords helper
      const words1 = getAllWords(result1);
      const words2 = getAllWords(result2);
      
      const word1 = words1[0] as any;
      const word2 = words2[0] as any;

      expect(word1.transcription).toBeDefined();
      expect(word1.extras?.translations).toBeDefined();
      expect(word1.extras?.metadata?.frequency).toBeDefined();

      expect(word2.transcription).toBeDefined();
      expect(word2.extras?.translations).toBeDefined();
      expect(word2.extras?.metadata?.frequency).toBeDefined();
    });
  });

  describe("Data Integration", () => {
    it("should handle words with complete data", async () => {
      const words = [createThaiWord({ text: "คน" })]; // Has all data
      const doc = createThaiDocument(words, "คน");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const word = getFirstWord(result.document) as any;
      expect(word).toBeDefined();

      expect(word.transcription.rtgs.text).toBe("khon");
      expect(word.transcription.ipa.text).toBe("kʰon");
      expect(word.extras.translations.en).toBe("person, people");
      expect(word.extras.metadata.frequency).toBe("very-common");
    });

    it("should handle words with missing data gracefully", async () => {
      // Use a word NOT in our demo data
      const words = [createThaiWord({ text: "ไม่มีข้อมูล" })];
      const doc = createThaiDocument(words, "ไม่มีข้อมูล");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const word = getFirstWord(result.document) as any;
      expect(word).toBeDefined();

      // Extensions should not crash, just skip missing data
      expect(word.transcription).toBeUndefined();
      expect(word.extras?.translations).toBeUndefined();
      expect(word.extras?.metadata?.frequency).toBeUndefined();
    });

    it("should handle partially available data", async () => {
      // "ขอบคุณ" has transcription and translation but uncommon frequency
      const words = [createThaiWord({ text: "ขอบคุณ" })];
      const doc = createThaiDocument(words, "ขอบคุณ");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const word = getFirstWord(result.document) as any;
      expect(word).toBeDefined();

      expect(word.transcription).toBeDefined();
      expect(word.extras.translations.en).toBe("thank you");
      expect(word.extras.metadata.frequency).toBe("uncommon");
    });
  });

  describe("Performance & Scaling", () => {
    it("should handle large documents efficiently", async () => {
      // Create document with 100 words
      const words = [];
      const thaiWords = ["คน", "ดี", "บ้าน", "ไทย", "ใหม่"];

      for (let i = 0; i < 100; i++) {
        words.push(createThaiWord({ text: thaiWords[i % thaiWords.length] }));
      }

      const doc = createThaiDocument(words, words.map((w) => w.text).join(""));

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      // Should complete in reasonable time (< 1000ms)
      expect(result.totalTime).toBeLessThan(1000);
      expect(result.wordCount).toBe(100);

      // All words should be processed
      const enrichment = analyzeWordEnrichment(result.document);
      expect(enrichment.total).toBe(100);
      expect(enrichment.fullyEnriched).toBeGreaterThan(0);
    });

    it("should provide timing breakdown per extension", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "คน" }),
      ];
      const doc = createThaiDocument(words, "สวัสดีคน");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      // Should have timing for each extension
      expect(result.extensionTimes.length).toBe(4);
      expect(result.extensionTimes.map((e) => e.id)).toContain("transcription");
      expect(result.extensionTimes.map((e) => e.id)).toContain("translation");

      // Each extension should have positive time
      result.extensionTimes.forEach((ext) => {
        expect(ext.time).toBeGreaterThan(0);
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle extension errors gracefully", async () => {
      const words = [createThaiWord({ text: "สวัสดี" })];
      const doc = createThaiDocument(words, "สวัสดี");

      // Should not throw even if providers have issues
      await expect(
        executePipeline(doc, [
          createThaiTranscriptionExtension(),
          createThaiTranslationExtension(),
          ...createThaiFrequencyExtension(),
        ])
      ).resolves.toBeDefined();
    });

    it("should continue processing even if one extension fails", async () => {
      const words = [
        createThaiWord({ text: "สวัสดี" }),
        createThaiWord({ text: "ไม่มีข้อมูล" }), // Missing data
      ];
      const doc = createThaiDocument(words, "สวัสดีไม่มีข้อมูล");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      // First word should have data - using new getAllWords helper
      const allWords = getAllWords(result.document);
      expect(allWords.length).toBe(2);
      const word1 = allWords[0] as any;
      expect(word1.transcription).toBeDefined();

      // Second word should not crash the pipeline
      const word2 = allWords[1] as any;
      expect(word2).toBeDefined();
    });
  });

  describe("Type Safety", () => {
    it("should provide type-safe access to enriched data", async () => {
      const words = [createThaiWord({ text: "คน" })];
      const doc = createThaiDocument(words, "คน");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const word = getFirstWord(result.document) as any;
      expect(word).toBeDefined();

      // TypeScript should recognize these fields
      // (In real usage, this would be type-checked)
      expect(typeof word.transcription).toBe("object");
      expect(typeof word.extras?.translations).toBe("object");
      expect(typeof word.extras?.metadata?.frequency).toBe("string");
    });
  });

  describe("Utility Functions", () => {
    it("should analyze word enrichment correctly", async () => {
      const words = [
        createThaiWord({ text: "คน" }), // Has all data
        createThaiWord({ text: "ไม่มีข้อมูล" }), // Has no data
      ];
      const doc = createThaiDocument(words, "คนไม่มีข้อมูล");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const enrichment = analyzeWordEnrichment(result.document);

      expect(enrichment.total).toBe(2);
      expect(enrichment.withTranscription).toBe(1);
      expect(enrichment.withTranslation).toBe(1);
      expect(enrichment.withFrequency).toBe(1);
      expect(enrichment.fullyEnriched).toBe(1);
    });

    it("should format pipeline results readably", async () => {
      const words = [createThaiWord({ text: "คน" })];
      const doc = createThaiDocument(words, "คน");

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const formatted = formatPipelineResult(result);

      expect(formatted).toContain("Pipeline Execution Summary");
      expect(formatted).toContain("Total time:");
      expect(formatted).toContain("Words processed:");
      expect(formatted).toContain("Per-Extension Timing:");
      expect(formatted).toContain("Word Enrichment:");
    });
  });

  describe("Stress Tests", () => {
    it("should handle documents with mixed data availability", async () => {
      const words = [
        createThaiWord({ text: "คน" }), // very-common, has all
        createThaiWord({ text: "ดี" }), // very-common, has all
        createThaiWord({ text: "ขอบคุณ" }), // uncommon, has all
        createThaiWord({ text: "ไม่มีข้อมูล" }), // no data
        createThaiWord({ text: "บ้าน" }), // very-common, has all
      ];

      const doc = createThaiDocument(words, words.map((w) => w.text).join(""));

      const result = await executePipeline(doc, [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ]);

      const enrichment = analyzeWordEnrichment(result.document);

      expect(enrichment.total).toBe(5);
      expect(enrichment.fullyEnriched).toBe(4); // All except missing one
    });

    it("should handle rapid re-processing", async () => {
      const words = [createThaiWord({ text: "คน" })];

      const pipeline = [
        createThaiTranscriptionExtension(),
        createThaiTranslationExtension(),
        ...createThaiFrequencyExtension(),
      ];

      // Process same document multiple times
      const results = await Promise.all([
        executePipeline(createThaiDocument(words, "คน"), pipeline),
        executePipeline(createThaiDocument(words, "คน"), pipeline),
        executePipeline(createThaiDocument(words, "คน"), pipeline),
      ]);

      // All should succeed
      results.forEach((result) => {
        expect(result.wordCount).toBe(1);
        const enrichment = analyzeWordEnrichment(result.document);
        expect(enrichment.fullyEnriched).toBe(1);
      });
    });
  });
});
