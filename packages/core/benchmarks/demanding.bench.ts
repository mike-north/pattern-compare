/**
 * Demanding use case benchmarks for pattern-algebra library
 *
 * Tests computationally intensive operations like set containment
 */
import { describe, bench } from 'vitest'
import { parsePattern, buildAutomaton, union, checkContainment } from '@'

describe('Demanding: Set Containment', () => {
  /**
   * Moderate set containment test (8 vs 8 patterns)
   * Reduced from 20 vs 20 to avoid memory issues with large automaton unions
   */
  describe('Moderate set containment (8 vs 8 patterns)', () => {
    const setA_sources = [
      'src/lib/**/*.ts',
      'src/utils/**/*.ts',
      'src/components/**/*.tsx',
      'config/*.json',
      'docs/**/*.md',
      'tests/unit/**/*.test.ts',
      'dist/esm/**/*.js',
      'package.json',
    ]

    const setB_sources = [
      'src/**/*.ts',
      'src/**/*.tsx',
      'config/**/*',
      'docs/**/*',
      'tests/**/*',
      'dist/**/*',
      'package.json',
      '**/*.md',
    ]

    const setA_parsed = setA_sources.map((s) => parsePattern(s))
    const setB_parsed = setB_sources.map((s) => parsePattern(s))

    bench('pairwise containment (8 x 8 = 64 checks)', () => {
      for (const patternA of setA_parsed) {
        let isContained = false
        for (const patternB of setB_parsed) {
          const result = checkContainment(patternA, patternB)
          if (result.isSubset) {
            isContained = true
            break
          }
        }
        void isContained
      }
    })
  })

  /**
   * Test with overlapping patterns (harder containment)
   */
  describe('Overlapping patterns', () => {
    const overlappingA = ['src/**/*.ts', 'src/**/*.tsx', 'src/lib/**/*', 'src/utils/**/*', 'src/components/**/*'].map(
      (s) => parsePattern(s),
    )

    const overlappingB = ['src/**/*', '**/*.ts', '**/*.tsx'].map((s) => parsePattern(s))

    bench('5 vs 3 overlapping patterns', () => {
      for (const patternA of overlappingA) {
        for (const patternB of overlappingB) {
          checkContainment(patternA, patternB)
        }
      }
    })
  })

  /**
   * Patterns that require full automaton analysis
   */
  describe('Hard patterns with char classes', () => {
    const hardA = ['src/**/[a-m]*/**/*.ts', 'src/**/[n-z]*/**/*.ts', 'lib/**/[a-f]*/**/[0-9]*.js'].map((s) =>
      parsePattern(s),
    )

    const hardB = ['src/**/*.ts', 'lib/**/*.js'].map((s) => parsePattern(s))

    bench('char classes + globstars (3 vs 2)', () => {
      for (const patternA of hardA) {
        for (const patternB of hardB) {
          checkContainment(patternA, patternB)
        }
      }
    })
  })

  /**
   * Union building benchmark (smaller set to avoid OOM)
   */
  describe('Union building', () => {
    const patterns = ['src/**/*.ts', 'lib/**/*.js', 'config/**/*', 'docs/**/*.md', 'tests/**/*.test.ts'].map((s) =>
      buildAutomaton(parsePattern(s)),
    )

    bench('build union of 5 patterns', () => {
      let result = patterns[0]
      for (let i = 1; i < patterns.length; i++) {
        result = union(result, patterns[i])
      }
    })
  })
})
