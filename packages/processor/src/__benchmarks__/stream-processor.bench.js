/**
 * GLOSTStreamProcessor Performance Benchmarks
 *
 * Compares batch (eager) processing against streaming for documents
 * of various sizes. Includes 10K and 100K word documents.
 */
import { bench, describe } from "vitest";
import { createGLOSTWordNode, createSimpleDocument, createSentenceFromWords, createParagraphFromSentences, createGLOSTRootNode, } from "glost-core";
import { GLOSTProcessor } from "../processor.js";
import { GLOSTStreamProcessor } from "../stream-processor.js";
// ============================================================================
// Document factories
// ============================================================================
/** Create a document with `wordCount` words in a single sentence */
function makeDocumentByWords(wordCount) {
    const words = Array.from({ length: wordCount }, (_, i) => createGLOSTWordNode({ value: `word${i}` }));
    return createSimpleDocument(words, "en", "latin");
}
/**
 * Create a document with `sentenceCount` sentences, each sentence
 * containing `wordsPerSentence` words, spread across `paragraphCount`
 * paragraphs.
 */
function makeDocumentBySentences(sentenceCount, wordsPerSentence = 10, paragraphCount = 1) {
    const sentencesPerParagraph = Math.ceil(sentenceCount / paragraphCount);
    const paragraphs = [];
    let remaining = sentenceCount;
    for (let p = 0; p < paragraphCount; p++) {
        const count = Math.min(remaining, sentencesPerParagraph);
        const sentences = Array.from({ length: count }, (_, s) => {
            const words = Array.from({ length: wordsPerSentence }, (_, w) => createGLOSTWordNode({ value: `p${p}s${s}w${w}` }));
            return createSentenceFromWords(words, "en", "latin");
        });
        paragraphs.push(createParagraphFromSentences(sentences));
        remaining -= count;
        if (remaining <= 0)
            break;
    }
    return createGLOSTRootNode({
        lang: "en",
        script: "latin",
        children: paragraphs,
    });
}
// ============================================================================
// Extensions
// ============================================================================
function createVisitExtension(id) {
    return {
        id,
        name: `Visit Extension ${id}`,
        visit: {
            word: (node) => {
                return {
                    ...node,
                    extras: { ...node.extras, [id]: true },
                };
            },
        },
    };
}
function createChunkVisitExtension(id) {
    return {
        id,
        name: `Chunk Visit Extension ${id}`,
        streamingSupport: "chunk",
        visit: {
            word: (node) => {
                return {
                    ...node,
                    extras: { ...node.extras, [id]: true },
                };
            },
        },
    };
}
// ============================================================================
// Benchmark: medium documents (for baseline comparison)
// ============================================================================
describe("Streaming vs Batch: Medium Documents", () => {
    const doc1k = makeDocumentBySentences(100, 10); // 1K words
    const ext = createVisitExtension("test");
    const chunkExt = createChunkVisitExtension("chunk-test");
    bench("batch — 1K words (GLOSTProcessor)", async () => {
        const proc = new GLOSTProcessor().use(ext);
        await proc.process(doc1k);
    });
    bench("stream — 1K words, batchSize=50", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc1k, { batchSize: 50 })) {
            // consume
        }
    });
    bench("stream — 1K words, batchSize=10", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc1k, { batchSize: 10 })) {
            // consume
        }
    });
    bench("stream — 1K words, batchSize=100", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc1k, { batchSize: 100 })) {
            // consume
        }
    });
});
// ============================================================================
// Benchmark: 10K word documents
// ============================================================================
describe("Streaming: 10K Word Documents", () => {
    // 1000 sentences * 10 words = 10K words
    const doc10k = makeDocumentBySentences(1000, 10);
    const ext = createVisitExtension("test");
    const chunkExt = createChunkVisitExtension("chunk-test");
    bench("batch — 10K words (GLOSTProcessor)", async () => {
        const proc = new GLOSTProcessor().use(ext);
        await proc.process(doc10k);
    });
    bench("stream — 10K words, batchSize=50", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc10k, { batchSize: 50 })) {
            // consume
        }
    });
    bench("stream — 10K words, batchSize=100", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc10k, {
            batchSize: 100,
        })) {
            // consume
        }
    });
    bench("stream — 10K words, batchSize=500", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc10k, {
            batchSize: 500,
        })) {
            // consume
        }
    });
});
// ============================================================================
// Benchmark: 100K word documents
// ============================================================================
describe("Streaming: 100K Word Documents", () => {
    // 10000 sentences * 10 words = 100K words
    const doc100k = makeDocumentBySentences(10_000, 10, 100);
    const ext = createVisitExtension("test");
    const chunkExt = createChunkVisitExtension("chunk-test");
    bench("batch — 100K words (GLOSTProcessor)", async () => {
        const proc = new GLOSTProcessor().use(ext);
        await proc.process(doc100k);
    });
    bench("stream — 100K words, batchSize=50", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc100k, {
            batchSize: 50,
        })) {
            // consume
        }
    });
    bench("stream — 100K words, batchSize=500", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc100k, {
            batchSize: 500,
        })) {
            // consume
        }
    });
    bench("stream — 100K words, batchSize=1000", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const _chunk of proc.stream(doc100k, {
            batchSize: 1000,
        })) {
            // consume
        }
    });
});
// ============================================================================
// Benchmark: early termination via break
// ============================================================================
describe("Streaming: Early Termination", () => {
    const doc10k = makeDocumentBySentences(1000, 10);
    const chunkExt = createChunkVisitExtension("chunk-test");
    bench("stream — cancel after first chunk (lazy win)", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        for await (const chunk of proc.stream(doc10k, { batchSize: 50 })) {
            break; // Only consume first chunk
        }
    });
    bench("stream — cancel after 10 chunks vs full batch", async () => {
        const proc = new GLOSTStreamProcessor().use(chunkExt);
        let count = 0;
        for await (const _chunk of proc.stream(doc10k, {
            batchSize: 50,
        })) {
            if (++count >= 10)
                break;
        }
    });
});
//# sourceMappingURL=stream-processor.bench.js.map