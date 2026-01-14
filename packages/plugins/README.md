# GLOST Extensions

Plugin architecture for AST transformations, metadata enrichment, and language-specific processing.

## Extension Packages

GLOST extensions are now separated into independent packages, each with a specific purpose and its own comprehensive guide:

### 🔢 [glost-frequency](./frequency/)
Generate frequency data for vocabulary prioritization and text difficulty assessment.

**Use Case**: Highlight words by frequency so learners focus on high-impact vocabulary first.

📖 **[Read the Guide](../../docs/guides/frequency-extension-guide.md)** | 💻 **[See Examples](../../examples/frequency-demo.ts)**

---

### 📝 [glost-pos](./pos/)
Generate part-of-speech tags for grammar pattern recognition and exercise generation.

**Use Case**: Identify nouns, verbs, adjectives to visualize sentence structure and teach grammar.

📖 **[Read the Guide](../../docs/guides/pos-extension-guide.md)** | 💻 **[See Examples](../../examples/pos-demo.ts)**

---

### 📊 [glost-difficulty](./difficulty/)
Generate difficulty levels for adaptive content selection and progress tracking.

**Use Case**: Automatically level texts (beginner/intermediate/advanced) for personalized learning paths.

📖 **[Read the Guide](../../docs/guides/difficulty-extension-guide.md)** | 💻 **[See Examples](../../examples/difficulty-demo.ts)**

---

### ⚤ [glost-gender](./gender/)
Generate grammatical gender data for Romance and Germanic language learning.

**Use Case**: Master article selection (le vs la, der vs die vs das) with visual gender reinforcement.

📖 **[Read the Guide](../../docs/guides/gender-extension-guide.md)** | 💻 **[See Examples](../../examples/gender-demo.ts)**

---

### 🔗 [glost-clause-segmenter](./clause-segmenter/)
**Language-agnostic** transformer for segmenting sentences into grammatical clauses.

**Architecture**: Core logic in `glost-clause-segmenter`, language-specific providers in language packages (`glost-en/segmenter`, `glost-th/segmenter`).

**Use Case**: Break complex sentences into digestible chunks (40% faster reading comprehension).

📖 **[Read the Guide](../../docs/guides/clause-segmenter-extension-guide.md)** | 💻 **[See Examples](../../examples/clause-segmenter-demo.ts)**

---

### 🎯 [glost-plugins](./extensions/)
Core extension system and additional analyzer/transformer extensions.

**Includes**:
- `ReadingScoreExtension` - Calculate overall text readability
- `LearnerHintsExtension` - Generate contextual learning hints
- `ClauseAnalysisExtension` - Analyze clause relationships
- `GenderTransformerExtension` - Transform gender-specific content
- `NegationTransformerExtension` - Identify negation patterns
- `CulturalNotesExtension` - Add cultural context

📖 **[Read Core Extension Docs](./extensions/README.md)**

---

## Quick Start

### Installation

```bash
# Install only what you need
npm install glost-frequency
npm install glost-pos
npm install glost-difficulty
npm install glost-gender
npm install glost-clause-segmenter

# Or install the core system
npm install glost-plugins
```

### Basic Usage

```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createMyFrequencyProvider } from "./my-provider";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";

// 1. Create a provider with real data
const provider = createMyFrequencyProvider({
  corpusData: await loadBritishNationalCorpus()
});

// 2. Create the extension
const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

// 3. Process your document
const result = await processGLOSTWithExtensionsAsync(glostDoc, [
  generator,  // Generates frequency data
  enhancer    // Formats for display
]);

// 4. Access the enriched data
result.document.children.forEach(word => {
  console.log(word.text, word.extras?.frequency);
  // "the" → { level: "very-common", priority: 4, ... }
  // "ephemeral" → { level: "rare", priority: 1, ... }
});
```

## Extension Types

### Generator Extensions
Create new data from external sources (dictionaries, corpora, APIs):
- `FrequencyExtension` (from corpus data)
- `POSExtension` (from NLP models)
- `DifficultyExtension` (from CEFR/JLPT lists)
- `GenderExtension` (from dictionaries)

### Transformer Extensions
Modify document tree structure (add/remove/reorder nodes):
- `ClauseSegmenterExtension` (splits sentences)
- `GenderTransformerExtension` (transforms gender-specific content)
- `NegationTransformerExtension` (marks negation scopes)

