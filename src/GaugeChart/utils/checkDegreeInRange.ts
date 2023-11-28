export function checkDegreeInRange(degree: number, endDegree: number) {
  if (endDegree < 0) {
    if (degree > 135 && degree <= 180) return true;
    if (degree < 0 && degree < endDegree) return true;
    return false;
  } else if (endDegree > 135) {
    if (degree > 135 && degree < endDegree) return true;
    return false;
  } else if (endDegree < 45) {
    if (degree > 135 && degree <= 180) return true;
    if (degree < endDegree) return true;
    return false;
  }
  return false;
}
