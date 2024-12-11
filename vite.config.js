import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        target: "https://sentinel-0.vercel.app",
        changeOrigin: true,
      },
    },
  },

  plugins: [react()],
});
