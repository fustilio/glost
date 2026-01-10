import type { Literal as NlcstLiteral, Paragraph as NlcstParagraph, Punctuation as NlcstPunctuation, Root as NlcstRoot, Sentence as NlcstSentence, Source as NlcstSource, Symbol as NlcstSymbol, Text as NlcstText, WhiteSpace as NlcstWhiteSpace, Word as NlcstWord } from "nlcst";

// ============================================================================
// Node Type Constants
// ============================================================================

/**
 * Standard GLOST node type constants
 * 
 * Use these constants instead of string literals for type checking to prevent
 * typos and enable autocomplete.
 * 
 * @example
 * ```typescript
 * import { NODE_TYPES } from "glost";
 * 
 * if (node.type === NODE_TYPES.WORD) {
 *   // Handle word node with autocomplete and type safety
 * }
 * ```
 */
export const NODE_TYPES = {
  /** Root document node */
  ROOT: "RootNode",
  /** Paragraph node */
  PARAGRAPH: "ParagraphNode",
  /** Sentence node */
  SENTENCE: "SentenceNode",
  /** Word node */
  WORD: "WordNode",
  /** Text node (leaf node containing actual text) */
  TEXT: "TextNode",
  /** Whitespace node */
  WHITESPACE: "WhiteSpaceNode",
  /** Punctuation node */
  PUNCTUATION: "PunctuationNode",
  /** Symbol node */
  SYMBOL: "SymbolNode",
  /** Source node */
  SOURCE: "SourceNode",
  /** Clause node (created by transformers) */
  CLAUSE: "ClauseNode",
  /** Phrase node (created by transformers) */
  PHRASE: "PhraseNode",
  /** Syllable node */
  SYLLABLE: "SyllableNode",
  /** Character node */
  CHARACTER: "CharacterNode",
} as const;

/**
 * Type representing any valid GLOST node type string
 */
export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];




// ============================================================================
// Core GLOST Types
// ============================================================================

/**
 * Linguistic level of a text segment
 */
export type LinguisticLevel =
  | "character"
  | "syllable"
  | "word"
  | "phrase"
  | "sentence"
  | "paragraph";

/**
 * Context for pronunciation variants
 */
export type PronunciationContext =
  | "formal"
  | "informal"
  | "historical"
  | "regional"
  | "dialectal";

/**
 * Transcription system identifiers
 */
export type TranscriptionSystem =
  | "rtgs" // Royal Thai General System
  | "aua" // AUA (American University Alumni)
  | "paiboon" // Paiboon system
  | "romaji" // Japanese romanization
  | "furigana" // Japanese furigana
  | "ipa" // International Phonetic Alphabet
  | "pinyin" // Chinese pinyin
  | "hangul" // Korean hangul
  | string; // Allow custom systems

/**
 * Language codes following BCP-47 format (RFC 5646)
 * Format: language[-script][-region][-variant]
 * Examples: th-TH, ja-JP, zh-CN, ko-KR, en-US, fr-FR, de-DE
 */
export type LanguageCode =
  // Thai
  | "th-TH" // Thai (Thailand)
  | "th" // Thai (generic)
  
  // Japanese
  | "ja-JP" // Japanese (Japan)
  | "ja" // Japanese (generic)
  
  // Chinese
  | "zh-CN" // Chinese (Simplified, China)
  | "zh-TW" // Chinese (Traditional, Taiwan)
  | "zh-HK" // Chinese (Hong Kong)
  | "zh" // Chinese (generic)
  
  // Korean
  | "ko-KR" // Korean (South Korea)
  | "ko-KP" // Korean (North Korea)
  | "ko" // Korean (generic)
  
  // English
  | "en-US" // English (United States)
  | "en-GB" // English (United Kingdom)
  | "en-CA" // English (Canada)
  | "en-AU" // English (Australia)
  | "en" // English (generic)
  
  // French
  | "fr-FR" // French (France)
  | "fr-CA" // French (Canada)
  | "fr-BE" // French (Belgium)
  | "fr" // French (generic)
  
  // German
  | "de-DE" // German (Germany)
  | "de-AT" // German (Austria)
  | "de-CH" // German (Switzerland)
  | "de" // German (generic)
  
  // Spanish
  | "es-ES" // Spanish (Spain)
  | "es-MX" // Spanish (Mexico)
  | "es-AR" // Spanish (Argentina)
  | "es" // Spanish (generic)
  
  // Italian
  | "it-IT" // Italian (Italy)
  | "it-CH" // Italian (Switzerland)
  | "it" // Italian (generic)
  
  // Portuguese
  | "pt-PT" // Portuguese (Portugal)
  | "pt-BR" // Portuguese (Brazil)
  | "pt" // Portuguese (generic)
  
  // Russian
  | "ru-RU" // Russian (Russia)
  | "ru" // Russian (generic)
  
  // Arabic
  | "ar-SA" // Arabic (Saudi Arabia)
  | "ar-EG" // Arabic (Egypt)
  | "ar" // Arabic (generic)
  
  // Hindi
  | "hi-IN" // Hindi (India)
  | "hi" // Hindi (generic)
  
  // Allow custom BCP-47 language tags
  | string;

