# Pattern Algebra

A TypeScript library for path pattern algebra — parsing, compiling, matching, and performing set operations on glob patterns.

## Packages

| Package                                         | Description                   | npm                                                                                                               |
| ----------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [`@pattern-algebra/core`](./packages/core)      | Core pattern algebra library  | [![npm](https://img.shields.io/npm/v/@pattern-algebra/core)](https://www.npmjs.com/package/@pattern-algebra/core) |
| [`pattern-algebra`](./packages/pattern-algebra) | Convenience re-export of core | [![npm](https://img.shields.io/npm/v/pattern-algebra)](https://www.npmjs.com/package/pattern-algebra)             |

## Quick Start

```bash
pnpm add @pattern-algebra/core
# or
pnpm add pattern-algebra
```

```typescript
import { parsePattern, compilePattern, matchPath, checkContainment } from '@pattern-algebra/core'

// Parse and compile a pattern
const pattern = compilePattern(parsePattern('src/**/*.ts'))

// Match paths
matchPath('/src/index.ts', pattern) // true
matchPath('/lib/index.ts', pattern) // false

// Check containment relationships
const specific = compilePattern(parsePattern('src/index.ts'))
const general = compilePattern(parsePattern('src/*.ts'))
checkContainment(specific, general).isSubset // true
```

See the [@pattern-algebra/core README](./packages/core/README.md) for full documentation.

## Development

### Prerequisites

- Node.js 20+
- pnpm 10.26+

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run all checks (lint, typecheck, api-reports)
pnpm check
```

### Common Commands

| Command                 | Description               |
| ----------------------- | ------------------------- |
| `pnpm build`            | Build all packages        |
| `pnpm test`             | Run tests                 |
| `pnpm check`            | Run all validation checks |
| `pnpm check:typecheck`  | TypeScript type checking  |
| `pnpm check:lint-ts`    | ESLint                    |
| `pnpm check:formatting` | Prettier formatting check |
| `pnpm fix:formatting`   | Fix formatting issues     |
| `pnpm clean`            | Clean build artifacts     |

### Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
# Add a changeset for your changes
pnpm changeset

# Version packages (usually done by CI)
pnpm version

# Publish to npm (usually done by CI)
pnpm release
```

## Architecture

```
packages/
├── core/              # @pattern-algebra/core - Main library
│   ├── src/
│   │   ├── parse/     # Pattern parsing (glob → AST)
│   │   ├── compile/   # Pattern compilation (AST → automaton)
│   │   ├── match/     # Path matching
│   │   ├── automaton/ # Automaton operations (determinize, intersect, etc.)
│   │   ├── containment/ # Containment checking
│   │   └── types/     # TypeScript type definitions
│   └── tests/
└── pattern-algebra/   # pattern-algebra - Re-export package
```

## License

MIT
