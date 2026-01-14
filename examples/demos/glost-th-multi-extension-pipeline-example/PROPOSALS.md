# Core System Improvement Proposals

**Based on:** Multi-Extension Pipeline Discovery Example  
**Date:** 2026-01-10  
**Status:** ✅ High-priority items IMPLEMENTED

This document provides actionable proposals to improve the GLOST core system based on real pain points discovered during multi-extension pipeline development.

## Implementation Status

✅ **Proposal 1:** Document Helper Functions - IMPLEMENTED  
✅ **Proposal 2:** Simplified Extension Processing API - IMPLEMENTED  
✅ **Proposal 3:** Node Type Constants - IMPLEMENTED  
✅ **Proposal 4:** Typed Traversal Helpers - IMPLEMENTED  
📋 **Proposal 5:** Extension Skip Reporting - DEFERRED  
📋 **Proposal 6:** Debug Mode - DEFERRED  
📋 **Proposal 7:** Generator/Enhancer Split - DEFERRED

---

## Proposal 1: Document Helper Functions ✅ IMPLEMENTED

**Priority:** HIGH  
**Effort:** LOW (1-2 hours)  
**Impact:** Immediate improvement for all users  
**Status:** ✅ Completed - Available in `glost@latest`

### Problem
Creating documents requires verbose 3-level hierarchy (Document → Paragraph → Sentence → Word), causing friction for new users and testing.

### Solution
Add helper functions to `glost/core`:

```typescript
/**
 * Create a document from words with minimal boilerplate
 * 
 * Automatically creates sentence and paragraph wrappers.
 * Perfect for testing and simple use cases.
 */
export function createSimpleDocument(
  words: GLOSTWord[],
  lang: LanguageCode,
  script?: ScriptSystem,
  options?: {
    sentenceText?: string;
    metadata?: DocumentMetadata;
  }
): GLOSTRoot {
  const scriptValue = script || inferScript(lang);
  const sentence = createSentenceFromWords(
    words,
    lang,
    scriptValue,
    options?.sentenceText
  );
  const paragraph = createParagraphFromSentences([sentence]);
  return createDocumentFromParagraphs(
    [paragraph],
    lang,
    scriptValue,
    options?.metadata
  );
}

/**
 * Create document from sentences (skip paragraph level)
 * 
 * For when you have sentences but don't care about paragraph structure.
 */
export function createDocumentFromSentences(
  sentences: GLOSTSentence[],
  lang: LanguageCode,
  script?: ScriptSystem,
  metadata?: DocumentMetadata
): GLOSTRoot {
  const scriptValue = script || inferScript(lang);
  const paragraph = createParagraphFromSentences(sentences);
  return createDocumentFromParagraphs([paragraph], lang, scriptValue, metadata);
}
```

### Files to Change
- `packages/core/src/nodes.ts` - Add functions
- `packages/core/src/index.ts` - Export functions
- `packages/core/README.md` - Document helpers
- `docs/guides/creating-documents.md` - Update examples

### Testing
Add to `packages/core/src/__tests__/nodes.test.ts`:
```typescript
describe("Document Helpers", () => {
  it("should create simple document from words", () => {
    const words = [createSimpleWord("hello", "en")];
    const doc = createSimpleDocument(words, "en");
    
    expect(doc.type).toBe("RootNode");
    expect(doc.children.length).toBe(1);
    expect(doc.children[0].children.length).toBe(1);
  });
});
```

---

## Proposal 2: Simplified Extension Processing API ✅ IMPLEMENTED

**Priority:** HIGH  
**Effort:** MEDIUM (3-4 hours)  
**Impact:** Major ergonomic improvement  
**Status:** ✅ Completed - Available in `glost-plugins@latest`

### Problem
`processGLOSTWithExtensionsAsync` returns `{document, metadata}` wrapper, not the document directly. This is surprising and causes confusion.

### Solution
Add simpler API alongside existing one:

```typescript
/**
 * Process document with extensions (simple version)
 * 
 * Returns processed document directly.
 * Use processGLOSTWithMeta() if you need detailed metadata.
 * 
 * @param document - Document to process
 * @param extensions - Extensions to apply
 * @param options - Processing options
 * @returns Processed document
 */
export async function processGLOST(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: ProcessorOptions
): Promise<GLOSTRoot> {
  const result = await processGLOSTWithExtensionsAsync(
    document,
    extensions,
    options
  );
  return result.document;
}

/**
 * Process with detailed metadata (renamed for clarity)
 * 
 * Alias for processGLOSTWithExtensionsAsync with clearer name.
 */
export async function processGLOSTWithMeta(
  document: GLOSTRoot,
  extensions: GLOSTExtension[],
  options?: ProcessorOptions
): Promise<ExtensionResult> {
  return processGLOSTWithExtensionsAsync(document, extensions, options);
}

// Keep existing function for backwards compatibility
// but mark as deprecated in favor of processGLOSTWithMeta
```

