/**
 * Clause Segmenter Extension
 *
 * Transforms sentences into grammatical clauses (main, subordinate, relative, adverbial).
 * Creates GLOSTClause nodes that can contain phrases, words, or punctuation.
 *
 * @packageDocumentation
 */

import type { GLOSTExtension } from "../types";
import type {
  GLOSTRoot,
  GLOSTSentence,
  GLOSTClause,
  GLOSTWord,
  GLOSTPunctuation,
  LanguageCode,
} from "glost";
import { visit } from "unist-util-visit";
import { getWordText } from "glost";

/**
 * Clause type
 */
export type ClauseType = "main" | "subordinate" | "relative" | "adverbial";

/**
 * Grammatical mood
 */
export type GrammaticalMood =
  | "declarative"
  | "interrogative"
  | "imperative"
  | "conditional";

/**
 * Clause segmenter extension options
 */
export interface ClauseSegmenterOptions {
  /**
   * Language for clause detection rules
   * @default "en-US"
   */
  language?: LanguageCode;

  /**
   * Whether to include conjunctions in clause nodes
   * @default true
   */
  includeConjunctions?: boolean;

  /**
   * Whether to detect mood (declarative, interrogative, etc.)
   * @default true
   */
  detectMood?: boolean;

  /**
   * Whether to detect tense information
   * @default false (not yet fully implemented)
   */
  detectTense?: boolean;
}

// ============================================================================
// Language-specific clause markers
// ============================================================================

/**
 * English subordinating conjunctions
 */
const ENGLISH_SUBORDINATORS = [
  "that",
  "because",
  "although",
  "though",
  "if",
  "when",
  "while",
  "since",
  "unless",
  "until",
  "after",
  "before",
  "as",
  "once",
  "wherever",
  "whenever",
  "whether",
];

/**
 * English relative pronouns
 */
const ENGLISH_RELATIVES = ["who", "whom", "whose", "which", "that", "where"];

/**
 * English coordinating conjunctions (for compound sentences)
 */
const ENGLISH_COORDINATORS = ["and", "but", "or", "so", "for", "nor", "yet"];

/**
 * Thai subordinating particles/conjunctions
 */
const THAI_SUBORDINATORS = [
  "ที่", // that/which
  "เพราะ", // because
  "ถ้า", // if
  "เมื่อ", // when
  "ขณะที่", // while
  "หลังจาก", // after
  "ก่อน", // before
  "ตั้งแต่", // since
  "จนกว่า", // until
  "แม้ว่า", // although
];

/**
 * Thai coordinating conjunctions
 */
const THAI_COORDINATORS = [
  "และ", // and
  "แต่", // but
  "หรือ", // or
  "จึง", // so/therefore
];

// ============================================================================
// Clause detection helpers
// ============================================================================

/**
 * Get clause markers for a language
 */
function getClauseMarkers(lang: string) {
  if (lang.startsWith("th")) {
    return {
      subordinators: THAI_SUBORDINATORS,
      relatives: [], // Thai doesn't have the same relative pronoun system
      coordinators: THAI_COORDINATORS,
    };
  }
  // Default to English
  return {
    subordinators: ENGLISH_SUBORDINATORS,
    relatives: ENGLISH_RELATIVES,
    coordinators: ENGLISH_COORDINATORS,
  };
}

/**
 * Detect grammatical mood from sentence structure
 */
function detectGrammaticalMood(
  sentence: GLOSTSentence,
  words: GLOSTWord[]
): GrammaticalMood {
  const text = sentence.originalText || "";

  // Check for question mark or question words
  if (text.endsWith("?") || text.includes("ไหม") || text.includes("หรือ")) {
    return "interrogative";
  }

  // Check for imperative (commands - often start with verb, no subject)
  const firstWord = words[0];
  if (firstWord) {
    const pos = firstWord.metadata?.partOfSpeech;
    if (pos === "verb" && words.length < 5) {
      return "imperative";
    }
  }

  // Check for conditional
  const hasConditional = words.some((w) => {
    const text = getWordText(w).toLowerCase();
    return text === "if" || text === "ถ้า" || text === "หาก";
  });
  if (hasConditional) {
    return "conditional";
  }

  return "declarative";
}

