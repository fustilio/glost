# glost-en-transcription-ipa-example

English IPA (International Phonetic Alphabet) transcription extension.

## Purpose

**GENERATOR** extension that provides IPA transcriptions for English words.

## What It Does

Adds IPA transcription to word nodes:

```typescript
// Input
{ type: "WordNode", text: "hello" }

// Output
{
  type: "WordNode",
  text: "hello",
  extras: {
    transcription: {
      ipa: "/həˈloʊ/",
      source: "dictionary",
      language: "en"
    }
  }
}
```

## Usage

```typescript
import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";
import { processGLOSTWithExtensions } from "glost-extensions";

const result = processGLOSTWithExtensions(document, [EnglishIPAExtension]);
```

## Composition

This extension can be used:

1. **Standalone** - Just show IPA
2. **Composed** - Feed into other extensions:
   - `en-ipa-to-phonemic` - Convert IPA to readable respelling
   - Custom pronunciation trainers
   - Speech synthesis systems

## Example Dictionary Entries

- `hello` → `/həˈloʊ/`
- `ecclesiastical` → `/ɪˌkliː.ziˈæs.tɪk.əl/`
- `worcestershire` → `/ˈwʊs.tər.ʃər/`
- `colonel` → `/ˈkɜːr.nəl/` (silent "l")
- `queue` → `/kjuː/` (4 silent letters!)

## Implementation Notes

This is a **demo implementation** with a limited dictionary. A production version would:

- Use CMU Pronouncing Dictionary (100k+ words)
- Implement G2P (grapheme-to-phoneme) for unknown words
- Handle multiple pronunciations (British vs American)
- Include stress and syllable boundary information
- Support phonological rules and allophony

## See Also

- [`en-ipa-to-phonemic`](../en-ipa-to-phonemic/) - Converts IPA to user-friendly respelling
- [Composition Demo](../../../../composition-demo/) - Shows both extensions working together
