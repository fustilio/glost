/**
 * Negation Transformer Extension
 *
 * Transforms clauses or sentences by adding negation.
 * Requires ClauseSegmenterExtension to run first for clause-level negation.
 *
 * Supports language-specific negation patterns:
 * - English: Adds "don't", "doesn't", "didn't" based on tense
 * - Thai: Adds "ไม่" before the main verb
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type {
  GLOSTRoot,
  GLOSTClause,
  GLOSTSentence,
  GLOSTWord,
  LanguageCode,
} from "@glost/core";
import { visit } from "unist-util-visit";
import { getWordText, getAllClauses } from "@glost/core";

/**
 * Negation type
 */
export type NegationType = "standard" | "emphatic";

/**
 * Negation transformer extension options
 */
export interface NegationTransformerOptions {
  /**
   * Language for negation rules
   * @default "en-US"
   */
  language?: LanguageCode;

  /**
   * Which clause index to negate (undefined = negate all main clauses)
   * @default undefined
   */
  clauseIndex?: number;

  /**
   * Type of negation
   * - "standard": Normal negation (not, ไม่)
   * - "emphatic": Strong negation (never, ไม่เคย)
   * @default "standard"
   */
  negationType?: NegationType;

  /**
   * Whether to negate only main clauses or all clauses
   * @default true (only main clauses)
   */
  mainClausesOnly?: boolean;
}

/**
 * Negation data stored in extras
 */
export interface NegationData {
  /** Whether this clause/sentence is negated */
  isNegated: boolean;
  /** The original (affirmative) text */
  originalForm?: string;
  /** The negation word(s) added */
  negationWord?: string;
  /** Type of negation applied */
  negationType?: NegationType;
}

// ============================================================================
// Language-specific negation helpers
// ============================================================================

/**
 * English negation words
 */
const ENGLISH_NEGATION = {
  standard: {
    present: "don't",
    presentThird: "doesn't",
    past: "didn't",
    future: "won't",
    continuous: "not",
  },
  emphatic: {
    present: "never",
    presentThird: "never",
    past: "never",
    future: "never",
    continuous: "never",
  },
};

/**
 * Thai negation words
 */
const THAI_NEGATION = {
  standard: "ไม่", // mai (not)
  emphatic: "ไม่เคย", // mai khoei (never)
  past: "ไม่ได้", // mai dai (didn't)
};

/**
 * Create a negation word node
 */
function createNegationWord(
  text: string,
  lang: LanguageCode
): GLOSTWord {
  return {
    type: "WordNode",
    transcription: {},
    metadata: {
      partOfSpeech: "adverb",
    },
    lang,
    script: lang.startsWith("th") ? "thai" : "latin",
    children: [
      {
        type: "TextNode",
        value: text,
      },
    ],
    extras: {
      isNegationWord: true,
    },
  } as GLOSTWord;
}

/**
 * Find the position to insert negation for English
 */
function findEnglishNegationPosition(
  words: GLOSTWord[]
): { position: number; negationWord: string } {
  // Look for auxiliary verbs (is, are, was, were, has, have, had, will, would, can, could, etc.)
  const auxiliaries = [
    "is",
    "are",
    "was",
    "were",
    "am",
    "has",
    "have",
    "had",
    "will",
    "would",
    "can",
    "could",
    "shall",
    "should",
    "may",
    "might",
    "must",
  ];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) continue;

    const text = getWordText(word).toLowerCase();

    // If we find an auxiliary, negate after it
    if (auxiliaries.includes(text)) {
      return {
        position: i + 1, // Insert after auxiliary
        negationWord: "not",
      };
    }
  }

  // No auxiliary found - need to add do/does/did
  // Find the main verb (first verb after subject)
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) continue;

    const pos = word.metadata?.partOfSpeech;
    if (pos === "verb") {
      return {
        position: i,
        negationWord: "don't", // Simplified - would need tense detection
      };
    }
  }

  // Default: insert at position 1 (after first word/subject)
  return {
    position: 1,
    negationWord: "don't",
  };
}

/**
 * Find the position to insert negation for Thai
 */
function findThaiNegationPosition(
  words: GLOSTWord[]
): { position: number; negationWord: string } {
  // Thai: ไม่ goes before the verb
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) continue;

    const pos = word.metadata?.partOfSpeech;
    if (pos === "verb") {
      return {
        position: i,
        negationWord: THAI_NEGATION.standard,
      };
    }
  }

  // Default: insert at position 1
  return {
    position: 1,
    negationWord: THAI_NEGATION.standard,
  };
}

/**
 * Negate a clause
 */
function negateClause(
  clause: GLOSTClause,
  options: {
    language: LanguageCode;
    clauseIndex?: number;
    negationType: NegationType;
    mainClausesOnly: boolean;
  }
): GLOSTClause {
  // Already negated?
  if (clause.extras?.isNegated) {
    return clause;
  }

  const lang = clause.lang || options.language;
  const words = clause.children.filter(
    (c): c is GLOSTWord => c.type === "WordNode"
  );

  // Find negation position based on language
  let negationInfo: { position: number; negationWord: string };

  if (lang.startsWith("th")) {
    negationInfo = findThaiNegationPosition(words);
    if (options.negationType === "emphatic") {
      negationInfo.negationWord = THAI_NEGATION.emphatic;
    }
  } else {
    negationInfo = findEnglishNegationPosition(words);
    if (options.negationType === "emphatic") {
      negationInfo.negationWord = ENGLISH_NEGATION.emphatic.present;
    }
  }

  // Create negation word node
  const negationWord = createNegationWord(negationInfo.negationWord, lang);

  // Build original form for reference
  const originalForm = words.map((w) => getWordText(w)).join(" ");

  // Insert negation word at the right position
  const newChildren = [...clause.children];
  let insertIndex = 0;
  let wordCount = 0;

  // Find the actual index in children (accounting for punctuation, etc.)
  for (let i = 0; i < newChildren.length; i++) {
    if (newChildren[i]?.type === "WordNode") {
      if (wordCount === negationInfo.position) {
        insertIndex = i;
        break;
      }
      wordCount++;
    }
    insertIndex = i + 1;
  }

  newChildren.splice(insertIndex, 0, negationWord);

  // Build negation data
  const negationData: NegationData = {
    isNegated: true,
    originalForm,
    negationWord: negationInfo.negationWord,
    negationType: options.negationType,
  };

  return {
    ...clause,
    children: newChildren,
    extras: {
      ...clause.extras,
      ...negationData,
    },
  };
}

