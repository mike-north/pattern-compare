import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export function createVitestConfig(packageDir) {
  return defineConfig({
    test: {
      globals: true,
      environment: 'node',
      passWithNoTests: true,
    },
    resolve: {
      alias: {
        '@': resolve(packageDir, 'src'),
      },
    },
  })
}
