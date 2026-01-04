/**
 * Parsing benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import { parsePattern, validatePattern, isValidPattern, expandBraces, countBraceExpansions } from '@'
import { setup, PATTERNS, PARSED_PATTERNS } from './_setup'

setup()

describe('Parsing: parsePattern()', () => {
  describe('Simple patterns', () => {
    bench('literal path', () => {
      parsePattern(PATTERNS.simple.literal)
    })

    bench('single wildcard', () => {
      parsePattern(PATTERNS.simple.singleWildcard)
    })

    bench('question mark', () => {
      parsePattern(PATTERNS.simple.questionMark)
    })
  })

  describe('Moderate patterns', () => {
    bench('globstar', () => {
      parsePattern(PATTERNS.moderate.globstar)
    })

    bench('multiple wildcards', () => {
      parsePattern(PATTERNS.moderate.multipleWildcards)
    })

    bench('character class', () => {
      parsePattern(PATTERNS.moderate.charClass)
    })

    bench('character range', () => {
      parsePattern(PATTERNS.moderate.charRange)
    })
  })

  describe('Complex patterns', () => {
    bench('nested globstar', () => {
      parsePattern(PATTERNS.complex.nestedGlobstar)
    })

    bench('negated char class', () => {
      parsePattern(PATTERNS.complex.negatedCharClass)
    })

    bench('multiple char classes', () => {
      parsePattern(PATTERNS.complex.multipleCharClasses)
    })

    bench('deep path', () => {
      parsePattern(PATTERNS.complex.deepPath)
    })
  })

  describe('Brace patterns', () => {
    bench('simple braces', () => {
      parsePattern(PATTERNS.braces.simple)
    })

    bench('multiple braces', () => {
      parsePattern(PATTERNS.braces.multiple)
    })

    bench('nested braces', () => {
      parsePattern(PATTERNS.braces.nested)
    })

    bench('large braces', () => {
      parsePattern(PATTERNS.braces.large)
    })
  })

  describe('Pathological patterns', () => {
    bench('many alternations', () => {
      parsePattern(PATTERNS.pathological.manyAlternations)
    })

    bench('deep globstar', () => {
      parsePattern(PATTERNS.pathological.deepGlobstar)
    })

    bench('wide char class', () => {
      parsePattern(PATTERNS.pathological.wideCharClass)
    })

    bench('complex composite', () => {
      parsePattern(PATTERNS.pathological.complexComposite)
    })
  })
})

describe('Parsing: validatePattern()', () => {
  bench('simple pattern', () => {
    validatePattern(PARSED_PATTERNS['simple.literal'])
  })

  bench('moderate pattern', () => {
    validatePattern(PARSED_PATTERNS['moderate.globstar'])
  })

  bench('complex pattern', () => {
    validatePattern(PARSED_PATTERNS['complex.nestedGlobstar'])
  })
})

describe('Parsing: isValidPattern()', () => {
  bench('simple pattern', () => {
    isValidPattern(PARSED_PATTERNS['simple.literal'])
  })

  bench('moderate pattern', () => {
    isValidPattern(PARSED_PATTERNS['moderate.globstar'])
  })

  bench('complex pattern', () => {
    isValidPattern(PARSED_PATTERNS['complex.nestedGlobstar'])
  })
})

describe('Parsing: expandBraces()', () => {
  bench('simple braces', () => {
    expandBraces(PARSED_PATTERNS['braces.simple'])
  })

  bench('multiple braces', () => {
    expandBraces(PARSED_PATTERNS['braces.multiple'])
  })

  bench('nested braces', () => {
    expandBraces(PARSED_PATTERNS['braces.nested'])
  })

  bench('large braces', () => {
    expandBraces(PARSED_PATTERNS['braces.large'])
  })
})

describe('Parsing: countBraceExpansions()', () => {
  bench('simple braces', () => {
    countBraceExpansions(PATTERNS.braces.simple)
  })

  bench('nested braces', () => {
    countBraceExpansions(PATTERNS.braces.nested)
  })
})
