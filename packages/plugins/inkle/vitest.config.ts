import { defineConfig } from "vitest/config";

// glost-core@0.6.2 ships .ts source as its main entry. Vitest's native type-
// stripping refuses to handle .ts files under node_modules. Force vite-node
// to pre-bundle the package so the worker only sees compiled JS.
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ["glost-core", "glost"],
      },
    },
    deps: {
      // vitest 3.x — both `server.deps.inline` and `deps.optimizer.ssr.include`
      // are needed depending on how the import resolves.
      optimizer: {
        ssr: {
          include: ["glost-core", "glost"],
        },
      },
    },
  },
});
