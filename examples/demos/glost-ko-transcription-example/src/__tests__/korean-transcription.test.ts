/**
 * Tests for Korean Transcription Extension
 */

import { describe, it, expect } from "vitest";
import { createKoreanTranscriptionExtension } from "../index.js";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";
import { createGLOSTRootNode, createGLOSTSentenceNode, createGLOSTWordNode } from "glost";
import type { GLOSTRoot } from "glost";

describe("Korean Transcription Extension", () => {
  it("should add transcriptions to Korean words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "안녕하세요", lang: "ko", script: "hangul" }),
          ],
        }),
      ],
    });

    const extension = createKoreanTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    
    expect(word?.type).toBe("WordNode");
    expect(word?.transcription).toBeDefined();
    expect(word?.transcription?.rr?.text).toBe("annyeonghaseyo");
    expect(word?.transcription?.hangul?.text).toBe("안녕하세요");
  });

  it("should handle multiple Korean words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "한국어", lang: "ko", script: "hangul" }),
            createGLOSTWordNode({ value: "공부", lang: "ko", script: "hangul" }),
          ],
        }),
      ],
    });

    const extension = createKoreanTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word1 = sentence?.children?.[0];
    const word2 = sentence?.children?.[1];

    expect(word1?.transcription?.rr?.text).toBe("hangugeo");
    expect(word2?.transcription?.rr?.text).toBe("gongbu");
  });

  it("should include multiple transcription schemes", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "감사합니다", lang: "ko", script: "hangul" }),
          ],
        }),
      ],
    });

    const extension = createKoreanTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    
    expect(word?.transcription?.rr?.text).toBe("gamsahamnida");
    expect(word?.transcription?.mr?.text).toBe("kamsahamnida");
    expect(word?.transcription?.yale?.text).toBe("kamsa hamnita");
  });

  it("should not add transcriptions to non-Korean words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
          ],
        }),
      ],
    });

    const extension = createKoreanTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    expect(word?.transcription).toBeUndefined();
  });
});
