# Creating Custom Extensions

This guide covers building your own GLOST extensions.

## Extension Basics

An extension is an object implementing the `GLOSTExtension` interface:

```typescript
interface GLOSTExtension {
  id: string;           // Unique identifier
  name: string;         // Human-readable name
  description?: string; // What it does
  
  // Processing methods (all optional)
  transform?: (tree: GLOSTRoot) => GLOSTRoot | Promise<GLOSTRoot>;
  visit?: { /* visitors */ };
  enhanceMetadata?: (node: GLOSTWord) => Partial<GLOSTExtras> | void;
  
  // Configuration
  dependencies?: string[];
  options?: Record<string, unknown>;
}
```

## Extension Patterns

### 1. Metadata Enhancement

The simplest pattern - adds data to word nodes:

```typescript
const WordCountExtension: GLOSTExtension = {
  id: "word-count",
  name: "Word Character Count",
  
  enhanceMetadata: (node) => {
    const text = node.children
      .map(c => c.value)
      .join("");
    
    return {
      metadata: {
        characterCount: text.length
      }
    };
  }
};
```

### 2. Visitor Pattern

Process specific node types:

```typescript
const SentenceLengthExtension: GLOSTExtension = {
  id: "sentence-length",
  name: "Sentence Length",
  
  visit: {
    sentence: (node) => {
      const wordCount = node.children.filter(
        c => c.type === "WordNode"
      ).length;
      
      return {
        ...node,
        extras: {
          ...node.extras,
          wordCount
        }
      };
    }
  }
};
```

### 3. Transform Pattern

Modify the entire tree structure:

```typescript
const SortParagraphsExtension: GLOSTExtension = {
  id: "sort-paragraphs",
  name: "Sort Paragraphs",
  
  transform: (tree) => {
    const sortedChildren = [...tree.children].sort((a, b) => {
      // Custom sort logic
      return 0;
    });
    
    return {
      ...tree,
      children: sortedChildren
    };
  }
};
```

### 4. Async Pattern

For fetching external data:

```typescript
const DictionaryExtension: GLOSTExtension = {
  id: "dictionary-lookup",
  name: "Dictionary Lookup",
  
  visit: {
    word: async (node) => {
      const text = node.children.map(c => c.value).join("");
      
      const response = await fetch(`/api/dictionary/${text}`);
      const data = await response.json();
      
      return {
        ...node,
        extras: {
          ...node.extras,
          definition: data.definition,
          examples: data.examples
        }
      };
    }
  }
};
```

## Factory Pattern

Create configurable extensions with factory functions:

```typescript
interface HighlightOptions {
  minFrequency?: number;
  highlightColor?: string;
}

function createHighlightExtension(options: HighlightOptions = {}): GLOSTExtension {
  const { minFrequency = 100, highlightColor = "yellow" } = options;
  
  return {
    id: "highlight-rare-words",
    name: "Highlight Rare Words",
    options,
    
    enhanceMetadata: (node) => {
      const frequency = node.extras?.metadata?.frequencyRank;
      
      if (frequency && frequency > minFrequency) {
        return {
          metadata: {
            highlight: true,
            highlightColor
          }
        };
      }
    }
  };
}

// Usage
const extension = createHighlightExtension({ minFrequency: 500 });
```

## Dependencies

Declare dependencies for ordering:

```typescript
const AnalysisExtension: GLOSTExtension = {
  id: "analysis",
  name: "Word Analysis",
  dependencies: ["frequency", "difficulty"], // Runs after these
  
  enhanceMetadata: (node) => {
    // Can rely on frequency and difficulty data being present
    const freq = node.extras?.frequency?.level;
    const diff = node.extras?.difficulty?.level;
    
    return {
      metadata: {
        studyPriority: calculatePriority(freq, diff)
      }
    };
  }
};
```

## Registering Extensions

### Global Registration

```typescript
import { registerExtension, extensionRegistry } from 'glost-extensions';

// Single extension
registerExtension(MyExtension);

// Multiple extensions
extensionRegistry.registerAll([Ext1, Ext2, Ext3]);
```

### Using Registered Extensions

```typescript
import { processGLOSTWithExtensionIds } from 'glost-extensions';

const result = processGLOSTWithExtensionIds(document, [
  "frequency",
  "difficulty",
  "my-extension"
]);
```

## Error Handling

Extensions should handle errors gracefully:

```typescript
const SafeExtension: GLOSTExtension = {
  id: "safe-extension",
  name: "Safe Extension",
  
  visit: {
    word: (node) => {
      try {
        // Processing that might fail
        const result = riskyOperation(node);
        return { ...node, extras: { ...node.extras, result } };
      } catch (error) {
        // Return undefined to leave node unchanged
        console.warn("Extension failed for word:", node);
        return undefined;
      }
    }
  }
};
```

## Testing Extensions

```typescript
import { describe, it, expect } from 'vitest';
import { processGLOSTWithExtensions } from 'glost-extensions';
import { createGLOSTWordNode, createGLOSTRootNode } from 'glost';

describe('MyExtension', () => {
  it('should add custom metadata', () => {
    const word = createGLOSTWordNode("test", undefined, { partOfSpeech: "noun" });
    const doc = createGLOSTRootNode("en", "latin", [
      { type: "ParagraphNode", children: [
        { type: "SentenceNode", children: [word], lang: "en" }
      ]}
    ]);
    
    const result = processGLOSTWithExtensions(doc, [MyExtension]);
    
    const processedWord = result.document.children[0].children[0].children[0];
    expect(processedWord.extras?.metadata?.myField).toBeDefined();
  });
});
```

## Complete Example

```typescript
import type { GLOSTExtension, GLOSTWord, GLOSTExtras } from 'glost';
import { getWordText } from 'glost';

interface ReadingTimeOptions {
  wordsPerMinute?: number;
  includeBreaks?: boolean;
}

export function createReadingTimeExtension(
  options: ReadingTimeOptions = {}
): GLOSTExtension {
  const { wordsPerMinute = 200, includeBreaks = true } = options;
  
  let totalWords = 0;
  let totalSentences = 0;
  
  return {
    id: "reading-time",
    name: "Reading Time Calculator",
    description: "Calculates estimated reading time for content",
    options,
    
    // Count words and sentences
    visit: {
      word: (node) => {
        totalWords++;
        return undefined; // Don't modify
      },
      sentence: (node) => {
        totalSentences++;
        return undefined;
      }
    },
    
    // Add reading time to document
    transform: (tree) => {
      const minutes = totalWords / wordsPerMinute;
      const breakTime = includeBreaks ? totalSentences * 0.5 / 60 : 0;
      
      return {
        ...tree,
        extras: {
          ...tree.extras,
          readingTime: {
            minutes: Math.ceil(minutes + breakTime),
            wordCount: totalWords,
            sentenceCount: totalSentences
          }
        }
      };
    }
  };
}
```

## Best Practices

1. **Use unique IDs** - Prefix with your namespace
2. **Return undefined for no-op** - Don't return the same node
3. **Handle missing data** - Check for optional fields
4. **Keep extensions focused** - One responsibility per extension
5. **Document dependencies** - Clearly state what data is required
6. **Test edge cases** - Empty documents, missing fields
7. **Use factories** - For configurable extensions
8. **Be async-aware** - Use async processor for async extensions
