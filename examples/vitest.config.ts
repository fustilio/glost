/**
 * Vitest configuration for examples
 */
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      '**/__tests__/**/*.test.ts',
      '**/use-cases/**/*.test.ts',
      '**/stress-tests/**/*.test.ts',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
    ],
    testTimeout: 30000, // Longer timeout for stress tests
  },
  resolve: {
    alias: {
      '@glotblocks/glost': path.resolve(__dirname, '../packages/core/src/index.ts'),
      '@glotblocks/glost-plugins': path.resolve(__dirname, '../packages/plugins/core/src/index.ts'),
      '@glotblocks/glost-th': path.resolve(__dirname, '../packages/languages/th/src/index.ts'),
      '@glotblocks/glost-ja': path.resolve(__dirname, '../packages/languages/ja/src/index.ts'),
      '@glotblocks/glost-ko': path.resolve(__dirname, '../packages/languages/ko/src/index.ts'),
    }
  }
});
