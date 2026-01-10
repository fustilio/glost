# Mix & Match Pattern Examples

Examples demonstrating the **X * Y modular pattern** for GLOST extensions.

## Visual Matrix

See **[X * Y Matrix Documentation](./MATRIX.md)** for all possible language + feature combinations.

## The Pattern

```
Language Package (X) × Feature Framework (Y) = Specific Extension
```

This enables reusability, modularity, scalability, and consistency across language and feature combinations.

## Examples

### Language + Transcription

| Example | X (Language) | Y (Feature) | Status |
|---------|-------------|-------------|--------|
| [glost-th-transcription-example](./glost-th-transcription-example/) | `glost-th` | `glost-transcription` | 6 tests ✓ |
| [glost-ja-transcription-example](./glost-ja-transcription-example/) | `glost-ja` | `glost-transcription` | 4 tests ✓ |
| [glost-ko-transcription-example](./glost-ko-transcription-example/) | `glost-ko` | `glost-transcription` | 4 tests ✓ |

### Full Extension Suite

| Example | Description | Extensions |
|---------|-------------|------------|
| [glost-extensions-thai](./glost-extensions-thai/) | Comprehensive Thai extension suite | Transcription, Translation, Word Joiner, Syllable Segmenter, Pipelines |

## Quick Start

Each example follows the same structure:

```typescript
// 1. Import language support
import { /* language helpers */ } from "glost-{lang}";

// 2. Import feature framework
import { create{Feature}Extension } from "glost-{feature}";

// 3. Create provider
const provider = { /* Implementation */ };

// 4. Combine them
export function create{Lang}{Feature}Extension() {
  return create{Feature}Extension({
    targetLanguage: "{lang}",
    provider,
  });
}
```

## Available Combinations

### Current Examples
- Thai + Transcription
- Japanese + Transcription
- Korean + Transcription

### Possible Combinations
Any language package can be combined with any feature framework.

## Language Packages (X)

| Package | Description |
|---------|-------------|
| [`glost-th`](../packages/languages/th/) | Thai language support |
| [`glost-ja`](../packages/languages/ja/) | Japanese language support |
| [`glost-ko`](../packages/languages/ko/) | Korean language support |
| [`glost-en`](../packages/languages/en/) | English language support |

## Feature Frameworks (Y)

| Package | Description |
|---------|-------------|
| [`glost-transcription`](../packages/extensions/transcription/) | Transcription extension framework |
| [`glost-translation`](../packages/extensions/translation/) | Translation extension framework |
| [`glost-frequency`](../packages/extensions/frequency/) | Frequency analysis framework |

## Testing

Each example includes comprehensive tests:

```bash
cd examples/glost-{lang}-transcription-example
pnpm test
```

Tests verify transcriptions are added correctly, multiple words and schemes work, and non-target languages are ignored.

## See Also

- **[X * Y Matrix](./MATRIX.md)** - Visual guide to all language + feature combinations
- [GLOST Core](../packages/core/) - Core GLOST types and utilities
- [GLOST Extensions](../packages/extensions/extensions/) - Extension processor
- [Language Packages](../packages/languages/) - All language support packages
- [Extension Frameworks](../packages/extensions/) - All extension frameworks
- [Creating Custom Extensions](../docs/guides/custom-extensions.md) - Extension development guide

## License

MIT
