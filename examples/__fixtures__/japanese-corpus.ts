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
export const japaneseGreetings: JapaneseSentence[] = [
  {
    japanese: "こんにちは",
    english: "Hello",
    romaji: "konnichiwa",
    words: ["こんにちは"],
    difficulty: "beginner"
  },
  {
    japanese: "おはようございます",
    english: "Good morning",
    romaji: "ohayou gozaimasu",
    words: ["おはよう", "ございます"],
    difficulty: "beginner"
  },
  {
    japanese: "私の名前はジョンです",
    english: "My name is John",
    romaji: "watashi no namae wa jon desu",
    words: ["私", "の", "名前", "は", "ジョン", "です"],
    difficulty: "beginner"
  },
  {
    japanese: "お名前は何ですか",
    english: "What is your name?",
    romaji: "onamae wa nan desu ka",
    words: ["お", "名前", "は", "何", "です", "か"],
    difficulty: "beginner"
  },
  {
    japanese: "はじめまして",
    english: "Nice to meet you",
    romaji: "hajimemashite",
    words: ["はじめまして"],
    difficulty: "beginner"
  },
];

/**
 * Japanese daily conversation
 */
export const japaneseDailyConversation: JapaneseSentence[] = [
  {
    japanese: "元気ですか",
    english: "How are you?",
    romaji: "genki desu ka",
    words: ["元気", "です", "か"],
    difficulty: "beginner"
  },
  {
    japanese: "元気です",
    english: "I'm fine",
    romaji: "genki desu",
    words: ["元気", "です"],
    difficulty: "beginner"
  },
  {
    japanese: "ありがとうございます",
    english: "Thank you very much",
    romaji: "arigatou gozaimasu",
    words: ["ありがとう", "ございます"],
    difficulty: "beginner"
  },
  {
    japanese: "すみません",
    english: "Excuse me / Sorry",
    romaji: "sumimasen",
    words: ["すみません"],
    difficulty: "beginner"
  },
];

/**
 * Complete Japanese paragraphs
 */
export const japaneseParagraphs: JapaneseParagraph[] = [
  {
    title: "自己紹介",
    titleEn: "Self Introduction",
    difficulty: "beginner",
    topic: "introduction",
    sentences: [
      {
        japanese: "こんにちは、私はジョンです",
        english: "Hello, I am John",
        romaji: "konnichiwa, watashi wa jon desu",
        words: ["こんにちは", "私", "は", "ジョン", "です"],
        difficulty: "beginner"
      },
      {
        japanese: "アメリカから来ました",
        english: "I came from America",
        romaji: "amerika kara kimashita",
        words: ["アメリカ", "から", "来ました"],
        difficulty: "beginner"
      },
      {
        japanese: "日本語を勉強しています",
        english: "I am studying Japanese",
        romaji: "nihongo wo benkyou shiteimasu",
        words: ["日本語", "を", "勉強", "して", "います"],
        difficulty: "beginner"
      },
    ]
  },
  {
    title: "桜の季節",
    titleEn: "Cherry Blossom Season",
    difficulty: "intermediate",
    topic: "culture",
    sentences: [
      {
        japanese: "春になると桜が咲きます",
        english: "When spring comes, cherry blossoms bloom",
        romaji: "haru ni naru to sakura ga sakimasu",
        words: ["春", "に", "なる", "と", "桜", "が", "咲きます"],
        difficulty: "intermediate"
      },
      {
        japanese: "多くの人が花見を楽しみます",
        english: "Many people enjoy flower viewing",
        romaji: "ooku no hito ga hanami wo tanoshimimasu",
        words: ["多く", "の", "人", "が", "花見", "を", "楽しみます"],
        difficulty: "intermediate"
      },
    ]
  },
];

/**
 * Get all Japanese sentences
 */
export function getAllJapaneseSentences(): JapaneseSentence[] {
  return [
    ...japaneseGreetings,
    ...japaneseDailyConversation,
    ...japaneseParagraphs.flatMap(p => p.sentences),
  ];
}
