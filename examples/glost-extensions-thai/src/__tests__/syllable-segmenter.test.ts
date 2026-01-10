/**
 * Tests for Thai Syllable Segmenter Extension
 * 
 * This example uses a simplified demo implementation with Intl.Segmenter.
 * Real implementations would use sophisticated DFA-based segmentation algorithms
 * like @fustilio/th-syllables for accurate multi-syllable word segmentation.
 * 
 * These tests demonstrate:
 * 1. The extension pattern for syllable segmentation
 * 2. What works well with simplified implementation (single syllables)
 * 3. What requires sophisticated algorithms (multi-syllable words)
 */

import { describe, it, expect } from "vitest";
import { createThaiSyllableSegmenterExtension } from "../syllable-segmenter";
import type { GLOSTRoot, GLOSTWord, GLOSTSentence, GLOSTText } from "glost";

/**
 * Helper to create a simple GLOST text node
 */
function createTextNode(value: string): GLOSTText {
  return {
    type: "TextNode",
    value,
  };
}

/**
 * Helper to create a simple GLOST word node with children
 */
function createWordNode(text: string): GLOSTWord {
  return {
    type: "WordNode",
    lang: "th-TH",
    script: "thai",
    transcription: {},
    metadata: { partOfSpeech: "" },
    extras: {},
    children: [createTextNode(text)],
  } as GLOSTWord;
}

/**
 * Helper to create a simple GLOST document with Thai words
 */
function createTestDocument(words: string[]): GLOSTRoot {
  const wordNodes: GLOSTWord[] = words.map((text) => createWordNode(text));

  const sentence = {
    type: "SentenceNode",
    lang: "th-TH",
    script: "thai",
    originalText: words.join(""),
    children: wordNodes,
    extras: {},
  } as GLOSTSentence;

  return {
    type: "RootNode",
    lang: "th-TH",
    script: "thai",
    children: [sentence],
    extras: {},
  } as GLOSTRoot;
}

