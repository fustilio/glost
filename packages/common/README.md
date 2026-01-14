# glost-common

Shared utilities and language configurations for GLOST.

## Overview

This package provides common functionality shared across GLOST packages:

- **Language configurations** - ISO-639 codes, scripts, locale data
- **Standard metadata schema** - Frequency, difficulty, CEFR levels, part-of-speech
- **Transcription provider interfaces** - Base types for implementing transcription
- **Utility functions** - Zod helpers, groupBy, array utilities, string functions

## Installation

```bash
npm install glost-common
# or
pnpm add glost-common
```

## Usage

### Language Configurations

```typescript
import { LANGUAGE_CONFIGS, normalizeLanguageCode } from "glost-common/languages";

// Normalize any ISO-639 code format
const code = normalizeLanguageCode("tha"); // Returns "th"

// Get language info
const thai = LANGUAGE_CONFIGS.th;
console.log(thai.name);           // "Thai"
console.log(thai.nativeName);     // "ไทย"
console.log(thai.iso6393);        // "tha"
console.log(thai.scripts);        // ["thai"]
```

### Standard Metadata

```typescript
import { 
  validateStandardMetadata, 
  mergeMetadata,
  type StandardGLOSTMetadata 
} from "glost-common";

// Create metadata
const metadata: StandardGLOSTMetadata = {
  frequency: "very-common",
  difficulty: "beginner",
  cefr: "A1",
  partOfSpeech: "noun",
  gender: "masculine"
};

// Validate metadata
const result = validateStandardMetadata(metadata);
if (!result.valid) {
  console.error(result.errors);
}

// Merge metadata objects
const combined = mergeMetadata(
  { frequency: "common" },
  { difficulty: "intermediate" }
);
```

### Transcription Provider Interface

```typescript
import type { TranscriptionProvider } from "glost-common";

// Implement for your transcription service
const myProvider: TranscriptionProvider = {
  getTranscription(text, scheme) {
    // Return transcription or undefined
    return transcription;
  },
  
  getDefaultScheme() {
    return "ipa";
  },
  
  hasScheme(scheme) {
    return scheme === "ipa" || scheme === "custom";
  },
  
  getAvailableSchemes() {
    return ["ipa", "custom"];
  },
  
  getSchemeDisplayName(scheme) {
    return scheme.toUpperCase();
  }
};
```

## API

### Language Functions

- `normalizeLanguageCode(code)` - Convert any ISO-639 code to ISO-639-1
- `getLanguageConfig(code)` - Get language configuration
- `isValidLanguageCode(code)` - Check if code is valid
- `LANGUAGE_CONFIGS` - Map of language configurations

### Metadata Functions

- `validateStandardMetadata(metadata)` - Validate metadata structure
- `isStandardMetadata(value)` - Type guard for metadata
- `mergeMetadata(...metadatas)` - Merge metadata objects
- `getDefaultMetadata()` - Get default metadata values
- `isValidFrequency(value)` - Validate frequency level
- `isValidDifficulty(value)` - Validate difficulty level
- `isValidCEFR(value)` - Validate CEFR level
- `isValidGender(value)` - Validate grammatical gender

### Types

- `StandardGLOSTMetadata` - Standard metadata schema
- `FrequencyLevel` - Word frequency classification
- `DifficultyLevel` - Learning difficulty level
- `CEFRLevel` - Common European Framework levels
- `GrammaticalGender` - Grammatical gender types
- `TranscriptionProvider` - Base interface for transcription

## Exports

```typescript
// Main exports
import { ... } from "glost-common";

// Language configs
import { ... } from "glost-common/languages";

// Utility functions
import { ... } from "glost-common/utils/array";
import { ... } from "glost-common/utils/groupBy";
import { ... } from "glost-common/utils/string";
import { ... } from "glost-common/utils/zod";
```

## Related Packages

- `glost` - Core GLOST types and nodes
- `glost-plugins` - Extension system
- `glost-utils` - Document manipulation utilities

## License

MIT
