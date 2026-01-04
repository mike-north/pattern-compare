/**
 * Direct matching benchmarks for pattern-algebra library
 *
 * Tests matchPathDirect() which skips pre-compilation.
 */
import { describe, bench } from 'vitest'
import { parsePattern, matchPathDirect } from '@'

const PATTERNS = {
  singleWildcard: parsePattern('src/*.ts'),
  globstar: parsePattern('src/**/*.ts'),
  nestedGlobstar: parsePattern('src/**/lib/**/test/**/*.ts'),
}

const TEST_PATHS = {
  short: 'src/index.ts',
  medium: 'src/components/Button/Button.tsx',
  long: 'packages/core/src/lib/utils/helpers/string/format.ts',
}

describe('Matching: matchPathDirect() (no pre-compilation)', () => {
  bench('simple pattern + short path', () => {
    matchPathDirect(TEST_PATHS.short, PATTERNS.singleWildcard)
  })

  bench('globstar + medium path', () => {
    matchPathDirect(TEST_PATHS.medium, PATTERNS.globstar)
  })

  bench('complex pattern + long path', () => {
    matchPathDirect(TEST_PATHS.long, PATTERNS.nestedGlobstar)
  })
})
