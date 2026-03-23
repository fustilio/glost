import type { LanguageCode, GLOSTCharacter, GLOSTClause, GLOSTNode, GLOSTParagraph, GLOSTPhrase, GLOSTRoot, GLOSTSentence, GLOSTSyllable, GLOSTWord, TranscriptionSystem } from "./types.js";
/**
 * Parse a BCP-47 language tag into its components
 * Format: language[-script][-region][-variant]
 */
export declare function parseLanguageTag(tag: string): {
    language: string;
    script?: string;
    region?: string;
    variant?: string;
    fullTag: string;
};
/**
 * Get the base language from a BCP-47 tag
 * Examples: "en-US" -> "en", "zh-CN" -> "zh"
 */
export declare function getBaseLanguage(tag: string): string;
/**
 * Check if two language tags are compatible (same base language)
 * Examples: "en-US" and "en-GB" are compatible
 */
export declare function areLanguagesCompatible(tag1: string, tag2: string): boolean;
/**
 * Find the best matching language tag from available options
 * Prioritizes exact matches, then region matches, then base language matches
 */
export declare function findBestLanguageMatch(target: string, available: string[]): string | null;
/**
 * Get a fallback language tag when the exact one isn't available
 * Examples: "en-US" -> "en", "zh-CN" -> "zh"
 */
export declare function getLanguageFallback(tag: string): string;
/**
 * Normalize a language tag to standard format
 * Converts to lowercase and ensures proper formatting
 */
export declare function normalizeLanguageTag(tag: string): string;
/**
 * Check if a language tag is valid BCP-47 format
 */
export declare function isValidLanguageTag(tag: string): boolean;
/**
 * Get all word nodes from an GLOST tree
 */
export declare function getAllWords(node: GLOSTNode): GLOSTWord[];
/**
 * Get the first word from a document
 *
 * Convenience helper for accessing the first word in document order.
 * Returns undefined if no words are found.
 *
 * @param document - GLOST document root
 * @returns First word node or undefined
 *
 * @example
 * ```typescript
 * const doc = createSimpleDocument([word1, word2], "en");
 * const firstWord = getFirstWord(doc);
 * if (firstWord) {
 *   console.log(getWordText(firstWord));
 * }
 * ```
 */
export declare function getFirstWord(document: GLOSTRoot): GLOSTWord | undefined;
/**
 * Get word at specific path in document
 *
 * Navigate document hierarchy using paragraph, sentence, and word indices.
 * Returns undefined if path is invalid or doesn't exist.
 *
 * @param document - GLOST document root
 * @param path - Path specifying paragraph, sentence, and word indices (0-based)
 * @returns Word node at path or undefined
 *
 * @example
 * ```typescript
 * // Get the first word of the second sentence in the first paragraph
 * const word = getWordAtPath(doc, {
 *   paragraph: 0,
 *   sentence: 1,
 *   word: 0
 * });
 * ```
 */
export declare function getWordAtPath(document: GLOSTRoot, path: {
    paragraph: number;
    sentence: number;
    word: number;
}): GLOSTWord | undefined;
/**
 * Get all sentence nodes from an GLOST tree
 */
export declare function getAllSentences(node: GLOSTNode): GLOSTSentence[];
/**
 * Get all paragraph nodes from an GLOST tree
 */
export declare function getAllParagraphs(node: GLOSTNode): GLOSTParagraph[];
/**
 * Get all clause nodes from an GLOST tree
 */
export declare function getAllClauses(node: GLOSTNode): GLOSTClause[];
/**
 * Get all phrase nodes from an GLOST tree
 */
export declare function getAllPhrases(node: GLOSTNode): GLOSTPhrase[];
/**
 * Get all syllable nodes from an GLOST tree
 */
export declare function getAllSyllables(node: GLOSTNode): GLOSTSyllable[];
/**
 * Get all character nodes from an GLOST tree
 */
export declare function getAllCharacters(node: GLOSTNode): GLOSTCharacter[];
/**
 * Find nodes by type with better typing
 */
export declare function findNodesByType<T extends GLOSTNode>(node: GLOSTNode, type: string): T[];
/**
 * Get all words from a document with proper typing
 */
export declare function getWordsFromDocument(doc: GLOSTRoot): GLOSTWord[];
/**
 * Get the first sentence from a document
 */
export declare function getFirstSentence(doc: GLOSTRoot): GLOSTSentence | null;
/**
 * Get words from a specific sentence
 */
