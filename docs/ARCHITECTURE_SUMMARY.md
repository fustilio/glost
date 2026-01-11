# GLOST Architecture Summary

## Overview

GLOST follows a composable, principle-driven architecture based on SRP (Single Responsibility Principle) and SSOT (Single Source of Truth).

## Architecture Diagram

```
┌────────────────────────────────────────────────────┐
│  Layer 1: Core Foundation                          │
│  glost, glost-common, glost-utils, glost-extensions│
└────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────┐
│  Layer 2: Extension APIs                           │
│  glost-extensions-translation, transcription       │
└────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────┐
│  Layer 3: Composable Components (Mix & Match)      │
│  Data Sources + Transcription Systems = Lookups    │
└────────────────────────────────────────────────────┘
```

## Key Principles

### Single Responsibility Principle (SRP)

Each package or function does one thing:
- Data sources only query data
- Transcription systems only apply rules
- Lookup factories only compose existing functions

### Single Source of Truth (SSOT)

Logic lives in one place. Everyone imports and uses the same implementation, avoiding duplication.

### Composition Over Duplication

Build complex functionality by composing simple, focused components rather than duplicating logic.

## Package Naming Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Core | `glost-[name]` | `glost-common` |
| Extensions | `glost-extensions-[type]` | `glost-extensions-transcription` |
| Data Source | `glost-[lang]-datasource-[source]` | `glost-th-datasource-lexitron` |
| Transcription | `glost-[lang]-transcription-[system]` | `glost-th-transcription-paiboon` |
| Lookup | `glost-[lang]-lookup-[type]-[system]-[source]` | `glost-th-lookup-transcription-paiboon-lexitron` |
| Plugin | `glost-plugin-[framework]` | `glost-plugin-react` |

## Mix & Match Examples

### Same Data, Different Systems
```typescript
// Use Lexitron with Paiboon+
import { ThaiPaiboonLexitronExtension } from 
  'glost-th-lookup-transcription-paiboon-lexitron';

// Use Lexitron with RTGS
import { ThaiRTGSLexitronExtension } from 
  'glost-th-lookup-transcription-rtgs-lexitron';

// Use Lexitron with IPA
import { ThaiIPALexitronExtension } from 
  'glost-th-lookup-transcription-ipa-lexitron';
```

### Same System, Different Data
```typescript
// Paiboon+ with Lexitron
import { ThaiPaiboonLexitronExtension } from 
  'glost-th-lookup-transcription-paiboon-lexitron';

// Paiboon+ with Google Translate
import { ThaiPaiboonGoogleExtension } from 
  'glost-th-lookup-transcription-paiboon-googletrans';
```

## Benefits

- **Maintainability**: Fix logic in one place, all packages benefit
- **Testability**: Test each component in isolation
- **Reusability**: Any system works with any data source
- **Clarity**: Package names describe exactly what they do
- **Flexibility**: Mix and match components freely
- **No Duplication**: Logic is always imported, never copied

## Related Documentation

- [Naming Conventions](conventions/naming.md)
- [Creating Data Source Packages](guides/creating-data-source-packages.md)
- [Package Templates Usage](../packages/extensions/templates/USAGE.md)
- [Composition Pattern Examples](../examples/demos/glost-extensions-api-example/)
