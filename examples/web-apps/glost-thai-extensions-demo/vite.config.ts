import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const monorepoRoot = resolve(__dirname, '../../..');

export default defineConfig({
  resolve: {
    alias: {
      '@glotblocks/glost': resolve(monorepoRoot, 'packages/core/src/index.ts'),
      '@glotblocks/glost-plugins': resolve(monorepoRoot, 'packages/plugins/core/src/index.ts'),
      '@glotblocks/glost-th': resolve(monorepoRoot, 'packages/languages/th/src/index.ts'),
    },
  },
});
