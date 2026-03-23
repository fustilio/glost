// ============================================================================
// Node Type Constants
// ============================================================================
/**
 * Standard GLOST node type constants
 *
 * Use these constants instead of string literals for type checking to prevent
 * typos and enable autocomplete.
 *
 * @example
 * ```typescript
 * import { NODE_TYPES } from "glost";
 *
 * if (node.type === NODE_TYPES.WORD) {
 *   // Handle word node with autocomplete and type safety
 * }
 * ```
 */
export const NODE_TYPES = {
    /** Root document node */
    ROOT: "RootNode",
    /** Paragraph node */
    PARAGRAPH: "ParagraphNode",
    /** Sentence node */
    SENTENCE: "SentenceNode",
    /** Word node */
    WORD: "WordNode",
    /** Text node (leaf node containing actual text) */
    TEXT: "TextNode",
    /** Whitespace node */
    WHITESPACE: "WhiteSpaceNode",
    /** Punctuation node */
    PUNCTUATION: "PunctuationNode",
    /** Symbol node */
    SYMBOL: "SymbolNode",
    /** Source node */
    SOURCE: "SourceNode",
    /** Clause node (created by transformers) */
    CLAUSE: "ClauseNode",
    /** Phrase node (created by transformers) */
    PHRASE: "PhraseNode",
    /** Syllable node */
    SYLLABLE: "SyllableNode",
    /** Character node */
    CHARACTER: "CharacterNode",
};
// ============================================================================
// Utility Types
// ============================================================================
// Type guards are now implemented in utils.ts using unist-util-is
//# sourceMappingURL=types.js.map