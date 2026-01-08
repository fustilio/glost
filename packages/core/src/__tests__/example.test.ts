// Example test file showing how to use fixtures
// This demonstrates that fixtures are only imported in test files

import { describe, it, expect } from 'vitest';
import {
  thaiDocumentWithExtras,
  japaneseDocumentWithExtras,
  getQuickTranslation,
  getDifficulty
} from './mock-data.js';
import { getAllWords } from '../utils.js';


describe('Using mock data fixtures', () => {
  it('should load Thai document with extras', () => {
    expect(thaiDocumentWithExtras.type).toBe('RootNode');
    expect(thaiDocumentWithExtras.lang).toBe('th');

    const words = getAllWords(thaiDocumentWithExtras);
    expect(words.length).toBeGreaterThan(0);
  });

  it('should load Japanese document with extras', () => {
    expect(japaneseDocumentWithExtras.type).toBe('RootNode');
    expect(japaneseDocumentWithExtras.lang).toBe('ja');

    const words = getAllWords(japaneseDocumentWithExtras);
    expect(words.length).toBeGreaterThan(0);
  });

  it('should access translation data from fixtures', () => {
    const words = getAllWords(thaiDocumentWithExtras);
    const firstWord = words[0];

    if (firstWord) {
      const englishTranslation = getQuickTranslation(firstWord, 'en');
      expect(englishTranslation).toBeDefined();

      const difficulty = getDifficulty(firstWord);
      expect(difficulty).toBeDefined();
    }
  });
});
