import { describe, it, expect } from "vitest";
import {
  FrequencyExtension,
  createFrequencyExtension,
  type FrequencyLevel,
} from "./frequency";
import { processGLOSTWithExtensions } from "../processor";
import { createMockGLOSTDocument, createMockGLOSTWord } from "../test-utils";

describe("FrequencyExtension", () => {
  describe("enhanceMetadata", () => {
    it("should enhance metadata with valid frequency from extras.metadata", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { frequency: "common" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency).toBeDefined();
        expect(processedWord.extras?.frequency?.level).toBe("common");
        expect(processedWord.extras?.frequency?.display).toBe("Common");
      }
    });

    it("should enhance metadata with valid frequency from extras.frequency", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { frequency: "rare" },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency?.level).toBe("rare");
      }
    });

    it("should normalize frequency strings", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { frequency: "very common" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency?.level).toBe("very-common");
      }
    });

    it("should handle all frequency levels", () => {
      const levels: FrequencyLevel[] = ["rare", "uncommon", "common", "very-common"];

      for (const level of levels) {
        const word = createMockGLOSTWord("hello", {
          extras: { metadata: { frequency: level } },
        });
        const document = createMockGLOSTDocument([word]);

        const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
        const words = result.document.children[0]?.children[0]?.children || [];
        const processedWord = words[0];

        if (processedWord && processedWord.type === "WordNode") {
          expect(processedWord.extras?.frequency?.level).toBe(level);
        }
      }
    });

    it("should handle missing frequency data", () => {
      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency).toBeUndefined();
      }
    });

    it("should handle invalid frequency values", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { frequency: "invalid" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency).toBeUndefined();
      }
    });

    it("should use custom mapping when provided", () => {
      const extension = createFrequencyExtension({
        customMapping: {
          "hello": "very-common",
        },
      });

      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency?.level).toBe("very-common");
      }
    });

    it("should not normalize when normalize is false", () => {
      const extension = createFrequencyExtension({ normalize: false });

      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { frequency: "common" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency?.level).toBe("common");
      }
    });
  });
});

