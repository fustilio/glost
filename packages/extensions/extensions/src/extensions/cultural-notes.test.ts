import { describe, it, expect } from "vitest";
import {
  CulturalNotesExtension,
  createCulturalNotesExtension,
} from "./cultural-notes";
import { processGLOSTWithExtensions } from "../processor.js";
import { createMockGLOSTDocument, createMockGLOSTWord } from "../test-utils.js";

describe("CulturalNotesExtension", () => {
  describe("enhanceMetadata", () => {
    it("should enhance metadata with cultural notes from extras.metadata", () => {
      const word = createMockGLOSTWord("hello", {
        extras: {
          metadata: {
            culturalNotes: "Used in formal contexts.",
          },
        },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [CulturalNotesExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.culturalNotes).toBeDefined();
        expect(processedWord.extras?.culturalNotes?.notes).toBe("Used in formal contexts.");
        expect(processedWord.extras?.culturalNotes?.hasNotes).toBe(true);
      }
    });

    it("should format cultural notes with line breaks", () => {
      const word = createMockGLOSTWord("hello", {
        extras: {
          metadata: {
            culturalNotes: "First sentence. Second sentence.",
          },
        },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [CulturalNotesExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.culturalNotes?.formatted).toContain("\n\n");
      }
    });

    it("should generate preview when maxPreviewLength specified", () => {
      const extension = createCulturalNotesExtension({
        maxPreviewLength: 20,
      });

      const word = createMockGLOSTWord("hello", {
        extras: {
          metadata: {
            culturalNotes: "This is a very long cultural note that should be truncated.",
          },
        },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.culturalNotes?.preview).toBeDefined();
        expect(processedWord.extras?.culturalNotes?.preview?.length).toBeLessThanOrEqual(23); // 20 + "..."
      }
    });

    it("should handle missing cultural notes", () => {
      const word = createMockGLOSTWord("hello");
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [CulturalNotesExtension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.culturalNotes).toBeUndefined();
      }
    });

    it("should not format when format is false", () => {
      const extension = createCulturalNotesExtension({
        format: false,
      });

      const word = createMockGLOSTWord("hello", {
        extras: {
          metadata: {
            culturalNotes: "First. Second.",
          },
        },
      });
      const document = createMockGLOSTDocument([word]);

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.culturalNotes?.formatted).toBe("First. Second.");
      }
    });
  });
});

