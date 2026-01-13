# GLOST Documentation

This directory contains the GLOST documentation site powered by [Nextra v3](https://nextra.site/).

## Getting Started

### Installation

```bash
cd docs
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

The documentation site will be available at `http://localhost:3001`.

### Build

Build the documentation site:

```bash
pnpm build
```

### Start

Start the production server:

```bash
pnpm start
```

## Project Structure

```
docs/
├── pages/              # Documentation pages (MDX files)
│   ├── _meta.tsx      # Navigation configuration
│   ├── _app.tsx       # Custom App component
│   ├── index.mdx      # Home page
│   ├── guides/        # User guides
│   ├── concepts/      # Core concepts
│   ├── packages/      # Package documentation
│   └── ...
├── theme.config.tsx   # Nextra theme configuration
├── next.config.mjs    # Next.js configuration
└── package.json       # Dependencies
```

## Writing Documentation

- All documentation files are in MDX format (`.mdx`)
- Place files in the `pages/` directory
- Update `_meta.tsx` files to configure navigation
- Use Nextra components for enhanced documentation features

See the [Nextra documentation](https://nextra.site/) for more details.
