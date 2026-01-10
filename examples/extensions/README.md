# GLOST Extension Examples

Example extension packages demonstrating real-world extension development patterns.

## Structure

```
extensions/
  transcription/
    en-transcription-ipa/      # IPA generator
    en-ipa-to-phonemic/        # Phonemic enhancer
```

## Extension Packages

### 🎵 [en-transcription-ipa](./transcription/en-transcription-ipa/)

**Type**: GENERATOR  
**Provides**: IPA transcription  
**Requires**: None (standalone)

Adds IPA (International Phonetic Alphabet) transcription to English words.

```typescript
import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";

// Standalone usage
processGLOSTWithExtensions(doc, [EnglishIPAExtension]);

// Result: { text: "hello", extras: { transcription: { ipa: "/həˈloʊ/" } } }
```

**Dictionary includes**:
- Common words (hello, world, the)
- Complex words (ecclesiastical, worcestershire, colonel)
- Silent letters (queue, knight, subtle, psychology)

---

### 📖 [en-ipa-to-phonemic](./transcription/en-ipa-to-phonemic/)

**Type**: ENHANCER  
**Provides**: Phonemic respelling  
**Requires**: IPA transcription

Converts IPA to user-friendly phonemic respelling with stress markers.

```typescript
import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";
import { EnglishIPAToPhonemic Extension } from "glost-en-ipa-to-phonemic-example";

// Composed usage
processGLOSTWithExtensions(doc, [
  EnglishIPAExtension,          // Provides IPA
  EnglishIPAToPhonemic Extension  // Transforms IPA
]);

// Result: 
// {
//   text: "ecclesiastical",
//   extras: {
//     transcription: { ipa: "/ɪˌkliː.ziˈæs.tɪk.əl/" },
//     respelling: { text: "ih-KLEE-zee-AS-tik-uhl" }
//   }
// }
```

**Features**:
- Extracts syllables
- Identifies stress (primary ˈ and secondary ˌ)
- Uppercase = stressed syllable
- Converts IPA symbols to readable format

---

## Extension Composition

### Pattern: Generator → Enhancer

```
┌──────────────────────┐
│  GENERATOR           │  Creates data from external source
│  en-transcription-ipa│  (dictionary, API, model)
│  Provides: IPA       │
└──────────┬───────────┘
           │
           │ Data flows down
           ↓
┌──────────────────────┐
│  ENHANCER            │  Transforms existing data
│  en-ipa-to-phonemic  │  (formatting, conversion)
│  Requires: IPA       │
│  Provides: Respelling│
└──────────────────────┘
```

### Example: Both Extensions

```typescript
const text = "ecclesiastical phenomenon";

// Step 1: Generator adds IPA
const withIPA = processGLOSTWithExtensions(doc, [EnglishIPAExtension]);
// ecclesiastical: { ipa: "/ɪˌkliː.ziˈæs.tɪk.əl/" }
// phenomenon: { ipa: "/fəˈnɒm.ɪ.nən/" }

// Step 2: Enhancer converts IPA to respelling
const withBoth = processGLOSTWithExtensions(doc, [
  EnglishIPAExtension,
  EnglishIPAToPhonemic Extension
]);
// ecclesiastical: 
//   - IPA: "/ɪˌkliː.ziˈæs.tɪk.əl/"
//   - Respelling: "ih-KLEE-zee-AS-tik-uhl"
// phenomenon:
//   - IPA: "/fəˈnɒm.ɪ.nən/"
//   - Respelling: "fuh-NOM-ih-nun"
```

## Extension Types

### GENERATOR Extensions

**Purpose**: Create new data from external sources

**Examples**:
- `en-transcription-ipa` - Looks up IPA in dictionary
- `FrequencyExtension` - Looks up word frequency in corpus
- `POSExtension` - Tags part-of-speech from NLP model

**Characteristics**:
- ✅ Can work standalone
- ✅ No dependencies on other extensions
- ✅ Provides data for downstream extensions

### ENHANCER Extensions

**Purpose**: Transform existing data into new formats

**Examples**:
- `en-ipa-to-phonemic` - Converts IPA to respelling
- `DifficultyExtension` - Uses frequency to assess difficulty
- `ColorCodeExtension` - Uses difficulty to assign colors

**Characteristics**:
- ⚠️ Requires data from other extensions
- ⚠️ Throws `ExtensionDependencyError` if data missing
- ✅ Can be composed with multiple generators

## Interactive Demo

See extensions in action:

```bash
cd ../composition-demo
npm install
npm run dev
```

Open `http://localhost:3002`

