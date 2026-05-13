import { defineConfig } from "vitest/config";

// glost-core@0.6.2 ships .ts source as its main entry. Force vite-node to
// pre-bundle so the worker only sees compiled JS.
export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ["glost-core", "glost"],
      },
    },
    deps: {
      optimizer: {
        ssr: {
          include: ["glost-core", "glost"],
        },
      },
    },
  },
});
