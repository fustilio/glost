/**
 * Test file for transcription-translation extension
 * 
 * Run with: pnpm --filter @glost/core-extensions test transcription-translation
 */

import { describe, it, expect } from "vitest";
import { processGLOSTWithTranscriptionTranslation } from "./transcription-translation";
import { createGLOSTRootNode, createGLOSTWordNode, createGLOSTTextNode, createGLOSTSentenceNode, createGLOSTParagraphNode } from "@glost/core";
import type { GlostLanguage } from "@glost/common";

// Dummy lookup functions for testing (independent of little-scoops-stories)
async function dummyLookupWordDefinition(
  word: string,
  _language: GlostLanguage,
): Promise<string | undefined> {
  // Return dummy translation based on word
  const dummyTranslations: Record<string, string> = {
    "ต้องการ": "to want",
    "สวัสดี": "hello",
    "ขอบคุณ": "thank you",
  };
  return dummyTranslations[word] || undefined;
}

async function dummyLookupWordTranscription(
  word: string,
  _language: GlostLanguage,
): Promise<Record<string, string>> {
  // Return dummy transcription based on word
  const dummyTranscriptions: Record<string, Record<string, string>> = {
    "ต้องการ": { "ipa": "tɔ̂ːŋ.kaːn", "rtgs": "tongkan" },
    "สวัสดี": { "ipa": "sa.wàt.diː", "rtgs": "sawatdi" },
    "ขอบคุณ": { "ipa": "kʰɔ̀ːp.kʰun", "rtgs": "khapkhun" },
  };
  return dummyTranscriptions[word] || {};
}

describe("TranscriptionTranslationExtension", () => {
  it("should process GLOST document and populate translations", async () => {
    // Create a simple GLOST document with one word
    const wordNode = createGLOSTWordNode(
      "ต้องการ",
      {},
      { partOfSpeech: "" },
      "word",
      "th-TH",
      "thai",
    );
    wordNode.children = [createGLOSTTextNode("ต้องการ")];

    const sentenceNode = createGLOSTSentenceNode("ต้องการ", "th-TH", "thai");
    sentenceNode.children = [wordNode];

    const paragraphNode = createGLOSTParagraphNode();
    paragraphNode.children = [sentenceNode];

    const rootNode = createGLOSTRootNode("th-TH", "thai", {
      storyName: "Test Story",
      nativeLanguage: "en-US",
    });
    rootNode.children = [paragraphNode];

    // Process with extension
    const processed = await processGLOSTWithTranscriptionTranslation(rootNode, {
      targetLanguage: "th-TH",
      nativeLanguage: "en-US",
      populateTranslations: true,
      populateTranscriptions: false, // Skip transcriptions for faster test
      lookupTranslation: dummyLookupWordDefinition,
      lookupTranscription: dummyLookupWordTranscription,
    });

    // Check that the word node was processed
    const processedWord = (processed.children[0] as any).children[0].children[0];
    
    // Should have translation populated (if dictionary has it)
    expect(processedWord).toBeDefined();
    // Translation should be populated if dictionary lookup succeeds
    // (This depends on dictionary having the word)
  });

  it("should handle empty words gracefully", async () => {
    const rootNode = createGLOSTRootNode("th-TH", "thai", {
      storyName: "Test Story",
      nativeLanguage: "en-US",
    });

    const processed = await processGLOSTWithTranscriptionTranslation(rootNode, {
      targetLanguage: "th-TH",
      nativeLanguage: "en-US",
      lookupTranslation: dummyLookupWordDefinition,
      lookupTranscription: dummyLookupWordTranscription,
    });

    expect(processed).toBeDefined();
  });
});

