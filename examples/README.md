# GLOST Examples

Runnable examples demonstrating GLOST features and best practices. All examples are written as tests that serve as documentation.

## Structure

```
examples/
├── core/                           # Core functionality
│   ├── basic-usage.test.ts        # Creating nodes, words, sentences, documents
│   └── multilingual.test.ts       # Working with Thai, Japanese, Chinese
├── extensions/                     # Extension system
│   ├── using-extensions.test.ts   # Using built-in extensions
│   ├── custom-extension.test.ts   # Writing custom extensions
│   └── composition-pattern.test.ts # SRP/SSOT composition examples
└── integration/                    # Real-world applications
    └── language-learning-reader.test.ts  # Flashcards, vocab lists, readers
```

## Running Examples

All examples are test files that can be run from the workspace root:

```bash
# Run all examples
pnpm test examples/

# Run specific category
pnpm test examples/core/
pnpm test examples/extensions/
pnpm test examples/integration/

# Run specific example
pnpm test examples/core/basic-usage.test.ts

# Watch mode
pnpm test examples/ --watch

# With UI
pnpm test examples/ --ui
```

## Example Categories

### Core Examples

Basic GLOST usage - creating and manipulating language trees.

**What you'll learn:**
- Creating word, sentence, and document nodes
- Working with transcriptions (IPA, RTGS, Paiboon+, Romaji)
- Adding translations and metadata
- Multilingual document creation

**Start here:** [`core/basic-usage.test.ts`](core/basic-usage.test.ts)

### Extension Examples

Using and creating extensions to enrich language trees.

**What you'll learn:**
- Using built-in extensions (Frequency, Difficulty, POS)
- Composition patterns (SRP & SSOT)
- Creating custom extensions
- Async extensions with external data
- Mix-and-match data sources and transcription systems

**Start here:** [`extensions/using-extensions.test.ts`](extensions/using-extensions.test.ts)

### Integration Examples

Complete real-world applications.

**What you'll learn:**
- Building language learning applications
- Creating flashcard systems
- Implementing vocabulary lists
- Building interactive readers

**Start here:** [`integration/language-learning-reader.test.ts`](integration/language-learning-reader.test.ts)

## Quick Reference

### Creating Nodes

```typescript
import { 
  createThaiWord, 
  createSentenceFromWords,
  createDocumentFromParagraphs 
} from "glost";

// Create Thai word with RTGS transcription
const word = createThaiWord("สวัสดี", "sa-wat-di", "interjection");

// Add translations and metadata
word.extras = {
  translations: { en: "hello", ja: "こんにちは" },
  metadata: { 
    difficulty: "beginner",
    frequency: "very-common",
    culturalNotes: "Standard greeting used any time of day"
  }
};

// Create sentence from words
const sentence = createSentenceFromWords([word], "th", "thai", "สวัสดี");
```

### Using Extensions

```typescript
import { 
  processGLOSTWithExtensions,
  FrequencyExtension,
  DifficultyExtension 
} from "glost-extensions";

// Process document with extensions
const result = processGLOSTWithExtensions(document, [
  FrequencyExtension,
  DifficultyExtension
]);

// Access enriched data
const words = getAllWords(result.document);
console.log(words[0].extras?.frequency?.display); // "Very Common"
console.log(words[0].extras?.difficulty?.level);   // "beginner"
```

### Using Example Data

```typescript
import { 
  findWord,
  getTranscription,
  createTranscriptionLookup 
} from "glost-extensions/example-data";

// Find word in example vocabulary
const entry = findWord("สวัสดี", "th");
console.log(entry?.frequency);  // "very-common"
console.log(entry?.difficulty); // "beginner"

// Get transcription
const ipa = getTranscription("สวัสดี", "th", "ipa");
// "sà.wàt.diː"

// Create lookup function for extensions
const lookupThaiPaiboon = createTranscriptionLookup("th", "paiboon");
```

### Writing Custom Extensions

```typescript
import type { GLOSTExtension } from "glost-extensions";

const MyExtension: GLOSTExtension = {
  id: "my-extension",
  name: "My Custom Extension",
  description: "Does something useful",
  
  enhanceMetadata: (node) => {
    // Add custom metadata
    return {
      customField: "custom value",
      processed: true
    };
  }
};

// Use your extension
const result = processGLOSTWithExtensions(document, [MyExtension]);
```

## Built-in Extensions

| Extension | Purpose | Output |
|-----------|---------|--------|
| `FrequencyExtension` | Word frequency data | `rare`, `uncommon`, `common`, `very-common` |
| `DifficultyExtension` | Learning difficulty | `beginner`, `intermediate`, `advanced` |
| `PartOfSpeechExtension` | Part of speech | `noun`, `verb`, `adjective`, etc. |
| `CulturalNotesExtension` | Cultural context | Formatted cultural notes |
| `GenderExtension` | Grammatical gender | Gender metadata |
| `ClauseSegmenterExtension` | Sentence segmentation | Splits into clauses |
| `GenderTransformerExtension` | Gender variants | Transform text with gender options |
| `NegationTransformerExtension` | Negation marking | Marks negated clauses |

## Example Data

Examples include sample vocabulary in 5 languages:
- **English** (15 words with IPA)
- **Thai** (15 words with IPA, RTGS, Paiboon+, tone marks)
- **Japanese** (12 words with IPA, Romaji, Furigana)
- **French** (12 words with IPA, gender)
- **Spanish** (12 words with IPA, gender)

See [`packages/extensions/src/example-data/README.md`](../packages/extensions/src/example-data/README.md) for details.

## Testing Patterns

Examples use Vitest with descriptive test names:

```typescript
describe("Feature Name", () => {
  it("does something specific", () => {
    // Arrange
    const input = createInput();
    
    // Act
    const result = processInput(input);
    
    // Assert
    expect(result).toHaveProperty("expected");
  });
});
```

## Learning Path

1. **Start with Core**: [`core/basic-usage.test.ts`](core/basic-usage.test.ts)
   - Understand basic node creation
   - Learn about transcriptions and translations

2. **Try Extensions**: [`extensions/using-extensions.test.ts`](extensions/using-extensions.test.ts)
   - Use built-in extensions
   - See how metadata enrichment works

3. **Explore Composition**: [`extensions/composition-pattern.test.ts`](extensions/composition-pattern.test.ts)
   - Learn SRP & SSOT principles
   - See mix-and-match examples

4. **Build Something**: [`integration/language-learning-reader.test.ts`](integration/language-learning-reader.test.ts)
   - Create real applications
   - Combine multiple features

## Contributing Examples

To add new examples:

1. Create a descriptive `.test.ts` file in the appropriate category
2. Use clear, commented code
3. Follow the Arrange-Act-Assert pattern
4. Add meaningful assertions
5. Update this README

Examples should be:
- ✅ Self-contained and runnable
- ✅ Well-commented and educational
- ✅ Demonstrating best practices
- ✅ Testing real use cases

## See Also

- [Core Documentation](../packages/core/README.md)
- [Extensions Documentation](../packages/extensions/README.md)
- [Naming Conventions](../docs/conventions/naming.md)
- [Architecture Summary](../docs/ARCHITECTURE_SUMMARY.md)
