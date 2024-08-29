/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import { coverageConfigDefaults, defaultExclude } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      exclude: [
        "lib/index.ts",
        "lib/types.ts",
        "vitest.setup.ts",
        "demo",
        ...coverageConfigDefaults.exclude,
      ],
    },
    exclude: ["demo", ...defaultExclude],
  },
});
