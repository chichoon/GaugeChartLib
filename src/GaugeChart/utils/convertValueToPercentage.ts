export function convertValueToPercentage(value?: number, maxValue?: number, minValue?: number) {
  if (value === undefined || maxValue === undefined) return NaN;
  if (!minValue && value < 0) return 0;
  if (minValue && value < minValue) return 0;
  if (maxValue === 0) return 0;
  if (value > maxValue) return 100;
  return minValue ? ((value - minValue) / (maxValue - minValue)) * 100 : (value / maxValue) * 100;
}
