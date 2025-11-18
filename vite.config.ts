import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// https://vite.dev/config/
// __dirname isn't available in ESM mode (Vite uses ESM). Create a small shim so
// we can still resolve `src` paths using `path.resolve(__dirname, ...)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  publicDir: "./public",
  base: "./",
  // PostCSS/Tailwind is configured in `postcss.config.cjs`.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
