/**
 * Low-level matching benchmarks for pattern-algebra library
 *
 * Tests matchSegment() and quick reject filtering.
 */
import { describe, bench } from 'vitest'
import { parsePattern, matchSegment, buildQuickRejectFilter, applyQuickReject } from '@'

const PATTERNS = {
  literal: parsePattern('src/index.ts'),
  singleWildcard: parsePattern('src/*.ts'),
  globstar: parsePattern('src/**/*.ts'),
}

describe('Matching: applyQuickReject()', () => {
  const filter = buildQuickRejectFilter(PATTERNS.globstar)

  bench('quick rejection (non-match)', () => {
    applyQuickReject('lib/something/else.js', filter)
  })

  bench('passes filter (potential match)', () => {
    applyQuickReject('src/components/Button.ts', filter)
  })
})

describe('Matching: matchSegment()', () => {
  const literalPattern = PATTERNS.literal
  const wildcardPattern = PATTERNS.singleWildcard

  const literalSegment = literalPattern?.root?.type === 'sequence' ? literalPattern.root.segments[0] : undefined
  const wildcardSegment = wildcardPattern?.root?.type === 'sequence' ? wildcardPattern.root.segments[0] : undefined

  // Move conditionals outside bench calls to avoid per-iteration overhead
  if (literalSegment) {
    bench('literal segment match', () => {
      matchSegment('src', literalSegment)
    })
  }

  if (wildcardSegment) {
    bench('wildcard segment match', () => {
      matchSegment('src', wildcardSegment)
    })
  }
})
