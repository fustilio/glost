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
        find: 'glost-th',
        replacement: resolve(__dirname, '../../packages/languages/th/src/index.ts'),
      },
      {
        find: 'glost/nodes',
        replacement: resolve(__dirname, '../../packages/core/src/index.ts'),
      },
      {
        find: 'glost',
        replacement: resolve(__dirname, '../../packages/core/src/index.ts'),
      },
      {
        find: 'glost-common',
        replacement: resolve(__dirname, '../../packages/common/src/index.ts'),
      },
      {
        find: 'glost-extensions',
        replacement: resolve(__dirname, '../../packages/extensions/extensions/src/index.ts'),
      },
      {
        find: 'glost-transcription',
        replacement: resolve(__dirname, '../../packages/extensions/transcription/src/index.ts'),
      },
      {
        find: 'glost-translation',
        replacement: resolve(__dirname, '../../packages/extensions/translation/src/index.ts'),
      },
      {
        find: 'unist-util-visit',
        replacement: resolve(__dirname, '../../node_modules/.pnpm/unist-util-visit@5.0.0/node_modules/unist-util-visit/index.js'),
      },
      {
        find: 'unist-util-is',
        replacement: resolve(__dirname, '../../node_modules/.pnpm/unist-util-is@6.0.1/node_modules/unist-util-is/index.js'),
      },
      {
        find: 'unist-util-visit-parents',
        replacement: resolve(__dirname, '../../node_modules/.pnpm/unist-util-visit-parents@6.0.2/node_modules/unist-util-visit-parents/index.js'),
      },
      {
        find: '@types/unist',
        replacement: resolve(__dirname, '../../node_modules/.pnpm/@types+unist@3.0.3/node_modules/@types/unist/index.d.ts'),
      },
    ],
  },
});
