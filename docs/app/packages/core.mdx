# glost (Core)

The core package providing types, node factories, and tree utilities.

## Installation

```bash
pnpm add glost
```

## Exports

```typescript
// Main entry
import { ... } from 'glost';

// Subpath exports
import { ... } from 'glost/nodes';
import { ... } from 'glost/utils';
import { ... } from 'glost/guards';
import { ... } from 'glost/validators';
```

## Node Factory Functions

### createGLOSTWordNode

Create a word node with full control.

```typescript
function createGLOSTWordNode(
  value: string,
  transcription?: TransliterationData,
  metadata?: LinguisticMetadata,
  level?: LinguisticLevel,
  lang?: GlostLanguage,
  script?: string,
  extras?: GLOSTExtras
): GLOSTWord;
```

**Example:**

```typescript
const word = createGLOSTWordNode(
  "hello",
  { ipa: { text: "heloʊ", system: "ipa" } },
  { partOfSpeech: "interjection" },
  "word",
  "en",
  "latin",
  { translations: { th: "สวัสดี" } }
);
```

### createSimpleWord

Create a word with single transcription.

```typescript
function createSimpleWord(
  text: string,
  transliteration: string,
  system: TranscriptionSystem
): GLOSTWord;
```

### Language-Specific Helpers

Language-specific helper functions have been moved to dedicated packages:

- **Thai:** `glost-th` package - See [glost-th README](../../packages/languages/th/README.md)
- **Japanese:** `glost-ja` package - See [glost-ja README](../../packages/languages/ja/README.md)

```typescript
// Install language packages
// npm install glost-th glost-ja

import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';
```

See [MIGRATION.md](../../MIGRATION.md) for upgrading from v0.1.x.

### createSentenceFromWords

Build a sentence from word nodes.

```typescript
function createSentenceFromWords(
  words: GLOSTWord[],
  lang: GlostLanguage,
  script?: string,
  originalText?: string
): GLOSTSentence;
```

### createDocumentFromParagraphs

Build a document from paragraphs.

```typescript
function createDocumentFromParagraphs(
  paragraphs: GLOSTParagraph[],
  lang: GlostLanguage,
  script?: string,
  metadata?: Record<string, unknown>
): GLOSTRoot;
```

## Tree Traversal

### getAllWords

Get all word nodes in a tree.

```typescript
function getAllWords(node: GLOSTNode): GLOSTWord[];
```

### getAllSentences

Get all sentence nodes.

```typescript
function getAllSentences(node: GLOSTNode): GLOSTSentence[];
```

### findWordsByLanguage

Find words by language code.

```typescript
function findWordsByLanguage(node: GLOSTNode, lang: GlostLanguage): GLOSTWord[];
```

## Word Utilities

### getWordText

Get the text value of a word.

```typescript
function getWordText(word: GLOSTWord): string;
```

### getWordTranscription

Get transcription for a specific system.

```typescript
function getWordTranscription(word: GLOSTWord, system: TranscriptionSystem): string | undefined;
```

### hasWordTranscription

Check if word has transcription for a system.

```typescript
function hasWordTranscription(word: GLOSTWord, system: TranscriptionSystem): boolean;
```

## Type Guards

From `glost/guards`:

```typescript
function isGLOSTWord(node: unknown): node is GLOSTWord;
function isGLOSTSentence(node: unknown): node is GLOSTSentence;
function isGLOSTRoot(node: unknown): node is GLOSTRoot;
function hasChildren(node: unknown): node is { children: unknown[] };
```

## Validators

From `glost/validators`:

```typescript
function validateGLOSTTree(tree: unknown): string[];
```

Returns an array of validation error messages. Empty array means valid.

## Types

Key types exported:

```typescript
type GLOSTWord
type GLOSTSentence
type GLOSTParagraph
type GLOSTRoot
type GLOSTNode
type TransliterationData
type LinguisticMetadata
type GLOSTExtras
type GlostLanguage
```
