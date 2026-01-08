/**
 * Framework-Agnostic Text-to-GLOST Converter
 * 
 * Provides utilities for converting text (plain strings or RubySegment arrays)
 * into GLOST documents using pluggable language strategies and transcription providers.
 * This ensures consistent GLOST creation across the codebase while remaining framework-agnostic.
 */

import type { RubySegment } from "./script-conversion";
import { isRubySegment } from "./script-conversion";
import type {
  GLOSTWord,
  GLOSTRoot,
  GLOSTParagraph,
  GLOSTSentence,
  LanguageCode,
  ScriptSystem,
  TransliterationData,
} from "glost";
import {
  createGLOSTWordNode,
  createGLOSTSentenceNode,
  createGLOSTParagraphNode,
  createGLOSTRootNode,
} from "glost/nodes";
import type { ILanguageStrategy, ITranscriptionProvider } from "./interfaces";
import type { GlostLanguage } from "glost-common";

/**
 * Options for converting text to GLOST
 */
export type ConvertTextToGLOSTOptions = {
  /**
   * Language code (e.g., "th-TH", "ja-JP")
   */
  language: string;
  /**
   * Language strategy instance (required)
   */
  languageStrategy: ILanguageStrategy;
  /**
   * Transcription provider instance (optional, only needed if fetchTranscription is true)
   */
  transcriptionProvider?: ITranscriptionProvider;
  /**
   * Transcription scheme to use (optional)
   */
  transcriptionScheme?: string;
  /**
   * Gender filter - only include terms matching this gender
   */
  genderFilter?: "male" | "female";
  /**
   * Whether to fetch transcription from providers if not provided in RubySegment
   */
  fetchTranscription?: boolean;
};

/**
 * Segment text by gender terms using language strategy
 */
function segmentTextByGenderTerms(
  text: string,
  languageStrategy: ILanguageStrategy,
): { text: string; gender?: "male" | "female" }[] {
  const genderTerms = languageStrategy.getGenderTerms();
  const male = genderTerms.male;
  const female = genderTerms.female;

  // If no gender terms, return the whole text as a single segment
  if (male.length === 0 && female.length === 0) {
    return [{ text }];
  }

  const parts: { text: string; gender?: "male" | "female" }[] = [];
  let lastIndex = 0;
  const allTerms = [...male, ...female];

  if (allTerms.length === 0) {
    return [{ text }];
  }

  const pattern = new RegExp(`(${allTerms.join("|")})`, "g");

  let match;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index) });
    }

    const term = match[1];
    if (!term) continue;

    const gender = male.includes(term) ? "male" : "female";
    parts.push({ text: term, gender });

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex) });
  }

  return parts;
}

/**
 * Detect gender in text using language strategy
 */
function detectGenderInText(
  text: string,
  languageStrategy: ILanguageStrategy,
): "male" | "female" | undefined {
  const genderTerms = languageStrategy.getGenderTerms();
  const male = genderTerms.male;
  const female = genderTerms.female;

  if (male.includes(text)) return "male";
  if (female.includes(text)) return "female";
  return undefined;
}

/**
 * Get transcription for text using transcription provider
 */
function getTranscriptionFromProvider(
  text: string,
  transcriptionProvider: ITranscriptionProvider,
  transcriptionScheme?: string,
): string | undefined {
  const scheme = transcriptionScheme ?? transcriptionProvider.getDefaultScheme();
  return transcriptionProvider.getTranscription(text, scheme);
}

/**
 * Create an GLOST word from a text segment
 */
