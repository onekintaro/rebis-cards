import { defineConfig } from "vite";
import { resolve } from "node:path";

const outDir =
  process.env.HA_WWW
    ? resolve(process.env.HA_WWW, "rebis-cards")
    : resolve(__dirname, "dist");

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "RebisCards",
      formats: ["es"]
    },
    outDir,
    emptyOutDir: false,
    rollupOptions: {
      output: {
        entryFileNames: "rebis-cards.js",
        chunkFileNames: "rebis-[name].js",
        assetFileNames: "rebis-[name][extname]"
      }
    }
  }
});