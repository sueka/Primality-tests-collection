import { assertAlmostEquals, assertEquals } from '@std/assert'
import Q from './Q.ts'
import ln from './ln.ts'

Deno.test('ln::ln(1)', () => {
  let actual: number
  const expected = 0

  for (const ln1 of ln(Q.One)) {
    actual = ln1.toDouble()

    if (actual === expected) {
      break
    }
  }

  assertEquals(actual!, expected)
})

Deno.test('ln::ln(2)', () => {
  let actual: number
  const expected = Math.log(2)

  for (const ln1 of ln(Q.Two)) {
    actual = ln1.toDouble()
  }

  assertAlmostEquals(actual!, expected, 0.0000001)
})

Deno.test('ln::ln(2) more precise', () => {
  let actual: number
  const expected = Math.log(2)

  for (const ln1 of ln(Q.Two, 100)) {
    actual = ln1.toDouble()
  }

  assertAlmostEquals(actual!, expected)
  // assertEquals(actual!, expected)
})

Deno.test('ln::ln(0.5)', () => {
  let actual: number
  const expected = Math.log(0.5)

  for (const ln1 of ln(Q.of(1n, 2n))) {
    actual = ln1.toDouble()
  }

  assertAlmostEquals(actual!, expected, 0.0000001)
})

// The natural logarithm of Number.MIN_VALUE
Deno.test('ln::ln(2⁻¹⁰⁷⁴)', () => {
  let actual: number
  const expected = Math.log(Number.MIN_VALUE)

  for (const ln1 of ln(Q.of(1n, 1n << 1074n))) {
    actual = ln1.toDouble()
  }

  assertAlmostEquals(actual!, expected, 0.0001)
})

// The natural logarithm of n (where 0 < n < Number.MIN_VALUE)
Deno.test('ln::ln(2⁻¹⁰⁷⁵)', () => {
  let actual: number
  const expected = (1075 / 1074) * Math.log(Number.MIN_VALUE)

  for (const ln1 of ln(Q.of(1n, 1n << 1075n))) {
    actual = ln1.toDouble()
  }

  assertAlmostEquals(actual!, expected, 0.0001)
})

// The natural logarithm of a large number
Deno.test('ln::ln(2⁶¹⁷⁴)', () => {
  let actual: number
  const expected = 6174 * Math.log(2)

  for (const ln1 of ln(Q.of(1n << 6174n))) {
    actual = ln1.toDouble()
  }

  // The number of significant digits is log₁₀(6174) fewer than that in log(2).
  assertAlmostEquals(actual!, expected, 0.001)
})
