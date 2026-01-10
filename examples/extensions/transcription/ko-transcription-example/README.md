# glost-ko-transcription-example

**Mix & Match Example**: Combining `glost-ko` + `glost-transcription`

## What This Demonstrates

The **modular X * Y pattern** for Korean language extensions:

- **X = `glost-ko`**: Korean language-specific support
- **Y = `glost-transcription`**: Generic transcription extension framework
- **Result**: Korean transcription extension

## Structure

```
examples/glost-ko-transcription-example/
├── src/
│   ├── demo-data.ts          # 5 Korean words with transcriptions
│   ├── index.ts              # Combines glost-ko + glost-transcription
│   └── __tests__/
│       └── korean-transcription.test.ts
├── README.md
├── package.json
└── vitest.config.ts
```

## Demo Data (5 words)

- 안녕하세요 (hello)
- 감사합니다 (thank you)
- 한국어 (Korean language)
- 공부 (study)
- 사랑 (love)

## Transcription Schemes

- **RR**: Revised Romanization (official)
- **MR**: McCune-Reischauer romanization
- **Yale**: Yale romanization
- **Hangul**: Original Hangul script

## Usage

```typescript
import { createKoreanTranscriptionExtension } from "glost-ko-transcription-example";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";

const extension = createKoreanTranscriptionExtension();
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
- 🇯🇵 [`glost-ja-transcription-example`](../glost-ja-transcription-example/) - Japanese transcription example
- 📊 [`X * Y Matrix`](../MATRIX.md) - All possible language + feature combinations

### Related Packages
- [`glost-ko`](../../packages/languages/ko/) - Korean language support
- [`glost-transcription`](../../packages/extensions/transcription/) - Transcription framework

### Documentation
- [Examples Overview](../README.md) - All examples
- [Custom Extensions Guide](../../docs/guides/custom-extensions.md) - Creating custom extensions

## License

MIT
