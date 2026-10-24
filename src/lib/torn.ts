// Deterministic "torn paper" clip-path generator (same output on server and client).
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function torn(seed: number, points = 48, jitter = 4, squareness = 3) {
  const rand = rng(seed);
  const e = 2 / squareness;
  const pts: string[] = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    const r = 1 - rand() * (jitter / 50);
    const x = 50 + 50 * r * Math.sign(c) * Math.pow(Math.abs(c), e);
    const y = 50 + 50 * r * Math.sign(s) * Math.pow(Math.abs(s), e);
    pts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return `polygon(${pts.join(",")})`;
}
