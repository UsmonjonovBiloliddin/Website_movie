import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // ← Добавить!

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ← Это ключевая часть
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/abstracts/variables" as *;\n@use "@/abstracts/mixin" as *;`,
      },
    },
  },
});
