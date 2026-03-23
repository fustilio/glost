/**
 * GLOSTStreamProcessor Tests
 *
 * Comprehensive test suite for the streaming processor that yields
 * processed sentence batches progressively.
 */

import { describe, it, expect, vi } from "vitest";
import {
  GLOSTStreamProcessor,
  type ProcessedChunk,
  type StreamOptions,
} from "../stream-processor.js";
import type { GLOSTExtension } from "glost-extensions";
import type {
  GLOSTRoot,
  GLOSTSentence,
  GLOSTParagraph,
  GLOSTWord,
} from "glost-core";

// ============================================================================
// Helpers
// ============================================================================

function makeWord(text: string): GLOSTWord {
  return {
    type: "WordNode",
    text,
    metadata: {},
    extras: {},
    children: [{ type: "TextNode", value: text }],
  } as unknown as GLOSTWord;
}

function makeSentence(words: GLOSTWord[]): GLOSTSentence {
  return {
    type: "SentenceNode",
    children: words,
    metadata: {},
    extras: {},
  } as unknown as GLOSTSentence;
}

function makeParagraph(sentences: GLOSTSentence[]): GLOSTParagraph {
  return {
    type: "ParagraphNode",
    children: sentences,
    metadata: {},
    extras: {},
  } as unknown as GLOSTParagraph;
}

function makeDocument(
  paragraphs: GLOSTParagraph[],
  lang = "en",
): GLOSTRoot {
  return {
    type: "RootNode",
    lang,
    children: paragraphs,
    metadata: {},
    extras: {},
  };
}

/** Create a document with N sentences spread across P paragraphs */
function makeLargeDocument(
  sentenceCount: number,
  paragraphCount = 1,
): GLOSTRoot {
  const sentencesPerParagraph = Math.ceil(
    sentenceCount / paragraphCount,
  );
  const paragraphs: GLOSTParagraph[] = [];

  let remaining = sentenceCount;
  for (let p = 0; p < paragraphCount; p++) {
    const count = Math.min(remaining, sentencesPerParagraph);
    const sentences: GLOSTSentence[] = Array.from(
      { length: count },
      (_, i) =>
        makeSentence([makeWord(`word_p${p}_s${i}`)]),
    );
    paragraphs.push(makeParagraph(sentences));
    remaining -= count;
    if (remaining <= 0) break;
  }

  return makeDocument(paragraphs);
}

// A no-op extension (streamingSupport defaults to 'none')
const noopExtension: GLOSTExtension = {
  id: "noop",
  name: "No-op",
  transform: (tree) => tree,
};

// A chunk-level transcription extension
const chunkTranscriptionExtension: GLOSTExtension = {
  id: "chunk-transcription",
  name: "Chunk Transcription",
  streamingSupport: "chunk",
  visit: {
    word: (node) => {
      (node as unknown as { extras: Record<string, unknown> }).extras = {
        ...(node as unknown as { extras: Record<string, unknown> }).extras,
        transcription: `[${(node as unknown as { text: string }).text}]`,
      };
    },
  },
};

// A doc-level transform extension (streamingSupport not set = 'none')
const docTransformExtension: GLOSTExtension = {
  id: "doc-transform",
  name: "Doc Transform",
  transform: (tree) => {
    // Tag the root metadata so we can assert it ran
    return {
      ...tree,
      extras: { ...tree.extras, docTransformRan: true },
    };
  },
};

// ============================================================================
// Tests
// ============================================================================