/**
 * Script system identifiers
 */
export type ScriptSystem =
  | "thai" // Thai script
  | "hiragana" // Japanese hiragana
  | "katakana" // Japanese katakana
  | "kanji" // Japanese/Chinese characters
  | "hanzi" // Chinese characters
  | "hangul" // Korean hangul
  | "latin" // Latin alphabet
  | "mixed" // Mixed scripts
  | string; // Allow other scripts

// ============================================================================
// Extras Field Types for i18n and Extensions
// ============================================================================

/**
 * Quick translations in different languages using BCP-47 format
 */
export type QuickTranslations = {
  /** English translations */
  "en-US"?: string; // English (United States)
  "en-GB"?: string; // English (United Kingdom)
  "en"?: string;    // English (generic)
  
  /** Thai translations */
  "th-TH"?: string; // Thai (Thailand)
  "th"?: string;    // Thai (generic)
  
  /** Japanese translations */
  "ja-JP"?: string; // Japanese (Japan)
  "ja"?: string;    // Japanese (generic)
  
  /** Chinese translations */
  "zh-CN"?: string; // Chinese (Simplified, China)
  "zh-TW"?: string; // Chinese (Traditional, Taiwan)
  "zh"?: string;    // Chinese (generic)
  
  /** Korean translations */
  "ko-KR"?: string; // Korean (South Korea)
  "ko"?: string;    // Korean (generic)
  
  /** French translations */
  "fr-FR"?: string; // French (France)
  "fr-CA"?: string; // French (Canada)
  "fr"?: string;    // French (generic)
  
  /** German translations */
  "de-DE"?: string; // German (Germany)
  "de"?: string;    // German (generic)
  
  /** Spanish translations */
  "es-ES"?: string; // Spanish (Spain)
  "es-MX"?: string; // Spanish (Mexico)
  "es"?: string;    // Spanish (generic)
  
  /** Custom language translations using BCP-47 format */
  [lang: string]: string | undefined;
};

/**
 * Extended metadata for enhanced functionality
 */
export type ExtendedMetadata = {
  /** Quick translations in multiple languages */
  translations?: QuickTranslations;
  /** Difficulty level for learners */
  difficulty?: "beginner" | "intermediate" | "advanced" | 1 | 2 | 3 | 4 | 5 | string;
  /** Frequency in common usage */
  frequency?: "rare" | "uncommon" | "common" | "very-common";
  /** Cultural notes */
  culturalNotes?: string;
  /** Related words or concepts */
  related?: string[];
  /** Example sentences */
  examples?: string[];
  /** Custom extensions */
  [key: string]: any;
};

/**
 * Extras field for extending GLOST nodes
 * 
 * This interface can be augmented by extension packages via declaration merging.
 * 
 * @example
 * ```typescript
 * // In an extension package
 * declare module "glost" {
 *   interface GLOSTExtras {
 *     frequency?: {
 *       rank: number;
 *       category: "very-common" | "common" | "uncommon" | "rare";
 *     };
 *   }
 * }
 * ```
 */
export interface GLOSTExtras {
  /** Quick translations */
  translations?: QuickTranslations;
  /** Extended metadata */
  metadata?: ExtendedMetadata;
  /** Custom extensions - allows any string key with unknown value */
  [key: string]: unknown;
}

// ============================================================================
// Transcription and Pronunciation Types
// ============================================================================

/**
 * Pronunciation variant for a text segment
 */
export type PronunciationVariant = {
  /** The variant text in the transcription system */
  text: string;
  /** Context where this variant is used */
  context: PronunciationContext;
  /** Additional notes about this variant */
  notes?: string;
};

/**
 * Transcription information for a text segment
 * 
 * Note: The transcription system is not stored in this object.
 * It is the key in the TransliterationData record.
 */
export type TranscriptionInfo = {
  /** The transcription text */
  text: string;
  /** Pronunciation variants */
  variants?: PronunciationVariant[];
  /** Tone information (for tonal languages) */
  tone?: number;
  /** Syllable breakdown */
  syllables?: string[];
  /** Additional phonetic information */
  phonetic?: string;
};

/**
 * Complete transliteration data for a text segment
 */
export type TransliterationData = {
  /** Map of transcription systems to their data */
  [system: string]: TranscriptionInfo;
};

// ============================================================================
// Linguistic Metadata Types
// ============================================================================

