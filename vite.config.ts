import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: "/demo/index.html",
  },
  plugins: [react(), libInjectCss(), dts({ include: ["lib"] })],
  build: {
    copyPublicDir: false,
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es"],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