/**
 * Segment sentence into clauses
 */
function segmentIntoClauses(
  sentence: GLOSTSentence,
  options: Required<ClauseSegmenterOptions>
): GLOSTClause[] {
  const children = sentence.children;
  const lang = sentence.lang || options.language;
  const markers = getClauseMarkers(lang);

  // Collect word nodes for analysis
  const words = children.filter((c): c is GLOSTWord => c.type === "WordNode");

  if (words.length === 0) {
    return [];
  }

  // Build clauses
  const clauses: GLOSTClause[] = [];
  let currentClauseChildren: (GLOSTWord | GLOSTPunctuation)[] = [];
  let currentClauseType: ClauseType = "main";

  for (const child of children) {
    if (child.type === "WordNode") {
      const word = child as GLOSTWord;
      const wordText = getWordText(word).toLowerCase();

      // Check if this word is a clause boundary marker
      const isSubordinator = markers.subordinators.includes(wordText);
      const isRelative = markers.relatives.includes(wordText);
      const isCoordinator = markers.coordinators.includes(wordText);

      if (isSubordinator || isRelative) {
        // Save current clause if it has content
        if (currentClauseChildren.length > 0) {
          clauses.push(createClause(currentClauseChildren, currentClauseType, lang, options));
          currentClauseChildren = [];
        }

        // Determine new clause type
        if (isRelative) {
          currentClauseType = "relative";
        } else if (["if", "ถ้า", "when", "เมื่อ", "while", "ขณะที่"].includes(wordText)) {
          currentClauseType = "adverbial";
        } else {
          currentClauseType = "subordinate";
        }

        // Include conjunction in new clause if option is set
        if (options.includeConjunctions) {
          currentClauseChildren.push(word);
        }
      } else if (isCoordinator) {
        // Coordinating conjunction - save current clause and start new main clause
        if (currentClauseChildren.length > 0) {
          clauses.push(createClause(currentClauseChildren, currentClauseType, lang, options));
          currentClauseChildren = [];
          currentClauseType = "main";
        }

        if (options.includeConjunctions) {
          currentClauseChildren.push(word);
        }
      } else {
        // Regular word - add to current clause
        currentClauseChildren.push(word);
      }
    } else if (child.type === "PunctuationNode") {
      // Add punctuation to current clause
      currentClauseChildren.push(child as GLOSTPunctuation);
    }
    // Skip other node types (whitespace, etc.)
  }

  // Don't forget the last clause
  if (currentClauseChildren.length > 0) {
    clauses.push(createClause(currentClauseChildren, currentClauseType, lang, options));
  }

  return clauses;
}

/**
 * Create a clause node
 */
function createClause(
  children: (GLOSTWord | GLOSTPunctuation)[],
  clauseType: ClauseType,
  lang: LanguageCode,
  options: Required<ClauseSegmenterOptions>
): GLOSTClause {
  // Detect mood if enabled
  const words = children.filter((c): c is GLOSTWord => c.type === "WordNode");
  let mood: GrammaticalMood | undefined;

  if (options.detectMood && words.length > 0) {
    // Basic mood detection
    const lastChild = children[children.length - 1];
    if (
      lastChild?.type === "PunctuationNode" &&
      (lastChild as any).value === "?"
    ) {
      mood = "interrogative";
    } else if (clauseType === "adverbial" && words.some(w => {
      const t = getWordText(w).toLowerCase();
      return t === "if" || t === "ถ้า";
    })) {
      mood = "conditional";
    } else {
      mood = "declarative";
    }
  }

  const clause: GLOSTClause = {
    type: "ClauseNode",
    clauseType,
    children,
    lang,
    script: lang.startsWith("th") ? "thai" : "latin",
  };

  if (mood) {
    clause.extras = { mood };
  }

  return clause;
}

