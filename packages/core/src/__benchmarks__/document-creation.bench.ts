/**
 * Document Creation Performance Benchmarks
 * 
 * Compares different approaches to creating GLOST documents
 */

import { bench, describe } from 'vitest';
import { 
  createSimpleDocument, 
  createGLOSTWordNode, 
  createDocumentFromSentences,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
} from '../index.js';

describe('Document Creation: Comparing Approaches', () => {
  // Setup: Create test data once
  const words100 = Array.from({ length: 100 }, (_, i) => 
    createGLOSTWordNode({ value: `word${i}` })
  );

  describe('Compare: Simple vs Full Hierarchy (100 words)', () => {
    bench('createSimpleDocument (recommended)', () => {
      createSimpleDocument(words100, "en", "latin");
    });

    bench('createDocumentFromSentences', () => {
      const sentence = createSentenceFromWords(words100, "en", "latin", "text");
      createDocumentFromSentences([sentence], "en", "latin");
    });

    bench('createDocumentFromParagraphs (full hierarchy)', () => {
      const sentence = createSentenceFromWords(words100, "en", "latin", "text");
      const paragraph = createParagraphFromSentences([sentence]);
      createDocumentFromParagraphs([paragraph], "en", "latin");
    });
  });

  describe('Compare: Word Node Creation Approaches', () => {
    bench('minimal word node', () => {
      createGLOSTWordNode({ value: "test" });
    });

    bench('word with transcription', () => {
      createGLOSTWordNode({ 
        value: "test",
        transcription: {
          ipa: { text: "test", syllables: ["test"] }
        }
      });
    });

    bench('word with full metadata', () => {
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
    });
  });

  describe('Compare: Sentence Creation Strategies', () => {
    const words10 = Array.from({ length: 10 }, (_, i) => 
      createGLOSTWordNode({ value: `word${i}` })
    );

    bench('createDocumentFromSentences - multiple small sentences', () => {
      const sentences = Array.from({ length: 10 }, (_, i) => {
        const sentenceWords = words10.slice(i, i + 5);
        return createSentenceFromWords(sentenceWords, "en", "latin", `Sentence ${i}`);
      });
      createDocumentFromSentences(sentences, "en", "latin");
    });

    bench('createSimpleDocument - single sentence', () => {
      createSimpleDocument(words10, "en", "latin");
    });
  });
});
