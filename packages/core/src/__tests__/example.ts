// Example usage of the GLOST package
import {
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
  getAllWords,
  getWordTranscription,
  validateGLOSTTree,
  getWordText
} from '../index';
import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';

// ============================================================================
// Thai Example: "สวัสดีครับ ผมชื่อสมชาย" (Hello, my name is Somchai)
// ============================================================================

const thaiWords = [
  createThaiWord({
    text: 'สวัสดี',
    rtgs: 'sà-wàt-dii',
    partOfSpeech: 'interjection',
    tone: 2,
    syllables: ['sa', 'wat', 'dii']
  }),
  createThaiWord({
    text: 'ครับ',
    rtgs: 'khráp',
    partOfSpeech: 'particle',
    tone: 2,
    syllables: ['khrap']
  }),
  createThaiWord({
    text: 'ผม',
    rtgs: 'phǒm',
    partOfSpeech: 'pronoun',
    tone: 3,
    syllables: ['phom']
  }),
  createThaiWord({
    text: 'ชื่อ',
    rtgs: 'chûue',
    partOfSpeech: 'noun',
    tone: 3,
    syllables: ['chue']
  }),
  createThaiWord({
    text: 'สมชาย',
    rtgs: 'sǒm-chaai',
    partOfSpeech: 'proper noun',
    tone: 3,
    syllables: ['som', 'chaai']
  })
];

const thaiSentence = createSentenceFromWords(
  thaiWords,
  'th',
  'thai',
  'สวัสดีครับ ผมชื่อสมชาย'
);

// ============================================================================
// Japanese Example: "私の名前は田中です。" (My name is Tanaka)
// ============================================================================

const japaneseWords = [
  createJapaneseWord({
    text: '私',
    romaji: 'watashi',
    partOfSpeech: 'pronoun',
    furigana: 'わたし'
  }),
  createJapaneseWord({
    text: 'の',
    romaji: 'no',
    partOfSpeech: 'particle'
  }),
  createJapaneseWord({
    text: '名前',
    romaji: 'namae',
    partOfSpeech: 'noun',
    furigana: 'なまえ'
  }),
  createJapaneseWord({
    text: 'は',
    romaji: 'wa',
    partOfSpeech: 'particle'
  }),
  createJapaneseWord({
    text: '田中',
    romaji: 'tanaka',
    partOfSpeech: 'proper noun',
    furigana: 'たなか'
  }),
  createJapaneseWord({
    text: 'です',
    romaji: 'desu',
    partOfSpeech: 'copula'
  })
];

const japaneseSentence = createSentenceFromWords(
  japaneseWords,
  'ja',
  'mixed',
  '私の名前は田中です。'
);

// ============================================================================
// Create Document Structure
// ============================================================================

const thaiParagraph = createParagraphFromSentences([thaiSentence]);
const japaneseParagraph = createParagraphFromSentences([japaneseSentence]);

const document = createDocumentFromParagraphs(
  [thaiParagraph, japaneseParagraph],
  'mixed',
  'mixed',
  {
    title: 'Multilingual Greeting Examples',
    description: 'Examples of greetings in Thai and Japanese with transcriptions'
  }
);

// ============================================================================
// Demonstrate Utilities
// ============================================================================

export function demonstrateUtilities() {
  console.log('=== GLOST Package Demo ===\n');

  // Get all words from the document
  const allWords = getAllWords(document);
  console.log(`Total words: ${allWords.length}`);

  // Show Thai words with RTGS transcriptions
  const thaiWordsOnly = allWords.filter(word => word.lang === 'th');
  console.log('\n=== Thai Words ===');
  thaiWordsOnly.forEach(word => {
    const rtgs = getWordTranscription(word, 'rtgs');
    console.log(`${getWordText(word)} → ${rtgs} (${word.metadata.partOfSpeech})`);
  });

  // Show Japanese words with romaji
  const japaneseWordsOnly = allWords.filter(word => word.lang === 'ja');
  console.log('\n=== Japanese Words ===');
  japaneseWordsOnly.forEach(word => {
    const romaji = getWordTranscription(word, 'romaji');
    console.log(`${getWordText(word)} → ${romaji} (${word.metadata.partOfSpeech})`);
  });

  // Validate the tree
  const validationErrors = validateGLOSTTree(document);
  if (validationErrors.length === 0) {
    console.log('\n✅ Document is valid!');
  } else {
    console.log('\n❌ Validation errors:');
    validationErrors.forEach((error: string) => console.log(`  - ${error}`));
  }

  // Show document structure
  console.log('\n=== Document Structure ===');
  console.log(`Language: ${document.lang}`);
  console.log(`Script: ${document.script}`);
  console.log(`Paragraphs: ${document.children.length}`);
  console.log(`Sentences: ${document.children.reduce((acc, p) => {
    if (p.type === 'ParagraphNode') {
      return acc + (p.children?.length || 0);
    }
    return acc;
  }, 0)}`);
  console.log(`Words: ${allWords.length}`);
}

// Export for use in other files
export {
  thaiWords,
  japaneseWords,
  thaiSentence,
  japaneseSentence,
  thaiParagraph,
  japaneseParagraph,
  document
};