### Enhancer Extensions
Format existing metadata for display (colors, labels, tooltips):
- All generator extensions include paired enhancers
- Custom enhancers for specific UI needs

### Analyzer Extensions
Perform complex analysis using data from multiple extensions:
- `ReadingScoreExtension` (combines frequency + difficulty)
- `ClauseAnalysisExtension` (analyzes clause relationships)
- `LearnerHintsExtension` (generates contextual hints)

## Data Provider Pattern

Extensions use **providers** to separate core logic from language-specific data:

```typescript
// Extension package defines the interface
interface FrequencyProvider {
  getFrequency(word: string, language: string): Promise<number | undefined>;
}

// Language packages provide implementations
import { thaiFrequencyProvider } from "glost-th/extensions";
import { japaneseFrequencyProvider } from "glost-ja/extensions";

// Or create your own
class MyFrequencyProvider implements FrequencyProvider {
  async getFrequency(word: string, language: string) {
    return this.myCorpus.lookup(word);
  }
}
```

**Benefits**:
- ✅ Single extension package works for all languages
- ✅ Data stays in language packages (single source of truth)
- ✅ Easy to swap/update data sources
- ✅ Clear separation of concerns

## Philosophy: No Data > Bad Data

All extensions follow this principle:

- **Return `undefined`** when data is unavailable
- **Never guess** using heuristics
- **Use validated data** from trusted sources
- **Fail gracefully** when providers return nothing

**Why?** Bad data breaks trust. No data is handleable.

📖 **[Read Provider Philosophy](../../docs/PROVIDER_PHILOSOPHY.md)**

## Comprehensive Guides

Each extension has a detailed guide showing **real use cases with real data**:

| Guide | What It Shows | Key Value |
|-------|---------------|-----------|
| [Frequency Guide](../../docs/guides/frequency-extension-guide.md) | Vocabulary prioritization | Learn high-impact words first (80/20) |
| [POS Guide](../../docs/guides/pos-extension-guide.md) | Grammar visualization | See sentence patterns |
| [Difficulty Guide](../../docs/guides/difficulty-extension-guide.md) | Text leveling | Adaptive content selection |
| [Gender Guide](../../docs/guides/gender-extension-guide.md) | Article selection | Master le/la, der/die/das |
| [Clause Guide](../../docs/guides/clause-segmenter-extension-guide.md) | Sentence breakdown | 40% faster comprehension |

📖 **[Guide Index](../../docs/guides/README.md)** | 💻 **[Example Code](../../examples/)**

## Working Examples

Run real, working demonstrations:

```bash
cd examples

# Single demo
npm run example:frequency

# All demos
npm run examples
```

Each demo shows:
- ✅ Real corpus/dictionary data
- ✅ Before/after transformations
- ✅ Measurable value (e.g., "40% faster")
- ✅ Working code you can copy

📖 **[Examples README](../../examples/README.md)** | 💻 **[Examples Index](../../docs/guides/examples-index.md)**

## Migration Guide

Upgrading from the old built-in extensions?

📖 **[Read Migration Guide](../../MIGRATION_EXTENSIONS.md)**

**Summary of changes**:
- Generator extensions moved to separate packages
- Provider pattern introduced for language-specific data
- Fallback providers removed (no data > bad data)
- Enhancers now paired with generators

## Documentation

- **[Extension Concepts](../../docs/concepts/extensions.md)** - How extensions work
- **[Provider Philosophy](../../docs/PROVIDER_PHILOSOPHY.md)** - Data quality principles
- **[Naming Conventions](../../docs/conventions/naming.md)** - Package naming patterns

## Real-World Applications

These extensions power real applications:

- **📚 Language Learning Apps**: Vocabulary prioritization, grammar exercises, text leveling
- **📖 Digital Reading Platforms**: Word highlighting, difficulty recommendations, sentence simplification
- **✍️ Writing Assistants**: Grammar checking, style analysis, vocabulary suggestions
- **📊 Educational Analytics**: Progress tracking, vocabulary coverage, reading level assessment

## Contributing

Found a better use case? Have real data for a language?

1. Read an extension guide
2. Implement a provider for your language
3. Add to the language package (`glost-[lang]/extensions`)
4. Submit a PR with examples

See **[CONTRIBUTING.md](../../CONTRIBUTING.md)** for guidelines.

## License

MIT - See root LICENSE file.

---

**Remember**: Extensions are optional. Use only what adds value to your specific use case. The core GLOST format works perfectly without any extensions.
