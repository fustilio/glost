/**
 * Language Learning App - Real World Use Case Test
 * 
 * Simulates a complete language learning application workflow:
 * - Processing lessons with transcriptions
 * - Adding translations
 * - Calculating frequency and difficulty
 * - Performance requirements for responsive UI
 */

import { describe, it, expect } from 'vitest';
import {
  createSimpleDocument,
  createGLOSTWordNode,
  getAllWords,
  getFirstWord,
  NODE_TYPES,
} from 'glost';
import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';
import { createKoreanWord } from 'glost-ko';
import { processGLOST, type GLOSTExtension } from 'glost-extensions';
import {
  thaiGreetings,
  thaiParagraphs,
  getAllThaiSentences,
} from '../../../../__fixtures__/thai-corpus.js';
import {
  japaneseGreetings,
  getAllJapaneseSentences,
} from '../../../../__fixtures__/japanese-corpus.js';
import {
  thaiTranscriptions,
  japaneseTranscriptions,
  getTranscription,
} from '../../../../__fixtures__/transcription-data.js';
import {
  thaiToEnglish,
  japaneseToEnglish,
  getTranslation,
} from '../../../../__fixtures__/translation-data.js';

// Mock providers using our test data
class MockThaiTranscriptionProvider {
  async getTranscriptions(word: string) {
    return thaiTranscriptions[word];
  }
}

class MockTranslationProvider {
  async getTranslation(word: string, from: string, to: string) {
    if (from === 'th' && to === 'en') {
      return thaiToEnglish[word]?.en;
    }
    if (from === 'ja' && to === 'en') {
      return japaneseToEnglish[word]?.en;
    }
    return undefined;
  }
}

// Mock frequency provider
class MockFrequencyProvider {
  async getFrequency(word: string) {
    const commonWords = ["สวัสดี", "ครับ", "ค่ะ", "ขอบคุณ", "คน", "こんにちは", "ありがとう"];
    if (commonWords.includes(word)) {
      return "very-common";
    }
    return "common";
  }
}

// Simple mock extensions
function createMockTranscriptionExtension(): GLOSTExtension {
  return {
    id: 'mock-transcription',
    name: 'Mock Transcription',
    visit: {
      word: async (node) => {
        const text = node.children[0]?.value;
        if (!text) return node;
        
        const transcription = thaiTranscriptions[text] || japaneseTranscriptions[text];
        if (transcription) {
          return {
            ...node,
            transcription: transcription as any,
          };
        }
        return node;
      }
    }
  };
}

function createMockTranslationExtension(): GLOSTExtension {
  return {
    id: 'mock-translation',
    name: 'Mock Translation',
    visit: {
      word: async (node) => {
        const text = node.children[0]?.value;
        if (!text) return node;
        
        const translation = thaiToEnglish[text]?.en || japaneseToEnglish[text]?.en;
        if (translation) {
          return {
            ...node,
            extras: {
              ...node.extras,
              translations: { en: translation }
            }
          };
        }
        return node;
      }
    }
  };
}

