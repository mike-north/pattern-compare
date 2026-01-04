#!/usr/bin/env tsx
/**
 * Benchmark orchestrator script
 *
 * Runs each benchmark file in a separate child process to avoid OOM issues
 * from memory accumulation across benchmark files.
 *
 * Usage:
 *   pnpm bench           - Run all benchmarks via this orchestrator
 *   pnpm bench:watch     - Runs benchmarks directly with Vitest (no orchestrator)
 */
import { spawn } from 'child_process'
import { readdirSync } from 'fs'
import { resolve, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BENCHMARK_DIR = __dirname
const PROJECT_ROOT = resolve(__dirname, '..')

interface BenchmarkResult {
  file: string
  success: boolean
  duration: number
  error?: string
}

async function runBenchmark(file: string): Promise<BenchmarkResult> {
  const start = Date.now()

  return new Promise((resolve) => {
    const proc = spawn('pnpm', ['vitest', 'bench', '--config', 'vitest.bench.config.ts', '--run', file], {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      env: {
        ...process.env,
        // Give each benchmark process adequate memory
        NODE_OPTIONS: '--max-old-space-size=4096',
      },
    })

    proc.on('close', (code) => {
      resolve({
        file: basename(file),
        success: code === 0,
        duration: Date.now() - start,
        error: code !== 0 ? `Exit code: ${code}` : undefined,
      })
    })

    proc.on('error', (err) => {
      resolve({
        file: basename(file),
        success: false,
        duration: Date.now() - start,
        error: err.message,
      })
    })
  })
}

async function main() {
  console.log('🚀 Pattern Algebra Benchmark Suite\n')
  console.log('Running benchmarks in isolated processes to avoid OOM...\n')

  // Find all benchmark files
  const benchmarkFiles = readdirSync(BENCHMARK_DIR)
    .filter((f) => f.endsWith('.bench.ts'))
    .map((f) => `benchmarks/${f}`)
    .sort()

  console.log(`Found ${benchmarkFiles.length} benchmark files:\n`)
  benchmarkFiles.forEach((f) => console.log(`  • ${basename(f)}`))
  console.log('')

  const results: BenchmarkResult[] = []
  const totalStart = Date.now()

  // Run each benchmark file sequentially in separate processes
  for (const file of benchmarkFiles) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`Running: ${basename(file)}`)
    console.log('='.repeat(60) + '\n')

    const result = await runBenchmark(file)
    results.push(result)

    if (!result.success) {
      console.log(`\n❌ ${basename(file)} failed: ${result.error}`)
    }
  }

  // Summary
  const totalDuration = Date.now() - totalStart
  const passed = results.filter((r) => r.success).length
  const failed = results.filter((r) => !r.success).length

  console.log(`\n${'='.repeat(60)}`)
  console.log('SUMMARY')
  console.log('='.repeat(60))
  console.log(`\nTotal: ${results.length} benchmark files`)
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`⏱️  Total time: ${(totalDuration / 1000).toFixed(1)}s`)

  if (failed > 0) {
    console.log('\nFailed benchmarks:')
    results.filter((r) => !r.success).forEach((r) => console.log(`  • ${r.file}: ${r.error}`))
    process.exit(1)
  }

  console.log('\n✨ All benchmarks completed successfully!')
}

main().catch((err) => {
  console.error('Orchestrator error:', err)
  process.exit(1)
})
