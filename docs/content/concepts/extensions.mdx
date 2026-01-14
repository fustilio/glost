# Extension System

GLOST's extension system allows documents to be enriched with additional metadata and structural transformations.

## Overview

Extensions can:

1. **Transform** - Modify the document tree structure
2. **Visit** - Process specific node types
3. **Enhance** - Add metadata to nodes

## Extension Interface

```typescript
interface GLOSTExtension {
  id: string;              // Unique identifier
  name: string;            // Human-readable name
  description?: string;
  
  // Global tree transformation
  transform?: (tree: GLOSTRoot) => GLOSTRoot | Promise<GLOSTRoot>;
  
  // Node-specific visitors
  visit?: {
    word?: (node: GLOSTWord) => GLOSTWord | void | Promise<...>;
    sentence?: (node: GLOSTSentence) => GLOSTSentence | void | Promise<...>;
    paragraph?: (node: GLOSTParagraph) => GLOSTParagraph | void | Promise<...>;
  };
  
  // Metadata enrichment
  enhanceMetadata?: (node: GLOSTWord) => Partial<GLOSTExtras> | void | Promise<...>;
  
  // Dependencies
  dependencies?: string[];
  
  // Configuration
  options?: Record<string, unknown>;
}
```

## Processing Pipeline

1. **Registration** - Extensions are registered in the registry
2. **Dependency Resolution** - Topological sort determines order
3. **Transform Phase** - Global tree transformations
4. **Visit Phase** - Node-specific modifications
5. **Enhance Phase** - Metadata enrichment
6. **Result** - Returns processed document and metadata

## Using Extensions

### Basic Usage

```typescript
import { processGLOSTWithExtensions, FrequencyExtension, DifficultyExtension } from 'glost-extensions';

const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  DifficultyExtension
]);

// Access result
const enrichedDoc = result.document;
console.log(result.metadata.appliedExtensions); // ["frequency", "difficulty"]
```

### Async Extensions

For extensions that need to fetch data:

```typescript
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';
import { createTranslationExtension } from 'glost-translation';

const translationExt = createTranslationExtension({
  targetLanguage: "th",
  nativeLanguage: "en",
  lookupTranslation: async (word, lang) => {
    const response = await fetch(`/api/dictionary/${lang}/${word}`);
    return response.json();
  }
});

const result = await processGLOSTWithExtensionsAsync(document, [translationExt]);
```

### Extension Registry

```typescript
import { extensionRegistry, registerExtension, getExtension } from 'glost-extensions';

// Register an extension globally
registerExtension(MyExtension);

// Get by ID
const ext = getExtension("my-extension");

// Process using registered extension IDs
import { processGLOSTWithExtensionIds } from 'glost-extensions';
const result = processGLOSTWithExtensionIds(document, ["frequency", "difficulty"]);
```

## Built-in Extensions

### Metadata Extensions

#### FrequencyExtension

Enriches words with frequency display data.

```typescript
import { FrequencyExtension } from 'glost-extensions';

// Expects words to have extras.metadata.frequency set
// Adds: extras.frequency.display, extras.frequency.color, extras.frequency.priority
```

#### DifficultyExtension

Enriches words with difficulty display data.

```typescript
import { DifficultyExtension } from 'glost-extensions';

// Expects words to have extras.metadata.difficulty set
// Adds: extras.difficulty.display, extras.difficulty.color, extras.difficulty.level
```

#### PartOfSpeechExtension

Enriches words with POS display data.

```typescript
import { PartOfSpeechExtension } from 'glost-extensions';

// Uses metadata.partOfSpeech
// Adds: extras.pos.abbreviation, extras.pos.color, extras.pos.description
```

#### CulturalNotesExtension

Adds cultural context display data.

```typescript
import { CulturalNotesExtension } from 'glost-extensions';

// Uses extras.metadata.culturalNotes
// Adds formatted cultural notes for display
```

#### GenderExtension

Handles grammatical gender.

```typescript
import { GenderExtension } from 'glost-extensions';

// Adds gender-related display data
```

### Transformer Extensions

#### ClauseSegmenterExtension

Segments sentences into clauses.

```typescript
import { createClauseSegmenterExtension } from 'glost-extensions';

const segmenter = createClauseSegmenterExtension({
  markers: ["that", "which", "because", "although"]
});

// Transforms sentences to contain GLOSTClause nodes
```

#### GenderTransformerExtension

Transforms text with gender variants.

```typescript
import { createGenderTransformerExtension } from 'glost-extensions';

const transformer = createGenderTransformerExtension({
  targetGender: "female",
  displayFormat: "replace" // or "show-both", "inline-toggle"
});

// Input: "Hello {monsieur|madame}"
// Output: "Hello madame" (with targetGender: "female")
```

#### NegationTransformerExtension

Marks negated clauses.

```typescript
import { NegationTransformerExtension } from 'glost-extensions';

// Depends on clause-segmenter
// Adds negation metadata to clauses containing negative words
```

## Extension Result

```typescript
interface ExtensionResult {
  document: GLOSTRoot;  // Processed document
  metadata: {
    appliedExtensions: string[];
    skippedExtensions: string[];
    errors: Array<{ extensionId: string; error: Error }>;
  };
}
```

## Dependency Resolution

Extensions can declare dependencies:

```typescript
const NegationTransformerExtension = {
  id: "negation-transformer",
  dependencies: ["clause-segmenter"], // Runs after clause-segmenter
  // ...
};
```

The processor automatically:
- Resolves dependencies using topological sort
- Detects circular dependencies (throws error)
- Ensures extensions run in correct order

## Creating Custom Extensions

See the [Creating Custom Extensions](../guides/custom-extensions.md) guide.

### Quick Example

```typescript
const MyExtension: GLOSTExtension = {
  id: "my-extension",
  name: "My Custom Extension",
  
  enhanceMetadata: (node) => {
    return {
      metadata: {
        myCustomField: computeValue(node)
      }
    };
  }
};
```

## Best Practices

1. **Use unique IDs** - Avoid conflicts with other extensions
2. **Declare dependencies** - Let the system handle ordering
3. **Handle errors gracefully** - Failed extensions shouldn't crash processing
4. **Keep extensions focused** - One extension, one responsibility
5. **Use async sparingly** - Only when external data is needed
6. **Document your extensions** - Describe what they add/transform
