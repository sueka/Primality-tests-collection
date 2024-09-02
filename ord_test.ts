import { assertEquals } from '@std/assert'
import ord from './ord.ts'

// 3⁶ ≡ 729 ≡ 1 (mod 7)
Deno.test('Multiplicative order::basic', () => {
  const actual = ord(7n, 3n)
  const expected = 6n
  assertEquals(actual, expected)
})

// When they are coprime, k is a trivial zero s.t. 3ᵏ ≡ 1 (mod 21).
Deno.test('Multiplicative order::coprime', () => {
  const actual = ord(21n, 3n)
  const expected = 0n
  assertEquals(actual, expected)
})

// Oₙ(a) = Ο(n) in the worst case
Deno.test('Multiplicative order::large mod', () => {
  const actual = ord(65537n, 3n)
  const expected = 65536n
  assertEquals(actual, expected)
})

Deno.test('Multiplicative order::larger mod', () => {
  const actual = ord(1000003n, 3n)
  const expected = 333334n
  assertEquals(actual, expected)
})

// g(n, a) is independent of base s.t. Oₙ(a) = Ο(g(n, a)).
Deno.test('Multiplicative order::large base', () => {
  const actual = ord(7n, 100000007n)
  const expected = 3n
  assertEquals(actual, expected)
})
