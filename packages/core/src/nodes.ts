import type {
  LanguageCode,
  LinguisticMetadata,
  GLOSTExtras,
  GLOSTParagraph,
  GLOSTPunctuation,
  GLOSTRoot,
  GLOSTSentence,
  GLOSTSymbol,
  GLOSTText,
  GLOSTWhiteSpace,
  GLOSTWord,
  ScriptSystem,
  TransliterationData,
} from "./types.js";

// ============================================================================
// Options Interfaces
// ============================================================================

/**
 * Options for creating a GLOST word node
 */
export interface CreateWordNodeOptions {
  /** The text value of the word */
  value: string;
  /** Transcription data (IPA, romanization, etc.) */
  transcription: TransliterationData;
  /** Linguistic metadata (part of speech, etc.) */
  metadata: LinguisticMetadata;
  /** Language code (ISO-639-1, ISO-639-3, or BCP-47) */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Additional extension data */
  extras?: GLOSTExtras;
}

/**
 * Options for creating a GLOST sentence node
 */
export interface CreateSentenceNodeOptions {
  /** The original text of the sentence */
  originalText: string;
  /** Language code */
  lang: LanguageCode;
  /** Script system used */
  script: ScriptSystem;
  /** Word nodes in the sentence */
  children?: GLOSTWord[];
  /** Optional transcription data */
  transcription?: TransliterationData;
  /** Additional extension data */
  extras?: GLOSTExtras;
}

/**
 * Options for creating a GLOST root node
 */
export interface CreateRootNodeOptions {
  /** Language code */
  lang: LanguageCode;
  /** Script system used */
  script: ScriptSystem;
  /** Paragraph nodes */
  children?: GLOSTParagraph[];
  /** Document metadata */
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
  };
  /** Additional extension data */
  extras?: GLOSTExtras;
}

/**
 * Options for creating a simple word node
 */
export interface CreateSimpleWordOptions {
  /** The text value of the word */
  text: string;
  /** Transliteration text */
  transliteration: string;
  /** Transcription system (default: "ipa") */
  system?: string;
  /** Part of speech (default: "unknown") */
  partOfSpeech?: string;
}


// ============================================================================
// Node Factory Functions
// ============================================================================

/**
 * Create a GLOST word node
 *
 * @example
 * ```typescript
 * const word = createGLOSTWordNode({
 *   value: "hello",
 *   transcription: { ipa: { text: "həˈloʊ", system: "ipa" } },
 *   metadata: { partOfSpeech: "interjection" },
 *   lang: "en",
 *   script: "latin"
 * });
 * ```
 */
export function createGLOSTWordNode(options: CreateWordNodeOptions): GLOSTWord {
  const { value, transcription, metadata, lang, script, extras } = options;
  return {
    type: "WordNode",
    lang,
    script,
    transcription,
    metadata,
    extras,
    children: [createGLOSTTextNode(value)],
  };
}

/**
 * Create a GLOST sentence node
 *
 * @example
 * ```typescript
 * const sentence = createGLOSTSentenceNode({
 *   originalText: "Hello world",
 *   lang: "en",
 *   script: "latin",
 *   children: [wordNode1, wordNode2]
 * });
 * ```
 */
export function createGLOSTSentenceNode(
  options: CreateSentenceNodeOptions,
): GLOSTSentence {
  const {
    originalText,
    lang,
    script,
    children = [],
    transcription,
    extras,
  } = options;
  return {
    type: "SentenceNode",
    originalText,
    lang,
    script,
    transcription,
    children,
    extras,
  };
}

/**
 * Create a GLOST paragraph node
 */
export function createGLOSTParagraphNode(
  children: GLOSTSentence[] = [],
  extras?: GLOSTExtras,
): GLOSTParagraph {
  return {
    type: "ParagraphNode",
    children,
    position: undefined,
    extras,
  };
}

/**
 * Create a GLOST root node
 *
 * @example
 * ```typescript
 * const root = createGLOSTRootNode({
 *   lang: "en",
 *   script: "latin",
 *   children: [paragraphNode],
 *   metadata: { title: "My Document" }
 * });
 * ```
 */
export function createGLOSTRootNode(options: CreateRootNodeOptions): GLOSTRoot {
  const { lang, script, children = [], metadata, extras } = options;
  return {
    type: "RootNode",
    lang,
    script,
    metadata,
    children,
    position: undefined,
    extras,
  };
}

// ============================================================================
// Helper Functions for Common Patterns
// ============================================================================

/**
 * Create a simple word node with basic transcription
 *
 * @example
 * ```typescript
 * const word = createSimpleWord({
 *   text: "hello",
 *   transliteration: "həˈloʊ",
 *   system: "ipa",
 *   partOfSpeech: "interjection"
 * });
 * ```
 */
export function createSimpleWord(options: CreateSimpleWordOptions): GLOSTWord {
  const { text, transliteration, system = "ipa", partOfSpeech = "unknown" } = options;

  const transcription: TransliterationData = {
    [system]: {
      text: transliteration,
      syllables: [text],
    },
  };

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode({ value: text, transcription, metadata });
}


/**
 * Create a sentence from an array of words
 */
export function createSentenceFromWords(
  words: GLOSTWord[],
  lang: LanguageCode,
  script: ScriptSystem,
  originalText?: string,
): GLOSTSentence {
  const text =
    originalText ||
    words
      .map((w) => {
        // Extract text from word's Text node children
        const textNode = w.children.find(
          (child) => child.type === "TextNode",
        ) as GLOSTText;
        return textNode ? textNode.value : "";
      })
      .join("");
  return createGLOSTSentenceNode({ originalText: text, lang, script, children: words });
}

/**
 * Create a paragraph from an array of sentences
 */
export function createParagraphFromSentences(
  sentences: GLOSTSentence[],
): GLOSTParagraph {
  return createGLOSTParagraphNode(sentences);
}

/**
 * Create a document from an array of paragraphs
 */
export function createDocumentFromParagraphs(
  paragraphs: GLOSTParagraph[],
  lang: LanguageCode,
  script: ScriptSystem,
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
  },
): GLOSTRoot {
  return createGLOSTRootNode({ lang, script, children: paragraphs, metadata });
}

// ============================================================================
// NLCST Node Factory Functions
// ============================================================================

/**
 * Create a GLOST punctuation node
 */
export function createGLOSTPunctuationNode(value: string): GLOSTPunctuation {
  return {
    type: "PunctuationNode",
    value,
  };
}

/**
 * Create a GLOST whitespace node
 */
export function createGLOSTWhiteSpaceNode(value: string): GLOSTWhiteSpace {
  return {
    type: "WhiteSpaceNode",
    value,
  };
}

/**
 * Create a GLOST symbol node
 */
export function createGLOSTSymbolNode(value: string): GLOSTSymbol {
  return {
    type: "SymbolNode",
    value,
  };
}

/**
 * Create a GLOST text node
 */
export function createGLOSTTextNode(value: string): GLOSTText {
  return {
    type: "TextNode",
    value,
  };
}
