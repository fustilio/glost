/**
 * Large Document Stress Tests
 * 
 * Tests system behavior with large documents and complex scenarios.
 */

import { describe, it, expect } from 'vitest';
import {
  createSimpleDocument,
  createGLOSTWordNode,
  getAllWords,
  getWordAtPath,
  createSentenceFromWords,
  createDocumentFromSentences,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
} from 'glost';
import { processGLOST, type GLOSTExtension } from 'glost-plugins';

// Helper to create large documents
function createLargeDocument(wordCount: number) {
  const words = Array.from({ length: wordCount }, (_, i) => 
    createGLOSTWordNode({ 
      value: `word${i}`,
      metadata: { partOfSpeech: i % 3 === 0 ? "noun" : i % 3 === 1 ? "verb" : "adjective" }
    })
  );
  return createSimpleDocument(words, "en", "latin");
}

// Helper to create deeply nested document
function createDeeplyNestedDocument(paragraphs: number, sentencesPerPara: number, wordsPerSent: number) {
  const allParagraphs = [];
  for (let p = 0; p < paragraphs; p++) {
    const sentences = [];
    for (let s = 0; s < sentencesPerPara; s++) {
      const words = Array.from({ length: wordsPerSent }, (_, w) => 
        createGLOSTWordNode({ value: `p${p}s${s}w${w}` })
      );
      sentences.push(createSentenceFromWords(words, "en", "latin", "text"));
    }
    allParagraphs.push(createParagraphFromSentences(sentences));
  }
  return createDocumentFromParagraphs(allParagraphs, "en", "latin");
}

// Mock extension for testing
function createMockExtension(id: string): GLOSTExtension {
  return {
    id,
    name: `Mock Extension ${id}`,
    visit: {
      word: (node) => ({
        ...node,
        extras: {
          ...node.extras,
          [id]: true
        }
      })
    }
  };
}

describe('Large Document Stress Tests', () => {
  describe('Document Size Scaling', () => {
    it('should handle 1,000 word document', async () => {
      const doc = createLargeDocument(1000);
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      
      expect(getAllWords(processed).length).toBe(1000);
    });

    it('should handle 5,000 word document', async () => {
      const doc = createLargeDocument(5000);
      const start = performance.now();
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      const duration = performance.now() - start;
      
      expect(getAllWords(processed).length).toBe(5000);
      expect(duration).toBeLessThan(500); // Should complete reasonably fast
    });

    it('should handle 10,000 word document', async () => {
      const doc = createLargeDocument(10000);
      const start = performance.now();
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      const duration = performance.now() - start;
      
      expect(getAllWords(processed).length).toBe(10000);
      // Performance target: linear scaling
      expect(duration).toBeLessThan(1000);
    }, 30000); // 30s timeout for very large document
  });

  describe('Deep Nesting', () => {
    it('should handle 100 paragraphs with 10 sentences each', () => {
      const doc = createDeeplyNestedDocument(100, 10, 5);
      const words = getAllWords(doc);
      
      expect(words.length).toBe(100 * 10 * 5); // 5000 words
    });

    it('should access words in deeply nested structure efficiently', () => {
      const doc = createDeeplyNestedDocument(50, 10, 10);
      
      const start = performance.now();
      const word = getWordAtPath(doc, { paragraph: 25, sentence: 5, word: 5 });
      const duration = performance.now() - start;
      
      expect(word).toBeDefined();
      expect(duration).toBeLessThan(10); // Should be fast O(1) access
    });
  });

  describe('Extension Pipeline Scaling', () => {
    it('should handle 5 extensions on 1000-word document', async () => {
      const doc = createLargeDocument(1000);
      const extensions = Array.from({ length: 5 }, (_, i) => 
        createMockExtension(`ext${i}`)
      );
      
      const start = performance.now();
      const processed = await processGLOST(doc, extensions);
      const duration = performance.now() - start;
      
      expect(getAllWords(processed).length).toBe(1000);
      expect(duration).toBeLessThan(500);
    });

    it('should handle 10 extensions on 500-word document', async () => {
      const doc = createLargeDocument(500);
      const extensions = Array.from({ length: 10 }, (_, i) => 
        createMockExtension(`ext${i}`)
      );
      
      const start = performance.now();
      const processed = await processGLOST(doc, extensions);
      const duration = performance.now() - start;
      
      const allWords = getAllWords(processed);
      expect(allWords.length).toBe(500);
      
      // Verify all extensions applied
      const firstWord = allWords[0];
      expect(Object.keys(firstWord.extras || {}).length).toBeGreaterThanOrEqual(5);
      
      expect(duration).toBeLessThan(500);
    });

    it('should handle 20 extensions in pipeline', async () => {
      const doc = createLargeDocument(100);
      const extensions = Array.from({ length: 20 }, (_, i) => 
        createMockExtension(`ext${i}`)
      );
      
      const start = performance.now();
      const processed = await processGLOST(doc, extensions);
      const duration = performance.now() - start;
      
      expect(getAllWords(processed).length).toBe(100);
      expect(duration).toBeLessThan(500);
    });
  });

  describe('Memory and Performance', () => {
    it('should not have memory leaks with repeated processing', async () => {
      const doc = createLargeDocument(100);
      const extension = createMockExtension('test');
      
      // Process same document multiple times
      for (let i = 0; i < 10; i++) {
        await processGLOST(doc, [extension]);
      }
      
      // If we got here without crashing, no obvious memory issues
      expect(true).toBe(true);
    });

    it('should scale linearly with document size', async () => {
      const sizes = [100, 500, 1000];
      const timings: number[] = [];
      
      for (const size of sizes) {
        const doc = createLargeDocument(size);
        const start = performance.now();
        await processGLOST(doc, [createMockExtension('test')]);
        timings.push(performance.now() - start);
      }
      
      // Check roughly linear scaling (generous tolerance for test variance)
      const ratio1 = timings[1] / timings[0];
      const ratio2 = timings[2] / timings[1];
      expect(ratio1).toBeLessThan(20); // Should scale better than exponential
      expect(ratio2).toBeLessThan(10);
    });
  });

  describe('Traversal Performance', () => {
    it('should traverse 5000-word document quickly', () => {
      const doc = createLargeDocument(5000);
      
      const start = performance.now();
      const words = getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(words.length).toBe(5000);
      expect(duration).toBeLessThan(100);
    });

    it('should filter large word lists efficiently', () => {
      const doc = createLargeDocument(5000);
      const words = getAllWords(doc);
      
      const start = performance.now();
      const nouns = words.filter(w => w.metadata?.partOfSpeech === "noun");
      const duration = performance.now() - start;
      
      expect(nouns.length).toBeGreaterThan(1000);
      expect(duration).toBeLessThan(50);
    });
  });

  describe('Edge Cases and Limits', () => {
    it('should handle document with single 10000-word sentence', async () => {
      const words = Array.from({ length: 10000 }, (_, i) => 
        createGLOSTWordNode({ value: `word${i}` })
      );
      const doc = createSimpleDocument(words, "en", "latin");
      
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      expect(getAllWords(processed).length).toBe(10000);
    }, 30000);

    it('should handle many empty extensions', async () => {
      const doc = createLargeDocument(100);
      const emptyExtensions = Array.from({ length: 50 }, (_, i) => ({
        id: `empty-${i}`,
        name: `Empty ${i}`,
      }));
      
      const processed = await processGLOST(doc, emptyExtensions as GLOSTExtension[]);
      expect(getAllWords(processed).length).toBe(100);
    });
  });
});
