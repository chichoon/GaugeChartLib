export function convertValueToDegree(value: number, maxValue: number) {
  const ratio = value / maxValue;
  const degree = ratio * 270;

  if (degree <= 45) return degree + 135;
  if (degree <= 225) return -(225 - degree);
  return degree - 225;
}

// value 50 maxValue 100 => 0.5
