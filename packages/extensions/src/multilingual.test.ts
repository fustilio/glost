import { describe, it, expect } from "vitest";
import { processGLOSTWithExtensions } from "./processor";
import {
  FrequencyExtension,
  DifficultyExtension,
  GenderExtension,
} from "./extensions";
import { createMockGLOSTDocument, createMockGLOSTWord } from "./test-utils";

describe("Multilingual Extension Tests", () => {
  describe("Thai", () => {
    it("should process Thai text with gender extension", () => {
      const word = createMockGLOSTWord("ครับ", {
        lang: "th-TH",
        script: "thai",
        extras: {
          gender: "male",
          metadata: { frequency: "very-common" },
        },
      });
      const document = createMockGLOSTDocument([word], { lang: "th-TH", script: "thai" });

      const result = processGLOSTWithExtensions(document, [
        GenderExtension,
        FrequencyExtension,
      ]);

      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.gender?.type).toBe("male");
        expect(processedWord.extras?.frequency?.level).toBe("very-common");
      }
    });
  });

  describe("Japanese", () => {
    it("should process Japanese text with extensions", () => {
      const word = createMockGLOSTWord("日本語", {
        lang: "ja-JP",
        script: "kanji",
        extras: {
          metadata: {
            frequency: "common",
            difficulty: "intermediate",
          },
        },
      });
      const document = createMockGLOSTDocument([word], { lang: "ja-JP", script: "kanji" });

      const result = processGLOSTWithExtensions(document, [
        FrequencyExtension,
        DifficultyExtension,
      ]);

      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency).toBeDefined();
        expect(processedWord.extras?.difficulty).toBeDefined();
      }
    });
  });

  describe("Chinese", () => {
    it("should process Chinese text with extensions", () => {
      const word = createMockGLOSTWord("你好", {
        lang: "zh-CN",
        script: "hanzi",
        extras: {
          metadata: {
            frequency: "very-common",
            difficulty: "beginner",
          },
        },
      });
      const document = createMockGLOSTDocument([word], { lang: "zh-CN", script: "hanzi" });

      const result = processGLOSTWithExtensions(document, [
        FrequencyExtension,
        DifficultyExtension,
      ]);

      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency?.level).toBe("very-common");
        expect(processedWord.extras?.difficulty?.level).toBe("beginner");
      }
    });
  });

  describe("Korean", () => {
    it("should process Korean text with extensions", () => {
      const word = createMockGLOSTWord("안녕하세요", {
        lang: "ko-KR",
        script: "hangul",
        extras: {
          metadata: {
            frequency: "very-common",
            difficulty: "beginner",
          },
        },
      });
      const document = createMockGLOSTDocument([word], { lang: "ko-KR", script: "hangul" });

      const result = processGLOSTWithExtensions(document, [
        FrequencyExtension,
        DifficultyExtension,
      ]);

      const words = result.document.children[0]?.children[0]?.children || [];
      const processedWord = words[0];

      if (processedWord && processedWord.type === "WordNode") {
        expect(processedWord.extras?.frequency).toBeDefined();
        expect(processedWord.extras?.difficulty).toBeDefined();
      }
    });
  });

  describe("Cross-language compatibility", () => {
    it("should process mixed language document", () => {
      const thaiWord = createMockGLOSTWord("สวัสดี", {
        lang: "th-TH",
        extras: { gender: "male", metadata: { frequency: "very-common" } },
      });
      const japaneseWord = createMockGLOSTWord("日本語", {
        lang: "ja-JP",
        extras: { metadata: { frequency: "common" } },
      });

      // Create document with both words
      const document = createMockGLOSTDocument([thaiWord, japaneseWord]);

      const result = processGLOSTWithExtensions(document, [
        GenderExtension,
        FrequencyExtension,
      ]);

      const words = result.document.children[0]?.children[0]?.children || [];
      expect(words.length).toBe(2);

      // Thai word should have gender
      const thaiProcessed = words[0];
      if (thaiProcessed && thaiProcessed.type === "WordNode") {
        expect(thaiProcessed.extras?.gender).toBeDefined();
        expect(thaiProcessed.extras?.frequency).toBeDefined();
      }

      // Japanese word should have frequency but no gender
      const japaneseProcessed = words[1];
      if (japaneseProcessed && japaneseProcessed.type === "WordNode") {
        expect(japaneseProcessed.extras?.frequency).toBeDefined();
        expect(japaneseProcessed.extras?.gender).toBeUndefined();
      }
    });
  });
});

