/**
 * Thai Extension Providers
 * 
 * This module exports extension providers for Thai language.
 * These are skeleton implementations to be replaced with actual Thai language data.
 * 
 * @packageDocumentation
 */

// Transcription
export { 
  ThaiTranscriptionProvider,
  createThaiTranscriptionProvider,
  thaiTranscriptionProvider,
  type ThaiTranscriptionProviderOptions,
  type ThaiTranscriptionData
} from "./transcription.js";

// Translation
export {
  ThaiTranslationProvider,
  createThaiTranslationProvider,
  thaiTranslationProvider,
  type ThaiTranslationProviderOptions,
  type ThaiTranslationData
} from "./translation.js";

// Frequency
export {
  ThaiFrequencyProvider,
  createThaiFrequencyProvider,
  thaiFrequencyProvider,
  type ThaiFrequencyProviderOptions,
  type ThaiFrequencyData
} from "./frequency.js";

// Difficulty
export {
  ThaiDifficultyProvider,
  createThaiDifficultyProvider,
  thaiDifficultyProvider,
  type ThaiDifficultyProviderOptions,
  type ThaiDifficultyData
} from "./difficulty.js";

// Part of Speech
export {
  ThaiPOSProvider,
  createThaiPOSProvider,
  thaiPOSProvider,
  type ThaiPOSProviderOptions,
  type ThaiPOSData
} from "./pos.js";

