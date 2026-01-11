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
export const thaiGreetings: ThaiSentence[] = [
  {
    thai: "สวัสดีครับ",
    english: "Hello (male speaker)",
    words: ["สวัสดี", "ครับ"],
    difficulty: "beginner"
  },
  {
    thai: "สวัสดีค่ะ",
    english: "Hello (female speaker)",
    words: ["สวัสดี", "ค่ะ"],
    difficulty: "beginner"
  },
  {
    thai: "ผมชื่อจอห์น",
    english: "My name is John",
    words: ["ผม", "ชื่อ", "จอห์น"],
    difficulty: "beginner"
  },
  {
    thai: "คุณชื่ออะไรครับ",
    english: "What is your name?",
    words: ["คุณ", "ชื่อ", "อะไร", "ครับ"],
    difficulty: "beginner"
  },
  {
    thai: "ยินดีที่ได้รู้จัก",
    english: "Nice to meet you",
    words: ["ยินดี", "ที่", "ได้", "รู้จัก"],
    difficulty: "beginner"
  },
];

/**
 * Common Thai daily conversation
 */
export const thaiDailyConversation: ThaiSentence[] = [
  {
    thai: "คุณสบายดีไหม",
    english: "How are you?",
    words: ["คุณ", "สบายดี", "ไหม"],
    difficulty: "beginner"
  },
  {
    thai: "ผมสบายดีครับ",
    english: "I'm fine",
    words: ["ผม", "สบายดี", "ครับ"],
    difficulty: "beginner"
  },
  {
    thai: "ขอบคุณมากครับ",
    english: "Thank you very much",
    words: ["ขอบคุณ", "มาก", "ครับ"],
    difficulty: "beginner"
  },
  {
    thai: "ขอโทษครับ",
    english: "Sorry / Excuse me",
    words: ["ขอโทษ", "ครับ"],
    difficulty: "beginner"
  },
  {
    thai: "ไม่เป็นไร",
    english: "It's okay / Never mind",
    words: ["ไม่", "เป็นไร"],
    difficulty: "beginner"
  },
];

/**
 * Thai food and restaurant vocabulary
 */
export const thaiFoodConversation: ThaiSentence[] = [
  {
    thai: "อาหารไทยอร่อยมาก",
    english: "Thai food is very delicious",
    words: ["อาหาร", "ไทย", "อร่อย", "มาก"],
    difficulty: "beginner"
  },
  {
    thai: "ผมชอบกินส้มตำ",
    english: "I like to eat papaya salad",
    words: ["ผม", "ชอบ", "กิน", "ส้มตำ"],
    difficulty: "intermediate"
  },
  {
    thai: "ร้านอาหารนี้แพงไหม",
    english: "Is this restaurant expensive?",
    words: ["ร้านอาหาร", "นี้", "แพง", "ไหม"],
    difficulty: "intermediate"
  },
  {
    thai: "ขอเมนูหน่อยครับ",
    english: "May I have the menu please?",
    words: ["ขอ", "เมนู", "หน่อย", "ครับ"],
    difficulty: "intermediate"
  },
];

/**
 * Complete Thai paragraphs for realistic testing
 */
export const thaiParagraphs: ThaiParagraph[] = [
  {
    title: "การแนะนำตัว",
    titleEn: "Self Introduction",
    difficulty: "beginner",
    topic: "introduction",
    sentences: [
      {
        thai: "สวัสดีครับ ผมชื่อจอห์น",
        english: "Hello, my name is John",
        words: ["สวัสดี", "ครับ", "ผม", "ชื่อ", "จอห์น"],
        difficulty: "beginner"
      },
      {
        thai: "ผมมาจากอเมริกา",
        english: "I come from America",
        words: ["ผม", "มา", "จาก", "อเมริกา"],
        difficulty: "beginner"
      },
      {
        thai: "ผมชอบเรียนภาษาไทย",
        english: "I like to study Thai language",
        words: ["ผม", "ชอบ", "เรียน", "ภาษา", "ไทย"],
        difficulty: "beginner"
      },
    ]
  },
  {
    title: "ตลาดน้ำ",
    titleEn: "Floating Market",
    difficulty: "intermediate",
    topic: "culture",
    sentences: [
      {
        thai: "ตลาดน้ำเป็นสถานที่ท่องเที่ยวที่มีชื่อเสียง",
        english: "Floating markets are famous tourist attractions",
        words: ["ตลาดน้ำ", "เป็น", "สถานที่", "ท่องเที่ยว", "ที่", "มี", "ชื่อเสียง"],
        difficulty: "intermediate"
      },
      {
        thai: "คนขายอาหารและของที่ระลึกบนเรือ",
        english: "Sellers sell food and souvenirs on boats",
        words: ["คน", "ขาย", "อาหาร", "และ", "ของที่ระลึก", "บน", "เรือ"],
        difficulty: "intermediate"
      },
      {
        thai: "นักท่องเที่ยวชอบมาถ่ายรูปและซื้อของ",
        english: "Tourists like to come take photos and buy things",
        words: ["นักท่องเที่ยว", "ชอบ", "มา", "ถ่ายรูป", "และ", "ซื้อ", "ของ"],
        difficulty: "intermediate"
      },
    ]
  },
  {
    title: "วัฒนธรรมไทย",
    titleEn: "Thai Culture",
    difficulty: "advanced",
    topic: "culture",
    sentences: [
      {
        thai: "วัฒนธรรมไทยมีความหลากหลายและเป็นเอกลักษณ์",
        english: "Thai culture is diverse and unique",
        words: ["วัฒนธรรม", "ไทย", "มี", "ความ", "หลากหลาย", "และ", "เป็น", "เอกลักษณ์"],
        difficulty: "advanced"
      },
      {
        thai: "ประเพณีและพิธีกรรมสำคัญมีมากมายตลอดทั้งปี",
        english: "There are many important traditions and ceremonies throughout the year",
        words: ["ประเพณี", "และ", "พิธีกรรม", "สำคัญ", "มี", "มากมาย", "ตลอด", "ทั้งปี"],
        difficulty: "advanced"
      },
    ]
  },
];

/**
 * Get all Thai sentences (flattened)
 */
export function getAllThaiSentences(): ThaiSentence[] {
  return [
    ...thaiGreetings,
    ...thaiDailyConversation,
    ...thaiFoodConversation,
    ...thaiParagraphs.flatMap(p => p.sentences),
  ];
}

/**
 * Get sentences by difficulty
 */
export function getThaiSentencesByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): ThaiSentence[] {
  return getAllThaiSentences().filter(s => s.difficulty === difficulty);
}
