/**
 * Thai Word Joiner Extension
 *
 * Transforms Thai word chunks (from Intl.Segmenter) into composite words
 * by checking if combined forms exist in the dictionary.
 *
 * Example: ซู + เปอร์ + มาร์เก็ต → ซูปอร์มาร์เก็ต
 *
 * @packageDocumentation
 */

import type { GLOSTASTExtension } from "glost-plugins";
import type {
  GLOSTRoot,
  GLOSTSentence,
  GLOSTWord,
  TransliterationData,
} from "glost";
import { getWordText, getAllWords, isGLOSTWord, createGLOSTWordNode } from "glost";
import { visit } from "unist-util-visit";
import { getDemoThaiTranscriptions, isWordInDemoVocabulary } from "./demo-data.js";

/**
 * Options for Thai word joiner extension
 */
export interface ThaiWordJoinerOptions {
  /**
   * Maximum number of consecutive words to try combining
   * @default 4
   */
  maxCombinationLength?: number;

  /**
   * Minimum number of words to combine (must be at least 2)
   * @default 2
   */
  minCombinationLength?: number;

  /**
   * Whether to process all Thai words or only words with specific language tags
   * @default true
   */
  processAllThai?: boolean;
}

/**
 * Check if a word exists in the demo vocabulary dictionary
 *
 * This is a demo implementation. Real implementations would use
 * comprehensive dictionary data.
 *
 * @param word - The word to check
 * @returns true if the word exists in the dictionary
 */
function isWordInDictionary(word: string): boolean {
  // Use demo vocabulary lookup
  // In a real implementation, this would check against a comprehensive dictionary
  return isWordInDemoVocabulary(word);
}

/**
 * Get text content from a word node
 */
function getWordTextContent(word: GLOSTWord): string {
  return getWordText(word);
}

/**
 * Merge multiple word nodes into a single composite word node
 *
 * @param words - Array of word nodes to merge
 * @param combinedText - The combined text string
 * @returns A new composite word node
 */
function mergeWordsIntoComposite(
  words: GLOSTWord[],
  combinedText: string
): GLOSTWord {
  // Get transcription for the combined word using demo data from glost-th
  // In a real implementation, this would use comprehensive dictionary lookups
  const combinedTranscriptions = getDemoThaiTranscriptions(combinedText);

  // Build transcription data
  const transcription: TransliterationData = {};
  if (combinedTranscriptions) {
    if (combinedTranscriptions["paiboon+"]) {
      transcription["paiboon+"] = {
        text: combinedTranscriptions["paiboon+"],
        system: "paiboon+",
      };
    }
    if (combinedTranscriptions.aua) {
      transcription.aua = {
        text: combinedTranscriptions.aua,
        system: "aua",
      };
    }
    if (combinedTranscriptions.rtgs) {
      transcription.rtgs = {
        text: combinedTranscriptions.rtgs,
        system: "rtgs",
      };
    }
    if (combinedTranscriptions.ipa) {
      transcription.ipa = {
        text: combinedTranscriptions.ipa,
        system: "ipa",
      };
    }
  }

  // If no transcription found, try to combine transcriptions from individual words
  if (Object.keys(transcription).length === 0) {
    // Combine transcriptions from individual words (space-separated)
    const schemes: Array<"paiboon+" | "aua" | "rtgs" | "ipa"> = [
      "paiboon+",
      "aua",
      "rtgs",
      "ipa",
    ];

    for (const scheme of schemes) {
      const parts: string[] = [];
      for (const word of words) {
        const wordTranscription = word.transcription[scheme];
        if (wordTranscription?.text) {
          parts.push(wordTranscription.text);
        }
      }
      if (parts.length > 0) {
        transcription[scheme] = {
          text: parts.join(" "),
          system: scheme,
        };
      }
    }
  }

  // Merge metadata from individual words
  const mergedExtras: any = {
    ...words[0]?.extras,
    originalChunks: words.map((w) => getWordTextContent(w)),
    isComposite: true,
  };

  // Merge other extras fields (take first non-null value)
  for (const word of words.slice(1)) {
    if (word.extras) {
      for (const [key, value] of Object.entries(word.extras)) {
        if (value !== undefined && value !== null && !(key in mergedExtras)) {
          mergedExtras[key] = value;
        }
      }
    }
  }

  // Get language and script from first word
  const lang = words[0]?.lang || "th-TH";
  const script = words[0]?.script || "thai";

  // Create composite word node
  // Use "word" level but mark as composite in extras
  return createGLOSTWordNode({
    value: combinedText,
    transcription,
    metadata: words[0]?.metadata || { partOfSpeech: "" },
    lang,
    script,
    extras: mergedExtras,
  });
}

