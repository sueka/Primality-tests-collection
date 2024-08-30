/**
 * Generates pseudo random numbers.
 *
 * Note: It is NOT guaranteed that inf or sup can be chosen.
 */
export default function* genRandoms(inf: bigint, sup: bigint): Generator<bigint, void> {
  const steps = sup - inf + 1n
  const size = Math.min(qwordsOf(steps), 65536 / 8) // qwords
  const container = new BigUint64Array(size)

  while (true) {
    self.crypto.getRandomValues(container)

    const r = container.reduce((acc, rv) => acc * (1n << 64n) + rv)

    yield inf + steps * r / (1n << 64n) ** BigInt(size)
  }
}

function qwordsOf(n: bigint): number {
  let result = 1

  while (n >= (1n << 64n)) {
    n >>= 64n
    ++result
  }

  return result
}
