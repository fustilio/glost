/**
 * Document Traversal Performance Benchmarks
 * 
 * Compares different approaches to traversing and accessing GLOST documents
 */

import { bench, describe } from 'vitest';
import { 
  createSimpleDocument,
  createGLOSTWordNode,
  getAllWords,
  getFirstWord,
  getWordAtPath,
  getAllSentences,
  getAllParagraphs,
} from '../index.js';
import { visit } from 'unist-util-visit';
import { NODE_TYPES } from '../types.js';

// Helper to create test documents
function createTestDocument(wordCount: number) {
  const words = Array.from({ length: wordCount }, (_, i) => 
    createGLOSTWordNode({ 
      value: `word${i}`,
      transcription: {
        ipa: { text: `wɜːrd${i}`, syllables: [`word${i}`] }
      },
      metadata: { partOfSpeech: i % 2 === 0 ? "noun" : "verb" }
    })
  );
  return createSimpleDocument(words, "en", "latin");
}

describe('Traversal: Comparing Access Patterns', () => {
  const doc1000 = createTestDocument(1000);

  describe('Compare: Getting All Words', () => {
    bench('getAllWords (helper)', () => {
      getAllWords(doc1000);
    });

    bench('visit with type filter', () => {
      const words: any[] = [];
      visit(doc1000, NODE_TYPES.WORD, (node) => {
        words.push(node);
      });
    });

    bench('manual recursive traversal', () => {
      const words: any[] = [];
      function traverse(node: any) {
        if (node.type === NODE_TYPES.WORD) {
          words.push(node);
        }
        if (node.children) {
          node.children.forEach(traverse);
        }
      }
      traverse(doc1000);
    });
  });

  describe('Compare: Finding First Word', () => {
    bench('getFirstWord (optimized with SKIP)', () => {
      getFirstWord(doc1000);
    });

    bench('getAllWords then [0]', () => {
      getAllWords(doc1000)[0];
    });

    bench('manual early-exit traversal', () => {
      let found: any;
      function traverse(node: any): boolean {
        if (node.type === NODE_TYPES.WORD) {
          found = node;
          return true; // exit early
        }
        if (node.children) {
          for (const child of node.children) {
            if (traverse(child)) return true;
          }
        }
        return false;
      }
      traverse(doc1000);
    });
  });

  describe('Compare: Direct Path Access', () => {
    bench('getWordAtPath (direct indexing)', () => {
      getWordAtPath(doc1000, { paragraph: 0, sentence: 0, word: 500 });
    });

    bench('getAllWords then filter by index', () => {
      getAllWords(doc1000)[500];
    });
  });
});

describe('Traversal: Comparing Filter Strategies', () => {
  const doc500 = createTestDocument(500);

  describe('Compare: Filter by Part of Speech', () => {
    bench('getAllWords + array filter', () => {
      const words = getAllWords(doc500);
      words.filter(w => w.metadata?.partOfSpeech === "noun");
    });

    bench('visit with conditional push', () => {
      const nouns: any[] = [];
      visit(doc500, NODE_TYPES.WORD, (node: any) => {
        if (node.metadata?.partOfSpeech === "noun") {
          nouns.push(node);
        }
      });
    });
  });

  describe('Compare: Extract Word Text', () => {
    const words = getAllWords(doc500);

    bench('map with type guard', () => {
      words.map(w => {
        const textNode = w.children[0];
        return textNode && 'value' in textNode ? textNode.value : '';
      });
    });

    bench('reduce to array', () => {
      words.reduce((acc, w) => {
        const textNode = w.children[0];
        if (textNode && 'value' in textNode) {
          acc.push(textNode.value);
        }
        return acc;
      }, [] as string[]);
    });
  });

  describe('Compare: Count with Condition', () => {
    const words = getAllWords(doc500);

    bench('filter then length', () => {
      words.filter(w => w.transcription !== undefined).length;
    });

    bench('reduce with counter', () => {
      words.reduce((count, w) => count + (w.transcription ? 1 : 0), 0);
    });
  });
});
