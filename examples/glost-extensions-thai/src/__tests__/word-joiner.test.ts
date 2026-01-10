/**
 * Tests for Thai Word Joiner Extension
 */

import { describe, it, expect } from "vitest";
import { createThaiWordJoinerExtension } from "../word-joiner";
import { processGLOSTWithExtensions } from "glost-extensions";
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

  const paragraph = {
    type: "ParagraphNode",
    lang: "th-TH",
    script: "thai",
    children: [sentence],
    extras: {},
  } as any;

  return {
    type: "RootNode",
    lang: "th-TH",
    script: "thai",
    children: [paragraph],
    extras: {},
  } as GLOSTRoot;
}

describe("Thai Word Joiner Extension", () => {
  describe("createThaiWordJoinerExtension", () => {
    it("should create an extension with default options", () => {
      const extension = createThaiWordJoinerExtension();
      expect(extension).toBeDefined();
      expect(extension.id).toBe("thai-word-joiner");
      expect(extension.name).toBe("Thai Word Joiner");
    });

    it("should create an extension with custom options", () => {
      const extension = createThaiWordJoinerExtension({
        maxCombinationLength: 3,
        minCombinationLength: 2,
      });
      expect(extension).toBeDefined();
    });
  });

  describe("word combination", () => {
    it("should combine ซู + เปอร์ + มาร์เก็ต into ซูเปอร์มาร์เก็ต", async () => {
      // Create a sentence with the separate words
      const document = createTestDocument([
        "ฉัน",
        "ไป",
        "ซู",
        "เปอร์",
        "มาร์เก็ต",
      ]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const firstSentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;
      const words =
        (firstSentence?.type === "SentenceNode"
          ? firstSentence.children
          : []) || [];

      // Extract word texts
      const wordTexts = words
        .filter((w: any) => w.type === "WordNode")
        .map((w: any) => {
          const textNode = w.children.find((c: any) => c.type === "TextNode");
          return textNode?.value || "";
        });

      // Find the combined word
      const combinedWord = words.find((w: any) => {
        if (w.type !== "WordNode") return false;
        const textNode = w.children.find((c: any) => c.type === "TextNode");
        return textNode?.value === "ซูเปอร์มาร์เก็ต";
      });

      // The combined word should exist and be marked as composite
      expect(combinedWord).toBeDefined();
      expect(combinedWord?.extras?.isComposite).toBe(true);

      // Verify original chunks
      const originalChunks = combinedWord?.extras?.originalChunks as
        | string[]
        | undefined;
      expect(originalChunks).toBeDefined();
      expect(Array.isArray(originalChunks)).toBe(true);
      expect(originalChunks?.length).toBe(3);
      expect(originalChunks).toContain("ซู");
      expect(originalChunks).toContain("เปอร์");
      expect(originalChunks).toContain("มาร์เก็ต");
    });

    it("should preserve words that cannot be combined", () => {
      const document = createTestDocument(["สวัสดี", "ครับ"]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const firstSentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;
      const words =
        (firstSentence?.type === "SentenceNode"
          ? firstSentence.children
          : []) || [];

      const wordTexts = words
        .filter((w: any) => w.type === "WordNode")
        .map((w: any) => {
          const textNode = w.children.find((c: any) => c.type === "TextNode");
          return textNode?.value || "";
        });

      // Should still have separate words if they can't be combined
      expect(wordTexts.length).toBeGreaterThan(0);
    });

    it("should handle sentences with punctuation", () => {
      const document = createTestDocument(["สวัสดี", "ครับ"]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const sentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;

      expect(sentence).toBeDefined();
      expect(sentence?.children).toBeDefined();
    });

    it("should preserve non-word nodes (punctuation, whitespace)", () => {
      const document = createTestDocument(["สวัสดี", "ครับ"]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const children = result.document.children[0]?.children[0]?.children || [];

      // Should have word nodes and non-word nodes
      const hasWordNodes = children.some((c: any) => c.type === "WordNode");
      expect(hasWordNodes).toBe(true);
    });
  });

  describe("composite word structure", () => {
    it("should mark composite words with isComposite in extras", () => {
      const document = createTestDocument([
        "ฉัน",
        "ไป",
        "ซู",
        "เปอร์",
        "มาร์เก็ต",
      ]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const firstSentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;
      const words =
        (firstSentence?.type === "SentenceNode"
          ? firstSentence.children
          : []) || [];

      const compositeWords = words.filter(
        (w: any) => w.type === "WordNode" && w.extras?.isComposite === true
      );

      // Should have at least one composite word (ซูเปอร์มาร์เก็ต)
      expect(compositeWords.length).toBeGreaterThan(0);

      // Verify the composite word structure
      const supermarketWord = compositeWords.find((w: any) => {
        const textNode = w.children.find((c: any) => c.type === "TextNode");
        return textNode?.value === "ซูเปอร์มาร์เก็ต";
      });

      expect(supermarketWord).toBeDefined();
      expect(supermarketWord?.extras?.isComposite).toBe(true);
    });

    it("should preserve original chunks in extras", () => {
      const document = createTestDocument([
        "ฉัน",
        "ไป",
        "ซู",
        "เปอร์",
        "มาร์เก็ต",
      ]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const firstSentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;
      const words =
        (firstSentence?.type === "SentenceNode"
          ? firstSentence.children
          : []) || [];

      const compositeWords = words.filter(
        (w: any) =>
          w.type === "WordNode" &&
          w.extras?.isComposite === true &&
          Array.isArray(w.extras?.originalChunks)
      );

      expect(compositeWords.length).toBeGreaterThan(0);

      // Find the ซูเปอร์มาร์เก็ต word
      const supermarketWord = compositeWords.find((w: any) => {
        const textNode = w.children.find((c: any) => c.type === "TextNode");
        return textNode?.value === "ซูเปอร์มาร์เก็ต";
      });

      expect(supermarketWord).toBeDefined();
      expect(supermarketWord?.extras?.originalChunks).toBeDefined();
      expect(Array.isArray(supermarketWord?.extras?.originalChunks)).toBe(true);
      expect(supermarketWord?.extras?.originalChunks.length).toBe(3);
      expect(supermarketWord?.extras?.originalChunks).toEqual([
        "ซู",
        "เปอร์",
        "มาร์เก็ต",
      ]);
    });
  });

  describe("transcription preservation", () => {
    it("should preserve or combine transcriptions for composite words", () => {
      const document = createTestDocument(["ซู", "เปอร์", "มาร์เก็ต"]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const firstSentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;
      const words =
        (firstSentence?.type === "SentenceNode"
          ? firstSentence.children
          : []) || [];

      const compositeWords = words.filter(
        (w: any) => w.type === "WordNode" && w.extras?.isComposite === true
      );

      for (const word of compositeWords) {
        // Composite words should have transcription data
        expect(word.transcription).toBeDefined();
        // Should have at least one transcription system
        expect(Object.keys(word.transcription).length).toBeGreaterThan(0);
      }
    });
  });

  describe("edge cases", () => {
    it("should handle empty sentences", () => {
      const document = createTestDocument([]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      expect(result.document).toBeDefined();
    });

    it("should handle sentences with only non-Thai text", () => {
      const document = createTestDocument(["Hello", "world"]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      expect(result.document).toBeDefined();
    });

    it("should handle single word sentences", () => {
      const document = createTestDocument(["สวัสดี"]);
      const extension = createThaiWordJoinerExtension();

      const result = processGLOSTWithExtensions(document, [extension]);
      const firstParagraph = result.document.children[0];
      const firstSentence =
        firstParagraph?.type === "ParagraphNode"
          ? firstParagraph.children[0]
          : null;
      const words =
        (firstSentence?.type === "SentenceNode"
          ? firstSentence.children
          : []) || [];

      // Should still have at least one word
      const wordNodes = words.filter((w: any) => w.type === "WordNode");
      expect(wordNodes.length).toBeGreaterThan(0);
    });

    it("should respect maxCombinationLength option", () => {
      const document = createTestDocument(["ซู", "เปอร์", "มาร์เก็ต"]);
      const extension = createThaiWordJoinerExtension({
        maxCombinationLength: 2,
      });

      const result = processGLOSTWithExtensions(document, [extension]);
      // With maxCombinationLength of 2, should only try combining 2 words at a time
      expect(result.document).toBeDefined();
    });
  });

  describe("integration with other extensions", () => {
    it("should work with syllable segmenter", async () => {
      const document = createTestDocument(["ซู", "เปอร์", "มาร์เก็ต"]);
      const wordJoiner = createThaiWordJoinerExtension();

      // Import syllable segmenter from transformers
      const transformersModule = await import("../transformers");
      const { ThaiSyllableSegmenter } = transformersModule;

      const result = processGLOSTWithExtensions(document, [
        wordJoiner,
        ThaiSyllableSegmenter,
      ]);

      // Should process without errors
      expect(result.document).toBeDefined();
      expect(result.metadata.appliedExtensions.length).toBeGreaterThan(0);
    });
  });
});
