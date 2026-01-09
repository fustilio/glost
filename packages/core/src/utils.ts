import { is as isNode } from "unist-util-is";
import { visit } from "unist-util-visit";

import type {
  LanguageCode,
  GLOSTCharacter,
  GLOSTClause,
  GLOSTNode,
  GLOSTParagraph,
  GLOSTPhrase,
  GLOSTRoot,
  GLOSTSentence,
  GLOSTSyllable,
  GLOSTWord,
  TranscriptionSystem,
} from "./types.js";

// ============================================================================
// BCP-47 Language Tag Utilities
// ============================================================================

/**
 * Parse a BCP-47 language tag into its components
 * Format: language[-script][-region][-variant]
 */
export function parseLanguageTag(tag: string): {
  language: string;
  script?: string;
  region?: string;
  variant?: string;
  fullTag: string;
} {
  const parts = tag.split("-");
  const result = {
    language: parts[0] || "",
    script: undefined as string | undefined,
    region: undefined as string | undefined,
    variant: undefined as string | undefined,
    fullTag: tag,
  };

  if (parts.length >= 2) {
    // Check if second part is a script (4 letters) or region (2-3 letters)
    if (parts[1] && parts[1].length === 4 && /^[A-Za-z]{4}$/.test(parts[1])) {
      result.script = parts[1];
      if (parts.length >= 3 && parts[2]) {
        result.region = parts[2];
        if (parts.length >= 4) {
          result.variant = parts.slice(3).join("-");
        }
      }
    } else {
      // Second part is likely a region
      if (parts[1]) {
        result.region = parts[1];
        if (parts.length >= 3) {
          result.variant = parts.slice(2).join("-");
        }
      }
    }
  }

  return result;
}

/**
 * Get the base language from a BCP-47 tag
 * Examples: "en-US" -> "en", "zh-CN" -> "zh"
 */
export function getBaseLanguage(tag: string): string {
  const parts = tag.split("-");
  return parts[0] || tag;
}

/**
 * Check if two language tags are compatible (same base language)
 * Examples: "en-US" and "en-GB" are compatible
 */
export function areLanguagesCompatible(tag1: string, tag2: string): boolean {
  return getBaseLanguage(tag1) === getBaseLanguage(tag2);
}

/**
 * Find the best matching language tag from available options
 * Prioritizes exact matches, then region matches, then base language matches
 */
export function findBestLanguageMatch(
  target: string,
  available: string[],
): string | null {
  if (available.includes(target)) {
    return target;
  }

  const targetParts = parseLanguageTag(target);

  // Try to find region-specific matches
  for (const option of available) {
    const optionParts = parseLanguageTag(option);
    if (
      optionParts.language === targetParts.language &&
      optionParts.region === targetParts.region
    ) {
      return option;
    }
  }

  // Try to find base language matches
  for (const option of available) {
    const optionParts = parseLanguageTag(option);
    if (optionParts.language === targetParts.language) {
      return option;
    }
  }

  return null;
}

/**
 * Get a fallback language tag when the exact one isn't available
 * Examples: "en-US" -> "en", "zh-CN" -> "zh"
 */
export function getLanguageFallback(tag: string): string {
  const parts = parseLanguageTag(tag);
  return parts.language;
}

/**
 * Normalize a language tag to standard format
 * Converts to lowercase and ensures proper formatting
 */
export function normalizeLanguageTag(tag: string): string {
  const parts = tag.split("-");
  const language = parts[0]?.toLowerCase() || "";

  if (parts.length === 1) {
    return language;
  }

  // Handle script (4 letters, title case)
  if (parts[1] && parts[1].length === 4) {
    const script = parts[1]
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());

    if (parts.length === 2) {
      return `${language}-${script}`;
    }

    // Handle region (2-3 letters, uppercase)
    const region = parts[2]?.toUpperCase() || "";

    if (parts.length === 3) {
      return `${language}-${script}-${region}`;
    }

    // Handle variants (lowercase)
    const variants = parts.slice(3).join("-").toLowerCase();
    return `${language}-${script}-${region}-${variants}`;
  } else {
    // No script, just language-region
    const region = parts[1]?.toUpperCase() || "";

    if (parts.length === 2) {
      return `${language}-${region}`;
    }

    // Handle variants
    const variants = parts.slice(2).join("-").toLowerCase();
    return `${language}-${region}-${variants}`;
  }
}

