# Contributing to GLOST

Thank you for your interest in contributing to GLOST! We appreciate your help.

## Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build packages: `pnpm build`
4. Run tests: `pnpm test`

## Package Structure

GLOST is a monorepo managed with pnpm workspaces. Each package in `packages/` is independently versioned and can be published separately.

## Making Changes

1. Create a new branch for your changes
2. Make your changes in the appropriate package(s)
3. Add tests for new functionality
4. Run `pnpm build` and `pnpm test` to ensure everything works
5. Submit a pull request

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Add JSDoc comments for public APIs
- Keep functions focused and well-named

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Add integration tests for cross-package functionality

## Documentation

- Update README files when adding features
- Add examples for new functionality
- Keep API documentation up to date

## Contributing to the Ecosystem

Beyond core GLOST contributions, you can also contribute to the ecosystem:

### Create Packages

- **Data Source Packages** - Dictionary data, corpus sources
- **Transcription Systems** - Romanization systems for languages
- **Lookup Factories** - Compose data sources with transcription systems
- **Plugins** - Framework integrations (React, Vue, etc.)

See: [Creating Data Source Packages](docs/guides/creating-data-source-packages.md)

### Share Implementations

Built something with GLOST? We'd be happy to feature it:

1. Document your implementation and patterns
2. Submit PR to add to [Ecosystem](docs/ecosystem.md)
3. Share insights that might benefit others

### Improve Standards

Help refine GLOST standards:

- [Metadata Schema](docs/standards/metadata-schema.md)
- [Transcription Patterns](docs/guides/implementing-transcription-providers.md)
- [Naming Conventions](docs/conventions/naming.md)

Open an issue to discuss improvements or propose new standards.

## Questions?

Open an issue for discussion before making major changes.
