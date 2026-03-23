"use strict";
/**
 * Shared Vitest Configuration for GLOST Examples
 *
 * This base configuration is used by all example packages to avoid duplication.
 * Each example can extend this and add language-specific aliases.
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExampleVitestConfig = createExampleVitestConfig;
exports.getESMDirname = getESMDirname;
const config_1 = require("vitest/config");
const path_1 = require("path");
const url_1 = require("url");
/**
 * Create a base Vitest config for GLOST examples
 *
 * @param exampleDir - The directory of the example package (use __dirname)
 * @param languagePackages - Language packages to alias (e.g., ['th', 'ja'])
 * @returns Vitest configuration
 */
function createExampleVitestConfig(exampleDir, languagePackages = []) {
    // Calculate paths relative to the example directory
    // Examples can be in examples/ or examples/demos/, so find monorepo root
    let monorepoRoot = exampleDir;
    while (!monorepoRoot.endsWith('examples')) {
        monorepoRoot = (0, path_1.resolve)(monorepoRoot, '..');
    }
    monorepoRoot = (0, path_1.resolve)(monorepoRoot, '..');
    const packagesDir = (0, path_1.resolve)(monorepoRoot, 'packages');
    const nodeModulesDir = (0, path_1.resolve)(monorepoRoot, 'node_modules');
    // Common aliases shared by all examples
    const commonAliases = [
        {
            find: 'glost/nodes',
            replacement: (0, path_1.resolve)(packagesDir, 'core/src/index.ts'),
        },
        {
            find: 'glost',
            replacement: (0, path_1.resolve)(packagesDir, 'core/src/index.ts'),
        },
        {
            find: 'glost-common',
            replacement: (0, path_1.resolve)(packagesDir, 'common/src/index.ts'),
        },
        {
            find: 'glost-plugins',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/core/src/index.ts'),
        },
        {
            find: 'glost-transcription',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/transcription/src/index.ts'),
        },
        {
            find: 'glost-translation',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/translation/src/index.ts'),
        },
        {
            find: 'glost-frequency',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/frequency/src/index.ts'),
        },
        {
            find: 'glost-difficulty',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/difficulty/src/index.ts'),
        },
        {
            find: 'glost-pos',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/pos/src/index.ts'),
        },
        {
            find: 'glost-clause-segmenter',
            replacement: (0, path_1.resolve)(packagesDir, 'plugins/clause-segmenter/src/index.ts'),
        },
        // External dependencies (need exact paths in monorepo)
        {
            find: 'unist-util-visit',
            replacement: (0, path_1.resolve)(nodeModulesDir, '.pnpm/unist-util-visit@5.0.0/node_modules/unist-util-visit/index.js'),
        },
        {
            find: 'unist-util-is',
            replacement: (0, path_1.resolve)(nodeModulesDir, '.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/index.js'),
        },
    ];
    // Generate language-specific aliases
    const languageAliases = languagePackages.flatMap((lang) => [
        // Support subpath imports like glost-th/constants or glost-th/segmenter
        // Handle both direct files (constants.ts) and directories (segmenter/index.ts)
        {
            find: new RegExp(`^glost-${lang}\/(.*)$`),
            replacement: (0, path_1.resolve)(packagesDir, `languages/${lang}/src/$1`),
        },
        // Main package import
        {
            find: `glost-${lang}`,
            replacement: (0, path_1.resolve)(packagesDir, `languages/${lang}/src/index.ts`),
        },
    ]);
    return (0, config_1.defineConfig)({
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
function getESMDirname(importMetaUrl) {
    return (0, path_1.dirname)((0, url_1.fileURLToPath)(importMetaUrl));
}
//# sourceMappingURL=vitest.config.base.js.map