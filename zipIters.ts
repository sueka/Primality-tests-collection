export default function* zipIters<A, B>(xs: Iterator<A>, ys: Iterator<B>): Generator<[A, B], void> {
  while (true) {
    const x = xs.next()
    const y = ys.next()

    if (x.done || y.done) {
      return
    }

    yield [x.value, y.value]
  }
}
