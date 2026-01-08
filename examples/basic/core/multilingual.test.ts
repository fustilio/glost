/**
 * Core: Multilingual Support
 *
 * Demonstrates GLOST's multilingual capabilities:
 * - Creating Thai words with RTGS transcription
 * - Creating Japanese words with romaji and furigana
 * - Creating Chinese words with pinyin
 * - Working with multiple transcription systems
 */

import { describe, it, expect } from "vitest";

import {
  createGLOSTWordNode,
  createSentenceFromWords,
  createDocumentFromParagraphs,
  createParagraphFromSentences,
  getAllWords,
  getWordText,
  getWordTranscription,
  type GLOSTWord,
  type TransliterationData,
  type LinguisticMetadata,
} from "glost";

import { createThaiWord } from "glost-th";
import { createJapaneseWord } from "glost-ja";

describe("Multilingual Support", () => {
  describe("Thai Language", () => {
    it("creates Thai words with RTGS transcription", () => {
      const word = createThaiWord("สวัสดี", "sa-wat-di", "interjection", 2, [
        "สวัส",
        "ดี",
      ]);

      expect(getWordText(word)).toBe("สวัสดี");
      expect(getWordTranscription(word, "rtgs")).toBe("sa-wat-di");
      expect(word.lang).toBe("th");
      expect(word.script).toBe("thai");
    });

    it("creates a Thai greeting sentence with translations", () => {
      const words: GLOSTWord[] = [
        createThaiWord("สวัสดี", "sa-wat-di", "interjection", 2),
        createThaiWord("ครับ", "khrap", "particle", 2),
      ];

      // Add extras with translations
      words[0].extras = {
        translations: { en: "hello" },
        metadata: { frequency: "very-common" },
      };
      words[1].extras = {
        translations: { en: "(polite particle, male)" },
        metadata: {
          culturalNotes: "Used by male speakers to show politeness",
        },
      };

      const sentence = createSentenceFromWords(
        words,
        "th",
        "thai",
        "สวัสดีครับ"
      );
      sentence.extras = {
        translations: { en: "Hello (polite, male speaker)" },
      };

      expect(sentence.originalText).toBe("สวัสดีครับ");
      expect(sentence.extras?.translations?.en).toBe(
        "Hello (polite, male speaker)"
      );
    });
  });

  describe("Japanese Language", () => {
    it("creates Japanese words with romaji and furigana", () => {
      const word = createJapaneseWord("私", "watashi", "pronoun", "わたし");

      expect(getWordText(word)).toBe("私");
      expect(getWordTranscription(word, "romaji")).toBe("watashi");
      expect(getWordTranscription(word, "furigana")).toBe("わたし");
      expect(word.lang).toBe("ja");
    });

    it("creates a Japanese self-introduction with translations", () => {
      const words: GLOSTWord[] = [
        createJapaneseWord("私", "watashi", "pronoun", "わたし"),
        createJapaneseWord("の", "no", "particle"),
        createJapaneseWord("名前", "namae", "noun", "なまえ"),
        createJapaneseWord("は", "wa", "particle"),
        createJapaneseWord("田中", "Tanaka", "noun", "たなか"),
        createJapaneseWord("です", "desu", "copula"),
      ];

      words[0].extras = {
        translations: { en: "I/me" },
        metadata: { formality: "neutral" },
      };
      words[2].extras = { translations: { en: "name" } };
      words[4].extras = {
        translations: { en: "(surname) Tanaka" },
        metadata: { type: "proper-noun" },
      };

      const sentence = createSentenceFromWords(
        words,
        "ja",
        "mixed",
        "私の名前は田中です。"
      );
      sentence.extras = { translations: { en: "My name is Tanaka." } };

      expect(sentence.children).toHaveLength(6);
      expect(sentence.extras?.translations?.en).toBe("My name is Tanaka.");
    });
  });

  describe("Chinese Language", () => {
    function createChineseWord(
      text: string,
      pinyin: string,
      partOfSpeech: string,
      tone: number
    ): GLOSTWord {
      const transcription: TransliterationData = {
        pinyin: {
          text: pinyin,
          system: "pinyin",
          tone,
          syllables: [text],
        },
      };

      const metadata: LinguisticMetadata = { partOfSpeech };

      return createGLOSTWordNode(
        text,
        transcription,
        metadata,
        "word",
        "zh",
        "hanzi"
      );
    }

    it("creates Chinese words with pinyin and tones", () => {
      const word = createChineseWord("你", "nǐ", "pronoun", 3);

      expect(getWordText(word)).toBe("你");
      expect(getWordTranscription(word, "pinyin")).toBe("nǐ");
      expect(word.transcription.pinyin?.tone).toBe(3);
      expect(word.lang).toBe("zh");
    });

    it("creates a Chinese greeting with translations", () => {
      const words: GLOSTWord[] = [
        createChineseWord("你", "nǐ", "pronoun", 3),
        createChineseWord("好", "hǎo", "adjective", 3),
      ];

      words[0].extras = { translations: { en: "you" } };
      words[1].extras = { translations: { en: "good/well" } };

      const sentence = createSentenceFromWords(words, "zh", "hanzi", "你好");
      sentence.extras = { translations: { en: "Hello" } };

      expect(sentence.originalText).toBe("你好");
      expect(
        getAllWords({
          type: "RootNode",
          lang: "zh",
          script: "hanzi",
          children: [{ type: "ParagraphNode", children: [sentence] }],
        })
      ).toHaveLength(2);
    });
  });

  describe("Multiple Transcription Systems", () => {
    it("creates a word with multiple transcription systems", () => {
      const word = createGLOSTWordNode(
        "東京",
        {
          romaji: {
            text: "Tōkyō",
            system: "romaji",
            syllables: ["To", "kyo"],
          },
          furigana: {
            text: "とうきょう",
            system: "furigana",
            syllables: ["とう", "きょう"],
          },
          ipa: {
            text: "toːkʲoː",
            system: "ipa",
            syllables: ["toː", "kʲoː"],
          },
        },
        { partOfSpeech: "proper-noun" },
        "word",
        "ja",
        "kanji"
      );

      // Add translation via extras
      word.extras = { translations: { en: "Tokyo" } };

      expect(getWordText(word)).toBe("東京");
      expect(getWordTranscription(word, "romaji")).toBe("Tōkyō");
      expect(getWordTranscription(word, "furigana")).toBe("とうきょう");
      expect(getWordTranscription(word, "ipa")).toBe("toːkʲoː");
    });
  });

  describe("Multilingual Documents", () => {
    it("creates separate documents for each language", () => {
      const thaiDoc = createDocumentFromParagraphs(
        [
          createParagraphFromSentences([
            createSentenceFromWords(
              [createThaiWord("สวัสดี", "sa-wat-di", "interjection")],
              "th",
              "thai",
              "สวัสดี"
            ),
          ]),
        ],
        "th",
        "thai",
        { title: "Thai Greeting" }
      );

      const japaneseDoc = createDocumentFromParagraphs(
        [
          createParagraphFromSentences([
            createSentenceFromWords(
              [createJapaneseWord("こんにちは", "konnichiwa", "interjection")],
              "ja",
              "hiragana",
              "こんにちは"
            ),
          ]),
        ],
        "ja",
        "hiragana",
        { title: "Japanese Greeting" }
      );

      expect(thaiDoc.lang).toBe("th");
      expect(thaiDoc.metadata?.title).toBe("Thai Greeting");
      expect(japaneseDoc.lang).toBe("ja");
      expect(japaneseDoc.metadata?.title).toBe("Japanese Greeting");
    });
  });
});
