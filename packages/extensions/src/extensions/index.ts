/**
 * Built-in GLOST Extensions
 * 
 * Exports all built-in extensions for easy importing.
 */

export {
  FrequencyExtension,
  createFrequencyExtension,
  type FrequencyLevel,
  type FrequencyMetadata,
  type FrequencyExtensionOptions,
} from "./frequency";

export {
  DifficultyExtension,
  createDifficultyExtension,
  type DifficultyLevel,
  type DifficultyMetadata,
  type DifficultyExtensionOptions,
} from "./difficulty";

export {
  PartOfSpeechExtension,
  createPartOfSpeechExtension,
  type PartOfSpeechMetadata,
  type PartOfSpeechExtensionOptions,
} from "./part-of-speech";

export {
  CulturalNotesExtension,
  createCulturalNotesExtension,
  type CulturalNotesMetadata,
  type CulturalNotesExtensionOptions,
} from "./cultural-notes";

export {
  GenderExtension,
  createGenderExtension,
  type GenderType,
  type GenderMetadata,
  type GenderExtensionOptions,
} from "./gender";

// Note: Transcription and Translation extensions have been moved to separate packages:
// - glost-extensions-transcription
// - glost-extensions-translation

export {
  GenderTransformerExtension,
  createGenderTransformerExtension,
  type TargetGender,
  type GenderDisplayFormat,
  type GenderVariantData,
  type GenderTransformerOptions,
} from "./gender-transformer";

export {
  ClauseSegmenterExtension,
  createClauseSegmenterExtension,
  type ClauseType,
  type GrammaticalMood,
  type ClauseSegmenterOptions,
} from "./clause-segmenter";

export {
  NegationTransformerExtension,
  createNegationTransformerExtension,
  type NegationType,
  type NegationData,
  type NegationTransformerOptions,
} from "./negation-transformer";

