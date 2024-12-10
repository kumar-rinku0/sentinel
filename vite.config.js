import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://sentinel-0.vercel.app",
        changeOrigin: false,
        secure: true,
      },
    },
  },

  plugins: [react()],
});
