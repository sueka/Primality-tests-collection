export default function abs(a: bigint): bigint {
  if (a < 0n) {
    return -a
  }

  return a
}
