/**
 * Multi-Extension Pipeline Thai Example
 * 
 * Main entry point for the multi-extension pipeline example.
 * Exports all extensions and utilities for testing composition.
 */

// Export demo data
export * from "./demo-data/transcription-data.js";
export * from "./demo-data/translation-data.js";
export * from "./demo-data/frequency-data.js";

// Export extensions
export * from "./extensions/thai-transcription.js";
export * from "./extensions/thai-translation.js";
export * from "./extensions/thai-frequency.js";

// Export pipeline utilities
export * from "./pipeline.js";
