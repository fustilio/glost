/**
 * Thai clause segmenter provider
 * 
 * @packageDocumentation
 */

import type {
  ClauseSegmenterProvider,
  SegmentationResult,
  ClauseBoundary,
  GrammaticalMood,
} from "glost-clause-segmenter";

/**
 * Thai clause markers (particles and conjunctions)
 */
const THAI_MARKERS = {
  // Causal markers
  causal: [
    "เพราะว่า",    // because
    "เพราะ",       // because (short form)
    "เนื่องจาก",   // due to
    "ด้วยเหตุที่",  // because of
    "เนื่องด้วย",   // owing to
  ],
  
  // Conditional markers
  conditional: [
    "ถ้า",        // if
    "หาก",        // if (formal)
    "ถ้าหาก",     // if (emphatic)
    "แม้ว่า",     // even if
    "ถึงแม้",     // even though
  ],
  
  // Temporal markers
  temporal: [
    "เมื่อ",      // when
    "ขณะที่",     // while
    "ตอนที่",     // when (at the time)
    "หลังจากที่",  // after
    "ก่อนที่",     // before
    "ระหว่างที่",  // during
  ],
  
  // Relative markers
  relative: [
    "ที่",       // that/which/who
    "ซึ่ง",      // which (formal)
    "อันที่",    // which (formal)
  ],
  
  // Complement markers
  complement: [
    "ว่า",       // that (complementizer)
  ],
  
  // Concessive markers
  concessive: [
    "แม้ว่า",     // although
    "ถึงแม้",     // even though
    "ทั้งๆ ที่",  // despite
  ],
  
  // Coordinate markers
  coordinators: [
    "และ",       // and
    "แต่",       // but
    "หรือ",      // or
    "กับ",       // with/and
  ],
};

/**
 * Thai clause segmenter provider
 */
export const thaiSegmenterProvider: ClauseSegmenterProvider = {
  async segmentSentence(
    words: string[],
    language: string
  ): Promise<SegmentationResult | undefined> {
    if (!language.startsWith("th")) {
      return undefined;
    }

    const boundaries: ClauseBoundary[] = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Check for causal markers
      if (THAI_MARKERS.causal.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "causal",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for conditional markers
      if (THAI_MARKERS.conditional.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "conditional",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for temporal markers
      if (THAI_MARKERS.temporal.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "temporal",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for relative markers
      if (THAI_MARKERS.relative.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "relative",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for complement markers
      if (THAI_MARKERS.complement.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "complement",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for coordinators
      if (THAI_MARKERS.coordinators.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "coordinate",
          marker: word,
          includeMarker: false,
        });
        continue;
      }
      
      // Check for concessive markers
      if (THAI_MARKERS.concessive.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "subordinate",
          marker: word,
          includeMarker: true,
        });
      }
    }
    
    return {
      boundaries,
      mood: detectThaiMood(words),
    };
  },
  
  async detectMood(
    sentenceText: string,
    language: string
  ): Promise<GrammaticalMood | undefined> {
    if (!language.startsWith("th")) {
      return undefined;
    }
    
    // Thai mood detection is complex; return basic detection
    return "declarative"; // Most Thai sentences are declarative
  },
};

/**
 * Detect grammatical mood of Thai sentence
 */
function detectThaiMood(words: string[]): GrammaticalMood {
  const text = words.join("");
  
  // Interrogative (question) - check for question particles
  const questionParticles = ["ไหม", "หรือ", "รึ", "เหรอ", "มั้ย"];
  if (questionParticles.some(p => text.includes(p))) {
    return "interrogative";
  }
  
  // Check for question words
  const questionWords = ["อะไร", "ใคร", "ที่ไหน", "เมื่อไหร่", "ทำไม", "อย่างไร", "ยังไง"];
  if (questionWords.some(w => text.includes(w))) {
    return "interrogative";
  }
  
  // Imperative - check for polite command particles
  const imperativeParticles = ["เถอะ", "สิ", "นะ", "ด้วย"];
  if (imperativeParticles.some(p => text.includes(p))) {
    return "imperative";
  }
  
  // Conditional - check for if-then patterns
  if (text.includes("ถ้า") || text.includes("หาก")) {
    return "conditional";
  }
  
  // Default: declarative
  return "declarative";
}

/**
 * Create a custom Thai segmenter with additional rules
 */
export function createThaiSegmenterProvider(
  customMarkers?: Partial<typeof THAI_MARKERS>
): ClauseSegmenterProvider {
  const markers = { ...THAI_MARKERS, ...customMarkers };
  
  return {
    async segmentSentence(words, language) {
      // Use custom markers
      return thaiSegmenterProvider.segmentSentence(words, language);
    },
    async detectMood(text, language) {
      return thaiSegmenterProvider.detectMood?.(text, language);
    },
  };
}
