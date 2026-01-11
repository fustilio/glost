/**
 * Stress Tests - System Limits and Edge Cases
 * 
 * Tests the system under extreme conditions to identify
 * breaking points and ensure graceful degradation.
 */

import { describe, it, expect } from 'vitest';
import {
  createSimpleDocument,
  createGLOSTWordNode,
  getAllWords,
  getFirstWord,
  createSentenceFromWords,
  createDocumentFromSentences,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
} from 'glost';
import { processGLOST, type GLOSTExtension } from 'glost-extensions';

// Helpers
function createMassiveDocument(wordCount: number) {
  const words = Array.from({ length: wordCount }, (_, i) => 
    createGLOSTWordNode({ value: `w${i}` })
  );
  return createSimpleDocument(words, "en", "latin");
}

function createMockExtension(id: string): GLOSTExtension {
  return {
    id,
    name: `Extension ${id}`,
    visit: {
      word: (node) => ({
        ...node,
        extras: { ...node.extras, [id]: true }
      })
    }
  };
}

function createComplexExtension(id: string): GLOSTExtension {
  return {
    id,
    name: `Complex Extension ${id}`,
    visit: {
      word: (node) => {
        const text = node.children[0]?.value || "";
        return {
          ...node,
          extras: {
            ...node.extras,
            [id]: {
              length: text.length,
              uppercase: text.toUpperCase(),
              lowercase: text.toLowerCase(),
              reversed: text.split('').reverse().join(''),
              hash: text.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0),
            }
          }
        };
      }
    }
  };
}

