/**
 * Pattern Algebra - TypeScript library for path pattern algebra.
 *
 * This package re-exports all functionality from `@pattern-algebra/core`.
 * Use this package for a simpler import path.
 *
 * @example
 * ```typescript
 * import { parsePattern, compilePattern, matchPath } from 'pattern-algebra'
 *
 * const pattern = compilePattern(parsePattern('src/**\/*.ts'))
 * matchPath('/src/index.ts', pattern) // true
 * ```
 *
 * @packageDocumentation
 */

export * from '@pattern-algebra/core'
