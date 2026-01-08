import {
  createGLOSTWordNode,
  createGLOSTSentenceNode,
  createGLOSTParagraphNode,
  createGLOSTRootNode
} from './nodes';

import type {
  GLOSTWord} from './types';

// ============================================================================
// Enhanced Thai Example with Extras
// ============================================================================

const thaiWordsWithExtras: GLOSTWord[] = [
  createGLOSTWordNode(
    'สวัสดี',
    {
      rtgs: {
        text: 'sà-wàt-dii',
        system: 'rtgs',
        tone: 2,
        syllables: ['sa', 'wat', 'dii']
      },
      aua: {
        text: 'sa-wat-dee',
        system: 'aua',
        syllables: ['sa', 'wat', 'dee']
      },
      paiboon: {
        text: 'sa-wat-dee',
        system: 'paiboon',
        syllables: ['sa', 'wat', 'dee']
      },
      ipa: {
        text: 'sa.wàt.diː',
        system: 'ipa',
        syllables: ['sa', 'wat', 'diː']
      }
    },
    {
      meaning: 'hello, hi',
      partOfSpeech: 'interjection',
      usage: 'greeting, formal and informal'
    },
    'word',
    'th',
    'thai',
    {
      translations: {
        en: 'hello, hi',
        ja: 'こんにちは',
        zh: '你好',
        ko: '안녕하세요'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'very-common',
        culturalNotes: 'Standard greeting used throughout the day',
        related: ['สวัสดีตอนเช้า', 'สวัสดีตอนเย็น', 'สวัสดีตอนค่ำ'],
        examples: ['สวัสดีครับ', 'สวัสดีค่ะ', 'สวัสดีทุกคน']
      }
    }
  ),
  createGLOSTWordNode(
    'ครับ',
    {
      rtgs: {
        text: 'khráp',
        system: 'rtgs',
        tone: 2,
        syllables: ['khrap']
      },
      aua: {
        text: 'krap',
        system: 'aua',
        syllables: ['krap']
      },
      paiboon: {
        text: 'krap',
        system: 'paiboon',
        syllables: ['krap']
      },
      ipa: {
        text: 'kʰráp',
        system: 'ipa',
        syllables: ['khrap']
      }
    },
    {
      meaning: 'polite particle for male speakers',
      partOfSpeech: 'particle',
      usage: 'sentence ending, formal speech'
    },
    'word',
    'th',
    'thai',
    {
      translations: {
        en: 'polite particle (male)',
        ja: '丁寧語の助詞（男性）',
        zh: '礼貌助词（男性）',
        ko: '정중한 조사 (남성)'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'very-common',
        culturalNotes: 'Used by male speakers to show politeness',
        related: ['ค่ะ', 'ครับ', 'จ้ะ'],
        examples: ['ขอบคุณครับ', 'ไม่เป็นไรครับ', 'ครับครับ']
      }
    }
  ),
  createGLOSTWordNode(
    'ผม',
    {
      rtgs: {
        text: 'phǒm',
        system: 'rtgs',
        tone: 3,
        syllables: ['phom']
      },
      aua: {
        text: 'pom',
        system: 'aua',
        syllables: ['pom']
      },
      paiboon: {
        text: 'pom',
        system: 'paiboon',
        syllables: ['pom']
      },
      ipa: {
        text: 'pʰǒm',
        system: 'ipa',
        syllables: ['phom']
      }
    },
    {
      meaning: 'I, me (male)',
      partOfSpeech: 'pronoun',
      usage: 'first person singular, male speaker'
    },
    'word',
    'th',
    'thai',
    {
      translations: {
        en: 'I, me (male)',
        ja: '私（男性）',
        zh: '我（男性）',
        ko: '나, 저 (남성)'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'common',
        culturalNotes: 'First person pronoun used by male speakers',
        related: ['ดิฉัน', 'ฉัน', 'เรา'],
        examples: ['ผมชื่อ...', 'ผมชอบ...', 'ผมจะไป...']
      }
    }
  ),
  createGLOSTWordNode(
    'ชื่อ',
    {
      rtgs: {
        text: 'chûue',
        system: 'rtgs',
        tone: 3,
        syllables: ['chue']
      },
      aua: {
        text: 'chue',
        system: 'aua',
        syllables: ['chue']
      },
      paiboon: {
        text: 'chue',
        system: 'paiboon',
        syllables: ['chue']
      },
      ipa: {
        text: 'tɕʰûː',
        system: 'ipa',
        syllables: ['chue']
      }
    },
    {
      meaning: 'name',
      partOfSpeech: 'noun',
      usage: 'noun, can be used as verb \'to be named\''
    },
    'word',
    'th',
    'thai',
    {
      translations: {
        en: 'name',
        ja: '名前',
        zh: '名字',
        ko: '이름'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'common',
        culturalNotes: 'Can function as both noun and verb',
        related: ['นาม', 'ชื่อจริง', 'ชื่อเล่น'],
        examples: ['ชื่ออะไรครับ', 'ชื่อของผมคือ...', 'ตั้งชื่อ']
      }
    }
  ),
  createGLOSTWordNode(
    'สมชาย',
    {
      rtgs: {
        text: 'sǒm-chaai',
        system: 'rtgs',
        tone: 3,
        syllables: ['som', 'chaai']
      },
      aua: {
        text: 'som-chai',
        system: 'aua',
        syllables: ['som', 'chai']
      },
      paiboon: {
        text: 'som-chai',
        system: 'paiboon',
        syllables: ['som', 'chai']
      },
      ipa: {
        text: 'sǒm.tɕʰaːj',
        system: 'ipa',
        syllables: ['som', 'chaai']
      }
    },
    {
      meaning: 'male given name',
      partOfSpeech: 'proper noun',
      usage: 'personal name, common Thai male name'
    },
    'word',
    'th',
    'thai',
    {
      translations: {
        en: 'Somchai (male name)',
        ja: 'ソムチャイ（男性名）',
        zh: '颂猜（男性名）',
        ko: '솜차이 (남성 이름)'
      },
      metadata: {
        difficulty: 'intermediate',
        frequency: 'uncommon',
        culturalNotes: 'Common traditional Thai male name meaning "man of merit"',
        related: ['ชาย', 'สม', 'ชื่อไทย'],
        examples: ['คุณสมชาย', 'สมชายเป็นคนดี', 'เพื่อนของสมชาย']
      }
    }
  )
];

