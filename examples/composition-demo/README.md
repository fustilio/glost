# GLOST Extension Composition Demo

Interactive demonstration of how GLOST extensions compose together to create powerful features.

## What This Demonstrates

### Extension Composition Pattern

```
┌──────────────────────────┐
│  en-transcription-ipa    │  ← GENERATOR
│  Provides: IPA           │     Creates IPA data from dictionary
└────────────┬─────────────┘
             │
             │ IPA data flows down
             ↓
┌──────────────────────────┐
│  en-ipa-to-phonemic      │  ← ENHANCER
│  Requires: IPA           │     Transforms IPA into phonemic
│  Provides: Respelling    │     respelling
└──────────────────────────┘
```

### Key Concepts

1. **Extension Dependencies**
   - `en-ipa-to-phonemic` **requires** `en-transcription-ipa`
   - If IPA isn't available, phonemic extension throws `ExtensionDependencyError`
   - Extensions must run in the correct order

2. **Data Flow**
   - Generator creates data (`IPA transcription`)
   - Enhancer transforms data (`IPA → phonemic respelling`)
   - Data flows through the pipeline

3. **Modular Design**
   - Each extension has a single responsibility
   - Extensions can be toggled on/off independently
   - New extensions can be added to the pipeline

## Running the Demo

```bash
cd examples/composition-demo
npm install
npm run dev
```

Open `http://localhost:3002`

## Try This

### 1. Both Extensions Enabled (Default)

Input: `ecclesiastical`

Output:
```
Word: ecclesiastical
IPA: /ɪˌkliː.ziˈæs.tɪk.əl/
→ ih-KLEE-zee-AS-tik-uhl
```

Both extensions working together!

### 2. Turn Off "Show Phonemic"

Input: `ecclesiastical`

Output:
```
Word: ecclesiastical
IPA: /ɪˌkliː.ziˈæs.tɪk.əl/
```

Only IPA extension runs (generator can work standalone).

### 3. Turn Off "Show IPA" but Keep "Show Phonemic" ON

Input: `ecclesiastical`

Output:
```
❌ Extension Dependency Error
IPA transcription must be available. Ensure en-transcription-ipa (or similar) runs first.

💡 Turn on "Show IPA" to provide the data that "Show Phonemic" needs!
```

Enhancer can't work without its dependency!

### 4. Both Extensions Off

Input: `ecclesiastical`

Output:
```
Word: ecclesiastical
```

Just the raw word, no extensions.

## Interesting Words to Try

- `ecclesiastical` - Long word with complex stress pattern
- `worcestershire` - Silent letters, unexpected pronunciation
- `colonel` - Pronounced "KER-nuhl" (nothing like spelling!)
- `queue` - 4 silent letters (q, ue, ue)
- `knight` - Silent 'k' and 'gh'
- `subtle` - Silent 'b'
- `psychology` - Silent 'p'
- `pneumonia` - Silent 'p'

## What You'll Learn

1. **Extension Composition**
   - How extensions build on each other
   - Data dependencies between extensions
   - Pipeline architecture

2. **GENERATOR vs ENHANCER**
   - Generators create new data
   - Enhancers transform existing data
   - Different roles in the pipeline

3. **Error Handling**
   - Dependency errors
   - Graceful degradation
   - User-friendly error messages

4. **Real-World Architecture**
   - Modular design
   - Single responsibility
   - Composable components

## Extension Packages Used

- [`@examples/en-transcription-ipa`](../extensions/languages/en/en-transcription-ipa/) - IPA generator
- [`@examples/en-ipa-to-phonemic`](../extensions/languages/en/en-ipa-to-phonemic/) - Phonemic enhancer

## Architecture Insights

### Why This Matters

This demo shows the **power of composition**:

✅ **Reusable** - IPA extension can be used alone or with phonemic  
✅ **Testable** - Each extension can be tested independently  
✅ **Extensible** - Add new extensions to the pipeline easily  
✅ **Maintainable** - Each extension has clear responsibility  

### Real-World Applications

This pattern applies to all GLOST extensions:

```
[FrequencyExtension] → Provides frequency data
          ↓
[DifficultyExtension] → Uses frequency to assess difficulty
          ↓
[ColorCodeExtension] → Uses difficulty to color words
```

Or:

```
[POSExtension] → Provides part-of-speech tags
          ↓
[GrammarHighlighter] → Uses POS to highlight verbs/nouns
```

Or:

```
[TranscriptionExtension] → Provides romanization
          ↓
[AudioGeneratorExtension] → Uses romanization for TTS
```

## Code Structure

```
composition-demo/
  src/
    main.ts              # Demo implementation
  index.html             # UI with pipeline visualization
  package.json           # Dependencies
  README.md              # This file
```

## Next Steps

After exploring this demo:

1. **Read the extension source code**
   - See how generators provide data
   - See how enhancers require data
   - Understand the interfaces

2. **Create your own extension**
   - Build a generator (creates data)
   - Build an enhancer (transforms data)
   - Compose with existing extensions

3. **Explore other demos**
   - `examples/frequency-demo` - Vocabulary analysis
   - `examples/pos-demo` - Grammar visualization
   - `examples/transcription` - Original transcription demo

## Philosophy

> **Show, don't tell**

This demo doesn't just explain composition—it **demonstrates** it interactively. Toggle extensions on/off to see:

- ✅ What each extension provides
- ✅ How data flows between them
- ✅ What happens when dependencies aren't met
- ✅ The power of modular architecture

**Learn by doing!**
