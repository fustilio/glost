import { describe, it, expect } from "vitest";
import {
  DifficultyExtension,
  createDifficultyExtension,
  type DifficultyLevel,
} from "./difficulty";
import { processGLOSTWithExtensions } from "../processor";
import { createMockGLOSTDocument, createMockGLOSTWord } from "../test-utils";

describe("DifficultyExtension", () => {
  describe("enhanceMetadata", () => {
    it("should enhance metadata with valid difficulty from node.difficulty", () => {
      const word = createMockGLOSTWord("hello", {
        difficulty: "intermediate",
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [DifficultyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.difficulty).toBeDefined();
        expect(processedWord.extras?.difficulty?.level).toBe("intermediate");
        expect(processedWord.extras?.difficulty?.display).toBe("Intermediate");
      }
    });

    it("should enhance metadata with valid difficulty from extras.metadata", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { difficulty: "beginner" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [DifficultyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.difficulty?.level).toBe("beginner");
      }
    });

    it("should normalize difficulty strings", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { difficulty: "easy" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [DifficultyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.difficulty?.level).toBe("beginner");
      }
    });

    it("should handle all difficulty levels", () => {
      const levels: DifficultyLevel[] = ["beginner", "intermediate", "advanced"];

      for (const level of levels) {
        const word = createMockGLOSTWord("hello", {
          difficulty: level,
        });
        const document = createMockGLOSTDocument([word]);

        const result = processGLOSTWithExtensions(document, [DifficultyExtension]);
        const words = result.document.children[0]?.children[0]?.children || [];
        const processedWord = words[0];

        if (processedWord && processedWord.type === "WordNode") {
          expect(processedWord.extras?.difficulty?.level).toBe(level);
        }
      }
    });

    it("should handle missing difficulty data", () => {
      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [DifficultyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.difficulty).toBeUndefined();
      }
    });

    it("should handle invalid difficulty values", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { difficulty: "invalid" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [DifficultyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.difficulty).toBeUndefined();
      }
    });

    it("should use custom mapping when provided", () => {
      const extension = createDifficultyExtension({
        customMapping: {
          "hello": "advanced",
        },
      });

      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.difficulty?.level).toBe("advanced");
      }
    });
  });
});

