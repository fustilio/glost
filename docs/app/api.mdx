# API Reference

Complete API documentation for `glost-common`.

## Language Code Functions

### toISO639_3

Convert any language code to ISO-639-3 format.

```typescript
function toISO639_3(code: string): string
```

**Parameters:**
- `code` - ISO-639-1, ISO-639-3, or BCP-47 code

**Returns:** ISO-639-3 three-letter code

**Examples:**
```typescript
toISO639_3("en")       // "eng"
toISO639_3("en-US")    // "eng"
toISO639_3("eng")      // "eng"
toISO639_3("zh-Hans")  // "zho"
```

---

### toISO639_1

Convert to ISO-639-1 format if possible.

```typescript
function toISO639_1(code: string): string | undefined
```

**Parameters:**
- `code` - Any language code

**Returns:** ISO-639-1 two-letter code, or `undefined` if no equivalent exists

**Examples:**
```typescript
toISO639_1("eng")  // "en"
toISO639_1("cmn")  // undefined (Mandarin has no ISO-639-1)
toISO639_1("th")   // "th"
```

---

### getLanguageName

Get the English name of a language.

```typescript
function getLanguageName(code: string): string
```

**Parameters:**
- `code` - Any language code

**Returns:** English language name, or the code itself if unknown

**Examples:**
```typescript
getLanguageName("th")   // "Thai"
getLanguageName("cmn")  // "Mandarin Chinese"
getLanguageName("xyz")  // "xyz"
```

---

### getNativeLanguageName

Get the native name of a language.

```typescript
function getNativeLanguageName(code: string): string
```

**Parameters:**
- `code` - Any language code

**Returns:** Native language name, or the code itself if unknown

**Examples:**
```typescript
getNativeLanguageName("ja")   // "日本語"
getNativeLanguageName("th")   // "ไทย"
getNativeLanguageName("ar")   // "العربية"
```

---

### getLanguageDisplayName

Get display name for language codes, handling special codes.

```typescript
function getLanguageDisplayName(code: string): string
```

**Parameters:**
- `code` - Any language code including special codes

**Returns:** Display-friendly name

**Examples:**
```typescript
getLanguageDisplayName("en")   // "English"
getLanguageDisplayName("ipa")  // "IPA"
getLanguageDisplayName("und")  // "Undetermined"
```

---

### isValidLanguageCode

Check if a code is a known language code.

```typescript
function isValidLanguageCode(code: string): boolean
```

**Parameters:**
- `code` - Code to validate

**Returns:** `true` if recognized

**Examples:**
```typescript
isValidLanguageCode("en")     // true
isValidLanguageCode("eng")    // true
isValidLanguageCode("en-US")  // true
isValidLanguageCode("xyz")    // false
```

---

### isSpecialCode

Check if a code is a special (non-language) code.

```typescript
function isSpecialCode(code: string): boolean
```

**Parameters:**
- `code` - Code to check

**Returns:** `true` if special code

**Examples:**
```typescript
isSpecialCode("ipa")  // true
isSpecialCode("und")  // true
isSpecialCode("en")   // false
```

---

### getLanguageInfo

Get complete information about a language.

```typescript
function getLanguageInfo(code: string): {
  code: string;
  iso3: string;
  iso1: string | undefined;
  name: string;
  nativeName: string;
  bcp47: string;
}
```

**Parameters:**
- `code` - Any language code

**Returns:** Object with complete language information

**Examples:**
```typescript
getLanguageInfo("th")
// {
//   code: "th",
//   iso3: "tha",
//   iso1: "th",
//   name: "Thai",
//   nativeName: "ไทย",
//   bcp47: "tha-TH"
// }

getLanguageInfo("cmn")
// {
//   code: "cmn",
//   iso3: "cmn",
//   iso1: undefined,
//   name: "Mandarin Chinese",
//   nativeName: "普通话",
//   bcp47: "cmn-CN"
// }
```

## BCP-47 Functions

### parseBCP47

Parse a BCP-47 tag into components.

