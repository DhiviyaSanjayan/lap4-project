import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

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
  build: {
    sourcemap: true,
  },
  coverage: {
    reporter: ["text", "json", "html", "lcov"],
  },
  assetsInclude: ["**/*.html", "**/*.css", "**/*.js", "**/*.json"],
});
// import { defineConfig } from "vite";

// export default defineConfig({
//   test: {
//     environment: "jsdom",
//   },
// });