describe('Language Learning App - Real World Scenario', () => {
  describe('Thai Lesson Processing', () => {
    it('should process a beginner Thai lesson with 5 sentences', async () => {
      // Create lesson from corpus
      const lesson = thaiGreetings.slice(0, 5);
      const words = lesson.flatMap(s => s.words.map(w => createThaiWord({ text: w })));
      const doc = createSimpleDocument(words, "th", "thai");

      // Process with extensions
      const extensions = [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ];

      const start = performance.now();
      const processed = await processGLOST(doc, extensions);
      const duration = performance.now() - start;

      // Verify processing completed quickly
      expect(duration).toBeLessThan(100); // Should be fast for small lessons

      // Verify enrichment
      const allWords = getAllWords(processed);
      expect(allWords.length).toBeGreaterThan(0);
      
      // Check that most common words have transcriptions
      const wordsWithTranscription = allWords.filter(w => w.transcription);
      expect(wordsWithTranscription.length).toBeGreaterThan(0);
    });

    it('should process a full Thai paragraph (intermediate level)', async () => {
      const paragraph = thaiParagraphs[1]; // Floating Market
      const words = paragraph.sentences.flatMap(s => 
        s.words.map(w => createThaiWord({ text: w }))
      );
      const doc = createSimpleDocument(words, "th", "thai", {
        metadata: {
          title: paragraph.titleEn,
          description: `Difficulty: ${paragraph.difficulty}`
        }
      });

      const processed = await processGLOST(doc, [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ]);

      const allWords = getAllWords(processed);
      expect(allWords.length).toBe(words.length);
      
      // Document metadata should be preserved
      expect(processed.metadata?.title).toBe(paragraph.titleEn);
    });

    it('should handle 50+ Thai words with full pipeline', async () => {
      const sentences = getAllThaiSentences().slice(0, 10);
      const words = sentences.flatMap(s => s.words.map(w => createThaiWord({ text: w })));
      const doc = createSimpleDocument(words, "th", "thai");

      const start = performance.now();
      const processed = await processGLOST(doc, [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ]);
      const duration = performance.now() - start;

      // Should process quickly even with 50+ words
      expect(duration).toBeLessThan(200);
      expect(getAllWords(processed).length).toBe(words.length);
    });
  });

  describe('Japanese Lesson Processing', () => {
    it('should process Japanese greetings', async () => {
      const lesson = japaneseGreetings.slice(0, 3);
      const words = lesson.flatMap(s => s.words.map(w => createJapaneseWord({ text: w })));
      const doc = createSimpleDocument(words, "ja", "hiragana");

      const processed = await processGLOST(doc, [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ]);

      const allWords = getAllWords(processed);
      expect(allWords.length).toBe(words.length);
    });
  });

  describe('Multi-Language Support', () => {
    it('should handle mixed language content', async () => {
      const thaiWords = [createThaiWord({ text: "สวัสดี" })];
      const japWords = [createJapaneseWord({ text: "こんにちは" })];
      
      // Process Thai
      const thaiDoc = createSimpleDocument(thaiWords, "th", "thai");
      const processedThai = await processGLOST(thaiDoc, [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ]);

      // Process Japanese
      const japDoc = createSimpleDocument(japWords, "ja", "hiragana");
      const processedJap = await processGLOST(japDoc, [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ]);

      expect(getFirstWord(processedThai)?.transcription).toBeDefined();
      expect(getFirstWord(processedJap)?.transcription).toBeDefined();
    });
  });

  describe('Performance Requirements', () => {
    it('should process 20-word lesson in under 50ms', async () => {
      const words = Array.from({ length: 20 }, (_, i) => 
        createThaiWord({ text: `word${i}` })
      );
      const doc = createSimpleDocument(words, "th", "thai");

      const start = performance.now();
      await processGLOST(doc, [createMockTranscriptionExtension()]);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(50);
    });

    it('should process 100-word lesson in under 150ms', async () => {
      const words = Array.from({ length: 100 }, (_, i) => 
        createThaiWord({ text: `word${i}` })
      );
      const doc = createSimpleDocument(words, "th", "thai");

      const start = performance.now();
      await processGLOST(doc, [createMockTranscriptionExtension()]);
      const duration = performance.now() - start;

      expect(duration).toBeLessThan(150);
    });
  });

  describe('Data Integrity', () => {
    it('should preserve original text during processing', async () => {
      const originalText = "สวัสดีครับ";
      const words = [createThaiWord({ text: originalText })];
      const doc = createSimpleDocument(words, "th", "thai");

      const processed = await processGLOST(doc, [
        createMockTranscriptionExtension(),
        createMockTranslationExtension(),
      ]);

      const firstWord = getFirstWord(processed);
      expect(firstWord?.children[0]?.value).toBe(originalText);
    });

    it('should not lose metadata during processing', async () => {
      const word = createThaiWord({ text: "สวัสดี" });
      word.metadata = { ...word.metadata, custom: "value" };
      
      const doc = createSimpleDocument([word], "th", "thai");
      const processed = await processGLOST(doc, [createMockTranscriptionExtension()]);

      const firstWord = getFirstWord(processed);
      expect((firstWord?.metadata as any)?.custom).toBe("value");
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty document gracefully', async () => {
      const doc = createSimpleDocument([], "th", "thai");
      const processed = await processGLOST(doc, [createMockTranscriptionExtension()]);
      
      expect(getAllWords(processed).length).toBe(0);
    });

    it('should handle words without transcription data', async () => {
      const unknownWord = createThaiWord({ text: "ไม่มีข้อมูล" });
      const doc = createSimpleDocument([unknownWord], "th", "thai");
      
      const processed = await processGLOST(doc, [createMockTranscriptionExtension()]);
      
      // Should not crash, just skip the word
      expect(getAllWords(processed).length).toBe(1);
    });

    it('should handle very long words', async () => {
      const longWord = "ก".repeat(100);
      const word = createThaiWord({ text: longWord });
      const doc = createSimpleDocument([word], "th", "thai");
      
      const processed = await processGLOST(doc, [createMockTranscriptionExtension()]);
      expect(getFirstWord(processed)?.children[0]?.value).toBe(longWord);
    });
  });
});
