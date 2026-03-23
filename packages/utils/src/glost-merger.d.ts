/**
 * Framework-Agnostic GLOST Data Merging and Extending Utilities
 *
 * Provides utilities for merging transcription data, extending metadata,
 * and hydrating GLOST documents with additional data from various sources.
 */
import type { GLOSTWord, GLOSTRoot } from "glost";
import type { ITranscriptionProvider } from "./interfaces.js";
/**
 * Merge transcription data from a provider into an existing GLOST word
 */
export declare function mergeTranscriptionData(word: GLOSTWord, transcriptionProvider: ITranscriptionProvider, transcriptionScheme: string): GLOSTWord;
/**
 * Merge transcription data into all words in an GLOST document
 */
export declare function mergeTranscriptionDataIntoDocument(document: GLOSTRoot, transcriptionProvider: ITranscriptionProvider, transcriptionScheme: string): GLOSTRoot;
/**
 * Metadata options for extending GLOST words
 *
 * Note: `translation` is stored in `extras.translations["en-US"]`
 * The deprecated fields (meaning, shortDefinition, fullDefinition) are no longer used.
 */
export interface ExtendMetadataOptions {
    /** Translation (stored in extras.translations) */
    translation?: string;
    /** Target language for translation (default: "en-US") */
    translationLanguage?: string;
    /** Part of speech */
    partOfSpeech?: string;
    /** Difficulty level */
    difficulty?: "beginner" | "intermediate" | "advanced";
}
/**
 * Extend GLOST word with metadata
 *
 * Uses the canonical `extras.translations` pattern for translations.
 */
export declare function extendGLOSTWithMetadata(word: GLOSTWord, metadata: ExtendMetadataOptions): GLOSTWord;
/**
 * Extend GLOST document with metadata for all words
 */
export declare function extendGLOSTDocumentWithMetadata(document: GLOSTRoot, metadataMap: Map<string, ExtendMetadataOptions>): GLOSTRoot;
/**
 * Hydrate GLOST document with all available data
 *
 * This function fetches and merges:
 * - Transcription data from providers
 * - Metadata (if provided)
 * - Any other available data sources
 */
export declare function hydrateGLOSTDocument(document: GLOSTRoot, options: {
    transcriptionProvider: ITranscriptionProvider;
    transcriptionSchemes?: string[];
    metadataMap?: Map<string, ExtendMetadataOptions>;
}): GLOSTRoot;
/**
 * Filter GLOST document by gender
 *
 * Removes or neutralizes gender markers that don't match the filter
 */
export declare function filterGLOSTByGender(document: GLOSTRoot, genderFilter: "male" | "female"): GLOSTRoot;
//# sourceMappingURL=glost-merger.d.ts.map