/**
 * Language Proficiency Level System
 *
 * Maps various proficiency standards to a unified numeric scale (0-6) based on CEFR:
 * - 0 = Pre-A1 (absolute beginner)
 * - 1 = A1 (beginner)
 * - 2 = A2 (elementary)
 * - 3 = B1 (intermediate)
 * - 4 = B2 (upper intermediate)
 * - 5 = C1 (advanced)
 * - 6 = C2 (mastery/native-like)
 *
 * Decimals indicate approximate positions between levels (e.g., 1.5 = between A1 and A2)
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Numeric proficiency level (0-6 scale)
 * Decimals allowed for fine-grained positioning
 */
export type ProficiencyLevel = number;

/**
 * CEFR level labels
 */
export const CEFR_LEVELS = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CEFRLevel = (typeof CEFR_LEVELS)[number];

/**
 * Proficiency standard identifiers
 */
export type ProficiencyStandard =
  | "cefr"      // Common European Framework (A1-C2)
  | "ilr"       // Interagency Language Roundtable (0-5)
  | "actfl"     // American Council on Teaching Foreign Languages
  | "hsk"       // Chinese (HSK 1-6)
  | "jlpt"      // Japanese (N5-N1)
  | "topik"     // Korean (1-6)
  | "dele"      // Spanish (A1-C2)
  | "delf"      // French DELF (A1-B2)
  | "dalf"      // French DALF (C1-C2)
  | "goethe"    // German (A1-C2)
  | "toefl"     // English TOEFL (score-based)
  | "ielts"     // English IELTS (band 1-9)
  | "cambridge" // Cambridge English (KET-CPE)
  | "numeric";  // Direct 0-6 scale

// ============================================================================
// CEFR Mappings (Base Reference)
// ============================================================================

/**
 * CEFR level to numeric mapping
 */
export const CEFR_TO_NUMERIC: Record<CEFRLevel, ProficiencyLevel> = {
  "Pre-A1": 0,
  "A1": 1,
  "A2": 2,
  "B1": 3,
  "B2": 4,
  "C1": 5,
  "C2": 6,
};

/**
 * Convert numeric level to CEFR (rounds to nearest)
 */
export function numericToCEFR(level: ProficiencyLevel): CEFRLevel {
  const rounded = Math.round(Math.max(0, Math.min(6, level)));
  return CEFR_LEVELS[rounded];
}

/**
 * Convert CEFR to numeric
 */
export function cefrToNumeric(cefr: CEFRLevel): ProficiencyLevel {
  return CEFR_TO_NUMERIC[cefr];
}

// ============================================================================
// ILR (Interagency Language Roundtable) - US Government Standard
// ============================================================================

export const ILR_LEVELS = ["0", "0+", "1", "1+", "2", "2+", "3", "3+", "4", "4+", "5"] as const;
export type ILRLevel = (typeof ILR_LEVELS)[number];

const ILR_TO_NUMERIC: Record<ILRLevel, ProficiencyLevel> = {
  "0": 0,      // No proficiency
  "0+": 0.5,   // Memorized proficiency
  "1": 1,      // Elementary
  "1+": 1.5,   // Elementary+
  "2": 2.5,    // Limited working
  "2+": 3.5,   // Limited working+
  "3": 4,      // General professional
  "3+": 4.5,   // General professional+
  "4": 5,      // Advanced professional
  "4+": 5.5,   // Advanced professional+
  "5": 6,      // Native/bilingual
};

export function ilrToNumeric(ilr: ILRLevel): ProficiencyLevel {
  return ILR_TO_NUMERIC[ilr];
}

export function numericToILR(level: ProficiencyLevel): ILRLevel {
  // Find closest ILR level
  let closest: ILRLevel = "0";
  let minDiff = Infinity;
  for (const [ilr, numeric] of Object.entries(ILR_TO_NUMERIC)) {
    const diff = Math.abs(numeric - level);
    if (diff < minDiff) {
      minDiff = diff;
      closest = ilr as ILRLevel;
    }
  }
  return closest;
}

