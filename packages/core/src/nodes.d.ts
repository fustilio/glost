import type { LanguageCode, LinguisticMetadata, GLOSTExtras, GLOSTParagraph, GLOSTPunctuation, GLOSTRoot, GLOSTSentence, GLOSTSymbol, GLOSTText, GLOSTWhiteSpace, GLOSTWord, ScriptSystem, TransliterationData } from "./types.js";
/**
 * Options for creating a GLOST word node
 */
export interface CreateWordNodeOptions {
    /** The text value of the word */
    value: string;
    /** Transcription data (IPA, romanization, etc.) - optional */
    transcription?: TransliterationData;
    /** Linguistic metadata (part of speech, etc.) - optional */
    metadata?: LinguisticMetadata;
    /** Language code (ISO-639-1, ISO-639-3, or BCP-47) */
    lang?: LanguageCode;
    /** Script system used */
    script?: ScriptSystem;
    /** Additional extension data */
    extras?: GLOSTExtras;
}
/**
 * Options for creating a GLOST sentence node
 */
export interface CreateSentenceNodeOptions {
    /** The original text of the sentence */
    originalText: string;
    /** Language code */
    lang: LanguageCode;
    /** Script system used */
    script: ScriptSystem;
    /** Word nodes in the sentence */
    children?: GLOSTWord[];
    /** Optional transcription data */
    transcription?: TransliterationData;
    /** Additional extension data */
    extras?: GLOSTExtras;
}
/**
 * Options for creating a GLOST root node
 */
export interface CreateRootNodeOptions {
    /** Language code */
    lang: LanguageCode;
    /** Script system used */
    script: ScriptSystem;
    /** Paragraph nodes */
    children?: GLOSTParagraph[];
    /** Document metadata */
    metadata?: {
        title?: string;
        author?: string;
        date?: string;
        description?: string;
    };
    /** Additional extension data */
    extras?: GLOSTExtras;
}
/**
 * Options for creating a simple word node
 */
export interface CreateSimpleWordOptions {
    /** The text value of the word */
    text: string;
    /** Transliteration text */
    transliteration: string;
    /** Transcription system (default: "ipa") */
    system?: string;
    /** Part of speech (default: "unknown") */
    partOfSpeech?: string;
}
/**
 * Create a GLOST word node
 *
 * @example
 * ```typescript
 * const word = createGLOSTWordNode({
 *   value: "hello",
 *   transcription: { ipa: { text: "həˈloʊ", system: "ipa" } },
 *   metadata: { partOfSpeech: "interjection" },
 *   lang: "en",
 *   script: "latin"
 * });
 * ```
 */
export declare function createGLOSTWordNode(options: CreateWordNodeOptions): GLOSTWord;
/**
 * Create a GLOST sentence node
 *
 * @example
 * ```typescript
 * const sentence = createGLOSTSentenceNode({
 *   originalText: "Hello world",
 *   lang: "en",
 *   script: "latin",
 *   children: [wordNode1, wordNode2]
 * });
 * ```
 */
export declare function createGLOSTSentenceNode(options: CreateSentenceNodeOptions): GLOSTSentence;
/**
 * Create a GLOST paragraph node
 */
export declare function createGLOSTParagraphNode(children?: GLOSTSentence[], extras?: GLOSTExtras): GLOSTParagraph;
/**
 * Create a GLOST root node
 *
 * @example
 * ```typescript
 * const root = createGLOSTRootNode({
 *   lang: "en",
 *   script: "latin",
 *   children: [paragraphNode],
 *   metadata: { title: "My Document" }
 * });
 * ```
 */
export declare function createGLOSTRootNode(options: CreateRootNodeOptions): GLOSTRoot;
/**
 * Create a simple word node with basic transcription
 *
 * @example
 * ```typescript
 * const word = createSimpleWord({
 *   text: "hello",
 *   transliteration: "həˈloʊ",
 *   system: "ipa",
 *   partOfSpeech: "interjection"
 * });
 * ```
 */
export declare function createSimpleWord(options: CreateSimpleWordOptions): GLOSTWord;
/**
 * Create a sentence from an array of words
 */
export declare function createSentenceFromWords(words: GLOSTWord[], lang: LanguageCode, script: ScriptSystem, originalText?: string): GLOSTSentence;
/**
 * Create a paragraph from an array of sentences
 */
export declare function createParagraphFromSentences(sentences: GLOSTSentence[]): GLOSTParagraph;
/**
 * Create a document from an array of paragraphs
 */
export declare function createDocumentFromParagraphs(paragraphs: GLOSTParagraph[], lang: LanguageCode, script: ScriptSystem, metadata?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
}): GLOSTRoot;
/**
 * Create a document from an array of sentences (simplified helper)
 *
 * Automatically wraps sentences in a paragraph for convenience.
 * Useful when you don't need explicit paragraph structure.
 *
 * @param sentences - Array of sentences
 * @param lang - Language code
 * @param script - Script system (optional, will be inferred from lang if not provided)
 * @param metadata - Optional document metadata
 * @returns GLOST root document
 *
 * @example
 * ```typescript
 * const sentences = [
 *   createSentenceFromWords([word1, word2], "th", "thai", "สวัสดี"),
 *   createSentenceFromWords([word3, word4], "th", "thai", "ขอบคุณ")
 * ];
 * const doc = createDocumentFromSentences(sentences, "th", "thai");
 * ```
 */
export declare function createDocumentFromSentences(sentences: GLOSTSentence[], lang: LanguageCode, script: ScriptSystem, metadata?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
}): GLOSTRoot;
/**
 * Create a simple document from an array of words (simplified helper)
 *
 * Automatically creates sentence and paragraph wrappers for maximum convenience.
 * Perfect for testing, quick prototypes, and simple use cases.
 *
 * @param words - Array of word nodes
 * @param lang - Language code
 * @param script - Script system (optional, will be inferred from lang if not provided)
 * @param options - Optional configuration
 * @param options.sentenceText - Original text of the sentence (will be auto-generated if not provided)
 * @param options.metadata - Optional document metadata
 * @returns GLOST root document
 *
 * @example
 * ```typescript
 * import { createSimpleDocument } from "glost";
 * import { createThaiWord } from "glost-th";
 *
 * const words = [
 *   createThaiWord({ text: "สวัสดี" }),
 *   createThaiWord({ text: "ครับ" })
 * ];
 * const doc = createSimpleDocument(words, "th", "thai", {
 *   sentenceText: "สวัสดีครับ"
 * });
 * ```
 */
export declare function createSimpleDocument(words: GLOSTWord[], lang: LanguageCode, script: ScriptSystem, options?: {
    sentenceText?: string;
    metadata?: {
        title?: string;
        author?: string;
        date?: string;
        description?: string;
    };
}): GLOSTRoot;
/**
 * Create a GLOST punctuation node
 */
export declare function createGLOSTPunctuationNode(value: string): GLOSTPunctuation;
/**
 * Create a GLOST whitespace node
 */
export declare function createGLOSTWhiteSpaceNode(value: string): GLOSTWhiteSpace;
/**
 * Create a GLOST symbol node
 */
export declare function createGLOSTSymbolNode(value: string): GLOSTSymbol;
/**
 * Create a GLOST text node
 */
export declare function createGLOSTTextNode(value: string): GLOSTText;
//# sourceMappingURL=nodes.d.ts.map