### Migration Strategy
1. Add new functions in v0.5.0
2. Update all examples to use `processGLOST()`
3. Document `processGLOSTWithMeta()` for advanced usage
4. Deprecate `processGLOSTWithExtensionsAsync` in v0.6.0
5. Remove deprecated function in v1.0.0

### Files to Change
- `packages/extensions/extensions/src/processor.ts` - Add functions
- `packages/extensions/extensions/src/index.ts` - Export
- `docs/guides/using-extensions.md` - Update examples
- All example files - Switch to new API

---

## Proposal 3: Node Type Constants

**Priority:** MEDIUM  
**Effort:** LOW (30 minutes)  
**Impact:** Better type safety and discoverability

### Problem
Node type strings (`"WordNode"`, `"SentenceNode"`, etc.) are magic strings scattered through code, leading to typos and confusion.

### Solution
Export type constants:

```typescript
/**
 * Standard GLOST node types
 * 
 * Use these constants instead of string literals for type checking.
 */
export const NODE_TYPES = {
  ROOT: "RootNode",
  PARAGRAPH: "ParagraphNode",
  SENTENCE: "SentenceNode",
  WORD: "WordNode",
  TEXT: "TextNode",
  WHITESPACE: "WhitespaceNode",
  PUNCTUATION: "PunctuationNode",
  CLAUSE: "ClauseNode",
  PHRASE: "PhraseNode",
  SYLLABLE: "SyllableNode",
  CHARACTER: "CharacterNode",
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];
```

### Usage
```typescript
// Before:
if (node.type === "WordNode") { ... }

// After:
import { NODE_TYPES } from "glost";
if (node.type === NODE_TYPES.WORD) { ... }

// With autocomplete and type safety!
```

### Files to Change
- `packages/core/src/types.ts` - Add constants
- `packages/core/src/index.ts` - Export
- `packages/core/src/guards.ts` - Use constants
- Update examples to use constants

---

## Proposal 4: Extension Skip Reporting

**Priority:** MEDIUM  
**Effort:** MEDIUM (2-3 hours)  
**Impact:** Better debugging experience

### Problem
Extensions silently skip nodes when data exists or lookups fail. No visibility into why extensions didn't apply.

### Solution
Add detailed skip reporting to metadata:

```typescript
interface ExtensionResult {
  document: GLOSTRoot;
  metadata: {
    appliedExtensions: string[];
    skippedExtensions: string[];
    errors: Array<{ extensionId: string; error: Error }>;
    // NEW: Detailed skip information
    skipDetails: Array<{
      extensionId: string;
      nodeType: string;
      nodeText: string;
      reason: SkipReason;
      location?: string; // e.g., "paragraph 1, sentence 2, word 3"
    }>;
  };
}

type SkipReason =
  | "data-exists"           // Node already has the data
  | "lookup-failed"         // Provider returned undefined
  | "validation-failed"     // Node validation failed
  | "wrong-language"        // Node language doesn't match
  | "provider-error";       // Provider threw error
```

### Files to Change
- `packages/extensions/extensions/src/types.ts` - Add types
- `packages/extensions/extensions/src/processor.ts` - Track skips
- Extension implementations - Report skip reasons
- Add `options.reportSkips: boolean` flag (default: false for performance)

---

## Proposal 5: Typed Document Traversal Helpers

**Priority:** MEDIUM  
**Effort:** LOW (1-2 hours)  
**Impact:** Better TypeScript experience

### Problem
Traversing document after processing requires type assertions and loses type safety.

### Solution
Add typed helper functions:

```typescript
/**
 * Get all words from document with proper typing
 */
export function getAllWords(document: GLOSTRoot): GLOSTWord[] {
  const words: GLOSTWord[] = [];
  visit(document, {
    word: (node) => {
      words.push(node);
    }
  });
  return words;
}

/**
 * Get first word from document
 */
export function getFirstWord(document: GLOSTRoot): GLOSTWord | undefined {
  let firstWord: GLOSTWord | undefined;
  visit(document, {
    word: (node) => {
      if (!firstWord) firstWord = node;
      return SKIP; // Stop traversal
    }
  });
  return firstWord;
}

/**
 * Get word at specific path
 */
export function getWordAtPath(
  document: GLOSTRoot,
  path: { paragraph: number; sentence: number; word: number }
): GLOSTWord | undefined {
  const { paragraph: pIdx, sentence: sIdx, word: wIdx } = path;
  const para = document.children[pIdx];
  if (!para || para.type !== NODE_TYPES.PARAGRAPH) return undefined;
  
  const sent = para.children[sIdx];
  if (!sent || sent.type !== NODE_TYPES.SENTENCE) return undefined;
  
  const word = sent.children[wIdx];
  if (!word || word.type !== NODE_TYPES.WORD) return undefined;
  
  return word;
}
```