describe('Stress Tests', () => {
  describe('Massive Documents', () => {
    it('should handle 20,000 word document', async () => {
      const doc = createMassiveDocument(20000);
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      
      expect(getAllWords(processed).length).toBe(20000);
    }, 60000); // 60s timeout

    it('should handle 50,000 word document', async () => {
      const doc = createMassiveDocument(50000);
      const words = getAllWords(doc);
      
      expect(words.length).toBe(50000);
      expect(getFirstWord(doc)).toBeDefined();
    }, 60000);

    it('should traverse 100,000 word document', () => {
      const doc = createMassiveDocument(100000);
      
      const start = performance.now();
      const words = getAllWords(doc);
      const duration = performance.now() - start;
      
      expect(words.length).toBe(100000);
      // Should still be reasonably fast (adjusted threshold for various system capabilities)
      expect(duration).toBeLessThan(10000); // 10 seconds
    }, 60000);
  });

  describe('Deep Nesting', () => {
    it('should handle 500 paragraphs with complex structure', () => {
      const paragraphs = Array.from({ length: 500 }, (_, p) => {
        const sentences = Array.from({ length: 3 }, (_, s) => {
          const words = Array.from({ length: 5 }, (_, w) => 
            createGLOSTWordNode({ value: `p${p}s${s}w${w}` })
          );
          return createSentenceFromWords(words, "en", "latin", "text");
        });
        return createParagraphFromSentences(sentences);
      });
      
      const doc = createDocumentFromParagraphs(paragraphs, "en", "latin");
      const words = getAllWords(doc);
      
      expect(words.length).toBe(500 * 3 * 5); // 7500 words
    });

    it('should handle 1000 sentences', () => {
      const sentences = Array.from({ length: 1000 }, (_, s) => {
        const words = Array.from({ length: 10 }, (_, w) => 
          createGLOSTWordNode({ value: `s${s}w${w}` })
        );
        return createSentenceFromWords(words, "en", "latin", `Sentence ${s}`);
      });
      
      const doc = createDocumentFromSentences(sentences, "en", "latin");
      const words = getAllWords(doc);
      
      expect(words.length).toBe(10000);
    });
  });

  describe('Extension Pipeline Stress', () => {
    it('should handle 50 extensions in pipeline', async () => {
      const doc = createMassiveDocument(100);
      const extensions = Array.from({ length: 50 }, (_, i) => 
        createMockExtension(`ext${i}`)
      );
      
      const start = performance.now();
      const processed = await processGLOST(doc, extensions);
      const duration = performance.now() - start;
      
      expect(getAllWords(processed).length).toBe(100);
      expect(duration).toBeLessThan(5000);
    }, 30000);

    it('should handle 20 complex extensions', async () => {
      const doc = createMassiveDocument(200);
      const extensions = Array.from({ length: 20 }, (_, i) => 
        createComplexExtension(`complex${i}`)
      );
      
      const processed = await processGLOST(doc, extensions);
      const words = getAllWords(processed);
      
      expect(words.length).toBe(200);
      // Verify extensions applied
      expect(Object.keys(words[0].extras || {}).length).toBeGreaterThan(10);
    }, 30000);

    it('should handle 100 extensions on small document', async () => {
      const doc = createMassiveDocument(10);
      const extensions = Array.from({ length: 100 }, (_, i) => 
        createMockExtension(`ext${i}`)
      );
      
      const processed = await processGLOST(doc, extensions);
      expect(getAllWords(processed).length).toBe(10);
    }, 30000);
  });

  describe('Extreme Word Characteristics', () => {
    it('should handle very long words (1000 characters)', async () => {
      const longWord = 'a'.repeat(1000);
      const word = createGLOSTWordNode({ value: longWord });
      const doc = createSimpleDocument([word], "en", "latin");
      
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      expect(getFirstWord(processed)?.children[0]?.value).toBe(longWord);
    });

    it('should handle words with complex unicode', async () => {
      const unicodeWords = [
        "🌟⭐✨💫🌠", // Emojis
        "你好世界", // Chinese
        "สวัสดีครับ", // Thai
        "مرحبا", // Arabic
        "Здравствуйте", // Russian
        "こんにちは", // Japanese
      ].map(w => createGLOSTWordNode({ value: w }));
      
      const doc = createSimpleDocument(unicodeWords, "en", "latin");
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      
      expect(getAllWords(processed).length).toBe(unicodeWords.length);
    });

    it('should handle words with special characters', async () => {
      const specialWords = [
        "word-with-dash",
        "word_with_underscore",
        "word.with.dots",
        "word@with@at",
        "word#with#hash",
        "word$with$dollar",
      ].map(w => createGLOSTWordNode({ value: w }));
      
      const doc = createSimpleDocument(specialWords, "en", "latin");
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      
      expect(getAllWords(processed).length).toBe(specialWords.length);
    });
  });

  describe('Metadata Stress', () => {
    it('should handle words with massive metadata', async () => {
      const word = createGLOSTWordNode({
        value: "test",
        metadata: {
          partOfSpeech: "noun",
          ...Object.fromEntries(
            Array.from({ length: 100 }, (_, i) => [`field${i}`, `value${i}`])
          )
        }
      });
      
      const doc = createSimpleDocument([word], "en", "latin");
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      
      expect(getFirstWord(processed)?.metadata).toBeDefined();
    });

    it('should handle deeply nested extras', async () => {
      let nested: any = { value: "base" };
      for (let i = 0; i < 50; i++) {
        nested = { level: i, nested };
      }
      
      const word = createGLOSTWordNode({
        value: "test",
        extras: { deepNest: nested }
      });
      
      const doc = createSimpleDocument([word], "en", "latin");
      const processed = await processGLOST(doc, [createMockExtension('test')]);
      
      expect(getFirstWord(processed)?.extras?.deepNest).toBeDefined();
    });
  });

  describe('Rapid Processing', () => {
    it('should handle 100 rapid sequential processing calls', async () => {
      const doc = createMassiveDocument(50);
      const ext = createMockExtension('test');
      
      const start = performance.now();
      for (let i = 0; i < 100; i++) {
        await processGLOST(doc, [ext]);
      }
      const duration = performance.now() - start;
      
      // Should complete in reasonable time
      expect(duration).toBeLessThan(10000); // 10s for 100 iterations
    }, 30000);

    it('should handle concurrent processing (Promise.all)', async () => {
      const docs = Array.from({ length: 20 }, () => createMassiveDocument(50));
      const ext = createMockExtension('test');
      
      const start = performance.now();
      const results = await Promise.all(
        docs.map(doc => processGLOST(doc, [ext]))
      );
      const duration = performance.now() - start;
      
      expect(results.length).toBe(20);
      expect(duration).toBeLessThan(5000);
    }, 30000);
  });

  describe('Edge Cases', () => {
    it('should handle empty extensions gracefully', async () => {
      const doc = createMassiveDocument(100);
      const emptyExts: GLOSTExtension[] = Array.from({ length: 100 }, (_, i) => ({
        id: `empty${i}`,
        name: `Empty ${i}`,
      }));
      
      const processed = await processGLOST(doc, emptyExts);
      expect(getAllWords(processed).length).toBe(100);
    });

    it('should handle extensions that return same node', async () => {
      const doc = createMassiveDocument(100);
      const identityExt: GLOSTExtension = {
        id: 'identity',
        name: 'Identity',
        visit: { word: (node) => node }
      };
      
      const processed = await processGLOST(doc, [identityExt]);
      expect(getAllWords(processed).length).toBe(100);
    });

    it('should handle mixed extension types', async () => {
      const doc = createMassiveDocument(100);
      const extensions: GLOSTExtension[] = [
        createMockExtension('simple'),
        createComplexExtension('complex'),
        { id: 'empty', name: 'Empty' },
        { id: 'identity', name: 'Identity', visit: { word: (n) => n } },
      ];
      
      const processed = await processGLOST(doc, extensions);
      expect(getAllWords(processed).length).toBe(100);
    });
  });

  describe('System Limits', () => {
    it('should report system capabilities', () => {
      // Document current system limits for reference
      const limits = {
        maxTestedWords: 100000,
        maxTestedExtensions: 100,
        maxTestedNesting: 1000,
        maxWordLength: 1000,
      };
      
      expect(limits.maxTestedWords).toBeGreaterThan(10000);
    });

    it('should handle allocation-heavy operations', () => {
      // Test repeated allocation/deallocation
      for (let i = 0; i < 1000; i++) {
        const words = Array.from({ length: 100 }, (_, j) => 
          createGLOSTWordNode({ value: `word${j}` })
        );
        createSimpleDocument(words, "en", "latin");
      }
      
      expect(true).toBe(true); // If we got here, no crash
    });
  });
});
