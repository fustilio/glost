# Using Extensions

This guide covers processing GLOST documents with extensions.

## Basic Usage

```typescript
import { processGLOSTWithExtensions, FrequencyExtension, DifficultyExtension } from 'glost-extensions';

const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  DifficultyExtension
]);

console.log(result.document);                   // Processed document
console.log(result.metadata.appliedExtensions); // ["frequency", "difficulty"]
```

## Extension Result

Every processing call returns an `ExtensionResult`:

```typescript
interface ExtensionResult {
  document: GLOSTRoot;
  metadata: {
    appliedExtensions: string[];  // Successfully applied
    skippedExtensions: string[];  // Failed or skipped
    errors: Array<{
      extensionId: string;
      error: Error;
    }>;
  };
}
```

## Sync vs Async Processing

### Synchronous

For extensions that don't need external data:

```typescript
import { processGLOSTWithExtensions } from 'glost-extensions';

const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension
]);
```

### Asynchronous

For extensions that fetch external data:

```typescript
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';

const result = await processGLOSTWithExtensionsAsync(document, [
  createTranslationExtension({ lookupTranslation }),
  createTranscriptionExtension({ lookupTranscription })
]);
```

## Built-in Extensions

### Metadata Extensions

```typescript
import {
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension,
  GenderExtension,
  CulturalNotesExtension
} from 'glost-extensions';
```

These add display-ready data based on existing metadata.

### Transformer Extensions

```typescript
import {
  createClauseSegmenterExtension,
  createGenderTransformerExtension,
  NegationTransformerExtension
} from 'glost-extensions';
```

These modify the document structure.

## Extension Registry

### Register Extensions

```typescript
import { registerExtension, registerExtensions, extensionRegistry } from 'glost-extensions';

// Single
registerExtension(MyExtension);

// Multiple
registerExtensions([Ext1, Ext2]);

// Direct registry access
extensionRegistry.register(MyExtension);
```

### Use Registered Extensions

```typescript
import { processGLOSTWithExtensionIds } from 'glost-extensions';

const result = processGLOSTWithExtensionIds(document, [
  "frequency",
  "difficulty",
  "my-custom-extension"
]);
```

## Extension Order

Extensions run in the order provided. For dependencies, list them first or declare them:

```typescript
// Manual ordering
const result = processGLOSTWithExtensions(document, [
  ClauseSegmenterExtension,     // Must run first
  NegationTransformerExtension  // Depends on clauses
]);

// Or use dependencies (automatic ordering)
const NegationExt = {
  id: "negation",
  dependencies: ["clause-segmenter"],
  // ...
};
```

## Combining Extensions

### All at Once

```typescript
const result = await processGLOSTWithExtensionsAsync(document, [
  // Data fetching
  createTranslationExtension({ lookupTranslation }),
  createTranscriptionExtension({ lookupTranscription }),
  
  // Structure
  createClauseSegmenterExtension(),
  
  // Metadata
  FrequencyExtension,
  DifficultyExtension,
  PartOfSpeechExtension
]);
```

### In Stages

```typescript
// Stage 1: Fetch external data
let result = await processGLOSTWithExtensionsAsync(document, [
  createTranslationExtension({ lookupTranslation }),
  createTranscriptionExtension({ lookupTranscription })
]);

// Stage 2: Analyze structure
result = processGLOSTWithExtensions(result.document, [
  createClauseSegmenterExtension()
]);

// Stage 3: Enrich metadata
result = processGLOSTWithExtensions(result.document, [
  FrequencyExtension,
  DifficultyExtension
]);
```

## Error Handling

Extensions that fail are skipped:

```typescript
const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  BrokenExtension,  // Will be skipped
  DifficultyExtension
]);

console.log(result.metadata.skippedExtensions); // ["broken-extension"]
console.log(result.metadata.errors); 
// [{ extensionId: "broken-extension", error: Error(...) }]
```

## Passing Options

### To Factory Extensions

```typescript
const clauseExt = createClauseSegmenterExtension({
  markers: ["that", "which", "because"]
});

const genderExt = createGenderTransformerExtension({
  targetGender: "female",
  displayFormat: "replace"
});
```

### To Processor

```typescript
const result = processGLOSTWithExtensions(
  document,
  [MyExtension],
  { globalOption: "value" }  // Available to all extensions
);
```

## Inspecting Results

### Check Applied Extensions

```typescript
const result = processGLOSTWithExtensions(document, extensions);

if (result.metadata.appliedExtensions.includes("frequency")) {
  // Frequency data is available
}
```

### Check for Errors

```typescript
if (result.metadata.errors.length > 0) {
  result.metadata.errors.forEach(({ extensionId, error }) => {
    console.warn(`Extension ${extensionId} failed:`, error.message);
  });
}
```

### Access Enriched Data

```typescript
import { getAllWords } from 'glost';

const words = getAllWords(result.document);

words.forEach(word => {
  console.log("Text:", word.children[0].value);
  console.log("Frequency:", word.extras?.frequency);
  console.log("Difficulty:", word.extras?.difficulty);
  console.log("Translation:", word.extras?.translations?.en);
});
```

## Performance Tips

1. **Batch similar extensions** - Run related extensions together
2. **Use sync when possible** - Async has overhead
3. **Cache external data** - In your lookup functions
4. **Filter before processing** - Don't process unnecessary content
5. **Limit async concurrency** - Avoid overwhelming APIs