// ============================================================================
// ACTFL (American Council on Teaching Foreign Languages)
// ============================================================================

export const ACTFL_LEVELS = [
  "Novice Low", "Novice Mid", "Novice High",
  "Intermediate Low", "Intermediate Mid", "Intermediate High",
  "Advanced Low", "Advanced Mid", "Advanced High",
  "Superior",
  "Distinguished",
] as const;
export type ACTFLLevel = (typeof ACTFL_LEVELS)[number];

const ACTFL_TO_NUMERIC: Record<ACTFLLevel, ProficiencyLevel> = {
  "Novice Low": 0,
  "Novice Mid": 0.5,
  "Novice High": 1,
  "Intermediate Low": 1.5,
  "Intermediate Mid": 2,
  "Intermediate High": 2.5,
  "Advanced Low": 3,
  "Advanced Mid": 3.5,
  "Advanced High": 4,
  "Superior": 5,
  "Distinguished": 6,
};

export function actflToNumeric(actfl: ACTFLLevel): ProficiencyLevel {
  return ACTFL_TO_NUMERIC[actfl];
}

export function numericToACTFL(level: ProficiencyLevel): ACTFLLevel {
  let closest: ACTFLLevel = "Novice Low";
  let minDiff = Infinity;
  for (const [actfl, numeric] of Object.entries(ACTFL_TO_NUMERIC)) {
    const diff = Math.abs(numeric - level);
    if (diff < minDiff) {
      minDiff = diff;
      closest = actfl as ACTFLLevel;
    }
  }
  return closest;
}

// ============================================================================
// HSK (Chinese - Hanyu Shuiping Kaoshi)
// ============================================================================

export const HSK_LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"] as const;
export type HSKLevel = (typeof HSK_LEVELS)[number];

// HSK 2.0 mapping to CEFR (official alignment)
const HSK_TO_NUMERIC: Record<HSKLevel, ProficiencyLevel> = {
  "HSK 1": 1,    // A1
  "HSK 2": 2,    // A2
  "HSK 3": 3,    // B1
  "HSK 4": 4,    // B2
  "HSK 5": 5,    // C1
  "HSK 6": 6,    // C2
};

export function hskToNumeric(hsk: HSKLevel): ProficiencyLevel {
  return HSK_TO_NUMERIC[hsk];
}

export function numericToHSK(level: ProficiencyLevel): HSKLevel {
  const rounded = Math.round(Math.max(1, Math.min(6, level)));
  return `HSK ${rounded}` as HSKLevel;
}

// ============================================================================
// JLPT (Japanese Language Proficiency Test)
// ============================================================================

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;
export type JLPTLevel = (typeof JLPT_LEVELS)[number];

// JLPT mapping (N5=easiest, N1=hardest)
const JLPT_TO_NUMERIC: Record<JLPTLevel, ProficiencyLevel> = {
  "N5": 1,    // A1-A2 (beginner)
  "N4": 2,    // A2-B1 (elementary)
  "N3": 3,    // B1 (intermediate)
  "N2": 4,    // B2 (upper intermediate)
  "N1": 5.5,  // C1-C2 (advanced)
};

export function jlptToNumeric(jlpt: JLPTLevel): ProficiencyLevel {
  return JLPT_TO_NUMERIC[jlpt];
}

export function numericToJLPT(level: ProficiencyLevel): JLPTLevel {
  if (level <= 1.5) return "N5";
  if (level <= 2.5) return "N4";
  if (level <= 3.5) return "N3";
  if (level <= 4.5) return "N2";
  return "N1";
}

// ============================================================================
// TOPIK (Test of Proficiency in Korean)
// ============================================================================

export const TOPIK_LEVELS = [
  "TOPIK I-1", "TOPIK I-2",
  "TOPIK II-3", "TOPIK II-4", "TOPIK II-5", "TOPIK II-6",
] as const;
export type TOPIKLevel = (typeof TOPIK_LEVELS)[number];

