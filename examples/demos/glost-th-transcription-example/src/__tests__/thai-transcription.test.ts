/**
 * Tests for Thai Transcription Extension
 */

import { describe, it, expect } from "vitest";
import { createThaiTranscriptionExtension, THAI_TRANSCRIPTION_SCHEMES } from "../index.js";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";
import { createGLOSTRootNode, createGLOSTSentenceNode, createGLOSTWordNode } from "glost";
import type { GLOSTRoot } from "glost";

describe("Thai Transcription Extension", () => {
  it("should add transcriptions to Thai words", async () => {
    // Create a simple GLOST document
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "สวัสดี", lang: "th", script: "thai" }),
          ],
        }),
      ],
    });

    // Apply transcription extension
    const extension = createThaiTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    // Check that transcriptions were added
    const sentence = result.document.children?.[0];
    expect(sentence).toBeDefined();
    
    const word = sentence?.children?.[0];
    expect(word?.type).toBe("WordNode");
    expect(word?.transcription).toBeDefined();
    expect(word?.transcription?.rtgs).toBeDefined();
    expect(word?.transcription?.rtgs?.text).toBe("sawatdi");
    expect(word?.transcription?.ipa).toBeDefined();
    expect(word?.transcription?.ipa?.text).toBe("sà.wàt.diː");
  });

  it("should handle multiple Thai words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "ภาษา", lang: "th", script: "thai" }),
            createGLOSTWordNode({ value: "ไทย", lang: "th", script: "thai" }),
          ],
        }),
      ],
    });

    const extension = createThaiTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word1 = sentence?.children?.[0];
    const word2 = sentence?.children?.[1];

    expect(word1?.transcription?.rtgs?.text).toBe("phasa");
    expect(word2?.transcription?.rtgs?.text).toBe("thai");
  });

  it("should not add transcriptions to non-Thai words", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "hello", lang: "en", script: "latin" }),
          ],
        }),
      ],
    });

    const extension = createThaiTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    expect(word?.transcription).toBeUndefined();
  });

  it("should handle words not in demo data gracefully", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "ไม่มีในข้อมูล", lang: "th", script: "thai" }),
          ],
        }),
      ],
    });

    const extension = createThaiTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    // Should not have transcriptions since it's not in demo data
    expect(word?.transcription).toBeUndefined();
  });

  it("should include multiple transcription schemes", async () => {
    const doc: GLOSTRoot = createGLOSTRootNode({
      children: [
        createGLOSTSentenceNode({
          children: [
            createGLOSTWordNode({ value: "ขอบคุณ", lang: "th", script: "thai" }),
          ],
        }),
      ],
    });

    const extension = createThaiTranscriptionExtension();
    const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

    const sentence = result.document.children?.[0];
    const word = sentence?.children?.[0];
    
    // Should have multiple schemes
    expect(word?.transcription?.rtgs?.text).toBe("khop khun");
    expect(word?.transcription?.ipa?.text).toBe("kʰɔ̀ːp.kʰun");
    expect(word?.transcription?.["paiboon+"]?.text).toBe("kòrp-kun");
    expect(word?.transcription?.aua?.text).toBe("khop khun");
  });

  it("should export Thai transcription schemes", () => {
    expect(THAI_TRANSCRIPTION_SCHEMES).toBeDefined();
    expect(THAI_TRANSCRIPTION_SCHEMES.RTGS).toBe("rtgs");
    expect(THAI_TRANSCRIPTION_SCHEMES.IPA).toBe("ipa");
    expect(THAI_TRANSCRIPTION_SCHEMES.PAIBOON_PLUS).toBe("paiboon+");
  });
});
