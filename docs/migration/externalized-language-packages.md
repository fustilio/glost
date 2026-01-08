# Detailed Migration Guide: Externalized Language Packages

## Overview

As of version 0.2.0, language-specific helper functions have been moved out of the core `glost` package into separate language packages (`glost-th`, `glost-ja`, etc.). This keeps the core lightweight, reduces bundle sizes, and allows for independent language support.

> **Quick Start:** See [MIGRATION.md](../../MIGRATION.md) for a quick reference guide.

## What Changed

### Before (v0.1.x)

```typescript
import { createThaiWord, createJapaneseWord } from 'glost';

const thaiWord = createThaiWord({
  text: 'สวัสดี',
  rtgs: 'sawatdi',
  partOfSpeech: 'interjection'
});
```

### After (v0.2.0+)

```typescript
import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';

const thaiWord = createThaiWord({
  text: 'สวัสดี',
  rtgs: 'sawatdi',
  partOfSpeech: 'interjection'
});
```

## Affected Functions

The following language-specific functions have been moved:

### Thai (`glost-th`)
- `createThaiWord()`
- `CreateThaiWordOptions` interface
- Thai transcription provider interfaces

### Japanese (`glost-ja`)
- `createJapaneseWord()`
- `CreateJapaneseWordOptions` interface
- Japanese transcription provider interfaces

## Migration Steps

### 1. Install Language Packages

```bash
# If you use Thai
pnpm add glost-th

# If you use Japanese
pnpm add glost-ja
```

### 2. Update Imports

**Find and replace:**
- `import { createThaiWord } from 'glost'` → `import { createThaiWord } from 'glost-th'`
- `import { createJapaneseWord } from 'glost'` → `import { createJapaneseWord } from 'glost-ja'`

**If using both:**
```typescript
// Before
import { createThaiWord, createJapaneseWord, createGLOSTWordNode } from 'glost';

// After
import { createGLOSTWordNode } from 'glost';
import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';
```

### 3. Update Type Imports

If you're using the option interfaces:

```typescript
// Before
import type { CreateThaiWordOptions } from 'glost';

// After
import type { CreateThaiWordOptions } from 'glost-th';
```

### 4. Rebuild and Test

```bash
pnpm install
pnpm build
pnpm test
```

## Benefits of This Change

### For Core Package Users
- **Smaller bundle size**: Only import languages you actually use
- **Faster builds**: Less code to process if you don't need all languages
- **Clearer dependencies**: Explicit about which language support you need

### For Language Package Authors
- **Independent releases**: Language packages can be updated without core changes
- **Easier contributions**: Add new languages without touching core
- **Better organization**: All Thai code in `glost-th`, all Japanese code in `glost-ja`

### For the Ecosystem
- **Scalability**: Can support 50+ languages without bloating core
- **Modularity**: Mix and match only the languages you need
- **Discoverability**: `npm search glost-` shows all language packages

## Core Package Still Includes

The `glost` core package still provides:

- ✅ `createGLOSTWordNode()` - Generic word creation
- ✅ `createGLOSTSentenceNode()` - Sentence creation
- ✅ `createGLOSTParagraphNode()` - Paragraph creation
- ✅ `createGLOSTRootNode()` - Document creation
- ✅ `createSimpleWord()` - Generic simple word helper
- ✅ All tree traversal utilities
- ✅ Type guards and validators
- ✅ All core types and interfaces

## Future Language Packages

More language packages are planned:

- `glost-ko` - Korean (Hangul, romanization)
- `glost-zh` - Chinese (Pinyin, Wade-Giles)
- `glost-hi` - Hindi (Devanagari, IAST, ISO 15919)
- `glost-ar` - Arabic (romanization)
- `glost-fr` - French (IPA)
- `glost-es` - Spanish (IPA)

## Creating Your Own Language Package

See the [Multi-Language Architecture Guide](../guides/multi-language-architecture.md) for how to create your own language package following GLOST conventions.

## Need Help?

If you encounter issues during migration:

1. Check the [examples](../../examples/) for updated usage
2. Review the [API documentation](../api.md)
3. Open an issue on GitHub

## Related Documentation

- [Multi-Language Architecture](../guides/multi-language-architecture.md)
- [Implementing Transcription Providers](../guides/implementing-transcription-providers.md)
- [Ecosystem Overview](../ecosystem.md)
