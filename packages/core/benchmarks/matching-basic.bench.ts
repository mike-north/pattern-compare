/**
 * Basic matching benchmarks for pattern-algebra library
 *
 * Tests matchPath() with simple patterns and various path lengths.
 */
import { describe, bench } from 'vitest'
import { parsePattern, compilePattern, matchPath } from '@'

const PATTERNS = {
  singleWildcard: parsePattern('src/*.ts'),
  globstar: parsePattern('src/**/*.ts'),
}

const COMPILED = {
  singleWildcard: compilePattern(PATTERNS.singleWildcard),
  globstar: compilePattern(PATTERNS.globstar),
}

const TEST_PATHS = {
  short: 'src/index.ts',
  medium: 'src/components/Button/Button.tsx',
  long: 'packages/core/src/lib/utils/helpers/string/format.ts',
}

describe('Matching: matchPath() with simple patterns', () => {
  bench('single wildcard + short path', () => {
    matchPath(TEST_PATHS.short, COMPILED.singleWildcard)
  })

  bench('single wildcard + medium path', () => {
    matchPath(TEST_PATHS.medium, COMPILED.singleWildcard)
  })

  bench('globstar + short path', () => {
    matchPath(TEST_PATHS.short, COMPILED.globstar)
  })

  bench('globstar + medium path', () => {
    matchPath(TEST_PATHS.medium, COMPILED.globstar)
  })
})
