/**
 * Containment benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import { checkContainment, analyzePatterns, areEquivalent, hasOverlap, areDisjoint } from '@'
import { setup, PARSED_PATTERNS } from './_setup'

setup()

describe('Containment: checkContainment()', () => {
  describe('Quick containment checks (structural)', () => {
    bench('identical patterns', () => {
      checkContainment(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['simple.literal'])
    })

    bench('obvious subset (src/*.ts ⊆ src/**/*.ts)', () => {
      checkContainment(PARSED_PATTERNS['simple.singleWildcard'], PARSED_PATTERNS['moderate.globstar'])
    })
  })

  describe('Complex containment checks', () => {
    bench('similar globstar patterns', () => {
      checkContainment(PARSED_PATTERNS['moderate.globstar'], PARSED_PATTERNS['moderate.multipleWildcards'])
    })

    bench('nested globstar containment', () => {
      checkContainment(PARSED_PATTERNS['complex.nestedGlobstar'], PARSED_PATTERNS['moderate.globstar'])
    })

    bench('brace vs non-brace', () => {
      checkContainment(PARSED_PATTERNS['braces.simple'], PARSED_PATTERNS['moderate.globstar'])
    })
  })

  describe('Disjoint patterns', () => {
    bench('clearly disjoint', () => {
      checkContainment(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['complex.deepPath'])
    })
  })
})

describe('Containment: areEquivalent()', () => {
  bench('identical patterns', () => {
    areEquivalent(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['simple.literal'])
  })

  bench('different patterns', () => {
    areEquivalent(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['simple.singleWildcard'])
  })

  bench('complex patterns', () => {
    areEquivalent(PARSED_PATTERNS['moderate.globstar'], PARSED_PATTERNS['moderate.multipleWildcards'])
  })
})

describe('Containment: hasOverlap()', () => {
  bench('overlapping patterns', () => {
    hasOverlap(PARSED_PATTERNS['simple.singleWildcard'], PARSED_PATTERNS['moderate.globstar'])
  })

  bench('disjoint patterns', () => {
    hasOverlap(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['complex.deepPath'])
  })

  bench('complex patterns', () => {
    hasOverlap(PARSED_PATTERNS['complex.nestedGlobstar'], PARSED_PATTERNS['braces.nested'])
  })
})

describe('Containment: areDisjoint()', () => {
  bench('disjoint patterns', () => {
    areDisjoint(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['complex.deepPath'])
  })

  bench('overlapping patterns', () => {
    areDisjoint(PARSED_PATTERNS['simple.singleWildcard'], PARSED_PATTERNS['moderate.globstar'])
  })
})

describe('Containment: analyzePatterns()', () => {
  bench('simple patterns', () => {
    analyzePatterns(PARSED_PATTERNS['simple.literal'], PARSED_PATTERNS['simple.singleWildcard'])
  })

  bench('globstar patterns', () => {
    analyzePatterns(PARSED_PATTERNS['moderate.globstar'], PARSED_PATTERNS['moderate.multipleWildcards'])
  })

  bench('complex patterns', () => {
    analyzePatterns(PARSED_PATTERNS['complex.nestedGlobstar'], PARSED_PATTERNS['complex.deepPath'])
  })
})