/**
 * Check if a language tag is valid BCP-47 format
 */
export function isValidLanguageTag(tag: string): boolean {
  // Basic BCP-47 validation
  const bcp47Pattern =
    /^[a-z]{2,3}(-[A-Za-z]{4})?(-[A-Za-z]{2,3})?(-[A-Za-z0-9]+)*$/;
  return bcp47Pattern.test(tag);
}

// ============================================================================
// Enhanced Tree Traversal Utilities (using unist-util-visit)
// ============================================================================

/**
 * Get all word nodes from an GLOST tree
 */
export function getAllWords(node: GLOSTNode): GLOSTWord[] {
  const words: GLOSTWord[] = [];

  visit(node, "WordNode", (wordNode) => {
    if (isGLOSTWord(wordNode)) {
      words.push(wordNode);
    }
  });

  return words;
}

/**
 * Get all sentence nodes from an GLOST tree
 */
export function getAllSentences(node: GLOSTNode): GLOSTSentence[] {
  const sentences: GLOSTSentence[] = [];

  visit(node, "SentenceNode", (sentenceNode) => {
    if (isGLOSTSentence(sentenceNode)) {
      sentences.push(sentenceNode);
    }
  });

  return sentences;
}

/**
 * Get all paragraph nodes from an GLOST tree
 */
export function getAllParagraphs(node: GLOSTNode): GLOSTParagraph[] {
  const paragraphs: GLOSTParagraph[] = [];

  visit(node, "ParagraphNode", (paragraphNode) => {
    if (isGLOSTParagraph(paragraphNode)) {
      paragraphs.push(paragraphNode);
    }
  });

  return paragraphs;
}

/**
 * Get all clause nodes from an GLOST tree
 */
export function getAllClauses(node: GLOSTNode): GLOSTClause[] {
  const clauses: GLOSTClause[] = [];

  visit(node, "ClauseNode", (clauseNode) => {
    if (isGLOSTClause(clauseNode)) {
      clauses.push(clauseNode);
    }
  });

  return clauses;
}

/**
 * Get all phrase nodes from an GLOST tree
 */
export function getAllPhrases(node: GLOSTNode): GLOSTPhrase[] {
  const phrases: GLOSTPhrase[] = [];

  visit(node, "PhraseNode", (phraseNode) => {
    if (isGLOSTPhrase(phraseNode)) {
      phrases.push(phraseNode);
    }
  });

  return phrases;
}

/**
 * Get all syllable nodes from an GLOST tree
 */
export function getAllSyllables(node: GLOSTNode): GLOSTSyllable[] {
  const syllables: GLOSTSyllable[] = [];

  visit(node, "SyllableNode", (syllableNode) => {
    if (isGLOSTSyllable(syllableNode)) {
      syllables.push(syllableNode);
    }
  });

  return syllables;
}

/**
 * Get all character nodes from an GLOST tree
 */
export function getAllCharacters(node: GLOSTNode): GLOSTCharacter[] {
  const characters: GLOSTCharacter[] = [];

  visit(node, "CharacterNode", (characterNode) => {
    if (isGLOSTCharacter(characterNode)) {
      characters.push(characterNode);
    }
  });

  return characters;
}

/**
 * Find nodes by type with better typing
 */
export function findNodesByType<T extends GLOSTNode>(
  node: GLOSTNode,
  type: string,
): T[] {
  const results: T[] = [];

  visit(node, type, (foundNode) => {
    results.push(foundNode as T);
  });

  return results;
}

