# GLOST Ecosystem

## Overview

GLOST is designed as a core framework that enables an ecosystem of implementations, tools, and integrations.

## Ecosystem Layers

### 1. Core Framework

**Repository:** This repo  
**Packages:**
- `glost` - Core types and node factories
- `glost-common` - Language utilities and shared code
- `glost-extensions` - Extension system and built-in extensions
- `glost-utils` - Text parsing and manipulation

**Responsibility:** Define GLOST node types, provide extension architecture, maintain TypeScript types.

### 2. Standards & Specifications

**Standards:**
- [Metadata Schema](./standards/metadata-schema.md) - Standard metadata structure
- [Transcription Providers](./guides/implementing-transcription-providers.md) - Provider implementation patterns
- [Naming Conventions](./conventions/naming.md) - Package naming patterns

### 3. Production Implementations

GLOST is used in applications including multi-language learning platforms, interactive reading apps, and transcription tools.

### 4. Community Packages

**Categories:**
- **Language Packages:** `glost-{lang}` - Language-specific helpers
- **Data Sources:** `glost-{lang}-datasource-{source}` - Dictionary and corpus data
- **Transcription Systems:** `glost-{lang}-transcription-{system}` - Specific transcription implementations
- **Lookup Factories:** `glost-{lang}-lookup-{type}-{system}-{source}` - Combined lookup solutions
- **Plugins:** `glost-plugin-{framework}` - Framework integrations

### 5. Developer Tools

Testing utilities, validation tools, documentation generators, and migration scripts.

## Core and Implementations

| Aspect | GLOST Core | Production Implementations |
|--------|------------|---------------------------|
| **Scope** | Foundation types | Complete applications |
| **Dependencies** | Minimal | As needed |
| **Features** | Essential | Comprehensive |
| **React Components** | Basic (optional) | Production-ready |

GLOST Core provides the type system, extension architecture, and standard patterns. Implementations provide real-world validation, practical patterns, and additional features.

## Production Use

GLOST has been used in real-world applications with multiple languages across different writing systems, various transcription systems (IPA, romanization, phonetic), and hundreds of words with metadata.

**Applications:**
- Interactive stories with progressive disclosure
- Transcription and pronunciation tools
- Vocabulary builders
- Graded readers
- Content management for language learning

## Contributing

### As a User

Build applications, share feedback, report issues, and write examples.

### As a Package Author

Follow naming conventions, adopt metadata schema, publish to npm, document your work, and submit PRs to add packages to the ecosystem list.

### As an Implementation Team

Build on GLOST core, share patterns, participate in standards, showcase your work, and provide feedback.

## Standards Development

For proposing new standards or changes:
1. Draft proposal and document your idea
2. Open discussion via GitHub issue
3. Gather and incorporate feedback
4. Iterate and refine
5. Adopt by merging into standards docs

**Adopted Standards:**
- [Metadata Schema v1](./standards/metadata-schema.md)
- [Transcription Provider Patterns](./guides/implementing-transcription-providers.md)
- [Naming Conventions](./conventions/naming.md)
- [SRP/SSOT Architecture](./ARCHITECTURE_SUMMARY.md)

## Ecosystem Packages

### Official Packages

| Package | Description | Status |
|---------|-------------|--------|
| `glost` | Core types and nodes | Active |
| `glost-common` | Language utilities | Active |
| `glost-extensions` | Extension system | Active |
| `glost-utils` | Text utilities | Active |
| `glost-plugin-inkle` | Inkle integration | Active |
| `glost-th` | Thai language support | Active |
| `glost-ja` | Japanese language support | Active |

### Community Packages

Submit a PR to add your package to this list.

## Getting Help

- **Documentation:** [Getting Started](./getting-started.md), [Core Concepts](./concepts/nodes.md), [Extension System](./concepts/extensions.md)
- **Community:** GitHub Issues for bugs and features, GitHub Discussions for questions
- **Examples:** See [examples/](../examples/) directory

For implementers, review case studies, check implementation guides, follow naming conventions, and study example code.

## Ecosystem Principles

1. **Core Stays Focused** - GLOST core provides foundation (types, extension architecture, basic utilities), not features (UI components, data sources, complete language implementations)
2. **Standards Enable Ecosystem** - Shared standards help everyone
3. **Implementations Validate Standards** - Real production use proves patterns work
4. **Clear Attribution** - Acknowledge contributions and link to source implementations
5. **Complementary, Not Competitive** - Different layers serve different needs

## See Also

- [Why GLOST?](./why.md)
- [Architecture Summary](./ARCHITECTURE_SUMMARY.md)
- [Contributing](../CONTRIBUTING.md)
- [Examples](../examples/README.md)
