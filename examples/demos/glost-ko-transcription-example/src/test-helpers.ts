/**
 * Test helpers for creating GLOST documents and nodes
 */
import {
  createGLOSTWordNode,
  createSimpleDocument,
  type GLOSTWord,
  type GLOSTRoot,
} from "glost";
import type { LanguageCode, ScriptSystem } from "glost";
import { getWordText, getAllWords } from "glost";
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
 * Assert that a word has the expected text
 */
export function expectWordText(word: GLOSTWord, expectedText: string): void {
  const text = getWordText(word);
  expect(text).toBe(expectedText);
}

/**
 * Assert that a document has the expected number of words
 */
export function expectDocumentWordCount(document: GLOSTRoot, expectedCount: number): void {
  const words = getAllWords(document);
  expect(words.length).toBe(expectedCount);
}