// ============================================================================
// New Utilities for Transcription Components
// ============================================================================

/**
 * Get all words from a document with proper typing
 */
export function getWordsFromDocument(doc: GLOSTRoot): GLOSTWord[] {
  return getAllWords(doc);
}

/**
 * Get the first sentence from a document
 */
export function getFirstSentence(doc: GLOSTRoot): GLOSTSentence | null {
  const paragraphs = getAllParagraphs(doc);
  if (paragraphs.length === 0) return null;

  const firstParagraph = paragraphs[0];
  if (!firstParagraph) return null;

  const sentences = getAllSentences(firstParagraph);
  if (sentences.length === 0) return null;

  const firstSentence = sentences[0];
  return firstSentence || null;
}

/**
 * Get words from a specific sentence
 */
export function getWordsFromSentence(sentence: GLOSTSentence): GLOSTWord[] {
  return getAllWords(sentence);
}

/**
 * Get words from a specific paragraph
 */
export function getWordsFromParagraph(paragraph: GLOSTParagraph): GLOSTWord[] {
  const words: GLOSTWord[] = [];

  visit(paragraph, "WordNode", (wordNode) => {
    if (isGLOSTWord(wordNode)) {
      words.push(wordNode);
    }
  });

  return words;
}

/**
 * Find word nodes with specific language
 */
export function findWordsByLanguage(
  node: GLOSTNode,
  lang: LanguageCode,
): GLOSTWord[] {
  const words = getAllWords(node);
  return words.filter((word) => word.lang === lang);
}

/**
 * Find word nodes with specific transcription system
 */
export function findWordsByTranscriptionSystem(
  node: GLOSTNode,
  system: TranscriptionSystem,
): GLOSTWord[] {
  const words = getAllWords(node);
  return words.filter(
    (word) => word.transcription && word.transcription[system],
  );
}

// ============================================================================
// Enhanced Type Guards (using unist-util-is)
// ============================================================================

/**
 * Enhanced type guards for the new GLOST types
 */
export function isGLOSTWord(node: any): node is GLOSTWord {
  return (
    isNode(node, "WordNode") && "transcription" in node && "metadata" in node
  );
}

export function isGLOSTSentence(node: any): node is GLOSTSentence {
  return (
    isNode(node, "SentenceNode") &&
    "lang" in node &&
    "script" in node &&
    "originalText" in node
  );
}

export function isGLOSTParagraph(node: any): node is GLOSTParagraph {
  return isNode(node, "ParagraphNode");
}

export function isGLOSTRoot(node: any): node is GLOSTRoot {
  return isNode(node, "Root") && "lang" in node && "script" in node;
}

/**
 * Type guard for GLOSTClause nodes
 */
export function isGLOSTClause(node: any): node is GLOSTClause {
  return isNode(node, "ClauseNode") && "clauseType" in node;
}

/**
 * Type guard for GLOSTPhrase nodes
 */
export function isGLOSTPhrase(node: any): node is GLOSTPhrase {
  return isNode(node, "PhraseNode") && "phraseType" in node;
}

/**
 * Type guard for GLOSTSyllable nodes
 */
export function isGLOSTSyllable(node: any): node is GLOSTSyllable {
  return isNode(node, "SyllableNode") && "structure" in node;
}

/**
 * Type guard for GLOSTCharacter nodes
 */
export function isGLOSTCharacter(node: any): node is GLOSTCharacter {
  return isNode(node, "CharacterNode") && "value" in node;
}

// ============================================================================
// Utility Functions for Transcription Components
// ============================================================================

/**
 * Extract text value from a word node
 */
export function getWordText(word: GLOSTWord): string {
  const textNode = word.children.find((child) => child.type === "TextNode");
  return textNode?.value ?? "";
}

/**
 * Get transcription for a specific system
 */
export function getWordTranscription(
  word: GLOSTWord,
  system: TranscriptionSystem,
): string | null {
  return word.transcription[system]?.text ?? null;
}

