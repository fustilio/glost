/**
 * Backwards Compatibility Layer
 *
 * Re-exports old API names for backwards compatibility with glost-dialogue 0.6.0
 *
 * DEPRECATED: These exports will be removed in the next major version.
 * Please migrate to the new API names.
 */

// Type aliases for renamed types
import type {
  GLOSTDialogue,
  DialogueParticipant,
  DialogueMetadata,
  SentenceDialogueInfo,
  GLOSTSentenceWithDialogue,
} from "./types/dialogue.js";

/**
 * @deprecated Use GLOSTDialogue instead
 * Alias kept for backwards compatibility with 0.6.0
 */
export type GLOSTDialogueRoot = GLOSTDialogue;

/**
 * @deprecated Use GLOSTSentenceWithDialogue instead
 * Alias kept for backwards compatibility with 0.6.0
 */
export type GLOSTDialogueTurn = GLOSTSentenceWithDialogue;

/**
 * @deprecated Cultural notes are no longer supported in the current API
 * This type is kept for backwards compatibility with 0.6.0
 */
export interface GLOSTCulturalNote {
  /** Note title */
  title?: string;
  /** Note content */
  content?: string;
  /** Optional category/tag */
  category?: string;
}

// Function aliases for renamed functions
import {
  createDialogueNode,
  addDialogueInfoToSentence,
  createDialogueFromTurns,
  getDialogueParticipants,
  getDialogueContext,
  getDialogueTitle,
} from "./utils/factories.js";

/**
 * @deprecated Use createDialogueNode instead
 * Alias kept for backwards compatibility with 0.6.0
 */
export const createDialogueRoot = createDialogueNode;

/**
 * @deprecated Use addDialogueInfoToSentence instead
 * Alias kept for backwards compatibility with 0.6.0
 */
export const createDialogueTurn = addDialogueInfoToSentence;

/**
 * @deprecated Cultural note creation is no longer supported in the current API
 * Stub function kept for backwards compatibility with 0.6.0
 * Returns an empty object for backwards compatibility
 */
export function createCulturalNote(): GLOSTCulturalNote {
  return {};
}

/**
 * @deprecated Gender variant parsing is no longer supported in the current API
 * Stub function kept for backwards compatibility with 0.6.0
 */
export function parseGenderVariants(text: string): { variants: string[] } {
  // Return empty result - gender variants are handled differently now
  return { variants: [] };
}

/**
 * @deprecated Gender application is no longer supported in the current API
 * Stub function kept for backwards compatibility with 0.6.0
 */
export function applyGender(
  text: string,
  _gender: "male" | "female"
): string {
  // Return original text - gender handling is done via participant config now
  return text;
}
