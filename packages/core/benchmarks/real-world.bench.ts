/**
 * Real-world scenario benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import { parsePattern, compilePattern, matchPath } from '@'

describe('Real-world: Typical gitignore patterns', () => {
  const gitignorePatterns = [
    'node_modules/**',
    '*.log',
    '.env*',
    'dist/**',
    'coverage/**',
    '**/*.test.ts',
    '.git/**',
    '**/.DS_Store',
  ]

  const testPath = 'src/components/Button/Button.test.ts'
  const compiledPatterns = gitignorePatterns.map((p) => compilePattern(parsePattern(p)))

  bench('match against 8 gitignore patterns', () => {
    for (const pattern of compiledPatterns) {
      matchPath(testPath, pattern)
    }
  })
})

describe('Real-world: TypeScript project patterns', () => {
  const tsPatterns = ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.test.ts', '!src/**/*.spec.ts', '!src/**/__tests__/**']

  bench('parse TypeScript include/exclude patterns', () => {
    for (const p of tsPatterns) {
      parsePattern(p.startsWith('!') ? p.slice(1) : p)
    }
  })
})

describe('Real-world: Build tool file matching', () => {
  const sourcePattern = compilePattern(parsePattern('src/**/*.{ts,tsx}'))
  const testPattern = compilePattern(parsePattern('**/*.{test,spec}.{ts,tsx}'))

  const files = [
    'src/index.ts',
    'src/components/Button.tsx',
    'src/utils/format.ts',
    'src/components/Button.test.tsx',
    'tests/integration/api.test.ts',
  ]

  bench('categorize files (source vs test)', () => {
    for (const file of files) {
      const isSource = matchPath(file, sourcePattern)
      const isTest = matchPath(file, testPattern)
      void [isSource, isTest]
    }
  })
})

describe('Real-world: Policy rule evaluation', () => {
  // Simulate a policy system checking if a path matches various rules
  const rules = [
    { pattern: 'secrets/**', action: 'deny' },
    { pattern: '.env*', action: 'deny' },
    { pattern: 'src/**/*.ts', action: 'allow' },
    { pattern: 'test/**/*.ts', action: 'allow' },
    { pattern: '**', action: 'deny' },
  ] as const

  const compiledRules = rules.map((r) => ({
    pattern: compilePattern(parsePattern(r.pattern)),
    action: r.action,
  }))

  const testPaths = ['src/index.ts', 'secrets/api-key.txt', '.env.local', 'test/unit/utils.test.ts', 'random/file.txt']

  bench('evaluate 5 paths against 5 policy rules', () => {
    for (const path of testPaths) {
      for (const rule of compiledRules) {
        if (matchPath(path, rule.pattern)) {
          break // First matching rule wins
        }
      }
    }
  })
})