/**
 * Create Clause Segmenter extension
 *
 * Creates a transformer extension that segments sentences into
 * grammatical clauses. This enables grammar analysis, sentence
 * diagramming, and clause-level transformations like negation.
 *
 * @param options - Extension configuration options
 * @returns Configured clause segmenter extension
 *
 * @example
 * ```typescript
 * import { createClauseSegmenterExtension } from "glost-extensions/extensions";
 *
 * const extension = createClauseSegmenterExtension({
 *   language: "en-US",
 *   includeConjunctions: true,
 *   detectMood: true,
 * });
 *
 * const result = processGLOSTWithExtensions(document, [extension]);
 *
 * // "I think that you're right" becomes:
 * // Sentence: [
 * //   Clause(main): ["I", "think"],
 * //   Clause(subordinate): ["that", "you're", "right"]
 * // ]
 * ```
 *
 * @see {@link ClauseSegmenterExtension} - Default extension
 *
 * @since 0.0.1
 */
export function createClauseSegmenterExtension(
  options: ClauseSegmenterOptions = {}
): GLOSTExtension {
  const {
    language = "en-US",
    includeConjunctions = true,
    detectMood = true,
    detectTense = false,
  } = options;

  const resolvedOptions: Required<ClauseSegmenterOptions> = {
    language,
    includeConjunctions,
    detectMood,
    detectTense,
  };

  return {
    id: "clause-segmenter",
    name: "Clause Segmenter",
    description: "Segments sentences into grammatical clauses",

    // Declare what this extension provides for dependent extensions
    provides: {
      nodes: ["ClauseNode"],
      extras: ["mood"],
    },

    transform: (document: GLOSTRoot) => {
      visit(document, "SentenceNode", (node: any) => {
        const sentence = node as GLOSTSentence;

        // Skip if already has clause children (cast to any since ClauseNode is added dynamically)
        const hasClauseChildren = sentence.children.some(
          (c: any) => c.type === "ClauseNode"
        );
        if (hasClauseChildren) {
          return;
        }

        // Segment into clauses
        const clauses = segmentIntoClauses(sentence, resolvedOptions);

        // Only restructure if we found multiple clauses or at least one clause
        if (clauses.length > 0) {
          // Detect sentence-level mood
          const words: GLOSTWord[] = [];
          for (const child of sentence.children) {
            if (child.type === "WordNode") {
              words.push(child as GLOSTWord);
            }
          }
          const moodResult: GrammaticalMood = detectGrammaticalMood(sentence, words);

          // Replace sentence children with clauses
          sentence.children = clauses as any;

          // Add sentence-level extras
          sentence.extras = {
            ...sentence.extras,
            clauseCount: clauses.length,
            mood: moodResult,
          };
        }
      });

      return document;
    },
  };
}

/**
 * Default Clause Segmenter extension
 *
 * Pre-configured segmenter with default options (English language,
 * include conjunctions, detect mood). Use this for standard clause
 * segmentation, or create a custom extension with
 * `createClauseSegmenterExtension()` for specific languages or options.
 *
 * @example
 * ```typescript
 * import { ClauseSegmenterExtension } from "glost-extensions/extensions";
 * import { processGLOSTWithExtensions } from "glost-extensions/processor";
 *
 * const result = processGLOSTWithExtensions(document, [
 *   ClauseSegmenterExtension,
 * ]);
 *
 * // Sentences will be segmented into clause nodes
 * ```
 *
 * @see {@link createClauseSegmenterExtension} - Create custom extension
 *
 * @since 0.0.1
 */
export const ClauseSegmenterExtension = createClauseSegmenterExtension();
