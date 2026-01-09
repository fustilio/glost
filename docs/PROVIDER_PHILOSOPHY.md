# Provider Philosophy: No Data > Bad Data

## Core Principle

**In language learning applications, inaccurate data is worse than no data.**

This principle guides the design of all GLOST extension packages that require external data sources.

## Why No Fallbacks?

### The Problem with Heuristics

Consider these examples of why heuristic/fallback providers are harmful:

#### Example 1: Frequency (Word Length Heuristic)
**Heuristic**: "Shorter words are more common"

**Reality**:
- "ephemeral" (9 letters) might be rare
- "the" (3 letters) is very common
- ✅ Heuristic works here

But:
- "FAQ" (3 letters) is uncommon/specialized
- "go" (2 letters) is very common
- "qi" (2 letters) is rare (Scrabble word)
- ❌ Heuristic fails

**Impact**: Learners would be misled about which words to prioritize.

#### Example 2: POS (Capitalization Heuristic)
**Heuristic**: "Capitalized words are proper nouns"

**Reality in English**:
- "Paris" (capitalized) → proper noun ✅
- "I" (capitalized) → pronoun, not proper noun ❌
- "March" (capitalized) → could be noun (month) or verb (to march) ❌

**Impact**: Grammar instruction would be incorrect.

#### Example 3: Difficulty (Word Length Heuristic)
**Heuristic**: "Longer words are harder"

**Reality**:
- "understand" (10 letters) → beginner/intermediate
- "whilst" (6 letters) → advanced/formal
- "go" (2 letters) → can have complex usage (phrasal verbs)
- ❌ Heuristic is unreliable

**Impact**: Learning materials would have wrong difficulty levels.

## The Alternative: Graceful Degradation

Instead of guessing, GLOST extensions return `undefined` when they don't have data:

```typescript
// ✅ Good: Return undefined when unsure
async getFrequency(word, language) {
  const data = await corpus.lookup(word);
  if (!data) return undefined; // Don't guess!
  return data.frequency;
}

// ❌ Bad: Guess based on heuristics
async getFrequency(word, language) {
  const data = await corpus.lookup(word);
  if (!data) {
    // DON'T DO THIS
    return word.length <= 3 ? "common" : "uncommon";
  }
  return data.frequency;
}
```

### UI Implications

When a provider returns `undefined`:

```typescript
// In your UI component
const frequency = word.extras?.frequency;

if (!frequency) {
  // Option 1: Don't show anything
  return null;
  
  // Option 2: Show "Unknown" or placeholder
  return <span className="unknown">Unknown frequency</span>;
  
  // Option 3: Highlight as "needs review"
  return <WordCard word={word} needsData="frequency" />;
}
```

This is **much better** than showing incorrect data that misleads learners.

## Real Data Sources

Instead of fallbacks, use validated sources:

### Frequency Data
- **English**: British National Corpus (BNC), Corpus of Contemporary American English (COCA)
- **Thai**: Thai National Corpus (TNC)
- **Japanese**: Balanced Corpus of Contemporary Written Japanese (BCCWJ)
- **Chinese**: HSK word lists
- **French**: Lexique database

### POS Tagging
- **English**: Penn Treebank tags, Universal Dependencies
- **Thai**: ORCHID corpus tags
- **Japanese**: MeCab/ChaSen output, JUMAN tags
- **Universal**: Universal Dependencies POS tags

### Difficulty Levels
- **European Languages**: CEFR word lists (A1, A2, B1, B2, C1, C2)
- **Japanese**: JLPT word lists (N5, N4, N3, N2, N1)
- **Chinese**: HSK levels (HSK 1-6)
- **English**: Age of Acquisition databases

## Implementation Guidelines

### For Extension Developers

1. **Never guess**: Return `undefined` when you don't have data
2. **Document data requirements**: Be explicit about what data sources are needed
3. **Provide validation**: Help users validate their data sources
4. **Show examples**: Demonstrate integration with real data sources

### For Language Package Maintainers

1. **Use validated sources**: Only use established corpora and word lists
2. **Document provenance**: Credit and link to data sources
3. **Version data**: Track which version of corpus/wordlist is used
4. **Quality over coverage**: Better to cover 80% accurately than 100% poorly

### For Application Developers

1. **Handle undefined gracefully**: Design UI for missing data
2. **Don't fill gaps**: Resist the temptation to "complete" the data
3. **Allow manual annotation**: Let experts add missing data
4. **Track coverage**: Monitor which words lack data

## Benefits

### 1. Trust
Users can trust the data they see is accurate, not guessed.

### 2. Explicit Gaps
Missing data is visible and can be filled properly by:
- Adding more corpus data
- Manual expert annotation
- Community contributions

### 3. Quality Signal
Applications can show data quality/confidence to users:
- "95% of words have frequency data"
- "POS tags from validated dictionary"
- "Difficulty from JLPT N3 word list"

### 4. Focused Improvement
Developers know exactly where to focus efforts:
- "We need frequency data for technical terms"
- "Scientific vocabulary lacks POS tags"
- "Slang expressions need difficulty ratings"

## Exceptions

Are there cases where heuristics are acceptable?

### Maybe: As Explicit Flags

If you must use heuristics, make them explicit:

```typescript
interface EnhancedWord {
  frequency?: {
    level: FrequencyLevel;
    source: "corpus" | "heuristic" | "manual";
    confidence: number; // 0-1
  };
}

// Allow but mark heuristic data
if (!corpusData) {
  return {
    level: heuristicGuess(word),
    source: "heuristic",
    confidence: 0.3  // Low confidence
  };
}
```

Then UI can:
- Show low-confidence data differently (grayed out)
- Allow users to toggle heuristic data on/off
- Prioritize fixing low-confidence data

### Generally No

Even with flags, we believe:
1. It's better to show nothing than show "probably wrong"
2. Users tend to trust any data shown
3. Fixing bad data is harder than filling gaps

## Conclusion

The "No Data > Bad Data" philosophy ensures:
- **Trust**: Users can rely on displayed data
- **Quality**: Only validated sources are used
- **Clarity**: Missing data is explicit, not hidden
- **Improvement**: Gaps guide development priorities

This approach may seem strict, but it results in better learning outcomes and more maintainable applications.