```typescript
function parseBCP47(tag: string): BCP47Components

type BCP47Components = {
  language: string;
  script?: string;
  region?: string;
}
```

**Parameters:**
- `tag` - BCP-47 language tag

**Returns:** Parsed components with normalized casing

**Examples:**
```typescript
parseBCP47("en")
// { language: "en" }

parseBCP47("en-US")
// { language: "en", region: "US" }

parseBCP47("zh-Hans-CN")
// { language: "zh", script: "Hans", region: "CN" }

parseBCP47("SR-latn-rs")  // Normalizes case
// { language: "sr", script: "Latn", region: "RS" }
```

---

### buildBCP47

Build a BCP-47 tag from components.

```typescript
function buildBCP47(components: BCP47Components): string
```

**Parameters:**
- `components` - Object with language, optional script and region

**Returns:** BCP-47 tag string

**Examples:**
```typescript
buildBCP47({ language: "en" })
// "en"

buildBCP47({ language: "en", region: "US" })
// "en-US"

buildBCP47({ language: "zh", script: "Hans", region: "CN" })
// "zh-Hans-CN"
```

---

### normalizeBCP47

Normalize a BCP-47 tag to standard casing.

```typescript
function normalizeBCP47(tag: string): string
```

**Parameters:**
- `tag` - BCP-47 tag with any casing

**Returns:** Normalized tag (lowercase language, title case script, uppercase region)

**Examples:**
```typescript
normalizeBCP47("EN-us")       // "en-US"
normalizeBCP47("ZH-HANS-cn")  // "zh-Hans-CN"
```

---

### isValidBCP47

Check if a string is a valid BCP-47 format.

```typescript
function isValidBCP47(tag: string): boolean
```

**Parameters:**
- `tag` - String to validate

**Returns:** `true` if valid BCP-47 format

**Examples:**
```typescript
isValidBCP47("en")           // true
isValidBCP47("en-US")        // true
isValidBCP47("zh-Hans-CN")   // true
isValidBCP47("")             // false
isValidBCP47("x")            // false (too short)
```

---

### toBCP47WithRegion

Get BCP-47 tag with default region.

```typescript
function toBCP47WithRegion(code: string): string
```

**Parameters:**
- `code` - Language code

**Returns:** BCP-47 tag with region, or unchanged if no default

**Examples:**
```typescript
toBCP47WithRegion("en")   // "en-US"
toBCP47WithRegion("th")   // "th-TH"
toBCP47WithRegion("cmn")  // "cmn-CN"
toBCP47WithRegion("xyz")  // "xyz" (no default region)
```

## Proficiency Functions

### cefrToNumeric

Convert CEFR level to numeric.

```typescript
function cefrToNumeric(cefr: CEFRLevel): ProficiencyLevel
```

**Examples:**
```typescript
cefrToNumeric("Pre-A1")  // 0
cefrToNumeric("A1")      // 1
cefrToNumeric("B1")      // 3
cefrToNumeric("C2")      // 6
```

---

### numericToCEFR

Convert numeric level to CEFR.

```typescript
function numericToCEFR(level: ProficiencyLevel): CEFRLevel
```

**Examples:**
```typescript
numericToCEFR(0)    // "Pre-A1"
numericToCEFR(3)    // "B1"
numericToCEFR(2.7)  // "B1" (rounds to nearest)
numericToCEFR(10)   // "C2" (clamped)
```

---

### toNumericLevel

Convert any standard's level to numeric.

```typescript
function toNumericLevel(
  value: string | number,
  standard: ProficiencyStandard
): ProficiencyLevel
```

**Parameters:**
- `value` - Level in the specified standard
- `standard` - The proficiency standard

**Examples:**
```typescript
toNumericLevel("B1", "cefr")        // 3
toNumericLevel("HSK 4", "hsk")      // 4
toNumericLevel("N3", "jlpt")        // 3
toNumericLevel("3", "ilr")          // 4
toNumericLevel(95, "toefl")         // 4
toNumericLevel(6.5, "ielts")        // 4
```

---

### fromNumericLevel

Convert numeric level to a specific standard.

