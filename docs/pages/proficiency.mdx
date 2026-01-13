# Proficiency Levels

GLOST uses a unified numeric scale (0-6) based on CEFR that maps to various proficiency standards worldwide.

## The 0-6 Scale

| Numeric | CEFR | Description | Can-Do Summary |
|---------|------|-------------|----------------|
| **0** | Pre-A1 | Absolute beginner | Recognize isolated words |
| **1** | A1 | Beginner | Basic phrases, simple questions |
| **2** | A2 | Elementary | Routine tasks, simple exchanges |
| **3** | B1 | Intermediate | Travel situations, connected text |
| **4** | B2 | Upper intermediate | Complex texts, fluent interaction |
| **5** | C1 | Advanced | Demanding texts, flexible expression |
| **6** | C2 | Mastery | Native-like fluency and precision |

**Decimals** indicate positions between levels (e.g., 2.5 = between A2 and B1).

## Basic Usage

```typescript
import {
  // CEFR conversions
  cefrToNumeric,
  numericToCEFR,

  // Universal conversion
  toNumericLevel,
  fromNumericLevel,

  // Info
  getProficiencyInfo,

  // Utilities
  meetsLevel,
  levelProgress,
} from "glost-common";

// CEFR ↔ Numeric
cefrToNumeric("B1");     // 3
numericToCEFR(3);        // "B1"
numericToCEFR(2.7);      // "B1" (rounds)

// Universal conversion
toNumericLevel("HSK 4", "hsk");   // 4
toNumericLevel("N3", "jlpt");     // 3
toNumericLevel("B2", "cefr");     // 4

fromNumericLevel(4, "hsk");       // "HSK 4"
fromNumericLevel(4, "jlpt");      // "N2"
fromNumericLevel(4, "cefr");      // "B2"

// Proficiency info
getProficiencyInfo(3);
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

// Utilities
meetsLevel(3, 2);           // true (level 3 meets requirement of 2)
levelProgress(2.5, 2, 3);   // 50 (50% progress from A2 to B1)
```

## Supported Standards

### CEFR (Common European Framework)

The base reference for all conversions.

| Level | Numeric | Description |
|-------|---------|-------------|
| Pre-A1 | 0 | Absolute beginner |
| A1 | 1 | Breakthrough |
| A2 | 2 | Waystage |
| B1 | 3 | Threshold |
| B2 | 4 | Vantage |
| C1 | 5 | Effective operational |
| C2 | 6 | Mastery |

```typescript
import { CEFR_LEVELS, cefrToNumeric, numericToCEFR } from "glost-common";

CEFR_LEVELS;  // ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]
```

### ILR (Interagency Language Roundtable)

US Government standard.

| Level | Numeric | Description |
|-------|---------|-------------|
| 0 | 0 | No proficiency |
| 0+ | 0.5 | Memorized proficiency |
| 1 | 1 | Elementary |
| 1+ | 1.5 | Elementary+ |
| 2 | 2.5 | Limited working |
| 2+ | 3.5 | Limited working+ |
| 3 | 4 | General professional |
| 3+ | 4.5 | General professional+ |
| 4 | 5 | Advanced professional |
| 4+ | 5.5 | Advanced professional+ |
| 5 | 6 | Native/bilingual |

```typescript
import { ILR_LEVELS, ilrToNumeric, numericToILR } from "glost-common";

ilrToNumeric("3");   // 4
numericToILR(4);     // "3"
```

### ACTFL (American Council on Teaching Foreign Languages)

| Level | Numeric |
|-------|---------|
| Novice Low | 0 |
| Novice Mid | 0.5 |
| Novice High | 1 |
| Intermediate Low | 1.5 |
| Intermediate Mid | 2 |
| Intermediate High | 2.5 |
| Advanced Low | 3 |
| Advanced Mid | 3.5 |
| Advanced High | 4 |
| Superior | 5 |
| Distinguished | 6 |

```typescript
import { ACTFL_LEVELS, actflToNumeric, numericToACTFL } from "glost-common";

actflToNumeric("Advanced Low");  // 3
numericToACTFL(3);               // "Advanced Low"
```

### HSK (Chinese - Hanyu Shuiping Kaoshi)

