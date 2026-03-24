/**
 * GloST Dialogue - Dialogue and conversation support for GloST documents
 *
 * This package provides types and utilities for creating dialogues/conversations
 * in GloST documents. It defines the dialogue syntax and helper functions for
 * building dialogue structures.
 *
 * @packageDocumentation
 */

// Types - Dialogue syntax definitions
export * from "./types/index.js";

// Utilities - Helper functions for creating dialogues
export * from "./utils/index.js";

// Backwards Compatibility - DEPRECATED exports for 0.6.0 API
export * from "./backwards-compat.js";

// Backwards compatibility - deprecated exports for 0.6.0 migration
export * from "./backwards-compat.js";
