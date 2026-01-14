# Working with Japanese

This guide covers Japanese-specific features and patterns in GLOST.

## Japanese Language Characteristics

Japanese has unique characteristics that GLOST handles:

- **Multiple scripts** - Kanji, hiragana, katakana, romaji
- **No word spaces** - Like Thai, words run together
- **Furigana** - Reading aids above kanji
- **Pitch accent** - Regional pitch patterns

## Creating Japanese Words

### Basic Japanese Word

```typescript
import { createJapaneseWord } from 'glost';

const word = createJapaneseWord(
  "今日",          // kanji
  "kyou",          // romaji
  "noun",          // part of speech
  "きょう"          // furigana (optional)
);
```

### With Full Transcription Data

```typescript
import { createGLOSTWordNode } from 'glost';

const word = createGLOSTWordNode(
  "今日",
  {
    romaji: { text: "kyou", system: "romaji" },
    furigana: { text: "きょう", system: "furigana" },
    ipa: { text: "kʲoː", system: "ipa" }
  },
  { 
    partOfSpeech: "noun",
    usage: "Used for 'today'"
  },
  "word",
  "ja",
  "japanese"
);
```

## Script Types

### Kanji

Chinese characters with Japanese readings:

```typescript
const word = createJapaneseWord("日本", "nihon", "noun", "にほん");
```

### Hiragana

Native Japanese syllabary:

```typescript
const word = createGLOSTWordNode(
  "これ",
  { romaji: { text: "kore", system: "romaji" } },
  { partOfSpeech: "pronoun" },
  "word",
  "ja",
  "hiragana"
);
```

### Katakana

Used for foreign words:

```typescript
const word = createGLOSTWordNode(
  "コンピューター",
  { romaji: { text: "konpyuutaa", system: "romaji" } },
  { partOfSpeech: "noun", etymology: "English: computer" },
  "word",
  "ja",
  "katakana"
);
```

## Furigana (Reading Aids)

Furigana shows the reading of kanji.

### Simple Furigana

```typescript
const word = createJapaneseWord("食べる", "taberu", "verb", "たべる");
```

### Ruby-Style Furigana

For complex kanji-furigana alignment:

```typescript
import { createGLOSTWordNode } from 'glost';

const word = createGLOSTWordNode(
  "東京",
  {
    furigana: {
      text: [
        { base: "東", ruby: "とう" },
        { base: "京", ruby: "きょう" }
      ],
      system: "furigana"
    },
    romaji: { text: "toukyou", system: "romaji" }
  },
  { partOfSpeech: "proper noun" },
  "word",
  "ja"
);
```

## Word Segmentation

Japanese has no spaces between words.

### Manual Segmentation

```typescript
const words = [
  createJapaneseWord("私", "watashi", "pronoun", "わたし"),
  createJapaneseWord("は", "wa", "particle"),
  createJapaneseWord("学生", "gakusei", "noun", "がくせい"),
  createJapaneseWord("です", "desu", "copula")
];

const sentence = createSentenceFromWords(
  words,
  "ja",
  "japanese",
  "私は学生です"
);
```

### With Custom Segmenter

```typescript
import { convertTextToGLOST } from 'glost-utils';

const document = convertTextToGLOST("私は学生です", {
  language: "ja",
  script: "japanese",
  languageStrategy: {
    segmentWords: (text) => {
      // Use MeCab, Kuromoji, or similar
      return segmentJapaneseText(text);
    }
  }
});
```

## Particles

Japanese particles are crucial for grammar:

```typescript
// Topic marker
const wa = createJapaneseWord("は", "wa", "particle");

// Object marker
const wo = createJapaneseWord("を", "wo", "particle");

// Subject marker
const ga = createJapaneseWord("が", "ga", "particle");

// Direction marker
const ni = createJapaneseWord("に", "ni", "particle");
```

## Politeness Levels

Japanese has multiple politeness registers:

### Plain Form

```typescript
const eat = createJapaneseWord("食べる", "taberu", "verb", "たべる");
```

