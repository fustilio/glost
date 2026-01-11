# GLOST Examples

Comprehensive examples and demos demonstrating GLOST features organized by category.

## 📂 Structure

Examples are organized into three main categories:

- **`demos/`** - Simple, focused examples demonstrating specific features
- **`web-apps/`** - Full web applications with UI (built with Vite)
- **`benchmarks/`** - Performance tests and stress tests

## 🚀 Getting Started

### Quick Start

The best place to start is the **Quick Start Example**:

```bash
cd demos/glost-quick-start-example
pnpm test
```

This demonstrates basic GLOST usage: creating documents, working with nodes, and tree traversal.

## 📚 Examples by Category

### Language-Agnostic Demos

Examples that work with any language:

| Example | Description | Tests |
|---------|-------------|-------|
| [`glost-quick-start-example`](./demos/glost-quick-start-example/) | Basic GLOST operations and document creation | ✓ |
| [`glost-core-api-example`](./demos/glost-core-api-example/) | Core API usage with large documents | ✓ |
| [`glost-extensions-api-example`](./demos/glost-extensions-api-example/) | Extension system patterns and composition | ✓ |
| [`glost-processor-api-example`](./demos/glost-processor-api-example/) | Unified-style processor API with pipelines | ✓ |

### Language-Specific Demos

Examples demonstrating language-specific features:

| Example | Language | Description | Tests |
|---------|----------|-------------|-------|
| [`glost-ja-transcription-example`](./demos/glost-ja-transcription-example/) | Japanese | Japanese transcription with romaji | ✓ |
| [`glost-ko-transcription-example`](./demos/glost-ko-transcription-example/) | Korean | Korean transcription with romanization | ✓ |
| [`glost-th-transcription-example`](./demos/glost-th-transcription-example/) | Thai | Thai transcription with RTGS | ✓ |
| [`glost-th-extensions-suite-example`](./demos/glost-th-extensions-suite-example/) | Thai | Comprehensive Thai extension suite | ✓ |
| [`glost-th-multi-extension-pipeline-example`](./demos/glost-th-multi-extension-pipeline-example/) | Thai | Multi-extension pipeline demonstration | ✓ |

### Web Applications

Full-featured web applications with UI:

| Example | Description | Tech Stack |
|---------|-------------|------------|
| [`glost-composition-demo-example`](./web-apps/glost-composition-demo-example/) | Interactive composition patterns demo | Vite + TypeScript |
| [`glost-transcription-demo-example`](./web-apps/glost-transcription-demo-example/) | Interactive transcription playground | Vite + TypeScript |

### Performance & Benchmarks

Stress tests and performance benchmarks:

| Example | Description | Focus |
|---------|-------------|-------|
| [`glost-stress-tests-example`](./benchmarks/glost-stress-tests-example/) | Large document stress tests | Performance |

## 🧪 Running Examples

### Run All Tests

```bash
# From examples/ directory
pnpm test
```

### Run Category Tests

```bash
# Test all demos
pnpm test:demos

# Test web apps
pnpm test:webapps

# Test benchmarks
pnpm test:benchmarks
```

### Run Specific Example

```bash
# Navigate to example
cd demos/glost-quick-start-example

# Run tests
pnpm test

# Watch mode
pnpm test:watch
```

### Run Web Apps

```bash
# Navigate to web app
cd web-apps/glost-composition-demo-example

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## 📋 Language × Feature Matrix

See **[MATRIX.md](./MATRIX.md)** for a visual guide showing all possible language + feature combinations.

## 🏗️ Example Structure

Each example follows a consistent structure:

```
glost-{name}-example/
├── package.json          # Dependencies and scripts
├── README.md             # Example-specific documentation
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Test configuration (if applicable)
└── src/
    ├── index.ts          # Main entry point
    └── __tests__/        # Co-located tests
        └── *.test.ts
```

## 📖 Learn More

### Core Concepts

- [Getting Started Guide](../docs/getting-started.md)
- [GLOST Core Documentation](../docs/packages/core.md)
- [Extension Guide](../docs/guides/custom-extensions.md)

### API Documentation

- [Processor API](../docs/packages/processor.md)
- [Registry API](../docs/packages/registry.md)
- [Presets](../docs/packages/presets.md)

### Language Support

- [Thai Language](../packages/languages/th/)
- [Japanese Language](../packages/languages/ja/)
- [Korean Language](../packages/languages/ko/)
- [English Language](../packages/languages/en/)

## 🤝 Contributing

Want to add a new example? See [CONTRIBUTING.md](../CONTRIBUTING.md).

## 📝 License

MIT
