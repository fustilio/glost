/**
 * Test Utilities
 * 
 * Helper functions for creating mock GLOST data in tests.
 * 
 * @packageDocumentation
 */

import type {
  GLOSTWord,
  GLOSTSentence,
  GLOSTParagraph,
  GLOSTRoot,
  GLOSTText,
  GLOSTPunctuation,
  TransliterationData,
  TranscriptionSystem,
  LinguisticMetadata,
} from "glost";
import {
  createGLOSTWordNode,
  createGLOSTTextNode,
  createGLOSTSentenceNode,
  createGLOSTParagraphNode,
  createGLOSTRootNode,
  createGLOSTPunctuationNode,
} from "glost";

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
export function createMockGLOSTWord(
  text: string,
  options: {
    lang?: string;
    script?: string;
    transcription?: Record<string, { text: string }>;
    metadata?: Record<string, unknown>;
    extras?: Record<string, unknown>;
    difficulty?: string;
  } = {},
): GLOSTWord {
  const {
    lang = "en-US",
    script = "latin",
    transcription = {},
    metadata = { partOfSpeech: "" },
    extras = {},
    difficulty,
  } = options;

  // Convert simplified transcription format to full TransliterationData format
  const fullTranscription: TransliterationData = {};
  for (const [system, info] of Object.entries(transcription)) {
    fullTranscription[system] = {
      text: info.text,
      system: system as TranscriptionSystem,
    };
  }

  // Ensure metadata has required fields
  const fullMetadata: LinguisticMetadata = {
    ...metadata,
    partOfSpeech: (metadata.partOfSpeech as string | undefined) ?? "",
  };

  const wordNode = createGLOSTWordNode({
    value: text,
    transcription: fullTranscription,
    metadata: fullMetadata,
    lang: lang as any,
    script: script as any,
    extras,
  });
  
  // Add difficulty to node if provided
  if (difficulty) {
    (wordNode as any).difficulty = difficulty;
  }
  
  return wordNode;
}

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
export function createMockGLOSTDocument(
  wordsOrOptions: (string | GLOSTWord)[] | MockDocumentOptions,
  options: {
    lang?: string;
    script?: string;
  } = {},
): GLOSTRoot {
  // Handle object syntax
  if (!Array.isArray(wordsOrOptions)) {
    return createMockGLOSTDocumentFromSpec(wordsOrOptions);
  }

  // Handle array syntax (original behavior)
  const words = wordsOrOptions;
  const { lang = "en-US", script = "latin" } = options;

  const wordNodes: GLOSTWord[] = words.map((word) => {
    if (typeof word === "string") {
      return createMockGLOSTWord(word, { lang, script });
    }
    return word;
  });

  const sentence = createGLOSTSentenceNode({ originalText: "", lang: lang as any, script: script as any, children: wordNodes });
  const paragraph = createGLOSTParagraphNode([sentence]);
  const root = createGLOSTRootNode({ lang: lang as any, script: script as any, children: [paragraph] });

  return root;
}

/**
 * Create a mock document from a specification object
 */
function createMockGLOSTDocumentFromSpec(spec: MockDocumentOptions): GLOSTRoot {
  const { sentences, words, lang = "en-US", script = "latin" } = spec;

  // If words is provided without sentences, create a single sentence with those words
  const sentenceSpecs: MockSentenceSpec[] = sentences ??
    (words ? [{ words, lang, script }] : []);

  const sentenceNodes: GLOSTSentence[] = sentenceSpecs.map((sentenceSpec) => {
    const sentenceLang = sentenceSpec.lang ?? lang;
    const sentenceScript = sentenceSpec.script ?? script;
    const sentenceWords = sentenceSpec.words ?? [];
    const sentencePunctuation = sentenceSpec.punctuation ?? [];

    const wordNodes: GLOSTWord[] = sentenceWords.map((wordSpec) => {
      if (typeof wordSpec === "string") {
        return createMockGLOSTWord(wordSpec, { lang: sentenceLang, script: sentenceScript });
      }

      return createMockGLOSTWord(wordSpec.text, {
        lang: wordSpec.lang ?? sentenceLang,
        script: wordSpec.script ?? sentenceScript,
        metadata: wordSpec.partOfSpeech ? { partOfSpeech: wordSpec.partOfSpeech } : undefined,
        extras: wordSpec.extras,
      });
    });

    // Create punctuation nodes
    const punctuationNodes: GLOSTPunctuation[] = sentencePunctuation.map((p) =>
      createGLOSTPunctuationNode(p.text)
    );

    // Create sentence with words
    const sentence = createGLOSTSentenceNode({
      originalText: sentenceSpec.originalText ?? "",
      lang: sentenceLang as any,
      script: sentenceScript as any,
      children: wordNodes,
    });

    // Add punctuation nodes to sentence children
    if (punctuationNodes.length > 0) {
      sentence.children.push(...punctuationNodes);
    }

    return sentence;
  });

  // If no sentences provided, create an empty document
  if (sentenceNodes.length === 0) {
    const emptySentence = createGLOSTSentenceNode({ originalText: "", lang: lang as any, script: script as any, children: [] });
    sentenceNodes.push(emptySentence);
  }

  const paragraph = createGLOSTParagraphNode(sentenceNodes);
  const root = createGLOSTRootNode({ lang: lang as any, script: script as any, children: [paragraph] });

  return root;
}

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
export function createMockExtension(
  id: string,
  options: {
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
  } = {},
): import("./types").GLOSTExtension {
  const {
    name = `Test Extension ${id}`,
    description,
    enhanceMetadata,
    transform,
    visit,
    dependencies,
  } = options;

  return {
    id,
    name,
    description,
    enhanceMetadata,
    transform,
    visit,
    dependencies,
  };
}

