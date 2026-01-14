/**
 * Thai Syllable Segmenter Extension
 *
 * Transforms Thai words into syllable nodes with simplified phonological structure.
 * This is a demo implementation using Intl.Segmenter for basic segmentation.
 *
 * Real implementations would use sophisticated DFA-based segmentation with
 * detailed phonological analysis (e.g., @fustilio/th-syllables).
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-plugins";
import type { GLOSTRoot, GLOSTWord, GLOSTSyllable, GLOSTCharacter } from "glost";
import { visit } from "unist-util-visit";
import { getWordText } from "glost";

/**
 * Thai Syllable Segmenter options
 */
export interface ThaiSyllableSegmenterOptions {
  /**
   * Whether to segment all Thai words or only words with specific language tags
   * @default true
   */
  segmentAllThai?: boolean;

  /**
   * Whether to include detailed character-level breakdown
   * @default true
   */
  includeCharacters?: boolean;

  /**
   * Whether to compute tone numbers from syllable structure
   * @default true
   */
  computeTones?: boolean;
}

/**
 * Simplified syllable parts structure for demo
 */
interface DemoSyllableParts {
  text: string;
  initialConsonant?: string;
  vowel?: string;
  finalConsonant?: string;
  toneMark?: string;
}

/**
 * Compute Thai tone number from tone mark
 *
 * This is a simplified demo implementation. Real implementations would
 * compute tones based on consonant class, vowel length, and final consonant.
 *
 * @param toneMark - The tone mark character
 * @returns Tone number (1-5) or undefined if cannot determine
 *
 * @internal
 */
function computeToneFromMark(toneMark: string): number | undefined {
  const toneMarkMap: Record<string, number> = {
    "่": 1, // Mai ek (low tone)
    "้": 2, // Mai tho (falling tone)
    "๊": 3, // Mai tri (high tone)
    "๋": 4, // Mai chattawa (rising tone)
  };
  return toneMarkMap[toneMark];
}

/**
 * Parse a Thai syllable into parts (simplified demo implementation)
 *
 * This is a basic implementation for demonstration. Real implementations
 * would use sophisticated phonological analysis.
 *
 * @param syllableText - The syllable text
 * @returns Parsed syllable parts
 *
 * @internal
 */
function parseSyllable(syllableText: string): DemoSyllableParts {
  const parts: DemoSyllableParts = { text: syllableText };

  // Extract tone marks (่ ้ ๊ ๋)
  const toneMarks = ["่", "้", "๊", "๋"];
  for (const mark of toneMarks) {
    if (syllableText.includes(mark)) {
      parts.toneMark = mark;
      break;
    }
  }

  // Simple heuristic: first character is likely initial consonant
  // This is a demo - real implementations would properly parse Thai orthography
  if (syllableText.length > 0) {
    const firstChar = syllableText[0];
    // Check if it's a Thai consonant (ก-ฮ)
    if (firstChar >= "\u0E01" && firstChar <= "\u0E2E") {
      parts.initialConsonant = firstChar;
    }
  }

  // Extract vowels (simplified - just identify common vowel patterns)
  // Real implementations would properly identify all Thai vowel forms
  const vowelPatterns = [
    /[เแโไใ]/g, // Leading vowels
    /[ะัิีึืุู]/g, // Vowel marks
  ];

  for (const pattern of vowelPatterns) {
    const matches = syllableText.match(pattern);
    if (matches && matches.length > 0) {
      parts.vowel = matches.join("");
      break;
    }
  }

  // Last character might be final consonant (if not a vowel mark)
  if (syllableText.length > 1) {
    const lastChar = syllableText[syllableText.length - 1];
    if (
      lastChar >= "\u0E01" &&
      lastChar <= "\u0E2E" &&
      !parts.toneMark &&
      lastChar !== parts.initialConsonant
    ) {
      parts.finalConsonant = lastChar;
    }
  }

  return parts;
}