/**
 * Linguistic metadata for a text segment
 */
export type LinguisticMetadata = {
  /** @deprecated Use extras.translations instead */
  meaning?: string;
  /** Part of speech */
  partOfSpeech: string;
  /** Usage notes */
  usage?: string;
  /** Etymology information */
  etymology?: string;
  /** Example usage */
  examples?: string[];
  /** Frequency information */
  frequency?: "high" | "medium" | "low";
  /** Formality level */
  formality?: "formal" | "neutral" | "informal";
  /** Register (academic, colloquial, etc.) */
  register?: string;
  /** @deprecated Use extras.translations instead */
  shortDefinition?: string;
  /** @deprecated Use extras.translations instead */
  fullDefinition?: string;
  /** @deprecated Use metadata enrichment extensions instead */
  difficulty?: "beginner" | "intermediate" | "advanced" | 1 | 2 | 3 | 4 | 5 | string;
};

// ============================================================================
// Extended Node Types
// ============================================================================

/**
 * Union type for all GLOST nodes
 */
export type GLOSTNode =
  | GLOSTWord
  | GLOSTSentence
  | GLOSTParagraph
  | GLOSTRoot
  | GLOSTText
  | GLOSTSymbol
  | GLOSTPunctuation
  | GLOSTWhiteSpace
  | GLOSTSource
  // New transformer node types
  | GLOSTClause
  | GLOSTPhrase
  | GLOSTSyllable
  | GLOSTCharacter;

/**
 * GLOST nodes that extend nlcst Literal (have a value property)
 */
export type GLOSTLiteral = NlcstLiteral & {
  /** Language code for this node */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Linguistic level of this segment */
  level?: LinguisticLevel;
  /** Extras field for extensions */
  extras?: GLOSTExtras;
};

/**
 * GLOST Punctuation node (extends nlcst PunctuationNode)
 */
export type GLOSTPunctuation = NlcstPunctuation & {};

/**
 * GLOST WhiteSpace node (extends nlcst WhiteSpaceNode)
 */
export type GLOSTWhiteSpace = NlcstWhiteSpace & {};

/**
 * GLOST Symbol node (extends nlcst SymbolNode)
 */
export type GLOSTSymbol = NlcstSymbol & {};

/**
 * GLOST Text node (extends nlcst TextNode)
 */
export type GLOSTText = NlcstText & {
  // potentially can be character level information
};

/**
 * GLOST Source node (extends nlcst SourceNode)
 */
export type GLOSTSource = NlcstSource & {
  
};

/**
 * Extended word node with transcription support
 * Extends nlcst WordNode and adds GLOST-specific properties
 */
export type GLOSTWord = Omit<NlcstWord, "children"> & {
  /** Transcription data (optional - can be added by extensions) */
  transcription?: TransliterationData;
  /** Linguistic metadata (optional - can be added by extensions) */
  metadata?: LinguisticMetadata;
  /** @deprecated Use extras.translations instead */
  shortDefinition?: string;
  /** @deprecated Use extras.translations instead */
  fullDefinition?: string;
  /** @deprecated Use metadata enrichment extensions instead */
  difficulty?: "beginner" | "intermediate" | "advanced" | 1 | 2 | 3 | 4 | 5 | string;
  /** Language code for this node */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Linguistic level of this segment */
  level?: LinguisticLevel;
  /** Extras field for extensions */
  extras?: GLOSTExtras;
  /** Children nodes - must contain at least one Text node */
  children: GLOSTWordContent[];
};

/**
 * Extended sentence node
 * Extends nlcst SentenceNode and adds GLOST-specific properties
 */
export type GLOSTSentence = Omit<NlcstSentence, "children"> & {
  /** Language of the sentence */
  lang: LanguageCode;
  /** Script system used */
  script: ScriptSystem;
  /** Original text */
  originalText: string;
  /** Transcription data for the entire sentence */
  transcription?: TransliterationData;
  /** Extras field for extensions */
  extras?: GLOSTExtras;
  /** Children nodes - must be nlcst-compliant */
  children: GLOSTSentenceContent[];
};

/**
 * Extended paragraph node
 */
export type GLOSTParagraph = Omit<NlcstParagraph, "children"> & {
  /** Language of the paragraph */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Extras field for extensions */
  extras?: GLOSTExtras;
  /** Children nodes - must be nlcst-compliant */
  children: GLOSTParagraphContent[];
};

/**
 * Extended root node
 */
export type GLOSTRoot = Omit<NlcstRoot, "children"> & {
  /** Primary language of the document */
  lang: LanguageCode;
  /** Primary script system */
  script: ScriptSystem;
  /** Extras field for extensions */
  extras?: GLOSTExtras;
  /** Document metadata */
  metadata?: {
    title?: string;
    author?: string;
    date?: string;
    description?: string;
  };
  /** Children nodes - must be nlcst-compliant */
  children: GLOSTRootContent[];
};

