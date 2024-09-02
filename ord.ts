import { assert } from '@std/assert'
import gcd from './gcd.ts'
import modPow from './modPow.ts'

/**
 * Finds the smallest k > 0 s.t. and aᵏ ≡ 1 (mod n).
 */
export default function ord(n: bigint, a: bigint): bigint {
  assert(n >= 2)
  assert(a >= 1)

  if (gcd(n, a) !== 1n) {
    return 0n // for convenience
  }

  for (let k = 1n; k <= n - 1n; ++k) {
    if (modPow(a, k, n) === 1n) {
      return k
    }
  }

  throw new Error('Unreachable!')
}
