import { convertStringToRGB } from '.';
import { convertHexToRGB } from './convertHexToRGB';

export function convertValueToGradientColor(startColor: string, endColor: string, value: number) {
  const ratio = value / 100;
  const startColorRGB = startColor.startsWith('#')
    ? convertHexToRGB(startColor)
    : convertStringToRGB(startColor);
  const endColorRGB = endColor.startsWith('#')
    ? convertHexToRGB(endColor)
    : convertStringToRGB(endColor);

  if (startColorRGB.A && endColorRGB.A) {
    return {
      R: startColorRGB.R + (endColorRGB.R - startColorRGB.R) * ratio,
      G: startColorRGB.G + (endColorRGB.G - startColorRGB.G) * ratio,
      B: startColorRGB.B + (endColorRGB.B - startColorRGB.B) * ratio,
      A: startColorRGB.A + (endColorRGB.A - startColorRGB.A) * ratio
    };
  }

  return {
    R: startColorRGB.R + (endColorRGB.R - startColorRGB.R) * ratio,
    G: startColorRGB.G + (endColorRGB.G - startColorRGB.G) * ratio,
    B: startColorRGB.B + (endColorRGB.B - startColorRGB.B) * ratio
  };
}
