/**
 * Determine the count of decimal places in a number.
 * @param value - the number to check
 * @returns - the count of decimal places in the number
 */
export function decimalsCount(value: number): number {
  if (!isFinite(value)) return 0;
  let e = 1;
  let decimals = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    decimals++;
  }
  return decimals;
}

/**
 * Round a number to a specific number of decimal places only when the number
 * exceeds the specified number of decimal places.
 * @param value - the number to round
 * @param maxPrecision - the maximum number of decimal places to round to
 * @returns - the rounded number
 */
export function roundIfNeeded(value: number, maxPrecision: number): number {
  if (decimalsCount(value) > maxPrecision) {
    return Number(value.toFixed(maxPrecision));
  }
  return value;
}
