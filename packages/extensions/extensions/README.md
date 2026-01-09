# glost-extensions

Core extension system for GLOST - transform and enhance GLOST documents.

## Overview

This package provides a plugin architecture for GLOST, similar to remark/unified:

- **Extension processor** - Process documents through extension pipelines
- **Extension registry** - Register and manage extensions
- **Built-in extensions** - Common transformations out of the box
- **Type-safe APIs** - Full TypeScript support

## Installation

```bash
npm install glost-extensions
# or
pnpm add glost-extensions
```

## Usage

### Basic Processing

```typescript
import { 
  processGLOSTWithExtensions,
  ReadingScoreExtension,
  LearnerHintsExtension 
} from "glost-extensions";

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
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

const result = await processGLOSTWithExtensionsAsync(document, [
  myAsyncExtension
]);
```

### Using the Registry

```typescript
import { 
  registerExtension,
  processGLOSTWithExtensionIds 
} from "glost-extensions";

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
import type { GLOSTExtension } from "glost-extensions";

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

- `processGLOSTWithExtensions(doc, extensions, options?)` - Process with extensions
- `processGLOSTWithExtensionsAsync(doc, extensions, options?)` - Async processing
- `processGLOSTWithExtensionIds(doc, ids, options?)` - Process by IDs

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
import { ... } from "glost-extensions";

// Processor
import { processGLOSTWithExtensions } from "glost-extensions/processor";

// Registry
import { registerExtension } from "glost-extensions/registry";

// Built-in extensions
import { ... } from "glost-extensions/extensions";
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
