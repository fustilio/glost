/**
 * Thai Language Test Corpus
 *
 * Realistic Thai text for testing and benchmarking.
 * Based on common Thai language learning materials.
 */
export interface ThaiSentence {
    thai: string;
    english: string;
    words: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}
export interface ThaiParagraph {
    title: string;
    titleEn: string;
    sentences: ThaiSentence[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topic: string;
}
/**
 * Common Thai greetings and introductions
 */
export declare const thaiGreetings: ThaiSentence[];
/**
 * Common Thai daily conversation
 */
export declare const thaiDailyConversation: ThaiSentence[];
/**
 * Thai food and restaurant vocabulary
 */
export declare const thaiFoodConversation: ThaiSentence[];
/**
 * Complete Thai paragraphs for realistic testing
 */
export declare const thaiParagraphs: ThaiParagraph[];
/**
 * Get all Thai sentences (flattened)
 */
export declare function getAllThaiSentences(): ThaiSentence[];
/**
 * Get sentences by difficulty
 */
export declare function getThaiSentencesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): ThaiSentence[];
//# sourceMappingURL=thai-corpus.d.ts.map