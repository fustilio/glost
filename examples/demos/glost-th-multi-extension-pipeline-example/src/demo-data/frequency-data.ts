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
export const DEMO_FREQUENCIES: ThaiFrequencyEntry[] = [
  {
    word: "คน",
    rank: 15,
    category: "very-common",
    perMillion: 8500,
  },
  {
    word: "ดี",
    rank: 42,
    category: "very-common",
    perMillion: 6200,
  },
  {
    word: "บ้าน",
    rank: 156,
    category: "very-common",
    perMillion: 3400,
  },
  {
    word: "ไทย",
    rank: 289,
    category: "very-common",
    perMillion: 2100,
  },
  {
    word: "ใหม่",
    rank: 512,
    category: "very-common",
    perMillion: 1600,
  },
  {
    word: "เรียน",
    rank: 1200,
    category: "common",
    perMillion: 850,
  },
  {
    word: "ภาษา",
    rank: 2400,
    category: "common",
    perMillion: 420,
  },
  {
    word: "เก่า",
    rank: 3100,
    category: "common",
    perMillion: 320,
  },
  {
    word: "สวัสดี",
    rank: 4200,
    category: "common",
    perMillion: 240,
  },
  {
    word: "ขอบคุณ",
    rank: 6500,
    category: "uncommon",
    perMillion: 150,
  },
];

/**
 * Get frequency data for a Thai word
 * 
 * @param word - Thai word to look up
 * @returns Frequency level or undefined if not found
 */
export function getThaiFrequency(word: string): FrequencyLevel | undefined {
  const entry = DEMO_FREQUENCIES.find((e) => e.word === word);
  return entry?.category;
}

/**
 * Get full frequency entry including rank and perMillion
 * 
 * @param word - Thai word to look up
 * @returns Frequency entry or undefined if not found
 */
export function getThaiFrequencyEntry(
  word: string
): ThaiFrequencyEntry | undefined {
  return DEMO_FREQUENCIES.find((e) => e.word === word);
}

/**
 * Categorize frequency based on rank
 * 
 * Utility function to determine frequency category from rank.
 * Useful for extending the demo data.
 * 
 * @param rank - Word frequency rank (1 = most common)
 * @returns Frequency category
 */
export function categorizeFrequency(rank: number): FrequencyLevel {
  if (rank <= 1000) return "very-common";
  if (rank <= 5000) return "common";
  if (rank <= 20000) return "uncommon";
  return "rare";
}
