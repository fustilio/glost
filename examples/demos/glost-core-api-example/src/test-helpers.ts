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
import {
  getWordText,
  getWordTranscription,
  getWordTranslation,
  getAllWords,
  getAllSentences,
} from "glost";
import { expect } from "vitest";

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
 * Create a Thai test word
 */
export function createThaiTestWord(text: string): GLOSTWord {
  return createThaiWord({ text });
}

/**
 * Assert that a word has the expected text
 */
export function expectWordText(word: GLOSTWord, expectedText: string): void {
  const text = getWordText(word);
  expect(text).toBe(expectedText);
}

/**
 * Assert that a word has transcription
 */
export function expectWordHasTranscription(word: GLOSTWord, system?: string): void {
  if (system) {
    const transcription = getWordTranscription(word, system);
    expect(transcription).toBeDefined();
    expect(transcription).not.toBeNull();
  } else {
    expect(word.transcription).toBeDefined();
    expect(word.transcription).not.toBeNull();
    expect(Object.keys(word.transcription || {}).length).toBeGreaterThan(0);
  }
}

/**
 * Assert that a word has translation
 */
export function expectWordHasTranslation(word: GLOSTWord): void {
  const translation = getWordTranslation(word);
  expect(translation).toBeDefined();
  expect(translation).not.toBeNull();
}

/**
 * Assert that a document has the expected number of words
 */
export function expectDocumentWordCount(document: GLOSTRoot, expectedCount: number): void {
  const words = getAllWords(document);
  expect(words.length).toBe(expectedCount);
}

/**
 * Assert that a word has the expected structure
 */
export function expectWordStructure(word: GLOSTWord): void {
  expect(word.type).toBe("WordNode");
  expect(word.children).toBeDefined();
  expect(Array.isArray(word.children)).toBe(true);
  expect(word.children.length).toBeGreaterThan(0);
}

/**
 * Assert that a sentence has the expected structure
 */
export function expectSentenceStructure(sentence: GLOSTSentence): void {
  expect(sentence.type).toBe("SentenceNode");
  expect(sentence.lang).toBeDefined();
  expect(sentence.script).toBeDefined();
  expect(sentence.originalText).toBeDefined();
  expect(sentence.children).toBeDefined();
  expect(Array.isArray(sentence.children)).toBe(true);
}

/**
 * Assert that a document has the expected structure
 */
export function expectDocumentStructure(document: GLOSTRoot): void {
  expect(document.type).toBe("RootNode");
  expect(document.lang).toBeDefined();
  expect(document.script).toBeDefined();
  expect(document.children).toBeDefined();
  expect(Array.isArray(document.children)).toBe(true);
  expect(document.children.length).toBeGreaterThan(0);
}

/**
 * Assert that all words in a document have transcriptions
 */
export function expectAllWordsHaveTranscription(
  document: GLOSTRoot,
  system?: string
): void {
  const words = getAllWords(document);
  for (const word of words) {
    expectWordHasTranscription(word, system);
  }
}

/**
 * Assert that all words in a document have translations
 */
export function expectAllWordsHaveTranslation(document: GLOSTRoot): void {
  const words = getAllWords(document);
  for (const word of words) {
    expectWordHasTranslation(word);
  }
}
