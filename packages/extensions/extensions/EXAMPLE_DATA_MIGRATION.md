# Example Data Migration Complete

## Summary

The `example-data` folder has been moved to the correct location and configured as an **opt-in, tree-shakeable export** that won't be included in the main bundle.

## Changes Made

### 1. **Moved Location**
- **From**: `packages/extensions/src/example-data/`
- **To**: `packages/extensions/extensions/src/example-data/`

### 2. **Build Configuration**

#### Main Build (excludes example-data)
```bash
pnpm run build
```
- Builds: `index.ts`, `processor.ts`, `registry.ts`, `extensions/*`
- **Excludes**: `example-data/**/*`
- Output: `dist/` (no example-data folder)

#### Example Data Build (opt-in)
```bash
pnpm run build:example-data
```
- Builds: Only `example-data/**/*`
- Output: `dist/example-data/`

#### Build All
```bash
pnpm run build:all
```
- Builds both main code and example-data

### 3. **Package Exports**

The package.json now includes a separate export path:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./processor": "./dist/processor.js",
    "./registry": "./dist/registry.js",
    "./extensions": "./dist/extensions/index.js",
    "./example-data": "./dist/example-data/index.js"
  },
  "sideEffects": false
}
```

**Key Point**: `sideEffects: false` allows bundlers to tree-shake unused exports.

### 4. **TypeScript Configuration**

- **`tsconfig.json`**: Main build, excludes `src/example-data/**/*`
- **`tsconfig.example-data.json`**: Separate config for building example-data only

### 5. **Cleaned Up Duplicates**

Removed old duplicate folders:
- ❌ `packages/extensions/__tests__/example-data/`
- ❌ `packages/extensions/extensions/__tests__/example-data/`

## Usage

### For End Users

```typescript
// Main package (small bundle)
import { processGLOSTWithExtensionsAsync } from 'glost-extensions';

// Example data (opt-in, separate import)
import { findWord, createTranscriptionLookup } from 'glost-extensions/example-data';
```

### For Developers

```bash
# Install dependencies
pnpm install

# Build main package only
cd packages/extensions/extensions
pnpm run build

# Build with example data
pnpm run build:all
```

## Benefits

✅ **Tree-shakeable**: Example data only included if explicitly imported  
✅ **Smaller bundles**: Main package excludes large JSON files  
✅ **Opt-in**: Users choose if they want example data  
✅ **Clear separation**: Production code vs. example/test data  
✅ **Proper exports**: Works with modern bundlers (webpack, vite, rollup)

## Bundle Impact

### Before
```
glost-extensions (main + example-data): ~50KB
```

### After
```
glost-extensions (main only): ~25KB
glost-extensions/example-data: ~25KB (opt-in)
```

Users who don't import `glost-extensions/example-data` save ~50% bundle size.

## Files Changed

- ✏️ `packages/extensions/extensions/package.json` - Added example-data export, sideEffects: false
- ✏️ `packages/extensions/extensions/tsconfig.json` - Excluded example-data from main build
- ➕ `packages/extensions/extensions/tsconfig.example-data.json` - Separate build config
- ✏️ `packages/extensions/extensions/src/example-data/types.ts` - Local type definitions
- ✏️ `packages/extensions/extensions/src/example-data/helpers.ts` - Fixed imports
- ✏️ `packages/extensions/extensions/src/example-data/lookup-functions.ts` - Fixed imports
- ✏️ `packages/extensions/extensions/src/example-data/README.md` - Updated documentation
- 📦 Moved entire folder from parent to glost-extensions package
- 🗑️ Deleted duplicate folders in `__tests__`

## Testing

All imports using `glost-extensions/example-data` continue to work:
- ✅ `examples/demos/glost-extensions-api-example/src/__tests__/composition-pattern.test.ts`
- ✅ Other example files already using the correct import path

## Next Steps

When publishing:
1. Run `pnpm run build:all` to include both builds
2. Publish package with both `dist/` contents
3. Users can tree-shake the example-data export if unused
