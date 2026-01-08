/**
 * IPA Phonemic Respelling Extension
 *
 * Converts IPA to user-friendly phonemic respellings.
 * Example: /ɪˌkliː.ziˈæs.tɪk.əl/ becomes "ih-KLEE-zee-AS-tik-uhl"
 *
 * REQUIRES: transcription extension to run first
 */

import type { GLOSTExtension } from "glost-extensions";
import type { GLOSTWord } from "glost";
import { ExtensionDependencyError } from "glost-extensions";

const IPA_TO_RESPELLING: Record<string, string> = {
  // Vowels
  "iː": "ee",
  ɪ: "ih",
  eɪ: "ay",
  ɛ: "eh",
  æ: "a",
  "ɑː": "ah",
  ɒ: "o",
  "ɔː": "aw",
  oʊ: "oh",
  ʊ: "oo",
  "uː": "oo",
  ʌ: "uh",
  "ɜː": "er",
  ə: "uh",
  aɪ: "eye",
  aʊ: "ow",
  ɔɪ: "oy",

  // Consonants
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

const SORTED_SYMBOLS = Object.keys(IPA_TO_RESPELLING).sort(
  (a, b) => b.length - a.length
);

function ipaToRespelling(ipa: string): string {
  let cleaned = ipa.replace(/[\/\[\]]/g, "");

  const syllables: { text: string; stressed: boolean }[] = [];
  let currentSyllable = "";
  let currentStressed = false;

  let i = 0;
  while (i < cleaned.length) {
    const char = cleaned[i];

    if (char === "ˈ") {
      if (currentSyllable) {
        syllables.push({ text: currentSyllable, stressed: currentStressed });
        currentSyllable = "";
      }
      currentStressed = true;
      i++;
      continue;
    }

    if (char === "ˌ" || char === ".") {
      if (currentSyllable) {
        syllables.push({ text: currentSyllable, stressed: currentStressed });
        currentSyllable = "";
      }
      currentStressed = false;
      i++;
      continue;
    }

    let matched = false;
    for (const symbol of SORTED_SYMBOLS) {
      if (cleaned.substring(i).startsWith(symbol)) {
        currentSyllable += IPA_TO_RESPELLING[symbol];
        i += symbol.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      currentSyllable += cleaned[i];
      i++;
    }
  }

  if (currentSyllable) {
    syllables.push({ text: currentSyllable, stressed: currentStressed });
  }

  return syllables
    .map((s) => (s.stressed ? s.text.toUpperCase() : s.text.toLowerCase()))
    .join("-");
}

export const IPARespellingExtension: GLOSTExtension = {
  id: "ipa-respelling",
  name: "IPA Phonemic Respelling",
  description: "Converts IPA to user-friendly respellings",

  dependencies: ["transcription"],

  requires: {
    extras: ["transcription"],
  },

  provides: {
    extras: ["respelling"],
  },

  enhanceMetadata: (node: GLOSTWord) => {
    const transcription = node.extras?.transcription as
      | { ipa: string }
      | undefined;

    if (!transcription?.ipa) {
      throw new ExtensionDependencyError(
        "ipa-respelling",
        "transcription",
        "extras.transcription.ipa",
        "TranscriptionExtension must run before IPARespellingExtension."
      );
    }

    return {
      respelling: {
        text: ipaToRespelling(transcription.ipa),
        fromIPA: transcription.ipa,
      },
    };
  },
};
