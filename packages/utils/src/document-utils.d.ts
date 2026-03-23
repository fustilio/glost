/**
 * Framework-Agnostic Document Utilities
 *
 * Utilities for extracting information from GLOST documents.
 *
 * This module re-exports utilities from glost where possible,
 * and adds additional utilities that are specific to document manipulation.
 */
import type { GLOSTWord, GLOSTSentence, GLOSTRoot } from "glost";
/**
 * Extract all words from an GLOST document
 *
 * Re-exports getWordsFromDocument from glost for consistency.
 */
export declare function getAllWordsFromDocument(doc: GLOSTRoot): GLOSTWord[];
/**
 * Get the first sentence from an GLOST document
 *
 * Returns the sentence node itself (not words).
 * Use getWordsFromFirstSentence if you need words.
 */
export declare function getFirstSentenceFromDocument(doc: GLOSTRoot): GLOSTSentence | null;
/**
 * Get words from the first sentence
 */
export declare function getWordsFromFirstSentence(doc: GLOSTRoot): GLOSTWord[];
/**
 * Get available transcription systems from a document
 *
 * Extracts all unique transcription system keys from words in the document.
 */
export declare function getDocumentTranscriptionSystems(doc: GLOSTRoot): string[];
/**
 * Check if a document has transcription data
 *
 * Returns true if any word in the document has transcription data.
 */
export declare function hasTranscriptionData(doc: GLOSTRoot): boolean;
/**
 * Get document language and script metadata
 *
 * Extracts basic metadata from the document root.
 */
export declare function getDocumentMetadata(doc: GLOSTRoot): {
    language: string;
    script: string;
    title: string | undefined;
    description: string | undefined;
};
/**
 * Get words from the first sentence (alias for getWordsFromFirstSentence)
 *
 * Note: This differs from glost's getFirstSentence which returns the sentence node.
 * This function returns the words array for convenience.
 */
export declare function getFirstSentence(doc: GLOSTRoot): GLOSTWord[];
/**
 * Get sentence translation from extras
 *
 * Re-exports getSentenceTranslation from glost.
 */
export declare function getSentenceTranslation(sentence: GLOSTSentence, language?: string): string | null;
//# sourceMappingURL=document-utils.d.ts.map