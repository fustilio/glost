/**
 * Tests for Japanese Transcription Extension
 */

import { describe, it, expect } from "vitest";
import { createJapaneseTranscriptionExtension } from "../index.js";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import { createGLOSTRootNode, createGLOSTSentenceNode, createGLOSTWordNode } from "glost";
import type { GLOSTRoot } from "glost";

describe("Japanese Transcription Extension", () => {
  it("should add transcriptions to Japanese words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "こんにちは", lang: "ja", script: "hiragana" }),
          ],
        }),
      ],
    });

    const extension = createJapaneseTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    
    expect(word?.type).toBe("WordNode");
    expect(word?.transcription).toBeDefined();
    expect(word?.transcription?.romaji?.text).toBe("konnichiwa");
    expect(word?.transcription?.hiragana?.text).toBe("こんにちは");
  });

  it("should handle multiple Japanese words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "日本語", lang: "ja", script: "kanji" }),
            createGLOSTWordNode({ value: "勉強", lang: "ja", script: "kanji" }),
          ],
        }),
      ],
    });

    const extension = createJapaneseTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word1 = sentence?.children?.[0];
    const word2 = sentence?.children?.[1];

    expect(word1?.transcription?.romaji?.text).toBe("nihongo");
    expect(word1?.transcription?.hiragana?.text).toBe("にほんご");
    expect(word2?.transcription?.romaji?.text).toBe("benkyou");
    expect(word2?.transcription?.hiragana?.text).toBe("べんきょう");
  });

  it("should include multiple transcription schemes", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "カタカナ", lang: "ja", script: "katakana" }),
          ],
        }),
      ],
    });

    const extension = createJapaneseTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    
    expect(word?.transcription?.romaji?.text).toBe("katakana");
    expect(word?.transcription?.hiragana?.text).toBe("かたかな");
    expect(word?.transcription?.katakana?.text).toBe("カタカナ");
    expect(word?.transcription?.hepburn?.text).toBe("katakana");
  });

  it("should not add transcriptions to non-Japanese words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
          ],
        }),
      ],
    });

    const extension = createJapaneseTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    expect(word?.transcription).toBeUndefined();
  });
});
