# glost-th-transcription-example

**Mix & Match Example**: Combining `glost-th` + `glost-transcription`

## What This Demonstrates

This example shows the **modular X * Y pattern** for building GLOST extensions:

- **X = `glost-th`**: Thai language-specific constants and utilities
- **Y = `glost-transcription`**: Generic transcription extension framework
- **Result**: Thai transcription extension that combines both

## The Mix & Match Pattern

```
glost-th (language-specific)
    ↓
    + glost-transcription (feature-specific)
    ↓
    = Thai Transcription Extension
```

This pattern allows you to:
- ✅ Reuse language-specific utilities (`glost-th`)
- ✅ Reuse feature frameworks (`glost-transcription`)
- ✅ Combine them for specific use cases
- ✅ Avoid duplicating code

## Structure

```
examples/glost-th-transcription-example/
├── src/
│   ├── demo-data.ts          # Minimal transcription data (5 words)
│   ├── index.ts              # Main extension combining glost-th + glost-transcription
│   └── __tests__/
│       └── thai-transcription.test.ts
├── README.md
├── package.json
└── vitest.config.ts
```

## How It Works

### 1. Use glost-th Constants

```typescript
import { 
  THAI_TRANSCRIPTION_SCHEMES,
  isValidThaiTranscriptionScheme 
} from "glost-th/constants";

// Use Thai-specific constants
const scheme = THAI_TRANSCRIPTION_SCHEMES.PAIBOON_PLUS; // "paiboon+"
```

### 2. Implement TranscriptionProvider

```typescript
import { type TranscriptionProvider } from "glost-transcription";
import { getThaiTranscriptions } from "./demo-data.js";

const provider: TranscriptionProvider = {
  async getTranscriptions(word: string, language: string) {
    if (!language.startsWith("th")) return undefined;
    return getThaiTranscriptions(word);
  },
};
```

### 3. Create Extension

```typescript
import { createTranscriptionExtension } from "glost-transcription";

export function createThaiTranscriptionExtension() {
  return createTranscriptionExtension({
    targetLanguage: "th",
    provider,
  });
}
```

## Usage

```typescript
import { createThaiTranscriptionExtension } from "glost-th-transcription-example";
import { processGLOSTWithExtensionsAsync } from "glost-extensions";
import { createGLOSTRootNode, createGLOSTSentenceNode, createGLOSTWordNode } from "glost";

// Create a document with Thai words
const doc = createGLOSTRootNode({
  children: [
    createGLOSTSentenceNode({
      children: [
        createGLOSTWordNode({ value: "สวัสดี", lang: "th", script: "thai" }),
        createGLOSTWordNode({ value: "ภาษาไทย", lang: "th", script: "thai" }),
      ],
    }),
  ],
});

// Apply transcription extension
const extension = createThaiTranscriptionExtension();
const result = await processGLOSTWithExtensionsAsync(doc, [extension]);

// Words now have transcriptions!
// สวัสดี → { rtgs: "sawatdi", ipa: "sà.wàt.diː", "paiboon+": "sà-wàt-dii" }
```

## What's Included

### Demo Data (5 words)
- สวัสดี (hello)
- ขอบคุณ (thank you)
- ภาษา (language)
- ไทย (Thai)
- เรียน (study)

### Transcription Schemes
- RTGS (Royal Thai General System)
- IPA (International Phonetic Alphabet)
- Paiboon+ (with tone marks)
- AUA (American University Alumni)

## Building Your Own

To build your own language + feature combination:

```typescript
// 1. Import language-specific utilities
import { YOUR_LANG_CONSTANTS } from "glost-YOUR_LANG/constants";

// 2. Import feature framework
import { createYourFeatureExtension } from "glost-YOUR_FEATURE";

// 3. Combine them
export function createYourLangYourFeatureExtension() {
  const provider = {
    // Your implementation using YOUR_LANG_CONSTANTS
  };

  return createYourFeatureExtension({
    targetLanguage: "YOUR_LANG",
    provider,
  });
}
```

## Other Possible Combinations

This pattern works for any X * Y combination:

- `glost-th` + `glost-translation` → Thai translation
- `glost-th` + `glost-frequency` → Thai frequency analysis
- `glost-ja` + `glost-transcription` → Japanese transcription
- `glost-ja` + `glost-translation` → Japanese translation
- `glost-YOUR_LANG` + `glost-YOUR_FEATURE` → Your custom extension

## Dependencies

- `glost` - Core GLOST types
- `glost-th` - Thai language support (X)
- `glost-transcription` - Transcription framework (Y)
- `glost-extensions` - Extension processor
- `glost-common` - Common utilities

## Installation

```bash
# In monorepo
pnpm install

# Run tests
pnpm test
```

## Tests

```bash
pnpm test
```

All tests verify:
- ✅ Transcriptions are added to Thai words
- ✅ Multiple transcription schemes work
- ✅ Non-Thai words are ignored
- ✅ Unknown words handled gracefully
- ✅ Constants are exported correctly

## Key Takeaways

1. **Modular Design**: Language support (glost-th) and feature framework (glost-transcription) are separate
2. **Reusability**: Both packages can be combined with other packages
3. **Focused**: This example focuses on one feature (transcription), not a full suite
4. **Pattern**: Shows the X * Y combination pattern for building extensions

## See Also

### Parallel Examples
- 🇯🇵 [`glost-ja-transcription-example`](../glost-ja-transcription-example/) - Japanese transcription example
- 🇰🇷 [`glost-ko-transcription-example`](../glost-ko-transcription-example/) - Korean transcription example
- 📊 [`X * Y Matrix`](../MATRIX.md) - All possible language + feature combinations

### Related Packages
- [`glost-th`](../../packages/languages/th/) - Thai language support base
- [`glost-transcription`](../../packages/extensions/transcription/) - Transcription framework
- [`glost-extensions-thai`](../glost-extensions-thai/) - Full Thai extension suite

### Documentation
- [Examples Overview](../README.md) - All examples
- [Custom Extensions Guide](../../docs/guides/custom-extensions.md) - Creating custom extensions
- [GLOST Core](../../packages/core/) - Core documentation

## License

MIT
