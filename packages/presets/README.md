# glost-presets

Preset configurations for common GLOST use cases.

## Overview

`glost-presets` provides pre-configured plugin combinations for common language learning and text processing scenarios.

## Installation

```bash
npm install glost-presets
# or
pnpm add glost-presets
```

## Available Presets

### Language Learning Preset

Complete language learning stack with all features.

**Includes:** Transcription, Translation, Frequency, Difficulty, POS

```typescript
import { glost } from "glost-processor";
import { languageLearningPreset } from "glost-presets";

const processor = glost()
  .use(languageLearningPreset);

const result = await processor.process(document);
```

**Customized:**

```typescript
import { createLanguageLearningPreset } from "glost-presets";

const preset = createLanguageLearningPreset({
  transcriptionScheme: "ipa",
  translationTarget: "es",
  includePos: false
});

const processor = glost().use(preset);
```

### Reading App Preset

Optimized for interactive reading applications.

**Includes:** Transcription, Translation, Clause Segmentation

```typescript
import { readingAppPreset } from "glost-presets";

const processor = glost()
  .use(readingAppPreset);
```

### Vocabulary Builder Preset

Focus on word frequency and difficulty for vocabulary learning.

**Includes:** Frequency, Difficulty, Translation

```typescript
import { vocabularyBuilderPreset } from "glost-presets";

const processor = glost()
  .use(vocabularyBuilderPreset);
```

### Grammar Analyzer Preset

Focus on grammatical analysis.

**Includes:** POS Tagging, Clause Segmentation, Gender

```typescript
import { grammarAnalyzerPreset } from "glost-presets";

const processor = glost()
  .use(grammarAnalyzerPreset);
```

### Minimal Preset

Just the essentials.

**Includes:** Transcription, Translation

```typescript
import { minimalPreset } from "glost-presets";

const processor = glost()
  .use(minimalPreset);
```

## Creating Custom Presets

You can create your own presets:

```typescript
import type { Preset } from "glost-processor";

const myCustomPreset: Preset = {
  id: "my-custom",
  name: "My Custom Preset",
  description: "My custom plugin combination",
  plugins: [
    ["transcription", { scheme: "ipa" }],
    "frequency",
    ["my-plugin", { option: "value" }]
  ]
};

const processor = glost()
  .use(myCustomPreset);
```

## Combining Presets

You can use multiple presets or extend them:

```typescript
import { glost } from "glost-processor";
import { minimalPreset } from "glost-presets";

const processor = glost()
  .use(minimalPreset)
  .use("frequency")  // Add frequency on top
  .use("difficulty"); // And difficulty
```

## Customization Functions

Each preset has a customization function:

- `createLanguageLearningPreset(options)`
- `createReadingAppPreset(options)`
- `createVocabularyBuilderPreset(options)`
- `createGrammarAnalyzerPreset(options)`
- `createMinimalPreset(options)`

These let you customize the preset while keeping the overall structure.

## Use Cases

### Language Learning App

```typescript
import { languageLearningPreset } from "glost-presets";

const processor = glost()
  .use(languageLearningPreset)
  .before("translation", async (doc) => {
    // Cache original text before translation
  })
  .after("difficulty", (doc) => {
    // Send analytics after difficulty calculation
  });
```

### Reading Tool

```typescript
import { readingAppPreset } from "glost-presets";

const processor = glost()
  .use(readingAppPreset)
  .onProgress((stats) => {
    updateProgressBar(stats.completed / stats.total);
  });
```

### Vocabulary Flashcards

```typescript
import { vocabularyBuilderPreset } from "glost-presets";

const processor = glost({ lenient: true })
  .use(vocabularyBuilderPreset);

const result = await processor.processWithMeta(document);
const words = getAllWords(result.document);

// Create flashcards from words with frequency/difficulty
const flashcards = words
  .filter(w => w.extras?.frequency?.level === "common")
  .map(createFlashcard);
```

## API

Each preset is a `Preset` object with:

```typescript
interface Preset {
  id: string;
  name: string;
  description: string;
  plugins: Array<PluginSpec | [PluginSpec, any]>;
}
```

## License

MIT
