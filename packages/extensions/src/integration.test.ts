import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { processGLOSTWithExtensions } from "./processor";
import { extensionRegistry } from "./registry";
import {
  FrequencyExtension,
  DifficultyExtension,
  GenderExtension,
  PartOfSpeechExtension,
} from "./extensions";
import { createMockGLOSTDocument, createMockGLOSTWord, createMockExtension } from "./test-utils";

describe("Extension Integration", () => {
  beforeEach(() => {
    extensionRegistry.clear();
  });

  afterEach(() => {
    extensionRegistry.clear();
  });

  it("should process document with multiple extensions together", () => {
    const word = createMockGLOSTWord("hello", {
      extras: {
        metadata: {
          frequency: "common",
          difficulty: "intermediate",
        },
      },
    });
    const document = createMockGLOSTDocument([word]);

    const result = processGLOSTWithExtensions(document, [
      FrequencyExtension,
      DifficultyExtension,
    ]);

    expect(result.metadata.appliedExtensions).toContain("frequency");
    expect(result.metadata.appliedExtensions).toContain("difficulty");

    const words = result.document.children[0]?.children[0]?.children || [];
    const processedWord = words[0];

    if (processedWord && processedWord.type === "WordNode") {
      expect(processedWord.extras?.frequency).toBeDefined();
      expect(processedWord.extras?.difficulty).toBeDefined();
    }
  });

  it("should respect extension dependencies", () => {
    const order: string[] = [];

    const extA = createMockExtension("a", {
      enhanceMetadata: () => {
        order.push("a");
        return {};
      },
    });
    const extB = createMockExtension("b", {
      dependencies: ["a"],
      enhanceMetadata: () => {
        order.push("b");
        return {};
      },
    });
    const extC = createMockExtension("c", {
      dependencies: ["b"],
      enhanceMetadata: () => {
        order.push("c");
        return {};
      },
    });

    const document = createMockGLOSTDocument(["hello"]);
    processGLOSTWithExtensions(document, [extC, extA, extB]);

    expect(order).toEqual(["a", "b", "c"]);
  });

  it("should compose extensions correctly", () => {
    const word = createMockGLOSTWord("สวัสดี", {
      extras: {
        gender: "male",
        metadata: {
          frequency: "very-common",
          difficulty: "beginner",
          partOfSpeech: "interjection",
        },
      },
    });
    const document = createMockGLOSTDocument([word]);

    const result = processGLOSTWithExtensions(document, [
      FrequencyExtension,
      DifficultyExtension,
      GenderExtension,
      PartOfSpeechExtension,
    ]);

    const words = result.document.children[0]?.children[0]?.children || [];
    const processedWord = words[0];

    if (processedWord && processedWord.type === "WordNode") {
      expect(processedWord.extras?.frequency).toBeDefined();
      expect(processedWord.extras?.difficulty).toBeDefined();
      expect(processedWord.extras?.gender).toBeDefined();
      expect(processedWord.extras?.partOfSpeech).toBeDefined();
    }
  });

  it("should handle errors in extension chain gracefully", () => {
    const ext1 = createMockExtension("ext1", {
      enhanceMetadata: () => ({ field1: "value1" }),
    });
    const ext2 = createMockExtension("ext2", {
      enhanceMetadata: () => {
        throw new Error("Extension error");
      },
    });
    const ext3 = createMockExtension("ext3", {
      enhanceMetadata: () => ({ field3: "value3" }),
    });

    const document = createMockGLOSTDocument(["hello"]);
    const result = processGLOSTWithExtensions(document, [ext1, ext2, ext3]);

    expect(result.metadata.appliedExtensions).toContain("ext1");
    expect(result.metadata.appliedExtensions).toContain("ext3");
    expect(result.metadata.skippedExtensions).toContain("ext2");
    expect(result.metadata.errors).toHaveLength(1);
  });

  it("should work with real GLOST document structure", () => {
    const document = createMockGLOSTDocument([
      createMockGLOSTWord("Hello", {
        extras: { metadata: { frequency: "common" } },
      }),
      createMockGLOSTWord("world", {
        extras: { metadata: { frequency: "common" } },
      }),
    ]);

    const result = processGLOSTWithExtensions(document, [FrequencyExtension]);

    expect(result.metadata.appliedExtensions).toContain("frequency");

    const words = result.document.children[0]?.children[0]?.children || [];
    expect(words.length).toBe(2);

    for (const word of words) {
      if (word.type === "WordNode") {
        expect(word.extras?.frequency).toBeDefined();
      }
    }
  });

  it("should verify metadata enhancement across extensions", () => {
    const word = createMockGLOSTWord("test", {
      extras: {
        metadata: {
          frequency: "common",
          difficulty: "intermediate",
        },
      },
    });
    const document = createMockGLOSTDocument([word]);

    const result = processGLOSTWithExtensions(document, [
      FrequencyExtension,
      DifficultyExtension,
    ]);

    const words = result.document.children[0]?.children[0]?.children || [];
    const processedWord = words[0];

    if (processedWord && processedWord.type === "WordNode") {
      // Both extensions should have enhanced the metadata
      expect(processedWord.extras?.frequency?.level).toBe("common");
      expect(processedWord.extras?.difficulty?.level).toBe("intermediate");
    }
  });
});