const TOPIK_TO_NUMERIC: Record<TOPIKLevel, ProficiencyLevel> = {
  "TOPIK I-1": 1,    // A1
  "TOPIK I-2": 2,    // A2
  "TOPIK II-3": 3,   // B1
  "TOPIK II-4": 4,   // B2
  "TOPIK II-5": 5,   // C1
  "TOPIK II-6": 6,   // C2
};

export function topikToNumeric(topik: TOPIKLevel): ProficiencyLevel {
  return TOPIK_TO_NUMERIC[topik];
}

export function numericToTOPIK(level: ProficiencyLevel): TOPIKLevel {
  if (level <= 1.5) return "TOPIK I-1";
  if (level <= 2.5) return "TOPIK I-2";
  if (level <= 3.5) return "TOPIK II-3";
  if (level <= 4.5) return "TOPIK II-4";
  if (level <= 5.5) return "TOPIK II-5";
  return "TOPIK II-6";
}

// ============================================================================
// IELTS (International English Language Testing System)
// ============================================================================

export type IELTSBand = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9;

// IELTS band to CEFR mapping (official)
export function ieltsToNumeric(band: IELTSBand): ProficiencyLevel {
  if (band <= 3.5) return 0;      // Pre-A1
  if (band <= 4) return 1;        // A1
  if (band <= 5) return 2;        // A2
  if (band <= 5.5) return 3;      // B1
  if (band <= 6.5) return 4;      // B2
  if (band <= 8) return 5;        // C1
  return 6;                        // C2
}

export function numericToIELTS(level: ProficiencyLevel): IELTSBand {
  if (level <= 0.5) return 3.5;
  if (level <= 1.5) return 4;
  if (level <= 2.5) return 5;
  if (level <= 3.5) return 5.5;
  if (level <= 4.5) return 6.5;
  if (level <= 5.5) return 8;
  return 9;
}

// ============================================================================
// TOEFL (Test of English as a Foreign Language) iBT
// ============================================================================

export type TOEFLScore = number; // 0-120

export function toeflToNumeric(score: TOEFLScore): ProficiencyLevel {
  if (score < 32) return 0;       // Pre-A1
  if (score < 42) return 1;       // A1
  if (score < 72) return 2;       // A2
  if (score < 87) return 3;       // B1
  if (score < 110) return 4;      // B2
  if (score < 115) return 5;      // C1
  return 6;                        // C2
}

export function numericToTOEFL(level: ProficiencyLevel): TOEFLScore {
  if (level <= 0.5) return 31;
  if (level <= 1.5) return 41;
  if (level <= 2.5) return 71;
  if (level <= 3.5) return 86;
  if (level <= 4.5) return 109;
  if (level <= 5.5) return 114;
  return 120;
}

// ============================================================================
// Cambridge English
// ============================================================================

export const CAMBRIDGE_LEVELS = [
  "KET", "PET", "FCE", "CAE", "CPE",
] as const;
export type CambridgeLevel = (typeof CAMBRIDGE_LEVELS)[number];

const CAMBRIDGE_TO_NUMERIC: Record<CambridgeLevel, ProficiencyLevel> = {
  "KET": 2,    // Key - A2
  "PET": 3,    // Preliminary - B1
  "FCE": 4,    // First - B2
  "CAE": 5,    // Advanced - C1
  "CPE": 6,    // Proficiency - C2
};

export function cambridgeToNumeric(level: CambridgeLevel): ProficiencyLevel {
  return CAMBRIDGE_TO_NUMERIC[level];
}

export function numericToCambridge(level: ProficiencyLevel): CambridgeLevel {
  if (level <= 2.5) return "KET";
  if (level <= 3.5) return "PET";
  if (level <= 4.5) return "FCE";
  if (level <= 5.5) return "CAE";
  return "CPE";
}

// ============================================================================
// DELE (Spanish - Diplomas de Español como Lengua Extranjera)
// ============================================================================

export const DELE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type DELELevel = (typeof DELE_LEVELS)[number];

// DELE aligns directly with CEFR
export function deleToNumeric(dele: DELELevel): ProficiencyLevel {
  return CEFR_TO_NUMERIC[dele];
}

