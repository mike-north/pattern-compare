/**
 * Complex matching benchmarks for pattern-algebra library
 *
 * Tests matchPath() with complex patterns like nested globstars and deep paths.
 */
import { describe, bench } from 'vitest'
import { parsePattern, compilePattern, matchPath } from '@'

const PATTERNS = {
  globstar: parsePattern('src/**/*.ts'),
  nestedGlobstar: parsePattern('src/**/lib/**/test/**/*.ts'),
  deepPath: parsePattern('a/b/c/d/e/f/g/h/i/j/*.ts'),
}

const COMPILED = {
  globstar: compilePattern(PATTERNS.globstar),
  nestedGlobstar: compilePattern(PATTERNS.nestedGlobstar),
  deepPath: compilePattern(PATTERNS.deepPath),
}

const TEST_PATHS = {
  short: 'src/index.ts',
  long: 'packages/core/src/lib/utils/helpers/string/format.ts',
  veryLong: 'projects/frontend/packages/ui/src/components/forms/inputs/text/TextField.tsx',
}

describe('Matching: matchPath() with complex patterns', () => {
  bench('nested globstar + short path', () => {
    matchPath(TEST_PATHS.short, COMPILED.nestedGlobstar)
  })

  bench('nested globstar + long path', () => {
    matchPath(TEST_PATHS.long, COMPILED.nestedGlobstar)
  })

  bench('deep path pattern + short path', () => {
    matchPath(TEST_PATHS.short, COMPILED.deepPath)
  })

  bench('globstar + very long path', () => {
    matchPath(TEST_PATHS.veryLong, COMPILED.globstar)
  })
})

describe('Matching: match vs no-match performance', () => {
  bench('matching path', () => {
    matchPath('src/index.ts', COMPILED.globstar)
  })

  bench('non-matching path', () => {
    matchPath('lib/index.js', COMPILED.globstar)
  })
})
