# Test Fixtures

This directory contains mock data and fixtures for testing purposes only.

**Important:** Files in this directory should **NOT** be imported by production code to avoid bundling test data with the main library.

## Usage in Tests

```typescript
// In your test files
import { thaiDocumentWithExtras, japaneseDocumentWithExtras } from '../__fixtures__/mock-data';
```

## Available Fixtures

- `mock-data.ts` - Sample GLOST documents with enhanced Thai and Japanese examples including:
  - Word-level annotations with multiple transcription systems
  - Translations in multiple languages
  - Cultural notes and metadata
  - Example sentences and usage patterns
