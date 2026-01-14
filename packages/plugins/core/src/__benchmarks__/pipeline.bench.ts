/**
 * Extension Pipeline Performance Benchmarks
 * 
 * Compares different extension processing strategies and patterns
 */

import { bench, describe } from 'vitest';
import { createSimpleDocument, createGLOSTWordNode, getAllWords } from 'glost-core';
import { 
  processGLOST,
  processGLOSTWithMeta,
  type GLOSTExtension,
} from '../index.js';

// Helper to create test document
function createTestDocument(wordCount: number) {
  const words = Array.from({ length: wordCount }, (_, i) => 
    createGLOSTWordNode({ value: `word${i}` })
  );
  return createSimpleDocument(words, "en", "latin");
}

// Simple extension that adds metadata
function createSimpleExtension(id: string): GLOSTExtension {
  return {
    id,
    name: `Simple Extension ${id}`,
    visit: {
      word: (node) => ({
        ...node,
        extras: {
          ...node.extras,
          [id]: true,
        }
      })
    }
  };
}

// Processing extension (more complex)
function createProcessingExtension(id: string): GLOSTExtension {
  return {
    id,
    name: `Processing Extension ${id}`,
    visit: {
      word: (node) => {
        const textNode = node.children[0];
        const text = textNode && 'value' in textNode ? textNode.value : "";
        return {
          ...node,
          extras: {
            ...node.extras,
            [id]: {
              length: text.length,
              uppercase: text.toUpperCase(),
              lowercase: text.toLowerCase(),
            }
          }
        };
      }
    }
  };
}

// Async extension
function createAsyncExtension(id: string): GLOSTExtension {
  return {
    id,
    name: `Async Extension ${id}`,
    visit: {
      word: async (node) => {
        await new Promise(resolve => setImmediate(resolve));
        return {
          ...node,
          extras: { ...node.extras, [id]: true }
        };
      }
    }
  };
}

describe('Extension Pipeline: Comparing Strategies', () => {
  const doc100 = createTestDocument(100);

  describe('Compare: API Methods', () => {
    const ext = createSimpleExtension('test');

    bench('processGLOST (returns document)', async () => {
      await processGLOST(doc100, [ext]);
    });

    bench('processGLOSTWithMeta (returns metadata)', async () => {
      await processGLOSTWithMeta(doc100, [ext]);
    });
  });

  describe('Compare: Extension Complexity', () => {
    bench('simple extension (set flag)', async () => {
      await processGLOST(doc100, [createSimpleExtension('simple')]);
    });

    bench('processing extension (transform text)', async () => {
      await processGLOST(doc100, [createProcessingExtension('process')]);
    });

    bench('async extension (with await)', async () => {
      await processGLOST(doc100, [createAsyncExtension('async')]);
    });
  });

  describe('Compare: Extension Composition', () => {
    bench('single extension', async () => {
      await processGLOST(doc100, [createSimpleExtension('ext1')]);
    });

    bench('3 extensions (sequential)', async () => {
      await processGLOST(doc100, [
        createSimpleExtension('ext1'),
        createSimpleExtension('ext2'),
        createSimpleExtension('ext3'),
      ]);
    });

    bench('5 extensions (sequential)', async () => {
      const extensions = Array.from({ length: 5 }, (_, i) => 
        createSimpleExtension(`ext${i}`)
      );
      await processGLOST(doc100, extensions);
    });
  });
});

describe('Extension Pipeline: Comparing Document Sizes', () => {
  const ext = createSimpleExtension('test');

  describe('Compare: Small vs Large Documents', () => {
    const doc10 = createTestDocument(10);
    const doc100 = createTestDocument(100);
    const doc500 = createTestDocument(500);

    bench('10 words', async () => {
      await processGLOST(doc10, [ext]);
    });

    bench('100 words', async () => {
      await processGLOST(doc100, [ext]);
    });

    bench('500 words', async () => {
      await processGLOST(doc500, [ext]);
    });
  });
});

describe('Extension Pipeline: Comparing Implementation Patterns', () => {
  const doc50 = createTestDocument(50);

  describe('Compare: Node Mutation Strategies', () => {
    const spreadExtension: GLOSTExtension = {
      id: 'spread',
      name: 'Spread Pattern',
      visit: {
        word: (node) => ({
          ...node,
          extras: { ...node.extras, processed: true }
        })
      }
    };

    const objectAssignExtension: GLOSTExtension = {
      id: 'assign',
      name: 'Object.assign Pattern',
      visit: {
        word: (node) => Object.assign({}, node, {
          extras: Object.assign({}, node.extras, { processed: true })
        })
      }
    };

    bench('spread operator pattern', async () => {
      await processGLOST(doc50, [spreadExtension]);
    });

    bench('Object.assign pattern', async () => {
      await processGLOST(doc50, [objectAssignExtension]);
    });
  });
});
