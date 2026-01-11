/**
 * Framework-Agnostic Document Utilities
 * 
 * Utilities for extracting information from GLOST documents.
 * 
 * This module re-exports utilities from glost where possible,
 * and adds additional utilities that are specific to document manipulation.
 */

import type { GLOSTWord, GLOSTSentence, GLOSTRoot } from "glost-core";
import {
  getAllWords,
  getWordsFromDocument,
  getFirstSentence as getFirstSentenceFromGLOST,
  getWordsFromSentence,
  getSentenceTranslation as getSentenceTranslationFromGLOST,
} from "glost-core";

/**
 * Extract all words from an GLOST document
 * 
 * Re-exports getWordsFromDocument from glost for consistency.
 */
export function getAllWordsFromDocument(doc: GLOSTRoot): GLOSTWord[] {
  return getWordsFromDocument(doc);
}

/**
 * Get the first sentence from an GLOST document
 * 
 * Returns the sentence node itself (not words).
 * Use getWordsFromFirstSentence if you need words.
 */
export function getFirstSentenceFromDocument(doc: GLOSTRoot): GLOSTSentence | null {
  return getFirstSentenceFromGLOST(doc);
}

/**
 * Get words from the first sentence
 */
export function getWordsFromFirstSentence(doc: GLOSTRoot): GLOSTWord[] {
  const firstSentence = getFirstSentenceFromDocument(doc);
  if (!firstSentence) return [];
  return getWordsFromSentence(firstSentence);
}

/**
 * Get available transcription systems from a document
 * 
 * Extracts all unique transcription system keys from words in the document.
 */
export function getDocumentTranscriptionSystems(doc: GLOSTRoot): string[] {
  const words = getAllWordsFromDocument(doc);
  if (words.length === 0) return [];

  const firstWord = words[0];
  if (!firstWord) return [];

  return Object.keys(firstWord.transcription || {});
}

/**
 * Check if a document has transcription data
 * 
 * Returns true if any word in the document has transcription data.
 */
export function hasTranscriptionData(doc: GLOSTRoot): boolean {
  const words = getAllWordsFromDocument(doc);
  return words.some((word) => Object.keys(word.transcription || {}).length > 0);
}

/**
 * Get document language and script metadata
 * 
 * Extracts basic metadata from the document root.
 */
export function getDocumentMetadata(doc: GLOSTRoot) {
  return {
    language: doc.lang,
    script: doc.script,
    title: doc.metadata?.title,
    description: doc.metadata?.description,
  };
}

/**
 * Get words from the first sentence (alias for getWordsFromFirstSentence)
 * 
 * Note: This differs from glost's getFirstSentence which returns the sentence node.
 * This function returns the words array for convenience.
 */
export function getFirstSentence(doc: GLOSTRoot): GLOSTWord[] {
  return getWordsFromFirstSentence(doc);
}

/**
 * Get sentence translation from extras
 * 
 * Re-exports getSentenceTranslation from glost.
 */
export function getSentenceTranslation(
  sentence: GLOSTSentence,
  language = "en",
): string | null {
  return getSentenceTranslationFromGLOST(sentence, language);
}

