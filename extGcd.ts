export default function extGcd(a: bigint, b: bigint): { gcd: bigint; x: bigint; y: bigint } {
  function go(r: bigint, sr: bigint, x = 1n, sx = 0n, y = 0n, sy = 1n): { gcd: bigint; x: bigint; y: bigint } {
    if (sr === 0n) {
      return { gcd: r, x, y }
    }

    const q = r / sr

    return go(
      sr, r - q * sr,
      sx, x - q * sx,
      sy, y - q * sy
    )
  }

  return go(a, b)
}
