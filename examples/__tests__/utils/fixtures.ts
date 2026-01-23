/**
 * Shared test fixtures and data
 */
import { createThaiWord } from "glost-th";
import type { GLOSTWord } from "glost";

/**
 * Common Thai test words
 */
export const thaiTestWords = {
  hello: createThaiWord({ text: "สวัสดี" }),
  thankYou: createThaiWord({ text: "ขอบคุณ" }),
  please: createThaiWord({ text: "กรุณา" }),
  yes: createThaiWord({ text: "ใช่" }),
  no: createThaiWord({ text: "ไม่" }),
};

/**
 * Common Japanese test words (using createGLOSTWordNode)
 */
import { createGLOSTWordNode } from "glost";

export const japaneseTestWords = {
  hello: createGLOSTWordNode({
    value: "こんにちは",
    lang: "ja",
    script: "hiragana",
  }),
  thankYou: createGLOSTWordNode({
    value: "ありがとう",
    lang: "ja",
    script: "hiragana",
  }),
  yes: createGLOSTWordNode({
    value: "はい",
    lang: "ja",
    script: "hiragana",
  }),
  no: createGLOSTWordNode({
    value: "いいえ",
    lang: "ja",
    script: "hiragana",
  }),
};

/**
 * Common Korean test words
 */
export const koreanTestWords = {
  hello: createGLOSTWordNode({
    value: "안녕하세요",
    lang: "ko",
    script: "hangul",
  }),
  thankYou: createGLOSTWordNode({
    value: "감사합니다",
    lang: "ko",
    script: "hangul",
  }),
  yes: createGLOSTWordNode({
    value: "네",
    lang: "ko",
    script: "hangul",
  }),
  no: createGLOSTWordNode({
    value: "아니요",
    lang: "ko",
    script: "hangul",
  }),
};

/**
 * Common English test words
 */
export const englishTestWords = {
  hello: createGLOSTWordNode({
    value: "hello",
    lang: "en",
    script: "latin",
  }),
  world: createGLOSTWordNode({
    value: "world",
    lang: "en",
    script: "latin",
  }),
  thankYou: createGLOSTWordNode({
    value: "thank",
    lang: "en",
    script: "latin",
  }),
  please: createGLOSTWordNode({
    value: "please",
    lang: "en",
    script: "latin",
  }),
};

/**
 * Test sentences by language
 */
export const testSentences = {
  thai: {
    greeting: "สวัสดีครับ",
    thankYou: "ขอบคุณมาก",
    introduction: "ผมชื่อจอห์น",
  },
  japanese: {
    greeting: "こんにちは",
    thankYou: "ありがとうございます",
    introduction: "私の名前はジョンです",
  },
  korean: {
    greeting: "안녕하세요",
    thankYou: "감사합니다",
    introduction: "제 이름은 존입니다",
  },
  english: {
    greeting: "Hello",
    thankYou: "Thank you",
    introduction: "My name is John",
  },
};

/**
 * Create a simple test document with Thai words
 */
export function createThaiTestDocument(): { words: GLOSTWord[]; text: string } {
  const words = [thaiTestWords.hello, thaiTestWords.thankYou];
  return {
    words,
    text: "สวัสดี ขอบคุณ",
  };
}

/**
 * Create a simple test document with Japanese words
 */
export function createJapaneseTestDocument(): { words: GLOSTWord[]; text: string } {
  const words = [japaneseTestWords.hello, japaneseTestWords.thankYou];
  return {
    words,
    text: "こんにちは ありがとう",
  };
}

/**
 * Create a simple test document with Korean words
 */
export function createKoreanTestDocument(): { words: GLOSTWord[]; text: string } {
  const words = [koreanTestWords.hello, koreanTestWords.thankYou];
  return {
    words,
    text: "안녕하세요 감사합니다",
  };
}

/**
 * Create a simple test document with English words
 */
export function createEnglishTestDocument(): { words: GLOSTWord[]; text: string } {
  const words = [englishTestWords.hello, englishTestWords.world];
  return {
    words,
    text: "hello world",
  };
}
