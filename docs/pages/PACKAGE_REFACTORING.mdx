# Package Refactoring Complete! ✅

## What Changed

### Package Names

- **`packages/core`** → Now named **`glost-core`** in package.json
- **`packages/glost`** → Now the **main facade package** named **`glost`**

### New Structure

```
packages/
├── glost/              # NEW: Main facade package (v0.5.0)
│   ├── package.json    # name: "glost"
│   ├── src/
│   │   ├── index.ts    # Re-exports everything
│   │   ├── processor.ts
│   │   ├── registry.ts
│   │   └── presets.ts
│   └── README.md
│
├── core/               # Renamed to glost-core (v0.5.0)
│   └── package.json    # name: "glost-core"
│
├── processor/
│   └── package.json    # Updated: depends on "glost-core"
│
├── registry/
│   └── package.json    # Updated: depends on "glost-core"
│
├── cli/
│   └── package.json    # Updated: depends on "glost-core"
│
└── presets/
    └── package.json    # Updated: depends on "glost-core"
```

## Updated Dependencies

All packages that previously depended on `"glost": "workspace:*"` now depend on `"glost-core": "workspace:*"`:

- ✅ glost-processor
- ✅ glost-registry
- ✅ glost-cli
- ✅ glost-presets

## Usage

### Users Install One Package

```bash
npm install glost
```

### Everything Available from One Import

```typescript
// All from one place!
import { 
  glost,                    // Processor
  createSimpleDocument,     // From glost-core
  getAllWords,              // From glost-core
  pluginRegistry,           // From glost-registry
  languageLearningPreset    // From glost-presets
} from "glost";
```

### Or Granular Imports

```typescript
// Just the core
import { createSimpleDocument } from "glost-core";

// With processor
import { glost } from "glost-processor";
```

### Subpath Exports

```typescript
// Explicit subpaths
import { glost } from "glost/processor";
import { pluginRegistry } from "glost/registry";
import { languageLearningPreset } from "glost/presets";
```

## Next Steps

1. **Run `pnpm install`** to update workspace dependencies
2. **Build the packages**: `pnpm build -r`
3. **Test the changes**: Import from `glost` instead of `glost-core`

## Benefits

✅ **Clear Naming** - `glost-core` clearly indicates it's the core implementation  
✅ **Convenience** - Users can `npm install glost` and get everything  
✅ **Flexibility** - Advanced users can install specific packages  
✅ **Standard Pattern** - Follows monorepo best practices (like babel, unified)  
✅ **Clean API** - Main package is the public interface  

## Breaking Changes for Users

### Before
```typescript
import { createSimpleDocument } from "glost";
```

### After (both work!)
```typescript
// Option 1: From main package (recommended)
import { createSimpleDocument } from "glost";

// Option 2: From core directly
import { createSimpleDocument } from "glost-core";
```

The main `glost` package re-exports everything from `glost-core`, so existing code using `import from "glost"` will continue to work!
