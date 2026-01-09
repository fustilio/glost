# Migration Guide: v0.3.x → v0.4.0

This guide helps you upgrade your GLOST project from v0.3.x to v0.4.0.

## Overview

v0.4.0 introduces several breaking changes focused on improving schema consistency, API clarity, and developer experience. These changes are based on 6+ months of production feedback from real-world language learning applications.

## Automated Migration

The quickest way to migrate is using the built-in migration CLI:

```bash
# Migrate all GLOST documents in a directory
npx glost migrate v0.3-to-v0.4 ./src

# Dry run to see what would change
npx glost migrate v0.3-to-v0.4 ./src --dry-run

# Analyze migration needs
npx glost migrate analyze ./document.glost.json
```

This handles:
- ✅ Language code normalization to BCP-47
- ✅ Transcription schema cleanup
- ✅ Translation key updates

## Breaking Changes

### 1. ESM Imports

**Change**: All imports now require `.js` extensions (proper ESM support).

**Impact**: Node.js ESM imports may break.

**Migration**: If you see `Cannot find module` errors, this has been fixed in the published packages. No action needed if using published packages. If building from source, the TypeScript config has been updated.

### 2. Language Codes → BCP-47 Standard

**Change**: All language codes must use BCP-47 format.

**Before:**
```json
{
  "lang": "th"
}
```

**After:**
```json
{
  "lang": "th-TH"
}
```

**Migration**: Automated migration tool handles this. Or use utilities:

```typescript
import { normalizeLanguageCode } from 'glost-common';

const code = normalizeLanguageCode("th");  // "th-TH"
```

**Manual Update**: If not using automated migration:

```typescript
import { migrateAllLanguageCodes } from 'glost-utils';

const result = migrateAllLanguageCodes(document, {
  addDefaultRegions: true,
  convertISO639_3: true
});
```

### 3. Transcription Schema

**Change**: Removed redundant `system` field from transcription objects.

**Before (v0.3.x):**
```json
{
  "transcription": {
    "ipa": {
      "text": "həˈloʊ",
      "system": "ipa"
    }
  }
}
```

**After (v0.4.0):**
```json
{
  "transcription": {
    "ipa": {
      "text": "həˈloʊ"
    }
  }
}
```

**Why**: The system is already the key in the transcription object, making the field redundant.

**Migration**: Automated migration tool handles this. Or use utilities:

```typescript
import { migrateTranscriptionSchema } from 'glost-utils';

const result = migrateTranscriptionSchema(document);
console.log(`Updated ${result.transcriptionsUpdated} transcriptions`);
```

### 4. Translation Extension API

**Change**: Renamed confusing `sourceLanguage`/`targetLanguage` to clear `from`/`to`.

**Before (v0.3.x):**
```typescript
createTranslationExtension({
  sourceLanguage: "th",  // Confusing name
  targetLanguage: "en",  // What's the target?
  provider
});
```

**After (v0.4.0):**
```typescript
createTranslationExtension({
  from: "th",  // Clear: translate from Thai
  to: "en",    // Clear: translate to English
  provider
});
```

**Migration**: Update all `createTranslationExtension` calls:

```bash
# Find all uses
grep -r "sourceLanguage" src/

# Replace manually or use search-replace in your editor
```

### 5. TranscriptionInfo Type

**Change**: Removed `system` field from `TranscriptionInfo` type.

**Before:**
```typescript
const info: TranscriptionInfo = {
  text: "hello",
  system: "ipa"  // No longer exists
};
```

**After:**
```typescript
const info: TranscriptionInfo = {
  text: "hello"
  // system is the key in the parent object
};
```

**Migration**: Remove any code that sets or reads the `system` field from transcription objects.

## New Features

### Typed Extras (Declaration Merging)

Extensions can now provide type-safe extras:

```typescript
// Automatic TypeScript autocomplete!
word.extras.frequency?.rank;      // number | undefined
word.extras.difficulty?.level;    // 1 | 2 | 3 | 4 | 5 | undefined
```

No changes needed - this just works when you import extension packages.

### Standard Provider Interface

