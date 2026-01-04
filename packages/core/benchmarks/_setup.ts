/**
 * Shared setup for benchmarks.
 * Pre-parses and pre-compiles test patterns used across benchmark files.
 */
import {
  parsePattern,
  compilePattern,
  buildAutomaton,
  type PathPattern,
  type CompiledPattern,
  type SegmentAutomaton,
} from '@'

/**
 * Pattern complexity categories for benchmarking
 */
export const PATTERNS = {
  // Simple patterns - basic literal matching
  simple: {
    literal: 'src/index.ts',
    singleWildcard: 'src/*.ts',
    questionMark: 'src/?.ts',
  },

  // Moderate complexity - common real-world patterns
  moderate: {
    globstar: 'src/**/*.ts',
    multipleWildcards: 'src/**/test/*.spec.ts',
    charClass: 'src/[abc]*.ts',
    charRange: 'src/[a-z]*.ts',
  },

  // Complex patterns - stress testing
  complex: {
    nestedGlobstar: 'src/**/lib/**/test/**/*.ts',
    negatedCharClass: 'src/[!._]**/[!._]*.ts',
    multipleCharClasses: 'src/[a-z][0-9][A-Z]*.ts',
    deepPath: 'a/b/c/d/e/f/g/h/i/j/*.ts',
  },

  // Brace expansion patterns
  braces: {
    simple: 'src/{lib,test}/*.ts',
    multiple: 'src/{lib,test,utils}/{index,main}.ts',
    nested: 'src/{lib/{core,utils},test/{unit,integration}}/*.ts',
    large: 'src/{a,b,c,d,e,f,g,h}/*.ts',
  },

  // Pathological cases - potential performance issues
  pathological: {
    manyAlternations: '{a,b,c,d,e,f,g,h,i,j}/**/*.ts',
    deepGlobstar: '**/**/**/**/*.ts',
    wideCharClass: '[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]*.ts',
    complexComposite: 'src/**/[a-z]*/{lib,test}/**/[!._]*.{ts,tsx,js,jsx}',
  },
}

// Test paths for matching benchmarks
export const TEST_PATHS = {
  short: 'src/index.ts',
  medium: 'src/components/Button/Button.tsx',
  long: 'packages/core/src/lib/utils/helpers/string/format.ts',
  veryLong: 'projects/frontend/packages/ui/src/components/forms/inputs/text/TextField.tsx',
}

/**
 * Pre-parsed patterns for compilation benchmarks.
 * Populated by calling setup(). Keys are in format "category.name".
 */
export const PARSED_PATTERNS: Record<string, PathPattern> = {}

/**
 * Pre-compiled patterns for matching benchmarks.
 * Populated by calling setup(). Keys are in format "category.name".
 */
export const COMPILED_PATTERNS: Record<string, CompiledPattern> = {}

/**
 * Pre-built automata for automaton operation benchmarks.
 * Populated by calling setup(). Keys are in format "category.name".
 */
export const AUTOMATA: Record<string, SegmentAutomaton> = {}

// Setup function - call this in each benchmark file
export function setup() {
  if (Object.keys(PARSED_PATTERNS).length > 0) {
    return // Already set up
  }

  // Parse all patterns
  for (const [category, patterns] of Object.entries(PATTERNS)) {
    for (const [name, source] of Object.entries(patterns)) {
      const key = `${category}.${name}`
      try {
        PARSED_PATTERNS[key] = parsePattern(source)
        COMPILED_PATTERNS[key] = compilePattern(PARSED_PATTERNS[key])
        AUTOMATA[key] = buildAutomaton(PARSED_PATTERNS[key])
      } catch (error) {
        // Some patterns may fail parsing - log and skip them
        const errorMsg = error instanceof Error ? error.message : String(error)
        console.warn(`Failed to setup pattern: ${key} = ${source}`)
        console.warn(`  Error: ${errorMsg}`)
      }
    }
  }
}
