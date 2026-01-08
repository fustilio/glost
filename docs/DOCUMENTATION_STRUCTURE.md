# GLOST Documentation Structure

This document outlines the organization of GLOST documentation after consolidation.

## Quick Navigation

### For Users
- **[README.md](../README.md)** - Project overview and quick start
- **[MIGRATION.md](../MIGRATION.md)** - Quick migration guide (v0.1.x → v0.2.0)
- **[docs/getting-started.md](./getting-started.md)** - Detailed getting started guide
- **[docs/why.md](./why.md)** - Why use GLOST?

### For Developers
- **[docs/guides/](./guides/)** - Implementation guides
- **[docs/api.md](./api.md)** - Complete API reference
- **[docs/ARCHITECTURE_SUMMARY.md](./ARCHITECTURE_SUMMARY.md)** - Architecture overview

### For Language Implementers
- **[docs/guides/multi-language-architecture.md](./guides/multi-language-architecture.md)** - How to structure language packages
- **[docs/guides/implementing-transcription-providers.md](./guides/implementing-transcription-providers.md)** - Three proven approaches
- **[packages/languages/th/README.md](../packages/languages/th/README.md)** - Thai package example
- **[packages/languages/ja/README.md](../packages/languages/ja/README.md)** - Japanese package example

## Documentation Hierarchy

```
docs/
├── index.md                              # Documentation index
├── getting-started.md                    # Installation & setup
├── why.md                                # Motivation & use cases
├── api.md                                # Complete API reference
├── ARCHITECTURE_SUMMARY.md               # System architecture
├── ecosystem.md                          # Ecosystem & community
│
├── concepts/                             # Core concepts
│   ├── nodes.md                          # Node types
│   └── extensions.md                     # Extension system
│
├── guides/                               # Implementation guides
│   ├── creating-documents.md             # Creating GLOST documents
│   ├── using-extensions.md               # Using extensions
│   ├── custom-extensions.md              # Creating extensions
│   ├── multi-language-architecture.md    # Language package pattern
│   ├── implementing-transcription-providers.md  # Transcription systems
│   ├── creating-data-source-packages.md  # Data packages
│   ├── thai.md                          # Thai-specific guide
│   └── japanese.md                      # Japanese-specific guide
│
├── standards/                            # Standards & specs
│   └── metadata-schema.md                # Standard metadata
│
├── conventions/                          # Naming & patterns
│   └── naming.md                         # Naming conventions
│
├── migration/                            # Migration guides
│   └── externalized-language-packages.md # v0.2.0 migration details
│
├── packages/                             # Package-specific docs
│   ├── core.md                          # glost package
│   ├── extensions.md                    # glost-extensions
│   ├── utils.md                         # glost-utils
│   ├── transcription.md                 # transcription extension
│   ├── translation.md                   # translation extension
│   └── inkle.md                         # inkle plugin
│
├── languages.md                          # Language codes reference
└── proficiency.md                        # Proficiency levels reference
```

## Package Documentation

Each package has its own README:

```
packages/
├── core/README.md                        # Core package docs
├── common/README.md                      # Common utilities
├── extensions/extensions/README.md       # Extension system
├── utils/README.md                       # Text utilities
├── languages/
│   ├── th/README.md                     # Thai package
│   └── ja/README.md                     # Japanese package
├── extensions/
│   ├── transcription/README.md          # Transcription extension
│   └── translation/README.md            # Translation extension
└── plugins/
    └── inkle/README.md                   # Inkle plugin
```

## Removed (Transient) Documents

The following documents were removed during consolidation as they were work logs, not permanent documentation:

- ❌ `docs/EXTERNALIZATION_COMPLETE.md` - Work completion log
- ❌ `docs/LANGUAGE_PACKAGES_SUMMARY.md` - Redundant summary
- ❌ `docs/migration/externalized-language-packages-summary.md` - Redundant technical details

All relevant information from these documents has been consolidated into:
- `MIGRATION.md` - Quick reference
- `docs/migration/externalized-language-packages.md` - Detailed guide

## Documentation Principles

### 1. Single Source of Truth
Each concept is documented in one primary location, referenced elsewhere.

### 2. Progressive Disclosure
- **README.md** - High-level overview
- **Quick guides** - Get started fast
- **Detailed guides** - Deep dives
- **API reference** - Complete details

### 3. Audience-Specific
Different audiences have different needs:
- **Users** - How to use GLOST
- **Developers** - How to build with GLOST
- **Contributors** - How to extend GLOST

### 4. Cross-Referenced
Documents link to related documentation for easy navigation.

## Contributing to Documentation

When adding documentation:

1. **Determine the audience** - User, developer, or contributor?
2. **Find the right location** - Use the hierarchy above
3. **Link from index** - Add to `docs/index.md`
4. **Cross-reference** - Link to related docs
5. **Keep it current** - Update when code changes

## Documentation Standards

- Use Markdown (.md) format
- Include code examples where relevant
- Keep examples up-to-date with latest API
- Use consistent heading levels
- Link to related documentation
- Provide context before technical details

## See Also

- [Ecosystem Overview](./ecosystem.md) - Community and packages
- [API Reference](./api.md) - Complete API docs
- [Architecture Summary](./ARCHITECTURE_SUMMARY.md) - System design
