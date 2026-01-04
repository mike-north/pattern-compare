/**
 * Pattern algebra benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import { patternIntersect, patternUnion, patternComplement, patternDifference } from '@'
import { setup, PARSED_PATTERNS } from './_setup'

setup()

describe('Pattern Algebra: patternIntersect()', () => {
  bench('simple patterns', () => {
    patternIntersect(PARSED_PATTERNS['simple.singleWildcard'], PARSED_PATTERNS['simple.questionMark'])
  })

  bench('globstar patterns', () => {
    patternIntersect(PARSED_PATTERNS['moderate.globstar'], PARSED_PATTERNS['moderate.multipleWildcards'])
  })

  bench('complex patterns', () => {
    patternIntersect(PARSED_PATTERNS['complex.nestedGlobstar'], PARSED_PATTERNS['complex.deepPath'])
  })
})

describe('Pattern Algebra: patternUnion()', () => {
  bench('simple patterns', () => {
    patternUnion(PARSED_PATTERNS['simple.singleWildcard'], PARSED_PATTERNS['simple.questionMark'])
  })

  bench('globstar patterns', () => {
    patternUnion(PARSED_PATTERNS['moderate.globstar'], PARSED_PATTERNS['moderate.multipleWildcards'])
  })

  bench('complex patterns', () => {
    patternUnion(PARSED_PATTERNS['complex.nestedGlobstar'], PARSED_PATTERNS['complex.deepPath'])
  })
})

describe('Pattern Algebra: patternComplement()', () => {
  bench('simple pattern', () => {
    patternComplement(PARSED_PATTERNS['simple.singleWildcard'])
  })

  bench('globstar pattern', () => {
    patternComplement(PARSED_PATTERNS['moderate.globstar'])
  })

  bench('complex pattern', () => {
    patternComplement(PARSED_PATTERNS['complex.nestedGlobstar'])
  })
})

describe('Pattern Algebra: patternDifference()', () => {
  bench('simple patterns', () => {
    patternDifference(PARSED_PATTERNS['simple.singleWildcard'], PARSED_PATTERNS['simple.literal'])
  })

  bench('globstar patterns', () => {
    patternDifference(PARSED_PATTERNS['moderate.globstar'], PARSED_PATTERNS['moderate.multipleWildcards'])
  })

  bench('complex patterns', () => {
    patternDifference(PARSED_PATTERNS['complex.nestedGlobstar'], PARSED_PATTERNS['complex.deepPath'])
  })
})
