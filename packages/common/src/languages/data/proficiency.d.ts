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
 * Numeric proficiency level (0-6 scale)
 * Decimals allowed for fine-grained positioning
 */
export type ProficiencyLevel = number;
/**
 * CEFR level labels
 */
export declare const CEFR_LEVELS: readonly ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];
export type CEFRLevel = (typeof CEFR_LEVELS)[number];
/**
 * Proficiency standard identifiers
 */
export type ProficiencyStandard = "cefr" | "ilr" | "actfl" | "hsk" | "jlpt" | "topik" | "dele" | "delf" | "dalf" | "goethe" | "toefl" | "ielts" | "cambridge" | "numeric";
/**
 * CEFR level to numeric mapping
 */
export declare const CEFR_TO_NUMERIC: Record<CEFRLevel, ProficiencyLevel>;
/**
 * Convert numeric level to CEFR (rounds to nearest)
 */
export declare function numericToCEFR(level: ProficiencyLevel): CEFRLevel;
/**
 * Convert CEFR to numeric
 */
export declare function cefrToNumeric(cefr: CEFRLevel): ProficiencyLevel;
export declare const ILR_LEVELS: readonly ["0", "0+", "1", "1+", "2", "2+", "3", "3+", "4", "4+", "5"];
export type ILRLevel = (typeof ILR_LEVELS)[number];
export declare function ilrToNumeric(ilr: ILRLevel): ProficiencyLevel;
export declare function numericToILR(level: ProficiencyLevel): ILRLevel;
export declare const ACTFL_LEVELS: readonly ["Novice Low", "Novice Mid", "Novice High", "Intermediate Low", "Intermediate Mid", "Intermediate High", "Advanced Low", "Advanced Mid", "Advanced High", "Superior", "Distinguished"];
export type ACTFLLevel = (typeof ACTFL_LEVELS)[number];
export declare function actflToNumeric(actfl: ACTFLLevel): ProficiencyLevel;
export declare function numericToACTFL(level: ProficiencyLevel): ACTFLLevel;
export declare const HSK_LEVELS: readonly ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"];
export type HSKLevel = (typeof HSK_LEVELS)[number];
export declare function hskToNumeric(hsk: HSKLevel): ProficiencyLevel;
export declare function numericToHSK(level: ProficiencyLevel): HSKLevel;
export declare const JLPT_LEVELS: readonly ["N5", "N4", "N3", "N2", "N1"];
export type JLPTLevel = (typeof JLPT_LEVELS)[number];
export declare function jlptToNumeric(jlpt: JLPTLevel): ProficiencyLevel;
export declare function numericToJLPT(level: ProficiencyLevel): JLPTLevel;
export declare const TOPIK_LEVELS: readonly ["TOPIK I-1", "TOPIK I-2", "TOPIK II-3", "TOPIK II-4", "TOPIK II-5", "TOPIK II-6"];
export type TOPIKLevel = (typeof TOPIK_LEVELS)[number];
export declare function topikToNumeric(topik: TOPIKLevel): ProficiencyLevel;
export declare function numericToTOPIK(level: ProficiencyLevel): TOPIKLevel;
export type IELTSBand = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9;
export declare function ieltsToNumeric(band: IELTSBand): ProficiencyLevel;
export declare function numericToIELTS(level: ProficiencyLevel): IELTSBand;
export type TOEFLScore = number;
export declare function toeflToNumeric(score: TOEFLScore): ProficiencyLevel;
export declare function numericToTOEFL(level: ProficiencyLevel): TOEFLScore;
export declare const CAMBRIDGE_LEVELS: readonly ["KET", "PET", "FCE", "CAE", "CPE"];
export type CambridgeLevel = (typeof CAMBRIDGE_LEVELS)[number];
export declare function cambridgeToNumeric(level: CambridgeLevel): ProficiencyLevel;
export declare function numericToCambridge(level: ProficiencyLevel): CambridgeLevel;
export declare const DELE_LEVELS: readonly ["A1", "A2", "B1", "B2", "C1", "C2"];
export type DELELevel = (typeof DELE_LEVELS)[number];
export declare function deleToNumeric(dele: DELELevel): ProficiencyLevel;
export declare function numericToDELE(level: ProficiencyLevel): DELELevel;
export declare const DELF_LEVELS: readonly ["A1", "A2", "B1", "B2"];
export declare const DALF_LEVELS: readonly ["C1", "C2"];
export type DELFLevel = (typeof DELF_LEVELS)[number];
export type DALFLevel = (typeof DALF_LEVELS)[number];
export type FrenchDiplomaLevel = DELFLevel | DALFLevel;
export declare function delfDalfToNumeric(level: FrenchDiplomaLevel): ProficiencyLevel;
export declare function numericToDELFDALF(level: ProficiencyLevel): FrenchDiplomaLevel;
export declare const GOETHE_LEVELS: readonly ["Start Deutsch 1", "Start Deutsch 2", "Goethe-Zertifikat B1", "Goethe-Zertifikat B2", "Goethe-Zertifikat C1", "Goethe-Zertifikat C2"];
export type GoetheLevel = (typeof GOETHE_LEVELS)[number];
export declare function goetheToNumeric(level: GoetheLevel): ProficiencyLevel;
export declare function numericToGoethe(level: ProficiencyLevel): GoetheLevel;
/**
 * Convert any proficiency level to numeric 0-6 scale
 */
export declare function toNumericLevel(value: string | number, standard?: ProficiencyStandard): ProficiencyLevel;
/**
 * Convert numeric level to a specific standard
 */
export declare function fromNumericLevel(level: ProficiencyLevel, standard: ProficiencyStandard): string | number;
export interface ProficiencyInfo {
    numeric: ProficiencyLevel;
    cefr: CEFRLevel;
    description: string;
    canDo: string[];
}
/**
 * Get detailed proficiency information
 */
export declare function getProficiencyInfo(level: ProficiencyLevel): ProficiencyInfo;
/**
 * Check if level meets or exceeds a threshold
 */
export declare function meetsLevel(current: ProficiencyLevel, required: ProficiencyLevel): boolean;
/**
 * Calculate progress between two levels as percentage
 */
export declare function levelProgress(current: ProficiencyLevel, from: ProficiencyLevel, to: ProficiencyLevel): number;
/**
 * Get levels between two proficiency levels
 */
export declare function levelsBetween(from: ProficiencyLevel, to: ProficiencyLevel): CEFRLevel[];
//# sourceMappingURL=proficiency.d.ts.map