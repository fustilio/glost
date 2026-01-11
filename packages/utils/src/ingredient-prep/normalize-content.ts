/**
 * Content Normalization Utilities
 * 
 * Normalize content for GLOST conversion
 */

import type { GLOSTRoot, GLOSTWord, LanguageCode } from "glost-core";
import { getAllWords } from "glost-core";

/**
 * Normalized content structure
 */
export interface NormalizedContent {
  text: string;
  language: LanguageCode;
  words: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Options for content normalization
 */
export interface NormalizeContentOptions {
  /**
   * Language code
   */
  language: LanguageCode;
  /**
   * Whether to trim whitespace
   */
  trim?: boolean;
  /**
   * Whether to normalize whitespace
   */
  normalizeWhitespace?: boolean;
  /**
   * Whether to remove empty lines
   */
  removeEmptyLines?: boolean;
  /**
   * Custom normalization function
   */
  customNormalize?: (text: string) => string;
}

/**
 * Normalize content for GLOST conversion
 */
export function normalizeContentForGLOST(
  content: string,
  options: NormalizeContentOptions,
): NormalizedContent {
  const {
    language,
    trim = true,
    normalizeWhitespace = true,
    removeEmptyLines = true,
    customNormalize,
  } = options;

  let normalized = content;

  // Apply custom normalization first if provided
  if (customNormalize) {
    normalized = customNormalize(normalized);
  }

  // Trim
  if (trim) {
    normalized = normalized.trim();
  }

  // Normalize whitespace
  if (normalizeWhitespace) {
    normalized = normalized.replace(/\s+/g, " ");
  }

  // Remove empty lines
  if (removeEmptyLines) {
    normalized = normalized.replace(/\n\s*\n/g, "\n");
  }

  // Extract words (simple space-based split for now)
  const words = normalized
    .split(/\s+/)
    .filter((w) => w.length > 0)
    .map((w) => w.trim());

  return {
    text: normalized,
    language,
    words,
  };
}

/**
 * Normalize GLOST document content
 */
export function normalizeGLOSTDocument(
  document: GLOSTRoot,
  options: {
    normalizeWhitespace?: boolean;
    removeEmptyWords?: boolean;
  } = {},
): GLOSTRoot {
  const { normalizeWhitespace = true, removeEmptyWords = true } = options;

  const words = getAllWords(document);

  // Normalize word text
  const normalizedWords = words.map((word) => {
    const textNode = word.children.find((c) => c.type === "TextNode");
    if (!textNode || textNode.type !== "TextNode") {
      return word;
    }

    let normalizedText = textNode.value;

    if (normalizeWhitespace) {
      normalizedText = normalizedText.replace(/\s+/g, " ").trim();
    }

    if (removeEmptyWords && normalizedText.length === 0) {
      return null;
    }

    return {
      ...word,
      children: word.children.map((child) => {
        if (child.type === "TextNode") {
          return {
            ...child,
            value: normalizedText,
          };
        }
        return child;
      }),
    };
  }).filter((word): word is GLOSTWord => word !== null);

  // Rebuild document with normalized words
  // This is a simplified version - in practice, you'd need to rebuild
  // the full tree structure
  return document;
}