```typescript
function fromNumericLevel(
  level: ProficiencyLevel,
  standard: ProficiencyStandard
): string | number
```

**Parameters:**
- `level` - Numeric level (0-6)
- `standard` - Target standard

**Examples:**
```typescript
fromNumericLevel(4, "cefr")       // "B2"
fromNumericLevel(4, "hsk")        // "HSK 4"
fromNumericLevel(4, "jlpt")       // "N2"
fromNumericLevel(4, "ielts")      // 6.5
fromNumericLevel(4, "toefl")      // 109
```

---

### getProficiencyInfo

Get complete proficiency information.

```typescript
function getProficiencyInfo(level: ProficiencyLevel): ProficiencyInfo

interface ProficiencyInfo {
  numeric: ProficiencyLevel;
  cefr: CEFRLevel;
  description: string;
  canDo: string[];
}
```

**Examples:**
```typescript
getProficiencyInfo(3)
// {
//   numeric: 3,
//   cefr: "B1",
//   description: "B1 - Intermediate",
//   canDo: [
//     "Deal with most situations while traveling",
//     "Produce simple connected text on familiar topics",
//     "Describe experiences, events, dreams, and ambitions"
//   ]
// }
```

---

### meetsLevel

Check if a level meets a requirement.

```typescript
function meetsLevel(current: ProficiencyLevel, required: ProficiencyLevel): boolean
```

**Examples:**
```typescript
meetsLevel(3, 2)  // true
meetsLevel(3, 3)  // true
meetsLevel(3, 4)  // false
```

---

### levelProgress

Calculate progress between two levels.

```typescript
function levelProgress(
  current: ProficiencyLevel,
  from: ProficiencyLevel,
  to: ProficiencyLevel
): number
```

**Returns:** Percentage (0-100)

**Examples:**
```typescript
levelProgress(2.5, 2, 3)  // 50
levelProgress(2.0, 2, 3)  // 0
levelProgress(3.0, 2, 3)  // 100
```

---

### levelsBetween

Get CEFR levels between two numeric values.

```typescript
function levelsBetween(from: ProficiencyLevel, to: ProficiencyLevel): CEFRLevel[]
```

**Examples:**
```typescript
levelsBetween(1, 3)  // ["A1", "A2", "B1"]
levelsBetween(0, 6)  // ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]
```

## Language-Specific Conversions

### HSK (Chinese)

```typescript
hskToNumeric(hsk: HSKLevel): ProficiencyLevel
numericToHSK(level: ProficiencyLevel): HSKLevel

type HSKLevel = "HSK 1" | "HSK 2" | "HSK 3" | "HSK 4" | "HSK 5" | "HSK 6"
```

### JLPT (Japanese)

```typescript
jlptToNumeric(jlpt: JLPTLevel): ProficiencyLevel
numericToJLPT(level: ProficiencyLevel): JLPTLevel

type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1"
```

### TOPIK (Korean)

```typescript
topikToNumeric(topik: TOPIKLevel): ProficiencyLevel
numericToTOPIK(level: ProficiencyLevel): TOPIKLevel

type TOPIKLevel = "TOPIK I-1" | "TOPIK I-2" | "TOPIK II-3" | "TOPIK II-4" | "TOPIK II-5" | "TOPIK II-6"
```

### ILR

```typescript
ilrToNumeric(ilr: ILRLevel): ProficiencyLevel
numericToILR(level: ProficiencyLevel): ILRLevel

type ILRLevel = "0" | "0+" | "1" | "1+" | "2" | "2+" | "3" | "3+" | "4" | "4+" | "5"
```

### ACTFL

```typescript
actflToNumeric(actfl: ACTFLLevel): ProficiencyLevel
numericToACTFL(level: ProficiencyLevel): ACTFLLevel

type ACTFLLevel = "Novice Low" | "Novice Mid" | "Novice High" |
                  "Intermediate Low" | "Intermediate Mid" | "Intermediate High" |
                  "Advanced Low" | "Advanced Mid" | "Advanced High" |
                  "Superior" | "Distinguished"
```

### IELTS

