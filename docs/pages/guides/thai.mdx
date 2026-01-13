# Working with Thai

This guide covers Thai-specific features and patterns in GLOST.

## Thai Language Characteristics

Thai has unique characteristics that GLOST handles:

- **No word spaces** - Words run together without breaks
- **Tonal language** - 5 tones affect meaning
- **Complex script** - Consonants, vowels, tone marks combine
- **Multiple romanization systems** - RTGS, AUA, Paiboon+

## Creating Thai Words

### Basic Thai Word

```typescript
import { createThaiWord } from 'glost';

const word = createThaiWord(
  "สวัสดี",        // Thai text
  "sawatdi",       // RTGS romanization
  "interjection",  // part of speech
  4                // syllable count (optional)
);
```

### With Multiple Transcriptions

```typescript
import { createGLOSTWordNode } from 'glost';

const word = createGLOSTWordNode(
  "สวัสดี",
  {
    rtgs: { text: "sawatdi", system: "rtgs" },
    ipa: { text: "sa.wàt.diː", system: "ipa" },
    paiboon: { 
      text: "sa-wat-dii", 
      system: "paiboon",
      tone: 2,
      syllables: ["sa", "wat", "dii"]
    },
    aua: { text: "sàwàtdii", system: "aua" }
  },
  { 
    partOfSpeech: "interjection",
    formality: "formal"
  },
  "word",
  "th",
  "thai"
);
```

## Transcription Systems

### RTGS (Royal Thai General System)

Official government romanization:

```typescript
{ rtgs: { text: "sawatdi", system: "rtgs" } }
```

Features:
- Official standard
- No tone marks
- Used in road signs, official documents

### IPA (International Phonetic Alphabet)

Precise phonetic representation:

```typescript
{ ipa: { text: "sa.wàt.diː", system: "ipa" } }
```

Features:
- Universal standard
- Includes tone diacritics
- Precise vowel representation

### Paiboon+

Popular learning system:

```typescript
{ 
  paiboon: { 
    text: "sa-wat-dii", 
    system: "paiboon",
    tone: 2,
    syllables: ["sa", "wat", "dii"]
  } 
}
```

Features:
- Hyphen-separated syllables
- Tone marks (optional)
- Good for learners

### AUA

Another learning-focused system:

```typescript
{ aua: { text: "sàwàtdii", system: "aua" } }
```

## Word Segmentation

Thai has no spaces, so word segmentation is needed.

### Manual Segmentation

```typescript
const words = [
  createThaiWord("สวัสดี", "sawatdi", "interjection"),
  createThaiWord("ครับ", "khrap", "particle")
];

const sentence = createSentenceFromWords(
  words,
  "th",
  "thai",
  "สวัสดีครับ"  // Store original unsegmented text
);
```

### With Custom Segmenter

```typescript
import { convertTextToGLOST } from 'glost-utils';

const document = convertTextToGLOST("สวัสดีครับ", {
  language: "th",
  script: "thai",
  languageStrategy: {
    segmentWords: (text) => {
      // Use your preferred Thai word segmentation library
      // e.g., deepcut, pythainlp, or custom rules
      return segmentThaiText(text);
    }
  }
});
```

## Tone Information

Thai has 5 tones that change word meaning.

### Storing Tone Data

```typescript
const word = createGLOSTWordNode(
  "มา",
  {
    rtgs: { text: "ma", system: "rtgs" },
    ipa: { 
      text: "maː", 
      system: "ipa",
      tone: 1  // Mid tone
    }
  },
  { partOfSpeech: "verb" },
  "word",
  "th"
);
```

### Tone Numbers

| Tone | Number | Example | Paiboon Mark |
|------|--------|---------|--------------|
| Mid | 1 | มา (ma) | (none) |
| Low | 2 | หมา (maa) | ̀ |
| Falling | 3 | ม้า (maa) | ̂ |
| High | 4 | มา (maa) | ́ |
| Rising | 5 | ม๊า (maa) | ̌ |

## Polite Particles

Thai uses gendered politeness particles:

```typescript
// Male speaker
const khrap = createThaiWord("ครับ", "khrap", "particle");

// Female speaker  
const kha = createThaiWord("ค่ะ", "kha", "particle");
```

### Gender Variants

```typescript
const word = createGLOSTWordNode(
  "ครับ/ค่ะ",
  {
    rtgs: { 
      text: "khrap/kha", 
      system: "rtgs",
      variants: [
        { text: "khrap", context: "male" },
        { text: "kha", context: "female" }
      ]
    }
  },
  { partOfSpeech: "particle" },
  "word",
  "th"
);
```

## Sentence Structure

### Basic Thai Sentence

```typescript
const words = [
  createThaiWord("ผม", "phom", "pronoun"),      // I (male)
  createThaiWord("กิน", "kin", "verb"),         // eat
  createThaiWord("ข้าว", "khao", "noun"),       // rice
  createThaiWord("ครับ", "khrap", "particle")   // polite
];

const sentence = createSentenceFromWords(
  words,
  "th",
  "thai",
  "ผมกินข้าวครับ"
);
```

### With Translations

```typescript
const sentence = createGLOSTSentenceNode(
  "ผมกินข้าวครับ",
  "th",
  "thai",
  words,
  undefined,
  {
    translations: {
      en: "I eat rice.",
      ja: "私はご飯を食べます。"
    }
  }
);
```

## Document Example

```typescript
import {
  createThaiWord,
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs
} from 'glost';

// Create a Thai lesson document
const greeting = [
  createThaiWord("สวัสดี", "sawatdi", "interjection"),
  createThaiWord("ครับ", "khrap", "particle")
];

const response = [
  createThaiWord("สวัสดี", "sawatdi", "interjection"),
  createThaiWord("ค่ะ", "kha", "particle")
];

const sentences = [
  createSentenceFromWords(greeting, "th", "thai", "สวัสดีครับ"),
  createSentenceFromWords(response, "th", "thai", "สวัสดีค่ะ")
];

const paragraph = createParagraphFromSentences(sentences);

const document = createDocumentFromParagraphs(
  [paragraph],
  "th",
  "thai",
  {
    title: "Thai Greetings",
    lesson: 1,
    level: "beginner"
  }
);
```

## Processing Thai Documents

```typescript
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';
import { createTranscriptionExtension } from 'glost-transcription';

const transcriptionExt = createTranscriptionExtension({
  targetLanguage: "th",
  lookupTranscription: async (word, lang) => {
    // Fetch from Thai dictionary API
    const response = await fetch(`/api/thai-dict/${encodeURIComponent(word)}`);
    return response.json();
  }
});

const result = await processGLOSTWithExtensionsAsync(document, [
  transcriptionExt,
  FrequencyExtension,
  DifficultyExtension
]);
```
