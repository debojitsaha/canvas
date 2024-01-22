import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "build",
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
  plugins: [react(), jsconfigPaths()],
  resolve: {
    alias: {
      src: "src/",
      components: "/src/components",
    },
  },
});
