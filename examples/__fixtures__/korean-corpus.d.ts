/**
 * Korean Language Test Corpus
 *
 * Realistic Korean text for testing and benchmarking.
 */
export interface KoreanSentence {
    korean: string;
    english: string;
    romanization: string;
    words: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
}
export interface KoreanParagraph {
    title: string;
    titleEn: string;
    sentences: KoreanSentence[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topic: string;
}
/**
 * Common Korean greetings
 */
export declare const koreanGreetings: KoreanSentence[];
/**
 * Korean daily conversation
 */
export declare const koreanDailyConversation: KoreanSentence[];
/**
 * Complete Korean paragraphs
 */
export declare const koreanParagraphs: KoreanParagraph[];
/**
 * Get all Korean sentences
 */
export declare function getAllKoreanSentences(): KoreanSentence[];
//# sourceMappingURL=korean-corpus.d.ts.map