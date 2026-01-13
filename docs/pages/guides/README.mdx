# GLOST Extension Guides

Comprehensive guides demonstrating the real-world value of each GLOST extension package.

## Philosophy: Show, Don't Tell

Each guide demonstrates:
- **Real use cases** with actual scenarios
- **Before/After comparisons** showing the transformation
- **Data examples** with real corpus/dictionary data
- **Visual demonstrations** of output and UI integration
- **Measurable value** (e.g., "40% faster comprehension")
- **Working code examples** you can copy and adapt

## Extension Guides

### 🔢 [Frequency Extension](./frequency-extension-guide.md)
**Use Case**: Highlight words by frequency for prioritized vocabulary learning

**Key Value**:
- Focus on high-impact vocabulary first (80/20 rule)
- Accurate text difficulty assessment
- Data-driven learning paths

**Example**: "ephemeral" (rare) vs "the" (very common) → visual prioritization

---

### 📝 [Part-of-Speech Extension](./pos-extension-guide.md)
**Use Case**: Identify nouns, verbs, adjectives for grammar learning

**Key Value**:
- Sentence structure visualization
- Automatic exercise generation
- Pattern recognition (adjective + noun, SVO order)

**Example**: "The quick brown fox jumps" → [Art][Adj][Adj][N][V]

---

### 📊 [Difficulty Extension](./difficulty-extension-guide.md)
**Use Case**: Assess text difficulty for adaptive learning platforms

**Key Value**:
- Automatic text leveling (beginner/intermediate/advanced)
- Personalized content recommendations
- Challenge word identification

**Example**: 44% advanced words → "Advanced Level" text

---

### ⚤ [Gender Extension](./gender-extension-guide.md)
**Use Case**: Learn grammatical gender for Romance/Germanic languages

**Key Value**:
- Correct article selection (le vs la, der vs die vs das)
- Visual gender reinforcement
- Gender pattern discovery

**Example**: "chat" (masculine) → use "le", not "la"

---

### 🔗 [Clause Segmenter Extension](./clause-segmenter-extension-guide.md)
**Use Case**: Break complex sentences into comprehensible clauses

**Key Value**:
- 40% faster reading comprehension
- Core meaning vs supporting details
- Sentence complexity analysis

**Example**: "The student [who studied] passed [because she understood]" → 3 clauses identified

---

## Quick Comparison

| Extension | What It Does | Input | Output | Primary Benefit |
|-----------|-------------|-------|--------|-----------------|
| **Frequency** | Rates word commonness | "ephemeral" | Rare (43 occurrences) | Prioritized learning |
| **POS** | Tags grammar role | "jumps" | Verb | Pattern recognition |
| **Difficulty** | Assesses word level | "aforementioned" | Advanced (C2) | Adaptive content |
| **Gender** | Identifies noun gender | "chat" | Masculine | Correct articles |
| **Clause Segmenter** | Breaks sentence structure | Complex sentence | 3 clauses | Better comprehension |

## Data Quality Principle

All extensions follow the philosophy: **"No data is better than bad data."**

### ✅ We Use
- Validated corpus data (BNC, TNK, JNC)
- NLP models (Stanford NLP, spaCy)
- Official dictionaries (CEFR word lists, JLPT levels)
- Language-specific rule sets

### ❌ We Don't Use
- Length-based heuristics ("long = rare")
- Pattern guessing ("ends in -ing = verb")
- Arbitrary thresholds
- Single-source fallbacks

**Result**: High accuracy or no result. Systems can handle `undefined` values gracefully, but incorrect data breaks trust.

## Integration Patterns

### Pattern 1: Basic Usage

```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createFrequencyProvider } from "./my-provider";

// 1. Create provider with real data
const provider = createFrequencyProvider({ corpusData });

// 2. Create extension
const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

// 3. Process document
const result = await processGLOSTWithExtensionsAsync(doc, [generator, enhancer]);
```

### Pattern 2: Multi-Extension Pipeline

```typescript
// Combine multiple extensions
const [freqGen, freqEnh] = createFrequencyExtension({ ... });
const [posGen, posEnh] = createPOSExtension({ ... });
const [diffGen, diffEnh] = createDifficultyExtension({ ... });

// Process in order
const result = await processGLOSTWithExtensionsAsync(doc, [
  freqGen, posGen, diffGen,  // Generators first
  freqEnh, posEnh, diffEnh   // Enhancers second
]);
```

### Pattern 3: Language-Specific Providers

```typescript
// Each language package can provide specific implementations
import { thaiFrequencyProvider } from "glost-th/extensions";
import { japaneseFrequencyProvider } from "glost-ja/extensions";

const thaiExt = createFrequencyExtension({
  targetLanguage: "th",
  provider: thaiFrequencyProvider
});

const japaneseExt = createFrequencyExtension({
  targetLanguage: "ja",
  provider: japaneseFrequencyProvider
});
```

## Getting Started

1. **Choose an extension** based on your use case
2. **Read the guide** for detailed examples and implementation
3. **Obtain data** (corpus, dictionary, word lists, or NLP model)
4. **Implement provider** for your language
5. **Integrate and test** with your GLOST documents

## Real-World Applications

### 🎓 Language Learning Apps
- Frequency: Vocabulary prioritization
- POS: Grammar exercises
- Difficulty: Text leveling
- Gender: Article practice
- Clause Segmenter: Reading comprehension

### 📚 Digital Reading Platforms
- Frequency: Word highlighting
- Difficulty: Text recommendations
- Clause Segmenter: Sentence simplification

### ✍️ Writing Assistants
- POS: Grammar checking
- Clause Segmenter: Style analysis
- Frequency: Vocabulary suggestions

### 📊 Educational Analytics
- Difficulty: Student progress tracking
- Frequency: Vocabulary coverage measurement
- Clause Segmenter: Reading level assessment

## Contributing

Found a better use case? Have real data for a language?

1. Fork the repo
2. Add your example to the relevant guide
3. Include real data samples (anonymized if needed)
4. Submit a PR with measurable value demonstrated

## Next Steps

- Read a specific extension guide from the list above
- Check the [migration guide](../../MIGRATION_EXTENSIONS.md) for upgrading existing code
- Review the [provider philosophy](../PROVIDER_PHILOSOPHY.md) for data quality principles
- Explore [example implementations](../../examples/) for working code

---

**Remember**: Each extension is optional. Use only what adds value to your specific use case. No extension? No problem. The core GLOST format works perfectly without any extensions.
