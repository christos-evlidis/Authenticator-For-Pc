import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "../project/src/manifest.json";

const pmgrDir = path.dirname(fileURLToPath(import.meta.url));
const pmgrModules = path.join(pmgrDir, "node_modules");
const srcRoot = path.resolve(pmgrDir, "../project/src");

export default defineConfig({
  root: "../project/src",
  plugins: [crx({ manifest })],
  resolve: {
    alias: {
      "@": srcRoot,
      "@fortawesome/fontawesome-free": path.join(pmgrModules, "@fortawesome/fontawesome-free"),
      "crypto-js": path.join(pmgrModules, "crypto-js"),
      "jsqr": path.join(pmgrModules, "jsqr"),
    },
  },
  build: {
    outDir: "../../.pmgr/dist",
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: {
        compact: false,
        entryFileNames: "javascript/[name].js",
        chunkFileNames: "javascript/[name].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? assetInfo.name ?? "";
          if (name.endsWith(".css")) {
            return "css/[name][extname]";
          }
          return "assets/[name][extname]";
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
});
