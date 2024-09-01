/**
 * Tests if natural numbers a, b ≥ 2 exist s.t. aᵇ = n.
 */
export default function isPower(n: bigint): boolean {
  for (let b = 2n; (1n << b) <= n; ++b) {
    for (let a = 2n; a ** b <= n; ++a) {
      if (a ** b === n) {
        return true
      }
    }
  }

  return false
}