// ============================================================================
// Enhanced Japanese Example with Extras
// ============================================================================

const japaneseWordsWithExtras: GLOSTWord[] = [
  createGLOSTWordNode(
    '私',
    {
      romaji: {
        text: 'watashi',
        system: 'romaji',
        syllables: ['wa', 'ta', 'shi']
      },
      furigana: {
        text: 'わたし',
        system: 'furigana',
        syllables: ['wa', 'ta', 'shi']
      },
      ipa: {
        text: 'ɰataɕi',
        system: 'ipa',
        syllables: ['wa', 'ta', 'shi']
      }
    },
    {
      meaning: 'I, me',
      partOfSpeech: 'pronoun',
      usage: 'first person singular, formal and informal'
    },
    'word',
    'ja',
    'mixed',
    {
      translations: {
        en: 'I, me',
        th: 'ผม/ดิฉัน',
        zh: '我',
        ko: '나, 저'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'very-common',
        culturalNotes: 'Polite first person pronoun, gender-neutral',
        related: ['僕', '俺', 'あたし'],
        examples: ['私は学生です', '私の名前は...', '私も行きます']
      }
    }
  ),
  createGLOSTWordNode(
    'の',
    {
      romaji: {
        text: 'no',
        system: 'romaji',
        syllables: ['no']
      },
      furigana: {
        text: 'の',
        system: 'furigana',
        syllables: ['no']
      },
      ipa: {
        text: 'no',
        system: 'ipa',
        syllables: ['no']
      }
    },
    {
      meaning: 'possessive particle',
      partOfSpeech: 'particle',
      usage: 'indicates possession or relationship'
    },
    'word',
    'ja',
    'mixed',
    {
      translations: {
        en: 'possessive particle',
        th: 'คำบุพบทแสดงความเป็นเจ้าของ',
        zh: '的',
        ko: '의'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'very-common',
        culturalNotes: 'Essential particle for showing possession',
        related: ['が', 'は', 'を'],
        examples: ['私の本', '日本の文化', '友達の家']
      }
    }
  ),
  createGLOSTWordNode(
    '名前',
    {
      romaji: {
        text: 'namae',
        system: 'romaji',
        syllables: ['na', 'mae']
      },
      furigana: {
        text: 'なまえ',
        system: 'furigana',
        syllables: ['na', 'mae']
      },
      ipa: {
        text: 'namae',
        system: 'ipa',
        syllables: ['na', 'mae']
      }
    },
    {
      meaning: 'name',
      partOfSpeech: 'noun',
      usage: 'noun, refers to a person\'s name'
    },
    'word',
    'ja',
    'mixed',
    {
      translations: {
        en: 'name',
        th: 'ชื่อ',
        zh: '名字',
        ko: '이름'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'common',
        culturalNotes: 'Basic vocabulary for introductions',
        related: ['氏名', 'フルネーム', 'ニックネーム'],
        examples: ['お名前は？', '名前を教えてください', '美しい名前']
      }
    }
  ),
  createGLOSTWordNode(
    'は',
    {
      romaji: {
        text: 'wa',
        system: 'romaji',
        syllables: ['wa']
      },
      furigana: {
        text: 'は',
        system: 'furigana',
        syllables: ['wa']
      },
      ipa: {
        text: 'ɰa',
        system: 'ipa',
        syllables: ['wa']
      }
    },
    {
      meaning: 'topic particle',
      partOfSpeech: 'particle',
      usage: 'marks the topic of the sentence'
    },
    'word',
    'ja',
    'mixed',
    {
      translations: {
        en: 'topic particle',
        th: 'คำบุพบทแสดงหัวข้อ',
        zh: '话题助词',
        ko: '주제 조사'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'very-common',
        culturalNotes: 'One of the most important particles in Japanese',
        related: ['が', 'を', 'に'],
        examples: ['私は学生です', 'これは本です', '日本は美しい国です']
      }
    }
  ),
  createGLOSTWordNode(
    '田中',
    {
      romaji: {
        text: 'tanaka',
        system: 'romaji',
        syllables: ['ta', 'na', 'ka']
      },
      furigana: {
        text: 'たなか',
        system: 'furigana',
        syllables: ['ta', 'na', 'ka']
      },
      ipa: {
        text: 'tanaka',
        system: 'ipa',
        syllables: ['ta', 'na', 'ka']
      }
    },
    {
      meaning: 'surname Tanaka',
      partOfSpeech: 'proper noun',
      usage: 'family name, very common Japanese surname'
    },
    'word',
    'ja',
    'mixed',
    {
      translations: {
        en: 'Tanaka (surname)',
        th: 'ทานากะ (นามสกุล)',
        zh: '田中（姓氏）',
        ko: '다나카 (성)'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'common',
        culturalNotes: 'One of the most common Japanese surnames',
        related: ['佐藤', '鈴木', '高橋'],
        examples: ['田中さん', '田中先生', '田中家']
      }
    }
  ),
  createGLOSTWordNode(
    'です',
    {
      romaji: {
        text: 'desu',
        system: 'romaji',
        syllables: ['de', 'su']
      },
      furigana: {
        text: 'です',
        system: 'furigana',
        syllables: ['de', 'su']
      },
      ipa: {
        text: 'desɯ',
        system: 'ipa',
        syllables: ['de', 'su']
      }
    },
    {
      meaning: 'copula (is, am, are)',
      partOfSpeech: 'copula',
      usage: 'polite form of the copula, formal speech'
    },
    'word',
    'ja',
    'mixed',
    {
      translations: {
        en: 'is, am, are (polite)',
        th: 'เป็น, คือ (สุภาพ)',
        zh: '是（敬语）',
        ko: '입니다 (존댓말)'
      },
      metadata: {
        difficulty: 'beginner',
        frequency: 'very-common',
        culturalNotes: 'Polite copula used in formal situations',
        related: ['だ', 'である', 'でございます'],
        examples: ['私は学生です', 'これは本です', '田中さんです']
      }
    }
  )
];

