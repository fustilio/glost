import type {
  LanguageCode,
  LinguisticLevel,
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
} from "./types";

// ============================================================================
// Node Factory Functions
// ============================================================================

/**
 * Create an GLOST word node
 */
export function createGLOSTWordNode(
  value: string,
  transcription: TransliterationData,
  metadata: LinguisticMetadata,
  level: LinguisticLevel = "word",
  lang?: LanguageCode,
  script?: ScriptSystem,
  extras?: GLOSTExtras,
): GLOSTWord {
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
 * Create an GLOST sentence node
 */
export function createGLOSTSentenceNode(
  originalText: string,
  lang: LanguageCode,
  script: ScriptSystem,
  children: GLOSTWord[] = [],
  transcription?: TransliterationData,
  extras?: GLOSTExtras,
): GLOSTSentence {
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
 * Create an GLOST paragraph node
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
 * Create an GLOST root node
 */
export function createGLOSTRootNode(
  lang: LanguageCode,
  script: ScriptSystem,
  children: GLOSTParagraph[] = [],
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
  },
  extras?: GLOSTExtras,
): GLOSTRoot {
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
 */
export function createSimpleWord(
  text: string,
  transliteration: string,
  system: string = "ipa",
  partOfSpeech: string = "unknown",
  level: LinguisticLevel = "word",
): GLOSTWord {
  const transcription: TransliterationData = {
    [system]: {
      text: transliteration,
      system: system as any,
      syllables: [text],
    },
  };

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode(text, transcription, metadata, level);
}

/**
 * Create a Thai word node with RTGS transcription
 */
export function createThaiWord(
  text: string,
  rtgs: string,
  partOfSpeech: string = "unknown",
  tone?: number,
  syllables?: string[],
): GLOSTWord {
  const transcription: TransliterationData = {
    rtgs: {
      text: rtgs,
      system: "rtgs",
      tone,
      syllables: syllables || [text],
    },
  };

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode(
    text,
    transcription,
    metadata,
    "word",
    "th",
    "thai",
  );
}

/**
 * Create a Japanese word node with romaji transcription
 */
export function createJapaneseWord(
  text: string,
  romaji: string,
  partOfSpeech: string = "unknown",
  furigana?: string,
): GLOSTWord {
  const transcription: TransliterationData = {
    romaji: {
      text: romaji,
      system: "romaji",
      syllables: [text],
    },
  };

  if (furigana) {
    transcription.furigana = {
      text: furigana,
      system: "furigana",
      syllables: [text],
    };
  }

  const metadata: LinguisticMetadata = {
    partOfSpeech,
  };

  return createGLOSTWordNode(
    text,
    transcription,
    metadata,
    "word",
    "ja",
    "mixed",
  );
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
  return createGLOSTSentenceNode(text, lang, script, words);
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
  return createGLOSTRootNode(lang, script, paragraphs, metadata);
}

// ============================================================================
// NLCST Node Factory Functions
// ============================================================================

/**
 * Create an GLOST punctuation node
 */
export function createGLOSTPunctuationNode(value: string): GLOSTPunctuation {
  return {
    type: "PunctuationNode",
    value,
  };
}

/**
 * Create an GLOST whitespace node
 */
export function createGLOSTWhiteSpaceNode(value: string): GLOSTWhiteSpace {
  return {
    type: "WhiteSpaceNode",
    value,
  };
}

/**
 * Create an GLOST symbol node
 */
export function createGLOSTSymbolNode(value: string): GLOSTSymbol {
  return {
    type: "SymbolNode",
    value,
  };
}

/**
 * Create an GLOST text node
 */
export function createGLOSTTextNode(value: string): GLOSTText {
  return {
    type: "TextNode",
    value,
  };
}
