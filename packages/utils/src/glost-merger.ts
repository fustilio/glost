/**
 * Framework-Agnostic GLOST Data Merging and Extending Utilities
 *
 * Provides utilities for merging transcription data, extending metadata,
 * and hydrating GLOST documents with additional data from various sources.
 */

import type { GLOSTWord, GLOSTRoot, GLOSTNode, GLOSTParagraph, GLOSTSentence, TransliterationData } from "glost";
import { getAllWords, isGLOSTWord, isGLOSTParagraph, isGLOSTSentence } from "glost";
import type { ITranscriptionProvider } from "./interfaces.js";

/**
 * Map over an GLOST tree, applying a transformation function to each word node
 * while preserving the tree structure.
 */
function mapGLOSTTree(
  node: GLOSTNode,
  transformWord: (word: GLOSTWord) => GLOSTWord,
): GLOSTNode {
  if (isGLOSTWord(node)) {
    return transformWord(node);
  }

  if (isGLOSTSentence(node)) {
    return {
      ...node,
      children: node.children.map((child) => mapGLOSTTree(child, transformWord)),
    } as GLOSTSentence;
  }

  if (isGLOSTParagraph(node)) {
    return {
      ...node,
      children: node.children.map((child) => mapGLOSTTree(child, transformWord)),
    } as GLOSTParagraph;
  }

  // For other node types (text, punctuation, whitespace, etc.), return as-is
  return node;
}

/**
 * Map over an GLOST document root, applying a transformation function to each word
 * while preserving the complete tree structure.
 */
function mapGLOSTDocument(
  document: GLOSTRoot,
  transformWord: (word: GLOSTWord) => GLOSTWord,
): GLOSTRoot {
  return {
    ...document,
    children: document.children.map((child) => mapGLOSTTree(child, transformWord)),
  } as GLOSTRoot;
}

/**
 * Merge transcription data from a provider into an existing GLOST word
 */
export function mergeTranscriptionData(
  word: GLOSTWord,
  transcriptionProvider: ITranscriptionProvider,
  transcriptionScheme: string,
): GLOSTWord {
  // If word already has transcription for this scheme, don't overwrite
  if (word.transcription[transcriptionScheme]) {
    return word;
  }

  // Get text content from word
  const textNode = word.children.find((child) => child.type === "TextNode");
  if (!textNode || textNode.type !== "TextNode") {
    return word;
  }

  const text = textNode.value;
  const transcription = transcriptionProvider.getTranscription(text, transcriptionScheme);

  if (transcription) {
    // Merge transcription data
    const updatedTranscription: TransliterationData = {
      ...word.transcription,
      [transcriptionScheme]: {
        text: transcription,
      },
    };

    return {
      ...word,
      transcription: updatedTranscription,
    };
  }

  return word;
}

/**
 * Merge transcription data into all words in an GLOST document
 */
export function mergeTranscriptionDataIntoDocument(
  document: GLOSTRoot,
  transcriptionProvider: ITranscriptionProvider,
  transcriptionScheme: string,
): GLOSTRoot {
  return mapGLOSTDocument(document, (word) =>
    mergeTranscriptionData(word, transcriptionProvider, transcriptionScheme),
  );
}

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
export function extendGLOSTWithMetadata(
  word: GLOSTWord,
  metadata: ExtendMetadataOptions,
): GLOSTWord {
  const translationLanguage = metadata.translationLanguage ?? "en-US";

  // Build updated extras with translations
  const updatedExtras = {
    ...word.extras,
    ...(metadata.translation && {
      translations: {
        ...word.extras?.translations,
        [translationLanguage]: metadata.translation,
      },
    }),
  };

  return {
    ...word,
    metadata: {
      ...word.metadata,
      partOfSpeech: metadata.partOfSpeech ?? word.metadata?.partOfSpeech ?? "",
    },
    extras: Object.keys(updatedExtras).length > 0 ? updatedExtras : word.extras,
    difficulty: metadata.difficulty ?? word.difficulty,
  };
}

/**
 * Extend GLOST document with metadata for all words
 */
export function extendGLOSTDocumentWithMetadata(
  document: GLOSTRoot,
  metadataMap: Map<string, ExtendMetadataOptions>,
): GLOSTRoot {
  return mapGLOSTDocument(document, (word) => {
    const textNode = word.children.find((child) => child.type === "TextNode");
    const text = textNode && textNode.type === "TextNode" ? textNode.value : "";
    const metadata = metadataMap.get(text);

    if (metadata) {
      return extendGLOSTWithMetadata(word, metadata);
    }
    return word;
  });
}

/**
 * Hydrate GLOST document with all available data
 *
 * This function fetches and merges:
 * - Transcription data from providers
 * - Metadata (if provided)
 * - Any other available data sources
 */
export function hydrateGLOSTDocument(
  document: GLOSTRoot,
  options: {
    transcriptionProvider: ITranscriptionProvider;
    transcriptionSchemes?: string[];
    metadataMap?: Map<string, ExtendMetadataOptions>;
  },
): GLOSTRoot {
  let hydratedDocument = document;
  const { transcriptionProvider, transcriptionSchemes = [], metadataMap } = options;

  // Merge transcription data for each scheme
  for (const scheme of transcriptionSchemes) {
    hydratedDocument = mergeTranscriptionDataIntoDocument(
      hydratedDocument,
      transcriptionProvider,
      scheme,
    );
  }

  // Extend with metadata if provided
  if (metadataMap) {
    hydratedDocument = extendGLOSTDocumentWithMetadata(
      hydratedDocument,
      metadataMap,
    );
  }

  return hydratedDocument;
}

/**
 * Filter GLOST document by gender
 *
 * Removes or neutralizes gender markers that don't match the filter
 */
export function filterGLOSTByGender(
  document: GLOSTRoot,
  genderFilter: "male" | "female",
): GLOSTRoot {
  return mapGLOSTDocument(document, (word) => {
    const gender = word.extras?.gender;

    // If word has gender that doesn't match filter, remove gender marker
    if (gender && gender !== genderFilter) {
      const { gender: _, ...restExtras } = word.extras || {};
      return {
        ...word,
        extras: Object.keys(restExtras).length > 0 ? restExtras : undefined,
      };
    }

    return word;
  });
}

