import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/glost-core/, /glost-extensions/, /^glost$/],
      },
    },
  },
});
