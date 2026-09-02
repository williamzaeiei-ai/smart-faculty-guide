import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // relative base so the built files work correctly on GitHub Pages
  // (served from https://<username>.github.io/<repo-name>/)
  base: "./",
});
