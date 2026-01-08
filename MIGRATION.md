# GLOST Migration Guide

## v0.2.0 - Externalized Language Packages

### Overview

Language-specific helper functions have been moved from the core `glost` package into dedicated language packages. This keeps the core lightweight and allows for independent language support.

### Breaking Changes

The following functions have been moved:

| Function | Old Import | New Package | New Import |
|----------|-----------|-------------|------------|
| `createThaiWord()` | `'glost'` | `glost-th` | `'glost-th'` |
| `createJapaneseWord()` | `'glost'` | `glost-ja` | `'glost-ja'` |

### Migration Steps

#### 1. Install Language Packages

```bash
# Install only the languages you use
pnpm add glost-th     # Thai support
pnpm add glost-ja     # Japanese support
```

#### 2. Update Imports

**Before (v0.1.x):**
```typescript
import { createThaiWord, createJapaneseWord } from 'glost';

const thaiWord = createThaiWord({
  text: 'สวัสดี',
  rtgs: 'sawatdi',
  partOfSpeech: 'interjection'
});
```

**After (v0.2.0+):**
```typescript
import { createThaiWord } from 'glost-th';
import { createJapaneseWord } from 'glost-ja';

const thaiWord = createThaiWord({
  text: 'สวัสดี',
  rtgs: 'sawatdi',
  partOfSpeech: 'interjection'
});
```

#### 3. Update Type Imports (if applicable)

```typescript
// Before
import type { CreateThaiWordOptions } from 'glost';

// After
import type { CreateThaiWordOptions } from 'glost-th';
```

### What Stays in Core

The `glost` core package still provides all essential functionality:

- ✅ `createGLOSTWordNode()` - Generic word creation
- ✅ `createGLOSTSentenceNode()` - Sentence creation  
- ✅ `createGLOSTParagraphNode()` - Paragraph creation
- ✅ `createGLOSTRootNode()` - Document creation
- ✅ `createSimpleWord()` - Simple word helper
- ✅ All tree traversal utilities
- ✅ Type guards and validators
- ✅ All core types and interfaces

### Benefits

#### For Applications
- **Smaller bundles:** Only import languages you use (~30% reduction)
- **Faster builds:** Less code to process
- **Clearer dependencies:** Explicit about language needs

#### For Contributors
- **Independent releases:** Update languages without core changes
- **Easier contributions:** Add new languages without touching core
- **Better organization:** Language code stays together

#### For the Ecosystem
- **Scalability:** Support 50+ languages without bloating core
- **Modularity:** Mix and match only what you need
- **Discoverability:** `npm search glost-` shows all languages

### Available Language Packages

| Package | Language | Status |
|---------|----------|--------|
| `glost-th` | Thai | ✅ Available |
| `glost-ja` | Japanese | ✅ Available |
| `glost-ko` | Korean | 🚧 Planned |
| `glost-zh` | Chinese | 🚧 Planned |
| `glost-hi` | Hindi | 🚧 Planned |

### Need Help?

- **Full guide:** [docs/migration/externalized-language-packages.md](./docs/migration/externalized-language-packages.md)
- **Architecture:** [docs/guides/multi-language-architecture.md](./docs/guides/multi-language-architecture.md)
- **Examples:** Check updated examples in `examples/` directory
- **Issues:** Open an issue on GitHub