export declare function getWordsFromSentence(sentence: GLOSTSentence): GLOSTWord[];
/**
 * Get words from a specific paragraph
 */
export declare function getWordsFromParagraph(paragraph: GLOSTParagraph): GLOSTWord[];
/**
 * Find word nodes with specific language
 */
export declare function findWordsByLanguage(node: GLOSTNode, lang: LanguageCode): GLOSTWord[];
/**
 * Find word nodes with specific transcription system
 */
export declare function findWordsByTranscriptionSystem(node: GLOSTNode, system: TranscriptionSystem): GLOSTWord[];
/**
 * Enhanced type guards for the new GLOST types
 */
export declare function isGLOSTWord(node: any): node is GLOSTWord;
export declare function isGLOSTSentence(node: any): node is GLOSTSentence;
export declare function isGLOSTParagraph(node: any): node is GLOSTParagraph;
export declare function isGLOSTRoot(node: any): node is GLOSTRoot;
/**
 * Type guard for GLOSTClause nodes
 */
export declare function isGLOSTClause(node: any): node is GLOSTClause;
/**
 * Type guard for GLOSTPhrase nodes
 */
export declare function isGLOSTPhrase(node: any): node is GLOSTPhrase;
/**
 * Type guard for GLOSTSyllable nodes
 */
export declare function isGLOSTSyllable(node: any): node is GLOSTSyllable;
/**
 * Type guard for GLOSTCharacter nodes
 */
export declare function isGLOSTCharacter(node: any): node is GLOSTCharacter;
/**
 * Extract text value from a word node
 */
export declare function getWordText(word: GLOSTWord): string;
/**
 * Get transcription for a specific system
 */
export declare function getWordTranscription(word: GLOSTWord, system: TranscriptionSystem): string | null;
/**
 * Check if a word has transcription for a specific system
 */
export declare function hasWordTranscription(word: GLOSTWord, system: TranscriptionSystem): boolean;
/**
 * Get word translation for a specific language
 * @param word - The word node
 * @param language - Target language code (default: "en-US")
 * @returns Translation string or empty string if not found
 */
export declare function getWordTranslation(word: GLOSTWord, language?: string): string;
/**
 * Get word meaning/definition
 * @deprecated Use getWordTranslation for multi-language support.
 * This function is kept for backward compatibility.
 */
export declare function getWordMeaning(word: GLOSTWord): string;
/**
 * Get word part of speech
 */
export declare function getWordPartOfSpeech(word: GLOSTWord): string;
/**
 * Get word difficulty
 */
export declare function getWordDifficulty(word: GLOSTWord): string | number;
/**
 * Get sentence translation
 */
export declare function getSentenceTranslation(sentence: GLOSTSentence, language?: string): string | null;
/**
 * Generic paragraph structure for word count calculation
 * This interface allows converting external paragraph structures to GLOST format
 */
export type ParagraphLike = {
    sentences: Array<{
        sentence: string;
        translation?: string;
    }>;
};
/**
 * Convert a paragraph-like structure to GLOST format for word count calculation
 * This is a minimal adapter that only converts what's needed for word counting
 *
 * @param paragraph - Paragraph structure with sentences containing text and optional translations
 * @returns GLOST paragraph node
 *
 * @example
 * ```ts
 * const paragraph = {
 *   sentences: [
 *     { sentence: "Hello", translation: "สวัสดี" },
 *     { sentence: "World", translation: "โลก" }
 *   ]
 * };
 * const mtstParagraph = adaptParagraphLikeToGLOST(paragraph);
 * const wordCount = getGLOSTWordCount(mtstParagraph);
 * ```
 */
export declare function adaptParagraphLikeToGLOST(paragraph: ParagraphLike): GLOSTParagraph;
/**
 * Calculate word count from GLOST content
 * Counts words from sentence translations or original text
 *
 * @param content - GLOST paragraph, sentence, or root node
 * @param language - Optional language code for translation preference (default: 'en')
 * @returns Word count as a number, or undefined if content is empty
 *
 * @example
 * ```ts
 * const wordCount = getGLOSTWordCount(paragraph, 'en');
 * // Returns: 245
 * ```
 */
export declare function getGLOSTWordCount(content: GLOSTParagraph | GLOSTSentence | GLOSTRoot, language?: string): number | undefined;
//# sourceMappingURL=utils.d.ts.map