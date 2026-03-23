// ============================================================================
// Node Factory Functions
// ============================================================================
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
export function createGLOSTWordNode(options) {
    const { value, transcription, metadata, lang, script, extras } = options;
    return {
        type: "WordNode",
        lang,
        script,
        transcription,
        metadata,
        extras,
        children: [createGLOSTTextNode(value)],
    };
}
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
export function createGLOSTSentenceNode(options) {
    const { originalText, lang, script, children = [], transcription, extras, } = options;
    return {
        type: "SentenceNode",
        originalText,
        lang,
        script,
        transcription,
        children,
        extras,
    };
}
/**
 * Create a GLOST paragraph node
 */
export function createGLOSTParagraphNode(children = [], extras) {
    return {
        type: "ParagraphNode",
        children,
        position: undefined,
        extras,
    };
}
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
export function createGLOSTRootNode(options) {
    const { lang, script, children = [], metadata, extras } = options;
    return {
        type: "RootNode",
        lang,
        script,
        metadata,
        children,
        position: undefined,
        extras,
    };
}
// ============================================================================
// Helper Functions for Common Patterns
// ============================================================================
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
export function createSimpleWord(options) {
    const { text, transliteration, system = "ipa", partOfSpeech = "unknown" } = options;
    const transcription = {
        [system]: {
            text: transliteration,
            syllables: [text],
        },
    };
    const metadata = {
        partOfSpeech,
    };
    return createGLOSTWordNode({ value: text, transcription, metadata });
}
/**
 * Create a sentence from an array of words
 */
export function createSentenceFromWords(words, lang, script, originalText) {
    const text = originalText ||
        words
            .map((w) => {
            // Extract text from word's Text node children
            const textNode = w.children.find((child) => child.type === "TextNode");
            return textNode ? textNode.value : "";
        })
            .join("");
    return createGLOSTSentenceNode({ originalText: text, lang, script, children: words });
}
/**
 * Create a paragraph from an array of sentences
 */
export function createParagraphFromSentences(sentences) {
    return createGLOSTParagraphNode(sentences);
}
/**
 * Create a document from an array of paragraphs
 */
export function createDocumentFromParagraphs(paragraphs, lang, script, metadata) {
    return createGLOSTRootNode({ lang, script, children: paragraphs, metadata });
}
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
export function createDocumentFromSentences(sentences, lang, script, metadata) {
    const paragraph = createParagraphFromSentences(sentences);
    return createDocumentFromParagraphs([paragraph], lang, script, metadata);
}
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
export function createSimpleDocument(words, lang, script, options) {
    const sentence = createSentenceFromWords(words, lang, script, options?.sentenceText);
    const paragraph = createParagraphFromSentences([sentence]);
    return createDocumentFromParagraphs([paragraph], lang, script, options?.metadata);
}
// ============================================================================
// NLCST Node Factory Functions
// ============================================================================
/**
 * Create a GLOST punctuation node
 */
export function createGLOSTPunctuationNode(value) {
    return {
        type: "PunctuationNode",
        value,
    };
}
/**
 * Create a GLOST whitespace node
 */
export function createGLOSTWhiteSpaceNode(value) {
    return {
        type: "WhiteSpaceNode",
        value,
    };
}
/**
 * Create a GLOST symbol node
 */
export function createGLOSTSymbolNode(value) {
    return {
        type: "SymbolNode",
        value,
    };
}
/**
 * Create a GLOST text node
 */
export function createGLOSTTextNode(value) {
    return {
        type: "TextNode",
        value,
    };
}
//# sourceMappingURL=nodes.js.map