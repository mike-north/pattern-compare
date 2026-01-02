import { expectAssignable } from 'tsd'
import { version } from '@dist/index.js'

// Basic type test - verify version export is assignable to string
expectAssignable<string>(version)
