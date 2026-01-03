---
'pattern-algebra': minor
---

Initial release of the `pattern-algebra` package.

This package re-exports all functionality from `@pattern-algebra/core`, providing a simpler import path for users who prefer an unscoped package name.

```typescript
// Instead of:
import { parsePattern, matchPath } from '@pattern-algebra/core'

// You can use:
import { parsePattern, matchPath } from 'pattern-algebra'
```

Both packages provide identical functionality - choose whichever import style you prefer.
