# glost-th - Thai Language Support for GLOST

Pure Thai language support package for the GLOST (Glossed Syntax Tree) framework, providing reusable Thai-specific constants, utilities, and helpers.

## Features

### 🔤 Thai Language Constants
- **Transcription schemes**: RTGS, Paiboon, Paiboon+, AUA, IPA
- **Tone marks and tones**: Thai 5-tone system with Unicode mappings
- **Unicode ranges**: Consonants, vowels, tone marks, digits
- **Regular expressions**: Pre-built patterns for Thai text detection
- **Language metadata**: BCP-47 codes, script info, native names

### 🛠️ Utility Functions
- **Character classification**: Detect Thai characters, consonants, vowels, tone marks
- **Text analysis**: Check if text is Thai, contains Thai, or mixed
- **Tone analysis**: Extract tone marks and convert to tone numbers
- **Transcription validation**: Validate and display transcription scheme names

### 🎯 Helper Functions
- **`createThaiWord()`**: Create Thai GLOST word nodes with transcription
- **Type definitions**: Thai transcription provider interfaces

## Installation

```bash
npm install glost-th glost glost-common
# or
pnpm add glost-th glost glost-common
```

## Usage

### Import Thai Constants

```typescript
import {
  // Transcription schemes
  THAI_TRANSCRIPTION_SCHEMES,
  THAI_TRANSCRIPTION_SCHEME_NAMES,
  
  // Tones
  THAI_TONES,
  THAI_TONE_MARKS,
  THAI_TONE_NAMES,
  
  // Unicode ranges and regex
  THAI_UNICODE_RANGES,
  THAI_REGEX,
  
  // Language info
  THAI_LANGUAGE_INFO,
  
  // Utility functions
  isThaiCharacter,
  containsThaiCharacters,
  isThaiText,
  isThaiConsonant,
  isThaiVowel,
  isThaiToneMark,
  getToneMark,
  getToneNumber,
  isValidThaiTranscriptionScheme,
  getThaiTranscriptionSchemeName,
} from "glost-th/constants";
```

### Character Classification

```typescript
import { isThaiCharacter, isThaiConsonant, isThaiVowel } from "glost-th/constants";

isThaiCharacter('ก');  // true
isThaiCharacter('a');  // false

isThaiConsonant('ก');  // true
isThaiVowel('า');      // true
```

### Text Analysis

```typescript
import { containsThaiCharacters, isThaiText } from "glost-th/constants";

containsThaiCharacters('สวัสดี');        // true
containsThaiCharacters('hello');         // false
containsThaiCharacters('สวัสดี hello');  // true

isThaiText('สวัสดี');        // true
isThaiText('สวัสดี hello');  // false
```

### Tone Analysis

```typescript
import { getToneMark, getToneNumber, THAI_TONE_NAMES } from "glost-th/constants";

const word = "ก่า"; // with Mai Ek (low tone)
const toneMark = getToneMark(word);  // '่'
const toneNumber = getToneNumber(toneMark);  // 1
const toneName = THAI_TONE_NAMES[toneNumber];  // 'Low'
```

### Transcription Schemes

```typescript
import {
  THAI_TRANSCRIPTION_SCHEMES,
  isValidThaiTranscriptionScheme,
  getThaiTranscriptionSchemeName,
} from "glost-th/constants";

// Available schemes
console.log(THAI_TRANSCRIPTION_SCHEMES.RTGS);         // 'rtgs'
console.log(THAI_TRANSCRIPTION_SCHEMES.PAIBOON_PLUS); // 'paiboon+'
console.log(THAI_TRANSCRIPTION_SCHEMES.IPA);          // 'ipa'

// Validate scheme
isValidThaiTranscriptionScheme('rtgs');     // true
isValidThaiTranscriptionScheme('invalid');  // false

// Get display name
getThaiTranscriptionSchemeName('rtgs');      // 'RTGS'
getThaiTranscriptionSchemeName('paiboon+');  // 'Paiboon+'
```

### Create Thai Words

```typescript
import { createThaiWord } from "glost-th";

const word = createThaiWord({
  text: "สวัสดี",
  rtgs: "sawatdi",
  partOfSpeech: "interjection",
  tone: 2,
  syllables: ["sa", "wat", "di"]
});
```

## Package Structure

This is a **pure language support package** containing:
- ✅ Thai language constants (transcription schemes, tones, Unicode ranges)
- ✅ Thai text utilities (character detection, tone analysis)
- ✅ Thai GLOST node helpers
- ✅ Type definitions and interfaces

**Note:** This package does NOT include demo data or test vocabularies. For examples with demo data, see the `glost-th-extensions-suite-example` example package.

## API Reference

### Constants Module (`glost-th/constants`)

#### Transcription Schemes

- **`THAI_TRANSCRIPTION_SCHEMES`** - Object with all transcription scheme IDs
  - `RTGS`: Royal Thai General System
  - `PAIBOON`: Paiboon romanization
  - `PAIBOON_PLUS`: Paiboon+ with tone marks
  - `AUA`: American University Alumni system
  - `IPA`: International Phonetic Alphabet

- **`THAI_TRANSCRIPTION_SCHEME_NAMES`** - Display names for schemes

#### Tones