/**
 * Try to combine consecutive words starting from a given index
 *
 * @param words - Array of word nodes
 * @param startIndex - Starting index
 * @param maxLength - Maximum number of words to try combining
 * @param minLength - Minimum number of words to combine
 * @returns Combined word node if successful, null otherwise
 */
function tryCombineWords(
  words: GLOSTWord[],
  startIndex: number,
  maxLength: number,
  minLength: number
): GLOSTWord | null {
  // Try longest combinations first
  for (
    let length = Math.min(maxLength, words.length - startIndex);
    length >= minLength;
    length--
  ) {
    const wordsToCombine = words.slice(startIndex, startIndex + length);
    const combinedText = wordsToCombine
      .map((w) => getWordTextContent(w))
      .join("");

    // Check if combined word exists in dictionary
    if (isWordInDictionary(combinedText)) {
      return mergeWordsIntoComposite(wordsToCombine, combinedText);
    }
  }

  return null;
}

/**
 * Process a sentence to combine word chunks into composite words
 *
 * @param sentence - The sentence node to process
 * @param options - Word joiner options
 */
function processSentence(
  sentence: GLOSTSentence,
  options: Required<ThaiWordJoinerOptions>
): void {
  const allChildren = sentence.children || [];
  if (allChildren.length === 0) {
    return;
  }

  // Build a map of Thai word indices
  const thaiWordIndices: number[] = [];
  for (let i = 0; i < allChildren.length; i++) {
    const child = allChildren[i];
    if (isGLOSTWord(child)) {
      const wordText = getWordTextContent(child);
      const isThai =
        child.lang?.startsWith("th") ||
        child.script === "thai" ||
        (options.processAllThai && /[\u0E00-\u0E7F]/.test(wordText));

      if (isThai) {
        thaiWordIndices.push(i);
      }
    }
  }

  // If no Thai words to process, return early
  // IMPORTANT: Don't modify sentence.children if we're not processing anything
  if (thaiWordIndices.length === 0) {
    return;
  }

  // Process Thai words to find combinations
  const processedIndices = new Set<number>();
  const replacements = new Map<number, GLOSTWord>();

  // Process Thai words to find combinations
  // Use a greedy approach: try to combine words starting from each position
  // and apply the first valid combination we find
  let i = 0;
  while (i < thaiWordIndices.length) {
    const currentIndex = thaiWordIndices[i];
    if (currentIndex === undefined || processedIndices.has(currentIndex)) {
      i++;
      continue;
    }

    // Get consecutive Thai words starting from this index
    const consecutiveIndices: number[] = [currentIndex];
    for (let j = i + 1; j < thaiWordIndices.length; j++) {
      const currentIdx = thaiWordIndices[j];
      const prevIdx = thaiWordIndices[j - 1];
      // Check if words are consecutive (no non-word nodes between them)
      if (
        currentIdx !== undefined &&
        prevIdx !== undefined &&
        currentIdx === prevIdx + 1
      ) {
        consecutiveIndices.push(currentIdx);
      } else {
        break;
      }
    }

    // Try to combine these consecutive words
    const wordsToCombine = consecutiveIndices.map(
      (idx) => allChildren[idx] as GLOSTWord
    );

    // Try to find a combination starting from the current position
    // We want to find the longest valid combination starting from position 0
    let foundCombination = false;
    for (let start = 0; start < wordsToCombine.length; start++) {
      const combined = tryCombineWords(
        wordsToCombine,
        start,
        Math.min(options.maxCombinationLength, wordsToCombine.length - start),
        options.minCombinationLength
      );

      if (combined) {
        const originalChunks = combined.extras?.originalChunks as
          | string[]
          | undefined;
        const count = originalChunks?.length || 1;

        // Apply this combination
        const startIdx = consecutiveIndices[start];
        if (startIdx !== undefined) {
          replacements.set(startIdx, combined);

          // Mark all words in the combination as processed
          for (let k = 0; k < count; k++) {
            if (startIdx + k < allChildren.length) {
              processedIndices.add(startIdx + k);
            }
          }

          // Skip past the words we just combined
          i += start + count;
          foundCombination = true;
          break;
        }
      }
    }

    // If no combination found, move to the next word
    if (!foundCombination) {
      i++;
    }
  }

  // Build new children array with replacements
  // Only modify if we actually made changes (have replacements or processed indices)
  // This ensures we don't clear word nodes if no combinations were found
  if (replacements.size === 0 && processedIndices.size === 0) {
    // No changes made, preserve original children
    return;
  }

  const newChildren: any[] = [];
  for (let i = 0; i < allChildren.length; i++) {
    // If this index has a replacement, use it
    if (replacements.has(i)) {
      // Replace with combined word
      newChildren.push(replacements.get(i));
      // Skip the remaining indices that were part of this combination
      // (they're already included in the composite word)
      continue;
    }

    // If this index was processed (part of a combination), skip it
    // because it's already included in the replacement at the start index
    if (processedIndices.has(i)) {
      continue;
    }

    // Otherwise, keep the original node
    newChildren.push(allChildren[i]);
  }

  // Safety check: ensure we don't accidentally clear all children
  if (newChildren.length === 0 && allChildren.length > 0) {
    // This should never happen, but if it does, preserve original children
    console.warn(
      "[Thai Word Joiner] Warning: Would clear all children, preserving original"
    );
    return;
  }

  sentence.children = newChildren;
}

