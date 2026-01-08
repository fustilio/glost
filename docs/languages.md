# Language Codes

GLOST supports flexible language identification using multiple standard formats.

## Supported Formats

### ISO-639-1 (Two-letter codes)
The most common format with 184 language codes.
```typescript
"en"  // English
"th"  // Thai
"ja"  // Japanese
```

### ISO-639-3 (Three-letter codes)
More precise identification covering 7000+ languages.
```typescript
"eng"  // English
"tha"  // Thai
"cmn"  // Mandarin Chinese (distinct from "yue" Cantonese)
```

### BCP-47 (Full language tags)
Complete tags with script and region.
```typescript
"en-US"       // English (United States)
"zh-Hans-CN"  // Chinese (Simplified, China)
"sr-Latn-RS"  // Serbian (Latin script, Serbia)
```

## Usage

```typescript
import {
  // Conversion
  toISO639_3,
  toISO639_1,

  // Names
  getLanguageName,
  getNativeLanguageName,

  // Validation
  isValidLanguageCode,

  // BCP-47
  parseBCP47,
  buildBCP47,
  toBCP47WithRegion,

  // Info
  getLanguageInfo,
} from "glost-common";

// All formats accepted
toISO639_3("en");      // "eng"
toISO639_3("en-US");   // "eng"
toISO639_3("eng");     // "eng"

// Get language names
getLanguageName("th");     // "Thai"
getLanguageName("tha");    // "Thai"
getLanguageName("cmn");    // "Mandarin Chinese"

// Native names
getNativeLanguageName("ja");   // "日本語"
getNativeLanguageName("th");   // "ไทย"
getNativeLanguageName("ar");   // "العربية"

// Complete info
getLanguageInfo("th");
// {
//   code: "th",
//   iso3: "tha",
//   iso1: "th",
//   name: "Thai",
//   nativeName: "ไทย",
//   bcp47: "tha-TH"
// }

// BCP-47 parsing
parseBCP47("zh-Hans-CN");
// { language: "zh", script: "Hans", region: "CN" }

buildBCP47({ language: "sr", script: "Latn", region: "RS" });
// "sr-Latn-RS"
```

## Special Codes

| Code | Meaning |
|------|---------|
| `ipa` | International Phonetic Alphabet |
| `und` | Undetermined language |
| `mul` | Multiple languages |
| `zxx` | No linguistic content |

```typescript
import { isSpecialCode, SPECIAL_CODES } from "glost-common";

isSpecialCode("ipa");  // true
isSpecialCode("en");   // false
SPECIAL_CODES;         // ["ipa", "und", "mul", "zxx"]
```

## Complete Language List

### Major World Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `en` | `eng` | English | English |
| `es` | `spa` | Spanish | Español |
| `fr` | `fra` | French | Français |
| `de` | `deu` | German | Deutsch |
| `it` | `ita` | Italian | Italiano |
| `pt` | `por` | Portuguese | Português |
| `ru` | `rus` | Russian | Русский |
| `ar` | `ara` | Arabic | العربية |
| `hi` | `hin` | Hindi | हिन्दी |
| `bn` | `ben` | Bengali | বাংলা |
| `ja` | `jpn` | Japanese | 日本語 |
| `ko` | `kor` | Korean | 한국어 |
| `vi` | `vie` | Vietnamese | Tiếng Việt |
| `th` | `tha` | Thai | ไทย |
| `id` | `ind` | Indonesian | Bahasa Indonesia |
| `ms` | `msa` | Malay | Bahasa Melayu |
| `nl` | `nld` | Dutch | Nederlands |
| `pl` | `pol` | Polish | Polski |
| `tr` | `tur` | Turkish | Türkçe |
| `uk` | `ukr` | Ukrainian | Українська |

### Chinese Varieties

ISO-639-3 distinguishes Chinese varieties that ISO-639-1 cannot:

| ISO-639-3 | Language | Native Name |
|-----------|----------|-------------|
| `zho` | Chinese (generic) | 中文 |
| `cmn` | Mandarin Chinese | 普通话 |
| `yue` | Cantonese | 粵語 |
| `nan` | Min Nan Chinese | 閩南語 |
| `wuu` | Wu Chinese | 吴语 |
| `hak` | Hakka Chinese | 客家話 |
| `hsn` | Xiang Chinese | 湘语 |
| `gan` | Gan Chinese | 贛語 |
| `cdo` | Min Dong Chinese | 閩東語 |

