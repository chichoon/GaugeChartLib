import { convertHexToRGB } from './convertHexToRGB';

export function convertValueToGradientColor(startColor: string, endColor: string, value: number) {
  const ratio = value / 100;
  const startColorRGB = convertHexToRGB(startColor);
  const endColorRGB = convertHexToRGB(endColor);

  return {
    R: startColorRGB.R + (endColorRGB.R - startColorRGB.R) * ratio,
    G: startColorRGB.G + (endColorRGB.G - startColorRGB.G) * ratio,
    B: startColorRGB.B + (endColorRGB.B - startColorRGB.B) * ratio
  };
}