- **`THAI_TONES`** - Tone numbers (0-4: Mid, Low, Falling, High, Rising)
- **`THAI_TONE_MARKS`** - Unicode characters for tone marks (่ ้ ๊ ๋)
- **`THAI_TONE_NAMES`** - English names for each tone

#### Unicode & Regex

- **`THAI_UNICODE_RANGES`** - Unicode ranges for consonants, vowels, tone marks, digits
- **`THAI_REGEX`** - Pre-built regex patterns for Thai text matching

#### Language Info

- **`THAI_LANGUAGE_INFO`** - BCP-47 codes, script name, direction, native names

#### Utility Functions

- **`isThaiCharacter(char)`** - Check if character is Thai
- **`containsThaiCharacters(text)`** - Check if text contains Thai
- **`isThaiText(text, allowSpaces?)`** - Check if text is entirely Thai
- **`isThaiConsonant(char)`** - Check if character is a consonant
- **`isThaiVowel(char)`** - Check if character is a vowel
- **`isThaiToneMark(char)`** - Check if character is a tone mark
- **`getToneMark(text)`** - Extract tone mark from text
- **`getToneNumber(toneMark)`** - Convert tone mark to number (0-4)
- **`isValidThaiTranscriptionScheme(scheme)`** - Validate transcription scheme
- **`getThaiTranscriptionSchemeName(scheme)`** - Get display name for scheme

#### Utility Functions

- **`isThaiCharacter(char)`** - Check if character is Thai

### Transcription Schemes

```typescript
{
  RTGS: 'rtgs',           // Royal Thai General System
  PAIBOON: 'paiboon',     // Paiboon romanization
  PAIBOON_PLUS: 'paiboon+', // Paiboon+ with tone marks
  AUA: 'aua',             // American University Alumni
  IPA: 'ipa'              // International Phonetic Alphabet
}
```

### Thai Tones

```typescript
{
  MID: 0,       // Mid tone (unmarked)
  LOW: 1,       // Low tone (่)
  FALLING: 2,   // Falling tone (้)
  HIGH: 3,      // High tone (๊)
  RISING: 4     // Rising tone (๋)
}
```

### Unicode Ranges

- **Consonants**: U+0E01 - U+0E2E (ก-ฮ)
- **Vowels**: U+0E30 - U+0E45 (ะ-ๅ)
- **Tone Marks**: U+0E48 - U+0E4B (่-๋)
- **Digits**: U+0E50 - U+0E59 (๐-๙)
- **Full Range**: U+0E00 - U+0E7F

## Demo Vocabulary

The demo data includes 17 common Thai words:

- สวัสดี (hello)
- ขอบคุณ (thank you)
- ครับ/ค่ะ (polite particles)
- ภาษา (language)
- เรียน (study)
- เข้าใจ (understand)
- พูด (speak)
- คำ (word)
- ไทย (Thai)
- ซูเปอร์มาร์เก็ต (supermarket)
- And more...

Each entry includes:
- Multiple transcription systems (RTGS, IPA, Paiboon+, AUA)
- English translations
- Part of speech metadata

## Examples

See the [`examples/demos/glost-th-extensions-suite-example/examples/`](../../examples/demos/glost-th-extensions-suite-example/examples/) directory for complete examples:

- **`thai-constants-demo.ts`** - Comprehensive demo of all constants and utilities

## Use Cases

### Building Thai Language Extensions

Use `glost-th` as a base for building Thai language extensions:

```typescript
import { THAI_TRANSCRIPTION_SCHEMES, isThaiText } from "glost-th/constants";
import { createTranscriptionExtension } from "glost-transcription";

// Use Thai constants in your extension
const provider = {
  async getTranscriptions(word: string, lang: string) {
    if (!lang.startsWith("th")) return undefined;
    
    // Your transcription logic here
    // Use THAI_TRANSCRIPTION_SCHEMES for scheme validation
    return transcriptions;
  },
};

export const ThaiTranscriptionExtension = createTranscriptionExtension({
  targetLanguage: "th",
  provider,
});
```

**For complete examples with demo data**, see the [`glost-th-extensions-suite-example`](../../examples/demos/glost-th-extensions-suite-example/) example package.

### Thai Text Processing

```typescript
import { isThaiText, containsThaiCharacters } from "glost-th/constants";

function processText(text: string) {
  if (isThaiText(text)) {
    // Process pure Thai text
  } else if (containsThaiCharacters(text)) {
    // Process mixed Thai/English text
  } else {
    // No Thai content
  }
}
```

### Tone Analysis

```typescript
import { getToneMark, getToneNumber, THAI_TONE_NAMES } from "glost-th/constants";

function analyzeTone(syllable: string) {
  const mark = getToneMark(syllable);
  if (mark) {
    const num = getToneNumber(mark);
    return num !== undefined ? THAI_TONE_NAMES[num] : "Mid";
  }
  return "Mid";
}

console.log(analyzeTone("ก่า"));  // "Low"
console.log(analyzeTone("ก้า"));  // "Falling"
```

## Related Packages

- **`glost`** - Core GLOST types and utilities
- **`glost-common`** - Common types and utilities
- **`glost-plugins`** - Extension system framework
- **`glost-transcription`** - Transcription extension framework
- **`glost-translation`** - Translation extension framework

## Contributing

To add more Thai-specific functionality:

1. Add constants to `src/constants.ts`
2. Add utilities to appropriate modules
3. Add examples to demonstrate usage
4. Update README with new features

## License

MIT
