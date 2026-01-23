/**
 * Test helpers for creating GLOST documents and nodes
 */
import {
  createGLOSTWordNode,
  createGLOSTSentenceNode,
  createGLOSTRootNode,
  createSimpleDocument,
  type GLOSTWord,
  type GLOSTRoot,
  type GLOSTSentence,
  type GLOSTParagraph,
} from "glost";
import { createThaiWord } from "glost-th";
import type { LanguageCode, ScriptSystem } from "glost";

/**
 * Create a simple test document with words
 */
export function createTestDocument(
  words: GLOSTWord[],
  lang: LanguageCode = "en",
  script: ScriptSystem = "latin",
  sentenceText?: string
): GLOSTRoot {
  return createSimpleDocument(words, lang, script, {
    sentenceText: sentenceText || words.map((w) => w.children?.[0]?.value || "").join(" "),
  });
}

/**
 * Create a test word node
 */
export function createTestWord(
  text: string,
  lang: LanguageCode = "en",
  script: ScriptSystem = "latin"
): GLOSTWord {
  return createGLOSTWordNode({
    value: text,
    lang,
    script,
  });
}

/**
 * Create a test sentence
 */
export function createTestSentence(
  words: GLOSTWord[],
  lang: LanguageCode = "en",
  script: ScriptSystem = "latin",
  originalText?: string
): GLOSTSentence {
  return createGLOSTSentenceNode({
    originalText: originalText || words.map((w) => w.children?.[0]?.value || "").join(" "),
    lang,
    script,
    children: words,
  });
}

/**
 * Create a Thai test word
 */
export function createThaiTestWord(text: string): GLOSTWord {
  return createThaiWord({ text });
}

/**
 * Create a test document with multiple sentences
 */
export function createMultiSentenceDocument(
  sentences: GLOSTSentence[],
  lang: LanguageCode = "en",
  script: ScriptSystem = "latin"
): GLOSTRoot {
  const paragraph: GLOSTParagraph = {
    type: "ParagraphNode",
    children: sentences,
  };
  return createGLOSTRootNode({
    lang,
    script,
    children: [paragraph],
  });
}

/**
 * Create a test word with transcription
 */
export function createWordWithTranscription(
  text: string,
  transcription: Record<string, { text: string; system: string }>,
  lang: LanguageCode = "en",
  script: ScriptSystem = "latin"
): GLOSTWord {
  return createGLOSTWordNode({
    value: text,
    lang,
    script,
    transcription,
  });
}

/**
 * Create a test word with translation
 */
export function createWordWithTranslation(
  text: string,
  translation: string,
  lang: LanguageCode = "en",
  script: ScriptSystem = "latin"
): GLOSTWord {
  return createGLOSTWordNode({
    value: text,
    lang,
    script,
    extras: {
      translations: {
        "en-US": translation,
      },
    },
  });
}