/**
 * Check if a word has transcription for a specific system
 */
export function hasWordTranscription(
  word: GLOSTWord,
  system: TranscriptionSystem,
): boolean {
  return system in word.transcription && !!word.transcription[system]?.text;
}

/**
 * Get word translation for a specific language
 * @param word - The word node
 * @param language - Target language code (default: "en-US")
 * @returns Translation string or empty string if not found
 */
export function getWordTranslation(
  word: GLOSTWord,
  language = "en-US",
): string {
  // Check extras.translations first (preferred format)
  if (word.extras?.translations?.[language]) {
    return word.extras.translations[language];
  }
  // Also check short language code (e.g., "en" for "en-US")
  const shortLang = language.split("-")[0];
  if (shortLang && word.extras?.translations?.[shortLang]) {
    return word.extras.translations[shortLang];
  }
  return "";
}

/**
 * Get word meaning/definition
 * @deprecated Use getWordTranslation for multi-language support.
 * This function is kept for backward compatibility.
 */
export function getWordMeaning(word: GLOSTWord): string {
  // Priority: extras.translations (preferred) > metadata.meaning (deprecated) > shortDefinition (deprecated)
  const translation = getWordTranslation(word, "en-US");
  if (translation) return translation;

  return (
    word.metadata?.meaning ?? word.shortDefinition ?? word.fullDefinition ?? ""
  );
}

/**
 * Get word part of speech
 */
export function getWordPartOfSpeech(word: GLOSTWord): string {
  return word.metadata?.partOfSpeech ?? "";
}

/**
 * Get word difficulty
 */
export function getWordDifficulty(word: GLOSTWord): string | number {
  return word.difficulty ?? word.extras?.metadata?.difficulty ?? "";
}

/**
 * Get sentence translation
 */
export function getSentenceTranslation(
  sentence: GLOSTSentence,
  language = "en",
): string | null {
  if (sentence.extras?.translations?.[language]) {
    return sentence.extras.translations[language];
  }

  // Fallback: build from word meanings
  const words = getWordsFromSentence(sentence);
  const wordMeanings = words
    .map((word) => getWordMeaning(word))
    .filter(Boolean)
    .join(" ");

  return wordMeanings || null;
}

// ============================================================================
// Content Statistics Utilities
// ============================================================================

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
export function adaptParagraphLikeToGLOST(
  paragraph: ParagraphLike,
): GLOSTParagraph {
  return {
    type: "ParagraphNode",
    children: paragraph.sentences.map((sentence) => ({
      type: "SentenceNode",
      lang: "unknown",
      script: "unknown",
      originalText: sentence.sentence,
      children: [],
      extras: {
        translations: sentence.translation
          ? { en: sentence.translation }
          : undefined,
      },
    })),
  };
}

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
export function getGLOSTWordCount(
  content: GLOSTParagraph | GLOSTSentence | GLOSTRoot,
  language = "en",
): number | undefined {
  if (isGLOSTParagraph(content)) {
    const sentences = getAllSentences(content);
    if (sentences.length === 0) {
      return undefined;
    }

    return sentences.reduce((count, sentence) => {
      const translation = getSentenceTranslation(sentence, language);
      const text = translation || sentence.originalText || "";
      return count + text.split(/\s+/).filter((word) => word.length > 0).length;
    }, 0);
  }

  if (isGLOSTSentence(content)) {
    const translation = getSentenceTranslation(content, language);
    const text = translation || content.originalText || "";
    if (!text) {
      return undefined;
    }
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }

  if (isGLOSTRoot(content)) {
    const paragraphs = getAllParagraphs(content);
    if (paragraphs.length === 0) {
      return undefined;
    }

    return paragraphs.reduce((count, paragraph) => {
      const paragraphCount = getGLOSTWordCount(paragraph, language);
      return count + (paragraphCount ?? 0);
    }, 0);
  }

  return undefined;
}