describe("GLOSTStreamProcessor", () => {
  describe("constructor", () => {
    it("creates an instance", () => {
      const sp = new GLOSTStreamProcessor();
      expect(sp).toBeInstanceOf(GLOSTStreamProcessor);
    });

    it("accepts options", () => {
      const sp = new GLOSTStreamProcessor({ lenient: true });
      expect(sp).toBeInstanceOf(GLOSTStreamProcessor);
    });
  });

  describe("use()", () => {
    it("returns this for chaining", () => {
      const sp = new GLOSTStreamProcessor();
      const returned = sp.use(noopExtension);
      expect(returned).toBe(sp);
    });

    it("throws when modifying a frozen processor", () => {
      const frozen = new GLOSTStreamProcessor().freeze();
      const mutable = frozen as unknown as GLOSTStreamProcessor;
      expect(() => mutable.use(noopExtension))
        .toThrow("Cannot modify frozen stream processor");
    });

    it("accepts presets", () => {
      const sp = new GLOSTStreamProcessor().use({
        id: "preset",
        name: "Preset",
        plugins: [noopExtension, chunkTranscriptionExtension],
      });
      expect(sp).toBeInstanceOf(GLOSTStreamProcessor);
    });
  });

  describe("freeze()", () => {
    it("returns a frozen processor", () => {
      const frozen = new GLOSTStreamProcessor().freeze();
      expect(
        (frozen as unknown as { frozen: boolean }).frozen,
      ).toBe(true);
    });

    it("frozen processor can still stream documents", async () => {
      const frozen = new GLOSTStreamProcessor()
        .use(noopExtension)
        .freeze();
      const doc = makeLargeDocument(3);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of frozen.stream(doc)) {
        chunks.push(chunk);
      }
      expect(chunks.length).toBeGreaterThan(0);
    });
  });

  describe("stream() — empty document", () => {
    it("yields nothing for an empty document", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeDocument([]);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc)) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(0);
    });

    it("yields nothing for paragraphs with no sentences", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeDocument([
        {
          type: "ParagraphNode",
          children: [],
          metadata: {},
          extras: {},
        } as unknown as GLOSTParagraph,
      ]);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc)) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(0);
    });
  });

  describe("stream() — single paragraph", () => {
    it("streams a single-sentence document as one chunk", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(1);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc)) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(1);
      expect(chunks[0]!.sentences).toHaveLength(1);
      expect(chunks[0]!.paragraphIndex).toBe(0);
      expect(chunks[0]!.chunkIndex).toBe(0);
      expect(chunks[0]!.isLast).toBe(true);
    });

    it("streams multiple sentences as one chunk when under batch", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(5);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 50 })) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(1);
      expect(chunks[0]!.sentences).toHaveLength(5);
    });

    it("marks the only chunk as isLast", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(1);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc)) {
        chunks.push(chunk);
      }
      expect(chunks[0]!.isLast).toBe(true);
    });
  });

  describe("stream() — multi-paragraph document", () => {
    it("assigns correct paragraphIndex per chunk", async () => {
      const sp = new GLOSTStreamProcessor();
      // 2 paragraphs, 3 sentences each, batchSize=10 (no splitting)
      const doc = makeLargeDocument(6, 2);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 50 })) {
        chunks.push(chunk);
      }
      // 2 paragraphs -> 2 chunks (one per paragraph)
      expect(chunks).toHaveLength(2);
      expect(chunks[0]!.paragraphIndex).toBe(0);
      expect(chunks[1]!.paragraphIndex).toBe(1);
    });

    it("marks only the last chunk as isLast", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(6, 2);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 50 })) {
        chunks.push(chunk);
      }
      const lastFlags = chunks.map((c) => c.isLast);
      expect(lastFlags.slice(0, -1).every((f) => f === false)).toBe(
        true,
      );
      expect(lastFlags[lastFlags.length - 1]).toBe(true);
    });
  });

  describe("stream() — batchSize", () => {
    it("respects batchSize option", async () => {
      const sp = new GLOSTStreamProcessor();
      // 10 sentences in 1 paragraph, batchSize 3
      const doc = makeLargeDocument(10);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 3 })) {
        chunks.push(chunk);
      }
      // ceil(10/3) = 4 chunks
      expect(chunks).toHaveLength(4);
      expect(chunks[0]!.sentences).toHaveLength(3);
      expect(chunks[1]!.sentences).toHaveLength(3);
      expect(chunks[2]!.sentences).toHaveLength(3);
      expect(chunks[3]!.sentences).toHaveLength(1);
    });

    it("uses default batchSize of 50 when not specified", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(100);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc)) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(2);
      expect(chunks[0]!.sentences).toHaveLength(50);
      expect(chunks[1]!.sentences).toHaveLength(50);
    });

    it("assigns sequential chunkIndex within a paragraph", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(9);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 3 })) {
        chunks.push(chunk);
      }
      const indices = chunks.map((c) => c.chunkIndex);
      expect(indices).toEqual([0, 1, 2]);
    });
  });

  describe("stream() — doc-level transform", () => {
    it("runs doc-level extensions before streaming", async () => {
      const sp = new GLOSTStreamProcessor().use(docTransformExtension);
      const doc = makeLargeDocument(2);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc)) {
        chunks.push(chunk);
      }
      // docTransformExtension is 'none' mode — it runs on the full doc
      // The sentences themselves are untouched by this transform
      expect(chunks).toHaveLength(1);
    });

    it("does not run doc-level transform per chunk", async () => {
      const calls: string[] = [];
      const countingTransform: GLOSTExtension = {
        id: "counting-transform",
        name: "Counting Transform",
        // streamingSupport unset => 'none' (doc-level)
        transform: (tree) => {
          calls.push("transform");
          return tree;
        },
      };

      const sp = new GLOSTStreamProcessor().use(countingTransform);
      const doc = makeLargeDocument(10);
      // batchSize=2 => 5 chunks
      for await (const _chunk of sp.stream(doc, { batchSize: 2 })) {
        // consume
      }

      // transform should run exactly once, not once per chunk
      expect(calls).toHaveLength(1);
    });
  });

  describe("stream() — chunk-level extensions", () => {
    it("processes each batch with chunk-level extensions", async () => {
      const sp = new GLOSTStreamProcessor().use(
        chunkTranscriptionExtension,
      );
      const doc = makeLargeDocument(4);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 2 })) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(2);
      // Each sentence word should have transcription added
      type SentWithChildren = { children: unknown[] };
      type WordLike = {
        type: string;
        text: string;
        extras: Record<string, unknown>;
      };
      for (const chunk of chunks) {
        for (const sentence of chunk.sentences) {
          const sent = sentence as unknown as SentWithChildren;
          for (const child of sent.children) {
            const word = child as unknown as WordLike;
            if (word.type === "WordNode") {
              expect(word.extras.transcription).toBe(
                `[${word.text}]`,
              );
            }
          }
        }
      }
    });

    it("runs chunk extensions once per chunk, not once globally", async () => {
      const callsPerChunk: number[] = [];
      let currentChunkCalls = 0;

      const countingChunkExtension: GLOSTExtension = {
        id: "counting-chunk",
        name: "Counting Chunk",
        streamingSupport: "chunk",
        visit: {
          word: (node) => {
            currentChunkCalls++;
          },
        },
      };

      const sp = new GLOSTStreamProcessor().use(countingChunkExtension);
      const doc = makeLargeDocument(6); // 6 sentences, 1 word each
      for await (const chunk of sp.stream(doc, { batchSize: 3 })) {
        callsPerChunk.push(currentChunkCalls);
        currentChunkCalls = 0;
      }

      // 2 chunks, 3 words each
      expect(callsPerChunk).toEqual([3, 3]);
    });
  });

  describe("stream() — combined doc + chunk extensions", () => {
    it("runs doc-level first then chunk-level per batch", async () => {
      const executionOrder: string[] = [];

      const docExt: GLOSTExtension = {
        id: "doc-ext",
        name: "Doc Ext",
        transform: (tree) => {
          executionOrder.push("doc-transform");
          return tree;
        },
      };

      const chunkExt: GLOSTExtension = {
        id: "chunk-ext",
        name: "Chunk Ext",
        streamingSupport: "chunk",
        visit: {
          word: () => {
            executionOrder.push("chunk-visit");
          },
        },
      };

      const sp = new GLOSTStreamProcessor()
        .use(docExt)
        .use(chunkExt);

      const doc = makeLargeDocument(4);
      // batchSize=2 => 2 chunks with 2 sentences each
      for await (const _chunk of sp.stream(doc, { batchSize: 2 })) {
        // consume
      }

      // doc-transform runs once at the start
      expect(executionOrder[0]).toBe("doc-transform");
      // chunk-visit runs for words in each chunk
      const chunkVisits = executionOrder.filter(
        (e) => e === "chunk-visit",
      );
      // 4 sentences, 1 word each => 4 chunk-visit calls total
      expect(chunkVisits).toHaveLength(4);
    });
  });

  describe("stream() — backward compat (no streamingSupport set)", () => {
    it("treats extensions without streamingSupport as doc-level", async () => {
      const calls: string[] = [];
      const legacyExtension: GLOSTExtension = {
        id: "legacy",
        name: "Legacy",
        // No streamingSupport field at all
        visit: {
          word: (node) => {
            calls.push("legacy-visit");
          },
        },
      };

      const sp = new GLOSTStreamProcessor().use(legacyExtension);
      const doc = makeLargeDocument(6);
      for await (const _chunk of sp.stream(doc, { batchSize: 2 })) {
        // consume
      }

      // Runs once on the full document (6 words) before streaming,
      // not per chunk
      expect(calls).toHaveLength(6);
    });
  });

  describe("stream() — cancellation", () => {
    it("stops processing when consumer breaks from for-await", async () => {
      const processedChunks: ProcessedChunk[] = [];
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(100);

      for await (const chunk of sp.stream(doc, { batchSize: 10 })) {
        processedChunks.push(chunk);
        if (processedChunks.length >= 2) {
          break; // Cancel after 2 chunks
        }
      }

      expect(processedChunks).toHaveLength(2);
    });
  });

  describe("stream() — ProcessedChunk metadata", () => {
    it("includes correct metadata on each chunk", async () => {
      const sp = new GLOSTStreamProcessor();
      const doc = makeLargeDocument(7);
      const chunks: ProcessedChunk[] = [];
      for await (const chunk of sp.stream(doc, { batchSize: 3 })) {
        chunks.push(chunk);
      }

      // ceil(7/3) = 3 chunks
      expect(chunks).toHaveLength(3);

      expect(chunks[0]).toMatchObject({
        paragraphIndex: 0,
        chunkIndex: 0,
        isLast: false,
      });
      expect(chunks[0]!.sentences).toHaveLength(3);

      expect(chunks[1]).toMatchObject({
        paragraphIndex: 0,
        chunkIndex: 1,
        isLast: false,
      });
      expect(chunks[1]!.sentences).toHaveLength(3);

      expect(chunks[2]).toMatchObject({
        paragraphIndex: 0,
        chunkIndex: 2,
        isLast: true,
      });
      expect(chunks[2]!.sentences).toHaveLength(1);
    });
  });

  describe("stream() — reuse across multiple documents", () => {
    it("frozen processor streams multiple documents correctly", async () => {
      const frozen = new GLOSTStreamProcessor()
        .use(chunkTranscriptionExtension)
        .freeze();

      const doc1 = makeLargeDocument(3);
      const doc2 = makeLargeDocument(5);

      const chunks1: ProcessedChunk[] = [];
      for await (const chunk of frozen.stream(doc1)) {
        chunks1.push(chunk);
      }

      const chunks2: ProcessedChunk[] = [];
      for await (const chunk of frozen.stream(doc2)) {
        chunks2.push(chunk);
      }

      expect(
        chunks1.flatMap((c) => c.sentences).length,
      ).toBe(3);
      expect(
        chunks2.flatMap((c) => c.sentences).length,
      ).toBe(5);
    });
  });
});
