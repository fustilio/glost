/**
 * Transcription Extension Examples
 *
 * Demonstrates extension stacking with:
 * - TranscriptionExtension: Adds IPA transcription to words
 * - IPARespellingExtension: Converts IPA to user-friendly phonemic respellings
 *
 * Shows the requires/provides contract and dependency validation in action.
 */

import { describe, it, expect } from "vitest";
import {
  createSimpleWord,
  createSentenceFromWords,
  createDocumentFromParagraphs,
  createParagraphFromSentences,
  getAllWords,
} from "glost";
import type { GLOSTExtension, ExtensionContext } from "glost-extensions";
import {
  processGLOSTWithExtensions,
  ExtensionDependencyError,
} from "glost-extensions";
import type { GLOSTWord } from "glost";

// ============================================================================
// Custom Extensions: Transcription System
// ============================================================================

/**
 * Sample IPA dictionary for demo purposes
 */
const IPA_DICTIONARY: Record<string, string> = {
  hello: "/həˈloʊ/",
  world: "/wɜːrld/",
  ecclesiastical: "/ɪˌkliː.ziˈæs.tɪk.əl/",
  phenomenon: "/fəˈnɒm.ɪ.nən/",
  pronunciation: "/prəˌnʌn.siˈeɪ.ʃən/",
  worcestershire: "/ˈwʊs.tər.ʃər/",
  queue: "/kjuː/",
  knight: "/naɪt/",
};

/**
 * IPA to English respelling mappings
 */
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

  // Consonants
  tʃ: "ch",
  dʒ: "j",
  θ: "th",
  ð: "th",
  ʃ: "sh",
  ʒ: "zh",
  ŋ: "ng",
  j: "y",
};

/**
 * Get word text from a GLOST word node
 */
function getWordText(word: GLOSTWord): string {
  const textNode = word.children.find((c) => c.type === "TextNode");
  return textNode && "value" in textNode ? textNode.value : "";
}

/**
 * Convert IPA to phonemic respelling
 */
