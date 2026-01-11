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
export const koreanGreetings: KoreanSentence[] = [
  {
    korean: "안녕하세요",
    english: "Hello",
    romanization: "annyeonghaseyo",
    words: ["안녕하세요"],
    difficulty: "beginner"
  },
  {
    korean: "제 이름은 존입니다",
    english: "My name is John",
    romanization: "je ireumeun jon imnida",
    words: ["제", "이름은", "존", "입니다"],
    difficulty: "beginner"
  },
  {
    korean: "이름이 뭐예요",
    english: "What is your name?",
    romanization: "ireumi mwoyeyo",
    words: ["이름이", "뭐예요"],
    difficulty: "beginner"
  },
  {
    korean: "만나서 반갑습니다",
    english: "Nice to meet you",
    romanization: "mannaseo bangapseumnida",
    words: ["만나서", "반갑습니다"],
    difficulty: "beginner"
  },
];

/**
 * Korean daily conversation
 */
export const koreanDailyConversation: KoreanSentence[] = [
  {
    korean: "잘 지냈어요",
    english: "How have you been?",
    romanization: "jal jinaesseoyo",
    words: ["잘", "지냈어요"],
    difficulty: "beginner"
  },
  {
    korean: "네, 잘 지냈어요",
    english: "Yes, I've been well",
    romanization: "ne, jal jinaesseoyo",
    words: ["네", "잘", "지냈어요"],
    difficulty: "beginner"
  },
  {
    korean: "감사합니다",
    english: "Thank you",
    romanization: "gamsahamnida",
    words: ["감사합니다"],
    difficulty: "beginner"
  },
  {
    korean: "죄송합니다",
    english: "I'm sorry",
    romanization: "joesonghamnida",
    words: ["죄송합니다"],
    difficulty: "beginner"
  },
];

/**
 * Complete Korean paragraphs
 */
export const koreanParagraphs: KoreanParagraph[] = [
  {
    title: "자기소개",
    titleEn: "Self Introduction",
    difficulty: "beginner",
    topic: "introduction",
    sentences: [
      {
        korean: "안녕하세요, 저는 존입니다",
        english: "Hello, I am John",
        romanization: "annyeonghaseyo, jeoneun jon imnida",
        words: ["안녕하세요", "저는", "존", "입니다"],
        difficulty: "beginner"
      },
      {
        korean: "미국에서 왔습니다",
        english: "I came from America",
        romanization: "migugeseo wasseumnida",
        words: ["미국에서", "왔습니다"],
        difficulty: "beginner"
      },
      {
        korean: "한국어를 공부하고 있습니다",
        english: "I am studying Korean",
        romanization: "hangugeoreul gongbuhago isseumnida",
        words: ["한국어를", "공부하고", "있습니다"],
        difficulty: "beginner"
      },
    ]
  },
  {
    title: "한국 음식",
    titleEn: "Korean Food",
    difficulty: "intermediate",
    topic: "food",
    sentences: [
      {
        korean: "한국 음식은 매우 맛있습니다",
        english: "Korean food is very delicious",
        romanization: "hanguk eumsigeun maeu masissseumnida",
        words: ["한국", "음식은", "매우", "맛있습니다"],
        difficulty: "intermediate"
      },
      {
        korean: "저는 김치찌개를 좋아합니다",
        english: "I like kimchi stew",
        romanization: "jeoneun kimchijjigaereul joahamnida",
        words: ["저는", "김치찌개를", "좋아합니다"],
        difficulty: "intermediate"
      },
    ]
  },
];

/**
 * Get all Korean sentences
 */
export function getAllKoreanSentences(): KoreanSentence[] {
  return [
    ...koreanGreetings,
    ...koreanDailyConversation,
    ...koreanParagraphs.flatMap(p => p.sentences),
  ];
}
