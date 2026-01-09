# GLOST Examples

Demonstrations of GLOST features, extensions, and patterns.

## 🎯 Core Demos

### [composition-demo](./composition-demo/) ⭐ **Recommended**

**Interactive demonstration of extension composition**

- Visual pipeline showing extension flow
- Toggle extensions on/off
- See dependency errors in real-time
- Beautiful UI with word cards
- Comprehensive documentation

**Start here to understand extension composition!**

---

### [transcription](./transcription/)

**Simple transcription example**

- Basic usage of IPA + phonemic extensions
- Minimal implementation
- Good for quick reference

**Note**: composition-demo is more comprehensive!

---

### [frequency-demo.ts](./frequency-demo.ts)

**Vocabulary prioritization demonstration**

- Shows frequency data from corpus
- Text difficulty assessment
- Learning recommendations
- Console-based output

**Run**: `npm run example:frequency`

---

### [pos-demo.ts](./pos-demo.ts)

**Grammar pattern recognition**

- Part-of-speech tagging
- Sentence structure visualization
- Pattern identification
- Console-based output

**Run**: `npm run example:pos`

---

## 📦 Extension Packages

### [extensions/](./extensions/)

**Example extension packages**

Demonstration of real-world extension development:

- [`en-transcription-ipa`](./extensions/languages/en/en-transcription-ipa/) - IPA generator
- [`en-ipa-to-phonemic`](./extensions/languages/en/en-ipa-to-phonemic/) - Phonemic enhancer

See how to build, compose, and test extensions.

---

## 🚀 Quick Start

### Interactive Demos (Recommended)

```bash
# Extension composition demo
cd composition-demo
npm install
npm run dev
# Open http://localhost:3002

# Simple transcription
cd transcription
npm install
npm run dev
# Open http://localhost:5173
```

### Console Demos

```bash
# From root
npm run example:frequency
npm run example:pos
```

---

## 📚 Learning Path

### 1. **Start with Composition Demo**
   - Understand how extensions work together
   - See dependency management
   - Visual, interactive learning

### 2. **Read Extension Packages**
   - See generator vs enhancer patterns
   - Understand provider interfaces
   - Study real implementations

### 3. **Try Console Demos**
   - See frequency analysis
   - Explore POS tagging
   - Understand data flow

### 4. **Build Your Own**
   - Use extension templates
   - Follow best practices
   - Compose with existing extensions

---

## 🎓 What Each Demo Teaches

| Demo | Teaches | Best For |
|------|---------|----------|
| **composition-demo** | Extension composition, dependencies, data flow | Understanding architecture |
| **transcription** | Simple extension usage | Quick reference |
| **frequency-demo** | Vocabulary analysis, corpus data | Language learning apps |
| **pos-demo** | Grammar analysis, pattern recognition | Grammar tools |
| **extension packages** | Extension development, testing, composition | Building extensions |

---

## 🏗️ Extension Patterns

### Generator Pattern
```typescript
// Creates data from external source
const generator: GLOSTExtension = {
  provides: { extras: ["data"] },
  enhanceMetadata: (node) => {
    const data = await lookupInDictionary(node.text);
    return { data };
  }
};
```

### Enhancer Pattern
```typescript
// Transforms existing data
const enhancer: GLOSTExtension = {
  requires: { extras: ["data"] },
  provides: { extras: ["transformed"] },
  enhanceMetadata: (node) => {
    const data = node.extras?.data;
    return { transformed: transform(data) };
  }
};
```

### Composition
```typescript
// Extensions compose in pipeline
processGLOSTWithExtensions(doc, [
  generator,  // Creates data
  enhancer    // Uses data
]);
```

---

## 📖 Documentation

- **[Extension Guides](../docs/guides/)** - Comprehensive guides for each extension
- **[Extension System](../docs/concepts/extensions.md)** - How extensions work
- **[Provider Philosophy](../docs/PROVIDER_PHILOSOPHY.md)** - Data quality principles
- **[Migration Guide](../MIGRATION_EXTENSIONS.md)** - Upgrading existing code

---

## 🎯 Real-World Applications

These examples demonstrate patterns used in:

- **Language Learning Apps** (Duolingo, LingQ)
  - Frequency-based vocabulary selection
  - Difficulty-based text leveling
  - Grammar pattern visualization

- **Reading Assistants** (Readlang, LWT)
  - Word highlighting by difficulty
  - Pronunciation guides (IPA, phonemic)
  - Grammar hints and explanations

- **Educational Tools**
  - Vocabulary coverage analysis
  - Reading level assessment
  - Grammar exercise generation

---

## 💡 Tips

### For Learning
1. Start with **composition-demo** (interactive, visual)
2. Read the extension **source code** (well-documented)
3. Try **toggling extensions** (see what breaks)
4. Build **your own extension** (apply learnings)

### For Development
1. Use **extension templates** from packages
2. Follow **provider pattern** (language-agnostic)
3. Write **tests** (isolated and composed)
4. Document with **real examples** (show, don't tell)

---

## 🤝 Contributing

Have an interesting demo or extension?

1. Add to appropriate folder
2. Include comprehensive README
3. Add to this index
4. Submit PR

Focus on:
- Real-world use cases
- "Show, don't tell" philosophy
- Working, runnable code
- Clear documentation

---

## 📝 Notes

### Why Multiple Demos?

- **composition-demo**: Best for learning architecture
- **transcription**: Simple usage reference
- **frequency/pos**: Console-based, scriptable
- **extension packages**: Implementation examples

Each serves a different purpose and audience!

### What's the Difference?

| Feature | composition-demo | transcription |
|---------|------------------|---------------|
| UI | Beautiful, interactive | Basic |
| Visualization | Pipeline diagram | None |
| Toggles | Yes (extensions on/off) | No |
| Errors | Shows dependency errors | Basic |
| Documentation | Comprehensive | Minimal |
| Purpose | Learning tool | Usage reference |

**Recommendation**: Start with composition-demo, use transcription for quick copy-paste.
