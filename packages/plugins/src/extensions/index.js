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
export { CulturalNotesExtension, createCulturalNotesExtension, } from "./cultural-notes.js";
export { GenderTransformerExtension, createGenderTransformerExtension, } from "./gender-transformer.js";
export { NegationTransformerExtension, createNegationTransformerExtension, } from "./negation-transformer.js";
// Analyzer extensions - compute derived metrics from existing data
export { ReadingScoreExtension, createReadingScoreExtension, } from "./reading-score.js";
export { LearnerHintsExtension, createLearnerHintsExtension, } from "./learner-hints.js";
export { ClauseAnalysisExtension, createClauseAnalysisExtension, } from "./clause-analysis.js";
//# sourceMappingURL=index.js.map