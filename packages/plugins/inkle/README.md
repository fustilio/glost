# glost-inkle

Parse Ink JSON into GLOST documents for language learning from interactive fiction.

## Overview

This package converts [Ink](https://www.inklestudios.com/ink/) narrative scripts (exported as JSON) into GLOST documents. Use it to create language learning materials from interactive fiction.

## Installation

```bash
npm install glost-inkle
# or
pnpm add glost-inkle
```

## Usage

### Basic Parsing

```typescript
import { parseInkJSON } from "glost-inkle";

// Load your Ink JSON export
const inkData = {
  root: [
    "Hello, traveler!",
    "Where are you going?"
  ]
};

const doc = parseInkJSON(inkData, {
  language: "en",
  script: "latin"
});
```

### With Language Options

```typescript
const doc = parseInkJSON(inkData, {
  language: "ja",
  script: "japanese",
  defaultSpeaker: "Narrator"
});
```

### Parsing Specific Sections

```typescript
// Only parse specific sections in order
const doc = parseInkJSON(inkData, {
  language: "en",
  sections: ["intro", "chapter1", "chapter2"]
});
```

### Processing the Result

```typescript
import { parseInkJSON } from "glost-inkle";
import { getAllWordsFromDocument } from "glost-utils";

const doc = parseInkJSON(inkData, { language: "th" });

// Extract words for vocabulary practice
const words = getAllWordsFromDocument(doc);

// Add transcription or metadata using other GLOST packages
```

## API

### `parseInkJSON(json, options?)`

Parses Ink JSON into a GLOST document.

**Parameters:**

- `json` - Ink JSON object (from Ink export)
- `options` - Optional configuration

**Options:**

- `language` - Language code (default: "en")
- `script` - Script system (default: "latin")
- `defaultSpeaker` - Default speaker name
- `sections` - Array of section names to parse in order

**Returns:** `GLOSTRoot` - GLOST document

## Use Cases

- Language learning from interactive stories
- Vocabulary extraction from game narratives
- Dialogue analysis for language practice
- Converting branching narratives to structured learning materials

## Ink Export

To get Ink JSON:

1. Write your story in [Ink](https://github.com/inkle/ink)
2. Export to JSON using `inklecate`:

```bash
inklecate -o story.json story.ink
```

3. Load and parse with `glost-inkle`

## Related Packages

- `glost` - Core GLOST types
- `glost-utils` - Document manipulation utilities
- `glost-plugins` - Enhance with metadata

## License

MIT
