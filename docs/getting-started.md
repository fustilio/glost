# Getting Started

This guide will help you get started with GLOST.

## Installation

Install the core packages using your preferred package manager:

```bash
# pnpm (recommended)
pnpm add glost glost-common

# npm
npm install glost glost-common

# yarn
yarn add glost glost-common
```

For additional functionality, install extension packages:

```bash
# Extension system
pnpm add glost-extensions

# Utilities
pnpm add glost-utils

# Specific extensions
pnpm add glost-transcription glost-translation
```

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
import { getLanguageName, toISO639_3, parseBCP47 } from 'glost-common';

// All formats work
getLanguageName("th");      // "Thai"
getLanguageName("tha");     // "Thai"
getLanguageName("th-TH");   // "Thai"

// Convert between formats
toISO639_3("en");           // "eng"
toISO639_3("ja");           // "jpn"

// Parse BCP-47 tags
const parsed = parseBCP47("zh-Hans-CN");
// { language: "zh", script: "Hans", region: "CN" }
```

## Proficiency Levels

Work with standardized proficiency levels:

```typescript
import { cefrToNumeric, numericToCEFR, meetsLevel } from 'glost-common';

// Convert CEFR to numeric
cefrToNumeric("B1");        // 3

// Convert numeric to CEFR
numericToCEFR(4);           // "B2"

// Check if user meets required level
meetsLevel("B2", "B1", "CEFR");  // true
```

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

## Next Steps

- [Core Concepts](./concepts/index.md) - Understand node types and architecture
- [Extension System](./concepts/extensions.md) - Learn about extensions
- [Creating Custom Extensions](./guides/custom-extensions.md) - Build your own extensions
- [Package Reference](./packages/index.md) - Full API documentation