### Polite Form (ます)

```typescript
const eatPolite = createJapaneseWord("食べます", "tabemasu", "verb", "たべます");
```

### Marking Formality

```typescript
const word = createGLOSTWordNode(
  "食べます",
  { romaji: { text: "tabemasu", system: "romaji" } },
  { 
    partOfSpeech: "verb",
    formality: "formal"
  },
  "word",
  "ja"
);
```

## Kanji Readings

Kanji can have multiple readings:

### On'yomi (Chinese Reading)

```typescript
const word = createGLOSTWordNode(
  "山",
  {
    furigana: { text: "さん", system: "furigana" },
    romaji: { text: "san", system: "romaji" }
  },
  { 
    partOfSpeech: "noun",
    usage: "On reading, used in compounds"
  },
  "word",
  "ja"
);
```

### Kun'yomi (Japanese Reading)

```typescript
const word = createGLOSTWordNode(
  "山",
  {
    furigana: { text: "やま", system: "furigana" },
    romaji: { text: "yama", system: "romaji" }
  },
  { 
    partOfSpeech: "noun",
    usage: "Kun reading, standalone"
  },
  "word",
  "ja"
);
```

## Sentence Structure

### Basic Sentence

```typescript
const words = [
  createJapaneseWord("私", "watashi", "pronoun", "わたし"),
  createJapaneseWord("は", "wa", "particle"),
  createJapaneseWord("本", "hon", "noun", "ほん"),
  createJapaneseWord("を", "wo", "particle"),
  createJapaneseWord("読みます", "yomimasu", "verb", "よみます")
];

const sentence = createSentenceFromWords(
  words,
  "ja",
  "japanese",
  "私は本を読みます"
);
```

### With Translation

```typescript
const sentence = createGLOSTSentenceNode(
  "私は本を読みます",
  "ja",
  "japanese",
  words,
  undefined,
  {
    translations: {
      en: "I read a book.",
      th: "ฉันอ่านหนังสือ"
    }
  }
);
```

## JLPT Levels

Map difficulty to JLPT:

```typescript
const word = createGLOSTWordNode(
  "食べる",
  { romaji: { text: "taberu", system: "romaji" } },
  { partOfSpeech: "verb" },
  "word",
  "ja",
  undefined,
  {
    metadata: {
      difficulty: "beginner",
      jlptLevel: "N5"
    }
  }
);
```

## Document Example

```typescript
import {
  createJapaneseWord,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs
} from 'glost';

// Create a Japanese lesson document
const greeting1 = [
  createJapaneseWord("こんにちは", "konnichiwa", "interjection")
];

const greeting2 = [
  createJapaneseWord("私", "watashi", "pronoun", "わたし"),
  createJapaneseWord("は", "wa", "particle"),
  createJapaneseWord("田中", "tanaka", "proper noun", "たなか"),
  createJapaneseWord("です", "desu", "copula")
];

const sentences = [
  createSentenceFromWords(greeting1, "ja", "japanese", "こんにちは"),
  createSentenceFromWords(greeting2, "ja", "japanese", "私は田中です")
];

const paragraph = createParagraphFromSentences(sentences);

const document = createDocumentFromParagraphs(
  [paragraph],
  "ja",
  "japanese",
  {
    title: "Japanese Self-Introduction",
    lesson: 1,
    jlptTarget: "N5"
  }
);
```

## Processing Japanese Documents

```typescript
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';
import { createTranscriptionExtension } from 'glost-transcription';

const furiganaExt = createTranscriptionExtension({
  targetLanguage: "ja",
  lookupTranscription: async (word, lang) => {
    // Fetch from Japanese dictionary API
    const response = await fetch(`/api/jisho/${encodeURIComponent(word)}`);
    const data = await response.json();
    return {
      furigana: data.reading,
      romaji: data.romaji
    };
  }
});

const result = await processGLOSTWithExtensionsAsync(document, [
  furiganaExt,
  FrequencyExtension,
  DifficultyExtension
]);
```
