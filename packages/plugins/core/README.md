# glost-plugins

Core extension system for GLOST - transform and enhance GLOST documents.

## Overview

This package provides a plugin architecture for GLOST, similar to remark/unified:

- **Extension processor** - Process documents through extension pipelines
- **Extension registry** - Register and manage extensions
- **Built-in extensions** - Common transformations out of the box
- **Type-safe APIs** - Full TypeScript support

## Installation

```bash
npm install glost-plugins
# or
pnpm add glost-plugins
```

## Usage

### Simplified Processing (Recommended)

```typescript
import { processGLOST } from "glost-plugins";
import { createSimpleDocument } from "glost";
import { createTranscriptionExtension } from "glost-transcription";

// Create document
const document = createSimpleDocument(words, "th", "thai");

// Process with extensions - returns document directly
const processed = await processGLOST(document, [
  createTranscriptionExtension({ provider, targetLanguage: "th" })
]);

// Access processed document immediately
const words = getAllWords(processed);
```

### Processing with Metadata

When you need detailed processing information:

```typescript
import { processGLOSTWithMeta } from "glost-plugins";

// Returns full result with metadata
const result = await processGLOSTWithMeta(document, [
  myExtension
]);

console.log(result.document);  // Transformed document
console.log(result.metadata);  // Processing metadata
console.log(result.metadata.appliedExtensions);  // Which extensions ran
```

### Legacy API (Still Supported)

```typescript
import { 
  processGLOSTWithExtensions,
  processGLOSTWithExtensionsAsync 
} from "glost-plugins";

// Sync processing
const result = processGLOSTWithExtensions(document, [extension]);

// Async processing
const result = await processGLOSTWithExtensionsAsync(document, [extension]);
```

### Basic Processing

```typescript
import { 
  processGLOSTWithExtensions,
  ReadingScoreExtension,
  LearnerHintsExtension 
} from "glost-plugins";

// Process document with extensions
const result = processGLOSTWithExtensions(document, [
  ReadingScoreExtension,
  LearnerHintsExtension
]);

console.log(result.document);  // Transformed document
console.log(result.metadata);  // Extension metadata
```

### Async Processing

```typescript
import { processGLOSTWithExtensionsAsync } from "glost-plugins";

const result = await processGLOSTWithExtensionsAsync(document, [
  myAsyncExtension
]);
```

### Using the Registry

```typescript
import { 
  registerExtension,
  processGLOSTWithExtensionIds 
} from "glost-plugins";

// Register extensions once
registerExtension(MyExtension);
registerExtension(AnotherExtension);

// Process by ID
const result = processGLOSTWithExtensionIds(document, [
  "my-extension",
  "another-extension"
]);
```

### Creating Extensions

```typescript
import type { GLOSTExtension } from "glost-plugins";

const myExtension: GLOSTExtension = {
  id: "my-extension",
  name: "My Extension",
  version: "1.0.0",
  
  transform(document, context) {
    // Modify the document
    return {
      document,
      metadata: { processed: true }
    };
  }
};
```

### Async Extensions

```typescript
const asyncExtension: GLOSTExtension = {
  id: "async-extension",
  name: "Async Extension",
  version: "1.0.0",
  
  async transformAsync(document, context) {
    const data = await fetchSomeData();
    
    return {
      document: enhanceDocument(document, data),
      metadata: { fetched: data.length }
    };
  }
};
```

## Built-in Extensions

See the [Extensions README](./src/extensions/README.md) for the full list of built-in extensions.

## API

### Processing Functions

**Simplified API (Recommended):**
- `processGLOST(doc, extensions, options?)` - Returns document directly
- `processGLOSTWithMeta(doc, extensions, options?)` - Returns document with metadata

**Legacy API:**
- `processGLOSTWithExtensions(doc, extensions, options?)` - Sync processing
- `processGLOSTWithExtensionsAsync(doc, extensions, options?)` - Async processing
- `processGLOSTWithExtensionIds(doc, ids, options?)` - Process by IDs

**When to use which:**
- Use `processGLOST()` for most cases (90%+ of usage)
- Use `processGLOSTWithMeta()` when you need processing details
- Legacy APIs remain for backward compatibility

**Options:**
- `lenient` - Continue on errors (default: false)
- `skipValidation` - Skip validation (default: false)

### Registry Functions

- `registerExtension(extension)` - Register an extension
- `registerExtensions(extensions)` - Register multiple extensions
- `getExtension(id)` - Get extension by ID
- `getAllExtensions()` - Get all registered extensions

### Utilities

- `deepMerge(target, source, options?)` - Deep merge objects
- `findConflicts(extensions)` - Find conflicting extensions

## Extension Interface

```typescript
interface GLOSTExtension {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  version: string;               // Semantic version
  
  transform?(doc, context): ExtensionResult;        // Sync transform
  transformAsync?(doc, context): Promise<ExtensionResult>;  // Async transform
  
  requires?: {                   // Optional requirements
    extensions?: string[];       // Required extensions
    nodes?: string[];            // Required node types
  };
  
  provides?: {                   // Optional capabilities
    nodes?: string[];            // Node types created
    metadata?: string[];         // Metadata fields added
  };
  
  conflicts?: string[];          // Conflicting extensions
}
```

## Exports

```typescript
// Main exports
import { ... } from "glost-plugins";

// Processor
import { processGLOSTWithExtensions } from "glost-plugins/processor";

// Registry
import { registerExtension } from "glost-plugins/registry";

// Built-in extensions
import { ... } from "glost-plugins/extensions";
```

## Related Packages

- `glost` - Core GLOST types
- `glost-difficulty` - Difficulty assessment extension
- `glost-frequency` - Frequency analysis extension
- `glost-pos` - Part-of-speech extension
- `glost-gender` - Gender annotation extension
- `glost-transcription` - Transcription extension
- `glost-translation` - Translation extension
- `glost-clause-segmenter` - Clause segmentation

## Documentation

- [Creating Custom Extensions](../../../docs/guides/custom-extensions.md)
- [Using Extensions](../../../docs/guides/using-extensions.md)

## License

MIT
