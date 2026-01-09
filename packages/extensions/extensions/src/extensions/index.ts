/**
 * Built-in GLOST Extensions
 * 
 * Exports core extensions that don't require external data sources.
 * 
 * Moved to separate packages (install separately):
 * - Frequency → glost-frequency
 * - Difficulty → glost-difficulty
 * - POS → glost-pos
 * - Gender → glost-gender
 * - Clause Segmenter → glost-clause-segmenter
 * - Transcription → glost-transcription
 * - Translation → glost-translation
 */

export {
  CulturalNotesExtension,
  createCulturalNotesExtension,
  type CulturalNotesMetadata,
  type CulturalNotesExtensionOptions,
} from "./cultural-notes";

export {
  GenderTransformerExtension,
  createGenderTransformerExtension,
  type TargetGender,
  type GenderDisplayFormat,
  type GenderVariantData,
  type GenderTransformerOptions,
} from "./gender-transformer";

export {
  NegationTransformerExtension,
  createNegationTransformerExtension,
  type NegationType,
  type NegationData,
  type NegationTransformerOptions,
} from "./negation-transformer";

// Analyzer extensions - compute derived metrics from existing data
export {
  ReadingScoreExtension,
  createReadingScoreExtension,
  type ReadingScoreMetadata,
  type ReadingScoreOptions,
} from "./reading-score";

export {
  LearnerHintsExtension,
  createLearnerHintsExtension,
  type LearnerHintsMetadata,
  type LearnerHintsOptions,
} from "./learner-hints";

export {
  ClauseAnalysisExtension,
  createClauseAnalysisExtension,
  type ClauseAnalysisMetadata,
  type ClauseAnalysisOptions,
} from "./clause-analysis";
