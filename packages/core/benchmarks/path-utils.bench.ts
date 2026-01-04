/**
 * Path utilities benchmarks for pattern-algebra library
 */
import { describe, bench } from 'vitest'
import {
  normalizePath,
  pathToSegments,
  segmentsToPath,
  isAbsolutePath,
  getExtension,
  getBasename,
  getDirname,
  isAncestorPath,
  commonPrefix,
} from '@'
import { TEST_PATHS } from './_setup'

describe('Path Utils: pathToSegments()', () => {
  bench('short path', () => {
    pathToSegments(TEST_PATHS.short)
  })

  bench('medium path', () => {
    pathToSegments(TEST_PATHS.medium)
  })

  bench('long path', () => {
    pathToSegments(TEST_PATHS.long)
  })

  bench('very long path', () => {
    pathToSegments(TEST_PATHS.veryLong)
  })
})

describe('Path Utils: segmentsToPath()', () => {
  const shortSegments = pathToSegments(TEST_PATHS.short)
  const longSegments = pathToSegments(TEST_PATHS.long)

  bench('short path', () => {
    segmentsToPath(shortSegments)
  })

  bench('long path', () => {
    segmentsToPath(longSegments)
  })
})

describe('Path Utils: normalizePath()', () => {
  bench('already normalized', () => {
    normalizePath(TEST_PATHS.medium)
  })

  bench('with backslashes', () => {
    normalizePath('src\\components\\Button.tsx')
  })

  bench('with double slashes', () => {
    normalizePath('src//components//Button.tsx')
  })

  bench('with tilde', () => {
    normalizePath('~/projects/app/src/index.ts', { homeDir: '/home/user' })
  })
})

describe('Path Utils: misc operations', () => {
  bench('isAbsolutePath', () => {
    isAbsolutePath('/home/user/project/src/index.ts')
  })

  bench('getExtension', () => {
    getExtension('src/components/Button.tsx')
  })

  bench('getBasename', () => {
    getBasename('src/components/Button.tsx')
  })

  bench('getDirname', () => {
    getDirname('src/components/Button.tsx')
  })

  bench('isAncestorPath', () => {
    isAncestorPath('src/components', 'src/components/Button/Button.tsx')
  })

  bench('commonPrefix', () => {
    commonPrefix('src/components/Button.tsx', 'src/components/Input.tsx')
  })
})
