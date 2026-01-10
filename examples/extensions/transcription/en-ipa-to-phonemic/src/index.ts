/**
 * glost-en-ipa-to-phonemic-example
 * 
 * English IPA to Phonemic Respelling Extension
 * 
 * Converts IPA transcriptions to user-friendly phonemic respellings.
 * This is an ENHANCER extension - it transforms existing data (IPA → respelling).
 * 
 * REQUIRES: An extension that provides IPA transcription (e.g., en-transcription-ipa)
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import { ExtensionDependencyError } from "glost-extensions";

/**
 * Mapping from IPA symbols to user-friendly respelling
 * 
 * Format: reader-friendly phonemic representation
 * Example: /ɪˌkliː.ziˈæs.tɪk.əl/ → "ih-KLEE-zee-AS-tik-uhl"
 */
const IPA_TO_PHONEMIC: Record<string, string> = {
  // Long vowels
  "iː": "ee",
  "uː": "oo",
  "ɑː": "ah",
  "ɔː": "aw",
  "ɜː": "er",
  
  // Short vowels
  ɪ: "ih",
  ɛ: "eh",
  æ: "a",
  ɒ: "o",
  ʊ: "oo",
  ʌ: "uh",
  ə: "uh",
  
  // Diphthongs
  eɪ: "ay",
  aɪ: "eye",
  ɔɪ: "oy",
  oʊ: "oh",
  aʊ: "ow",
  
  // Consonants (special cases)
  tʃ: "ch",
  dʒ: "j",
  θ: "th",
  ð: "th",
  ʃ: "sh",
  ʒ: "zh",
  ŋ: "ng",
  j: "y",
  ʰ: "h",
};

/**
 * Sort symbols by length (longest first) for greedy matching
 */
const SORTED_IPA_SYMBOLS = Object.keys(IPA_TO_PHONEMIC).sort(
  (a, b) => b.length - a.length
);

/**
 * Convert IPA string to phonemic respelling
 * 
 * Features:
 * - Extracts syllables
 * - Identifies primary stress (ˈ)
 * - Converts IPA symbols to readable format
 * - Uppercases stressed syllables
 * - Joins with hyphens
 * 
 * @param ipa - IPA string (e.g., "/həˈloʊ/")
 * @returns Phonemic respelling (e.g., "huh-LOH")
 * 
 * @example
 * ```typescript
 * ipaToPhonemic("/ɪˌkliː.ziˈæs.tɪk.əl/")
 * // Returns: "ih-KLEE-zee-AS-tik-uhl"
 * 
 * ipaToPhonemic("/ˈwʊs.tər.ʃər/")
 * // Returns: "WOOS-ter-sher"  (Worcestershire!)
 * ```
 */
export function ipaToPhonemic(ipa: string): string {
  // Remove IPA delimiters
  let cleaned = ipa.replace(/[\/\[\]]/g, "");

  // Track syllables with stress information
  const syllables: { text: string; stressed: boolean }[] = [];
  let currentSyllable = "";
  let currentStressed = false;

  let i = 0;
  while (i < cleaned.length) {
    const char = cleaned[i];

    // Primary stress marker
    if (char === "ˈ") {
      if (currentSyllable) {
        syllables.push({ text: currentSyllable, stressed: currentStressed });
        currentSyllable = "";
      }
      currentStressed = true;
      i++;
      continue;
    }

    // Secondary stress or syllable boundary
    if (char === "ˌ" || char === ".") {
      if (currentSyllable) {
        syllables.push({ text: currentSyllable, stressed: currentStressed });
        currentSyllable = "";
      }
      currentStressed = false;
      i++;
      continue;
    }

    // Try to match IPA symbols
    let matched = false;
    for (const symbol of SORTED_IPA_SYMBOLS) {
      if (cleaned.substring(i).startsWith(symbol)) {
        currentSyllable += IPA_TO_PHONEMIC[symbol];
        i += symbol.length;
        matched = true;
        break;
      }
    }

    // If no IPA mapping, keep the character as-is
    if (!matched) {
      currentSyllable += cleaned[i];
      i++;
    }
  }

  // Add final syllable
  if (currentSyllable) {
    syllables.push({ text: currentSyllable, stressed: currentStressed });
  }

  // Format: uppercase stressed syllables, lowercase others
  return syllables
    .map((s) => (s.stressed ? s.text.toUpperCase() : s.text.toLowerCase()))
    .join("-");
}

/**
 * English IPA to Phonemic Respelling Extension
 * 
 * This extension:
 * 1. Requires IPA transcription from another extension
 * 2. Converts IPA to user-friendly phonemic respelling
 * 3. Adds respelling to word.extras.respelling
 * 
 * **Extension Composition Example**:
 * ```
 * [EnglishIPAExtension] → Provides IPA
 *           ↓
 * [IPAToPhonemic Extension] → Consumes IPA, produces respelling
 * ```
 * 
 * @example
 * ```typescript
 * import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";
 * import { EnglishIPAToPhonemic Extension } from "glost-en-ipa-to-phonemic-example";
 * import { processGLOSTWithExtensions } from "glost-extensions";
 * 
 * // Compose both extensions
 * const result = processGLOSTWithExtensions(document, [
 *   EnglishIPAExtension,          // Step 1: Add IPA
 *   EnglishIPAToPhonemic Extension  // Step 2: Convert IPA to respelling
 * ]);
 * 
 * // Words now have both IPA and respelling:
 * // {
 * //   text: "ecclesiastical",
 * //   extras: {
 * //     transcription: { ipa: "/ɪˌkliː.ziˈæs.tɪk.əl/" },
 * //     respelling: { text: "ih-KLEE-zee-AS-tik-uhl", fromIPA: "..." }
 * //   }
 * // }
 * ```
 */
export const EnglishIPAToPhonemicExtension: GLOSTExtension = {
  id: "en-ipa-to-phonemic",
  name: "English IPA to Phonemic Respelling",
  description: "Converts IPA transcription to user-friendly phonemic respelling",

  // This extension REQUIRES IPA from another extension
  dependencies: ["en-transcription-ipa"],
  requires: {
    extras: ["transcription"],
  },

  // This extension PROVIDES phonemic respelling
  provides: {
    extras: ["respelling"],
  },

  // Process each word node
  enhanceMetadata: (node: GLOSTWord) => {
    // Check if IPA transcription exists
    const transcription = node.extras?.transcription as
      | { ipa: string }
      | undefined;

    if (!transcription?.ipa) {
      // No IPA available - this extension can't run
      throw new ExtensionDependencyError(
        "en-ipa-to-phonemic",
        "en-transcription-ipa",
        "extras.transcription.ipa",
        "IPA transcription must be available. Ensure en-transcription-ipa (or similar) runs first."
      );
    }

    // Convert IPA to phonemic respelling
    const respelling = ipaToPhonemic(transcription.ipa);

    // Return respelling data
    return {
      respelling: {
        text: respelling,
        fromIPA: transcription.ipa,
        format: "phonemic",
      },
    };
  },
};

// ipaToPhonemic is already exported above
