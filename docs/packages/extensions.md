# glost-extensions

Extension system and built-in extensions for GLOST documents.

## Installation

```bash
pnpm add glost-extensions
```

## Processing Extensions

### processGLOSTWithExtensions

Process a document with an array of extensions.

```typescript
function processGLOSTWithExtensions(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: Record<string, unknown>
): ExtensionResult;
```

**Example:**

```typescript
import { processGLOSTWithExtensions, FrequencyExtension } from 'glost-extensions';

const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
console.log(result.document);                    // Processed document
console.log(result.metadata.appliedExtensions);  // ["frequency"]
```

### processGLOSTWithExtensionsAsync

Async version for extensions that need to fetch data.

```typescript
async function processGLOSTWithExtensionsAsync(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: Record<string, unknown>
): Promise<ExtensionResult>;
```

### processGLOSTWithExtensionIds

Process using registered extension IDs.

```typescript
function processGLOSTWithExtensionIds(
  document: GLOSTRoot,
  extensionIds: string[],
  options?: Record<string, unknown>
): ExtensionResult;
```

## Extension Registry

### Global Registry

```typescript
import { extensionRegistry } from 'glost-extensions';

extensionRegistry.register(extension);
extensionRegistry.registerAll([ext1, ext2]);
extensionRegistry.get("extension-id");
extensionRegistry.getAll();
extensionRegistry.has("extension-id");
extensionRegistry.unregister("extension-id");
extensionRegistry.clear();
extensionRegistry.resolveDependencies(["id1", "id2"]);
```

### Convenience Functions

```typescript
import { registerExtension, registerExtensions, getExtension, getAllExtensions } from 'glost-extensions';

registerExtension(MyExtension);
registerExtensions([Ext1, Ext2]);
const ext = getExtension("my-extension");
const all = getAllExtensions();
```

## Extension Result

```typescript
interface ExtensionResult {
  document: GLOSTRoot;
  metadata: {
    appliedExtensions: string[];
    skippedExtensions: string[];
    errors: Array<{ extensionId: string; error: Error }>;
  };
}
```

## Built-in Extensions

### FrequencyExtension

Enriches words with frequency display data.

```typescript
import { FrequencyExtension, createFrequencyExtension } from 'glost-extensions';

// Use default
processGLOSTWithExtensions(doc, [FrequencyExtension]);

// Or create with options
const freq = createFrequencyExtension({
  colorScheme: "warm" // custom options
});
```

**Expects:** `extras.metadata.frequency` on words
**Adds:** `extras.frequency.display`, `extras.frequency.color`, `extras.frequency.priority`

### DifficultyExtension

Enriches words with difficulty display data.

```typescript
import { DifficultyExtension, createDifficultyExtension } from 'glost-extensions';
```

**Expects:** `extras.metadata.difficulty` on words
**Adds:** `extras.difficulty.display`, `extras.difficulty.color`, `extras.difficulty.level`

### PartOfSpeechExtension

Enriches words with POS display data.

```typescript
import { PartOfSpeechExtension, createPartOfSpeechExtension } from 'glost-extensions';
```

**Expects:** `metadata.partOfSpeech` on words
**Adds:** `extras.pos.abbreviation`, `extras.pos.color`, `extras.pos.description`

### GenderExtension

Adds grammatical gender display data.

```typescript
import { GenderExtension, createGenderExtension } from 'glost-extensions';
```

### CulturalNotesExtension

Formats cultural notes for display.

```typescript
import { CulturalNotesExtension, createCulturalNotesExtension } from 'glost-extensions';
```

**Expects:** `extras.metadata.culturalNotes` on words
**Adds:** Formatted cultural notes display data

### ClauseSegmenterExtension

Transformer that segments sentences into clauses.

```typescript
import { createClauseSegmenterExtension } from 'glost-extensions';

const segmenter = createClauseSegmenterExtension({
  markers: ["that", "which", "because", "although", "if", "when"]
});
```

**Transforms:** Sentences to contain `GLOSTClause` nodes

### GenderTransformerExtension

Transforms text with gender variants.

```typescript
import { createGenderTransformerExtension } from 'glost-extensions';

const transformer = createGenderTransformerExtension({
  targetGender: "female",       // "male" | "female"
  displayFormat: "replace"      // "replace" | "show-both" | "inline-toggle"
});
```

**Input format:** `"{masculine|feminine}"` in text
**Output:** Based on targetGender and displayFormat

### NegationTransformerExtension

Marks clauses containing negation.

```typescript
import { NegationTransformerExtension } from 'glost-extensions';
```

**Dependencies:** `clause-segmenter` (must run first)
**Adds:** Negation metadata to clauses

## Extension Interface

```typescript
interface GLOSTExtension {
  id: string;
  name: string;
  description?: string;
  
  transform?: (tree: GLOSTRoot) => GLOSTRoot | Promise<GLOSTRoot>;
  
  visit?: {
    word?: (node: GLOSTWord) => GLOSTWord | void | Promise<GLOSTWord | void>;
    sentence?: (node: GLOSTSentence) => GLOSTSentence | void | Promise<GLOSTSentence | void>;
    paragraph?: (node: GLOSTParagraph) => GLOSTParagraph | void | Promise<GLOSTParagraph | void>;
    clause?: (node: GLOSTClause) => GLOSTClause | void | Promise<GLOSTClause | void>;
    phrase?: (node: GLOSTPhrase) => GLOSTPhrase | void | Promise<GLOSTPhrase | void>;
  };
  
  enhanceMetadata?: (node: GLOSTWord) => Partial<GLOSTExtras> | void | Promise<Partial<GLOSTExtras> | void>;
  
  dependencies?: string[];
  options?: Record<string, unknown>;
}
```

## Creating Extensions

### Metadata Enhancement Pattern

```typescript
const MyMetadataExtension: GLOSTExtension = {
  id: "my-metadata",
  name: "My Metadata Extension",
  
  enhanceMetadata: (node) => {
    const value = computeSomething(node);
    return {
      metadata: {
        myField: value
      }
    };
  }
};
```

### Visitor Pattern

```typescript
const MyVisitorExtension: GLOSTExtension = {
  id: "my-visitor",
  name: "My Visitor Extension",
  
  visit: {
    word: (node) => {
      // Return modified node or void
      return {
        ...node,
        extras: {
          ...node.extras,
          processed: true
        }
      };
    },
    sentence: (node) => {
      // Process sentences
    }
  }
};
```

### Transform Pattern

```typescript
const MyTransformExtension: GLOSTExtension = {
  id: "my-transform",
  name: "My Transform Extension",
  
  transform: (tree) => {
    // Return completely new tree structure
    return modifyTree(tree);
  }
};
```

### Async Pattern

```typescript
const MyAsyncExtension: GLOSTExtension = {
  id: "my-async",
  name: "My Async Extension",
  
  visit: {
    word: async (node) => {
      const data = await fetchExternalData(node);
      return {
        ...node,
        extras: { ...node.extras, externalData: data }
      };
    }
  }
};
```

### With Dependencies

```typescript
const MyDependentExtension: GLOSTExtension = {
  id: "my-dependent",
  name: "My Dependent Extension",
  dependencies: ["clause-segmenter"], // Runs after clause-segmenter
  
  visit: {
    clause: (node) => {
      // Process clauses created by clause-segmenter
    }
  }
};
```
