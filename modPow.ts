import { assert } from '@std/assert'

export default function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  assert(base >= 0n)
  assert(exp >= 0n)
  assert(mod >= 1n)

  if (mod === 1n) {
    return 0n
  }

  base %= mod

  let result = 1n

  while (exp !== 0n) {
    if ((exp & 1n) === 1n) {
      ; [base, exp, result] = [base ** 2n % mod, exp >> 1n, result * base % mod]
    } else {
      ; [base, exp]         = [base ** 2n % mod, exp >> 1n]
    }
  }

  return result
}
