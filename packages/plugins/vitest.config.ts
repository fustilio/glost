import { defineConfig } from "vitest/config";

// glost-plugins runs vitest across all subpackages (including inkle/), where
// glost-core's published .ts source needs to be force-bundled.
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
