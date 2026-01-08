/**
 * Tests for Clause Segmenter Extension
 */

import { describe, it, expect } from "vitest";
import {
  createClauseSegmenterExtension,
  ClauseSegmenterExtension,
} from "./clause-segmenter";
import { processGLOSTWithExtensions } from "../processor";
import { createMockGLOSTDocument } from "../test-utils";
import type { GLOSTSentence, GLOSTClause } from "@glost/core";
import { getAllSentences, getAllClauses, isGLOSTClause } from "@glost/core";

describe("ClauseSegmenterExtension", () => {
  it("should have correct metadata", () => {
    expect(ClauseSegmenterExtension.id).toBe("clause-segmenter");
    expect(ClauseSegmenterExtension.name).toBe("Clause Segmenter");
    expect(ClauseSegmenterExtension.description).toContain("clause");
  });

  it("should segment sentence with subordinate clause", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I think that you are right",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "think" },
            { text: "that" },
            { text: "you" },
            { text: "are" },
            { text: "right" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const clauses = getAllClauses(result.document);
    expect(clauses.length).toBeGreaterThanOrEqual(1);

    // Check clause types
    const clauseTypes = clauses.map((c) => c.clauseType);
    expect(clauseTypes).toContain("main");

    // If properly segmented, should have subordinate or relative clause
    // ("that" can function as either subordinating conjunction or relative pronoun)
    if (clauses.length > 1) {
      const hasSubordinateOrRelative =
        clauseTypes.includes("subordinate") || clauseTypes.includes("relative");
      expect(hasSubordinateOrRelative).toBe(true);
    }
  });

  it("should segment sentence with adverbial clause", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "When it rains I stay home",
          lang: "en-US",
          words: [
            { text: "When" },
            { text: "it" },
            { text: "rains" },
            { text: "I" },
            { text: "stay" },
            { text: "home" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const clauses = getAllClauses(result.document);
    expect(clauses.length).toBeGreaterThanOrEqual(1);

    // Should have adverbial clause
    const clauseTypes = clauses.map((c) => c.clauseType);
    expect(clauseTypes).toContain("adverbial");
  });

  it("should handle compound sentence with coordinator", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I like coffee but she prefers tea",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "like" },
            { text: "coffee" },
            { text: "but" },
            { text: "she" },
            { text: "prefers" },
            { text: "tea" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const clauses = getAllClauses(result.document);
    expect(clauses.length).toBeGreaterThanOrEqual(2);

    // Both should be main clauses
    const mainClauses = clauses.filter((c) => c.clauseType === "main");
    expect(mainClauses.length).toBe(2);
  });

  it("should detect relative clause", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "The person who called was friendly",
          lang: "en-US",
          words: [
            { text: "The" },
            { text: "person" },
            { text: "who" },
            { text: "called" },
            { text: "was" },
            { text: "friendly" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const clauses = getAllClauses(result.document);

    // Should have relative clause
    const relativeClauses = clauses.filter((c) => c.clauseType === "relative");
    expect(relativeClauses.length).toBeGreaterThanOrEqual(1);
  });

  it("should include conjunctions when option is true", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I think that you are right",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "think" },
            { text: "that" },
            { text: "you" },
            { text: "are" },
            { text: "right" },
          ],
        },
      ],
    });

    const extension = createClauseSegmenterExtension({
      includeConjunctions: true,
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const clauses = getAllClauses(result.document);
    const subordinateClause = clauses.find((c) => c.clauseType === "subordinate");

    if (subordinateClause) {
      // "that" should be included in the subordinate clause
      const words = subordinateClause.children.filter(
        (c) => c.type === "WordNode"
      );
      const wordTexts = words.map((w: any) =>
        w.children?.[0]?.value?.toLowerCase()
      );
      expect(wordTexts).toContain("that");
    }
  });

  it("should work with Thai sentences", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "ผมคิดว่าคุณถูก",
          lang: "th-TH",
          words: [
            { text: "ผม" },
            { text: "คิด" },
            { text: "ที่" }, // Thai subordinator
            { text: "คุณ" },
            { text: "ถูก" },
          ],
        },
      ],
    });

    const extension = createClauseSegmenterExtension({
      language: "th-TH",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const clauses = getAllClauses(result.document);
    expect(clauses.length).toBeGreaterThanOrEqual(1);
  });

  it("should add clauseCount to sentence extras", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "I think that you are right",
          lang: "en-US",
          words: [
            { text: "I" },
            { text: "think" },
            { text: "that" },
            { text: "you" },
            { text: "are" },
            { text: "right" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const sentences = getAllSentences(result.document);
    const sentence = sentences[0] as GLOSTSentence;

    expect(sentence.extras?.clauseCount).toBeDefined();
    expect(sentence.extras?.clauseCount).toBeGreaterThan(0);
  });

  it("should detect interrogative mood for questions", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "Do you understand?",
          lang: "en-US",
          words: [
            { text: "Do" },
            { text: "you" },
            { text: "understand" },
          ],
          punctuation: [{ text: "?" }],
        },
      ],
    });

    const extension = createClauseSegmenterExtension({
      detectMood: true,
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const sentences = getAllSentences(result.document);
    const sentence = sentences[0] as GLOSTSentence;

    expect(sentence.extras?.mood).toBe("interrogative");
  });

  it("should not modify sentences without clause boundaries", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "Hello world",
          lang: "en-US",
          words: [{ text: "Hello" }, { text: "world" }],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const clauses = getAllClauses(result.document);

    // Simple sentence might still have one main clause
    if (clauses.length > 0) {
      expect(clauses[0]?.clauseType).toBe("main");
    }
  });

  it("should handle conditional sentences", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "If it rains I will stay home",
          lang: "en-US",
          words: [
            { text: "If" },
            { text: "it" },
            { text: "rains" },
            { text: "I" },
            { text: "will" },
            { text: "stay" },
            { text: "home" },
          ],
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [ClauseSegmenterExtension]);

    const sentences = getAllSentences(result.document);
    const sentence = sentences[0] as GLOSTSentence;

    // Should detect conditional mood
    expect(sentence.extras?.mood).toBe("conditional");

    // Should have adverbial clause for "if" clause
    const clauses = getAllClauses(result.document);
    const adverbialClauses = clauses.filter((c) => c.clauseType === "adverbial");
    expect(adverbialClauses.length).toBeGreaterThanOrEqual(1);
  });
});