All providers now implement `GLOSTDataProvider<TInput, TOutput>`:

```typescript
import { GLOSTDataProvider } from 'glost-common';

class MyProvider implements GLOSTDataProvider<string, MyData> {
  async getData(input: string): Promise<MyData | undefined> {
    // ...
  }
}
```

Benefits:
- Consistent API across all providers
- Built-in support for batch processing
- Automatic caching support

### Better Error Messages

Errors now include context, suggestions, and documentation links:

```
GLOSTValidationError: Missing required field 'text' on WordNode

  Location: document.children[0]
  Node type: WordNode
  File: stories/test.glost.json:42

  Suggestion: Add a 'text' field containing the word's text content.

  Documentation: https://glost.dev/docs/node-types#wordnode
```

### Language Utilities

Comprehensive BCP-47 utilities:

```typescript
import {
  normalizeLanguageCode,
  matchLanguage,
  parseLanguageCode,
  findBestMatch,
  getLanguageFallbacks
} from 'glost-common';

// Normalize codes
normalizeLanguageCode("en");       // "en-US"
normalizeLanguageCode("tha");      // "th-TH"

// Match codes
matchLanguage("en-GB", "en", { ignoreRegion: true });  // true

// Find best match
findBestMatch("en-AU", ["en-US", "en-GB", "fr-FR"]);  // "en-US"
```

## Step-by-Step Migration

### 1. Update Dependencies

```bash
npm install glost@0.4.0 glost-common@0.4.0 glost-utils@0.4.0
npm install glost-th@0.4.0 glost-ja@0.4.0  # etc.
```

### 2. Migrate Documents

```bash
npx glost migrate v0.3-to-v0.4 ./src
```

### 3. Update Extension Calls

Find and update translation extension calls:

```typescript
// Old
createTranslationExtension({
  sourceLanguage: "th",
  targetLanguage: "en",
  provider
});

// New
createTranslationExtension({
  from: "th",
  to: "en",
  provider
});
```

### 4. Remove System Field References

If you have code that accesses or sets `transcription[system].system`:

```typescript
// Old
const system = node.transcription["ipa"].system;  // Remove

// New  
// The system is the key itself
for (const [system, data] of Object.entries(node.transcription)) {
  console.log(system, data.text);
}
```

### 5. Test Your Application

Run your test suite to catch any remaining issues:

```bash
npm test
```

### 6. Update TypeScript (if needed)

If you see type errors related to `TranscriptionInfo`, update your code to not expect the `system` field.

## Verification

After migration, verify everything works:

```typescript
import { migrateAllLanguageCodes, migrateTranscriptionSchema } from 'glost-utils';
import fs from 'fs';

const doc = JSON.parse(fs.readFileSync('document.glost.json', 'utf-8'));

// Check language codes
const langResult = migrateAllLanguageCodes(doc, { dryRun: true });
// Check transcription schema
const transResult = migrateTranscriptionSchema(doc, { dryRun: true });

if (langResult.hasChanges || transResult.hasChanges) {
  console.log('⚠️  Document still needs migration!');
} else {
  console.log('✅ Document is v0.4.0 compliant');
}
```

## Troubleshooting

### Issue: Import errors with .js extensions

**Solution**: Update to glost@0.4.0 or later. The published packages have correct ESM exports.

### Issue: Language code validation errors

**Solution**: Use the migration tool or manually normalize codes:

```typescript
import { normalizeLanguageCode } from 'glost-common';

doc.lang = normalizeLanguageCode(doc.lang);
```

### Issue: Type errors with transcription.system

**Solution**: Remove references to the `system` field. The system is the key in the parent object.

### Issue: Translation extension errors

**Solution**: Update from `sourceLanguage`/`targetLanguage` to `from`/`to`.

## Support

- **Documentation**: https://glost.dev/docs
- **Migration CLI**: Run `npx glost migrate help` for usage
- **GitHub Issues**: https://github.com/fustilio/glost/issues

## Changelog

See [CHANGELOG.md](./packages/core/CHANGELOG.md) for complete v0.4.0 changes.
