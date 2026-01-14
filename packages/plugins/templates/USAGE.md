# GLOST Package Templates - Usage Guide

Templates for creating data source and transcription system packages following SRP & SSOT principles.

## Package Types

### 1. Data Source Packages
**Pattern:** `glost-[LANG]-datasource-[SOURCE]`
**Responsibility:** Query data ONLY
**Examples:** `glost-th-datasource-lexitron`, `glost-ja-datasource-jmdict`

### 2. Transcription System Packages
**Pattern:** `glost-[LANG]-transcription-[SYSTEM]`
**Responsibility:** Apply transcription rules ONLY
**Examples:** `glost-th-transcription-paiboon`, `glost-ja-transcription-hepburn`

## Creating a Data Source Package

### Step 1: Copy Template

```bash
cp -r packages/extensions/templates/data-source-package packages/data-sources/th-datasource-lexitron
cd packages/data-sources/th-datasource-lexitron
```

### Step 2: Replace Placeholders

In all files, replace these placeholders:

| Placeholder | Example | Description |
|-------------|---------|-------------|
| `[LANG]` | `th` | ISO 639-1 language code |
| `[SOURCE_NAME]` | `lexitron` | Data source name (lowercase) |
| `[SourceName]` | `Lexitron` | Data source name (PascalCase) |
| `[LANGUAGE]` | `Thai` | Language name |
| `[DESCRIPTION]` | `Thai dictionary data from Lexitron` | Package description |
| `[DATA_LICENSE]` | `CC BY-SA 3.0` | Data license |
| `[REQUIRED_ATTRIBUTION]` | `Lexitron Dictionary by NECTEC` | Attribution text |

### Step 3: Implement Query Logic

In `src/index.ts`, implement `query[SourceName]()`:

```typescript
export async function queryLexitron(
  word: string,
  options?: QueryOptions
): Promise<LexitronEntry | null> {
  try {
    // Connect to your database or API
    const response = await fetch(`https://api.lexitron.nectec.or.th/lookup/${word}`);
    const data = await response.json();
    
    // Return standardized structure
    return {
      word: data.word,
      reading: data.pronunciation,
      definitions: data.meanings,
      partOfSpeech: data.pos,
      metadata: data.extra
    };
  } catch (error) {
    console.error(`Error querying Lexitron:`, error);
    return null;
  }
}
```

### Step 4: Update package.json

```bash
# Rename files
mv src-index.ts.template src/index.ts
mv package.json.template package.json
mv README.md.template README.md

# Update package.json with actual values
```

### Step 5: Add Tests

Create `src/index.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { queryLexitron, isLexitronAvailable } from './index';

describe('Lexitron Data Source', () => {
  it('queries word successfully', async () => {
    const entry = await queryLexitron("สวัสดี");
    expect(entry).toBeDefined();
    expect(entry?.word).toBe("สวัสดี");
  });

  it('returns null for non-existent word', async () => {
    const entry = await queryLexitron("nonexistent");
    expect(entry).toBeNull();
  });
});
```

## Creating a Transcription System Package

### Step 1: Copy Template

```bash
cp -r packages/extensions/templates/transcription-system-package packages/transcription-systems/th-transcription-paiboon
cd packages/transcription-systems/th-transcription-paiboon
```

### Step 2: Replace Placeholders

| Placeholder | Example | Description |
|-------------|---------|-------------|
| `[LANG]` | `th` | ISO 639-1 language code |
| `[SYSTEM]` | `paiboon` | System name (lowercase) |
| `[System]` | `Paiboon` | System name (PascalCase) |
| `[LANGUAGE]` | `Thai` | Language name |
| `[SYSTEM_FULL_NAME]` | `Paiboon Plus` | Full system name |
| `[DESCRIPTION]` | `Thai romanization using Paiboon+ system` | Package description |

### Step 3: Implement Transcription Logic

In `src/index.ts`, implement `transcribeTo[System]()`:

```typescript
export function transcribeToPaiboon(
  text: string,
  options: TranscriptionOptions = {}
): TranscriptionResult {
  const { includeTones = true, syllableSeparator = "-" } = options;
  
  // Implement Paiboon+ rules
  const transcribed = applyPaiboonRules(text, includeTones);
  const syllables = splitIntoSyllables(transcribed);
  
  return {
    text: syllables.join(syllableSeparator),
    syllables,
    system: "paiboon"
  };
}

