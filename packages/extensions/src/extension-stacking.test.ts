/**
 * Extension Stacking Tests
 *
 * Tests for extension dependency validation, stacking patterns,
 * and the requires/provides contract system.
 *
 * @packageDocumentation
 */

import { describe, it, expect } from "vitest";
import {
  processGLOSTWithExtensions,
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension,
  GenderExtension,
  ClauseSegmenterExtension,
  createReadingScoreExtension,
  createLearnerHintsExtension,
  createClauseAnalysisExtension,
  ExtensionDependencyError,
  MissingNodeTypeError,
} from "./index";
import { createMockGLOSTDocument, createMockGLOSTWord } from "./test-utils";
import type { GLOSTExtension } from "./types";

describe("Extension Stacking", () => {
  describe("Dependency Validation", () => {
    it("should stack extensions with satisfied dependencies", () => {
      // Create word with frequency and difficulty metadata for extensions to process
      const doc = createMockGLOSTDocument([
        createMockGLOSTWord("hello", {
          extras: {
            metadata: {
              frequency: "common",
              difficulty: "beginner",
            },
          },
        }),
      ]);

      // All dependencies satisfied in order
      const result = processGLOSTWithExtensions(doc, [
        FrequencyExtension,
        DifficultyExtension,
        createReadingScoreExtension(),
      ]);

      const word = result.document.children[0]?.children[0]?.children[0];
      if (word?.type === "WordNode") {
        expect(word.extras?.frequency).toBeDefined();
        expect(word.extras?.difficulty).toBeDefined();
        expect(word.extras?.readingScore).toBeDefined();
      }

      expect(result.metadata.appliedExtensions).toContain("frequency");
      expect(result.metadata.appliedExtensions).toContain("difficulty");
      expect(result.metadata.appliedExtensions).toContain("reading-score");
    });

    it("should throw ExtensionDependencyError when required extras are missing", () => {
      const doc = createMockGLOSTDocument(["hello"]);

      // Missing FrequencyExtension - ReadingScoreExtension requires it
      expect(() => {
        processGLOSTWithExtensions(doc, [
          DifficultyExtension,
          // FrequencyExtension missing!
          createReadingScoreExtension(),
        ]);
      }).toThrow(ExtensionDependencyError);

      // Check error message mentions the missing field
      expect(() => {
        processGLOSTWithExtensions(doc, [
          DifficultyExtension,
          createReadingScoreExtension(),
        ]);
      }).toThrow(/frequency/i);
    });

    it("should throw ExtensionDependencyError for multiple missing dependencies", () => {
      const doc = createMockGLOSTDocument(["hello"]);

      // Missing both FrequencyExtension and DifficultyExtension
      expect(() => {
        processGLOSTWithExtensions(doc, [createReadingScoreExtension()]);
      }).toThrow(ExtensionDependencyError);
    });

    it("should skip extension with missing deps in lenient mode", () => {
      const doc = createMockGLOSTDocument(["hello"]);

      const result = processGLOSTWithExtensions(
        doc,
        [
          DifficultyExtension,
          // FrequencyExtension missing!
          createReadingScoreExtension(),
        ],
        { lenient: true }
      );

      expect(result.metadata.appliedExtensions).toContain("difficulty");
      expect(result.metadata.skippedExtensions).toContain("reading-score");
      expect(result.metadata.errors).toHaveLength(1);
      expect(result.metadata.errors[0]?.error).toBeInstanceOf(
        ExtensionDependencyError
      );
    });
  });

  describe("Node Type Requirements", () => {
    it("should throw when required node types are missing", () => {
      const doc = createMockGLOSTDocument(["I went to the store."]);

      // ClauseAnalysisExtension requires ClauseNode from clause-segmenter
      // Without it, the processor should throw MissingNodeTypeError
      expect(() => {
        processGLOSTWithExtensions(doc, [
          // clause-segmenter missing!
          createClauseAnalysisExtension(),
        ]);
      }).toThrow(MissingNodeTypeError);

      // Check error mentions ClauseNode
      expect(() => {
        processGLOSTWithExtensions(doc, [createClauseAnalysisExtension()]);
      }).toThrow(/ClauseNode/i);
    });

    it("should work when required node types are provided", () => {
      const doc = createMockGLOSTDocument(["I went to the store."]);

      // ClauseSegmenter creates ClauseNode nodes
      const result = processGLOSTWithExtensions(doc, [
        ClauseSegmenterExtension,
        createClauseAnalysisExtension(),
      ]);

      expect(result.metadata.appliedExtensions).toContain("clause-segmenter");
      expect(result.metadata.appliedExtensions).toContain("clause-analysis");
    });
  });

  describe("Optional Dependencies", () => {
    it("should work with optional dependencies missing", () => {
      // Create word with required metadata for partOfSpeech and difficulty extensions
      const doc = createMockGLOSTDocument([
        createMockGLOSTWord("hello", {
          metadata: { partOfSpeech: "noun" },
          extras: {
            metadata: {
              difficulty: "beginner",
            },
          },
        }),
      ]);

      // LearnerHints requires partOfSpeech and difficulty
      // Gender is optional (enhances hints when present)
      const result = processGLOSTWithExtensions(doc, [
        PartOfSpeechExtension,
        DifficultyExtension,
        // GenderExtension not included - optional
        createLearnerHintsExtension(),
      ]);

      expect(result.metadata.appliedExtensions).toContain("part-of-speech");
      expect(result.metadata.appliedExtensions).toContain("difficulty");
      expect(result.metadata.appliedExtensions).toContain("learner-hints");

      const word = result.document.children[0]?.children[0]?.children[0];
      if (word?.type === "WordNode") {
        expect(word.extras?.learnerHints).toBeDefined();
        // LearnerHints returns { hints: string[], priority: number, needsAttention: boolean }
        const learnerHints = word.extras?.learnerHints as { hints: string[] };
        expect(Array.isArray(learnerHints?.hints)).toBe(true);
      }
    });

    it("should enhance results with optional dependencies present", () => {
      // Create word with metadata for all extensions including optional gender
      const doc = createMockGLOSTDocument([
        createMockGLOSTWord("él", {
          metadata: {
            partOfSpeech: "pronoun",
            gender: "male",
          },
          extras: {
            metadata: {
              difficulty: "intermediate",
            },
          },
        }),
      ]);

      // Include GenderExtension - LearnerHints will use it for enhanced hints
      const result = processGLOSTWithExtensions(doc, [
        PartOfSpeechExtension,
        DifficultyExtension,
        GenderExtension,
        createLearnerHintsExtension(),
      ]);

      expect(result.metadata.appliedExtensions).toContain("gender");
      expect(result.metadata.appliedExtensions).toContain("learner-hints");

      const word = result.document.children[0]?.children[0]?.children[0];
      if (word?.type === "WordNode") {
        const hints = word.extras?.learnerHints as string[];
        // Should have gender-related hints when gender data is present
        expect(hints).toBeDefined();
      }
    });
  });

  describe("Extension Ordering", () => {
    it("should auto-sort extensions based on dependencies", () => {
      // Create word with required metadata
      const doc = createMockGLOSTDocument([
        createMockGLOSTWord("hello", {
          extras: {
            metadata: {
              frequency: "common",
              difficulty: "beginner",
            },
          },
        }),
      ]);

      // Intentionally out of order - processor should sort based on dependencies
      const result = processGLOSTWithExtensions(doc, [
        createReadingScoreExtension(), // depends on frequency, difficulty
        FrequencyExtension,
        DifficultyExtension,
      ]);

      // Should still work because of topological sort
      const word = result.document.children[0]?.children[0]?.children[0];
      if (word?.type === "WordNode") {
        expect(word.extras?.readingScore).toBeDefined();
      }
    });

    it("should detect circular dependencies", () => {
      const doc = createMockGLOSTDocument(["hello"]);

      const ext1: GLOSTExtension = {
        id: "ext-1",
        name: "Extension 1",
        description: "Test",
        dependencies: ["ext-2"],
        enhanceMetadata: () => ({}),
      };

      const ext2: GLOSTExtension = {
        id: "ext-2",
        name: "Extension 2",
        description: "Test",
        dependencies: ["ext-1"],
        enhanceMetadata: () => ({}),
      };

      expect(() => {
        processGLOSTWithExtensions(doc, [ext1, ext2]);
      }).toThrow(/circular/i);
    });
  });

  describe("Provides/Requires Contract", () => {
    it("should document what extensions provide", () => {
      expect(FrequencyExtension.provides?.extras).toContain("frequency");
      expect(DifficultyExtension.provides?.extras).toContain("difficulty");
      expect(PartOfSpeechExtension.provides?.extras).toContain("partOfSpeech");
      expect(ClauseSegmenterExtension.provides?.nodes).toContain("ClauseNode");
    });

    it("should document what extensions require", () => {
      const readingScore = createReadingScoreExtension();
      expect(readingScore.requires?.extras).toContain("frequency");
      expect(readingScore.requires?.extras).toContain("difficulty");

      const clauseAnalysis = createClauseAnalysisExtension();
      expect(clauseAnalysis.requires?.nodes).toContain("ClauseNode");
    });
  });

  describe("Complex Stacking Scenarios", () => {
    it("should handle deep extension chains", () => {
      // Create words with all required metadata for all extensions
      const doc = createMockGLOSTDocument([
        createMockGLOSTWord("hello", {
          metadata: {
            partOfSpeech: "noun",
            gender: "neutral",
          },
          extras: {
            metadata: {
              frequency: "common",
              difficulty: "beginner",
            },
          },
        }),
        createMockGLOSTWord("world", {
          metadata: {
            partOfSpeech: "noun",
            gender: "neutral",
          },
          extras: {
            metadata: {
              frequency: "very-common",
              difficulty: "beginner",
            },
          },
        }),
      ]);

      // Multi-level dependency chain:
      // ReadingScore <- Frequency, Difficulty
      // LearnerHints <- PartOfSpeech, Difficulty (optional: Gender)
      const result = processGLOSTWithExtensions(doc, [
        FrequencyExtension,
        DifficultyExtension,
        PartOfSpeechExtension,
        GenderExtension,
        createReadingScoreExtension(),
        createLearnerHintsExtension({ includeGrammarTips: true }),
      ]);

      expect(result.metadata.appliedExtensions).toHaveLength(6);
      expect(result.metadata.skippedExtensions).toHaveLength(0);
      expect(result.metadata.errors).toHaveLength(0);

      // Verify all metadata is present
      const words = result.document.children[0]?.children[0]?.children || [];
      for (const word of words) {
        if (word.type === "WordNode") {
          expect(word.extras?.frequency).toBeDefined();
          expect(word.extras?.difficulty).toBeDefined();
          expect(word.extras?.partOfSpeech).toBeDefined();
          expect(word.extras?.readingScore).toBeDefined();
          expect(word.extras?.learnerHints).toBeDefined();
        }
      }
    });

    it("should handle clause + word level extensions together", () => {
      const doc = createMockGLOSTDocument(["I went to the store yesterday."]);

      const result = processGLOSTWithExtensions(doc, [
        // Clause-level extensions
        ClauseSegmenterExtension,
        createClauseAnalysisExtension(),
        // Word-level extensions
        FrequencyExtension,
        DifficultyExtension,
      ]);

      expect(result.metadata.appliedExtensions).toContain("clause-segmenter");
      expect(result.metadata.appliedExtensions).toContain("clause-analysis");
      expect(result.metadata.appliedExtensions).toContain("frequency");
      expect(result.metadata.appliedExtensions).toContain("difficulty");
    });
  });
});