### Files to Change
- `packages/core/src/utils.ts` - Add helpers
- `packages/core/src/index.ts` - Export
- Update examples to use helpers

---

## Proposal 6: Debug Mode for Extensions

**Priority:** LOW  
**Effort:** MEDIUM (2-3 hours)  
**Impact:** Better development experience

### Problem
Hard to see what extensions are doing during processing.

### Solution
Add debug mode:

```typescript
// Enable debug logging
const result = await processGLOST(doc, extensions, {
  debug: true,  // NEW option
  debugLogger: console.log  // Custom logger (default: console.log)
});

// Output:
// [transcription] Processing word "คน"
// [transcription] ✓ Added transcriptions: rtgs, ipa
// [translation] Processing word "คน"
// [translation] ✓ Added translation: "person"
// [frequency] Processing word "คน"
// [frequency] ✗ Skipped: data already exists
```

### Implementation
```typescript
interface ProcessorOptions {
  // ... existing options
  debug?: boolean;
  debugLogger?: (message: string) => void;
}
```

### Files to Change
- `packages/extensions/extensions/src/types.ts` - Add option
- `packages/extensions/extensions/src/processor.ts` - Add logging
- Extension implementations - Add debug logs

---

## Proposal 7: Reconsider Generator/Enhancer Split

**Priority:** LOW  
**Effort:** HIGH (requires design discussion)  
**Impact:** Simplified API for specific extensions

### Problem
Frequency extension returns **two** extensions `[generator, enhancer]`. This is non-obvious and requires array spreading.

### Questions to Discuss
1. Why are they separate? (Likely: allow custom enhancers)
2. Do users actually need to swap enhancers?
3. Could enhancer be optional/automatic?

### Possible Solutions

**Option A:** Merge into single extension with option
```typescript
createFrequencyExtension({
  provider,
  enhance: true  // Default: true
});
```

**Option B:** Keep split but make it clearer
```typescript
// Returns object with named extensions
const { generator, enhancer } = createFrequencyExtensions({
  provider
});

const pipeline = [generator, enhancer];
```

**Option C:** Auto-enhance by default
```typescript
// Returns single extension that does both
const freqExt = createFrequencyExtension({ provider });

// For advanced users who want custom enhancement:
const freqGen = createFrequencyGenerator({ provider });
const customEnh = createFrequencyEnhancer({ customMapping });
```

**Recommendation:** Need team discussion. Option C seems cleanest.

---

## Implementation Priority

### Phase 1: Quick Wins (Week 1)
- ✅ Proposal 1: Document helpers
- ✅ Proposal 3: Node type constants
- ✅ Proposal 5: Traversal helpers

**Impact:** Immediate improvement, low risk

### Phase 2: API Improvements (Week 2-3)
- ✅ Proposal 2: Simplified processing API
- ✅ Proposal 4: Skip reporting

**Impact:** Major ergonomic improvement

### Phase 3: Developer Experience (Week 4+)
- ✅ Proposal 6: Debug mode
- 🤔 Proposal 7: Generator/enhancer discussion

**Impact:** Better DX, needs design consideration

---

## Success Metrics

After implementing these proposals, we should see:

1. **Reduced boilerplate** - Examples become 30-50% shorter
2. **Fewer GitHub issues** - Less confusion about API usage
3. **Better test coverage** - Easier to write tests
4. **Faster onboarding** - New contributors productive faster
5. **More community packages** - Lower barrier to creating extensions

---

## Next Steps

1. **Review proposals** with core team
2. **Prioritize** based on user feedback
3. **Create GitHub issues** for accepted proposals
4. **Implement** in priority order
5. **Update docs** as we go
6. **Gather feedback** from community

---

## Conclusion

These proposals are **informed by real usage** through building the multi-extension pipeline example. They address actual pain points, not theoretical problems.

The proposals are **incremental and backwards-compatible** where possible, allowing gradual adoption.

Most importantly, they maintain GLOST's core strengths (composability, type safety, performance) while improving the developer experience.

