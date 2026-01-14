# glost-dialogue

Dialogue syntax and helper functions for GloST documents.

## Installation

```bash
npm install glost-dialogue glost
```

## Features

- **Dialogue Nodes**: Group sentences into conversations
- **Speaker Attribution**: Track who said what
- **Participant Management**: Define conversation participants with roles
- **Type Guards**: Utilities for checking dialogue node types
- **Factory Functions**: Easy creation of dialogue structures

## Quick Start

### Creating a Dialogue

```typescript
import { createDialogueFromTurns } from "glost-dialogue";
import { createSentenceFromWords, createThaiWord } from "glost";

// Define participants
const participants = [
  { id: "customer", name: "You", role: "customer" },
  { id: "shopkeeper", name: "Shopkeeper", role: "vendor" },
];

// Create sentences for each turn
const sentence1 = createSentenceFromWords([
  createThaiWord({ text: "สวัสดี", translation: "hello" }),
  createThaiWord({ text: "ครับ", translation: "(polite particle)" }),
], "th", "thai");

const sentence2 = createSentenceFromWords([
  createThaiWord({ text: "สวัสดี", translation: "hello" }),
  createThaiWord({ text: "ค่ะ", translation: "(polite particle)" }),
], "th", "thai");

// Create dialogue
const dialogue = createDialogueFromTurns({
  lang: "th-TH",
  participants,
  context: "Greeting at a shop",
  turns: [
    { role: "customer", sentence: sentence1 },
    { role: "shopkeeper", sentence: sentence2 },
  ],
});
```

## Types

### DialogueParticipant

```typescript
interface DialogueParticipant {
  id: string;        // Unique identifier
  name?: string;     // Display name
  gender?: "male" | "female";  // For TTS
  role?: string;     // Role description
  avatar?: string;   // Optional avatar URL
}
```

### GLOSTDialogue

```typescript
interface GLOSTDialogue {
  type: "DialogueNode";
  children: GLOSTSentence[];
  lang?: string;
  script?: string;
  extras?: {
    dialogue?: {
      participants?: DialogueParticipant[];
      context?: string;
      title?: string;
      difficulty?: "beginner" | "intermediate" | "advanced";
    };
  };
}
```

### SentenceDialogueInfo

```typescript
interface SentenceDialogueInfo {
  role: string;           // Participant ID
  speaker?: string;       // Display name
  turnIndex?: number;     // Position in conversation
  emotion?: "neutral" | "happy" | "sad" | "angry" | "surprised" | "questioning";
}
```

## Utilities

### Creating Dialogues

```typescript
import {
  createDialogueNode,
  createDialogueFromTurns,
  addDialogueInfoToSentence,
} from "glost-dialogue";

// Simple dialogue node
const dialogue = createDialogueNode({
  children: [sentence1, sentence2],
  participants: [{ id: "A" }, { id: "B" }],
  context: "Greeting",
});

// From turns (auto-assigns turn indices)
const dialogue = createDialogueFromTurns({
  participants,
  turns: [
    { role: "A", sentence: s1 },
    { role: "B", sentence: s2 },
  ],
});

// Add dialogue info to existing sentence
const sentenceWithInfo = addDialogueInfoToSentence(sentence, {
  role: "customer",
  speaker: "You",
  turnIndex: 0,
});
```

### Type Guards

```typescript
import { isDialogueNode, hasSentenceDialogueInfo } from "glost-dialogue";

if (isDialogueNode(node)) {
  // node is GLOSTDialogue
}

if (hasSentenceDialogueInfo(sentence)) {
  // sentence has dialogue extras
}
```

### Accessors

```typescript
import {
  getDialogueParticipants,
  getDialogueContext,
  getDialogueTitle,
  getSentenceSpeaker,
} from "glost-dialogue";

const participants = getDialogueParticipants(dialogue);
const context = getDialogueContext(dialogue);
const speaker = getSentenceSpeaker(sentence, participants);
```

## Use Cases

### Language Learning Dialogues

Perfect for interactive language learning scenarios:
- Restaurant ordering
- Shopping conversations
- Asking for directions
- Greetings and introductions

### Conversation Practice

Enable learners to:
- See speaker attribution
- Practice both roles
- Understand context
- Follow turn-taking

## Rendering Dialogues

This package provides the data structures and utilities for dialogues. For rendering, use your preferred UI framework with the exported types and accessors:

```typescript
import {
  GLOSTDialogue,
  getDialogueParticipants,
  getSentenceSpeaker,
  hasSentenceDialogueInfo,
} from "glost-dialogue";

// Example: Render dialogue in any framework
function renderDialogue(dialogue: GLOSTDialogue) {
  const participants = getDialogueParticipants(dialogue);

  return dialogue.children.map((sentence, index) => {
    const speaker = getSentenceSpeaker(sentence, participants);
    const dialogueInfo = hasSentenceDialogueInfo(sentence)
      ? sentence.extras?.dialogue
      : undefined;

    return {
      speaker,
      turnIndex: dialogueInfo?.turnIndex ?? index,
      emotion: dialogueInfo?.emotion,
      role: dialogueInfo?.role,
      // ... render sentence content
    };
  });
}
```

## License

MIT
