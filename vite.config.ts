import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const useSingleFile = mode === "singlefile"; // only when you run: vite build --mode singlefile

  return {
    plugins: [
      react(),
      tailwindcss(),

      // PWA (app-like)
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        manifest: {
          name: "Subora",
          short_name: "Subora",
          description: "Multi-account wallet + subscription manager",
          start_url: "/",
          scope: "/",
          display: "standalone",
          background_color: "#0B0B0B",
          theme_color: "#FE805D",
          icons: [
            { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512.png", sizes: "512x512", type: "image/png" }
          ]
        }
      }),

      // Singlefile build (optional)
      ...(useSingleFile ? [viteSingleFile()] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});