describe("Thai Syllable Segmenter Extension (Demo)", () => {
  describe("Extension Creation", () => {
    it("creates extension with correct properties", () => {
      const extension = createThaiSyllableSegmenterExtension();
      expect(extension.id).toBe("thai-syllable-segmenter");
      expect(extension.name).toBe("Thai Syllable Segmenter");
      expect(extension.description).toContain("demo");
      expect(typeof extension.transform).toBe("function");
    });

    it("accepts options for character breakdown and tone computation", () => {
      const extension = createThaiSyllableSegmenterExtension({
        includeCharacters: true,
        computeTones: true,
        segmentAllThai: true,
      });
      
      expect(extension).toBeDefined();
    });
  });

  describe("Single-Syllable Words (Works Well)", () => {
    // Demo implementation handles single-syllable words reasonably well
    const singleSyllableTests = [
      { word: "กา", desc: "Simple CV open syllable" },
      { word: "ดี", desc: "CV with long vowel" },
      { word: "มา", desc: "CV open" },
      { word: "กิน", desc: "CVC closed" },
      { word: "บาน", desc: "CVC with long vowel" },
      { word: "รัก", desc: "CVC short vowel" },
      { word: "เก", desc: "Leading vowel เ-" },
      { word: "แก", desc: "Leading vowel แ-" },
      { word: "โก", desc: "Leading vowel โ-" },
      { word: "ไป", desc: "Leading vowel ไ-" },
      { word: "ใจ", desc: "Leading vowel ใ-" },
      { word: "ก่า", desc: "With mai ek tone mark" },
      { word: "ก้า", desc: "With mai tho tone mark" },
      { word: "บ้าน", desc: "CVC with tone" },
    ];

    for (const { word, desc } of singleSyllableTests) {
      it(`segments '${word}' - ${desc}`, () => {
        const doc = createTestDocument([word]);
        const extension = createThaiSyllableSegmenterExtension();
        const result = extension.transform!(doc) as GLOSTRoot;

        const sentence = result.children[0] as GLOSTSentence;
        const wordNode = sentence.children[0] as GLOSTWord;

        expect(wordNode.extras?.segmented).toBe(true);
        expect(wordNode.extras?.segmentationMethod).toBe("demo-intl-segmenter");
        expect(wordNode.children?.length).toBe(1); // Single syllable
      });
    }
  });

  describe("Character-Level Breakdown", () => {
    it("includes character nodes when requested", () => {
      const extension = createThaiSyllableSegmenterExtension({
        includeCharacters: true,
      });

      const doc = createTestDocument(["กา"]);
      const result = extension.transform!(doc) as GLOSTRoot;

      const sentence = result.children[0] as GLOSTSentence;
      const word = sentence.children[0] as GLOSTWord;
      const syllable = word.children?.[0] as any;

      // Should have character nodes
      expect(syllable?.children?.length).toBeGreaterThan(0);
      expect(syllable?.children?.[0]?.type).toBe("CharacterNode");
    });

    it("excludes character nodes when not requested", () => {
      const extension = createThaiSyllableSegmenterExtension({
        includeCharacters: false,
      });

      const doc = createTestDocument(["กา"]);
      const result = extension.transform!(doc) as GLOSTRoot;

      const sentence = result.children[0] as GLOSTSentence;
      const word = sentence.children[0] as GLOSTWord;
      const syllable = word.children?.[0] as any;

      // Should not have character nodes
      expect(syllable?.children?.length).toBe(0);
    });
  });

  describe("Tone Computation", () => {
    it("computes tone numbers from tone marks when requested", () => {
      const extension = createThaiSyllableSegmenterExtension({
        computeTones: true,
      });

      const doc = createTestDocument(["ก่า"]); // Mai ek = tone 1
      const result = extension.transform!(doc) as GLOSTRoot;

      const sentence = result.children[0] as GLOSTSentence;
      const word = sentence.children[0] as GLOSTWord;
      const syllable = word.children?.[0] as any;

      // Should have tone number computed
      expect(syllable?.tone).toBeDefined();
      expect(syllable?.tone).toBe(1); // Mai ek
    });
  });

  describe("Demo Implementation Limitations", () => {
    // These tests document the limitations of the simplified implementation
    
    it("demonstrates limitation with multi-syllable words", () => {
      // Multi-syllable words require sophisticated segmentation
      // Demo implementation using Intl.Segmenter treats them as single segments
      const doc = createTestDocument(["สวัสดี"]); // 3 syllables: สะ-หวัด-ดี
      const extension = createThaiSyllableSegmenterExtension();
      const result = extension.transform!(doc) as GLOSTRoot;

      const sentence = result.children[0] as GLOSTSentence;
      const word = sentence.children[0] as GLOSTWord;

      expect(word.extras?.segmented).toBe(true);
      expect(word.extras?.segmentationMethod).toBe("demo-intl-segmenter");
      
      // Demo implementation doesn't segment this properly
      // Real implementations with DFA algorithms would return 3 syllables
      expect(word.children?.length).toBeLessThan(3);
    });

    it("shows what real implementations would achieve", () => {
      // This test documents what a production implementation would do
      // For reference: a DFA-based implementation would properly segment
      // multi-syllable words like:
      // - สวัสดี → สะ-วัด-ดี (3 syllables)
      // - ขอบคุณ → ขอบ-คุณ (2 syllables)
      // - ประเทศ → ประ-เทศ (2 syllables)
      
      expect(true).toBe(true); // Documentation test
    });
  });

  describe("Integration Pattern", () => {
    it("demonstrates the correct extension pattern", () => {
      // This test shows the pattern for building syllable segmenters
      // Production implementations would replace the segmentation logic
      // but keep the same extension structure

      const extension = createThaiSyllableSegmenterExtension({
        includeCharacters: true,
        computeTones: true,
      });

      // Extension should have standard GLOST extension structure
      expect(extension.id).toBeDefined();
      expect(extension.name).toBeDefined();
      expect(extension.description).toBeDefined();
      expect(typeof extension.transform).toBe("function");

      // Transform should process documents correctly
      const doc = createTestDocument(["กา"]);
      const result = extension.transform!(doc);
      
      expect(result).toBeDefined();
      expect(result.type).toBe("RootNode");
    });

    it("processes multiple words in a document", () => {
      const extension = createThaiSyllableSegmenterExtension();
      const doc = createTestDocument(["กา", "มา", "ดี"]);
      const result = extension.transform!(doc) as GLOSTRoot;

      const sentence = result.children[0] as GLOSTSentence;
      const words = sentence.children as GLOSTWord[];

      expect(words.length).toBe(3);
      
      for (const word of words) {
        expect(word.extras?.segmented).toBe(true);
        expect(word.children?.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Production Implementation Guidance", () => {
    it("documents what a real implementation needs", () => {
      // For production use, you would:
      // 
      // 1. Use a DFA-based syllable segmentation algorithm
      //    Example: @fustilio/th-syllables
      //
      // 2. Implement proper phonological analysis
      //    - Initial consonant (Ci) detection
      //    - Vowel (V) identification (including complex forms)
      //    - Final consonant (Cf) detection
      //    - Tone mark (T) processing
      //
      // 3. Handle edge cases:
      //    - Consonant clusters (กร, ปล, etc.)
      //    - Leading vowels (เ, แ, โ, ไ, ใ)
      //    - Complex vowels (เ-ีย, เ-ือ, etc.)
      //    - Multiple tone marks and vowel combinations
      //
      // 4. Achieve high accuracy:
      //    - 100% coverage on well-formed Thai text
      //    - Proper handling of loan words
      //    - Support for informal/dialectal variations

      expect(true).toBe(true); // Pattern documentation
    });

    it("shows good coverage on simple cases", () => {
      // Even with simplified implementation, single-syllable words work well
      const simpleCases = ["กา", "ดี", "มา", "นา", "บา"];
      const extension = createThaiSyllableSegmenterExtension();

      for (const word of simpleCases) {
        const doc = createTestDocument([word]);
        const result = extension.transform!(doc) as GLOSTRoot;
        const sentence = result.children[0] as GLOSTSentence;
        const wordNode = sentence.children[0] as GLOSTWord;

        expect(wordNode.extras?.segmented).toBe(true);
      }
    });
  });
});
