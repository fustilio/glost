/**
 * Demo Thai Frequency Data
 *
 * Sample frequency rankings based on corpus data.
 * This demonstrates frequency categorization for Thai words.
 */
import type { FrequencyLevel } from "glost-frequency";
export interface ThaiFrequencyEntry {
    word: string;
    rank: number;
    category: FrequencyLevel;
    perMillion?: number;
}
/**
 * Demo Thai frequency data
 *
 * In a real application, this would come from:
 * - Thai National Corpus
 * - BEST corpus
 * - Language learning corpus
 * - Web scraping with frequency analysis
 *
 * Categories are based on rank:
 * - very-common: rank 1-1000
 * - common: rank 1001-5000
 * - uncommon: rank 5001-20000
 * - rare: rank 20001+
 */
export declare const DEMO_FREQUENCIES: ThaiFrequencyEntry[];
/**
 * Get frequency data for a Thai word
 *
 * @param word - Thai word to look up
 * @returns Frequency level or undefined if not found
 */
export declare function getThaiFrequency(word: string): FrequencyLevel | undefined;
/**
 * Get full frequency entry including rank and perMillion
 *
 * @param word - Thai word to look up
 * @returns Frequency entry or undefined if not found
 */
export declare function getThaiFrequencyEntry(word: string): ThaiFrequencyEntry | undefined;
/**
 * Categorize frequency based on rank
 *
 * Utility function to determine frequency category from rank.
 * Useful for extending the demo data.
 *
 * @param rank - Word frequency rank (1 = most common)
 * @returns Frequency category
 */
export declare function categorizeFrequency(rank: number): FrequencyLevel;
//# sourceMappingURL=frequency-data.d.ts.map