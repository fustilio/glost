/**
 * Test Utilities
 *
 * Helper functions for creating mock GLOST data in tests.
 *
 * @packageDocumentation
 */
import type { GLOSTWord, GLOSTRoot } from "glost-core";
/**
 * Create a mock GLOST word node for testing
 *
 * @param text - The word text
 * @param options - Optional word properties
 * @returns Mock GLOST word node
 *
 * @example
 * ```typescript
 * const word = createMockGLOSTWord("สวัสดี", {
 *   lang: "th-TH",
 *   extras: { metadata: { frequency: "common" } }
 * });
 * ```
 *
 * @since 0.0.1
 */
export declare function createMockGLOSTWord(text: string, options?: {
    lang?: string;
    script?: string;
    transcription?: Record<string, {
        text: string;
    }>;
    metadata?: Record<string, unknown>;
    extras?: Record<string, unknown>;
    difficulty?: string;
}): GLOSTWord;
/**
 * Word specification for mock documents
 */
export interface MockWordSpec {
    text: string;
    partOfSpeech?: string;
    lang?: string;
    script?: string;
    extras?: Record<string, unknown>;
}
/**
 * Punctuation specification for mock documents
 */
export interface MockPunctuationSpec {
    text: string;
}
/**
 * Sentence specification for mock documents
 */
export interface MockSentenceSpec {
    originalText?: string;
    lang?: string;
    script?: string;
    words?: (string | MockWordSpec)[];
    punctuation?: MockPunctuationSpec[];
}
/**
 * Options for creating mock documents with object syntax
 */
export interface MockDocumentOptions {
    /**
     * Array of sentences (use this for multi-sentence documents)
     */
    sentences?: MockSentenceSpec[];
    /**
     * Array of words (shortcut for single-sentence documents)
     * If provided without sentences, creates a document with one sentence containing these words.
     */
    words?: (string | MockWordSpec)[];
    lang?: string;
    script?: string;
}
/**
 * Create a mock GLOST document for testing
 *
 * Supports two calling conventions:
 * 1. Simple: `createMockGLOSTDocument(["Hello", "world"], { lang: "en-US" })`
 * 2. Object: `createMockGLOSTDocument({ sentences: [...], lang: "en-US" })`
 *
 * @param wordsOrOptions - Array of word texts/nodes OR options object with sentences
 * @param options - Optional document properties (only for array syntax)
 * @returns Mock GLOST document
 *
 * @example
 * ```typescript
 * // Simple syntax
 * const doc1 = createMockGLOSTDocument(["Hello", "world"], { lang: "en-US" });
 *
 * // Object syntax with sentences
 * const doc2 = createMockGLOSTDocument({
 *   sentences: [
 *     {
 *       originalText: "I like coffee",
 *       lang: "en-US",
 *       words: [
 *         { text: "I" },
 *         { text: "like", partOfSpeech: "verb" },
 *         { text: "coffee" },
 *       ],
 *     },
 *   ],
 * });
 * ```
 *
 * @since 0.0.1
 */
export declare function createMockGLOSTDocument(wordsOrOptions: (string | GLOSTWord)[] | MockDocumentOptions, options?: {
    lang?: string;
    script?: string;
}): GLOSTRoot;
/**
 * Create a mock extension for testing
 *
 * @param id - Extension ID
 * @param options - Optional extension properties
 * @returns Mock extension
 *
 * @example
 * ```typescript
 * const extension = createMockExtension("test-extension", {
 *   enhanceMetadata: (node) => ({ test: "value" })
 * });
 * ```
 *
 * @since 0.0.1
 */
export declare function createMockExtension(id: string, options?: {
    name?: string;
    description?: string;
    enhanceMetadata?: (node: any) => any;
    transform?: (tree: any) => any;
    visit?: {
        word?: (node: any) => any;
        sentence?: (node: any) => any;
        paragraph?: (node: any) => any;
    };
    dependencies?: string[];
}): import("./types.js").GLOSTExtension;
//# sourceMappingURL=test-utils.d.ts.map