export function numericToDELE(level: ProficiencyLevel): DELELevel {
  return numericToCEFR(level) === "Pre-A1" ? "A1" : numericToCEFR(level) as DELELevel;
}

// ============================================================================
// DELF/DALF (French)
// ============================================================================

export const DELF_LEVELS = ["A1", "A2", "B1", "B2"] as const;
export const DALF_LEVELS = ["C1", "C2"] as const;
export type DELFLevel = (typeof DELF_LEVELS)[number];
export type DALFLevel = (typeof DALF_LEVELS)[number];
export type FrenchDiplomaLevel = DELFLevel | DALFLevel;

export function delfDalfToNumeric(level: FrenchDiplomaLevel): ProficiencyLevel {
  return CEFR_TO_NUMERIC[level];
}

export function numericToDELFDALF(level: ProficiencyLevel): FrenchDiplomaLevel {
  const cefr = numericToCEFR(level);
  if (cefr === "Pre-A1") return "A1";
  return cefr as FrenchDiplomaLevel;
}

// ============================================================================
// Goethe (German - Goethe-Institut)
// ============================================================================

export const GOETHE_LEVELS = [
  "Start Deutsch 1", "Start Deutsch 2",
  "Goethe-Zertifikat B1", "Goethe-Zertifikat B2",
  "Goethe-Zertifikat C1", "Goethe-Zertifikat C2",
] as const;
export type GoetheLevel = (typeof GOETHE_LEVELS)[number];

const GOETHE_TO_NUMERIC: Record<GoetheLevel, ProficiencyLevel> = {
  "Start Deutsch 1": 1,           // A1
  "Start Deutsch 2": 2,           // A2
  "Goethe-Zertifikat B1": 3,      // B1
  "Goethe-Zertifikat B2": 4,      // B2
  "Goethe-Zertifikat C1": 5,      // C1
  "Goethe-Zertifikat C2": 6,      // C2
};

export function goetheToNumeric(level: GoetheLevel): ProficiencyLevel {
  return GOETHE_TO_NUMERIC[level];
}

export function numericToGoethe(level: ProficiencyLevel): GoetheLevel {
  if (level <= 1.5) return "Start Deutsch 1";
  if (level <= 2.5) return "Start Deutsch 2";
  if (level <= 3.5) return "Goethe-Zertifikat B1";
  if (level <= 4.5) return "Goethe-Zertifikat B2";
  if (level <= 5.5) return "Goethe-Zertifikat C1";
  return "Goethe-Zertifikat C2";
}

// ============================================================================
// Universal Conversion
// ============================================================================

/**
 * Convert any proficiency level to numeric 0-6 scale
 */
export function toNumericLevel(
  value: string | number,
  standard: ProficiencyStandard = "numeric"
): ProficiencyLevel {
  if (standard === "numeric") {
    return typeof value === "number" ? value : parseFloat(value);
  }

  if (standard === "cefr") {
    return cefrToNumeric(value as CEFRLevel);
  }

  if (standard === "ilr") {
    return ilrToNumeric(value as ILRLevel);
  }

  if (standard === "actfl") {
    return actflToNumeric(value as ACTFLLevel);
  }

  if (standard === "hsk") {
    return hskToNumeric(value as HSKLevel);
  }

  if (standard === "jlpt") {
    return jlptToNumeric(value as JLPTLevel);
  }

  if (standard === "topik") {
    return topikToNumeric(value as TOPIKLevel);
  }

  if (standard === "ielts") {
    return ieltsToNumeric(value as IELTSBand);
  }

  if (standard === "toefl") {
    return toeflToNumeric(typeof value === "number" ? value : parseInt(value));
  }

  if (standard === "cambridge") {
    return cambridgeToNumeric(value as CambridgeLevel);
  }

  if (standard === "dele") {
    return deleToNumeric(value as DELELevel);
  }

  if (standard === "delf" || standard === "dalf") {
    return delfDalfToNumeric(value as FrenchDiplomaLevel);
  }

  if (standard === "goethe") {
    return goetheToNumeric(value as GoetheLevel);
  }

  return typeof value === "number" ? value : 0;
}

