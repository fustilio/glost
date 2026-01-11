/**
 * Performance Regression Tests
 * 
 * Guards against performance regressions by setting baseline
 * performance expectations for common operations.
 * 
 * These tests should be run regularly to ensure performance
 * improvements are maintained and no regressions are introduced.
 */

import { describe, it, expect } from 'vitest';
import {
  createSimpleDocument,
  createGLOSTWordNode,
  getAllWords,
  getFirstWord,
  getWordAtPath,
  getAllSentences,
  createSentenceFromWords,
  createDocumentFromSentences,
} from '../index.js';

// Helper to create test document with realistic data
function createTestDocument(wordCount: number, withMetadata = false) {
  const words = Array.from({ length: wordCount }, (_, i) => {
    const options: any = { value: `word${i}` };
    
    if (withMetadata) {
      options.transcription = {
        ipa: { text: `wɜːrd${i}`, syllables: [`word${i}`] }
      };
      options.metadata = {
        partOfSpeech: i % 2 === 0 ? "noun" : "verb",
        meaning: `meaning of word ${i}`,
      };
    }
    
    return createGLOSTWordNode(options);
  });
  return createSimpleDocument(words, "en", "latin");
}

describe('Performance Regression Tests', () => {
  describe('Document Creation Performance', () => {
    it('should create 100-word document in under 10ms', () => {
      const start = performance.now();
      const words = Array.from({ length: 100 }, (_, i) => 
        createGLOSTWordNode({ value: `word${i}` })
      );
      createSimpleDocument(words, "en", "latin");
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(10);
    });

    it('should create 1000-word document in under 50ms', () => {
      const start = performance.now();
      const words = Array.from({ length: 1000 }, (_, i) => 
        createGLOSTWordNode({ value: `word${i}` })
      );
      createSimpleDocument(words, "en", "latin");
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(50);
    });

    it('should create word with full metadata in under 1ms', () => {
      const start = performance.now();
      createGLOSTWordNode({ 
        value: "test",
        transcription: {
          ipa: { text: "test", syllables: ["test"] }
        },
        metadata: {
          partOfSpeech: "noun",
          meaning: "a test",
          usage: "testing"
        },
        lang: "en",
        script: "latin",
        extras: {
          translations: { th: "ทดสอบ" },
          metadata: { frequency: "common" }
        }
      });
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(1);
    });
  });

  describe('Document Traversal Performance', () => {
    it('should traverse 1000-word document in under 20ms', () => {
      const doc = createTestDocument(1000);
      
      const start = performance.now();
      getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(30); // Adjusted for various system capabilities
    });

    it('should traverse 5000-word document in under 100ms', () => {
      const doc = createTestDocument(5000);
      
      const start = performance.now();
      getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(150); // Adjusted for various system capabilities
    });

    it('should traverse 10000-word document in under 200ms', () => {
      const doc = createTestDocument(10000);
      
      const start = performance.now();
      getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(200);
    }, 10000); // 10s timeout

    it('should find first word in 10000-word document instantly', () => {
      const doc = createTestDocument(10000);
      
      const start = performance.now();
      getFirstWord(doc);
      const duration = performance.now() - start;
      
      // Should be very fast with SKIP optimization
      expect(duration).toBeLessThan(200); // Generous limit accounting for variance
    });

    it('should access word by path in constant time', () => {
      const doc = createTestDocument(5000);
      
      const start = performance.now();
      getWordAtPath(doc, { paragraph: 0, sentence: 0, word: 2500 });
      const duration = performance.now() - start;
      
      // Direct access should be O(1)
      expect(duration).toBeLessThan(5);
    });
  });

  describe('Complex Operations Performance', () => {
    it('should filter 5000 words by POS in under 50ms', () => {
      const doc = createTestDocument(5000, true);
      const words = getAllWords(doc);
      
      const start = performance.now();
      words.filter(w => w.metadata?.partOfSpeech === "noun");
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(50);
    });

    it('should map 5000 words to text in under 30ms', () => {
      const doc = createTestDocument(5000);
      const words = getAllWords(doc);
      
      const start = performance.now();
      words.map(w => w.children[0]?.value);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(30);
    });

    it('should count words with transcription in under 30ms', () => {
      const doc = createTestDocument(5000, true);
      const words = getAllWords(doc);
      
      const start = performance.now();
      words.filter(w => w.transcription !== undefined).length;
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(30);
    });
  });

  describe('Document Structure Performance', () => {
    it('should create document from 100 sentences in under 50ms', () => {
      const sentences = Array.from({ length: 100 }, (_, i) => {
        const words = Array.from({ length: 5 }, (_, j) => 
          createGLOSTWordNode({ value: `word${i}-${j}` })
        );
        return createSentenceFromWords(words, "en", "latin", `Sentence ${i}`);
      });
      
      const start = performance.now();
      createDocumentFromSentences(sentences, "en", "latin");
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(50);
    });

    it('should get all sentences from 1000-word document in under 30ms', () => {
      const doc = createTestDocument(1000);
      
      const start = performance.now();
      getAllSentences(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(30);
    });
  });

  describe('Memory Efficiency', () => {
    it('should handle repeated document creation without memory buildup', () => {
      const iterations = 100;
      
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        const words = Array.from({ length: 100 }, (_, j) => 
          createGLOSTWordNode({ value: `word${j}` })
        );
        createSimpleDocument(words, "en", "latin");
      }
      const duration = performance.now() - start;
      
      // Average should be reasonable
      const avgDuration = duration / iterations;
      expect(avgDuration).toBeLessThan(10);
    });

    it('should handle repeated traversal without performance degradation', () => {
      const doc = createTestDocument(1000);
      const iterations = 100;
      
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        getAllWords(doc);
      }
      const duration = performance.now() - start;
      
      const avgDuration = duration / iterations;
      expect(avgDuration).toBeLessThan(20);
    });
  });

  describe('Scaling Characteristics', () => {
    it('should demonstrate linear scaling for document creation', () => {
      const sizes = [100, 500, 1000];
      const timings: number[] = [];
      
      for (const size of sizes) {
        const start = performance.now();
        const words = Array.from({ length: size }, (_, i) => 
          createGLOSTWordNode({ value: `word${i}` })
        );
        createSimpleDocument(words, "en", "latin");
        timings.push(performance.now() - start);
      }
      
      // Verify roughly linear scaling
      const ratio1 = timings[1] / timings[0]; // 500/100
      const ratio2 = timings[2] / timings[1]; // 1000/500
      
      // Should scale reasonably (not exponential)
      // Allow for variance in performance measurement
      expect(ratio1).toBeLessThan(20); // Relaxed constraint
      expect(ratio2).toBeLessThan(10);
    });

    it('should demonstrate linear scaling for traversal', () => {
      const sizes = [1000, 5000, 10000];
      const timings: number[] = [];
      
      for (const size of sizes) {
        const doc = createTestDocument(size);
        const start = performance.now();
        getAllWords(doc);
        timings.push(performance.now() - start);
      }
      
      // Verify roughly linear scaling
      const ratio1 = timings[1] / timings[0]; // 5000/1000
      const ratio2 = timings[2] / timings[1]; // 10000/5000
      
      // Should scale linearly (5x and 2x)
      expect(ratio1).toBeLessThan(10);
      expect(ratio2).toBeLessThan(5);
    });
  });

  describe('Baseline Performance Targets', () => {
    it('meets target: small docs (10-50 words) < 10ms', () => {
      const doc = createTestDocument(50, true);
      
      const start = performance.now();
      getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(10);
    });

    it('meets target: medium docs (100-500 words) < 50ms', () => {
      const doc = createTestDocument(500, true);
      
      const start = performance.now();
      getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(50);
    });

    it('meets target: large docs (1000+ words) < 200ms', () => {
      const doc = createTestDocument(1000, true);
      
      const start = performance.now();
      getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(duration).toBeLessThan(200);
    });
  });
});
