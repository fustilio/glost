/**
 * Shared Vitest Configuration for GLOST Examples
 *
 * This base configuration is used by all example packages to avoid duplication.
 * Each example can extend this and add language-specific aliases.
 *
 * @packageDocumentation
 */
import { type UserConfig } from 'vitest/config';
/**
 * Create a base Vitest config for GLOST examples
 *
 * @param exampleDir - The directory of the example package (use __dirname)
 * @param languagePackages - Language packages to alias (e.g., ['th', 'ja'])
 * @returns Vitest configuration
 */
export declare function createExampleVitestConfig(exampleDir: string, languagePackages?: string[]): UserConfig;
/**
 * Get __dirname equivalent in ESM
 * Use this in your example's vitest.config.ts if you're using ESM
 */
export declare function getESMDirname(importMetaUrl: string): string;
//# sourceMappingURL=vitest.config.base.d.ts.map