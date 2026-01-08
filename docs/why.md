# Why GLOST?

## The Challenge

Building language learning applications requires representing text with rich annotations:

- **Translations** for each word
- **Pronunciations** in multiple systems (IPA, romanization)
- **Difficulty levels** for learners
- **Grammar information** (part of speech, gender, etc.)
- **Cultural context** and usage notes

There are several approaches to this problem, each with trade-offs:

### Plain Text + External Data

```json
{
  "text": "สวัสดีครับ",
  "words": [
    { "start": 0, "end": 6, "translation": "hello" },
    { "start": 6, "end": 9, "translation": "polite particle" }
  ]
}
```

**Trade-offs:**
- Offset-based matching can be fragile
- Lacks standard structure
- Can be harder to traverse and manipulate
- May lose relationship between words and sentences

### HTML + Data Attributes

```html
<span data-translation="hello" data-ipa="sa.wàt.diː">สวัสดี</span>
```

**Trade-offs:**
- Mixes presentation with data
- Often limited to flat structure
- Can be less convenient for programmatic manipulation
- Usually lacks type safety

### Custom JSON Formats

Many language learning apps create their own formats:
- Duolingo has one approach
- Anki has another
- Each tool develops its own solution

**Trade-offs:**
- Limited interoperability between tools
- Each project rebuilds similar functionality
- Smaller ecosystem of shared tools

## GLOST's Approach

GLOST attempts to provide a **standardized syntax tree** for multilingual annotated text:

### 1. Standards-Based

Built on [nlcst](https://github.com/syntax-tree/nlcst) (Natural Language Concrete Syntax Tree), part of the [unified](https://unifiedjs.com/) ecosystem. This gives us:

- A well-tested foundation
- Compatibility with existing tools (unist-util-visit, etc.)
- A community-driven standard
- Potential interoperability with other unified tools

### 2. Concrete Syntax Tree (CST)

Unlike ASTs that abstract away details, GLOST preserves everything:

```typescript
// Original text is preserved
sentence.originalText // "สวัสดีครับ"

// Whitespace is explicit
{ type: "WhiteSpaceNode", value: " " }

// Punctuation is preserved
{ type: "PunctuationNode", value: "。" }
```

This can be valuable for language learning because learners often benefit from seeing exactly what native speakers write.

### 3. Multi-Language Support

```typescript
// Thai with RTGS romanization
createThaiWord("สวัสดี", "sawatdi", "interjection");

// Japanese with romaji and furigana
createJapaneseWord("今日", "kyou", "noun", "きょう");

// Chinese with pinyin
createGLOSTWordNode("你好", { pinyin: { text: "nǐ hǎo", system: "pinyin" }});
```

Designed to work with languages using ISO-639 codes, multiple transcription systems, and flexible script handling.

### 4. Rich Metadata

```typescript
const word = createGLOSTWordNode(
  "สวัสดี",
  { 
    rtgs: { text: "sawatdi", system: "rtgs" },
    ipa: { text: "sa.wàt.diː", system: "ipa" }
  },
  { 
    partOfSpeech: "interjection",
    formality: "formal"
  },
  "word",
  "th",
  "thai",
  {
    translations: { en: "hello", ja: "こんにちは" },
    metadata: {
      difficulty: "beginner",
      frequency: "very-common",
      culturalNotes: "Used as a greeting any time of day"
    }
  }
);
```

### 5. Extensible

The extension system allows adding custom processing:

```typescript
// Add frequency data from a corpus
const frequencyExt = createFrequencyExtension({ corpus: "thai-national-corpus" });

// Add translations from a dictionary
const translationExt = createTranslationExtension({
  lookupTranslation: async (word) => fetchFromDictionary(word)
});

// Process the document
const result = await processGLOSTWithExtensionsAsync(document, [
  frequencyExt,
  translationExt
]);
```

### 6. Type-Safe

Full TypeScript support with comprehensive types:

```typescript
import type { GLOSTWord, GLOSTSentence, GLOSTRoot } from 'glost';

// Type guards for safe narrowing
if (isGLOSTWord(node)) {
  // TypeScript knows node is GLOSTWord
  console.log(node.transcription);
}
```

## Potential Use Cases

### Language Learning Apps

Could be used for apps with features like:
- Word-by-word translations
- Pronunciation guides
- Difficulty filtering
- Progress tracking

### Reader Applications

Create reading assistants that show:
- Hover translations
- Pronunciation on demand
- Cultural context
- Related vocabulary

### Corpus Linguistics

Annotate text corpora with:
- Part of speech tags
- Frequency data
- Etymology information
- Usage examples

### Interactive Fiction

Combine with Ink/Inkle for:
- Multilingual interactive stories
- Language learning games
- Cultural immersion experiences

### Dictionary Tools

Structure dictionary entries with:
- Multiple translations
- Usage examples
- Related words
- Pronunciation variants

## Comparison

| Feature | GLOST | Plain JSON | HTML | Other ASTs |
|---------|-------|------------|------|------------|
| Standard format | Yes | Varies | No | Yes |
| Preserves whitespace | Yes | Varies | Partially | No |
| Multi-language | Yes | Possible | Possible | Varies |
| Multiple transcriptions | Yes | Possible | Limited | No |
| Type-safe | Yes | Possible | No | Yes |
| Extensible | Yes | Varies | Limited | Yes |
| Ecosystem tools | Some | No | Many | Yes |
| Language learning focus | Yes | No | No | No |

## Design Principles

1. **CST over AST** - Preserve all syntactic details
2. **Standards-first** - Build on nlcst/unist
3. **Language-agnostic** - Support any natural language
4. **Framework-agnostic** - Works anywhere JS/TS runs
5. **Extensible** - Plugin architecture for custom needs
6. **Type-safe** - Full TypeScript support
7. **Educational focus** - Designed for learning, not just NLP

## Getting Started

```bash
pnpm add glost glost-common
```

See the [Getting Started](./getting-started.md) guide.
