/**
 * @examples/en-transcription-ipa
 * 
 * English IPA Transcription Extension
 * 
 * Provides IPA (International Phonetic Alphabet) transcription for English words.
 * This is a GENERATOR extension - it creates new data (IPA transcriptions).
 * 
 * @packageDocumentation
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";

/**
 * Sample IPA dictionary for English words
 * 
 * In a real implementation, this would:
 * - Connect to a comprehensive phonetic dictionary (e.g., CMU Pronouncing Dictionary)
 * - Use G2P (grapheme-to-phoneme) models for unknown words
 * - Handle multiple pronunciations
 * - Include stress patterns and syllable boundaries
 */
const ENGLISH_IPA_DICTIONARY: Record<string, string> = {
  // Common words
  hello: "/həˈloʊ/",
  world: "/wɜːrld/",
  the: "/ðə/",
  a: "/ə/",
  is: "/ɪz/",
  it: "/ɪt/",
  to: "/tuː/",
  and: "/ænd/",
  of: "/əv/",
  in: "/ɪn/",
  
  // Complex pronunciations (showcase)
  ecclesiastical: "/ɪˌkliː.ziˈæs.tɪk.əl/",
  phenomenon: "/fəˈnɒm.ɪ.nən/",
  pronunciation: "/prəˌnʌn.siˈeɪ.ʃən/",
  worcestershire: "/ˈwʊs.tər.ʃər/",
  pneumonia: "/njuːˈmoʊ.niə/",
  colonel: "/ˈkɜːr.nəl/",
  queue: "/kjuː/",
  psychology: "/saɪˈkɒl.ə.dʒi/",
  knight: "/naɪt/",
  subtle: "/ˈsʌt.əl/",
  wednesday: "/ˈwɛnz.deɪ/",
  february: "/ˈfɛb.ru.ɛr.i/",
  
  // Technical terms
  algorithm: "/ˈæl.ɡə.rɪð.əm/",
  database: "/ˈdeɪ.tə.beɪs/",
  architecture: "/ˈɑːr.kɪ.tɛk.tʃər/",
  infrastructure: "/ˈɪn.frə.strʌk.tʃər/",
};

/**
 * Helper to extract word text from GLOST node
 */
function getWordText(word: GLOSTWord): string {
  const textNode = word.children.find((c) => c.type === "TextNode");
  return textNode && "value" in textNode ? textNode.value : "";
}

/**
 * English IPA Transcription Extension
 * 
 * This extension:
 * 1. Looks up words in the IPA dictionary
 * 2. Adds IPA transcription to word.extras.transcription
 * 3. Provides data for downstream extensions (like phonemic respelling)
 * 
 * @example
 * ```typescript
 * import { EnglishIPAExtension } from "@examples/en-transcription-ipa";
 * import { processGLOSTWithExtensions } from "glost-extensions";
 * 
 * const result = processGLOSTWithExtensions(document, [EnglishIPAExtension]);
 * 
 * // Words now have IPA:
 * // { text: "hello", extras: { transcription: { ipa: "/həˈloʊ/" } } }
 * ```
 */
export const EnglishIPAExtension: GLOSTExtension = {
  id: "en-transcription-ipa",
  name: "English IPA Transcription",
  description: "Adds IPA (International Phonetic Alphabet) transcription to English words",

  // This extension provides IPA transcription data
  provides: {
    extras: ["transcription"],
  },

  // Process each word node
  enhanceMetadata: (node: GLOSTWord) => {
    const text = getWordText(node).toLowerCase();
    if (!text) return;

    // Look up IPA transcription
    const ipa = ENGLISH_IPA_DICTIONARY[text];
    if (!ipa) {
      // Word not in dictionary - in production, use G2P model here
      return;
    }

    // Return IPA data
    return {
      transcription: {
        ipa,
        source: "dictionary" as const,
        language: "en",
      },
    };
  },
};

/**
 * Export dictionary for testing/inspection
 */
export { ENGLISH_IPA_DICTIONARY };
