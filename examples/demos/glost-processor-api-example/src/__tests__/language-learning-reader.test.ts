/**
 * Building a Thai language reader with flashcards and vocabulary tracking.
 */

import { describe, it, expect } from "vitest";

import {
  createSentenceFromWords,
  createParagraphFromSentences,
  createDocumentFromParagraphs,
  getAllWords,
  getAllSentences,
  getWordText,
  getWordTranscription,
  isGLOSTWord,
  type GLOSTWord,
  type GLOSTRoot,
} from "glost";

import { createThaiWord } from "glost-th";

import { processGLOSTWithExtensions } from "glost-extensions";

// A sample Thai lesson - greeting and basic conversation
function createThaiLessonDocument(): GLOSTRoot {
  // "Hello, how are you?"
  const sentence1Words = [
    createThaiWord({ text: "สวัสดี", rtgs: "sa-wat-di", partOfSpeech: "interjection" }),
    createThaiWord({ text: "ครับ", rtgs: "khrap", partOfSpeech: "particle" }),
    createThaiWord({ text: "คุณ", rtgs: "khun", partOfSpeech: "pronoun" }),
    createThaiWord({ text: "สบาย", rtgs: "sa-bai", partOfSpeech: "adjective" }),
    createThaiWord({ text: "ดี", rtgs: "di", partOfSpeech: "adjective" }),
    createThaiWord({ text: "ไหม", rtgs: "mai", partOfSpeech: "particle" }),
  ];

  sentence1Words[0].extras = {
    translations: { en: "hello" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };
  sentence1Words[1].extras = {
    translations: { en: "(polite particle, male)" },
    metadata: {
      frequency: "very-common",
      difficulty: "beginner",
      culturalNotes: "Males use ครับ, females use ค่ะ",
    },
  };
  sentence1Words[2].extras = {
    translations: { en: "you" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };
  sentence1Words[3].extras = {
    translations: { en: "comfortable/well" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };
  sentence1Words[4].extras = {
    translations: { en: "good" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };
  sentence1Words[5].extras = {
    translations: { en: "(question particle)" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };

  const sentence1 = createSentenceFromWords(
    sentence1Words,
    "th",
    "thai",
    "สวัสดีครับ คุณสบายดีไหม"
  );
  sentence1.extras = {
    translations: { en: "Hello, how are you?" },
  };

  // "I'm studying Thai language"
  const sentence2Words = [
    createThaiWord({ text: "ผม", rtgs: "phom", partOfSpeech: "pronoun" }),
    createThaiWord({ text: "กำลัง", rtgs: "kam-lang", partOfSpeech: "auxiliary" }),
    createThaiWord({ text: "เรียน", rtgs: "rian", partOfSpeech: "verb" }),
    createThaiWord({ text: "ภาษา", rtgs: "pha-sa", partOfSpeech: "noun" }),
    createThaiWord({ text: "ไทย", rtgs: "thai", partOfSpeech: "noun" }),
  ];

  sentence2Words[0].extras = {
    translations: { en: "I (male)" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };
  sentence2Words[1].extras = {
    translations: { en: "(progressive marker)" },
    metadata: { frequency: "common", difficulty: "intermediate" },
  };
  sentence2Words[2].extras = {
    translations: { en: "to study/learn" },
    metadata: { frequency: "common", difficulty: "beginner" },
  };
  sentence2Words[3].extras = {
    translations: { en: "language" },
    metadata: { frequency: "common", difficulty: "intermediate" },
  };
  sentence2Words[4].extras = {
    translations: { en: "Thai" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };

  const sentence2 = createSentenceFromWords(
    sentence2Words,
    "th",
    "thai",
    "ผมกำลังเรียนภาษาไทย"
  );
  sentence2.extras = {
    translations: { en: "I'm studying Thai language." },
  };

  // "Thai grammar is quite challenging"
  const sentence3Words = [
    createThaiWord({ text: "ไวยากรณ์", rtgs: "wai-ya-korn", partOfSpeech: "noun" }),
    createThaiWord({ text: "ไทย", rtgs: "thai", partOfSpeech: "noun" }),
    createThaiWord({ text: "ค่อนข้าง", rtgs: "khon-khang", partOfSpeech: "adverb" }),
    createThaiWord({ text: "ยาก", rtgs: "yak", partOfSpeech: "adjective" }),
  ];

  sentence3Words[0].extras = {
    translations: { en: "grammar" },
    metadata: { frequency: "uncommon", difficulty: "advanced" },
  };
  sentence3Words[1].extras = {
    translations: { en: "Thai" },
    metadata: { frequency: "very-common", difficulty: "beginner" },
  };
  sentence3Words[2].extras = {
    translations: { en: "quite/rather" },
    metadata: { frequency: "common", difficulty: "intermediate" },
  };
  sentence3Words[3].extras = {
    translations: { en: "difficult" },
    metadata: { frequency: "common", difficulty: "beginner" },
  };

  const sentence3 = createSentenceFromWords(
    sentence3Words,
    "th",
    "thai",
    "ไวยากรณ์ไทยค่อนข้างยาก"
  );
  sentence3.extras = {
    translations: { en: "Thai grammar is quite challenging." },
  };

  const paragraph = createParagraphFromSentences([
    sentence1,
    sentence2,
    sentence3,
  ]);

  return createDocumentFromParagraphs([paragraph], "th", "thai", {
    title: "Thai Language Basics",
  });
}

// Get words appropriate for a learner's level
function filterWordsByDifficulty(
  document: GLOSTRoot,
  maxDifficulty: "beginner" | "intermediate" | "advanced"
): GLOSTWord[] {
  const levels = { beginner: 1, intermediate: 2, advanced: 3 };
  const max = levels[maxDifficulty];

  return getAllWords(document).filter((word) => {
    const difficulty = word.extras?.metadata?.difficulty || "beginner";
    return levels[difficulty as keyof typeof levels] <= max;
  });
}

interface Flashcard {
  front: string;
  back: string;
  pronunciation: string;
  difficulty: string;
  culturalNote?: string;
}

function generateFlashcards(words: GLOSTWord[]): Flashcard[] {
  return words.map((word) => ({
    front: getWordText(word),
    back: word.extras?.translations?.en || "",
    pronunciation: getWordTranscription(word, "rtgs") || "",
    difficulty: word.extras?.metadata?.difficulty || "unknown",
    culturalNote: word.extras?.metadata?.culturalNotes,
  }));
}

function generateVocabularyList(
  document: GLOSTRoot
): Record<string, Flashcard[]> {
  const words = getAllWords(document);
  const grouped: Record<string, Flashcard[]> = {
    beginner: [],
    intermediate: [],
    advanced: [],
  };

  const seen = new Set<string>();

  words.forEach((word) => {
    const text = getWordText(word);
    if (seen.has(text)) return;
    seen.add(text);

    const difficulty = word.extras?.metadata?.difficulty || "beginner";
    if (grouped[difficulty]) {
      grouped[difficulty].push({
        front: text,
        back: word.extras?.translations?.en || "",
        pronunciation: getWordTranscription(word, "rtgs") || "",
        difficulty,
        culturalNote: word.extras?.metadata?.culturalNotes,
      });
    }
  });

  return grouped;
}

interface ReaderWord {
  text: string;
  translation: string;
  pronunciation: string;
  isNew: boolean;
}

interface ReaderSentence {
  originalText: string;
  translation: string;
  words: ReaderWord[];
}

function generateReaderView(
  document: GLOSTRoot,
  knownWords: Set<string>
): ReaderSentence[] {
  return getAllSentences(document).map((sentence) => ({
    originalText: sentence.originalText,
    translation: sentence.extras?.translations?.en || "",
    words: sentence.children.filter(isGLOSTWord).map((word) => {
      const text = getWordText(word);
      return {
        text,
        translation: word.extras?.translations?.en || "",
        pronunciation: getWordTranscription(word, "rtgs") || "",
        isNew: !knownWords.has(text),
      };
    }),
  }));
}

describe("Language Learning Reader", () => {
  it("creates a lesson with translations attached to each word", () => {
    const doc = createThaiLessonDocument();
    const words = getAllWords(doc);

    expect(words.length).toBe(15);
    expect(words[0].extras?.translations?.en).toBe("hello");
  });

  it("keeps sentence-level translations too", () => {
    const doc = createThaiLessonDocument();
    const sentences = getAllSentences(doc);

    expect(sentences[0].extras?.translations?.en).toBe("Hello, how are you?");
  });

  it("processes document with extensions framework", () => {
    const doc = createThaiLessonDocument();

    // Process with empty extensions array - validates the framework works
    const result = processGLOSTWithExtensions(doc, []);

    expect(result.document).toBeDefined();
    expect(result.metadata.appliedExtensions).toEqual([]);
  });

  it("filters vocabulary for beginners", () => {
    const doc = createThaiLessonDocument();
    const beginnerWords = filterWordsByDifficulty(doc, "beginner");

    // no advanced words like ไวยากรณ์ (grammar)
    const hasGrammar = beginnerWords.some(
      (w) => getWordText(w) === "ไวยากรณ์"
    );
    expect(hasGrammar).toBe(false);
  });

  it("generates flashcards with pronunciation", () => {
    const doc = createThaiLessonDocument();
    const cards = generateFlashcards(getAllWords(doc));

    const hello = cards.find((c) => c.front === "สวัสดี");
    expect(hello?.back).toBe("hello");
    expect(hello?.pronunciation).toBe("sa-wat-di");
  });

  it("includes cultural notes when available", () => {
    const doc = createThaiLessonDocument();
    const cards = generateFlashcards(getAllWords(doc));

    const khrap = cards.find((c) => c.front === "ครับ");
    expect(khrap?.culturalNote).toContain("Males use ครับ");
  });

  it("groups vocabulary by difficulty", () => {
    const doc = createThaiLessonDocument();
    const vocab = generateVocabularyList(doc);

    expect(vocab.beginner.length).toBeGreaterThan(0);
    expect(vocab.advanced.map((c) => c.front)).toContain("ไวยากรณ์");
  });

  it("deduplicates words in vocab list", () => {
    const doc = createThaiLessonDocument();
    const vocab = generateVocabularyList(doc);

    // ไทย appears twice in the document
    const all = [...vocab.beginner, ...vocab.intermediate, ...vocab.advanced];
    const thaiCount = all.filter((c) => c.front === "ไทย").length;
    expect(thaiCount).toBe(1);
  });

  it("highlights new words in reader view", () => {
    const doc = createThaiLessonDocument();
    const known = new Set(["สวัสดี", "ครับ"]);

    const reader = generateReaderView(doc, known);

    const firstSentence = reader[0];
    const hello = firstSentence.words.find((w) => w.text === "สวัสดี");
    const sabai = firstSentence.words.find((w) => w.text === "สบาย");

    expect(hello?.isNew).toBe(false); // known
    expect(sabai?.isNew).toBe(true); // new
  });

  it("calculates learning progress", () => {
    const doc = createThaiLessonDocument();
    const known = new Set(["สวัสดี", "ครับ", "คุณ"]);

    const total = getAllWords(doc).length;
    const progress = Math.round((known.size / total) * 100);

    expect(progress).toBe(20); // 3/15 = 20%
  });

  it("works end-to-end", () => {
    const doc = createThaiLessonDocument();

    // process (with empty extensions array - focuses on testing document processing)
    const processed = processGLOSTWithExtensions(doc, []);

    // generate materials
    const beginnerCards = generateFlashcards(
      filterWordsByDifficulty(processed.document, "beginner")
    );
    const vocab = generateVocabularyList(processed.document);
    const reader = generateReaderView(
      processed.document,
      new Set(["สวัสดี"])
    );

    expect(beginnerCards.length).toBeGreaterThan(0);
    expect(Object.keys(vocab)).toEqual(["beginner", "intermediate", "advanced"]);
    expect(reader.length).toBe(3);
  });
});