// ============================================================================
// Transformer Node Types
// ============================================================================

/**
 * Clause node - represents grammatical clauses within sentences
 * Created by ClauseSegmenterExtension transformer
 */
export type GLOSTClause = {
  type: "ClauseNode";
  /** Type of clause */
  clauseType: "main" | "subordinate" | "relative" | "adverbial";
  /** Children nodes - phrases, words, or punctuation */
  children: (GLOSTPhrase | GLOSTWord | GLOSTPunctuation)[];
  /** Language code for this clause */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Extras field for extensions */
  extras?: GLOSTExtras & {
    /** Whether this clause has been negated */
    isNegated?: boolean;
    /** Grammatical mood */
    mood?: "declarative" | "interrogative" | "imperative" | "conditional";
    /** Tense information */
    tense?: string;
    /** Original form before transformation */
    originalForm?: string;
  };
};

/**
 * Phrase node - groups words into grammatical phrases
 * Created by PhraseSegmenterExtension transformer
 */
export type GLOSTPhrase = {
  type: "PhraseNode";
  /** Type of phrase */
  phraseType: "noun" | "verb" | "prepositional" | "adjectival" | "adverbial";
  /** Main word of the phrase (head) */
  headWord?: string;
  /** Children nodes - words or punctuation */
  children: (GLOSTWord | GLOSTPunctuation)[];
  /** Language code for this phrase */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Extras field for extensions */
  extras?: GLOSTExtras & {
    /** Grammatical role in the clause/sentence */
    role?: "subject" | "object" | "complement" | "modifier";
  };
};

/**
 * Syllable node - represents phonological syllable structure
 * Created by SyllableSegmenterExtension transformer (language-specific)
 */
export type GLOSTSyllable = {
  type: "SyllableNode";
  /** Syllable structure information */
  structure: {
    /** Initial consonant(s) - Generic (e.g., "h" in "hello") */
    onset?: string;
    /** Vowel - Generic (e.g., "e" in "hello") */
    nucleus: string;
    /** Final consonant(s) - Generic (e.g., "l" in "hello") */
    coda?: string;

    // Thai-specific structure (optional)
    /** Initial consonant (Thai: พยัญชนะต้น) */
    Ci?: string;
    /** Vowel (Thai: สระ) */
    V?: string;
    /** Final consonant (Thai: ตัวสะกด) */
    Cf?: string;
    /** Tone mark (Thai: วรรณยุกต์) */
    T?: string;
  };
  /** Children nodes - individual characters */
  children: GLOSTCharacter[];
  /** Language code for this syllable */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Tone number (for tonal languages like Thai, Mandarin) */
  tone?: number;
  /** Stress level (for stress languages like English) */
  stress?: "primary" | "secondary" | "unstressed";
  /** Extras field for extensions */
  extras?: GLOSTExtras;
};

/**
 * Character node - represents individual characters with linguistic roles
 * Created by SyllableSegmenterExtension or CharacterSegmenterExtension
 */
export type GLOSTCharacter = {
  type: "CharacterNode";
  /** The character value (single character) */
  value: string;
  /** Linguistic role of the character */
  role?: "consonant" | "vowel" | "tone" | "diacritic" | "modifier";
  /** Placement in the syllable/word (renamed from 'position' to avoid conflict with unist Position) */
  placement?: "initial" | "medial" | "final" | "above" | "below" | "before" | "after";
  /** Language code for this character */
  lang?: LanguageCode;
  /** Script system used */
  script?: ScriptSystem;
  /** Extras field for extensions */
  extras?: GLOSTExtras & {
    /** Unicode code point (e.g., "U+0E04") */
    unicode?: string;
    /** Thai consonant class (high/mid/low) */
    class?: "high" | "mid" | "low";
    /** Phonological sound class */
    soundClass?: string;
  };
};

export type GLOSTRootContent = GLOSTParagraph | GLOSTSentence | GLOSTWord | GLOSTText | GLOSTSymbol | GLOSTPunctuation | GLOSTWhiteSpace | GLOSTSource;
export type GLOSTParagraphContent = GLOSTSentence | GLOSTPunctuation | GLOSTSymbol | GLOSTWhiteSpace | GLOSTSource;
export type GLOSTSentenceContent = GLOSTClause | GLOSTWord | GLOSTPunctuation | GLOSTSymbol | GLOSTWhiteSpace | GLOSTSource;
export type GLOSTWordContent = GLOSTSyllable | GLOSTText | GLOSTSymbol | GLOSTPunctuation | GLOSTWhiteSpace | GLOSTSource;
// ============================================================================
// Utility Types
// ============================================================================

// Type guards are now implemented in utils.ts using unist-util-is