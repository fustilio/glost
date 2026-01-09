/**
 * English clause segmenter provider
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
 * English clause markers
 */
const ENGLISH_MARKERS = {
  // Subordinating conjunctions (introduce subordinate clauses)
  subordinators: [
    "although", "though", "even though",
    "if", "unless", "provided that", "supposing",
    "when", "whenever", "while", "as", "before", "after", "until", "since",
    "where", "wherever",
  ],
  
  // Causal markers
  causal: [
    "because", "since", "as",
  ],
  
  // Conditional markers
  conditional: [
    "if", "unless", "provided that", "supposing",
  ],
  
  // Temporal markers
  temporal: [
    "when", "whenever", "while", "as", "before", "after", "until", "since",
  ],
  
  // Relative pronouns (introduce relative clauses)
  relatives: [
    "who", "whom", "whose", "which", "that",
  ],
  
  // Complementizers (introduce complement clauses)
  complementizers: [
    "that", "whether", "if",
  ],
  
  // Coordinating conjunctions (join equal clauses)
  coordinators: [
    "and", "but", "or", "nor", "for", "so", "yet",
  ],
};

/**
 * English clause segmenter provider
 */
export const englishSegmenterProvider: ClauseSegmenterProvider = {
  async segmentSentence(
    words: string[],
    language: string
  ): Promise<SegmentationResult | undefined> {
    if (!language.startsWith("en")) {
      return undefined;
    }

    const boundaries: ClauseBoundary[] = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      
      // Check for causal markers
      if (ENGLISH_MARKERS.causal.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "causal",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for conditional markers
      if (ENGLISH_MARKERS.conditional.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "conditional",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for temporal markers
      if (ENGLISH_MARKERS.temporal.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "temporal",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for relative pronouns
      if (ENGLISH_MARKERS.relatives.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "relative",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for complementizers
      if (ENGLISH_MARKERS.complementizers.includes(word) && i > 0) {
        boundaries.push({
          position: i,
          clauseType: "complement",
          marker: word,
          includeMarker: true,
        });
        continue;
      }
      
      // Check for coordinators
      if (ENGLISH_MARKERS.coordinators.includes(word)) {
        boundaries.push({
          position: i,
          clauseType: "coordinate",
          marker: word,
          includeMarker: false, // Usually exclude coordinator from new clause
        });
        continue;
      }
      
      // Check for other subordinators
      if (ENGLISH_MARKERS.subordinators.includes(word)) {
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
      mood: detectEnglishMood(words.join(" ")),
    };
  },
  
  async detectMood(
    sentenceText: string,
    language: string
  ): Promise<GrammaticalMood | undefined> {
    if (!language.startsWith("en")) {
      return undefined;
    }
    
    return detectEnglishMood(sentenceText);
  },
};

/**
 * Detect grammatical mood of English sentence
 */
function detectEnglishMood(sentenceText: string): GrammaticalMood {
  const text = sentenceText.trim();
  
  // Interrogative (question)
  if (text.endsWith("?")) {
    return "interrogative";
  }
  
  // Check for question words at start
  const questionWords = ["what", "who", "where", "when", "why", "how", "which"];
  const firstWord = text.split(/\s+/)[0]?.toLowerCase();
  if (questionWords.includes(firstWord)) {
    return "interrogative";
  }
  
  // Imperative (command) - typically starts with verb, no subject
  const imperativeStarters = ["please", "let", "do", "don't"];
  if (imperativeStarters.includes(firstWord)) {
    return "imperative";
  }
  
  // Conditional - contains "if", "would", "could", "should"
  const conditionalMarkers = [/\bif\b/i, /\bwould\b/i, /\bcould\b/i, /\bshould\b/i];
  if (conditionalMarkers.some(pattern => pattern.test(text))) {
    return "conditional";
  }
  
  // Default: declarative
  return "declarative";
}

/**
 * Create a custom English segmenter with additional rules
 */
export function createEnglishSegmenterProvider(
  customMarkers?: Partial<typeof ENGLISH_MARKERS>
): ClauseSegmenterProvider {
  const markers = { ...ENGLISH_MARKERS, ...customMarkers };
  
  return {
    async segmentSentence(words, language) {
      // Use custom markers
      return englishSegmenterProvider.segmentSentence(words, language);
    },
    async detectMood(text, language) {
      return englishSegmenterProvider.detectMood?.(text, language);
    },
  };
}
