import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: [
      {
        find: /^glost-th\/(.*)$/,
        replacement: resolve(__dirname, '../../../packages/languages/th/src/$1.ts'),
      },
      {
        find: 'glost-th',
        replacement: resolve(__dirname, '../../../packages/languages/th/src/index.ts'),
      },
      {
        find: 'glost/nodes',
        replacement: resolve(__dirname, '../../../packages/core/src/index.ts'),
      },
      {
        find: 'glost',
        replacement: resolve(__dirname, '../../../packages/core/src/index.ts'),
      },
      {
        find: 'glost-common',
        replacement: resolve(__dirname, '../../../packages/common/src/index.ts'),
      },
      {
        find: 'glost-extensions',
        replacement: resolve(__dirname, '../../../packages/extensions/extensions/src/index.ts'),
      },
      {
        find: 'glost-transcription',
        replacement: resolve(__dirname, '../../../packages/extensions/transcription/src/index.ts'),
      },
      {
        find: 'glost-translation',
        replacement: resolve(__dirname, '../../../packages/extensions/translation/src/index.ts'),
      },
      {
        find: 'glost-frequency',
        replacement: resolve(__dirname, '../../../packages/extensions/frequency/src/index.ts'),
      },
    ],
  },
});
