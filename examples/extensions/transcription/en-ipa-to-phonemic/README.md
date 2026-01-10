# glost-en-ipa-to-phonemic-example

English IPA to phonemic respelling converter extension.

## Purpose

**ENHANCER** extension that converts IPA transcriptions to user-friendly phonemic respellings.

## What It Does

Transforms IPA into readable format:

```typescript
// Input (from en-transcription-ipa)
{
  extras: {
    transcription: { ipa: "/ɪˌkliː.ziˈæs.tɪk.əl/" }
  }
}

// Output
{
  extras: {
    transcription: { ipa: "/ɪˌkliː.ziˈæs.tɪk.əl/" },
    respelling: {
      text: "ih-KLEE-zee-AS-tik-uhl",
      fromIPA: "/ɪˌkliː.ziˈæs.tɪk.əl/",
      format: "phonemic"
    }
  }
}
```

## Extension Composition

This demonstrates **extension composition**:

```
┌──────────────────────────┐
│  en-transcription-ipa    │  GENERATOR: Creates IPA data
│  Provides: IPA           │
└────────────┬─────────────┘
             │ IPA data flows down
             ↓
┌──────────────────────────┐
│  en-ipa-to-phonemic      │  ENHANCER: Transforms IPA data
│  Requires: IPA           │
│  Provides: Respelling    │
└──────────────────────────┘
```

## Usage

### Composed (Recommended)

```typescript
import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";
import { EnglishIPAToPhonemic Extension } from "glost-en-ipa-to-phonemic-example";

// Both extensions work together
const result = processGLOSTWithExtensions(document, [
  EnglishIPAExtension,            // Provides IPA
  EnglishIPAToPhonemic Extension    // Consumes IPA, provides respelling
]);
```

### Standalone Function

```typescript
import { ipaToPhonemic } from "glost-en-ipa-to-phonemic-example";

// Use the conversion function directly
const respelling = ipaToPhonemic("/həˈloʊ/");
// Returns: "huh-LOH"
```

## Examples

| Word | IPA | Phonemic Respelling |
|------|-----|---------------------|
| hello | /həˈloʊ/ | huh-LOH |
| ecclesiastical | /ɪˌkliː.ziˈæs.tɪk.əl/ | ih-KLEE-zee-AS-tik-uhl |
| worcestershire | /ˈwʊs.tər.ʃər/ | WOOS-ter-sher |
| colonel | /ˈkɜːr.nəl/ | KER-nuhl |
| queue | /kjuː/ | kyoo |
| knight | /naɪt/ | NEYET |

Note how stressed syllables are CAPITALIZED!

## Features

- ✅ Extracts syllable boundaries
- ✅ Identifies primary stress (ˈ)
- ✅ Identifies secondary stress (ˌ)
- ✅ Converts IPA symbols to readable format
- ✅ Uppercases stressed syllables
- ✅ Joins with hyphens for clarity

## Why This Matters

**IPA is accurate but hard to read**:
- `/ɪˌkliː.ziˈæs.tɪk.əl/` ❌ Intimidating for learners

**Phonemic respelling is readable**:
- `ih-KLEE-zee-AS-tik-uhl` ✅ Anyone can pronounce this!

## Extension Dependencies

This extension **requires** another extension to provide IPA:

```typescript
// ❌ ERROR: Will throw ExtensionDependencyError
processGLOSTWithExtensions(document, [
  EnglishIPAToPhonemic Extension  // No IPA source!
]);

// ✅ CORRECT: IPA provider comes first
processGLOSTWithExtensions(document, [
  EnglishIPAExtension,          // Provides IPA
  EnglishIPAToPhonemic Extension  // Uses IPA
]);
```

## See Also

- [`en-transcription-ipa`](../en-transcription-ipa/) - Provides the IPA this extension needs
- [Composition Demo](../../../../composition-demo/) - Interactive demo of both extensions
