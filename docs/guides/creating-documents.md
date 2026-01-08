# Creating Documents

This guide covers building GLOST documents from scratch.

## Document Structure

A GLOST document has this hierarchy:

```
GLOSTRoot (document)
├── GLOSTParagraph
│   └── GLOSTSentence
│       ├── GLOSTWord
│       ├── GLOSTWhiteSpace
│       └── GLOSTPunctuation
```

## Creating Words

### Basic Word

```typescript
import { createGLOSTWordNode } from 'glost';

const word = createGLOSTWordNode(
  "hello",                                     // text
  { ipa: { text: "heloʊ", system: "ipa" } },  // transcription
  { partOfSpeech: "interjection" },            // metadata
  "word",                                      // level
  "en",                                        // language
  "latin",                                     // script
  { translations: { th: "สวัสดี" } }           // extras
);
```

### Simple Word

When you just need text and transcription:

```typescript
import { createSimpleWord } from 'glost';

const word = createSimpleWord("hello", "heloʊ", "ipa");
```

### Thai Word

With RTGS romanization:

```typescript
import { createThaiWord } from 'glost-th';

const word = createThaiWord({
  text:
  "สวัสดี",        // Thai text
  "sawatdi",       // RTGS romanization
  "interjection",  // part of speech
  4                // syllable count (optional)
);
```

### Japanese Word

With romaji and furigana:

```typescript
import { createJapaneseWord } from 'glost-ja';

const word = createJapaneseWord({
  text:
  "今日",          // kanji
  "kyou",          // romaji
  "noun",          // part of speech
  "きょう"          // furigana (optional)
);
```

## Creating Sentences

### From Words

```typescript
import { createSentenceFromWords, createGLOSTWhiteSpaceNode } from 'glost';
import { createThaiWord } from 'glost-th';

const words = [
  createThaiWord({ text: "สวัสดี", rtgs: "sawatdi", partOfSpeech: "interjection" }),
  createThaiWord({ text: "ครับ", rtgs: "khrap", partOfSpeech: "particle" })
];

const sentence = createSentenceFromWords(
  words,
  "th",              // language
  "thai",            // script
  "สวัสดีครับ"        // original text
);
```

### Manual Construction

For more control over whitespace and punctuation:

```typescript
import {
  createGLOSTSentenceNode,
  createGLOSTWordNode,
  createGLOSTWhiteSpaceNode,
  createGLOSTPunctuationNode
} from 'glost';

const sentence = createGLOSTSentenceNode(
  "Hello, world!",
  "en",
  "latin",
  [
    createGLOSTWordNode("Hello", undefined, { partOfSpeech: "interjection" }),
    createGLOSTPunctuationNode(","),
    createGLOSTWhiteSpaceNode(" "),
    createGLOSTWordNode("world", undefined, { partOfSpeech: "noun" }),
    createGLOSTPunctuationNode("!")
  ]
);
```

## Creating Paragraphs

```typescript
import { createParagraphFromSentences, createGLOSTParagraphNode } from 'glost';

// From sentences helper
const paragraph = createParagraphFromSentences([sentence1, sentence2]);

// Or manual
const paragraph = createGLOSTParagraphNode([sentence1, sentence2]);
```

## Creating Documents

### From Paragraphs

```typescript
import { createDocumentFromParagraphs } from 'glost';

const document = createDocumentFromParagraphs(
  [paragraph1, paragraph2],
  "th",                           // language
  "thai",                         // script
  { title: "Lesson 1" }           // metadata
);
```

### Manual Construction

```typescript
import { createGLOSTRootNode } from 'glost';

const document = createGLOSTRootNode(
  "th",
  "thai",
  [paragraph],
  { title: "Lesson 1", author: "John" },
  { customField: "value" }
);
```

## Adding Rich Metadata

### Word Translations

```typescript
const word = createGLOSTWordNode(
  "สวัสดี",
  { rtgs: { text: "sawatdi", system: "rtgs" } },
  { partOfSpeech: "interjection" },
  "word",
  "th",
  "thai",
  {
    translations: {
      en: "hello",
      ja: "こんにちは",
      zh: "你好"
    }
  }
);
```

### Extended Metadata

```typescript
const word = createGLOSTWordNode(
  "สวัสดี",
  { rtgs: { text: "sawatdi", system: "rtgs" } },
  { partOfSpeech: "interjection", formality: "formal" },
  "word",
  "th",
  "thai",
  {
    translations: { en: "hello" },
    metadata: {
      difficulty: "beginner",
      frequency: "very-common",
      culturalNotes: "Used as a greeting any time of day",
      related: ["สวัสดีค่ะ", "หวัดดี"],
      examples: ["สวัสดีครับ ผมชื่อจอห์น"]
    }
  }
);
```

### Multiple Transcriptions

```typescript
const word = createGLOSTWordNode(
  "สวัสดี",
  {
    rtgs: { text: "sawatdi", system: "rtgs" },
    ipa: { text: "sa.wàt.diː", system: "ipa" },
    paiboon: { 
      text: "sa-wat-dii", 
      system: "paiboon",
      syllables: ["sa", "wat", "dii"],
      tone: 2
    }
  },
  { partOfSpeech: "interjection" },
  "word",
  "th"
);
```

## Converting from Plain Text

For basic conversion:

```typescript
import { convertTextToGLOST } from 'glost-utils';

const document = convertTextToGLOST("Hello world!", {
  language: "en",
  script: "latin"
});
```

For languages without spaces:

```typescript
const document = convertTextToGLOST("สวัสดีครับ", {
  language: "th",
  languageStrategy: {
    segmentWords: (text) => ["สวัสดี", "ครับ"]
  }
});
```

## Best Practices

1. **Always set language** - Even if it seems obvious
2. **Use original text** - Store the original in sentences
3. **Add transcriptions early** - They're useful for processing
4. **Be consistent with metadata** - Use the same fields across words
5. **Preserve whitespace** - It matters for display
