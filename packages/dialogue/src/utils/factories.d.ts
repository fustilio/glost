/**
 * Factory functions for creating dialogue nodes and sentences
 */
import type { GLOSTSentence } from "glost";
import type { GLOSTDialogue, DialogueParticipant, SentenceDialogueInfo, GLOSTSentenceWithDialogue } from "../types/dialogue.js";
/**
 * Options for creating a dialogue node
 */
export interface CreateDialogueOptions {
    /** Child sentences that form the dialogue */
    children: GLOSTSentence[];
    /** Language code */
    lang?: string;
    /** Script system */
    script?: string;
    /** Participants in the conversation */
    participants?: DialogueParticipant[];
    /** Context/scenario description */
    context?: string;
    /** Title of the dialogue */
    title?: string;
    /** Difficulty level */
    difficulty?: "beginner" | "intermediate" | "advanced";
}
/**
 * Create a GloST Dialogue Node
 *
 * @example
 * ```ts
 * const dialogue = createDialogueNode({
 *   children: [sentence1, sentence2],
 *   lang: "th-TH",
 *   participants: [
 *     { id: "customer", name: "You" },
 *     { id: "shopkeeper", name: "Shopkeeper" }
 *   ],
 *   context: "Ordering coffee"
 * });
 * ```
 */
export declare function createDialogueNode(options: CreateDialogueOptions): GLOSTDialogue;
/**
 * Options for adding dialogue info to a sentence
 */
export interface AddDialogueInfoOptions {
    /** Participant ID who spoke this sentence */
    role: string;
    /** Display name of the speaker (optional, can be looked up from participants) */
    speaker?: string;
    /** Position in the conversation (0-indexed) */
    turnIndex?: number;
    /** Emotion/tone */
    emotion?: SentenceDialogueInfo["emotion"];
}
/**
 * Add dialogue info to a sentence
 *
 * @example
 * ```ts
 * const sentenceWithDialogue = addDialogueInfoToSentence(sentence, {
 *   role: "customer",
 *   speaker: "You",
 *   turnIndex: 0
 * });
 * ```
 */
export declare function addDialogueInfoToSentence(sentence: GLOSTSentence, dialogueInfo: AddDialogueInfoOptions): GLOSTSentenceWithDialogue;
/**
 * Create a complete dialogue from a list of turns
 *
 * @example
 * ```ts
 * const dialogue = createDialogueFromTurns({
 *   lang: "th-TH",
 *   participants: [
 *     { id: "A", name: "Customer" },
 *     { id: "B", name: "Shopkeeper" }
 *   ],
 *   context: "Buying fruit at the market",
 *   turns: [
 *     { role: "A", sentence: sentence1 },
 *     { role: "B", sentence: sentence2 },
 *     { role: "A", sentence: sentence3 },
 *   ]
 * });
 * ```
 */
export declare function createDialogueFromTurns(options: {
    lang?: string;
    script?: string;
    participants: DialogueParticipant[];
    context?: string;
    title?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    turns: Array<{
        role: string;
        sentence: GLOSTSentence;
        emotion?: SentenceDialogueInfo["emotion"];
    }>;
}): GLOSTDialogue;
/**
 * Get all participants from a dialogue
 */
export declare function getDialogueParticipants(dialogue: GLOSTDialogue): DialogueParticipant[];
/**
 * Get dialogue context
 */
export declare function getDialogueContext(dialogue: GLOSTDialogue): string | undefined;
/**
 * Get dialogue title
 */
export declare function getDialogueTitle(dialogue: GLOSTDialogue): string | undefined;
//# sourceMappingURL=factories.d.ts.map