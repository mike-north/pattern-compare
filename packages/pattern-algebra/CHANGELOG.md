# pattern-algebra

## 0.1.0

### Minor Changes

- d2ee2df: Initial release of the `pattern-algebra` package.

  This package re-exports all functionality from `@pattern-algebra/core`, providing a simpler import path for users who prefer an unscoped package name.

  ```typescript
  // Instead of:
  import { parsePattern, matchPath } from '@pattern-algebra/core'

  // You can use:
  import { parsePattern, matchPath } from 'pattern-algebra'
  ```

  Both packages provide identical functionality - choose whichever import style you prefer.

### Patch Changes

- Updated dependencies [7cd829e]
  - @pattern-algebra/core@0.1.0
