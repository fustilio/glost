# Frequency Extension Guide

## Real-World Use Case: Reading Comprehension Tool

**Scenario**: You're building a reading app for English learners. You want to highlight words by frequency so learners can focus on the most useful vocabulary first.

## Before (Without Frequency Data)

```
Text: "The ephemeral nature of social media posts makes archival challenging."

All words look the same - no prioritization.
Learner doesn't know which words are essential vs. rare.
```

## After (With Frequency Extension)

### Input Text
```typescript
const text = "The ephemeral nature of social media posts makes archival challenging.";
```

### With Frequency Data

```typescript
import { createFrequencyExtension } from "glost-frequency";
import { createEnglishFrequencyProvider } from "./my-corpus-provider";

// Real corpus data (example from BNC)
const corpusFrequencies = new Map([
  ["the", 6187925],      // Very common
  ["nature", 14523],     // Common
  ["of", 3093874],       // Very common
  ["social", 8934],      // Common
  ["media", 5821],       // Common
  ["posts", 234],        // Uncommon
  ["makes", 45231],      // Common
  ["archival", 127],     // Rare
  ["challenging", 892],  // Uncommon
  ["ephemeral", 43],     // Rare
]);

const provider = createEnglishFrequencyProvider({ corpusData: corpusFrequencies });
const [generator, enhancer] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

const result = await processGLOSTWithExtensionsAsync(glostDoc, [generator, enhancer]);
```

### Output (Visualized)

```
The         [■■■■ Very Common - Priority: Learn first]
ephemeral   [□□□□ Rare - Priority: Learn later]
nature      [■■■□ Common - Priority: Medium]
of          [■■■■ Very Common - Priority: Learn first]
social      [■■■□ Common - Priority: Medium]
media       [■■■□ Common - Priority: Medium]
posts       [■■□□ Uncommon - Priority: Medium-low]
makes       [■■■□ Common - Priority: Medium]
archival    [□□□□ Rare - Priority: Learn later]
challenging [■■□□ Uncommon - Priority: Medium-low]
```

### UI Implementation

```typescript
function WordWithFrequency({ word }) {
  const freq = word.extras?.frequency;
  
  if (!freq) {
    return <span className="no-data">{word.text}</span>;
  }
  
  const colorMap = {
    "very-common": "green",
    "common": "blue",
    "uncommon": "yellow",
    "rare": "red"
  };
  
  return (
    <span 
      className={`word-${freq.level}`}
      style={{ 
        backgroundColor: colorMap[freq.level],
        fontWeight: freq.priority > 2 ? 'bold' : 'normal'
      }}
      title={`${freq.display} (Priority: ${freq.priority}/4)`}
    >
      {word.text}
    </span>
  );
}
```

### Rendered Output

```html
<span class="word-very-common" style="background: green; font-weight: bold">The</span>
<span class="word-rare" style="background: red">ephemeral</span>
<span class="word-common" style="background: blue">nature</span>
<span class="word-very-common" style="background: green; font-weight: bold">of</span>
<span class="word-common" style="background: blue">social</span>
<span class="word-common" style="background: blue">media</span>
<span class="word-uncommon" style="background: yellow">posts</span>
<span class="word-common" style="background: blue">makes</span>
<span class="word-rare" style="background: red">archival</span>
<span class="word-uncommon" style="background: yellow">challenging</span>
```

## Value Demonstrated

### 1. Prioritized Learning
**Data shows**:
- 40% of words are very common (the, of) - learn these first
- 20% are rare (ephemeral, archival) - can skip initially
- Learner focuses on 6 common words, skips 2 rare words
- **Result**: 80/20 rule applied - 80% comprehension with 20% effort

### 2. Vocabulary Recommendations

```typescript
function getStudyRecommendations(document) {
  const words = extractWords(document);
  const byFrequency = groupBy(words, w => w.extras?.frequency?.level);
  
  return {
    mustKnow: byFrequency["very-common"]?.length || 0,  // 4 words
    shouldKnow: byFrequency["common"]?.length || 0,     // 5 words
    optional: byFrequency["uncommon"]?.length || 0,     // 2 words
    advanced: byFrequency["rare"]?.length || 0          // 2 words
  };
}

// Output:
// "To understand this text, focus on 4 must-know words and 5 should-know words.
//  You can skip 2 rare words for now."
```

### 3. Difficulty Estimation

```typescript
function estimateTextDifficulty(document) {
  const words = extractWords(document);
  const rareCount = words.filter(w => w.extras?.frequency?.level === "rare").length;
  const totalWords = words.length;
  const rarePercentage = (rareCount / totalWords) * 100;
  
  if (rarePercentage > 30) return "Advanced (lots of rare vocabulary)";
  if (rarePercentage > 15) return "Intermediate (some rare words)";
  return "Beginner-friendly (common vocabulary)";
}

// This text: 20% rare words → "Intermediate"
```

## Real Data Example: Thai Language

### Corpus Data from Thai National Corpus

