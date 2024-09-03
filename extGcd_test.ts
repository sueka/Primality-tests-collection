import { assertObjectMatch } from '@std/assert'
import extGcd from './extGcd.ts'
import assertAny from "./assertAny.ts";

Deno.test('extGcd::basic', () => {
  const actual = extGcd(2n, 7n)
  const expected1 = { gcd: 1n, x: -3n, y: 1n }
  const expected2 = { gcd: 1n, x: 4n, y: -1n }
  assertAny([
    () => { assertObjectMatch(actual, expected1) },
    () => { assertObjectMatch(actual, expected2) },
  ])
})

Deno.test('extGcd::one hand being zero', () => {
  const actual = extGcd(0n, 17n)
  const expected = { gcd: 17n, x: 0n, y: 1n }
  assertObjectMatch(actual, expected)
})

Deno.test('extGcd::one hand being zero', () => {
  const actual = extGcd(17n, 0n)
  const expected = { gcd: 17n, x: 1n, y: 0n }
  assertObjectMatch(actual, expected)
})

Deno.test('extGcd::equal numbers', () => {
  const actual = extGcd(25n, 25n)
  const expected1 = { gcd: 25n, x: 1n, y: 0n }
  const expected2 = { gcd: 25n, x: 0n, y: 1n }
  assertAny([
    () => { assertObjectMatch(actual, expected1) },
    () => { assertObjectMatch(actual, expected2) },
  ])
})

Deno.test('extGcd::one negative number', () => {
  const actual = extGcd(56n, -15n)
  const expected1 = { gcd: 1n, x: -4n, y: -15n }
  const expected2 = { gcd: 1n, x: 11n, y: 41n }
  const expected3 = { gcd: -1n, x: 4n, y: 15n }
  const expected4 = { gcd: -1n, x: -11n, y: -41n }
  assertAny([
    () => { assertObjectMatch(actual, expected1) },
    () => { assertObjectMatch(actual, expected2) },
    () => { assertObjectMatch(actual, expected3) },
    () => { assertObjectMatch(actual, expected4) },
  ])
})

Deno.test('extGcd::both negative numbers', () => {
  const actual = extGcd(-81n, -57n)
  const expected1 = { gcd: 3n, x: -12n, y: 17n }
  const expected2 = { gcd: 3n, x: 7n, y: -10n }
  const expected3 = { gcd: -3n, x: 12n, y: -17n }
  const expected4 = { gcd: -3n, x: -7n, y: 10n }
  assertAny([
    () => { assertObjectMatch(actual, expected1) },
    () => { assertObjectMatch(actual, expected2) },
    () => { assertObjectMatch(actual, expected3) },
    () => { assertObjectMatch(actual, expected4) },
  ])
})

Deno.test('extGcd::large numbers', () => {
  const actual = extGcd(123456n, 654321n)
  const expected1 = { gcd: 3n, x: 171366n, y: -32333n }
  const expected2 = { gcd: 3n, x: -46741n, y: 8819n }
  const expected3 = { gcd: -3n, x: -171366n, y: 32333n }
  const expected4 = { gcd: -3n, x: 46741n, y: -8819n }
  assertAny([
    () => { assertObjectMatch(actual, expected1) },
    () => { assertObjectMatch(actual, expected2) },
    () => { assertObjectMatch(actual, expected3) },
    () => { assertObjectMatch(actual, expected4) },
  ])
})
