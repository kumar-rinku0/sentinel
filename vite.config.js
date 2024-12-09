import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    // origin: "http://127.0.0.1:8000",
    proxy: {
      "/api": "https://delta-brown.vercel.app/",
    },
  },

  plugins: [react()],
});