```typescript
ieltsToNumeric(band: IELTSBand): ProficiencyLevel
numericToIELTS(level: ProficiencyLevel): IELTSBand

type IELTSBand = 1 | 1.5 | 2 | ... | 9
```

### TOEFL

```typescript
toeflToNumeric(score: TOEFLScore): ProficiencyLevel
numericToTOEFL(level: ProficiencyLevel): TOEFLScore

type TOEFLScore = number  // 0-120
```

### Cambridge

```typescript
cambridgeToNumeric(level: CambridgeLevel): ProficiencyLevel
numericToCambridge(level: ProficiencyLevel): CambridgeLevel

type CambridgeLevel = "KET" | "PET" | "FCE" | "CAE" | "CPE"
```

### DELE (Spanish)

```typescript
deleToNumeric(dele: DELELevel): ProficiencyLevel
numericToDELE(level: ProficiencyLevel): DELELevel

type DELELevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
```

### DELF/DALF (French)

```typescript
delfDalfToNumeric(level: FrenchDiplomaLevel): ProficiencyLevel
numericToDELFDALF(level: ProficiencyLevel): FrenchDiplomaLevel

type DELFLevel = "A1" | "A2" | "B1" | "B2"
type DALFLevel = "C1" | "C2"
type FrenchDiplomaLevel = DELFLevel | DALFLevel
```

### Goethe (German)

```typescript
goetheToNumeric(level: GoetheLevel): ProficiencyLevel
numericToGoethe(level: ProficiencyLevel): GoetheLevel

type GoetheLevel = "Start Deutsch 1" | "Start Deutsch 2" |
                   "Goethe-Zertifikat B1" | "Goethe-Zertifikat B2" |
                   "Goethe-Zertifikat C1" | "Goethe-Zertifikat C2"
```

## Constants

### LANGUAGE_DATA

Complete language database (ISO-639-3 indexed).

```typescript
const LANGUAGE_DATA: Record<string, LanguageEntry>

type LanguageEntry = {
  name: string;
  nativeName: string;
  iso1?: string;
}
```

### ISO639_1_TO_3 / ISO639_3_TO_1

Bidirectional mappings between ISO-639-1 and ISO-639-3.

```typescript
const ISO639_1_TO_3: Record<string, string>  // "en" → "eng"
const ISO639_3_TO_1: Record<string, string>  // "eng" → "en"
```

### DEFAULT_REGIONS

Default regions for languages.

```typescript
const DEFAULT_REGIONS: Record<string, string>
// { en: "US", eng: "US", th: "TH", tha: "TH", ... }
```

### SPECIAL_CODES

Non-language special codes.

```typescript
const SPECIAL_CODES = ["ipa", "und", "mul", "zxx"] as const
```

### Level Arrays

```typescript
const CEFR_LEVELS = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"] as const
const ILR_LEVELS = ["0", "0+", "1", "1+", "2", "2+", "3", "3+", "4", "4+", "5"] as const
const ACTFL_LEVELS = ["Novice Low", ..., "Distinguished"] as const
const HSK_LEVELS = ["HSK 1", ..., "HSK 6"] as const
const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const
const TOPIK_LEVELS = ["TOPIK I-1", ..., "TOPIK II-6"] as const
const CAMBRIDGE_LEVELS = ["KET", "PET", "FCE", "CAE", "CPE"] as const
const DELE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const
const DELF_LEVELS = ["A1", "A2", "B1", "B2"] as const
const DALF_LEVELS = ["C1", "C2"] as const
const GOETHE_LEVELS = ["Start Deutsch 1", ..., "Goethe-Zertifikat C2"] as const
```

## Zod Schemas

### languageCodeSchema

Validates common language codes.

```typescript
import { languageCodeSchema } from "glost-common";

languageCodeSchema.safeParse("en").success;   // true
languageCodeSchema.safeParse("eng").success;  // true
languageCodeSchema.safeParse("cmn").success;  // true
languageCodeSchema.safeParse("ipa").success;  // true
languageCodeSchema.safeParse("xyz").success;  // false
```
