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
/**
 * CEFR level labels
 */
export const CEFR_LEVELS = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];
// ============================================================================
// CEFR Mappings (Base Reference)
// ============================================================================
/**
 * CEFR level to numeric mapping
 */
export const CEFR_TO_NUMERIC = {
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
export function numericToCEFR(level) {
    const rounded = Math.round(Math.max(0, Math.min(6, level)));
    return CEFR_LEVELS[rounded];
}
/**
 * Convert CEFR to numeric
 */
export function cefrToNumeric(cefr) {
    return CEFR_TO_NUMERIC[cefr];
}
// ============================================================================
// ILR (Interagency Language Roundtable) - US Government Standard
// ============================================================================
export const ILR_LEVELS = ["0", "0+", "1", "1+", "2", "2+", "3", "3+", "4", "4+", "5"];
const ILR_TO_NUMERIC = {
    "0": 0, // No proficiency
    "0+": 0.5, // Memorized proficiency
    "1": 1, // Elementary
    "1+": 1.5, // Elementary+
    "2": 2.5, // Limited working
    "2+": 3.5, // Limited working+
    "3": 4, // General professional
    "3+": 4.5, // General professional+
    "4": 5, // Advanced professional
    "4+": 5.5, // Advanced professional+
    "5": 6, // Native/bilingual
};
export function ilrToNumeric(ilr) {
    return ILR_TO_NUMERIC[ilr];
}
export function numericToILR(level) {
    // Find closest ILR level
    let closest = "0";
    let minDiff = Infinity;
    for (const [ilr, numeric] of Object.entries(ILR_TO_NUMERIC)) {
        const diff = Math.abs(numeric - level);
        if (diff < minDiff) {
            minDiff = diff;
            closest = ilr;
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
];
const ACTFL_TO_NUMERIC = {
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
export function actflToNumeric(actfl) {
    return ACTFL_TO_NUMERIC[actfl];
}
export function numericToACTFL(level) {
    let closest = "Novice Low";
    let minDiff = Infinity;
    for (const [actfl, numeric] of Object.entries(ACTFL_TO_NUMERIC)) {
        const diff = Math.abs(numeric - level);
        if (diff < minDiff) {
            minDiff = diff;
            closest = actfl;
        }
    }
    return closest;
}
// ============================================================================
// HSK (Chinese - Hanyu Shuiping Kaoshi)
// ============================================================================
export const HSK_LEVELS = ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];
// HSK 2.0 mapping to CEFR (official alignment)
const HSK_TO_NUMERIC = {
    "HSK 1": 1, // A1
    "HSK 2": 2, // A2
    "HSK 3": 3, // B1
    "HSK 4": 4, // B2
    "HSK 5": 5, // C1
    "HSK 6": 6, // C2
};
export function hskToNumeric(hsk) {
    return HSK_TO_NUMERIC[hsk];
}
export function numericToHSK(level) {
    const rounded = Math.round(Math.max(1, Math.min(6, level)));
    return `HSK ${rounded}`;
}
// ============================================================================
// JLPT (Japanese Language Proficiency Test)
// ============================================================================
export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"];
// JLPT mapping (N5=easiest, N1=hardest)
const JLPT_TO_NUMERIC = {
    "N5": 1, // A1-A2 (beginner)
    "N4": 2, // A2-B1 (elementary)
    "N3": 3, // B1 (intermediate)
    "N2": 4, // B2 (upper intermediate)
    "N1": 5.5, // C1-C2 (advanced)
};
export function jlptToNumeric(jlpt) {
    return JLPT_TO_NUMERIC[jlpt];
}
export function numericToJLPT(level) {
    if (level <= 1.5)
        return "N5";
    if (level <= 2.5)
        return "N4";
    if (level <= 3.5)
        return "N3";
    if (level <= 4.5)
        return "N2";
    return "N1";
}
// ============================================================================
// TOPIK (Test of Proficiency in Korean)
// ============================================================================
export const TOPIK_LEVELS = [
    "TOPIK I-1", "TOPIK I-2",
    "TOPIK II-3", "TOPIK II-4", "TOPIK II-5", "TOPIK II-6",
];
const TOPIK_TO_NUMERIC = {
    "TOPIK I-1": 1, // A1
    "TOPIK I-2": 2, // A2
    "TOPIK II-3": 3, // B1
    "TOPIK II-4": 4, // B2
    "TOPIK II-5": 5, // C1
    "TOPIK II-6": 6, // C2
};
export function topikToNumeric(topik) {
    return TOPIK_TO_NUMERIC[topik];
}
export function numericToTOPIK(level) {
    if (level <= 1.5)
        return "TOPIK I-1";
    if (level <= 2.5)
        return "TOPIK I-2";
    if (level <= 3.5)
        return "TOPIK II-3";
    if (level <= 4.5)
        return "TOPIK II-4";
    if (level <= 5.5)
        return "TOPIK II-5";
    return "TOPIK II-6";
}
// IELTS band to CEFR mapping (official)
export function ieltsToNumeric(band) {
    if (band <= 3.5)
        return 0; // Pre-A1
    if (band <= 4)
        return 1; // A1
    if (band <= 5)
        return 2; // A2
    if (band <= 5.5)
        return 3; // B1
    if (band <= 6.5)
        return 4; // B2
    if (band <= 8)
        return 5; // C1
    return 6; // C2
}
export function numericToIELTS(level) {
    if (level <= 0.5)
        return 3.5;
    if (level <= 1.5)
        return 4;
    if (level <= 2.5)
        return 5;
    if (level <= 3.5)
        return 5.5;
    if (level <= 4.5)
        return 6.5;
    if (level <= 5.5)
        return 8;
    return 9;
}
export function toeflToNumeric(score) {
    if (score < 32)
        return 0; // Pre-A1
    if (score < 42)
        return 1; // A1
    if (score < 72)
        return 2; // A2
    if (score < 87)
        return 3; // B1
    if (score < 110)
        return 4; // B2
    if (score < 115)
        return 5; // C1
    return 6; // C2
}
export function numericToTOEFL(level) {
    if (level <= 0.5)
        return 31;
    if (level <= 1.5)
        return 41;
    if (level <= 2.5)
        return 71;
    if (level <= 3.5)
        return 86;
    if (level <= 4.5)
        return 109;
    if (level <= 5.5)
        return 114;
    return 120;
}
// ============================================================================
// Cambridge English
// ============================================================================
export const CAMBRIDGE_LEVELS = [
    "KET", "PET", "FCE", "CAE", "CPE",
];
const CAMBRIDGE_TO_NUMERIC = {
    "KET": 2, // Key - A2
    "PET": 3, // Preliminary - B1
    "FCE": 4, // First - B2
    "CAE": 5, // Advanced - C1
    "CPE": 6, // Proficiency - C2
};
export function cambridgeToNumeric(level) {
    return CAMBRIDGE_TO_NUMERIC[level];
}
export function numericToCambridge(level) {
    if (level <= 2.5)
        return "KET";
    if (level <= 3.5)
        return "PET";
    if (level <= 4.5)
        return "FCE";
    if (level <= 5.5)
        return "CAE";
    return "CPE";
}
// ============================================================================
// DELE (Spanish - Diplomas de Español como Lengua Extranjera)
// ============================================================================
export const DELE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
// DELE aligns directly with CEFR
export function deleToNumeric(dele) {
    return CEFR_TO_NUMERIC[dele];
}
export function numericToDELE(level) {
    return numericToCEFR(level) === "Pre-A1" ? "A1" : numericToCEFR(level);
}
// ============================================================================
// DELF/DALF (French)
// ============================================================================
export const DELF_LEVELS = ["A1", "A2", "B1", "B2"];
export const DALF_LEVELS = ["C1", "C2"];
export function delfDalfToNumeric(level) {
    return CEFR_TO_NUMERIC[level];
}
export function numericToDELFDALF(level) {
    const cefr = numericToCEFR(level);
    if (cefr === "Pre-A1")
        return "A1";
    return cefr;
}
// ============================================================================
// Goethe (German - Goethe-Institut)
// ============================================================================
export const GOETHE_LEVELS = [
    "Start Deutsch 1", "Start Deutsch 2",
    "Goethe-Zertifikat B1", "Goethe-Zertifikat B2",
    "Goethe-Zertifikat C1", "Goethe-Zertifikat C2",
];
const GOETHE_TO_NUMERIC = {
    "Start Deutsch 1": 1, // A1
    "Start Deutsch 2": 2, // A2
    "Goethe-Zertifikat B1": 3, // B1
    "Goethe-Zertifikat B2": 4, // B2
    "Goethe-Zertifikat C1": 5, // C1
    "Goethe-Zertifikat C2": 6, // C2
};
export function goetheToNumeric(level) {
    return GOETHE_TO_NUMERIC[level];
}
export function numericToGoethe(level) {
    if (level <= 1.5)
        return "Start Deutsch 1";
    if (level <= 2.5)
        return "Start Deutsch 2";
    if (level <= 3.5)
        return "Goethe-Zertifikat B1";
    if (level <= 4.5)
        return "Goethe-Zertifikat B2";
    if (level <= 5.5)
        return "Goethe-Zertifikat C1";
    return "Goethe-Zertifikat C2";
}
// ============================================================================
// Universal Conversion
// ============================================================================
/**
 * Convert any proficiency level to numeric 0-6 scale
 */
export function toNumericLevel(value, standard = "numeric") {
    if (standard === "numeric") {
        return typeof value === "number" ? value : parseFloat(value);
    }
    if (standard === "cefr") {
        return cefrToNumeric(value);
    }
    if (standard === "ilr") {
        return ilrToNumeric(value);
    }
    if (standard === "actfl") {
        return actflToNumeric(value);
    }
    if (standard === "hsk") {
        return hskToNumeric(value);
    }
    if (standard === "jlpt") {
        return jlptToNumeric(value);
    }
    if (standard === "topik") {
        return topikToNumeric(value);
    }
    if (standard === "ielts") {
        return ieltsToNumeric(value);
    }
    if (standard === "toefl") {
        return toeflToNumeric(typeof value === "number" ? value : parseInt(value));
    }
    if (standard === "cambridge") {
        return cambridgeToNumeric(value);
    }
    if (standard === "dele") {
        return deleToNumeric(value);
    }
    if (standard === "delf" || standard === "dalf") {
        return delfDalfToNumeric(value);
    }
    if (standard === "goethe") {
        return goetheToNumeric(value);
    }
    return typeof value === "number" ? value : 0;
}
/**
 * Convert numeric level to a specific standard
 */
export function fromNumericLevel(level, standard) {
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
const LEVEL_DESCRIPTIONS = {
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
export function getProficiencyInfo(level) {
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
export function meetsLevel(current, required) {
    return current >= required;
}
/**
 * Calculate progress between two levels as percentage
 */
export function levelProgress(current, from, to) {
    if (to === from)
        return current >= to ? 100 : 0;
    const progress = ((current - from) / (to - from)) * 100;
    return Math.max(0, Math.min(100, progress));
}
/**
 * Get levels between two proficiency levels
 */
export function levelsBetween(from, to) {
    const start = Math.ceil(Math.max(0, from));
    const end = Math.floor(Math.min(6, to));
    return CEFR_LEVELS.slice(start, end + 1);
}
//# sourceMappingURL=proficiency.js.map