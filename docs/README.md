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
├── app/                # Next.js App Router
│   ├── layout.tsx     # Root layout
│   ├── globals.css    # Global styles
│   ├── page.mdx       # Home page
│   ├── guides/        # User guides
│   ├── concepts/      # Core concepts
│   ├── packages/      # Package documentation
│   └── _meta.ts       # Navigation configuration
├── theme.config.tsx   # Nextra theme configuration
├── next.config.mjs    # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── mdx-components.tsx # MDX components configuration
└── package.json       # Dependencies
```

## Writing Documentation

- All documentation files are in MDX format (`.mdx`)
- Place files in the `app/` directory following Next.js App Router conventions
- Update `_meta.ts` files to configure navigation
- Use Nextra components for enhanced documentation features

See the [Nextra v4 documentation](https://the-guild.dev/blog/nextra-4) for more details.
