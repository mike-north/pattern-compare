/**
 * Compilation benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import { compilePattern, buildAutomaton, buildQuickRejectFilter } from '@'
import { setup, PARSED_PATTERNS } from './_setup'

setup()

describe('Compilation: compilePattern()', () => {
  describe('Simple patterns', () => {
    bench('literal path', () => {
      compilePattern(PARSED_PATTERNS['simple.literal'])
    })

    bench('single wildcard', () => {
      compilePattern(PARSED_PATTERNS['simple.singleWildcard'])
    })
  })

  describe('Moderate patterns', () => {
    bench('globstar', () => {
      compilePattern(PARSED_PATTERNS['moderate.globstar'])
    })

    bench('multiple wildcards', () => {
      compilePattern(PARSED_PATTERNS['moderate.multipleWildcards'])
    })

    bench('character class', () => {
      compilePattern(PARSED_PATTERNS['moderate.charClass'])
    })
  })

  describe('Complex patterns', () => {
    bench('nested globstar', () => {
      compilePattern(PARSED_PATTERNS['complex.nestedGlobstar'])
    })

    bench('deep path', () => {
      compilePattern(PARSED_PATTERNS['complex.deepPath'])
    })
  })

  describe('Brace patterns', () => {
    bench('simple braces', () => {
      compilePattern(PARSED_PATTERNS['braces.simple'])
    })

    bench('nested braces', () => {
      compilePattern(PARSED_PATTERNS['braces.nested'])
    })
  })
})

describe('Compilation: buildAutomaton()', () => {
  bench('simple literal', () => {
    buildAutomaton(PARSED_PATTERNS['simple.literal'])
  })

  bench('globstar', () => {
    buildAutomaton(PARSED_PATTERNS['moderate.globstar'])
  })

  bench('nested globstar', () => {
    buildAutomaton(PARSED_PATTERNS['complex.nestedGlobstar'])
  })

  bench('brace pattern', () => {
    buildAutomaton(PARSED_PATTERNS['braces.simple'])
  })
})

describe('Compilation: buildQuickRejectFilter()', () => {
  bench('simple pattern', () => {
    buildQuickRejectFilter(PARSED_PATTERNS['simple.literal'])
  })

  bench('globstar pattern', () => {
    buildQuickRejectFilter(PARSED_PATTERNS['moderate.globstar'])
  })

  bench('complex pattern', () => {
    buildQuickRejectFilter(PARSED_PATTERNS['complex.nestedGlobstar'])
  })
})
