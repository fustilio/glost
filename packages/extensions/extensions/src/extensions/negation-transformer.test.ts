/**
 * Tests for Negation Transformer Extension
 */

import { describe, it, expect } from "vitest";
import {
  createNegationTransformerExtension,
  NegationTransformerExtension,
} from "./negation-transformer";
import { processGLOSTWithExtensions } from "../processor.js";
import { createMockGLOSTDocument } from "../test-utils.js";
import type { GLOSTSentence, GLOSTWord } from "glost-core";
import { getAllSentences, getAllWords, getWordText } from "glost-core";

describe("NegationTransformerExtension", () => {
  it("should have correct metadata", () => {
    expect(NegationTransformerExtension.id).toBe("negation-transformer");
    expect(NegationTransformerExtension.name).toBe("Negation Transformer");
    expect(NegationTransformerExtension.dependencies).toContain("clause-segmenter");
  });

  it("should negate English sentence at sentence level", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I like coffee",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "like", partOfSpeech: "verb" },
            { text: "coffee" },
          ],
        },
      ],
    });

    const extension = createNegationTransformerExtension({
      language: "en-US",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const sentences = getAllSentences(result.document);
    const sentence = sentences[0] as GLOSTSentence;

    expect(sentence.extras?.isNegated).toBe(true);

    // Should have negation word added
    const words = getAllWords(result.document);
    const wordTexts = words.map((w) => getWordText(w as GLOSTWord));
    expect(wordTexts).toContain("don't");
  });

  it("should negate Thai sentence with ไม่", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "ผมชอบกาแฟ",
          lang: "th-TH",
          words: [
            { text: "ผม" },
            { text: "ชอบ", partOfSpeech: "verb" },
            { text: "กาแฟ" },
          ],
        },
      ],
    });

    const extension = createNegationTransformerExtension({
      language: "th-TH",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const sentences = getAllSentences(result.document);
    const sentence = sentences[0] as GLOSTSentence;

    expect(sentence.extras?.isNegated).toBe(true);

    // Should have Thai negation word
    const words = getAllWords(result.document);
    const wordTexts = words.map((w) => getWordText(w as GLOSTWord));
    expect(wordTexts).toContain("ไม่");
  });

  // NOTE: Tests that depend on ClauseSegmenterExtension (now in glost-clause-segmenter package)
  // have been removed. These should be recreated as integration tests in a separate test suite
  // that includes both glost-extensions and glost-clause-segmenter packages.

  it("should use emphatic negation when specified", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I like coffee",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "like", partOfSpeech: "verb" },
            { text: "coffee" },
          ],
        },
      ],
    });

    const extension = createNegationTransformerExtension({
      negationType: "emphatic",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    const wordTexts = words.map((w) => getWordText(w as GLOSTWord));

    // Should use emphatic negation word
    expect(wordTexts).toContain("never");
  });

  it("should use emphatic Thai negation ไม่เคย", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "ผมชอบกาแฟ",
          lang: "th-TH",
          words: [
            { text: "ผม" },
            { text: "ชอบ", partOfSpeech: "verb" },
            { text: "กาแฟ" },
          ],
        },
      ],
    });

    const extension = createNegationTransformerExtension({
      language: "th-TH",
      negationType: "emphatic",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    const wordTexts = words.map((w) => getWordText(w as GLOSTWord));

    expect(wordTexts).toContain("ไม่เคย");
  });

  it("should mark negation word node with isNegationWord extra", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I like coffee",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "like", partOfSpeech: "verb" },
            { text: "coffee" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [NegationTransformerExtension]);

    const words = getAllWords(result.document);
    const negationWords = words.filter((w) => (w as GLOSTWord).extras?.isNegationWord);

    expect(negationWords.length).toBeGreaterThan(0);
  });
});
