import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, fileURLToPath(new URL(".", import.meta.url)), "");
  const proxyTarget = env.VITE_PROXY_TARGET || "http://localhost:8080";

  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }]
    },
    server: {
      host: true,
      proxy: {
        "/weather": {
          target: proxyTarget,
          changeOrigin: true
        },
        "/shelter": {
          target: proxyTarget,
          changeOrigin: true
        }
      }
    }
  };
});
