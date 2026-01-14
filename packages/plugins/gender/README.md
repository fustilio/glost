# glost-gender

Grammatical gender extension for GLOST - generates and formats gender data.

## Overview

This package provides grammatical gender support for GLOST documents. It separates gender **generation** (determining word gender) from gender **enhancement** (formatting for display).

**Note:** Grammatical gender is language-specific. Many languages (English, Thai, Japanese) do not have grammatical gender, while others (French, Spanish, German) do.

## Installation

```bash
pnpm add glost-gender
```

## Usage

### With Language-Specific Provider

```typescript
import { createGenderExtension } from "glost-gender";
import { createFrenchGenderProvider } from "glost-fr/extensions";
import { processGLOSTWithExtensionsAsync } from "glost-plugins";

// Create French gender provider
const provider = createFrenchGenderProvider(datasource);

// Create extension pipeline
const [generator, enhancer] = createGenderExtension({
  targetLanguage: "fr",
  provider
});

// Process document
const result = await processGLOSTWithExtensionsAsync(document, [generator, enhancer]);
```

### Gender Types

- `masculine` / `male` - Masculine gender
- `feminine` / `female` - Feminine gender
- `neuter` - Neuter gender (German, etc.)

## API

### createGenderGeneratorExtension(options)

Creates extension that determines word gender.

**Options:**
- `targetLanguage` - ISO-639-1 language code
- `provider` - GenderProvider instance
- `skipExisting` - Skip words with existing gender (default: true)

### createGenderEnhancerExtension(options)

Creates extension that formats gender data.

**Options:**
- `normalize` - Normalize gender values (default: true)

### createGenderExtension(options)

Convenience function that creates both generator and enhancer.

Returns: `[generator, enhancer]`

## License

MIT
