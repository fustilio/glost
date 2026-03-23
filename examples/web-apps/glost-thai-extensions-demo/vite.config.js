import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const monorepoRoot = resolve(__dirname, '../../..');
export default defineConfig({
    resolve: {
        alias: {
            'glost': resolve(monorepoRoot, 'packages/core/src/index.ts'),
            'glost-plugins': resolve(monorepoRoot, 'packages/plugins/core/src/index.ts'),
            'glost-th': resolve(monorepoRoot, 'packages/languages/th/src/index.ts'),
        },
    },
});
//# sourceMappingURL=vite.config.js.map