/**
 * Create Negation Transformer extension
 *
 * Creates a transformer extension that negates clauses or sentences.
 * This extension REQUIRES ClauseSegmenterExtension to run first
 * for clause-level negation.
 *
 * @param options - Extension configuration options
 * @returns Configured negation transformer extension
 *
 * @example
 * ```typescript
 * import {
 *   ClauseSegmenterExtension,
 *   createNegationTransformerExtension,
 * } from "@glost/core-extensions/extensions";
 *
 * // Negate all main clauses
 * const negationExt = createNegationTransformerExtension({
 *   language: "en-US",
 *   negationType: "standard",
 * });
 *
 * const result = processGLOSTWithExtensions(document, [
 *   ClauseSegmenterExtension, // Must run first!
 *   negationExt,
 * ]);
 *
 * // "I like coffee" becomes "I don't like coffee"
 * ```
 *
 * @see {@link NegationTransformerExtension} - Default extension
 *
 * @since 0.0.1
 */
export function createNegationTransformerExtension(
  options: NegationTransformerOptions = {}
): GLOSTExtension {
  const {
    language = "en-US",
    clauseIndex,
    negationType = "standard",
    mainClausesOnly = true,
  } = options;

  const resolvedOptions = {
    language,
    clauseIndex,
    negationType,
    mainClausesOnly,
  };

  return {
    id: "negation-transformer",
    name: "Negation Transformer",
    description: "Negates clauses or sentences",
    dependencies: ["clause-segmenter"], // Requires clauses to exist

    transform: (document: GLOSTRoot) => {
      // Check if clauses exist
      const clauses = getAllClauses(document);

      if (clauses.length === 0) {
        // No clauses - try to negate at sentence level
        visit(document, "SentenceNode", (node: any) => {
          const sentence = node as GLOSTSentence;
          const words = sentence.children.filter(
            (c): c is GLOSTWord => c.type === "WordNode"
          );

          if (words.length === 0) return;

          const lang = sentence.lang || resolvedOptions.language;
          let negationInfo: { position: number; negationWord: string };

          if (lang.startsWith("th")) {
            negationInfo = findThaiNegationPosition(words);
            if (resolvedOptions.negationType === "emphatic") {
              negationInfo.negationWord = THAI_NEGATION.emphatic;
            }
          } else {
            negationInfo = findEnglishNegationPosition(words);
            if (resolvedOptions.negationType === "emphatic") {
              negationInfo.negationWord = ENGLISH_NEGATION.emphatic.present;
            }
          }

          const negationWord = createNegationWord(
            negationInfo.negationWord,
            lang
          );

          // Insert negation word
          const newChildren = [...sentence.children];
          let insertIndex = 0;
          let wordCount = 0;

          for (let i = 0; i < newChildren.length; i++) {
            if (newChildren[i]?.type === "WordNode") {
              if (wordCount === negationInfo.position) {
                insertIndex = i;
                break;
              }
              wordCount++;
            }
            insertIndex = i + 1;
          }

          newChildren.splice(insertIndex, 0, negationWord);
          sentence.children = newChildren as any;

          sentence.extras = {
            ...sentence.extras,
            isNegated: true,
            negationWord: negationInfo.negationWord,
          };
        });

        return document;
      }

      // Negate clauses
      let clauseCounter = 0;

      visit(document, "ClauseNode", (node: any) => {
        const clause = node as GLOSTClause;

        // Check if we should negate this clause
        const shouldNegate =
          (resolvedOptions.clauseIndex === undefined ||
            resolvedOptions.clauseIndex === clauseCounter) &&
          (!resolvedOptions.mainClausesOnly ||
            clause.clauseType === "main");

        if (shouldNegate) {
          const negated = negateClause(clause, resolvedOptions);
          Object.assign(node, negated);
        }

        clauseCounter++;
      });

      return document;
    },
  };
}

/**
 * Default Negation Transformer extension
 *
 * Pre-configured negation transformer with default options (English,
 * standard negation, main clauses only). Use this for standard
 * negation, or create a custom extension with
 * `createNegationTransformerExtension()` for specific options.
 *
 * **Important:** This extension requires ClauseSegmenterExtension
 * to run first for clause-level negation.
 *
 * @example
 * ```typescript
 * import {
 *   ClauseSegmenterExtension,
 *   NegationTransformerExtension,
 * } from "@glost/core-extensions/extensions";
 * import { processGLOSTWithExtensions } from "@glost/core-extensions/processor";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   ClauseSegmenterExtension,
 *   NegationTransformerExtension,
 * ]);
 *
 * // Main clauses will be negated
 * ```
 *
 * @see {@link createNegationTransformerExtension} - Create custom extension
 *
 * @since 0.0.1
 */
export const NegationTransformerExtension = createNegationTransformerExtension();
