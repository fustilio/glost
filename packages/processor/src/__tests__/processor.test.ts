/**
 * GLOST Processor Tests
 *
 * Comprehensive test suite for the unified-style GLOST processor.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { glost, GLOSTProcessor } from "../index.js";
import type {
  Plugin,
  PluginSpec,
  Preset,
  ProcessorOptions,
  BeforeHook,
  AfterHook,
  ErrorHook,
  SkipHook,
  ProgressHook,
} from "../types.js";
import type { GLOSTRoot, GLOSTExtension } from "glost-extensions";

// Mock GLOST document for testing
const createMockDocument = (): GLOSTRoot => ({
  type: "RootNode",
  lang: "en",
  children: [
    {
      type: "ParagraphNode",
      children: [
        {
          type: "SentenceNode",
          children: [
            {
              type: "WordNode",
              text: "Hello",
              metadata: {},
              extras: {},
            },
            {
              type: "WordNode",
              text: "world",
              metadata: {},
              extras: {},
            },
          ],
          metadata: {},
          extras: {},
        },
      ],
      metadata: {},
      extras: {},
    },
  ],
  metadata: {},
  extras: {},
});

// Mock extensions for testing
const createMockExtension = (id: string, name: string): GLOSTExtension => ({
  id,
  name,
  description: `Mock ${name} extension`,
  transform: (tree) => tree,
});

const transcriptionExtension: GLOSTExtension = {
  id: "transcription",
  name: "Transcription",
  description: "Add transcription to words",
  visit: {
    word: (node) => {
      node.extras = {
        ...node.extras,
        transcription: `[${node.text.toLowerCase()}]`,
      };
    },
  },
};

const translationExtension: GLOSTExtension = {
  id: "translation",
  name: "Translation",
  description: "Add translation to words",
  visit: {
    word: (node) => {
      node.extras = {
        ...node.extras,
        translation: { en: node.text },
      };
    },
  },
};

const errorExtension: GLOSTExtension = {
  id: "error-plugin",
  name: "Error Plugin",
  description: "Always throws an error",
  transform: () => {
    throw new Error("Plugin error");
  },
};

describe("glost() factory function", () => {
  it("creates a new processor instance", () => {
    const processor = glost();
    expect(processor).toBeInstanceOf(GLOSTProcessor);
  });

  it("accepts initial options", () => {
    const processor = glost({ lenient: true, debug: true });
    expect(processor).toBeInstanceOf(GLOSTProcessor);
  });

  it("accepts data map in options", () => {
    const dataMap = new Map([["key", "value"]]);
    const processor = glost({ data: dataMap });
    expect(processor.data("key")).toBe("value");
  });
});

describe("GLOSTProcessor", () => {
  describe("constructor", () => {
    it("creates instance with default options", () => {
      const processor = new GLOSTProcessor();
      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("creates instance with custom options", () => {
      const options: ProcessorOptions = {
        lenient: true,
        conflictStrategy: "warn",
      };
      const processor = new GLOSTProcessor(options);
      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("initializes data store from options", () => {
      const dataMap = new Map([
        ["config", { theme: "dark" }],
        ["version", 1],
      ]);
      const processor = new GLOSTProcessor({ data: dataMap });
      expect(processor.data("config")).toEqual({ theme: "dark" });
      expect(processor.data("version")).toBe(1);
    });
  });

  describe("use() - plugin chaining", () => {
    it("allows chaining multiple plugins", () => {
      const processor = glost()
        .use(transcriptionExtension)
        .use(translationExtension);

      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("accepts extension objects", () => {
      const processor = glost().use(transcriptionExtension);
      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("accepts plugin functions", () => {
      const plugin: Plugin = (options) => ({
        id: "test-plugin",
        name: "Test Plugin",
        transform: (tree) => tree,
      });

      const processor = glost().use(plugin, { option: true });
      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("passes options to plugin functions", async () => {
      const pluginFn = vi.fn((options) => ({
        id: "test",
        name: "Test",
        transform: (tree: GLOSTRoot) => tree,
      }));

      const processor = glost().use(pluginFn, { custom: "option" });
      await processor.process(createMockDocument());

      expect(pluginFn).toHaveBeenCalledWith({ custom: "option" });
    });

    it("accepts presets", () => {
      const preset: Preset = {
        id: "test-preset",
        name: "Test Preset",
        plugins: [transcriptionExtension, translationExtension],
      };

      const processor = glost().use(preset);
      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("expands preset plugins with options", () => {
      const plugin1 = createMockExtension("plugin1", "Plugin 1");
      const plugin2 = createMockExtension("plugin2", "Plugin 2");

      const preset: Preset = {
        id: "test-preset",
        name: "Test Preset",
        plugins: [
          [plugin1, { opt1: true }],
          plugin2,
        ],
      };

      const processor = glost().use(preset);
      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("throws when adding plugins to frozen processor", () => {
      const processor = glost()
        .use(transcriptionExtension)
        .freeze();

      expect(() => {
        (processor as any).use(translationExtension);
      }).toThrow("Cannot modify frozen processor");
    });
  });

  describe("hooks - before()", () => {
    it("registers before hooks", () => {
      const hook = vi.fn();
      const processor = glost()
        .before("transcription", hook)
        .use(transcriptionExtension);

      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("executes before hooks in order", async () => {
      const calls: string[] = [];
      const hook1: BeforeHook = () => {
        calls.push("before1");
      };
      const hook2: BeforeHook = () => {
        calls.push("before2");
      };

      const processor = glost()
        .before("transcription", hook1)
        .before("transcription", hook2)
        .use(transcriptionExtension);

      await processor.process(createMockDocument());

      expect(calls).toEqual(["before1", "before2"]);
    });

    it("passes document and plugin ID to before hooks", async () => {
      const hook = vi.fn();
      const processor = glost()
        .before("transcription", hook)
        .use(transcriptionExtension);

      const doc = createMockDocument();
      await processor.process(doc);

      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ type: "RootNode" }),
        "transcription"
      );
    });

    it("supports async before hooks", async () => {
      const calls: string[] = [];
      const asyncHook: BeforeHook = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        calls.push("async-before");
      };

      const processor = glost()
        .before("transcription", asyncHook)
        .use(transcriptionExtension);

      await processor.process(createMockDocument());

      expect(calls).toEqual(["async-before"]);
    });

    it("throws when adding hooks to frozen processor", () => {
      const processor = glost().freeze();

      expect(() => {
        (processor as any).before("test", () => {});
      }).toThrow("Cannot modify frozen processor");
    });
  });

  describe("hooks - after()", () => {
    it("registers after hooks", () => {
      const hook = vi.fn();
      const processor = glost()
        .use(transcriptionExtension)
        .after("transcription", hook);

      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("executes after hooks in order", async () => {
      const calls: string[] = [];
      const hook1: AfterHook = () => {
        calls.push("after1");
      };
      const hook2: AfterHook = () => {
        calls.push("after2");
      };

      const processor = glost()
        .use(transcriptionExtension)
        .after("transcription", hook1)
        .after("transcription", hook2);

      await processor.process(createMockDocument());

      expect(calls).toEqual(["after1", "after2"]);
    });

    it("passes processed document to after hooks", async () => {
      const hook = vi.fn();
      const processor = glost()
        .use(transcriptionExtension)
        .after("transcription", hook);

      await processor.process(createMockDocument());

      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ type: "RootNode" }),
        "transcription"
      );
    });

    it("supports async after hooks", async () => {
      const calls: string[] = [];
      const asyncHook: AfterHook = async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        calls.push("async-after");
      };

      const processor = glost()
        .use(transcriptionExtension)
        .after("transcription", asyncHook);

      await processor.process(createMockDocument());

      expect(calls).toEqual(["async-after"]);
    });
  });

  describe("hooks - onError()", () => {
    it("registers error hooks", () => {
      const hook = vi.fn();
      const processor = glost({ lenient: true }).onError(hook);

      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("calls error hooks when plugin throws in strict mode", async () => {
      const hook = vi.fn();
      const processor = glost()
        .onError(hook)
        .use(errorExtension);

      // In strict mode, error will be thrown, but hook should be called first
      await expect(processor.process(createMockDocument())).rejects.toThrow();

      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Plugin error" }),
        "error-plugin"
      );
    });

    it("does not call error hooks for extension errors in lenient mode", async () => {
      // In lenient mode, processGLOSTWithExtensionsAsync catches errors
      // and returns them in metadata without throwing, so onError hooks
      // are not triggered
      const hook = vi.fn();
      const processor = glost({ lenient: true })
        .onError(hook)
        .use(errorExtension);

      const result = await processor.processWithMeta(createMockDocument());

      // Error should be in metadata
      expect(result.metadata.errors).toHaveLength(1);
      // But onError hook should not be called
      expect(hook).not.toHaveBeenCalled();
    });

    it("catches errors in error hooks when they are called", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const badHook: ErrorHook = () => {
        throw new Error("Hook error");
      };

      const processor = glost()
        .onError(badHook)
        .use(errorExtension);

      // This will throw the original error, but should catch hook error
      await expect(processor.process(createMockDocument())).rejects.toThrow(
        "Plugin error"
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error in error hook:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("hooks - onSkip()", () => {
    it("registers skip hooks", () => {
      const hook = vi.fn();
      const processor = glost().onSkip(hook);

      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("calls skip hooks when plugin is skipped in lenient mode", async () => {
      const hook = vi.fn();
      const processor = glost({ lenient: true })
        .onSkip(hook)
        .use(errorExtension);

      await processor.process(createMockDocument());

      // When processGLOSTWithExtensionsAsync catches an error and marks it
      // as skipped, the processor calls skip with "Skipped by processor"
      expect(hook).toHaveBeenCalledWith("error-plugin", "Skipped by processor");
    });

    it("calls skip hooks with error message in strict mode", async () => {
      const hook = vi.fn();
      const processor = glost()
        .onSkip(hook)
        .use(errorExtension);

      // In strict mode, the error is caught by processor's catch block
      await expect(processor.process(createMockDocument())).rejects.toThrow();

      expect(hook).toHaveBeenCalledWith("error-plugin", "Plugin error");
    });
  });

  describe("hooks - onProgress()", () => {
    it("registers progress hooks", () => {
      const hook = vi.fn();
      const processor = glost().onProgress(hook);

      expect(processor).toBeInstanceOf(GLOSTProcessor);
    });

    it("calls progress hooks during processing", async () => {
      const hook = vi.fn();
      const processor = glost()
        .onProgress(hook)
        .use(transcriptionExtension)
        .use(translationExtension);

      await processor.process(createMockDocument());

      // Should be called at start (0/2) and after each plugin (1/2, 2/2)
      expect(hook).toHaveBeenCalledTimes(3);
    });

    it("provides progress statistics", async () => {
      const hook = vi.fn();
      const processor = glost()
        .onProgress(hook)
        .use(transcriptionExtension);

      await processor.process(createMockDocument());

      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({
          total: 1,
          completed: expect.any(Number),
          startTime: expect.any(Number),
          elapsed: expect.any(Number),
        })
      );
    });
  });

  describe("data() - data store", () => {
    it("sets and gets data", () => {
      const processor = glost();
      processor.data("key", "value");

      expect(processor.data("key")).toBe("value");
    });

    it("supports chaining when setting data", () => {
      const processor = glost()
        .data("config", { theme: "dark" })
        .data("version", 1);

      expect(processor.data("config")).toEqual({ theme: "dark" });
      expect(processor.data("version")).toBe(1);
    });

    it("returns undefined for non-existent keys", () => {
      const processor = glost();
      expect(processor.data("nonexistent")).toBeUndefined();
    });

    it("stores complex objects", () => {
      const processor = glost();
      const complexData = {
        nested: { value: 42 },
        array: [1, 2, 3],
      };

      processor.data("complex", complexData);
      expect(processor.data("complex")).toEqual(complexData);
    });

    it("throws when setting data on frozen processor", () => {
      const processor = glost().freeze();

      expect(() => {
        (processor as any).data("key", "value");
      }).toThrow("Cannot modify frozen processor");
    });

    it("allows getting data from frozen processor", () => {
      const processor = glost().data("key", "value");
      const frozen = processor.freeze();

      expect(frozen.data("key")).toBe("value");
    });
  });

  describe("freeze()", () => {
    it("creates a frozen copy of the processor", () => {
      const processor = glost()
        .use(transcriptionExtension)
        .data("config", { value: 1 });

      const frozen = processor.freeze();

      expect((frozen as any).frozen).toBe(true);
    });

    it("frozen processor can still process documents", async () => {
      const processor = glost()
        .use(transcriptionExtension)
        .freeze();

      const doc = createMockDocument();
      const result = await processor.process(doc);

      expect(result.type).toBe("RootNode");
    });

    it("frozen processor reuses plugin configuration", async () => {
      const processor = glost()
        .use(transcriptionExtension)
        .use(translationExtension)
        .freeze();

      const doc1 = createMockDocument();
      const doc2 = createMockDocument();

      const result1 = await processor.process(doc1);
      const result2 = await processor.process(doc2);

      expect(result1.type).toBe("RootNode");
      expect(result2.type).toBe("RootNode");
    });

    it("frozen processor preserves hooks", async () => {
      const hook = vi.fn();
      const processor = glost()
        .use(transcriptionExtension)
        .after("transcription", hook)
        .freeze();

      await processor.process(createMockDocument());

      expect(hook).toHaveBeenCalled();
    });

    it("frozen processor preserves data", () => {
      const processor = glost()
        .data("key", "value")
        .freeze();

      expect(processor.data("key")).toBe("value");
    });

    it("does not affect original processor", () => {
      const processor = glost()
        .use(transcriptionExtension)
        .data("original", true);

      const frozen = processor.freeze();

      // Modify original
      processor.data("modified", true);

      // Frozen should not have the modification
      expect((frozen as any).data("modified")).toBeUndefined();
      expect(processor.data("modified")).toBe(true);
    });
  });

  describe("process() - document processing", () => {
    it("processes a document through the pipeline", async () => {
      const processor = glost().use(transcriptionExtension);
      const doc = createMockDocument();

      const result = await processor.process(doc);

      expect(result.type).toBe("RootNode");
    });

    it("applies plugins in order", async () => {
      const calls: string[] = [];

      const plugin1: GLOSTExtension = {
        id: "plugin1",
        name: "Plugin 1",
        transform: (tree) => {
          calls.push("plugin1");
          return tree;
        },
      };

      const plugin2: GLOSTExtension = {
        id: "plugin2",
        name: "Plugin 2",
        transform: (tree) => {
          calls.push("plugin2");
          return tree;
        },
      };

      const processor = glost().use(plugin1).use(plugin2);
      await processor.process(createMockDocument());

      expect(calls).toEqual(["plugin1", "plugin2"]);
    });

    it("returns processed document", async () => {
      const processor = glost().use(transcriptionExtension);
      const doc = createMockDocument();

      const result = await processor.process(doc);

      expect(result).toBeDefined();
      expect(result.type).toBe("RootNode");
    });

    it("processes without plugins", async () => {
      const processor = glost();
      const doc = createMockDocument();

      const result = await processor.process(doc);

      expect(result).toEqual(doc);
    });

    it("throws on error in strict mode", async () => {
      const processor = glost().use(errorExtension);

      await expect(processor.process(createMockDocument())).rejects.toThrow(
        "Plugin error"
      );
    });

    it("continues on error in lenient mode", async () => {
      const processor = glost({ lenient: true })
        .use(errorExtension)
        .use(transcriptionExtension);

      const result = await processor.process(createMockDocument());

      expect(result).toBeDefined();
    });
  });

  describe("processWithMeta() - detailed processing", () => {
    it("returns document and metadata", async () => {
      const processor = glost().use(transcriptionExtension);
      const doc = createMockDocument();

      const result = await processor.processWithMeta(doc);

      expect(result.document).toBeDefined();
      expect(result.metadata).toBeDefined();
    });

    it("tracks applied plugins", async () => {
      const processor = glost()
        .use(transcriptionExtension)
        .use(translationExtension);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.appliedPlugins).toContain("transcription");
      expect(result.metadata.appliedPlugins).toContain("translation");
    });

    it("tracks skipped plugins", async () => {
      const processor = glost({ lenient: true })
        .use(errorExtension)
        .use(transcriptionExtension);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.skippedPlugins).toContain("error-plugin");
      expect(result.metadata.appliedPlugins).toContain("transcription");
    });

    it("includes processing errors", async () => {
      const processor = glost({ lenient: true }).use(errorExtension);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.errors).toHaveLength(1);
      expect(result.metadata.errors[0]).toMatchObject({
        plugin: "error-plugin",
        phase: "transform",
        message: "Plugin error",
        // recoverable: true when caught by processGLOSTWithExtensionsAsync
        // recoverable: false only when caught in processor's catch block
        recoverable: true,
      });
    });

    it("provides processing statistics", async () => {
      const processor = glost().use(transcriptionExtension);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.stats).toMatchObject({
        totalTime: expect.any(Number),
        timing: expect.any(Map),
        startTime: expect.any(Number),
        endTime: expect.any(Number),
      });
    });

    it("records timing per plugin", async () => {
      const processor = glost()
        .use(transcriptionExtension)
        .use(translationExtension);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.stats.timing.has("transcription")).toBe(true);
      expect(result.metadata.stats.timing.has("translation")).toBe(true);
      expect(result.metadata.stats.timing.get("transcription")).toBeGreaterThanOrEqual(0);
      expect(result.metadata.stats.timing.get("translation")).toBeGreaterThanOrEqual(0);
    });

    it("initializes warnings array", async () => {
      const processor = glost().use(transcriptionExtension);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.warnings).toEqual([]);
    });
  });

  describe("processSync()", () => {
    it("throws not implemented error", () => {
      const processor = glost();
      const doc = createMockDocument();

      expect(() => processor.processSync(doc)).toThrow(
        "Synchronous processing not yet implemented"
      );
    });
  });

  describe("plugin resolution", () => {
    it("resolves plugin functions to extensions", async () => {
      const plugin: Plugin = () => ({
        id: "test",
        name: "Test",
        transform: (tree) => tree,
      });

      const processor = glost().use(plugin);
      const result = await processor.process(createMockDocument());

      expect(result).toBeDefined();
    });

    it("uses extension objects directly", async () => {
      const processor = glost().use(transcriptionExtension);
      const result = await processor.process(createMockDocument());

      expect(result).toBeDefined();
    });

    it("handles plugin functions that return void", async () => {
      const plugin: Plugin = () => {
        return undefined as any;
      };

      const processor = glost().use(plugin);
      const result = await processor.process(createMockDocument());

      // Should skip the plugin but not crash
      expect(result).toBeDefined();
    });
  });

  describe("error handling", () => {
    it("propagates errors in strict mode", async () => {
      const processor = glost().use(errorExtension);

      await expect(processor.process(createMockDocument())).rejects.toThrow(
        "Plugin error"
      );
    });

    it("continues processing in lenient mode", async () => {
      const processor = glost({ lenient: true })
        .use(errorExtension)
        .use(transcriptionExtension);

      const result = await processor.process(createMockDocument());

      expect(result).toBeDefined();
    });

    it("records all errors in lenient mode", async () => {
      const error1: GLOSTExtension = {
        id: "error1",
        name: "Error 1",
        transform: () => {
          throw new Error("Error 1");
        },
      };

      const error2: GLOSTExtension = {
        id: "error2",
        name: "Error 2",
        transform: () => {
          throw new Error("Error 2");
        },
      };

      const processor = glost({ lenient: true }).use(error1).use(error2);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.errors).toHaveLength(2);
      expect(result.metadata.errors[0]!.message).toBe("Error 1");
      expect(result.metadata.errors[1]!.message).toBe("Error 2");
    });

    it("converts non-Error values to Error objects", async () => {
      const stringError: GLOSTExtension = {
        id: "string-error",
        name: "String Error",
        transform: () => {
          throw "String error message";
        },
      };

      const processor = glost({ lenient: true }).use(stringError);

      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.errors[0]).toMatchObject({
        plugin: "string-error",
        message: "String error message",
      });
    });
  });

  describe("integration scenarios", () => {
    it("supports complex pipeline with hooks and data", async () => {
      const calls: string[] = [];

      const processor = glost()
        .data("config", { enabled: true })
        .before("transcription", () => {
          calls.push("before-transcription");
        })
        .use(transcriptionExtension)
        .after("transcription", () => {
          calls.push("after-transcription");
        })
        .before("translation", () => {
          calls.push("before-translation");
        })
        .use(translationExtension)
        .after("translation", () => {
          calls.push("after-translation");
        })
        .onProgress((stats) => {
          if (stats.completed === stats.total) {
            calls.push("complete");
          }
        });

      await processor.process(createMockDocument());

      expect(calls).toEqual([
        "before-transcription",
        "after-transcription",
        "before-translation",
        "after-translation",
        "complete",
      ]);
    });

    it("reuses frozen processor for multiple documents", async () => {
      const callCount = vi.fn();

      const countingExtension: GLOSTExtension = {
        id: "counter",
        name: "Counter",
        transform: (tree) => {
          callCount();
          return tree;
        },
      };

      const frozen = glost().use(countingExtension).freeze();

      await frozen.process(createMockDocument());
      await frozen.process(createMockDocument());
      await frozen.process(createMockDocument());

      expect(callCount).toHaveBeenCalledTimes(3);
    });

    it("handles preset expansion correctly", async () => {
      const calls: string[] = [];

      const plugin1: GLOSTExtension = {
        id: "plugin1",
        name: "Plugin 1",
        transform: (tree) => {
          calls.push("plugin1");
          return tree;
        },
      };

      const plugin2: GLOSTExtension = {
        id: "plugin2",
        name: "Plugin 2",
        transform: (tree) => {
          calls.push("plugin2");
          return tree;
        },
      };

      const preset: Preset = {
        id: "test-preset",
        name: "Test Preset",
        plugins: [plugin1, plugin2],
      };

      const processor = glost().use(preset);
      await processor.process(createMockDocument());

      expect(calls).toEqual(["plugin1", "plugin2"]);
    });

    it("provides detailed timing information", async () => {
      const slowExtension: GLOSTExtension = {
        id: "slow",
        name: "Slow",
        transform: async (tree) => {
          await new Promise((resolve) => setTimeout(resolve, 50));
          return tree;
        },
      };

      const processor = glost().use(slowExtension);
      const result = await processor.processWithMeta(createMockDocument());

      expect(result.metadata.stats.timing.get("slow")).toBeGreaterThanOrEqual(50);
      expect(result.metadata.stats.totalTime).toBeGreaterThanOrEqual(50);
    });
  });
});
