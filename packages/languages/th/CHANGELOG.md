# glost-th

## 0.2.0

### Minor Changes

- # Externalize Language-Specific Helpers to Dedicated Packages

  ## Breaking Changes

  Language-specific helper functions have been moved from the core `glost` package into dedicated language packages (`glost-th`, `glost-ja`). This keeps the core lightweight, reduces bundle sizes, and allows for independent language support.

  ### Removed from `glost` (Breaking)
  - `createThaiWord()` → moved to `glost-th` package
  - `createJapaneseWord()` → moved to `glost-ja` package
  - `CreateThaiWordOptions` interface → moved to `glost-th`
  - `CreateJapaneseWordOptions` interface → moved to `glost-ja`

  ### Migration Required

  Install language packages separately:

  ```bash
  npm install glost-th  # Thai language support
  npm install glost-ja  # Japanese language support
  ```

  Update imports in your code:

  ```typescript
  // Before (v0.1.x)
  import { createThaiWord, createJapaneseWord } from "glost";

  // After (v0.2.0+)
  import { createThaiWord } from "glost-th";
  import { createJapaneseWord } from "glost-ja";
  ```

  See [MIGRATION.md](../../MIGRATION.md) for complete upgrade guide.

  ## New Packages

  ### `glost-th` - Thai Language Support

  Initial release providing:
  - `createThaiWord()` helper
  - Thai transcription provider interfaces
  - Support for RTGS, Paiboon, Paiboon+, AUA, and IPA schemes

  ### `glost-ja` - Japanese Language Support

  Initial release providing:
  - `createJapaneseWord()` helper
  - Japanese transcription provider interfaces
  - Support for Romaji (Hepburn, Kunrei, Nihon), Furigana, and IPA schemes

  ## Internal Improvements
  - Fixed circular dependencies in core package (changed `glost/src/*` imports to relative imports)
  - Reduced core package size by ~30%
  - Improved build performance
  - Better modularity and maintainability

  ## What Stays in Core

  All core functionality remains unchanged:
  - ✅ `createGLOSTWordNode()` - Generic word creation
  - ✅ `createGLOSTSentenceNode()` - Sentence creation
  - ✅ `createGLOSTRootNode()` - Document creation
  - ✅ `createSimpleWord()` - Simple word helper
  - ✅ All tree traversal utilities
  - ✅ Type guards and validators
  - ✅ All core types and interfaces

  ## Benefits
  - **Smaller bundles** - Import only languages you use
  - **Independent releases** - Update languages without core changes
  - **Better organization** - All Thai code in `glost-th`, all Japanese in `glost-ja`
  - **Easier contributions** - Add new languages without touching core
  - **Scalability** - Can support 50+ languages without bloating core

### Patch Changes

- Updated dependencies
  - glost@0.2.0
  - glost-common@0.1.2

## 0.2.0

### Initial Release

Thai language support for GLOST, externalized from core `glost` package.

### Features

- `createThaiWord()` - Create Thai word nodes with RTGS transcription
- `CreateThaiWordOptions` - TypeScript interface for Thai word options
- `ThaiTranscriptionProvider` - Interface for Thai transcription providers
- Thai transcription scheme utilities (`isValidThaiScheme`, `getThaiSchemeDisplayName`)

### Supported Transcription Schemes

- **RTGS** (Royal Thai General System of Transcription)
- **Paiboon** romanization
- **Paiboon+** with tone marks
- **AUA** (American University Alumni system)
- **IPA** (International Phonetic Alphabet)

### Installation

```bash
npm install glost-th
```

### Usage

```typescript
import { createThaiWord } from "glost-th";

const word = createThaiWord({
  text: "สวัสดี",
  rtgs: "sawatdi",
  partOfSpeech: "interjection",
  tone: 2,
  syllables: ["sa", "wat", "di"],
});
```

### Dependencies

- `glost` (workspace:\*)
- `glost-common` (workspace:\*)