function ipaToRespelling(ipa: string): string {
  // Remove slashes and brackets
  let cleaned = ipa.replace(/[\/\[\]]/g, "");

  const syllables: { text: string; stressed: boolean }[] = [];
  let currentSyllable = "";
  let currentStressed = false;

  // Sort IPA symbols by length for proper replacement
  const sortedSymbols = Object.keys(IPA_TO_RESPELLING).sort(
    (a, b) => b.length - a.length
  );

  let i = 0;
  while (i < cleaned.length) {
    const char = cleaned[i];

    // Check for stress marks
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

    // Try to match IPA symbols
    let matched = false;
    for (const symbol of sortedSymbols) {
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

  // Format: stressed syllables in CAPS
  return syllables
    .map((s) => (s.stressed ? s.text.toUpperCase() : s.text.toLowerCase()))
    .join("-");
}

/**
 * TranscriptionExtension - Adds IPA transcription
 *
 * Provides: extras.transcription
 */
const TranscriptionExtension: GLOSTExtension = {
  id: "transcription",
  name: "Transcription",
  description: "Adds IPA transcription to words",

  provides: {
    extras: ["transcription"],
  },

  enhanceMetadata: (node: GLOSTWord) => {
    const text = getWordText(node).toLowerCase();
    if (!text) return;

    const ipa = IPA_DICTIONARY[text];
    if (!ipa) return;

    return {
      transcription: {
        ipa,
        source: "dictionary" as const,
      },
    };
  },
};

/**
 * IPARespellingExtension - Converts IPA to user-friendly respelling
 *
 * Requires: extras.transcription (from TranscriptionExtension)
 * Provides: extras.respelling
 */
const IPARespellingExtension: GLOSTExtension = {
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

    const respelling = ipaToRespelling(transcription.ipa);

    return {
      respelling: {
        text: respelling,
        fromIPA: transcription.ipa,
      },
    };
  },
};

// ============================================================================
// Tests
// ============================================================================

describe("Transcription Extension System", () => {
  describe("TranscriptionExtension", () => {
    it("adds IPA transcription to words with dictionary entries", () => {
      const word = createSimpleWord("hello", "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      const result = processGLOSTWithExtensions(doc, [TranscriptionExtension]);

      const words = getAllWords(result.document);
      expect(words[0]?.extras?.transcription).toEqual({
        ipa: "/həˈloʊ/",
        source: "dictionary",
      });
    });

    it("skips words without dictionary entries", () => {
      const word = createSimpleWord("xyz", "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      const result = processGLOSTWithExtensions(doc, [TranscriptionExtension]);

      const words = getAllWords(result.document);
      expect(words[0]?.extras?.transcription).toBeUndefined();
    });

    it("declares what it provides via the provides contract", () => {
      expect(TranscriptionExtension.provides?.extras).toContain("transcription");
    });
  });

  describe("IPARespellingExtension", () => {
    it("converts IPA to phonemic respelling", () => {
      const word = createSimpleWord("hello", "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      // Stack both extensions
      const result = processGLOSTWithExtensions(doc, [
        TranscriptionExtension,
        IPARespellingExtension,
      ]);

      const words = getAllWords(result.document);
      expect(words[0]?.extras?.respelling).toEqual({
        text: "huh-LOH",
        fromIPA: "/həˈloʊ/",
      });
    });

    it("handles complex words with multiple syllables", () => {
      const word = createSimpleWord("ecclesiastical", "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      const result = processGLOSTWithExtensions(doc, [
        TranscriptionExtension,
        IPARespellingExtension,
      ]);

      const words = getAllWords(result.document);
      const respelling = words[0]?.extras?.respelling as { text: string };

      // /ɪˌkliː.ziˈæs.tɪk.əl/ -> ih-KLEE-zee-AS-tik-uhl
      expect(respelling?.text).toContain("KLEE"); // Primary stress
      expect(respelling?.text).toContain("-"); // Syllable separators
    });

    it("declares its requires/provides contract", () => {
      expect(IPARespellingExtension.requires?.extras).toContain("transcription");
      expect(IPARespellingExtension.provides?.extras).toContain("respelling");
      expect(IPARespellingExtension.dependencies).toContain("transcription");
    });
  });

  describe("Extension Stacking", () => {
    it("processes multiple words with stacked extensions", () => {
      const words = ["hello", "world", "ecclesiastical"].map((w) =>
        createSimpleWord(w, "en-US")
      );
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords(words)]),
      ]);

      const result = processGLOSTWithExtensions(doc, [
        TranscriptionExtension,
        IPARespellingExtension,
      ]);

      const processedWords = getAllWords(result.document);

      // All words should have transcription
      expect(processedWords[0]?.extras?.transcription).toBeDefined();
      expect(processedWords[1]?.extras?.transcription).toBeDefined();
      expect(processedWords[2]?.extras?.transcription).toBeDefined();

      // All words should have respelling
      expect(processedWords[0]?.extras?.respelling).toBeDefined();
      expect(processedWords[1]?.extras?.respelling).toBeDefined();
      expect(processedWords[2]?.extras?.respelling).toBeDefined();
    });

    it("respects extension ordering via dependencies", () => {
      const word = createSimpleWord("hello", "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      // Even if listed out of order, dependency resolution sorts correctly
      const result = processGLOSTWithExtensions(doc, [
        IPARespellingExtension, // Listed first but depends on transcription
        TranscriptionExtension, // Will be sorted to run first
      ]);

      // Both should work
      expect(result.metadata.appliedExtensions).toContain("transcription");
      expect(result.metadata.appliedExtensions).toContain("ipa-respelling");
    });

    it("throws when dependency is missing (in strict mode)", () => {
      const word = createSimpleWord("hello", "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      // Only provide IPARespellingExtension without TranscriptionExtension
      // This should fail because transcription data is required
      expect(() => {
        processGLOSTWithExtensions(doc, [IPARespellingExtension]);
      }).toThrow(ExtensionDependencyError);
    });

    it("skips extension in lenient mode when dependency fails", () => {
      const word = createSimpleWord("xyz", "en-US"); // Not in dictionary
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([word])]),
      ]);

      // TranscriptionExtension will not add data (word not in dictionary)
      // IPARespellingExtension will fail (no transcription data)
      // In lenient mode, it should skip and continue
      const result = processGLOSTWithExtensions(
        doc,
        [TranscriptionExtension, IPARespellingExtension],
        { lenient: true }
      );

      expect(result.metadata.appliedExtensions).toContain("transcription");
      expect(result.metadata.skippedExtensions).toContain("ipa-respelling");
      expect(result.metadata.errors.length).toBeGreaterThan(0);
    });
  });

  describe("Phonemic Respelling Examples", () => {
    /**
     * These examples show common English words and their IPA-to-respelling conversions.
     * The respelling format uses:
     * - lowercase for unstressed syllables
     * - UPPERCASE for stressed syllables
     * - hyphens to separate syllables
     */

    it.each([
      ["hello", "/həˈloʊ/", "huh-LOH"],
      ["world", "/wɜːrld/", "erld"], // Single syllable, no stress mark
      ["queue", "/kjuː/", "kyoo"],
      ["knight", "/naɪt/", "neyet"],
    ])('converts "%s" (%s) to "%s"', (word, _ipa, expectedRespelling) => {
      const wordNode = createSimpleWord(word, "en-US");
      const doc = createDocumentFromParagraphs([
        createParagraphFromSentences([createSentenceFromWords([wordNode])]),
      ]);

      const result = processGLOSTWithExtensions(doc, [
        TranscriptionExtension,
        IPARespellingExtension,
      ]);

      const words = getAllWords(result.document);
      const respelling = words[0]?.extras?.respelling as { text: string };
      expect(respelling?.text).toBe(expectedRespelling);
    });
  });
});

describe("Use Case: Language Learning App", () => {
  it("shows pronunciation guide for vocabulary", () => {
    // Create a vocabulary list
    const vocabWords = ["hello", "world", "phenomenon", "queue"];
    const words = vocabWords.map((w) => createSimpleWord(w, "en-US"));
    const doc = createDocumentFromParagraphs([
      createParagraphFromSentences([createSentenceFromWords(words)]),
    ]);

    // Process with transcription extensions
    const result = processGLOSTWithExtensions(doc, [
      TranscriptionExtension,
      IPARespellingExtension,
    ]);

    // Build pronunciation guide
    const guide = getAllWords(result.document)
      .map((word) => {
        const text = getWordText(word);
        const transcription = word.extras?.transcription as { ipa: string } | undefined;
        const respelling = word.extras?.respelling as { text: string } | undefined;

        if (!transcription) {
          return `${text}: (no pronunciation available)`;
        }

        return `${text}: ${transcription.ipa} (${respelling?.text || "?"})`;
      })
      .join("\n");

    // Verify structure
    expect(guide).toContain("hello: /həˈloʊ/ (huh-LOH)");
    expect(guide).toContain("world: /wɜːrld/");
    expect(guide).toContain("phenomenon: /fəˈnɒm.ɪ.nən/");
    expect(guide).toContain("queue: /kjuː/ (kyoo)");
  });
});
