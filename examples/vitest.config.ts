/**
 * Vitest configuration for examples root
 * 
 * Note: Each demo has its own vitest.config.ts that uses vitest.config.base.ts
 * This config is used when running tests from the examples root directory.
 * 
 * Tests are organized by demo:
 * - Language-specific E2E tests are in their respective demo folders
 *   (e.g., demos/glost-ja-transcription-example/src/__tests__/)
 * - Core API tests are in demos/glost-core-api-example/src/__tests__/
 * 
 * To run tests for a specific demo, use: pnpm --filter <demo-name> test
 * To run all demo tests: pnpm test:demos
 */
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      // Tests in demo __tests__ folders (e.g., demos/*/src/__tests__/**/*.test.ts)
      '**/__tests__/**/*.test.ts',
      '**/__tests__/**/*.test.tsx',
      // Legacy patterns (if any tests still use these locations)
      '**/use-cases/**/*.test.ts',
      '**/stress-tests/**/*.test.ts',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
    ],
    testTimeout: 30000, // Longer timeout for stress tests
    setupFiles: ['./__tests__/setup.ts'],
  },
  resolve: {
    alias: [
      {
        find: 'glost-th/constants',
        replacement: path.resolve(__dirname, '../packages/languages/th/src/constants.ts'),
      },
      {
        find: 'glost-th/segmenter',
        replacement: path.resolve(__dirname, '../packages/languages/th/src/segmenter/index.ts'),
      },
      {
        find: 'glost',
        replacement: path.resolve(__dirname, '../packages/core/src/index.ts'),
      },
      {
        find: 'glost-plugins',
        replacement: path.resolve(__dirname, '../packages/plugins/core/src/index.ts'),
      },
      {
        find: 'glost-th',
        replacement: path.resolve(__dirname, '../packages/languages/th/src/index.ts'),
      },
      {
        find: 'glost-ja',
        replacement: path.resolve(__dirname, '../packages/languages/ja/src/index.ts'),
      },
      {
        find: 'glost-ko',
        replacement: path.resolve(__dirname, '../packages/languages/ko/src/index.ts'),
      },
    ]
  }
});
