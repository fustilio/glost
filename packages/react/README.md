# glost-react

React utilities for rendering GloST (Glossed Syntax Tree) documents with ruby annotations and progressive display.

## Installation

```bash
npm install glost-react glost react
```

## Features

- **Ruby Annotations**: Render transcriptions (furigana, pinyin, romanization) as ruby annotations
- **Progressive Display**: 5-level system for gradually revealing linguistic information
- **Extensible**: Add custom rendering logic with the extension system
- **Language Strategies**: Customize rendering based on language-specific rules
- **Headless Components**: Unstyled base components you can customize

## Quick Start

```tsx
import { SimpleRubyWord } from "glost-react";
import { createThaiWord } from "glost";

// Create a word with transcription
const word = createThaiWord({
  text: "สวัสดี",
  transcription: { "paiboon+": { text: "sà-wàt-dee", system: "paiboon+" } },
  translation: "hello",
});

// Render with ruby annotation
function App() {
  return (
    <SimpleRubyWord
      word={word}
      transcriptionSystem="paiboon+"
      rubyPosition="under"
      showDefinition
    />
  );
}
```

## Display Levels

The 5-level progressive display system:

| Level | Shows |
|-------|-------|
| 1 | Text only |
| 2 | Text + transcription |
| 3 | Text + transcription + definition |
| 4 | Text + transcription + definition + part of speech |
| 5 | All metadata including difficulty |

```tsx
import { RubyWord } from "glost-react";

<RubyWord
  word={word}
  displayLevel={3}
  transcriptionSystem="furigana"
/>
```

## Components

### `SimpleRubyWord`

A straightforward component with inline styles:

```tsx
<SimpleRubyWord
  word={word}
  transcriptionSystem="furigana"
  rubyPosition="over"
  showDefinition
/>
```

### `RubyWord`

Headless component with render props for full customization:

```tsx
<RubyWord
  word={word}
  displayLevel={3}
  transcriptionSystem="furigana"
  renderText={(text) => <span className="text-2xl">{text}</span>}
  renderRuby={(rt) => <rt className="text-sm text-gray-500">{rt}</rt>}
  renderDefinition={(def) => <div className="text-xs mt-1">{def}</div>}
/>
```

### `GloSTSentence`

Render an entire sentence:

```tsx
<GloSTSentence
  sentence={sentence}
  displayLevel={3}
  transcriptionSystem="pinyin"
  showTranslation
/>
```

## Hooks

### `useSpacingFlags`

Calculate spacing requirements based on display level:

```tsx
const flags = useSpacingFlags(displayLevel, transcriptionSystem, languageStrategy, word);

// flags.needsTopSpace - for ruby above
// flags.needsBottomSpace - for ruby below
// flags.needsLevel3 - show definitions
// flags.hasTranscription - has transcription data
```

### `useWordData`

Extract all data from a word node:

```tsx
const data = useWordData(word, "furigana");

// data.text - main text
// data.transcription - transcription for system
// data.translation - definition
// data.partOfSpeech - POS tag
// data.tooltipText - combined for tooltip
```

## Extensions

Add custom rendering logic:

```tsx
const difficultyExtension: GloSTRenderExtension = {
  id: "difficulty",
  shouldApply: (node, level) => level >= 5 && !!node.difficulty,
  renderMetadata: (node) => (
    <span style={getDifficultyStyles(node.difficulty)}>
      {node.difficulty}
    </span>
  ),
};

<RubyWord
  word={word}
  displayLevel={5}
  extensions={[difficultyExtension]}
/>
```

## Language Strategies

Customize rendering for specific languages:

```tsx
const japaneseStrategy: LanguageRenderingStrategy = {
  shouldShowTranscription: (word, system) => {
    // Hide furigana for pure hiragana words
    if (system === "furigana") {
      return containsKanji(getWordText(word));
    }
    return true;
  },
  getRubyPosition: () => "over",
};

<RubyWord
  word={word}
  displayLevel={2}
  transcriptionSystem="furigana"
  languageStrategy={japaneseStrategy}
/>
```

## Types

```tsx
import type {
  DisplayLevel,
  LevelConfig,
  LanguageConfig,
  LanguageRenderingStrategy,
  GloSTRenderExtension,
  RubyPosition,
} from "glost-react";
```

## Utilities

```tsx
import {
  getDefinitionTitle,
  getDifficultyStyles,
  isAllHiragana,
  isAllKana,
  containsKanji,
  DIFFICULTY_COLORS,
} from "glost-react";
```

## License

MIT
