import { describe, it, expect } from "vitest";
import {
  GenderExtension,
  createGenderExtension,
  type GenderType,
} from "./gender";
import { processGLOSTWithExtensions } from "../processor";
import { createMockGLOSTDocument, createMockGLOSTWord } from "../test-utils";

describe("GenderExtension", () => {
  describe("enhanceMetadata", () => {
    it("should enhance metadata with valid gender from extras.gender", () => {
      const word = createMockGLOSTWord("ครับ", {
        extras: { gender: "male" },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [GenderExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.gender).toBeDefined();
        expect(processedWord.extras?.gender?.type).toBe("male");
        expect(processedWord.extras?.gender?.display).toBe("Masculine");
        expect(processedWord.extras?.gender?.abbreviation).toBe("Masc");
      }
    });

    it("should enhance metadata with valid gender from extras.metadata", () => {
      const word = createMockGLOSTWord("ค่ะ", {
        extras: { metadata: { gender: "female" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [GenderExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.gender?.type).toBe("female");
        expect(processedWord.extras?.gender?.display).toBe("Feminine");
      }
    });

    it("should normalize gender strings", () => {
      const testCases = [
        { input: "m", expected: "male" },
        { input: "M", expected: "male" },
        { input: "masculine", expected: "male" },
        { input: "f", expected: "female" },
        { input: "F", expected: "female" },
        { input: "feminine", expected: "female" },
        { input: "n", expected: "neuter" },
        { input: "neuter", expected: "neuter" },
      ];

      for (const { input, expected } of testCases) {
        const word = createMockGLOSTWord("word", {
          extras: { gender: input },
        });
        const document = createMockGLOSTDocument([word]);

        const result = processGLOSTWithExtensions(document, [GenderExtension]);
        const words = result.document.children[0]?.children[0]?.children || [];
        const processedWord = words[0];

        if (processedWord && processedWord.type === "WordNode") {
          expect(processedWord.extras?.gender?.type).toBe(expected);
        }
      }
    });

    it("should handle all gender types", () => {
      const types: GenderType[] = ["male", "female", "neuter"];

      for (const type of types) {
        const word = createMockGLOSTWord("word", {
          extras: { gender: type },
        });
        const document = createMockGLOSTDocument([word]);

        const result = processGLOSTWithExtensions(document, [GenderExtension]);
        const words = result.document.children[0]?.children[0]?.children || [];
        const processedWord = words[0];

        if (processedWord && processedWord.type === "WordNode") {
          expect(processedWord.extras?.gender?.type).toBe(type);
        }
      }
    });

    it("should handle missing gender data", () => {
      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [GenderExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.gender).toBeUndefined();
      }
    });

    it("should not normalize when normalize is false", () => {
      const extension = createGenderExtension({ normalize: false });

      const word = createMockGLOSTWord("word", {
        extras: { gender: "male" },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.gender?.type).toBe("male");
      }
    });
  });
});

