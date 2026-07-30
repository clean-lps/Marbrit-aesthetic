import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";
import viteCompression from "vite-plugin-compression";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    imagetools(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "unsplash-images",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      manifest: {
        name: "Marbrit Aesthetic",
        short_name: "Marbrit",
        theme_color: "#171c54",
        background_color: "#f4dfd5",
        display: "standalone",
      },
    }),
    viteCompression({ algorithm: "brotliCompress" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/gsap")) return "gsap"
          if (id.includes("node_modules/three")) return "three"
          if (id.includes("node_modules/@react-three")) return "r3f"
          if (id.includes("node_modules/motion")) return "motion"
          if (id.includes("node_modules/lucide-react")) return "icons"
          if (id.includes("node_modules/radix-ui")) return "radix"
          if (id.includes("node_modules/@radix-ui")) return "radix"
          if (id.includes("node_modules/react-dom")) return "react-vendor"
          if (id.includes("node_modules/react")) return "react-vendor"
        },
      },
    },
  },
});
