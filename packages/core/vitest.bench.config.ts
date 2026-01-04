import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

/**
 * Vitest configuration for benchmarks.
 *
 * This is separate from the main vitest.config.ts to ensure benchmarks
 * don't run during regular test runs. Benchmarks are expensive and should
 * only be run intentionally (locally or in dedicated CI environments).
 *
 * Usage:
 *   pnpm bench           - Run all benchmarks once
 *   pnpm bench:watch     - Run benchmarks in watch mode
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['benchmarks/**/*.bench.ts'],
    // Disable isolation to avoid OOM during Vitest's ValueDeserializer when
    // serializing benchmark results between worker and main process
    isolate: false,
    // Run files sequentially to reduce memory pressure
    fileParallelism: false,
    benchmark: {
      include: ['benchmarks/**/*.bench.ts'],
      reporters: ['verbose'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
