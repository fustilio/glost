import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    setupFiles: ['../../__tests__/setup.ts'],
  },
  resolve: {
    alias: [
      {
        find: 'glost',
        replacement: path.resolve(__dirname, '../../../packages/core/src/index.ts'),
      },
      {
        find: 'glost-plugins',
        replacement: path.resolve(__dirname, '../../../packages/plugins/core/src/index.ts'),
      },
      {
        find: 'glost-th',
        replacement: path.resolve(__dirname, '../../../packages/languages/th/src/index.ts'),
      },
      {
        find: '@demo/thai-extensions',
        replacement: path.resolve(__dirname, '../../demos/glost-th-extensions-suite-example/src/index.ts'),
      },
    ]
  }
});
