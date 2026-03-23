"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Vitest configuration for examples
 */
const config_1 = require("vitest/config");
const path_1 = __importDefault(require("path"));
exports.default = (0, config_1.defineConfig)({
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
            'glost': path_1.default.resolve(__dirname, '../packages/core/src/index.ts'),
            'glost-plugins': path_1.default.resolve(__dirname, '../packages/plugins/core/src/index.ts'),
            'glost-th': path_1.default.resolve(__dirname, '../packages/languages/th/src/index.ts'),
            'glost-ja': path_1.default.resolve(__dirname, '../packages/languages/ja/src/index.ts'),
            'glost-ko': path_1.default.resolve(__dirname, '../packages/languages/ko/src/index.ts'),
        }
    }
});
//# sourceMappingURL=vitest.config.js.map