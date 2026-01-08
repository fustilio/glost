import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  extensionRegistry,
  registerExtension,
  registerExtensions,
  getExtension,
  getAllExtensions,
} from "./registry";
import { createMockExtension } from "./test-utils";

describe("ExtensionRegistry", () => {
  beforeEach(() => {
    extensionRegistry.clear();
  });

  afterEach(() => {
    extensionRegistry.clear();
  });

  describe("register", () => {
    it("should register a single extension", () => {
      const ext = createMockExtension("test-1");
      extensionRegistry.register(ext);

      expect(extensionRegistry.has("test-1")).toBe(true);
      expect(extensionRegistry.get("test-1")).toBe(ext);
    });

    it("should overwrite existing extension with same ID", () => {
      const ext1 = createMockExtension("test-1", { name: "First" });
      const ext2 = createMockExtension("test-1", { name: "Second" });

      extensionRegistry.register(ext1);
      extensionRegistry.register(ext2);

      const registered = extensionRegistry.get("test-1");
      expect(registered?.name).toBe("Second");
    });

    it("should register multiple extensions", () => {
      const ext1 = createMockExtension("test-1");
      const ext2 = createMockExtension("test-2");
      const ext3 = createMockExtension("test-3");

      extensionRegistry.registerAll([ext1, ext2, ext3]);

      expect(extensionRegistry.has("test-1")).toBe(true);
      expect(extensionRegistry.has("test-2")).toBe(true);
      expect(extensionRegistry.has("test-3")).toBe(true);
    });
  });

  describe("get", () => {
    it("should get extension by ID", () => {
      const ext = createMockExtension("test-1");
      extensionRegistry.register(ext);

      const retrieved = extensionRegistry.get("test-1");
      expect(retrieved).toBe(ext);
    });

    it("should return undefined for non-existent extension", () => {
      const retrieved = extensionRegistry.get("non-existent");
      expect(retrieved).toBeUndefined();
    });
  });

  describe("getAll", () => {
    it("should return all registered extensions", () => {
      const ext1 = createMockExtension("test-1");
      const ext2 = createMockExtension("test-2");
      const ext3 = createMockExtension("test-3");

      extensionRegistry.registerAll([ext1, ext2, ext3]);

      const all = extensionRegistry.getAll();
      expect(all).toHaveLength(3);
      expect(all.map((e) => e.id)).toContain("test-1");
      expect(all.map((e) => e.id)).toContain("test-2");
      expect(all.map((e) => e.id)).toContain("test-3");
    });

    it("should return empty array when no extensions registered", () => {
      const all = extensionRegistry.getAll();
      expect(all).toHaveLength(0);
    });
  });

  describe("has", () => {
    it("should return true for registered extension", () => {
      const ext = createMockExtension("test-1");
      extensionRegistry.register(ext);

      expect(extensionRegistry.has("test-1")).toBe(true);
    });

    it("should return false for non-registered extension", () => {
      expect(extensionRegistry.has("non-existent")).toBe(false);
    });
  });

  describe("unregister", () => {
    it("should remove extension", () => {
      const ext = createMockExtension("test-1");
      extensionRegistry.register(ext);

      const removed = extensionRegistry.unregister("test-1");
      expect(removed).toBe(true);
      expect(extensionRegistry.has("test-1")).toBe(false);
    });

    it("should return false when removing non-existent extension", () => {
      const removed = extensionRegistry.unregister("non-existent");
      expect(removed).toBe(false);
    });
  });

  describe("clear", () => {
    it("should remove all extensions", () => {
      const ext1 = createMockExtension("test-1");
      const ext2 = createMockExtension("test-2");
      extensionRegistry.registerAll([ext1, ext2]);

      extensionRegistry.clear();

      expect(extensionRegistry.getAll()).toHaveLength(0);
      expect(extensionRegistry.has("test-1")).toBe(false);
      expect(extensionRegistry.has("test-2")).toBe(false);
    });
  });

  describe("resolveDependencies", () => {
    it("should resolve simple dependencies", () => {
      const extA = createMockExtension("a");
      const extB = createMockExtension("b", { dependencies: ["a"] });

      extensionRegistry.registerAll([extA, extB]);

      const ordered = extensionRegistry.resolveDependencies(["b", "a"]);
      expect(ordered).toEqual(["a", "b"]);
    });

    it("should resolve complex dependencies", () => {
      const extA = createMockExtension("a");
      const extB = createMockExtension("b", { dependencies: ["a"] });
      const extC = createMockExtension("c", { dependencies: ["b"] });

      extensionRegistry.registerAll([extA, extB, extC]);

      const ordered = extensionRegistry.resolveDependencies(["c", "b", "a"]);
      expect(ordered).toEqual(["a", "b", "c"]);
    });

    it("should detect circular dependencies", () => {
      const extA = createMockExtension("a", { dependencies: ["b"] });
      const extB = createMockExtension("b", { dependencies: ["a"] });

      extensionRegistry.registerAll([extA, extB]);

      expect(() => {
        extensionRegistry.resolveDependencies(["a", "b"]);
      }).toThrow("Circular dependency");
    });

    it("should throw error for missing extension", () => {
      expect(() => {
        extensionRegistry.resolveDependencies(["non-existent"]);
      }).toThrow("Extension \"non-existent\" not found");
    });

    it("should skip dependencies not in the list", () => {
      const extA = createMockExtension("a");
      const extB = createMockExtension("b", { dependencies: ["a", "c"] });
      const extC = createMockExtension("c");

      extensionRegistry.registerAll([extA, extB, extC]);

      // Only resolve b, but b depends on a (in list) and c (not in list)
      const ordered = extensionRegistry.resolveDependencies(["b"]);
      // Should only include b, since c is not in the list
      expect(ordered).toEqual(["b"]);
    });
  });

  describe("convenience functions", () => {
    it("should register extension via registerExtension", () => {
      const ext = createMockExtension("test-1");
      registerExtension(ext);

      expect(getExtension("test-1")).toBe(ext);
    });

    it("should register multiple extensions via registerExtensions", () => {
      const ext1 = createMockExtension("test-1");
      const ext2 = createMockExtension("test-2");
      registerExtensions([ext1, ext2]);

      expect(getExtension("test-1")).toBe(ext1);
      expect(getExtension("test-2")).toBe(ext2);
    });

    it("should get all extensions via getAllExtensions", () => {
      const ext1 = createMockExtension("test-1");
      const ext2 = createMockExtension("test-2");
      registerExtensions([ext1, ext2]);

      const all = getAllExtensions();
      expect(all).toHaveLength(2);
    });
  });
});

