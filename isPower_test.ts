import { assertEquals } from '@std/assert'
import isPower from './isPower.ts'

Deno.test('isPower::1-100', () => {
  const powers = [4, 8, 9, 16, 25, 27, 32, 36, 49, 64, 81, 100].map(BigInt)

  for (let k = 1n; k <= 100n; ++k) {
    const actual = isPower(k)
    const expected: boolean = powers.includes(k)
    assertEquals(actual, expected)
  }
})
