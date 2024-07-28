import { defineConfig, mergeConfig } from "vitest/config"
import viteConfig from "./vite.config"
import react from "@vitejs/plugin-react"

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reporter: ["text", "json", "html"],
        all: true,
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "src/**/*.d.ts",
          "src/index.tsx",
          "src/vite-env.d.ts",
          "src/App.tsx",
          "src/pages/Main.tsx",
          "src/pages/NotFoundPage/NotFoundPage.tsx",
          "src/vite-env.d.ts",
        ],

        statements: 80,
      },
    },
  })
)
