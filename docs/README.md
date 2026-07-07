# GLOST Documentation

This directory contains the GLOST documentation site powered by [Nextra v4](https://nextra.site/).

## Status

⚠️ **Work in Progress**: This documentation site has been migrated to Nextra v4 with Next.js 15 App Router. The structure is in place, but there are currently some compatibility issues with the build process that need to be resolved.

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

**Note**: The build is currently encountering issues with Nextra v4's MDX processing. This is being actively worked on.

## Project Structure

```
docs/
├── app/               # Next.js App Router shell
│   ├── layout.jsx     # Root layout
│   ├── page.jsx       # Home page
│   ├── docs/          # Docs route ([[...mdxPath]] catch-all)
│   └── _meta.ts       # Navigation configuration
├── content/           # All documentation content (MDX)
│   ├── getting-started.mdx
│   ├── api/           # API reference (BCP-47, language codes, proficiency)
│   ├── concepts/      # Core concepts
│   ├── conventions/   # Conventions
│   ├── examples/      # Example walkthroughs
│   ├── guides/        # User guides
│   ├── migration/     # Migration guides
│   ├── packages/      # Package documentation
│   ├── releases/      # Release notes
│   └── _meta.ts       # Per-directory navigation
├── adr/               # Architecture decision records
├── next.config.mjs    # Next.js configuration
├── mdx-components.js  # MDX components configuration
└── package.json       # Dependencies
```

## Writing Documentation

- All documentation files are in MDX format (`.mdx`)
- Place files in the `content/` directory (Nextra v4 content convention)
- Update `_meta.ts` files to configure navigation
- Use Nextra components for enhanced documentation features

See the [Nextra v4 documentation](https://the-guild.dev/blog/nextra-4) for more details.
