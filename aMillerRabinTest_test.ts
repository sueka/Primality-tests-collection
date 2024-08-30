import { assertEquals } from '@std/assert'
import Primality from './Primality.ts'
import aMillerRabinTest from './aMillerRabinTest.ts'

Deno.test('Miller-Rabin::317', () => {
  const actual = aMillerRabinTest(317n)
  const expected = Primality.Prime
  assertEquals(expected, actual)
})

Deno.test('Miller-Rabin::319', () => {
  const actual = aMillerRabinTest(319n)
  const expected = Primality.Composite // 11 * 29
  assertEquals(expected, actual)
})

// The largest prime number ≤ 2⁵³
Deno.test('Miller-Rabin::9007199254740881', () => {
  const actual = aMillerRabinTest(9007199254740881n)
  const expected = Primality.Prime
  assertEquals(expected, actual)
})

Deno.test('Miller-Rabin::9007199254740883', () => {
  const actual = aMillerRabinTest(9007199254740883n)
  const expected = Primality.Composite
  assertEquals(expected, actual)
})

// The largest prime number ≤ 2⁶⁴
Deno.test('Miller-Rabin::18446744073709551557', () => {
  const actual = aMillerRabinTest(18446744073709551557n)
  const expected = Primality.Prime
  assertEquals(expected, actual)
})

Deno.test('Miller-Rabin::18446744073709551559', () => {
  const actual = aMillerRabinTest(18446744073709551559n)
  const expected = Primality.Composite
  assertEquals(expected, actual)
})

// The largest prime number proven by hand
Deno.test('Miller-Rabin::M₁₂₇', () => {
  const actual = aMillerRabinTest((1n << 127n) - 1n)
  const expected = Primality.ProbablyPrime
  assertEquals(expected, actual)
})

// A prime number ≥ 2⁴⁰⁹⁶ (Typical key size for RSA)
Deno.test('Miller-Rabin::M₄₄₂₃', () => {
  const actual = aMillerRabinTest((1n << 4423n) - 1n)
  const expected = Primality.ProbablyPrime
  assertEquals(expected, actual)
})

Deno.test('Miller-Rabin::1-100', () => {
  const primes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97].map(BigInt)

  for (let k = 3n; k <= 100n; k += 2n) {
    const actual = aMillerRabinTest(k)
    const expected: Primality = primes.includes(k)
    ? Primality.Prime
    : Primality.Composite

    assertEquals(actual, expected)
  }
})
