/**
 * Vitest configuration for glost-react package
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/__tests__/**/*.test.tsx', '**/__tests__/**/*.test.ts'],
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: [
      {
        find: 'glost',
        replacement: path.resolve(__dirname, '../glost/src/index.ts'),
      },
    ],
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    conditions: ['import', 'module', 'browser', 'default'],
  }
});
