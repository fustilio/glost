# glost-utils

Framework-agnostic utilities for GLOST manipulation, conversion, and merging.

## Overview

This package provides practical utilities for working with GLOST documents:

- **Text-to-GLOST conversion** - Convert plain text into GLOST documents
- **Document manipulation** - Extract words, sentences, metadata
- **Data merging** - Merge transcription and metadata into existing documents
- **Script conversion** - Handle ruby text and text format conversion

## Installation

```bash
npm install glost-utils
# or
pnpm add glost-utils
```

## Usage

### Text to GLOST

```typescript
import { convertTextToGLOST } from "glost-utils";

const doc = await convertTextToGLOST({
  text: "Hello world",
  language: "en",
  strategy: myLanguageStrategy  // Your tokenization logic
});
```

### Document Queries

```typescript
import { 
  getAllWordsFromDocument,
  getFirstSentenceFromDocument,
  hasTranscriptionData 
} from "glost-utils";

// Get all word nodes
const words = getAllWordsFromDocument(doc);

// Get first sentence
const sentence = getFirstSentenceFromDocument(doc);

// Check for transcription
if (hasTranscriptionData(doc, "ipa")) {
  // Document has IPA transcription
}
```

### Merging Data

```typescript
import { 
  mergeTranscriptionDataIntoDocument,
  extendGLOSTDocumentWithMetadata 
} from "glost-utils";

// Merge transcription into existing document
const withTranscription = mergeTranscriptionDataIntoDocument(doc, {
  "hello": { ipa: "həˈloʊ" },
  "world": { ipa: "wɜːld" }
});

// Add metadata
const withMetadata = extendGLOSTDocumentWithMetadata(doc, {
  "hello": { frequency: "very-common", difficulty: "beginner" },
  "world": { frequency: "very-common", difficulty: "beginner" }
});
```

### Script Conversion

```typescript
import { 
  convertScriptToString,
  type RubySegment 
} from "glost-utils";

// Convert ruby text to plain string
const ruby: RubySegment[] = [
  { base: "漢字", ruby: "かんじ" }
];
const plain = convertScriptToString(ruby);  // "漢字"
```

## API

### Text Conversion

- `convertTextToGLOST(options)` - Convert text to GLOST document

### Document Utilities

- `getAllWordsFromDocument(doc)` - Extract all word nodes
- `getFirstSentenceFromDocument(doc)` - Get first sentence
- `getWordsFromFirstSentence(doc)` - Get words from first sentence
- `getDocumentTranscriptionSystems(doc)` - List transcription systems
- `hasTranscriptionData(doc, system)` - Check for transcription
- `getDocumentMetadata(doc)` - Get document metadata
- `getSentenceTranslation(sentence, lang)` - Get sentence translation

### Merging Utilities

- `mergeTranscriptionData(word, data)` - Merge transcription into word
- `mergeTranscriptionDataIntoDocument(doc, data)` - Merge into document
- `extendGLOSTWithMetadata(word, metadata)` - Add metadata to word
- `extendGLOSTDocumentWithMetadata(doc, data)` - Add metadata to document
- `hydrateGLOSTDocument(doc, data)` - Hydrate with all data types
- `filterGLOSTByGender(doc, gender)` - Filter words by gender

### Script Conversion

- `convertScriptToString(script)` - Convert to plain string
- `isRubyScript(script)` - Check if ruby text
- `isPlainTextScript(script)` - Check if plain text
- `ensureArrayFormat(script)` - Convert to array format
- `ensureStringFormat(script)` - Convert to string format
- `getPlainText(script)` - Extract plain text

## Exports

```typescript
// Main utilities
import { ... } from "glost-utils";

// Text-to-GLOST
import { convertTextToGLOST } from "glost-utils/text-to-glost";

// Merging
import { mergeTranscriptionDataIntoDocument } from "glost-utils/merger";

// Document utilities
import { getAllWordsFromDocument } from "glost-utils/document";

// Script conversion
import { convertScriptToString } from "glost-utils/script";

// Interfaces
import type { ILanguageStrategy } from "glost-utils/interfaces";
```

## Related Packages

- `glost` - Core GLOST types and nodes
- `glost-common` - Common utilities
- `glost-extensions` - Extension system

## License

MIT