### European Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `el` | `ell` | Greek | Ελληνικά |
| `cs` | `ces` | Czech | Čeština |
| `ro` | `ron` | Romanian | Română |
| `hu` | `hun` | Hungarian | Magyar |
| `fi` | `fin` | Finnish | Suomi |
| `sv` | `swe` | Swedish | Svenska |
| `da` | `dan` | Danish | Dansk |
| `no` | `nor` | Norwegian | Norsk |
| `bg` | `bul` | Bulgarian | Български |
| `hr` | `hrv` | Croatian | Hrvatski |
| `sk` | `slk` | Slovak | Slovenčina |
| `sl` | `slv` | Slovenian | Slovenščina |
| `sr` | `srp` | Serbian | Српски |
| `lt` | `lit` | Lithuanian | Lietuvių |
| `lv` | `lav` | Latvian | Latviešu |
| `et` | `est` | Estonian | Eesti |
| `is` | `isl` | Icelandic | Íslenska |
| `ga` | `gle` | Irish | Gaeilge |
| `cy` | `cym` | Welsh | Cymraeg |
| `ca` | `cat` | Catalan | Català |
| `eu` | `eus` | Basque | Euskara |
| `gl` | `glg` | Galician | Galego |

### South Asian Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `ta` | `tam` | Tamil | தமிழ் |
| `te` | `tel` | Telugu | తెలుగు |
| `ml` | `mal` | Malayalam | മലയാളം |
| `kn` | `kan` | Kannada | ಕನ್ನಡ |
| `mr` | `mar` | Marathi | मराठी |
| `gu` | `guj` | Gujarati | ગુજરાતી |
| `pa` | `pan` | Punjabi | ਪੰਜਾਬੀ |
| `ur` | `urd` | Urdu | اردو |
| `si` | `sin` | Sinhala | සිංහල |
| `ne` | `nep` | Nepali | नेपाली |

### Southeast Asian Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `km` | `khm` | Khmer | ខ្មែរ |
| `lo` | `lao` | Lao | ພາສາລາວ |
| `my` | `mya` | Burmese | ဗမာစာ |
| `tl` | `tgl` | Tagalog | Tagalog |
| `jv` | `jav` | Javanese | Basa Jawa |
| `su` | `sun` | Sundanese | Basa Sunda |

### Middle Eastern Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `he` | `heb` | Hebrew | עברית |
| `fa` | `fas` | Persian | فارسی |
| `ku` | `kur` | Kurdish | Kurdî |
| `ps` | `pus` | Pashto | پښتو |

### African Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `sw` | `swa` | Swahili | Kiswahili |
| `ha` | `hau` | Hausa | Hausa |
| `yo` | `yor` | Yoruba | Yorùbá |
| `ig` | `ibo` | Igbo | Igbo |
| `am` | `amh` | Amharic | አማርኛ |
| `zu` | `zul` | Zulu | isiZulu |
| `xh` | `xho` | Xhosa | isiXhosa |
| `af` | `afr` | Afrikaans | Afrikaans |

### Other Languages

| ISO-639-1 | ISO-639-3 | Language | Native Name |
|-----------|-----------|----------|-------------|
| `ka` | `kat` | Georgian | ქართული |
| `hy` | `hye` | Armenian | Հայdelays |
| `az` | `aze` | Azerbaijani | Azərbaycan |
| `kk` | `kaz` | Kazakh | Қазақ |
| `uz` | `uzb` | Uzbek | Oʻzbek |
| `mn` | `mon` | Mongolian | Монгол |
| `eo` | `epo` | Esperanto | Esperanto |
| `la` | `lat` | Latin | Latina |
| `sa` | `san` | Sanskrit | संस्कृतम् |

## Default Regions

When converting to BCP-47 with `toBCP47WithRegion()`, these defaults are used:

| Language | Default Region |
|----------|----------------|
| English (`en`/`eng`) | US |
| Spanish (`es`/`spa`) | ES |
| French (`fr`/`fra`) | FR |
| German (`de`/`deu`) | DE |
| Portuguese (`pt`/`por`) | PT |
| Chinese (`zh`/`zho`) | CN |
| Mandarin (`cmn`) | CN |
| Cantonese (`yue`) | HK |
| Japanese (`ja`/`jpn`) | JP |
| Korean (`ko`/`kor`) | KR |
| Thai (`th`/`tha`) | TH |

## Type Definitions

```typescript
// Any language code string
type LanguageCode = string;

// Validated language codes (Zod schema)
type GlostLanguage = "en" | "es" | "fr" | ... | "cmn" | "yue" | "ipa" | "und" | "mul" | "zxx";

// BCP-47 components
type BCP47Components = {
  language: string;   // ISO-639 code
  script?: string;    // ISO-15924 script (e.g., "Hans", "Latn")
  region?: string;    // ISO-3166-1 region (e.g., "US", "CN")
};

// Language entry in database
type LanguageEntry = {
  name: string;       // English name
  nativeName: string; // Name in the language itself
  iso1?: string;      // ISO-639-1 code if exists
};
```

## Validation

```typescript
import { languageCodeSchema, isValidLanguageCode } from "glost-common";

// Runtime validation
isValidLanguageCode("en");     // true
isValidLanguageCode("xyz");    // false

// Zod schema validation
languageCodeSchema.safeParse("en").success;   // true
languageCodeSchema.safeParse("xyz").success;  // false
```
