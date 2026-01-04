import { defineConfig, mergeConfig } from 'vitest/config'
import { createVitestConfig } from '../../vitest.config.mjs'

const baseConfig = createVitestConfig(__dirname)

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      // Exclude benchmarks from unit tests - they run separately via `pnpm bench`
      exclude: ['**/node_modules/**', '**/dist/**', '**/benchmarks/**', '**/*.bench.ts'],
    },
  }),
)
