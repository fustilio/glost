# GLOST Examples

Runnable examples as vitest tests.

## Structure

```
examples/
├── core/
│   ├── basic-usage.test.ts        # words, sentences, documents
│   └── multilingual.test.ts       # Thai, Japanese, Chinese
├── extensions/
│   ├── using-extensions.test.ts   # built-in extensions
│   └── custom-extension.test.ts   # writing your own
├── integration/
│   └── language-learning-reader.test.ts   # flashcards, vocab lists, reader
```

## Running

```bash
# CLI
pnpm --filter @glost/examples test

# watch mode
pnpm --filter @glost/examples test:watch

# vitest UI
pnpm --filter @glost/examples test:ui
```

## Quick Reference

### Creating nodes

```typescript
import { createThaiWord, createSentenceFromWords } from "glost";

const words = [
  createThaiWord("สวัสดี", "sa-wat-di", "interjection"),
  createThaiWord("ครับ", "khrap", "particle"),
];

words[0].extras = {
  translations: { en: "hello" },
  metadata: { difficulty: "beginner" },
};

const sentence = createSentenceFromWords(words, "th", "thai", "สวัสดีครับ");
```

### Processing with extensions

```typescript
import { processGLOSTWithExtensions, FrequencyExtension } from "glost-extensions";

const result = processGLOSTWithExtensions(document, [FrequencyExtension]);
```

### Writing an extension

```typescript
const MyExtension: GLOSTExtension = {
  id: "my-ext",
  name: "My Extension",
  enhanceMetadata: (node) => ({
    processed: true,
  }),
};
```

## Built-in Extensions

| Extension | What it does |
|-----------|-------------|
| `FrequencyExtension` | rare/uncommon/common/very-common |
| `DifficultyExtension` | beginner/intermediate/advanced |
| `PartOfSpeechExtension` | noun/verb/adjective/etc |
| `GenderExtension` | grammatical gender |
| `ClauseSegmenterExtension` | splits sentences into clauses |