/**
 * Convert numeric level to a specific standard
 */
export function fromNumericLevel(
  level: ProficiencyLevel,
  standard: ProficiencyStandard
): string | number {
  switch (standard) {
    case "numeric":
      return level;
    case "cefr":
      return numericToCEFR(level);
    case "ilr":
      return numericToILR(level);
    case "actfl":
      return numericToACTFL(level);
    case "hsk":
      return numericToHSK(level);
    case "jlpt":
      return numericToJLPT(level);
    case "topik":
      return numericToTOPIK(level);
    case "ielts":
      return numericToIELTS(level);
    case "toefl":
      return numericToTOEFL(level);
    case "cambridge":
      return numericToCambridge(level);
    case "dele":
      return numericToDELE(level);
    case "delf":
    case "dalf":
      return numericToDELFDALF(level);
    case "goethe":
      return numericToGoethe(level);
    default:
      return level;
  }
}

// ============================================================================
// Proficiency Info
// ============================================================================

export interface ProficiencyInfo {
  numeric: ProficiencyLevel;
  cefr: CEFRLevel;
  description: string;
  canDo: string[];
}

const LEVEL_DESCRIPTIONS: Record<number, { description: string; canDo: string[] }> = {
  0: {
    description: "Pre-A1 - Absolute Beginner",
    canDo: [
      "Recognize isolated words and very basic phrases",
      "Copy familiar words or short phrases",
    ],
  },
  1: {
    description: "A1 - Beginner",
    canDo: [
      "Understand and use familiar everyday expressions",
      "Introduce yourself and others",
      "Ask and answer simple questions about personal details",
    ],
  },
  2: {
    description: "A2 - Elementary",
    canDo: [
      "Communicate in simple, routine tasks",
      "Describe aspects of your background and immediate environment",
      "Handle simple social exchanges",
    ],
  },
  3: {
    description: "B1 - Intermediate",
    canDo: [
      "Deal with most situations while traveling",
      "Produce simple connected text on familiar topics",
      "Describe experiences, events, dreams, and ambitions",
    ],
  },
  4: {
    description: "B2 - Upper Intermediate",
    canDo: [
      "Understand complex texts on concrete and abstract topics",
      "Interact with native speakers with fluency and spontaneity",
      "Produce clear, detailed text on a wide range of subjects",
    ],
  },
  5: {
    description: "C1 - Advanced",
    canDo: [
      "Understand demanding, longer texts and implicit meaning",
      "Express ideas fluently and spontaneously",
      "Use language flexibly for social, academic, and professional purposes",
    ],
  },
  6: {
    description: "C2 - Mastery",
    canDo: [
      "Understand virtually everything heard or read",
      "Summarize information from different sources coherently",
      "Express yourself spontaneously, fluently, and precisely",
    ],
  },
};

/**
 * Get detailed proficiency information
 */
export function getProficiencyInfo(level: ProficiencyLevel): ProficiencyInfo {
  const rounded = Math.round(Math.max(0, Math.min(6, level)));
  const info = LEVEL_DESCRIPTIONS[rounded];

  return {
    numeric: level,
    cefr: numericToCEFR(level),
    description: info.description,
    canDo: info.canDo,
  };
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if level meets or exceeds a threshold
 */
export function meetsLevel(current: ProficiencyLevel, required: ProficiencyLevel): boolean {
  return current >= required;
}

/**
 * Calculate progress between two levels as percentage
 */
export function levelProgress(
  current: ProficiencyLevel,
  from: ProficiencyLevel,
  to: ProficiencyLevel
): number {
  if (to === from) return current >= to ? 100 : 0;
  const progress = ((current - from) / (to - from)) * 100;
  return Math.max(0, Math.min(100, progress));
}

/**
 * Get levels between two proficiency levels
 */
export function levelsBetween(from: ProficiencyLevel, to: ProficiencyLevel): CEFRLevel[] {
  const start = Math.ceil(Math.max(0, from));
  const end = Math.floor(Math.min(6, to));
  return CEFR_LEVELS.slice(start, end + 1) as CEFRLevel[];
}
