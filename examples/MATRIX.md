# GLOST X * Y Pattern: Language + Feature Matrix

This document visualizes how GLOST's modular architecture allows you to **mix and match** language packages with feature frameworks.

## 🧬 The Pattern

```
Language Package (X)  ×  Feature Framework (Y)  =  Specialized Extension
```

Each language package provides language-specific constants, utilities, and helpers.  
Each feature framework provides a generic extension pattern (transcription, translation, etc.).  
**Combine them to create powerful, specialized extensions!**

## 📊 Current Matrix

| Language (X) ↓ / Feature (Y) → | Transcription | Translation | Frequency | Difficulty | POS | Clause |
|--------------------------------|---------------|-------------|-----------|------------|-----|---------|
| **Thai (th)** | ✅ [Example](./glost-th-transcription-example/) | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible |
| **Japanese (ja)** | ✅ [Example](./glost-ja-transcription-example/) | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible |
| **Korean (ko)** | ✅ [Example](./glost-ko-transcription-example/) | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible |
| **English (en)** | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible | ⚪ Possible |

**Legend:**
- ✅ = Example available
- ⚪ = Possible (framework exists, just needs implementation)
- ❌ = Not applicable

## 🎯 What Each Component Provides

### Language Packages (X)

Each language package (`glost-{lang}`) provides:

1. **Constants** - Language-specific constants
   - Script Unicode ranges
   - Transcription scheme definitions
   - Regular expressions for script detection
   - Language metadata (ISO codes, script names, direction)

2. **Utilities** - Helper functions
   - Script detection (`isThaiCharacter`, `isHiragana`, `isHangulSyllable`)
   - Text analysis (`containsJapaneseCharacters`, `analyzeText`)
   - Script conversion (`decomposeHangul`, `composeHangul`)
   - Validation (`isValidTranscriptionScheme`)

3. **Type Definitions** - TypeScript types
   - Transcription scheme types
   - Provider interfaces
   - Language-specific types

4. **Helpers** - Document creation
   - `createThaiWord()`, `createJapaneseWord()`, `createKoreanWord()`

### Feature Frameworks (Y)

Each feature framework (`glost-{feature}`) provides:

1. **Extension Pattern** - Generic extension logic
   - Base extension creator
   - Processing logic
   - Document transformation

2. **Provider Interface** - What you need to implement
   - Data lookup interface
   - Scheme validation
   - Metadata retrieval

3. **Type Safety** - TypeScript support
   - Generic types
   - Type inference
   - Provider contracts

### Current Language Packages

| Package | Scripts | Special Features |
|---------|---------|------------------|
| **glost-th** | Thai | Tone marks, syllable segmentation, 5-tone system |
| **glost-ja** | Hiragana, Katakana, Kanji | Script detection, Jamo analysis, pitch accent |
| **glost-ko** | Hangul | Jamo decomposition/composition, syllable analysis |
| **glost-en** | Latin | Basic support |

### Current Feature Frameworks

| Framework | Purpose | What It Does |
|-----------|---------|--------------|
| **glost-transcription** | Romanization/phonetics | Adds transcription metadata to word nodes |
| **glost-translation** | Definitions/glosses | Adds translation metadata to word nodes |
| **glost-frequency** | Word frequency | Adds frequency metadata based on corpus |
| **glost-difficulty** | Learning difficulty | Adds difficulty ratings for learners |
| **glost-pos** | Part of speech | Adds grammatical category metadata |
| **glost-clause-segmenter** | Syntax analysis | Segments sentences into clauses |

## 🚀 How to Create New Combinations

### Example: Thai + Translation

1. **Use the language package**:
```typescript
import { THAI_TRANSCRIPTION_SCHEMES, isThaiCharacter } from 'glost-th';
```

2. **Use the feature framework**:
```typescript
import { createTranslationExtension } from 'glost-translation';
```

3. **Implement the provider** with your data:
```typescript
const thaiTranslationProvider = {
  getTranslation(word: string, targetLang: string) {
    // Your Thai→English dictionary lookup
    return demoData[word]?.translations[targetLang];
  }
};
```

4. **Create the extension**:
```typescript
export const thaiTranslationExtension = createTranslationExtension({
  targetLanguage: 'th',
  provider: thaiTranslationProvider
});
```

## 📦 Example Packages

This directory contains working examples demonstrating the X * Y pattern:

### Transcription Examples

- **[glost-th-transcription-example](./glost-th-transcription-example/)** - Thai transcription (RTGS, Paiboon+, IPA, AUA)
- **[glost-ja-transcription-example](./glost-ja-transcription-example/)** - Japanese transcription (Romaji, Hepburn, Hiragana)
- **[glost-ko-transcription-example](./glost-ko-transcription-example/)** - Korean transcription (RR, MR, Yale)

### Comprehensive Examples

- **[glost-extensions-thai](./glost-extensions-thai/)** - Full Thai language learning suite with multiple extensions

## 🌍 Expanding the Matrix

### Adding a New Language

1. Create `packages/languages/{lang}/`
2. Add `constants.ts` with language-specific constants
3. Add `helpers.ts` with word creation helpers
4. Export everything from `index.ts`
5. Build and publish

**Now you can use it with ANY feature framework!**

### Adding a New Feature

1. Create `packages/extensions/{feature}/`
2. Define the provider interface
3. Implement the extension creator
4. Add type definitions

**Now you can use it with ANY language package!**

## 🎓 Learning Path

**Beginner**: Start with a single example
- Pick a language you're learning
- Try the transcription example
- See how X * Y works

**Intermediate**: Combine multiple features
- Add translation to transcription
- Create a pipeline with 2-3 extensions
- Learn about composition

**Advanced**: Create new combinations
- Pick a new X * Y pair
- Implement the provider with your data
- Contribute back to the ecosystem

## 💡 Design Principles

1. **Modularity** - Each package does one thing well
2. **Reusability** - Mix and match freely
3. **Consistency** - Same patterns across all combinations
4. **Type Safety** - Full TypeScript support
5. **Documentation** - Every combination is documented

## 🔮 Future Possibilities

### More Languages
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Arabic (ar)
- Hindi (hi)
- ... any language!

### More Features
- **glost-audio** - Link to pronunciation audio
- **glost-morphology** - Break words into morphemes
- **glost-etymology** - Word origin information
- **glost-collocations** - Common word combinations
- **glost-examples** - Usage examples
- ... any feature!

### Matrix Growth

With **10 languages** × **10 features** = **100 possible combinations**  
With **50 languages** × **20 features** = **1,000 possible combinations**

**All following the same pattern!**

## 📚 See Also

- [Main README](../README.md) - Project overview
- [Core Documentation](../docs/packages/core.md) - GLOST core concepts
- [Extension Guide](../docs/guides/custom-extensions.md) - Creating custom extensions
- [Architecture](../docs/ARCHITECTURE_SUMMARY.md) - System architecture

---

**The power of X * Y: Infinite combinations from finite components.** 🎯
