import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const proxyTarget = env.VITE_PROXY_TARGET;

  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }]
    },
    server: {
      host: true,
      historyApiFallback: true,
      proxy: {
        "/weather": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/weather/, "/api/weather")
        },
        "/shelter": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/shelter/, "/api/shelter")
        },
        "/route": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/route/, "/api/route")
        }
      }
    }
  };
});
