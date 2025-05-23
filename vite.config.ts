import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost-cert.pem"),
    },
    port: 5173,
  },
  plugins: [react()],
  css: {
    postcss: {},
  },
});
