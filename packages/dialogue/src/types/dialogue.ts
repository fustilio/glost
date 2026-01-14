/**
 * GloST Dialogue Types
 *
 * Extended types for dialogue/conversation support in GloST documents.
 * Dialogues allow grouping sentences into conversations with speaker
 * attribution and context.
 */

import type { GLOSTExtras, GLOSTSentence } from "glost";

/**
 * Participant in a dialogue/conversation
 *
 * @example
 * ```ts
 * const customer: DialogueParticipant = {
 *   id: "customer",
 *   name: "You",
 *   gender: "male",
 *   role: "customer"
 * };
 *
 * const shopkeeper: DialogueParticipant = {
 *   id: "shopkeeper",
 *   name: "Shopkeeper",
 *   gender: "female",
 *   role: "shopkeeper"
 * };
 * ```
 */
export interface DialogueParticipant {
  /** Unique identifier (e.g., "me", "other", "speaker1") */
  id: string;
  /** Display name (e.g., "You", "Shopkeeper", "John") */
  name?: string;
  /** Gender for TTS voice selection */
  gender?: "male" | "female";
  /** Role description (e.g., "customer", "shopkeeper", "teacher") */
  role?: string;
  /** Optional avatar or icon URL */
  avatar?: string;
}

/**
 * Dialogue metadata stored in extras
 */
export interface DialogueMetadata {
  /** Participants in the conversation */
  participants?: DialogueParticipant[];
  /** Context/scenario of the dialogue (e.g., "greeting", "shopping", "directions") */
  context?: string;
  /** Title of the dialogue */
  title?: string;
  /** Difficulty level for language learning */
  difficulty?: "beginner" | "intermediate" | "advanced";
}

/**
 * Sentence-level dialogue information
 *
 * Attached to individual sentences to indicate who spoke them
 * and their position in the conversation.
 */
export interface SentenceDialogueInfo {
  /** Participant ID who spoke this sentence */
  role: string;
  /** Display name of the speaker */
  speaker?: string;
  /** Position in the conversation (0-indexed) */
  turnIndex?: number;
  /** Emotion/tone of the utterance */
  emotion?: "neutral" | "happy" | "sad" | "angry" | "surprised" | "questioning";
}

/**
 * Extended GloST Sentence with dialogue support
 */
export type GLOSTSentenceWithDialogue = GLOSTSentence & {
  extras?: GLOSTExtras & {
    dialogue?: SentenceDialogueInfo;
  };
};

/**
 * GloST Dialogue Node
 *
 * Groups multiple sentences that form a conversation/dialogue.
 * This extends the GloST hierarchy:
 *
 * ```
 * RootNode
 *   └─ ParagraphNode
 *       └─ DialogueNode      ← This node
 *           └─ SentenceNode
 *               └─ WordNode
 * ```
 *
 * @example
 * ```ts
 * const dialogue: GLOSTDialogue = {
 *   type: "DialogueNode",
 *   children: [sentence1, sentence2, sentence3],
 *   lang: "th-TH",
 *   extras: {
 *     dialogue: {
 *       participants: [customer, shopkeeper],
 *       context: "Ordering coffee at a café"
 *     }
 *   }
 * };
 * ```
 */
export interface GLOSTDialogue {
  type: "DialogueNode";
  /** Child sentences that form the dialogue */
  children: GLOSTSentence[];
  /** Language code (inherited from parent or set explicitly) */
  lang?: string;
  /** Script system */
  script?: string;
  /** Dialogue-specific metadata */
  extras?: GLOSTExtras & {
    dialogue?: DialogueMetadata;
  };
}

/**
 * Type guard to check if a node is a DialogueNode
 */
export function isDialogueNode(node: unknown): node is GLOSTDialogue {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    (node as { type: string }).type === "DialogueNode"
  );
}

/**
 * Type guard to check if a sentence has dialogue info
 */
export function hasSentenceDialogueInfo(
  sentence: GLOSTSentence
): sentence is GLOSTSentenceWithDialogue {
  return !!(sentence as GLOSTSentenceWithDialogue).extras?.dialogue;
}

/**
 * Get the speaker name for a sentence
 */
export function getSentenceSpeaker(
  sentence: GLOSTSentence,
  participants?: DialogueParticipant[]
): string | undefined {
  const dialogueInfo = (sentence as GLOSTSentenceWithDialogue).extras?.dialogue;
  if (!dialogueInfo) return undefined;

  // Try speaker name first
  if (dialogueInfo.speaker) return dialogueInfo.speaker;

  // Look up from participants by role
  if (participants && dialogueInfo.role) {
    const participant = participants.find((p) => p.id === dialogueInfo.role);
    return participant?.name;
  }

  return undefined;
}
