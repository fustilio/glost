/**
 * Thai Extension Providers
 * 
 * This module exports extension providers for Thai language.
 * These are skeleton implementations to be replaced with actual Thai language data.
 * 
 * @packageDocumentation
 */

export {
  createThaiFrequencyProvider,
  type ThaiFrequencyProviderOptions,
} from "./frequency.js";

export { thaiTranscriptionProvider } from "./transcription.js";
export { thaiTranslationProvider } from "./translation.js";

// TODO: Add other Thai providers as needed:
// - createThaiPOSProvider
// - createThaiDifficultyProvider
// - etc.
