import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Swapped from SWC to standard Babel plugin

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: "127.0.0.1", // ◄ Add this line to force raw IP binding
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
