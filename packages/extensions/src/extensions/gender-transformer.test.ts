/**
 * Tests for Gender Transformer Extension
 */

import { describe, it, expect } from "vitest";
import {
  createGenderTransformerExtension,
  GenderTransformerExtension,
  type GenderVariantData,
} from "./gender-transformer";
import { processGLOSTWithExtensions } from "../processor";
import { createMockGLOSTDocument } from "../test-utils";
import type { GLOSTWord, GLOSTSentence } from "@glost/core";
import { getAllWords, getAllSentences, getWordText } from "@glost/core";

describe("GenderTransformerExtension", () => {
  it("should have correct metadata", () => {
    expect(GenderTransformerExtension.id).toBe("gender-transformer");
    expect(GenderTransformerExtension.name).toBe("Gender Transformer");
    expect(GenderTransformerExtension.description).toContain("gender");
  });

  it("should transform words with {male|female} syntax to male form", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "{ครับ|ค่ะ}",
          lang: "th-TH",
        },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "male",
      displayFormat: "replace",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    expect(words).toHaveLength(1);

    const word = words[0] as GLOSTWord;
    const text = getWordText(word);
    expect(text).toBe("ครับ");

    // Check gender variants are stored
    const genderData = word.extras?.genderVariants as GenderVariantData;
    expect(genderData).toBeDefined();
    expect(genderData.male).toBe("ครับ");
    expect(genderData.female).toBe("ค่ะ");
    expect(genderData.appliedGender).toBe("male");
  });

  it("should transform words with {male|female} syntax to female form", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "{ครับ|ค่ะ}",
          lang: "th-TH",
        },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "female",
      displayFormat: "replace",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    const word = words[0] as GLOSTWord;
    const text = getWordText(word);
    expect(text).toBe("ค่ะ");

    const genderData = word.extras?.genderVariants as GenderVariantData;
    expect(genderData.appliedGender).toBe("female");
  });

  it("should show both forms when targetGender is 'both' with show-both format", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "{ครับ|คะ}",
          lang: "th-TH",
        },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "both",
      displayFormat: "show-both",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    const word = words[0] as GLOSTWord;
    const text = getWordText(word);
    expect(text).toBe("ครับ/คะ");
  });

  it("should handle multiple gender variants in one word", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "{ผม|ดิฉัน}ชอบ{ครับ|ค่ะ}",
          lang: "th-TH",
        },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "female",
      displayFormat: "replace",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    const word = words[0] as GLOSTWord;
    const text = getWordText(word);
    expect(text).toBe("ดิฉันชอบค่ะ");
  });

  it("should not modify words without gender syntax", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "สวัสดี",
          lang: "th-TH",
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [GenderTransformerExtension]);

    const words = getAllWords(result.document);
    const word = words[0] as GLOSTWord;
    const text = getWordText(word);
    expect(text).toBe("สวัสดี");

    // Should not have genderVariants
    expect(word.extras?.genderVariants).toBeUndefined();
  });

  it("should transform sentence originalText when processSentences is true", () => {
    const doc = createMockGLOSTDocument({
      sentences: [
        {
          originalText: "ราคาเท่าไหร่{ครับ|คะ}",
          lang: "th-TH",
        },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "male",
      displayFormat: "replace",
      processSentences: true,
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const sentences = getAllSentences(result.document);
    expect(sentences).toHaveLength(1);

    const sentence = sentences[0] as GLOSTSentence;
    expect(sentence.originalText).toBe("ราคาเท่าไหร่ครับ");

    const genderData = sentence.extras?.genderVariants as GenderVariantData;
    expect(genderData.male).toBe("ราคาเท่าไหร่ครับ");
    expect(genderData.female).toBe("ราคาเท่าไหร่คะ");
  });

  it("should use default male form for inline-toggle display", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "{ครับ|ค่ะ}",
          lang: "th-TH",
        },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "both",
      displayFormat: "inline-toggle",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    const word = words[0] as GLOSTWord;
    const text = getWordText(word);

    // Default display is male form for inline-toggle
    expect(text).toBe("ครับ");

    // But both forms should be available
    const genderData = word.extras?.genderVariants as GenderVariantData;
    expect(genderData.male).toBe("ครับ");
    expect(genderData.female).toBe("ค่ะ");
    expect(genderData.displayFormat).toBe("inline-toggle");
  });

  it("should preserve original text in genderVariants", () => {
    const doc = createMockGLOSTDocument({
      words: [
        {
          text: "{ครับ|ค่ะ}",
          lang: "th-TH",
        },
      ],
    });

    const result = processGLOSTWithExtensions(doc, [GenderTransformerExtension]);

    const words = getAllWords(result.document);
    const word = words[0] as GLOSTWord;

    const genderData = word.extras?.genderVariants as GenderVariantData;
    expect(genderData.original).toBe("{ครับ|ค่ะ}");
  });

  it("should handle complex sentences with mixed content", () => {
    const doc = createMockGLOSTDocument({
      words: [
        { text: "สวัสดี", lang: "th-TH" },
        { text: "{ครับ|ค่ะ}", lang: "th-TH" },
        { text: "{ผม|ดิฉัน}", lang: "th-TH" },
        { text: "ชื่อ", lang: "th-TH" },
      ],
    });

    const extension = createGenderTransformerExtension({
      targetGender: "male",
      displayFormat: "replace",
    });

    const result = processGLOSTWithExtensions(doc, [extension]);

    const words = getAllWords(result.document);
    expect(words).toHaveLength(4);

    expect(getWordText(words[0] as GLOSTWord)).toBe("สวัสดี");
    expect(getWordText(words[1] as GLOSTWord)).toBe("ครับ");
    expect(getWordText(words[2] as GLOSTWord)).toBe("ผม");
    expect(getWordText(words[3] as GLOSTWord)).toBe("ชื่อ");

    // Only words with gender syntax should have genderVariants
    expect(words[0]?.extras?.genderVariants).toBeUndefined();
    expect(words[1]?.extras?.genderVariants).toBeDefined();
    expect(words[2]?.extras?.genderVariants).toBeDefined();
    expect(words[3]?.extras?.genderVariants).toBeUndefined();
  });
});