function applyPaiboonRules(text: string, includeTones: boolean): string {
  // SINGLE SOURCE OF TRUTH for Paiboon+ rules
  let result = text;
  
  // Character mappings
  result = result.replace(/ก/g, 'g');
  result = result.replace(/ข/g, 'k');
  // ... more rules ...
  
  if (includeTones) {
    // Tone marker logic
    result = applyToneMarkers(result);
  }
  
  return result;
}
```

### Step 4: Add Tests

Create `src/index.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { transcribeToPaiboon, isValidPaiboonTranscription } from './index';

describe('Paiboon Transcription System', () => {
  it('transcribes Thai correctly', () => {
    const result = transcribeToPaiboon("สวัสดี");
    expect(result.text).toBe("sà-wàt-dii");
    expect(result.syllables).toEqual(["sà", "wàt", "dii"]);
  });

  it('handles tone options', () => {
    const withTones = transcribeToPaiboon("สวัสดี", { includeTones: true });
    const withoutTones = transcribeToPaiboon("สวัสดี", { includeTones: false });
    
    expect(withTones.text).toContain("à");
    expect(withoutTones.text).not.toContain("à");
  });

  it('validates transcription', () => {
    expect(isValidPaiboonTranscription("sà-wàt-dii")).toBe(true);
    expect(isValidPaiboonTranscription("invalid123")).toBe(false);
  });
});
```

## Composition Examples

### Example 1: Data Source + Transcription System

```typescript
// glost-th-lookup-transcription-paiboon-lexitron/src/index.ts
import { queryLexitron } from 'glost-th-datasource-lexitron';
import { transcribeToPaiboon } from 'glost-th-transcription-paiboon';
import { createTranscriptionGeneratorExtension } from 'glost-plugins-transcription';

export function createLookupFunction() {
  return async (word: string) => {
    // Get data (delegates to data source)
    const entry = await queryLexitron(word);
    if (!entry) return {};
    
    // Apply transcription (delegates to transcription system)
    const result = transcribeToPaiboon(entry.reading);
    
    return { paiboon: result.text };
  };
}

export const ThaiPaiboonLexitronExtension =
  createTranscriptionGeneratorExtension({
    targetLanguage: "th",
    lookupTranscription: createLookupFunction()
  });
```

### Example 2: Multiple Systems

```typescript
// Use same data source with different systems
import { queryLexitron } from 'glost-th-datasource-lexitron';
import { transcribeToPaiboon } from 'glost-th-transcription-paiboon';
import { transcribeToRTGS } from 'glost-th-transcription-rtgs';
import { transcribeToIPA } from 'glost-transcription-strategy-ipa';

async function getAllTranscriptions(word: string) {
  const entry = await queryLexitron(word);
  if (!entry) return {};
  
  return {
    paiboon: transcribeToPaiboon(entry.reading).text,
    rtgs: transcribeToRTGS(entry.reading).text,
    ipa: transcribeToIPA(entry.reading, 'th').text
  };
}
```

## Best Practices

### 1. Single Responsibility
- Data sources: ONLY query data
- Transcription systems: ONLY apply rules
- Never mix responsibilities

### 2. Single Source of Truth
- Transcription rules in ONE place
- Data queries in ONE place
- Update once, reflects everywhere

### 3. Source-Agnostic Systems
- Transcription systems work with ANY data source
- Don't hard-code data source dependencies
- Accept text input, return transcription

### 4. Composition Over Duplication
- Import and compose, never copy logic
- Create adapter packages for combinations
- Reuse components across packages

### 5. Testing
- Test data sources separately
- Test transcription systems separately
- Test compositions separately

## Publishing Checklist

Before publishing your package:

- [ ] All placeholders replaced
- [ ] Implemented core functionality
- [ ] Added comprehensive tests
- [ ] Updated README with examples
- [ ] Added proper attribution (for data sources)
- [ ] Verified SRP compliance
- [ ] No duplicated logic from other packages
- [ ] Works with example data
- [ ] Documentation is clear

## Need Help?

- See [SRP/SSOT Architecture](../../../.cursor/plans/naming_conventions_srp_architecture.md)
- Check [Example Data](../src/example-data/README.md)
- Review [Composition Examples](../../../examples/extensions/composition-pattern.test.ts)