// ============================================================================
// Create Enhanced Document Structure
// ============================================================================

const thaiSentenceWithExtras = createGLOSTSentenceNode(
  'สวัสดีครับ ผมชื่อสมชาย',
  'th',
  'thai',
  thaiWordsWithExtras
);

const japaneseSentenceWithExtras = createGLOSTSentenceNode(
  '私の名前は田中です。',
  'ja',
  'mixed',
  japaneseWordsWithExtras
);

const thaiParagraphWithExtras = createGLOSTParagraphNode( [thaiSentenceWithExtras]);
const japaneseParagraphWithExtras = createGLOSTParagraphNode( [japaneseSentenceWithExtras]);

export const thaiDocumentWithExtras = createGLOSTRootNode(
  'th',
  'thai',
  [thaiParagraphWithExtras],
  { 
    title: 'Thai Greeting Example with Extras',
    description: 'Enhanced Thai example with i18n translations and metadata'
  }
);

export const japaneseDocumentWithExtras = createGLOSTRootNode(
  'ja',
  'mixed',
  [japaneseParagraphWithExtras],
  { 
    title: 'Japanese Greeting Example with Extras',
    description: 'Enhanced Japanese example with i18n translations and metadata'
  }
);

// ============================================================================
// Utility Functions for Working with Extras
// ============================================================================

/**
 * Get quick translation for a word in a specific language
 */
export function getQuickTranslation(word: GLOSTWord, targetLang: string): string | undefined {
  return word.extras?.translations?.[targetLang];
}

/**
 * Get all available translations for a word
 */
export function getAllTranslations(word: GLOSTWord): Record<string, string> {
  const translations = word.extras?.translations;
  if (!translations) return {};
  
  const result: Record<string, string> = {};
  Object.entries(translations).forEach(([lang, text]) => {
    if (text !== undefined) {
      result[lang] = text;
    }
  });
  return result;
}

/**
 * Get difficulty level for a word
 */
export function getDifficulty(word: GLOSTWord): string | undefined {
  return word.extras?.metadata?.difficulty;
}

/**
 * Get cultural notes for a word
 */
export function getCulturalNotes(word: GLOSTWord): string | undefined {
  return word.extras?.metadata?.culturalNotes;
}

/**
 * Get related words for a word
 */
export function getRelatedWords(word: GLOSTWord): string[] {
  return word.extras?.metadata?.related || [];
}

/**
 * Get example sentences for a word
 */
export function getExamples(word: GLOSTWord): string[] {
  return word.extras?.metadata?.examples || [];
}

// ============================================================================
// Export All Mock Data
// ============================================================================

export {
  thaiWordsWithExtras,
  japaneseWordsWithExtras,
  thaiSentenceWithExtras,
  japaneseSentenceWithExtras,
  thaiParagraphWithExtras,
  japaneseParagraphWithExtras
};
