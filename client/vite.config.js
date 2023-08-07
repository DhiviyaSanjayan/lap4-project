import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
    }),
  ],
  css: {
    modules: {
      localsConvention: "dashes",
      generateScopedName: "[local]_[hash:base64:2]",
    },
  },
  test: {
    environment: "jsdom",
  },
});
