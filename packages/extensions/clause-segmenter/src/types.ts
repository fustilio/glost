/**
 * Types for clause segmenter extension
 * 
 * @packageDocumentation
 */

/**
 * Clause type
 */
export type ClauseType = 
  | "main" 
  | "subordinate" 
  | "relative" 
  | "causal"
  | "conditional"
  | "temporal"
  | "complement"
  | "coordinate";

/**
 * Grammatical mood
 */
export type GrammaticalMood =
  | "declarative"
  | "interrogative"
  | "imperative"
  | "conditional";

/**
 * Clause boundary detected by the segmenter
 */
export interface ClauseBoundary {
  /**
   * Position in the sentence (word index)
   */
  position: number;
  
  /**
   * Type of clause being introduced
   */
  clauseType: ClauseType;
  
  /**
   * The marker/conjunction that signals this boundary
   */
  marker: string;
  
  /**
   * Whether to include the marker in the new clause
   */
  includeMarker?: boolean;
}

/**
 * Clause segmentation result
 */
export interface SegmentationResult {
  /**
   * Detected clause boundaries
   */
  boundaries: ClauseBoundary[];
  
  /**
   * Overall sentence mood (if detected)
   */
  mood?: GrammaticalMood;
}

/**
 * Provider interface for clause segmentation rules
 * 
 * Language-specific implementations should be provided by language packages
 * (e.g., glost-en/segmenter, glost-th/segmenter)
 */
export interface ClauseSegmenterProvider {
  /**
   * Analyze a sentence and identify clause boundaries
   * 
   * @param words - Array of words in the sentence
   * @param language - Language code
   * @returns Segmentation result with detected boundaries
   */
  segmentSentence(
    words: string[],
    language: string
  ): Promise<SegmentationResult | undefined>;
  
  /**
   * Detect grammatical mood of a sentence (optional)
   * 
   * @param sentenceText - Full sentence text
   * @param language - Language code
   * @returns Grammatical mood if detectable
   */
  detectMood?(
    sentenceText: string,
    language: string
  ): Promise<GrammaticalMood | undefined>;
}