function createWordFromSegment(
  text: string,
  ruby: string | undefined,
  language: string,
  languageStrategy: ILanguageStrategy,
  transcriptionProvider: ITranscriptionProvider | undefined,
  transcriptionScheme: string | undefined,
  gender: "male" | "female" | undefined,
  genderFilter: "male" | "female" | undefined,
  fetchTranscription: boolean,
): GLOSTWord {
  // Detect gender if not provided
  if (!gender) {
    gender = detectGenderInText(text, languageStrategy);
  }

  // Apply gender filter
  if (genderFilter && gender && gender !== genderFilter) {
    gender = undefined;
  }

  // Build transcription data
  let transcription: TransliterationData = {};

  if (ruby && transcriptionScheme) {
    // Use provided ruby transcription
    transcription = {
      [transcriptionScheme]: {
        text: ruby,
        system: transcriptionScheme,
      },
    };
  } else if (fetchTranscription && transcriptionScheme && transcriptionProvider) {
    // Try to fetch transcription from provider
    const providerTranscription = getTranscriptionFromProvider(
      text,
      transcriptionProvider,
      transcriptionScheme,
    );
    if (providerTranscription) {
      transcription = {
        [transcriptionScheme]: {
          text: providerTranscription,
          system: transcriptionScheme,
        },
      };
    }
  }

  // Get script system from language strategy
  const scriptSystem = languageStrategy.getScriptForLanguage(language) as ScriptSystem;

  // Create word node
  const wordNode = createGLOSTWordNode(
    text,
    transcription,
    { partOfSpeech: "" }, // Placeholder metadata
    "word",
    language as LanguageCode,
    scriptSystem,
  );

  // Add gender to extras if present
  if (gender) {
    wordNode.extras = {
      ...wordNode.extras,
      gender,
    };
  }

  return wordNode;
}

/**
 * Convert text (string or RubySegment array) to GLOST document
 * 
 * This is the main standardized converter that:
 * - Uses language strategy for script detection and gender terms
 * - Uses transcription providers for fetching transcription data
 * - Uses standardized GLOST node creation utilities
 * - Handles both plain strings and RubySegment arrays
 * - Supports gender filtering
 */
export function convertTextToGLOST(
  script: string | (string | RubySegment)[],
  options: ConvertTextToGLOSTOptions,
): GLOSTRoot {
  const {
    language,
    languageStrategy,
    transcriptionProvider,
    transcriptionScheme,
    genderFilter,
    fetchTranscription = false,
  } = options;

  const langCode = language as GlostLanguage;
  const scriptSystem = languageStrategy.getScriptForLanguage(language) as ScriptSystem;

  const words: GLOSTWord[] = [];
  const segments = Array.isArray(script) ? script : [script];

  segments.forEach((segment) => {
    if (isRubySegment(segment)) {
      // For RubySegment, check if base text contains gender terms
      // If it does, we need to split it (but this is complex with ruby)
      // For now, treat RubySegment as a single word
      const gender = detectGenderInText(segment.base, languageStrategy);
      words.push(
        createWordFromSegment(
          segment.base,
          segment.ruby,
          language,
          languageStrategy,
          transcriptionProvider,
          transcriptionScheme,
          gender,
          genderFilter,
          fetchTranscription,
        ),
      );
    } else {
      // Split string segment by gender terms
      const parts = segmentTextByGenderTerms(segment, languageStrategy);
      parts.forEach((part) => {
        words.push(
          createWordFromSegment(
            part.text,
            undefined,
            language,
            languageStrategy,
            transcriptionProvider,
            transcriptionScheme,
            part.gender,
            genderFilter,
            fetchTranscription,
          ),
        );
      });
    }
  });

  // Construct the GLOST tree using standardized utilities
  const originalText = Array.isArray(script)
    ? script.map((s) => (isRubySegment(s) ? s.base : s)).join("")
    : script;

  const sentence: GLOSTSentence = createGLOSTSentenceNode(
    originalText,
    langCode as LanguageCode,
    scriptSystem,
    words,
  );

  const paragraph: GLOSTParagraph = createGLOSTParagraphNode([sentence]);

  const root: GLOSTRoot = createGLOSTRootNode(
    langCode as LanguageCode,
    scriptSystem,
    [paragraph],
  );

  return root;
}