| Level | Numeric | CEFR Equivalent |
|-------|---------|-----------------|
| HSK 1 | 1 | A1 |
| HSK 2 | 2 | A2 |
| HSK 3 | 3 | B1 |
| HSK 4 | 4 | B2 |
| HSK 5 | 5 | C1 |
| HSK 6 | 6 | C2 |

```typescript
import { HSK_LEVELS, hskToNumeric, numericToHSK } from "glost-common";

hskToNumeric("HSK 4");  // 4
numericToHSK(4);        // "HSK 4"
```

### JLPT (Japanese Language Proficiency Test)

Note: N5 is easiest, N1 is hardest.

| Level | Numeric | CEFR Equivalent |
|-------|---------|-----------------|
| N5 | 1 | A1-A2 |
| N4 | 2 | A2-B1 |
| N3 | 3 | B1 |
| N2 | 4 | B2 |
| N1 | 5.5 | C1-C2 |

```typescript
import { JLPT_LEVELS, jlptToNumeric, numericToJLPT } from "glost-common";

jlptToNumeric("N3");  // 3
numericToJLPT(3);     // "N3"
```

### TOPIK (Test of Proficiency in Korean)

| Level | Numeric | CEFR Equivalent |
|-------|---------|-----------------|
| TOPIK I-1 | 1 | A1 |
| TOPIK I-2 | 2 | A2 |
| TOPIK II-3 | 3 | B1 |
| TOPIK II-4 | 4 | B2 |
| TOPIK II-5 | 5 | C1 |
| TOPIK II-6 | 6 | C2 |

```typescript
import { TOPIK_LEVELS, topikToNumeric, numericToTOPIK } from "glost-common";

topikToNumeric("TOPIK II-4");  // 4
numericToTOPIK(4);             // "TOPIK II-4"
```

### IELTS (International English Language Testing System)

| Band | Numeric | CEFR |
|------|---------|------|
| 1-3.5 | 0 | Pre-A1 |
| 4 | 1 | A1 |
| 4.5-5 | 2 | A2 |
| 5.5 | 3 | B1 |
| 6-6.5 | 4 | B2 |
| 7-8 | 5 | C1 |
| 8.5-9 | 6 | C2 |

```typescript
import { ieltsToNumeric, numericToIELTS } from "glost-common";

ieltsToNumeric(6.5);  // 4
numericToIELTS(4);    // 6.5
```

### TOEFL iBT (Test of English as a Foreign Language)

| Score | Numeric | CEFR |
|-------|---------|------|
| 0-31 | 0 | Pre-A1 |
| 32-41 | 1 | A1 |
| 42-71 | 2 | A2 |
| 72-86 | 3 | B1 |
| 87-109 | 4 | B2 |
| 110-114 | 5 | C1 |
| 115-120 | 6 | C2 |

```typescript
import { toeflToNumeric, numericToTOEFL } from "glost-common";

toeflToNumeric(95);   // 4
numericToTOEFL(4);    // 109
```

### Cambridge English

| Exam | Numeric | CEFR |
|------|---------|------|
| KET | 2 | A2 |
| PET | 3 | B1 |
| FCE | 4 | B2 |
| CAE | 5 | C1 |
| CPE | 6 | C2 |

```typescript
import { CAMBRIDGE_LEVELS, cambridgeToNumeric, numericToCambridge } from "glost-common";

cambridgeToNumeric("FCE");  // 4
numericToCambridge(4);      // "FCE"
```

### DELE (Spanish)

DELE aligns directly with CEFR (A1-C2).

```typescript
import { DELE_LEVELS, deleToNumeric, numericToDELE } from "glost-common";

deleToNumeric("B2");  // 4
numericToDELE(4);     // "B2"
```

### DELF/DALF (French)

- **DELF**: A1, A2, B1, B2
- **DALF**: C1, C2

```typescript
import { DELF_LEVELS, DALF_LEVELS, delfDalfToNumeric, numericToDELFDALF } from "glost-common";

delfDalfToNumeric("B2");  // 4
numericToDELFDALF(5);     // "C1"
```

### Goethe-Institut (German)

| Certificate | Numeric | CEFR |
|-------------|---------|------|
| Start Deutsch 1 | 1 | A1 |
| Start Deutsch 2 | 2 | A2 |
| Goethe-Zertifikat B1 | 3 | B1 |
| Goethe-Zertifikat B2 | 4 | B2 |
| Goethe-Zertifikat C1 | 5 | C1 |
| Goethe-Zertifikat C2 | 6 | C2 |

