export function decimalsCount(value: number) {
  if (!isFinite(value)) return 0;
  let e = 1;
  let decimals = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    decimals++;
  }
  return decimals;
}

export function roundIfNeeded(value: number, maxPrecision: number): number {
  if (decimalsCount(value) > maxPrecision) {
    return Number(value.toFixed(maxPrecision));
  }
  return value;
}
