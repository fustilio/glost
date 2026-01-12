/**
 * Japanese Extension Providers
 * 
 * @packageDocumentation
 */

// Transcription
export { 
  JapaneseTranscriptionProvider,
  createJapaneseTranscriptionProvider,
  japaneseTranscriptionProvider,
  type JapaneseTranscriptionProviderOptions,
  type JapaneseTranscriptionData
} from "./transcription.js";

// Translation
export {
  JapaneseTranslationProvider,
  createJapaneseTranslationProvider,
  japaneseTranslationProvider,
  type JapaneseTranslationProviderOptions,
  type JapaneseTranslationData
} from "./translation.js";

// Frequency
export {
  JapaneseFrequencyProvider,
  createJapaneseFrequencyProvider,
  japaneseFrequencyProvider,
  type JapaneseFrequencyProviderOptions,
  type JapaneseFrequencyData
} from "./frequency.js";

// Difficulty
export {
  JapaneseDifficultyProvider,
  createJapaneseDifficultyProvider,
  japaneseDifficultyProvider,
  type JapaneseDifficultyProviderOptions,
  type JapaneseDifficultyData
} from "./difficulty.js";

// Part of Speech
export {
  JapanesePOSProvider,
  createJapanesePOSProvider,
  japanesePOSProvider,
  type JapanesePOSProviderOptions,
  type JapanesePOSData
} from "./pos.js";
