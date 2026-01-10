# Getting Started

This guide covers the basics of using GLOST.

## Installation

See the [main README](../README.md#quick-start) for installation instructions.

## Basic Usage

### Creating Words

```typescript
import { createGLOSTWordNode, createSimpleWord } from 'glost';

// Full control with createGLOSTWordNode
const word = createGLOSTWordNode(
  "hello",                                    // text value
  { ipa: { text: "həˈloʊ", system: "ipa" } }, // transcription
  { partOfSpeech: "interjection" },           // metadata
  "word",                                     // level
  "en",                                       // language
  "latin",                                    // script
  { translations: { th: "สวัสดี" } }          // extras
);

// Simplified helper
const simple = createSimpleWord("hello", "həˈloʊ", "ipa");
```

### Creating Thai Words

```typescript
import { createThaiWord } from 'glost-th';

const thaiWord = createThaiWord({
  text:
  "สวัสดี",      // text
  "sa-wat-dii",  // RTGS romanization
  "interjection", // part of speech
  2              // number of syllables
);
```

### Creating Japanese Words

```typescript
import { createJapaneseWord } from 'glost-ja';

const japaneseWord = createJapaneseWord({
  text:
  "今日は",        // text
  "konnichiwa",    // romaji
  "interjection",  // part of speech
  "こんにちは"     // furigana (optional)
);
```

### Building Documents

```typescript
import {
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs
} from 'glost';

// Build a sentence from words
const sentence = createSentenceFromWords(
  [word1, word2, word3],
  "th",              // language
  "thai",            // script
  "สวัสดีครับ"       // original text
);

// Build a paragraph from sentences
const paragraph = createParagraphFromSentences([sentence1, sentence2]);

// Build a document from paragraphs
const document = createDocumentFromParagraphs(
  [paragraph],
  "th",                    // document language
  "thai",                  // document script
  { title: "Greetings" }   // metadata
);
```

## Traversing Documents

```typescript
import { getAllWords, getAllSentences, getWordText, getWordTranscription } from 'glost';

// Get all words in a document
const words = getAllWords(document);

// Access word data
words.forEach(word => {
  console.log(getWordText(word));                    // "สวัสดี"
  console.log(getWordTranscription(word, "rtgs"));   // "sa-wat-dii"
  console.log(getWordTranscription(word, "ipa"));    // "sa.wàt.diː"
});

// Get all sentences
const sentences = getAllSentences(document);
```

## Using Extensions

Extensions enrich your GLOST documents with additional metadata:

```typescript
import { processGLOSTWithExtensions, FrequencyExtension, DifficultyExtension } from 'glost-extensions';

const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  DifficultyExtension
]);

// Check what was applied
console.log(result.metadata.appliedExtensions);
// ["frequency", "difficulty"]

// Access the processed document
const enrichedDoc = result.document;
```

## Language Code Flexibility

GLOST accepts multiple language code formats:

```typescript
import { getLanguageName, toISO639_3 } from 'glost-common';

getLanguageName("th");      // "Thai"
getLanguageName("tha");     // "Thai"
toISO639_3("en");           // "eng"
```

See [API Reference](./api.md) for complete language code and proficiency level functions.

## Type Safety

GLOST provides type guards for safe node handling:

```typescript
import { isGLOSTWord, isGLOSTSentence, hasChildren } from 'glost/guards';

if (isGLOSTWord(node)) {
  // TypeScript knows node is GLOSTWord
  console.log(node.transcription);
}

if (hasChildren(node)) {
  // Safe to access node.children
  node.children.forEach(child => processChild(child));
}
```
