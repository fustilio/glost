/**
 * Tests for Negation Transformer Extension
 */

import { describe, it, expect } from "vitest";
import {
  createNegationTransformerExtension,
  NegationTransformerExtension,
  type NegationData,
} from "./negation-transformer";
// NOTE: ClauseSegmenterExtension has been moved to glost-clause-segmenter
// Tests that use it are skipped
// import { ClauseSegmenterExtension } from "./clause-segmenter";
import { processGLOSTWithExtensions } from "../processor.js";
import { createMockGLOSTDocument } from "../test-utils.js";
import type { GLOSTSentence, GLOSTClause, GLOSTWord } from "glost";
import { getAllSentences, getAllClauses, getAllWords, getWordText } from "glost";

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

  it.skip("should negate clause when used with ClauseSegmenterExtension", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I think that you are right",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "think", partOfSpeech: "verb" },
            { text: "that" },
            { text: "you" },
            { text: "are", partOfSpeech: "verb" },
            { text: "right" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [
      ClauseSegmenterExtension,
      NegationTransformerExtension,
    ]);

    const clauses = getAllClauses(result.document);

    // Main clause should be negated
    const mainClauses = clauses.filter((c) => c.clauseType === "main");
    expect(mainClauses.length).toBeGreaterThan(0);

    const mainClause = mainClauses[0] as GLOSTClause;
    expect(mainClause.extras?.isNegated).toBe(true);
  });

  it.skip("should only negate main clauses when mainClausesOnly is true", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I like coffee but she prefers tea",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "like", partOfSpeech: "verb" },
            { text: "coffee" },
            { text: "but" },
            { text: "she" },
            { text: "prefers", partOfSpeech: "verb" },
            { text: "tea" },
          ],
        },
      ],
    });

    const extension = createNegationTransformerExtension({
      mainClausesOnly: true,
    });

    const result = processGLOSTWithExtensions(doc, [
      ClauseSegmenterExtension,
      extension,
    ]);

    const clauses = getAllClauses(result.document);

    // All main clauses should be negated
    const mainClauses = clauses.filter((c) => c.clauseType === "main");
    for (const clause of mainClauses) {
      expect(clause.extras?.isNegated).toBe(true);
    }
  });

  it.skip("should negate specific clause by index", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I like coffee but she prefers tea",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "like", partOfSpeech: "verb" },
            { text: "coffee" },
            { text: "but" },
            { text: "she" },
            { text: "prefers", partOfSpeech: "verb" },
            { text: "tea" },
          ],
        },
      ],
    });

    const extension = createNegationTransformerExtension({
      clauseIndex: 0, // Only negate first clause
      mainClausesOnly: false,
    });

    const result = processGLOSTWithExtensions(doc, [
      ClauseSegmenterExtension,
      extension,
    ]);

    const clauses = getAllClauses(result.document);

    // Only first clause should be negated
    if (clauses.length >= 2) {
      expect(clauses[0]?.extras?.isNegated).toBe(true);
      expect(clauses[1]?.extras?.isNegated).toBeUndefined();
    }
  });

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

  it.skip("should preserve original form in extras", () => {
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

    const result = processGLOSTWithExtensions(doc, [
      ClauseSegmenterExtension,
      NegationTransformerExtension,
    ]);

    const clauses = getAllClauses(result.document);

    if (clauses.length > 0) {
      const negationData = clauses[0]?.extras as NegationData;
      expect(negationData.originalForm).toBeDefined();
      expect(negationData.originalForm).toContain("like");
    }
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

  it.skip("should not double-negate already negated clauses", () => {
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

    // Apply negation twice
    let result = processGLOSTWithExtensions(doc, [
      ClauseSegmenterExtension,
      NegationTransformerExtension,
    ]);

    // Get clause and count negation words
    let clauses = getAllClauses(result.document);
    const firstPassWords = clauses[0]?.children.filter(
      (c) => c.type === "WordNode"
    ).length;

    // Apply again
    result = processGLOSTWithExtensions(result.document, [
      NegationTransformerExtension,
    ]);

    clauses = getAllClauses(result.document);
    const secondPassWords = clauses[0]?.children.filter(
      (c) => c.type === "WordNode"
    ).length;

    // Should not have added another negation word
    expect(secondPassWords).toBe(firstPassWords);
  });
});
