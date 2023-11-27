export function convertValueToDegree(value: number) {
  if (value < 0) return 135;
  else if (value > 100) return 45;

  const ratio = value / 100;
  const degree = ratio * 270;

  if (degree <= 45) return degree + 135;
  if (degree <= 225) return -(225 - degree);
  return degree - 225;
}

// value 50 maxValue 100 => 0.5
