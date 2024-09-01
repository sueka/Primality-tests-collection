import { assert } from '@std/assert/assert'
import gcd from './gcd.ts'
import abs from './abs.ts'

export default class Q {
  #n: bigint
  #d: bigint

  protected constructor(n: bigint, d: bigint = 1n) {
    const commonFactor = (d > 0n ? 1n : -1n) * abs(gcd(d, n))

    this.#n = n / commonFactor
    this.#d = d / commonFactor

    assert(this.#d > 0)
  }

  add(this: Q, that: Q): Q {
    return new Q(
      this.#n * that.#d + that.#n * this.#d,
      this.#d * that.#d
    )
  }

  mul(this: Q, that: Q): Q {
    return new Q(
      this.#n * that.#n,
      this.#d * that.#d
    )
  }

  div(this: Q, that: Q): Q {
    return this.mul(that.reciprocal)
  }

  get reciprocal() {
    if (this.eq(Q.Zero)) {
      throw new Error('Division by zero.')
    }

    return new Q(this.#d, this.#n)
  }

  eq(this: Q, that: Q): boolean {
    return this.#n * that.#d === that.#n * this.#d
  }

  // ne(this: Q, that: Q): boolean {
  //   return ! this.eq(that)
  // }

  lt(this: Q, that: Q): boolean {
    return this.#n * that.#d < that.#n * this.#d
  }

  lte(this: Q, that: Q): boolean {
    return ! that.lt(this)
  }

  gt(this: Q, that: Q): boolean {
    return that.lt(this)
  }

  // gte(this: Q, that: Q): boolean {
  //   return ! this.lt(that)
  // }

  toDouble(): number {
    const n = Number(this.#n)
    const d = Number(this.#d)

    if (! (Number.isFinite(n) && Number.isFinite(d) && Number.isFinite(n / d))) {
      throw new Error('Numerator or denominator too large.')
    }

    return n / d
  }

  static NegOne = new Q(-1n)
  static Zero = new Q(0n)
  static One = new Q(1n)
  static Two = new Q(2n)

  static of(n: bigint, d?: bigint): Q {
    return new Q(n, d)
  }

  static from(n: bigint): Q

  static from(n: bigint): Q {
    switch (typeof n) {
      case 'bigint': return Q.fromZ(n)
    }
  }

  private static fromZ(n: bigint): Q {
    return new Q(n)
  }
}
