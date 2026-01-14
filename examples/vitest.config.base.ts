/**
 * Shared Vitest Configuration for GLOST Examples
 * 
 * This base configuration is used by all example packages to avoid duplication.
 * Each example can extend this and add language-specific aliases.
 * 
 * @packageDocumentation
 */

import { defineConfig, type UserConfig } from 'vitest/config';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Create a base Vitest config for GLOST examples
 * 
 * @param exampleDir - The directory of the example package (use __dirname)
 * @param languagePackages - Language packages to alias (e.g., ['th', 'ja'])
 * @returns Vitest configuration
 */
export function createExampleVitestConfig(
  exampleDir: string,
  languagePackages: string[] = []
): UserConfig {
  // Calculate paths relative to the example directory
  // Examples can be in examples/ or examples/demos/, so find monorepo root
  let monorepoRoot = exampleDir;
  while (!monorepoRoot.endsWith('examples')) {
    monorepoRoot = resolve(monorepoRoot, '..');
  }
  monorepoRoot = resolve(monorepoRoot, '..');
  
  const packagesDir = resolve(monorepoRoot, 'packages');
  const nodeModulesDir = resolve(monorepoRoot, 'node_modules');

  // Common aliases shared by all examples
  const commonAliases = [
    {
      find: 'glost/nodes',
      replacement: resolve(packagesDir, 'core/src/index.ts'),
    },
    {
      find: 'glost',
      replacement: resolve(packagesDir, 'core/src/index.ts'),
    },
    {
      find: 'glost-common',
      replacement: resolve(packagesDir, 'common/src/index.ts'),
    },
    {
      find: 'glost-plugins',
      replacement: resolve(packagesDir, 'plugins/core/src/index.ts'),
    },
    {
      find: 'glost-transcription',
      replacement: resolve(packagesDir, 'plugins/transcription/src/index.ts'),
    },
    {
      find: 'glost-translation',
      replacement: resolve(packagesDir, 'plugins/translation/src/index.ts'),
    },
    {
      find: 'glost-frequency',
      replacement: resolve(packagesDir, 'plugins/frequency/src/index.ts'),
    },
    {
      find: 'glost-difficulty',
      replacement: resolve(packagesDir, 'plugins/difficulty/src/index.ts'),
    },
    {
      find: 'glost-pos',
      replacement: resolve(packagesDir, 'plugins/pos/src/index.ts'),
    },
    // External dependencies (need exact paths in monorepo)
    {
      find: 'unist-util-visit',
      replacement: resolve(nodeModulesDir, '.pnpm/unist-util-visit@5.0.0/node_modules/unist-util-visit/index.js'),
    },
    {
      find: 'unist-util-is',
      replacement: resolve(nodeModulesDir, '.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/index.js'),
    },
  ];

  // Generate language-specific aliases
  const languageAliases = languagePackages.flatMap((lang) => [
    // Support subpath imports like glost-th/constants
    {
      find: new RegExp(`^glost-${lang}\/(.*)$`),
      replacement: resolve(packagesDir, `languages/${lang}/src/$1.ts`),
    },
    // Main package import
    {
      find: `glost-${lang}`,
      replacement: resolve(packagesDir, `languages/${lang}/src/index.ts`),
    },
  ]);

  return defineConfig({
    test: {
      globals: true,
      environment: 'node',
    },
    resolve: {
      alias: [...languageAliases, ...commonAliases],
    },
  });
}

/**
 * Get __dirname equivalent in ESM
 * Use this in your example's vitest.config.ts if you're using ESM
 */
export function getESMDirname(importMetaUrl: string): string {
  return dirname(fileURLToPath(importMetaUrl));
}