/**
 * Create character nodes from syllable parts
 *
 * @param parts - The syllable parts
 * @returns Array of character nodes
 *
 * @internal
 */
function createCharacterNodes(parts: DemoSyllableParts): GLOSTCharacter[] {
  const characters: GLOSTCharacter[] = [];

  // Add initial consonant
  if (parts.initialConsonant) {
    characters.push({
      type: "CharacterNode",
      value: parts.initialConsonant,
      role: "consonant",
      placement: "initial",
      lang: "th-TH",
      script: "thai",
    });
  }

  // Add vowel characters
  if (parts.vowel) {
    for (const char of parts.vowel) {
      const codePoint = char.charCodeAt(0);
      let placement: "before" | "after" | "above" | "below" | "medial" = "after";

      // Leading vowels (เ, แ, โ, ไ, ใ)
      if ("\u0E40\u0E41\u0E42\u0E44\u0E43".includes(char)) {
        placement = "before";
      }
      // Above vowels (ิ, ี, ึ, ื, ั)
      else if (codePoint >= 0x0E34 && codePoint <= 0x0E36) {
        placement = "above";
      }
      // Below vowels (ุ, ู)
      else if (codePoint >= 0x0E38 && codePoint <= 0x0E39) {
        placement = "below";
      }

      characters.push({
        type: "CharacterNode",
        value: char,
        role: "vowel",
        placement,
        lang: "th-TH",
        script: "thai",
      });
    }
  }

  // Add final consonant
  if (parts.finalConsonant) {
    characters.push({
      type: "CharacterNode",
      value: parts.finalConsonant,
      role: "consonant",
      placement: "final",
      lang: "th-TH",
      script: "thai",
    });
  }

  // Add tone mark
  if (parts.toneMark) {
    characters.push({
      type: "CharacterNode",
      value: parts.toneMark,
      role: "tone",
      placement: "above",
      lang: "th-TH",
      script: "thai",
    });
  }

  return characters;
}

/**
 * Create a GLOST syllable node from parsed parts
 *
 * @param parts - The parsed syllable parts
 * @param options - Segmenter options
 * @returns GLOST syllable node
 *
 * @internal
 */
function createGLOSTSyllable(
  parts: DemoSyllableParts,
  options: ThaiSyllableSegmenterOptions,
): GLOSTSyllable {
  // Create syllable structure
  const structure: GLOSTSyllable["structure"] = {
    // Generic structure
    onset: parts.initialConsonant,
    nucleus: parts.vowel ?? "",
    coda: parts.finalConsonant,

    // Thai-specific structure
    Ci: parts.initialConsonant,
    V: parts.vowel,
    Cf: parts.finalConsonant,
    T: parts.toneMark,
  };

  // Create character nodes if requested
  const characters = options.includeCharacters
    ? createCharacterNodes(parts)
    : [];

  // Compute tone if requested
  const tone = options.computeTones && parts.toneMark
    ? computeToneFromMark(parts.toneMark)
    : undefined;

  return {
    type: "SyllableNode",
    structure,
    children: characters,
    lang: "th-TH",
    script: "thai",
    tone,
  };
}

/**
 * Segment a Thai word into syllables (simplified demo implementation)
 *
 * This uses Intl.Segmenter for basic segmentation. Real implementations
 * would use sophisticated DFA-based algorithms for accurate syllable boundaries.
 *
 * @param word - The GLOST word node to segment
 * @param options - Segmenter options
 * @returns Updated word node with syllable children, or null if segmentation fails
 *
 * @internal
 */
