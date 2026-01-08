import { describe, it, expect } from "vitest";
import {
  PartOfSpeechExtension,
  createPartOfSpeechExtension,
} from "./part-of-speech";
import { processGLOSTWithExtensions } from "../processor";
import { createMockGLOSTDocument, createMockGLOSTWord } from "../test-utils";

describe("PartOfSpeechExtension", () => {
  describe("enhanceMetadata", () => {
    it("should enhance metadata with valid POS from metadata.partOfSpeech", () => {
      const word = createMockGLOSTWord("hello", {
        metadata: { partOfSpeech: "noun" },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [PartOfSpeechExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.partOfSpeech).toBeDefined();
        expect(processedWord.extras?.partOfSpeech?.tag).toBe("noun");
        expect(processedWord.extras?.partOfSpeech?.category).toBe("Noun");
        expect(processedWord.extras?.partOfSpeech?.abbreviation).toBe("N");
      }
    });

    it("should enhance metadata with valid POS from extras.metadata", () => {
      const word = createMockGLOSTWord("hello", {
        extras: { metadata: { partOfSpeech: "verb" } },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [PartOfSpeechExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.partOfSpeech?.category).toBe("Verb");
        expect(processedWord.extras?.partOfSpeech?.abbreviation).toBe("V");
      }
    });

    it("should normalize POS tags", () => {
      const word = createMockGLOSTWord("hello", {
        metadata: { partOfSpeech: "NOUN" },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [PartOfSpeechExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.partOfSpeech?.tag).toBe("noun");
      }
    });

    it("should handle various POS categories", () => {
      const categories = ["noun", "verb", "adjective", "adverb"];

      for (const category of categories) {
        const word = createMockGLOSTWord("hello", {
          metadata: { partOfSpeech: category },
        });
        const document = createMockGLOSTDocument([word]);

        const result = processGLOSTWithExtensions(document, [PartOfSpeechExtension]);
        const words = result.document.children[0]?.children[0]?.children || [];
        const processedWord = words[0];

        if (processedWord && processedWord.type === "WordNode") {
          expect(processedWord.extras?.partOfSpeech).toBeDefined();
        }
      }
    });

    it("should handle missing POS data", () => {
      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [PartOfSpeechExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.partOfSpeech).toBeUndefined();
      }
    });

    it("should use custom mappings when provided", () => {
      const extension = createPartOfSpeechExtension({
        customMappings: {
          "custom": { category: "Custom", abbreviation: "C" },
        },
      });

      const word = createMockGLOSTWord("hello", {
        metadata: { partOfSpeech: "custom" },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.partOfSpeech?.category).toBe("Custom");
        expect(processedWord.extras?.partOfSpeech?.abbreviation).toBe("C");
      }
    });
  });
});

