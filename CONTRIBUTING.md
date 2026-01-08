# Contributing to GLOST

Thank you for your interest in contributing to GLOST!

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

## Questions?

Open an issue for discussion before making major changes.