**Features**:
- Toggle extensions on/off
- See dependency errors in real-time
- Visual pipeline representation
- Try complex English words

## Creating Your Own Extension

### 1. Generator Template

```typescript
export const MyGeneratorExtension: GLOSTExtension = {
  id: "my-generator",
  name: "My Generator",
  description: "Generates data from external source",
  
  // Declares what this extension provides
  provides: {
    extras: ["myData"]
  },
  
  // Process each word
  enhanceMetadata: (node: GLOSTWord) => {
    const text = getWordText(node);
    const data = await lookupInExternalSource(text);
    
    if (!data) return;
    
    return {
      myData: data
    };
  }
};
```

### 2. Enhancer Template

```typescript
export const MyEnhancerExtension: GLOSTExtension = {
  id: "my-enhancer",
  name: "My Enhancer",
  description: "Transforms existing data",
  
  // Declares dependency
  dependencies: ["my-generator"],
  requires: {
    extras: ["myData"]
  },
  
  // Declares what this provides
  provides: {
    extras: ["transformedData"]
  },
  
  // Transform the data
  enhanceMetadata: (node: GLOSTWord) => {
    const myData = node.extras?.myData;
    
    if (!myData) {
      throw new ExtensionDependencyError(
        "my-enhancer",
        "my-generator",
        "extras.myData",
        "MyGeneratorExtension must run first"
      );
    }
    
    return {
      transformedData: transform(myData)
    };
  }
};
```

## Best Practices

### ✅ DO

- **Single Responsibility**: Each extension does one thing well
- **Clear Dependencies**: Declare what you require and provide
- **Fail Gracefully**: Return `undefined` for unknown words
- **Document Examples**: Show real input/output
- **Type Safety**: Use TypeScript interfaces

### ❌ DON'T

- **Multiple Responsibilities**: Don't combine unrelated features
- **Hidden Dependencies**: Always declare `requires` and `dependencies`
- **Silent Failures**: Throw errors for missing dependencies
- **Assume Data**: Check if required data exists
- **Skip Types**: Type your extension interfaces

## Testing Extensions

### Test in Isolation

```typescript
import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";

const word = createSimpleWord({ text: "hello" });
const metadata = EnglishIPAExtension.enhanceMetadata!(word);

expect(metadata).toEqual({
  transcription: {
    ipa: "/həˈloʊ/",
    source: "dictionary",
    language: "en"
  }
});
```

### Test Composition

```typescript
import { EnglishIPAExtension } from "glost-en-transcription-ipa-example";
import { EnglishIPAToPhonemic Extension } from "glost-en-ipa-to-phonemic-example";

const doc = textToGLOST("hello");
const result = processGLOSTWithExtensions(doc, [
  EnglishIPAExtension,
  EnglishIPAToPhonemic Extension
]);

const word = extractFirstWord(result.document);
expect(word.extras?.transcription?.ipa).toBe("/həˈloʊ/");
expect(word.extras?.respelling?.text).toBe("huh-LOH");
```

## Real-World Applications

These patterns apply to production extensions:

### Language Learning App

```typescript
// Vocabulary analysis pipeline
[FrequencyExtension] → frequency data
  ↓
[DifficultyExtension] → uses frequency to assess level
  ↓
[ColorExtension] → colors by difficulty
  ↓
[HintGeneratorExtension] → generates hints for hard words
```

### Pronunciation Trainer

```typescript
// Pronunciation pipeline
[TranscriptionExtension] → provides IPA
  ↓
[PhonemeBreakdownExtension] → breaks into phonemes
  ↓
[AudioGeneratorExtension] → generates audio for each phoneme
  ↓
[PronunciationScorerExtension] → compares user to model
```

### Grammar Checker

```typescript
// Grammar analysis pipeline
[POSExtension] → tags parts of speech
  ↓
[SyntaxExtension] → analyzes sentence structure
  ↓
[GrammarRuleExtension] → applies grammar rules
  ↓
[SuggestionExtension] → generates corrections
```

## See Also

- [Extension System Documentation](../../docs/concepts/extensions.md)
- [Extension Guides](../../docs/guides/)
- [Composition Demo](../composition-demo/)
- [Provider Philosophy](../../docs/PROVIDER_PHILOSOPHY.md)

## Contributing

Have an interesting extension? Submit a PR!

1. Create extension package in appropriate location
2. Add comprehensive README with examples
3. Include tests
4. Update this README

Extensions should demonstrate:
- Real-world use case
- Clear composition pattern
- Best practices
- "Show, don't tell" philosophy
