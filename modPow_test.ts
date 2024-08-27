import { assertEquals } from '@std/assert'
import modPow from './modPow.ts'

Deno.test('modPow::basic', () => {
  const actual = modPow(2n, 3n, 5n)
  const expected = 3n
  assertEquals(actual, expected)
})

Deno.test('modPow::base 0', () => {
  const actual = modPow(0n, 10n, 5n)
  const expected = 0n
  assertEquals(actual, expected)
})

Deno.test('modPow::0th power', () => {
  const actual = modPow(7n, 0n, 13n)
  const expected = 1n
  assertEquals(actual, expected)
})

Deno.test('modPow::mod 1', () => {
  const actual = modPow(10n, 3n, 1n)
  const expected = 0n
  assertEquals(actual, expected)
})

Deno.test('modPow::0th power, mod 1', () => {
  const actual = modPow(7n, 0n, 1n)
  const expected = 0n
  assertEquals(actual, expected)
})

Deno.test('modPow::base > mod', () => {
  const actual = modPow(10n, 3n, 7n)
  const expected = 6n
  assertEquals(actual, expected)
})

Deno.test('modPow::large exponent', () => {
  const actual = modPow(2n, 100n, 13n)
  const expected = 3n
  assertEquals(actual, expected)
})
