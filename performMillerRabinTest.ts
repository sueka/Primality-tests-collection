import { assert } from '@std/assert'
import Primality from './Primality.ts'
import gcd from './gcd.ts'
import genRandoms from './genRandoms.ts'
import modPow from './modPow.ts'

/**
 * Performs the Miller-Rabin primality test.
 *
 * @param n an odd number ≥ 3
 */
export default function performMillerRabinTest(n: bigint, k = 20): Primality {
  assert(n > 1n)
  assert((n & 1n) === 1n)
  assert(Number.isSafeInteger(k))

  // n - 1 = 2 ** l * m
  let l = 0n
  let m = n - 1n

  while ((m & 1n) === 0n) {
    m >>= 1n
    ++l
  }

  for (const b of genWitnesses(n, k)) {
    let x = modPow(b, m, n)

    if (x === 1n) {
      continue
    }

    let witnessed = true

    for (let i = 1n; i <= l; ++i) {
      x = modPow(x, 2n, n)
      const y = gcd(x - 1n, n)

      // FIXME: According to the original paper (Rabin 1980), a witness for composite requires that y ≠ 1 for every i, but no prime that does is tested. Test such primes!
      if (/* y === 1n || */ y === n) {
        witnessed = false
        break
      }
    }

    if (witnessed) {
      return Primality.Composite
    }
  }

  if (n <= (1n << 64n)) {
    return Primality.Prime
  } else {
    return Primality.ProbablyPrime
  }
}

export function* genWitnesses(n: bigint, k: number): Generator<bigint, void> {
  assert(Number.isSafeInteger(k))

  // See the Remarks section of https://miller-rabin.appspot.com/.
  for (const base of genSprpBases(n)) {
    const b = base % n

    if (b !== 0n) {
      --k
      yield b
    }
  }

  // The SPRP bases can witness all composites for n ≤ 2⁶⁴.
  if (n <= (1n << 64n)) {
    return
  }

  if (k <= 0n) {
    return
  }

  for (const random of genRandoms(2n, n - 1n)) {
    if (k <= 0) {
      return
    }

    --k
    yield random
  }
}

// https://miller-rabin.appspot.com/
function* genSprpBases(n: bigint): Generator<bigint, void> {
  if (n <= 4759123141n) {
    yield 2n
    yield 7n
    yield 61n
  }

  if (n <= 1122004669633n) {
    yield 2n
    yield 13n
    yield 23n
    yield 1662803n
  }

  // They may witness all composites for n ≤ N (where N > 2⁶⁴).
  yield 2n
  yield 325n
  yield 9375n
  yield 28178n
  yield 450775n
  yield 9780504n
  yield 1795265022n
}