/**
 * Create Thai Word Joiner extension
 *
 * Creates a transformer extension that combines consecutive Thai word chunks
 * into composite words by checking if the combined form exists in the dictionary.
 *
 * @param options - Extension configuration options
 * @returns Configured Thai word joiner extension
 *
 * @example
 * ```typescript
 * import { createThaiWordJoinerExtension } from "glost-plugins-thai";
 *
 * const extension = createThaiWordJoinerExtension({
 *   maxCombinationLength: 4,
 *   minCombinationLength: 2,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [extension]);
 *
 * // Result:
 * // Words: ["ซู", "เปอร์", "มาร์เก็ต"] becomes:
 * // Word("ซูปอร์มาร์เก็ต", level: "compound")
 * ```
 */
export function createThaiWordJoinerExtension(
  options: ThaiWordJoinerOptions = {}
): GLOSTASTExtension {
  const {
    maxCombinationLength = 4,
    minCombinationLength = 2,
    processAllThai = true,
  } = options;

  const requiredOptions: Required<ThaiWordJoinerOptions> = {
    maxCombinationLength,
    minCombinationLength: Math.max(2, minCombinationLength), // Ensure at least 2
    processAllThai,
  };

  return {
    id: "thai-word-joiner",
    name: "Thai Word Joiner",
    description:
      "Combines consecutive Thai word chunks into composite words by checking dictionary lookups",

    transform: (document: GLOSTRoot) => {
      // Visit all sentence nodes
      visit(document, "SentenceNode", (node: any) => {
        const sentence = node as GLOSTSentence;
        processSentence(sentence, requiredOptions);
      });

      return document;
    },
  };
}

/**
 * Default Thai Word Joiner extension
 *
 * Pre-configured word joiner with default options.
 */
export const ThaiWordJoinerExtension = createThaiWordJoinerExtension();
