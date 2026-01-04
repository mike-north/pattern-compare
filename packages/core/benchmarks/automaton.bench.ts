/**
 * Automaton operations benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import { determinize, complement, intersect, union, isEmpty, findWitness, countPaths } from '@'
import { setup, AUTOMATA } from './_setup'

setup()

describe('Automaton: determinize()', () => {
  bench('simple automaton', () => {
    determinize(AUTOMATA['simple.singleWildcard'])
  })

  bench('globstar automaton', () => {
    determinize(AUTOMATA['moderate.globstar'])
  })

  bench('complex automaton', () => {
    determinize(AUTOMATA['complex.nestedGlobstar'])
  })

  bench('brace automaton', () => {
    determinize(AUTOMATA['braces.simple'])
  })
})

describe('Automaton: complement()', () => {
  bench('simple automaton', () => {
    complement(AUTOMATA['simple.singleWildcard'])
  })

  bench('globstar automaton', () => {
    complement(AUTOMATA['moderate.globstar'])
  })

  bench('complex automaton', () => {
    complement(AUTOMATA['complex.nestedGlobstar'])
  })
})

describe('Automaton: intersect()', () => {
  bench('simple ∩ simple', () => {
    intersect(AUTOMATA['simple.literal'], AUTOMATA['simple.singleWildcard'])
  })

  bench('globstar ∩ globstar', () => {
    intersect(AUTOMATA['moderate.globstar'], AUTOMATA['moderate.multipleWildcards'])
  })

  bench('complex ∩ complex', () => {
    intersect(AUTOMATA['complex.nestedGlobstar'], AUTOMATA['complex.deepPath'])
  })

  bench('simple ∩ complex', () => {
    intersect(AUTOMATA['simple.singleWildcard'], AUTOMATA['complex.nestedGlobstar'])
  })
})

describe('Automaton: union()', () => {
  bench('simple ∪ simple', () => {
    union(AUTOMATA['simple.literal'], AUTOMATA['simple.singleWildcard'])
  })

  bench('globstar ∪ globstar', () => {
    union(AUTOMATA['moderate.globstar'], AUTOMATA['moderate.multipleWildcards'])
  })

  bench('complex ∪ complex', () => {
    union(AUTOMATA['complex.nestedGlobstar'], AUTOMATA['complex.deepPath'])
  })
})

describe('Automaton: isEmpty()', () => {
  bench('simple automaton', () => {
    isEmpty(AUTOMATA['simple.literal'])
  })

  bench('globstar automaton', () => {
    isEmpty(AUTOMATA['moderate.globstar'])
  })

  bench('intersection result', () => {
    const inter = intersect(AUTOMATA['simple.literal'], AUTOMATA['moderate.globstar'])
    isEmpty(inter)
  })
})

describe('Automaton: findWitness()', () => {
  bench('simple automaton', () => {
    findWitness(AUTOMATA['simple.literal'])
  })

  bench('globstar automaton', () => {
    findWitness(AUTOMATA['moderate.globstar'])
  })

  bench('complex automaton', () => {
    findWitness(AUTOMATA['complex.nestedGlobstar'])
  })
})

describe('Automaton: countPaths()', () => {
  bench('simple automaton (depth 5)', () => {
    countPaths(AUTOMATA['simple.literal'], 5)
  })

  bench('globstar automaton (depth 5)', () => {
    countPaths(AUTOMATA['moderate.globstar'], 5)
  })

  bench('globstar automaton (depth 10)', () => {
    countPaths(AUTOMATA['moderate.globstar'], 10)
  })
})
