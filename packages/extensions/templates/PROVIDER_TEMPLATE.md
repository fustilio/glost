# Provider Template Documentation

This template provides a production-ready foundation for creating GLOST language providers that integrate with the data loader system.

## Features

- **Base Class Integration**: Extends `BaseDataProvider` for common functionality
- **Data Loader Support**: Works with JSON, API, cached, or custom loaders
- **Lazy Loading**: Data loads only when first needed
- **Error Handling**: Graceful degradation following "No Data > Bad Data"
- **TypeScript**: Full type safety
- **Testing-Ready**: Structured for easy testing

## Quick Start

### 1. Copy Template

```bash
cp packages/extensions/templates/provider-template.ts.template \
   packages/languages/[LANG]/src/extensions/[type].ts
```

### 2. Replace Placeholders

Use find-and-replace to update these placeholders:

| Placeholder | Example | Description |
|-------------|---------|-------------|
| `[LANG]` | `th` | ISO 639-1 language code |
| `[LANGUAGE]` | `Thai` | Language name (PascalCase) |
| `[lang]` | `thai` | Language name (lowercase) |
| `[PROVIDER_TYPE]` | `Frequency` | Provider type |
| `[ProviderType]` | `FrequencyProvider` | Provider class name |
| `[EXTENSION_TYPE]` | `glost-frequency` | Extension package name |
| `[DataType]` | `FrequencyData` | Data structure type |
| `[ReturnType]` | `FrequencyLevel` | Return type for getData |

### 3. Implement getData Method

The key method to implement is `getData`:

```typescript
async getData(
  word: string,
  language: GlostLanguage
): Promise<YourReturnType | undefined> {
  if (!this.validateLanguage(language)) {
    return undefined;
  }

  return this.withErrorHandling(async () => {
    const data = await this.ensureLoaded();
    
    // Your lookup logic here
    const result = data[word];
    
    // Return undefined if not found (No Data > Bad Data)
    return result;
  });
}
```

### 4. Define Data Structure

Specify what shape your data will have:

```typescript
// For frequency provider
export interface FrequencyData {
  [word: string]: FrequencyLevel;
}

// For translation provider
export interface TranslationData {
  [word: string]: string | string[];
}

// For transcription provider
export interface TranscriptionData {
  [word: string]: {
    ipa?: string;
    romanization?: string;
    [scheme: string]: string | undefined;
  };
}
```

## Data Loader Examples

### JSON File

```typescript
import { createJsonLoader } from "glost-common";

const provider = createThaiFrequencyProvider({
  dataLoader: createJsonLoader({
    path: './data/thai-frequency.json',
    transform: (data) => {
      // Optional: transform loaded data
      return data;
    },
    validate: (data) => {
      // Optional: validate data structure
      return typeof data === 'object';
    }
  })
});
```

### HTTP API

```typescript
import { createApiLoader } from "glost-common";

const provider = createThaiTranslationProvider({
  dataLoader: createApiLoader({
    url: 'https://api.example.com/thai/dictionary',
    headers: { 'Authorization': 'Bearer YOUR_TOKEN' },
    retry: { maxAttempts: 3, delayMs: 1000 },
    timeout: 30000,
    transform: (response) => {
      // Transform API response to expected format
      return response.data;
    }
  })
});
```

### Cached Loader

```typescript
import { createCachedLoader, createJsonLoader } from "glost-common";

const provider = createThaiFrequencyProvider({
  dataLoader: createCachedLoader({
    loader: createJsonLoader({ path: './data.json' }),
    ttl: 3600000, // 1 hour
    storageKey: 'thai-frequency-cache'
  })
});
```

### Custom Loader

```typescript
import type { DataLoader } from "glost-common";

const customLoader: DataLoader<MyDataType> = {
  async load() {
    // Your custom loading logic
    const db = await openDatabase();
    const data = await db.query('SELECT * FROM dictionary');
    return processData(data);
  },
  
  async isAvailable() {
    // Check if source is accessible
    return await canConnectToDatabase();
  }
};

const provider = createProvider({
  dataLoader: customLoader
});
```

## Testing Your Provider

```typescript
import { describe, it, expect } from 'vitest';
import { createThaiFrequencyProvider } from './frequency';
import { createSimpleProvider } from 'glost-common';

describe('Thai Frequency Provider', () => {
  it('returns frequency for known word', async () => {
    const provider = createThaiFrequencyProvider({
      dataLoader: {
        async load() {
          return {
            'สวัสดี': 'common' as const,
            'ครับ': 'common' as const,
          };
        }
      }
    });

    const result = await provider.getData('สวัสดี', 'th');
    expect(result).toBe('common');
  });

  it('returns undefined for unknown word', async () => {
    const provider = createThaiFrequencyProvider({
      dataLoader: {
        async load() {
          return {};
        }
      }
    });

    const result = await provider.getData('unknown', 'th');
    expect(result).toBeUndefined();
  });

  it('returns undefined for unsupported language', async () => {
    const provider = createThaiFrequencyProvider();
    const result = await provider.getData('word', 'en');
    expect(result).toBeUndefined();
  });
});
```

## Best Practices

### 1. Follow "No Data > Bad Data"

```typescript
// ✅ Good: Return undefined when uncertain
if (!data[word]) {
  return undefined;
}

// ❌ Bad: Guess or use heuristics
if (!data[word]) {
  return word.length <= 3 ? 'common' : 'rare'; // DON'T DO THIS
}
```

### 2. Validate Inputs

```typescript
async getData(word: string, language: GlostLanguage) {
  // Validate language
  if (!this.validateLanguage(language)) {
    return undefined;
  }

  // Validate input
  if (!word || typeof word !== 'string' || word.trim().length === 0) {
    return undefined;
  }

  // ... rest of logic
}
```

### 3. Use Error Handling Helper

```typescript
// ✅ Good: Use withErrorHandling
return this.withErrorHandling(async () => {
  const data = await this.ensureLoaded();
  return data[word];
});

// ❌ Bad: Let errors propagate
const data = await this.ensureLoaded(); // Might throw
return data[word]; // No error handling
```

### 4. Log Appropriately

```typescript
// Load time logs
this.log('Loading frequency data...', 'info');
this.log(`Loaded ${count} entries`, 'info');

// Warning for missing data
this.log('No data loader provided', 'warn');

// Error for failures
this.log(`Failed to load: ${error.message}`, 'error');
```

### 5. Support Preloading

```typescript
// Users can preload for better performance
const provider = createProvider({ dataLoader });

// Preload before processing
await provider.preload();

// Now getData() won't have loading delay
const result = await provider.getData('word', 'th');
```

## Integration with Extensions

```typescript
// Create provider
const frequencyProvider = createThaiFrequencyProvider({
  dataLoader: createJsonLoader({ path: './data.json' })
});

// Use with extension
import { createFrequencyExtension } from "glost-frequency";

const extension = createFrequencyExtension({
  targetLanguage: "th",
  provider: frequencyProvider
});

// Use in processor
import { glost } from "glost";

const processor = glost()
  .use(extension)
  .freeze();

const result = await processor.process(document);
```

## See Also

- [Implementing Language Providers Guide](../../../docs/guides/implementing-language-providers.md)
- [Provider Philosophy: No Data > Bad Data](../../../docs/PROVIDER_PHILOSOPHY.md)
- [Data Loader Documentation](../../common/src/data-loaders/README.md)