function segmentThaiWord(
  word: GLOSTWord,
  options: ThaiSyllableSegmenterOptions,
): GLOSTWord | null {
  // Get word text
  const text = getWordText(word);
  if (!text) return null;

  // Use Intl.Segmenter for basic word segmentation
  // This is a simplified demo - real implementations would use
  // sophisticated syllable boundary detection algorithms
  const segmenter = new Intl.Segmenter("th-TH", { granularity: "word" });
  const segments = Array.from(segmenter.segment(text));

  // Extract word-like segments
  const wordSegments = segments
    .filter((s) => s.isWordLike)
    .map((s) => s.segment);

  if (wordSegments.length === 0) {
    return null;
  }

  // For demo purposes, treat each word segment as a syllable
  // Real implementations would further segment into proper syllables
  const syllableNodes = wordSegments.map((segment) => {
    const parts = parseSyllable(segment);
    return createGLOSTSyllable(parts, options);
  });

  // Update word children with syllable nodes
  return {
    ...word,
    children: syllableNodes,
    extras: {
      ...word.extras,
      syllableCount: syllableNodes.length,
      segmented: true,
      segmentationMethod: "demo-intl-segmenter", // Track which method was used
    },
  };
}

/**
 * Create Thai Syllable Segmenter extension
 *
 * Creates a transformer extension that segments Thai words into syllables
 * with simplified phonological structure. This is a demo implementation
 * using Intl.Segmenter for basic segmentation.
 *
 * Real implementations would use sophisticated DFA-based segmentation
 * (e.g., @fustilio/th-syllables) for accurate syllable boundaries and
 * detailed phonological analysis.
 *
 * @param options - Extension configuration options
 * @returns Configured Thai syllable segmenter extension
 *
 * @example
 * ```typescript
 * import { createThaiSyllableSegmenterExtension } from "glost-plugins-thai";
 *
 * const extension = createThaiSyllableSegmenterExtension({
 *   segmentAllThai: true,
 *   includeCharacters: true,
 *   computeTones: true,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [extension]);
 *
 * // Result:
 * // Word("สวัสดี") becomes segmented into syllables with tone information
 * ```
 *
 * @see {@link ThaiSyllableSegmenterExtension} - Default extension
 *
 * @since 0.0.1
 */
export function createThaiSyllableSegmenterExtension(
  options: ThaiSyllableSegmenterOptions = {},
): GLOSTExtension {
  const {
    segmentAllThai = true,
    includeCharacters = true,
    computeTones = true,
  } = options;

  return {
    id: "thai-syllable-segmenter",
    name: "Thai Syllable Segmenter",
    description: "Segments Thai words into syllables with phonological structure (demo implementation)",

    transform: (document: GLOSTRoot) => {
      // Visit all word nodes
      visit(document, "WordNode", (node: any) => {
        const word = node as GLOSTWord;

        // Check if this is a Thai word
        const isThai =
          word.lang?.startsWith("th") ||
          word.script === "thai" ||
          (segmentAllThai && /[\u0E00-\u0E7F]/.test(getWordText(word)));

        if (!isThai) return;

        // Segment the word
        const segmented = segmentThaiWord(word, {
          segmentAllThai,
          includeCharacters,
          computeTones,
        });

        if (segmented) {
          // Replace word properties with segmented version
          Object.assign(node, segmented);
        }
      });

      return document;
    },
  };
}

/**
 * Default Thai Syllable Segmenter extension
 *
 * Pre-configured syllable segmenter with default options.
 * Use this for standard Thai syllable segmentation, or create a custom
 * extension with `createThaiSyllableSegmenterExtension()` for advanced use cases.
 *
 * @example
 * ```typescript
 * import { ThaiSyllableSegmenterExtension } from "glost-plugins-thai";
 * import { processGLOSTWithExtensions } from "glost-plugins";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   ThaiSyllableSegmenterExtension,
 * ]);
 *
 * // All Thai words in the document will be segmented into syllables
 * ```
 *
 * @see {@link createThaiSyllableSegmenterExtension} - Create custom extension
 *
 * @since 0.0.1
 */
export const ThaiSyllableSegmenterExtension =
  createThaiSyllableSegmenterExtension();
