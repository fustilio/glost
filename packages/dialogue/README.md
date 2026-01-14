# glost-dialogue

Dialogue and conversation support for GloST documents.

## Installation

```bash
npm install glost-dialogue glost
```

For React components:
```bash
npm install glost-dialogue glost react
```

## Features

- **Dialogue Nodes**: Group sentences into conversations
- **Speaker Attribution**: Track who said what
- **Participant Management**: Define conversation participants with roles
- **React Components**: Ready-to-use components for rendering dialogues
- **Chat-style Rendering**: Automatic alignment based on speaker roles

## Quick Start

### Creating a Dialogue

```typescript
import { createDialogueFromTurns, createSentenceFromWords } from "glost-dialogue";
import { createThaiWord } from "glost";

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

### Rendering with React

```tsx
import { DialogueContainer, DialogueTurn } from "glost-dialogue/react";
import { GloSTSentence } from "glost-react";

function DialogueExample({ dialogue }) {
  const participants = dialogue.extras?.dialogue?.participants ?? [];

  return (
    <DialogueContainer dialogue={dialogue} showParticipants>
      {dialogue.children.map((sentence, index) => (
        <DialogueTurn
          key={index}
          sentence={sentence}
          participants={participants}
          align="auto"
          showSpeaker
        >
          <GloSTSentence
            sentence={sentence}
            displayLevel={2}
            transcriptionSystem="paiboon+"
          />
        </DialogueTurn>
      ))}
    </DialogueContainer>
  );
}
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

## React Components

### DialogueContainer

Wraps dialogue content with optional header and participants list.

```tsx
<DialogueContainer
  dialogue={dialogue}
  showParticipants
  renderHeader={(title, context) => (
    <h3>{title} — {context}</h3>
  )}
>
  {children}
</DialogueContainer>
```

### DialogueTurn

Renders a single conversation turn with speaker label and chat-bubble styling.

```tsx
<DialogueTurn
  sentence={sentence}
  participants={participants}
  align="auto"      // "left" | "right" | "auto"
  showSpeaker
  renderSpeaker={(speaker, info) => (
    <span className="speaker">{speaker}</span>
  )}
>
  {sentenceContent}
</DialogueTurn>
```

**Auto-alignment**: When `align="auto"`, turns from roles like "me", "you", "customer", "learner" align right; others align left.

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

## License

MIT
