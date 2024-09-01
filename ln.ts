import { assert } from '@std/assert/'
import Q from './Q.ts'
import zipIters from './zipIters.ts'

export default function* ln(x: Q, k = 20): Generator<Q> {
  assert(x.gt(Q.Zero))
  assert(Number.isSafeInteger(k))

  // x = 2 ** l * m
  let l = 0n
  let m = x

  while (! m.lte(Q.of(4n, 3n))) {
    m = m.div(Q.Two)
    ++l
  }

  while (! Q.of(2n, 3n).lt(m)) {
    m = m.mul(Q.Two)
    --l
  }

  // Ensuring that 2/3 < m ≤ 4/3
  assert(Q.of(2n, 3n).lt(m) && m.lte(Q.of(4n, 3n)))

  // x = 2ˡ m ⇔ log(x) = log(2ˡ m) = log(2ˡ) + log(m) = l log(2) + log(m)
  for (const [ln2, lnm] of zipIters(ln2BbpType(), lnMercator(m))) {
    if (k <= 0) {
      break
    }

    --k
    yield Q.of(l).mul(ln2).add(lnm)
  }
}

/**
 * Makes the Mercator series.
 *
 * @param sx 0 < Successor of x ≤ 2
 */
function* lnMercator(sx: Q): Generator<Q, void> {
  const x = sx.add(Q.NegOne)

  assert(Q.NegOne.lt(x))
  assert(x.lte(Q.One))

  let powerOfX = Q.One // x⁰
  let result = Q.Zero

  for (let k = 1n; true; ++k) {
    const sign = (k & 1n) === 0n
    ? Q.NegOne
    : Q.One

    powerOfX = powerOfX.mul(x) // xᵏ
    result = result.add(sign.mul(powerOfX).div(Q.from(k)))

    yield result
  }
}

function* ln2BbpType(): Generator<Q> {
  let result = Q.Zero

  for (let k = 1n; true; ++k) {
    result = result.add(Q.One.div(Q.from(k)).div(Q.from(1n << k)))

    yield result
  }
}
