# Performance Benchmarks

This directory contains performance benchmarks for the `@pattern-algebra/core` library.

## Why Separate from CI?

These benchmarks are **intentionally excluded from CI** because:

1. **Cost**: Benchmarks are computationally expensive and would significantly increase CI time and cost
2. **Noise**: CI environments are inherently noisy (shared resources, variable CPU allocation), making benchmark results unreliable
3. **Stability**: Performance regressions are better detected in controlled "clean room" environments

## Running Benchmarks

### Available Scripts

```bash
cd packages/core

# Run all benchmarks via orchestrator (recommended)
pnpm bench

# Run a single benchmark file
pnpm bench:file benchmarks/parsing.bench.ts

# Watch mode (re-runs on file changes, runs directly in Vitest)
pnpm bench:watch
```

### From workspace root

```bash
# Run all package benchmarks
pnpm bench
```

### Orchestrator

The `pnpm bench` command uses an orchestrator (`benchmarks/run-all.ts`) that runs each benchmark file in a **separate process**. This prevents memory accumulation that can cause OOM errors when running many benchmarks sequentially.

## Benchmark Categories

The benchmark suite covers all major API functions:

### Parsing

- `parsePattern()` - Pattern parsing with various complexities
- `validatePattern()` / `isValidPattern()` - Pattern validation
- `expandBraces()` / `countBraceExpansions()` - Brace expansion

### Compilation

- `compilePattern()` - Full pattern compilation
- `buildAutomaton()` - Automaton construction
- `buildQuickRejectFilter()` - Quick rejection filter building

### Matching

- `matchPath()` - Pre-compiled pattern matching
- `matchPathDirect()` - Direct matching without pre-compilation
- `applyQuickReject()` - Quick rejection filter application
- `matchSegment()` - Individual segment matching

### Path Utilities

- `pathToSegments()` / `segmentsToPath()` - Path conversion
- `normalizePath()` - Path normalization
- Various path operations (`getExtension`, `getBasename`, etc.)

### Automaton Operations

- `determinize()` - NFA to DFA conversion
- `complement()` - Automaton complement
- `intersect()` / `union()` - Set operations
- `isEmpty()` / `findWitness()` / `countPaths()` - Analysis

### Pattern Algebra

- `patternIntersect()` / `patternUnion()` - Pattern set operations
- `patternComplement()` / `patternDifference()` - Pattern algebra

### Containment

- `checkContainment()` - Subset checking
- `areEquivalent()` / `hasOverlap()` / `areDisjoint()` - Relationship checks
- `analyzePatterns()` - Full pattern analysis

### Real-World Scenarios

- Gitignore pattern matching
- TypeScript project patterns
- Build tool file categorization
- Policy rule evaluation

### Demanding Use Cases

- Set containment (8 vs 8 patterns with pairwise checks)
- Overlapping pattern analysis
- Hard patterns with character classes and globstars
- Union building with multiple patterns

## Interpreting Results

Vitest bench reports:

- **hz**: Operations per second (higher is better)
- **min/max/mean**: Timing statistics in milliseconds
- **p75/p99/p999**: Percentile latencies
- **rme**: Relative margin of error (lower is better)
- **samples**: Number of iterations

Example output:

```
✓ Matching: matchPath() > With simple patterns
   name         hz        min     max    mean    p75    p99
 · short path   20M      0.00    0.20   0.00   0.00   0.00
 · medium path  20M      0.00    0.17   0.00   0.00   0.00
```

## Performance Regression Detection

While benchmarks don't run in CI, you can detect regressions by:

1. **Local testing**: Run benchmarks before and after changes
2. **Baseline comparison**: Save results to a file and compare
3. **Future CI integration**: Once a stable, low-noise environment is available, periodic scheduled benchmark runs can be added

### Saving Results

```bash
# Save results to file
pnpm bench 2>&1 | tee benchmark-results-$(date +%Y%m%d).txt
```

## Adding New Benchmarks

1. Create a new `.bench.ts` file in the `benchmarks/` directory, or add to an existing file
2. Keep individual benchmark groups small (roughly 3-6 `bench` calls per `describe` block) to avoid memory issues; larger aggregate files are fine when run via the orchestrator
3. Use descriptive names that indicate what's being measured
4. Include complexity variants (simple, moderate, complex, pathological)
5. Consider using shared patterns from `_setup.ts` for consistency

```typescript
describe('My Feature: myFunction()', () => {
  bench('simple case', () => {
    myFunction(simpleInput)
  })

  bench('complex case', () => {
    myFunction(complexInput)
  })
})
```

## Clean Room Environment

For reliable benchmark results, consider:

1. **Dedicated hardware**: Use a machine not running other workloads
2. **CPU pinning**: Pin the benchmark process to specific cores
3. **Disable power management**: Use performance CPU governor
4. **Close other applications**: Minimize background processes
5. **Multiple runs**: Run benchmarks multiple times and compare

```bash
# Example: Run on specific CPU cores (Linux)
taskset -c 0-1 pnpm bench
```
