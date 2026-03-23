/**
 * Japanese Language Test Corpus
 *
 * Realistic Japanese text for testing and benchmarking.
 */
export interface JapaneseSentence {
    japanese: string;
    english: string;
    romaji: string;
    words: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}
export interface JapaneseParagraph {
    title: string;
    titleEn: string;
    sentences: JapaneseSentence[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topic: string;
}
/**
 * Common Japanese greetings
 */
export declare const japaneseGreetings: JapaneseSentence[];
/**
 * Japanese daily conversation
 */
export declare const japaneseDailyConversation: JapaneseSentence[];
/**
 * Complete Japanese paragraphs
 */
export declare const japaneseParagraphs: JapaneseParagraph[];
/**
 * Get all Japanese sentences
 */
export declare function getAllJapaneseSentences(): JapaneseSentence[];
//# sourceMappingURL=japanese-corpus.d.ts.map