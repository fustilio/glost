# glost-ja-transcription-example

**Mix & Match Example**: Combining `glost-ja` + `glost-transcription`

## What This Demonstrates

The **modular X * Y pattern** for Japanese language extensions:

- **X = `glost-ja`**: Japanese language-specific support
- **Y = `glost-transcription`**: Generic transcription extension framework
- **Result**: Japanese transcription extension

## Structure

```
examples/glost-ja-transcription-example/
├── src/
│   ├── demo-data.ts          # 5 Japanese words with transcriptions
│   ├── index.ts              # Combines glost-ja + glost-transcription
│   └── __tests__/
│       └── japanese-transcription.test.ts
├── README.md
├── package.json
└── vitest.config.ts
```

## Demo Data (5 words)

- こんにちは (hello)
- ありがとう (thank you)
- 日本語 (Japanese language)
- 勉強 (study)
- カタカナ (katakana)

## Transcription Schemes

- **Romaji**: General romanization
- **Hiragana**: Hiragana reading
- **Katakana**: Katakana reading (when applicable)
- **Hepburn**: Hepburn romanization

## Usage

```typescript
import { createJapaneseTranscriptionExtension } from "glost-ja-transcription-example";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";

const extension = createJapaneseTranscriptionExtension();
const result = await processGLOSTWithExtensionsAsync(document, [extension]);
```

## Installation

```bash
# In monorepo
pnpm install

# Run tests
pnpm test
```

## See Also

### Parallel Examples
- 🇹🇭 [`glost-th-transcription-example`](../glost-th-transcription-example/) - Thai transcription example
- 🇰🇷 [`glost-ko-transcription-example`](../glost-ko-transcription-example/) - Korean transcription example
- 📊 [`X * Y Matrix`](../MATRIX.md) - All possible language + feature combinations

### Related Packages
- [`glost-ja`](../../packages/languages/ja/) - Japanese language support
- [`glost-transcription`](../../packages/extensions/transcription/) - Transcription framework

### Documentation
- [Examples Overview](../README.md) - All examples
- [Custom Extensions Guide](../../docs/guides/custom-extensions.md) - Creating custom extensions

## License

MIT