```typescript
import { GOETHE_LEVELS, goetheToNumeric, numericToGoethe } from "glost-common";

goetheToNumeric("Goethe-Zertifikat B2");  // 4
numericToGoethe(4);                        // "Goethe-Zertifikat B2"
```

## Cross-Standard Conversion

Convert between any two standards through the numeric scale:

```typescript
import { hskToNumeric, numericToJLPT, numericToCEFR } from "glost-common";

// HSK 4 → JLPT equivalent
const level = hskToNumeric("HSK 4");  // 4
numericToJLPT(level);                  // "N2"
numericToCEFR(level);                  // "B2"

// Find equivalents across standards
const b2Level = 4;
console.log({
  cefr: numericToCEFR(b2Level),        // "B2"
  hsk: numericToHSK(b2Level),          // "HSK 4"
  jlpt: numericToJLPT(b2Level),        // "N2"
  topik: numericToTOPIK(b2Level),      // "TOPIK II-4"
  cambridge: numericToCambridge(b2Level), // "FCE"
  ielts: numericToIELTS(b2Level),      // 6.5
  toefl: numericToTOEFL(b2Level),      // 109
});
```

## Utility Functions

### meetsLevel

Check if a proficiency level meets a requirement:

```typescript
import { meetsLevel } from "glost-common";

meetsLevel(3, 2);    // true  (B1 meets A2 requirement)
meetsLevel(3, 3);    // true  (B1 meets B1 requirement)
meetsLevel(3, 4);    // false (B1 doesn't meet B2 requirement)
```

### levelProgress

Calculate progress between two levels:

```typescript
import { levelProgress } from "glost-common";

levelProgress(2.5, 2, 3);  // 50  (50% from A2 to B1)
levelProgress(2.0, 2, 3);  // 0   (at start)
levelProgress(3.0, 2, 3);  // 100 (at end)
levelProgress(1.5, 2, 3);  // 0   (clamped - below start)
```

### levelsBetween

Get CEFR levels between two numeric values:

```typescript
import { levelsBetween } from "glost-common";

levelsBetween(1, 3);    // ["A1", "A2", "B1"]
levelsBetween(0, 6);    // ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"]
levelsBetween(1.5, 3.5); // ["A2", "B1"]
```

### getProficiencyInfo

Get complete information about a level:

```typescript
import { getProficiencyInfo } from "glost-common";

const info = getProficiencyInfo(4);
// {
//   numeric: 4,
//   cefr: "B2",
//   description: "B2 - Upper Intermediate",
//   canDo: [
//     "Understand complex texts on concrete and abstract topics",
//     "Interact with native speakers with fluency and spontaneity",
//     "Produce clear, detailed text on a wide range of subjects"
//   ]
// }
```

## Type Definitions

```typescript
// Numeric level (0-6, decimals allowed)
type ProficiencyLevel = number;

// Standard identifiers
type ProficiencyStandard =
  | "cefr" | "ilr" | "actfl"
  | "hsk" | "jlpt" | "topik"
  | "dele" | "delf" | "dalf" | "goethe"
  | "toefl" | "ielts" | "cambridge"
  | "numeric";

// CEFR level type
type CEFRLevel = "Pre-A1" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

// Proficiency info object
interface ProficiencyInfo {
  numeric: ProficiencyLevel;
  cefr: CEFRLevel;
  description: string;
  canDo: string[];
}
```

## Can-Do Statements

Each level has associated "can-do" statements describing typical abilities:

| Level | Key Abilities |
|-------|---------------|
| **0 (Pre-A1)** | Recognize isolated words and very basic phrases |
| **1 (A1)** | Introduce yourself, ask simple questions, handle basic transactions |
| **2 (A2)** | Communicate in simple routine tasks, describe background |
| **3 (B1)** | Handle travel situations, produce simple text, describe experiences |
| **4 (B2)** | Understand complex texts, interact fluently, produce detailed text |
| **5 (C1)** | Understand demanding texts, express fluently, use language flexibly |
| **6 (C2)** | Understand virtually everything, express with precision and nuance |
