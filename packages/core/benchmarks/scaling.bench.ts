/**
 * Scaling benchmarks for pattern-algebra library
 *
 * Tests how performance scales with input size
 */
import { describe, bench } from 'vitest'
import { parsePattern, compilePattern, matchPath, expandBraces } from '@'

describe('Scaling: Path depth', () => {
  const depths = [2, 5, 10, 20]
  const globstarPattern = compilePattern(parsePattern('**/*.ts'))

  for (const depth of depths) {
    const path = Array.from({ length: depth }, (_, i) => `dir${i}`).join('/') + '/file.ts'

    bench(`matchPath with depth ${depth}`, () => {
      matchPath(path, globstarPattern)
    })
  }
})

describe('Scaling: Pattern segment count', () => {
  const counts = [2, 5, 10, 15]

  for (const count of counts) {
    const pattern = Array.from({ length: count }, () => '*').join('/') + '.ts'

    bench(`parsePattern with ${count} segments`, () => {
      parsePattern(pattern)
    })
  }
})

describe('Scaling: Brace expansion count', () => {
  // Patterns with increasing brace alternatives
  const braceCounts = [2, 4, 8]

  for (const count of braceCounts) {
    const alternatives = Array.from({ length: count }, (_, i) => `alt${i}`).join(',')
    const pattern = `src/{${alternatives}}/*.ts`
    const parsed = parsePattern(pattern)

    bench(`expandBraces with ${count} alternatives`, () => {
      expandBraces(parsed)
    })
  }
})

describe('Scaling: Character class size', () => {
  const sizes = [5, 10, 26]

  for (const size of sizes) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'.slice(0, size)
    const pattern = `src/[${chars}]*.ts`

    bench(`parsePattern with ${size}-char class`, () => {
      parsePattern(pattern)
    })
  }
})
