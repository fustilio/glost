# Contributing to GLOST

Thank you for your interest in contributing to GLOST! We appreciate your help.

GLOST is a framework for processing multilingual text with language learning annotations using a unified/remark-style plugin system.

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build packages: `pnpm build`
4. Run tests: `pnpm test`

## Package Structure

GLOST is a monorepo published under the `@glotblocks/` npm scope. See the
[package index in the README](./README.md#packages) for the full, current list —
it is not duplicated here.

## Making Changes

1. Create a new branch for your changes
2. Make your changes in the appropriate package(s)
3. Add tests for new functionality
4. Run `pnpm build` and `pnpm test` to ensure everything works
5. Update documentation as needed
6. Submit a pull request

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Add JSDoc comments for public APIs
- Keep functions focused and well-named
- Use functional patterns where appropriate

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Add integration tests for cross-package functionality
- Use the examples/ directory for integration examples

### Running Tests

```bash
# All tests
pnpm test -r

# Specific package
cd packages/processor && pnpm test

# With coverage
pnpm test:coverage
```

### Running Benchmarks

```bash
# All benchmarks
pnpm bench

# Specific package
pnpm bench:extensions
pnpm bench:plugins
```

## Documentation

- Update README files when adding features
- Add examples for new functionality
- Keep API documentation up to date
- Follow the docs site structure under `docs/content/`

### Documentation Structure

- **README.md** - Project overview
- **docs/content/** - Documentation site content (Nextra)
- **docs/content/guides/** - Implementation guides
- **docs/adr/** - Architecture decision records
- **Package READMEs** - Package-specific documentation

## Contributing to the Ecosystem

Beyond core GLOST contributions, you can also contribute to the ecosystem:

### 1. Create Plugins

Create new extensions for the GLOST plugin ecosystem:

```typescript
import { GLOSTExtension } from "@glotblocks/glost-core";

export const myPlugin: GLOSTExtension = {
  id: "my-plugin",
  name: "My Plugin",
  version: "1.0.0",
  transform: (document) => {
    // Transform logic
    return document;
  }
};
```

**See:**
- [Custom Plugins Guide](./docs/content/guides/custom-plugins.mdx)
- [Plugins Guide](./docs/content/plugins-guide.mdx)

### 2. Create Language Packages

Add support for new languages:

```typescript
import { GLOSTWord } from "@glotblocks/glost-core";

export function createMyLangWord(props: MyLangWordProps): GLOSTWord {
  // Language-specific word creation
}
```

**See:**
- [Multi-Language Architecture](./docs/content/guides/multi-language-architecture.mdx)
- [Thai Package](./packages/languages/th) (example)
- [Japanese Package](./packages/languages/ja) (example)

### 3. Create Data Source Packages

Build packages that provide dictionary data, frequency lists, or other language resources:

**See:**
- [Creating Data Source Packages](./docs/content/guides/creating-data-source-packages.mdx)
- [Implementing Transcription Providers](./docs/content/guides/implementing-transcription-providers.mdx)

### 4. Create Presets

Share plugin combinations for specific use cases:

```typescript
export function myPreset(options) {
  return {
    plugins: [plugin1, plugin2, plugin3],
    settings: { ... }
  };
}
```

**See:** [Presets Package](./packages/presets)

### 5. Share Implementations

Built something with GLOST? We'd be happy to feature it:

1. Document your implementation and patterns
2. Submit PR to add to [Ecosystem](./docs/content/ecosystem.mdx)
3. Share insights that might benefit others

## Development Workflow

### 1. Local Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test -r

# Run specific package tests
cd packages/processor && pnpm test

# Watch mode for development
cd packages/processor && pnpm test --watch
```

### 2. Creating a New Package

```bash
# Create package directory
mkdir -p packages/my-package/src

# Create package.json
cd packages/my-package
pnpm init

# Add to workspace (pnpm-workspace.yaml already includes packages/**)
```

### 3. Adding Dependencies

```bash
# Add dependency to specific package
cd packages/my-package
pnpm add dependency-name

# Add workspace dependency
pnpm add @glotblocks/glost-core --workspace
```

## Architecture Principles

GLOST follows these principles:

1. **Single Responsibility** - Each package has one clear purpose
2. **Composability** - Features compose through plugins
3. **Type Safety** - Full TypeScript support with strict types
4. **No Data > Bad Data** - Extensions gracefully handle missing data
5. **Language Agnostic Core** - Language-specific logic in language packages

**See:** [Architecture Summary](./docs/content/architecture-summary.mdx)

## Pull Request Process

1. **Create a descriptive PR title**
   - Format: `feat(package): description` or `fix(package): description`
   - Examples: `feat(processor): add hook system`, `fix(registry): resolve conflicts correctly`

2. **Include relevant tests**
   - Unit tests for new functions
   - Integration tests for cross-package features
   - Update existing tests if behavior changes

3. **Update documentation**
   - README files for user-facing changes
   - JSDoc comments for API changes
   - Migration guides for breaking changes

4. **Run checks before submitting**
   ```bash
   pnpm build
   pnpm test -r
   pnpm lint
   ```

5. **Link related issues**
   - Reference issues in PR description
   - Use keywords: `Fixes #123`, `Closes #456`

## Release Process

Releases are automated with [Changesets](https://github.com/changesets/changesets) +
GitHub Actions (`.github/workflows/release.yml`). Nobody publishes from a laptop.

1. **In your PR**, add a changeset describing the change and bump type:
   ```bash
   pnpm changeset
   ```
   Commit the generated `.changeset/*.md` file with your change.
2. **On merge to `main`**, the release workflow opens (or refreshes) a
   "Version Packages" PR that applies all pending changesets: version bumps +
   `CHANGELOG.md` entries.
3. **Merging the Version Packages PR publishes to npm.** The workflow runs
   `pnpm changeset:release` (publint gate + `changeset publish`) using npm
   **OIDC trusted publishing** — there is no `NPM_TOKEN` secret. Each package
   must have a trusted publisher configured on npmjs.com for
   `fustilio/glost` / `release.yml`; brand-new packages need one manual first
   publish before OIDC can take over.

## Questions?

- 💬 [GitHub Discussions](https://github.com/fustilio/glost/discussions) - Ask questions
- 🐛 [Issue Tracker](https://github.com/fustilio/glost/issues) - Report bugs
- 📖 [Documentation](./docs/content/index.mdx) - Read the docs

Open an issue for discussion before making major changes.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