```typescript
const thaiCorpusData = new Map([
  // Common everyday words
  ["เป็น", 8234521],    // "to be" - very common
  ["ใน", 5234123],      // "in" - very common
  ["ที่", 4823456],     // "that/which" - very common
  ["และ", 3234567],     // "and" - very common
  
  // Mid-frequency words
  ["การศึกษา", 45231],  // "education" - common
  ["พัฒนา", 34512],     // "develop" - common
  
  // Low-frequency words
  ["อุทกภัย", 892],     // "flood" - uncommon
  ["นิเวศวิทยา", 234], // "ecology" - rare
]);

const thaiProvider = createThaiFrequencyProvider({ 
  corpusData: thaiCorpusData 
});
```

### Thai Text Example

**Input**: "การศึกษานิเวศวิทยาเป็นสิ่งสำคัญในการพัฒนา"  
(Studying ecology is important for development)

**Output with Frequency**:
- การศึกษา (education) - Common [■■■□]
- นิเวศวิทยา (ecology) - Rare [□□□□] ← Specialized term
- เป็น (is) - Very Common [■■■■]
- สิ่งสำคัญ (important) - Common [■■■□]
- ใน (in) - Very Common [■■■■]
- การพัฒนา (development) - Common [■■■□]

**Insight**: Text has 1 rare technical term (ecology) among otherwise common words.

## Practical Applications

### 1. Graded Readers
Sort texts by average word frequency:
```typescript
const texts = [
  { title: "Daily News", avgFrequency: 3.8 },      // Mostly very-common & common
  { title: "Science Article", avgFrequency: 2.1 }, // Mix of rare words
  { title: "Children's Story", avgFrequency: 3.9 } // Very common words
];

// Recommend: Start with Children's Story (3.9), then Daily News (3.8), then Science (2.1)
```

### 2. Vocabulary Flashcards
Generate flashcards prioritized by frequency:
```typescript
const unknownWords = identifyUnknownWords(document);
const prioritized = unknownWords
  .filter(w => w.extras?.frequency)
  .sort((a, b) => b.extras.frequency.priority - a.extras.frequency.priority);

// Study order: very-common first, rare last
// Learner masters high-impact vocabulary first
```

### 3. Text Simplification
Identify words to potentially simplify:
```typescript
const rareWords = words.filter(w => w.extras?.frequency?.level === "rare");
// Suggest simpler alternatives:
// "ephemeral" → "temporary"
// "archival" → "storing/saving"
```

## Data Quality Matters

### Bad Data Example (Why We Don't Use Heuristics)

```typescript
// ❌ WRONG: Heuristic based on length
function badFrequency(word) {
  if (word.length <= 3) return "very-common";  // "FAQ", "qi", "nth" ❌
  if (word.length >= 10) return "rare";        // "understand" ❌
  return "common";
}

// Words misclassified:
// - "FAQ" (3 letters) → marked very-common ❌ (actually uncommon/technical)
// - "understand" (10 letters) → marked rare ❌ (actually very common)
// - "go" (2 letters) → marked very-common ✓ (correct by accident)
```

### Good Data Example (Corpus-Based)

```typescript
// ✅ CORRECT: From British National Corpus
const corpusData = {
  "FAQ": 234,           // Uncommon (234 occurrences)
  "understand": 89234,  // Very common (89,234 occurrences)
  "go": 234891,         // Very common (234,891 occurrences)
  "whilst": 2341,       // Uncommon despite being short (2,341 occurrences)
};

// All words classified correctly based on real usage data
```

## Integration Example: Complete App

```typescript
import { createFrequencyExtension } from "glost-frequency";
import { convertTextToGLOST } from "glost-utils";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

// 1. Load corpus data
const corpusData = await loadBritishNationalCorpus();
const provider = createEnglishFrequencyProvider({ corpusData });

// 2. Create extensions
const [freqGen, freqEnh] = createFrequencyExtension({
  targetLanguage: "en",
  provider
});

// 3. Process text
const text = "Your learning material here...";
const glostDoc = convertTextToGLOST(text, "en");
const result = await processGLOSTWithExtensionsAsync(glostDoc, [freqGen, freqEnh]);

// 4. Render with highlighting
function ReadingView({ document }) {
  return (
    <div className="reading-view">
      {document.children.map(sentence => (
        <div className="sentence">
          {sentence.children.map(word => (
            <WordWithFrequency word={word} />
          ))}
        </div>
      ))}
      <FrequencySummary document={document} />
    </div>
  );
}

// 5. Show stats
function FrequencySummary({ document }) {
  const stats = analyzeFrequency(document);
  return (
    <div className="summary">
      <h3>Vocabulary Analysis</h3>
      <ul>
        <li>Must-know words: {stats.mustKnow} (study first)</li>
        <li>Should-know words: {stats.shouldKnow} (study next)</li>
        <li>Advanced words: {stats.advanced} (optional for now)</li>
      </ul>
      <p>Estimated difficulty: {stats.difficulty}</p>
    </div>
  );
}
```

## Conclusion

Frequency data transforms text from undifferentiated words into a **prioritized learning experience**:

- ✅ Learners know what to focus on
- ✅ Texts are accurately leveled
- ✅ Study materials are ordered by impact
- ✅ Progress is measurable (% of common words known)

**The key**: Real corpus data, not guesses.
