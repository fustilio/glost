# glost-utils

Framework-agnostic utilities for GLOST manipulation, conversion, and merging.

## Installation

```bash
pnpm add glost-utils
```

## Exports

```typescript
// Main entry
import { ... } from 'glost-utils';

// Subpath exports
import { convertTextToGLOST } from 'glost-utils/text-to-glost';
import { mergeTranscriptionData } from 'glost-utils/merger';
import { getAllWordsFromDocument } from 'glost-utils/document';
import { convertScriptToString } from 'glost-utils/script';
```

## Text-to-GLOST Conversion

### convertTextToGLOST

Convert plain text to a GLOST document.

```typescript
function convertTextToGLOST(
  text: string,
  options: ConvertTextToGLOSTOptions
): GLOSTRoot;

interface ConvertTextToGLOSTOptions {
  language: GlostLanguage;
  script?: string;
  languageStrategy?: LanguageStrategy;
  transcriptionProvider?: TranscriptionProvider;
}
```

**Example:**

```typescript
import { convertTextToGLOST } from 'glost-utils';

const document = convertTextToGLOST("Hello world!", {
  language: "en",
  script: "latin"
});
```

### Custom Word Segmentation

For languages without spaces (Thai, Japanese, Chinese):

```typescript
const document = convertTextToGLOST("สวัสดีครับ", {
  language: "th",
  languageStrategy: {
    segmentWords: (text) => {
      // Custom Thai word segmentation
      return ["สวัสดี", "ครับ"];
    }
  }
});
```

### Custom Transcription

```typescript
const document = convertTextToGLOST("สวัสดี", {
  language: "th",
  transcriptionProvider: async (word, lang) => {
    // Fetch transcription from dictionary
    return { rtgs: "sawatdi", ipa: "sa.wàt.diː" };
  }
});
```

## GLOST Merging

### mergeTranscriptionData

Merge transcription data from multiple sources.

```typescript
function mergeTranscriptionData(
  base: TransliterationData,
  additions: TransliterationData
): TransliterationData;
```

**Example:**

```typescript
const merged = mergeTranscriptionData(
  { rtgs: { text: "sawatdi", system: "rtgs" } },
  { ipa: { text: "sa.wàt.diː", system: "ipa" } }
);
// { rtgs: {...}, ipa: {...} }
```

### mergeTranscriptionDataIntoDocument

Apply transcription data to all matching words.

```typescript
function mergeTranscriptionDataIntoDocument(
  document: GLOSTRoot,
  transcriptionMap: Record<string, TransliterationData>
): GLOSTRoot;
```

### extendGLOSTWithMetadata

Add metadata to a word.

```typescript
function extendGLOSTWithMetadata(
  word: GLOSTWord,
  metadata: Partial<ExtendedMetadata>
): GLOSTWord;
```

### extendGLOSTDocumentWithMetadata

Add metadata to all matching words in a document.

```typescript
function extendGLOSTDocumentWithMetadata(
  document: GLOSTRoot,
  metadataMap: Record<string, Partial<ExtendedMetadata>>
): GLOSTRoot;
```

### hydrateGLOSTDocument

Hydrate a document with external data.

```typescript
function hydrateGLOSTDocument(
  document: GLOSTRoot,
  data: Record<string, any>
): GLOSTRoot;
```

### filterGLOSTByGender

Filter document content by grammatical gender.

```typescript
function filterGLOSTByGender(
  document: GLOSTRoot,
  gender: "male" | "female"
): GLOSTRoot;
```

## Document Utilities

### getAllWordsFromDocument

Get all words from a document.

```typescript
function getAllWordsFromDocument(doc: GLOSTRoot): GLOSTWord[];
```

### getFirstSentenceFromDocument

Get the first sentence.

```typescript
function getFirstSentenceFromDocument(doc: GLOSTRoot): GLOSTSentence | null;
```

### getWordsFromFirstSentence

Get words from the first sentence.

```typescript
function getWordsFromFirstSentence(doc: GLOSTRoot): GLOSTWord[];
```

### getDocumentTranscriptionSystems

Get all transcription systems used in a document.

```typescript
function getDocumentTranscriptionSystems(doc: GLOSTRoot): string[];
```

### hasTranscriptionData

Check if document has a specific transcription system.

```typescript
function hasTranscriptionData(doc: GLOSTRoot, system: string): boolean;
```

### getDocumentMetadata

Get document metadata.

```typescript
function getDocumentMetadata(doc: GLOSTRoot): Record<string, any>;
```

### getSentenceTranslation

Get translation for a sentence.

```typescript
function getSentenceTranslation(
  sentence: GLOSTSentence,
  lang: GlostLanguage
): string | undefined;
```

## Script Conversion

### RubySegment

For languages with ruby/furigana annotations.

```typescript
type RubySegment = { base: string; ruby: string };
```

### convertScriptToString

Convert script (string or ruby) to plain string.

```typescript
function convertScriptToString(script: string | RubySegment[]): string;
```

### isRubySegment

Check if item is a ruby segment.

```typescript
function isRubySegment(item: unknown): item is RubySegment;
```

### isRubyScript

Check if script contains ruby annotations.

```typescript
function isRubyScript(script: string | RubySegment[]): boolean;
```

### getPlainText

Extract plain text from any script format.

```typescript
function getPlainText(script: string | RubySegment[]): string;
```

### ensureArrayFormat

Convert script to ruby segment array.

```typescript
function ensureArrayFormat(script: string | RubySegment[]): RubySegment[];
```

### ensureStringFormat

Convert script to string.

```typescript
function ensureStringFormat(script: string | RubySegment[]): string;
```
