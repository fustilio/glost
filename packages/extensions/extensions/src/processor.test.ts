import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { processGLOSTWithExtensions, processGLOSTWithExtensionIds } from "./processor";
import { extensionRegistry, registerExtension } from "./registry";
import { createMockGLOSTDocument, createMockExtension } from "./test-utils";

describe("Extension Processor", () => {
  beforeEach(() => {
    extensionRegistry.clear();
  });

  afterEach(() => {
    extensionRegistry.clear();
  });

  describe("processGLOSTWithExtensions", () => {
    it("should process document with single extension", () => {
      const document = createMockGLOSTDocument(["hello", "world"]);
      const extension = createMockExtension("test-1", {
        enhanceMetadata: (node) => ({ processed: true }),
      });

      const result = processGLOSTWithExtensions(document, [extension]);

      expect(result.metadata.appliedExtensions).toContain("test-1");
      expect(result.metadata.skippedExtensions).toHaveLength(0);
      expect(result.metadata.errors).toHaveLength(0);
    });

    it("should process document with multiple extensions", () => {
      const document = createMockGLOSTDocument(["hello", "world"]);
      const ext1 = createMockExtension("test-1", {
        enhanceMetadata: (node) => ({ field1: "value1" }),
      });
      const ext2 = createMockExtension("test-2", {
        enhanceMetadata: (node) => ({ field2: "value2" }),
      });

      const result = processGLOSTWithExtensions(document, [ext1, ext2]);

      expect(result.metadata.appliedExtensions).toContain("test-1");
      expect(result.metadata.appliedExtensions).toContain("test-2");
      expect(result.metadata.appliedExtensions).toHaveLength(2);
    });

    it("should process extensions in dependency order", () => {
      const document = createMockGLOSTDocument(["hello"]);
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

      processGLOSTWithExtensions(document, [extB, extA]);

      expect(order).toEqual(["a", "b"]);
    });

    it("should apply transform function", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const extension = createMockExtension("test-1", {
        transform: (tree) => {
          return {
            ...tree,
            metadata: { ...tree.metadata, transformed: true },
          };
        },
      });

      const result = processGLOSTWithExtensions(document, [extension]);

      expect(result.document.metadata?.transformed).toBe(true);
    });

    it("should apply visit functions", () => {
      const document = createMockGLOSTDocument(["hello", "world"]);
      let visitedCount = 0;

      const extension = createMockExtension("test-1", {
        visit: {
          word: (node) => {
            visitedCount++;
            node.extras = { ...node.extras, visited: true };
          },
        },
      });

      processGLOSTWithExtensions(document, [extension]);

      expect(visitedCount).toBe(2); // Two words
    });

    it("should apply metadata enhancement", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const extension = createMockExtension("test-1", {
        enhanceMetadata: (node) => ({ enhanced: true }),
      });

      const result = processGLOSTWithExtensions(document, [extension]);
      const words = result.document.children[0]?.children[0]?.children || [];
      const word = words[0];

      if (word && word.type === "WordNode") {
        expect(word.extras?.enhanced).toBe(true);
      }
    });

    it("should handle extension errors gracefully", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const extension = createMockExtension("test-1", {
        enhanceMetadata: () => {
          throw new Error("Test error");
        },
      });

      // Use lenient mode for graceful error handling
      const result = processGLOSTWithExtensions(document, [extension], {
        lenient: true,
      });

      expect(result.metadata.appliedExtensions).not.toContain("test-1");
      expect(result.metadata.skippedExtensions).toContain("test-1");
      expect(result.metadata.errors).toHaveLength(1);
      expect(result.metadata.errors[0]?.extensionId).toBe("test-1");
    });

    it("should continue processing after error", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const ext1 = createMockExtension("test-1", {
        enhanceMetadata: () => {
          throw new Error("Error");
        },
      });
      const ext2 = createMockExtension("test-2", {
        enhanceMetadata: () => ({ success: true }),
      });

      // Use lenient mode to continue after errors
      const result = processGLOSTWithExtensions(document, [ext1, ext2], {
        lenient: true,
      });

      expect(result.metadata.skippedExtensions).toContain("test-1");
      expect(result.metadata.appliedExtensions).toContain("test-2");
    });

    it("should clean up temporarily registered extensions", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const extension = createMockExtension("temp-extension");

      processGLOSTWithExtensions(document, [extension]);

      // Extension should not be in registry after processing
      expect(extensionRegistry.has("temp-extension")).toBe(false);
    });
  });

  describe("processGLOSTWithExtensionIds", () => {
    it("should process with registered extension IDs", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const extension = createMockExtension("test-1", {
        enhanceMetadata: () => ({ processed: true }),
      });

      registerExtension(extension);
      const result = processGLOSTWithExtensionIds(document, ["test-1"]);

      expect(result.metadata.appliedExtensions).toContain("test-1");
    });

    it("should throw error for missing extension", () => {
      const document = createMockGLOSTDocument(["hello"]);

      expect(() => {
        processGLOSTWithExtensionIds(document, ["non-existent"]);
      }).toThrow("Extensions not found");
    });

    it("should process multiple extensions by ID", () => {
      const document = createMockGLOSTDocument(["hello"]);
      const ext1 = createMockExtension("test-1");
      const ext2 = createMockExtension("test-2");

      registerExtension(ext1);
      registerExtension(ext2);

      const result = processGLOSTWithExtensionIds(document, ["test-1", "test-2"]);

      expect(result.metadata.appliedExtensions).toContain("test-1");
      expect(result.metadata.appliedExtensions).toContain("test-2");
    });
  });
});

