import type { Color } from '@/types/color';

function convertToHex(num: number): string {
  const hex = Math.floor(num).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function convertRGBToHex(color: Color): string {
  if (color.A) {
    const { R, G, B, A } = color;
    return `#${convertToHex(R)}${convertToHex(G)}${convertToHex(B)}${convertToHex(A)}`;
  }

  const { R, G, B } = color;
  return `#${convertToHex(R)}${convertToHex(G)}${convertToHex(B)}`;
}

function convertHexToRGB(color: string): Color {
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return {
      R: parseInt(`${r}${r}`, 16),
      G: parseInt(`${g}${g}`, 16),
      B: parseInt(`${b}${b}`, 16)
    };
  } else if (color.length === 7) {
    const [_, r1, r2, g1, g2, b1, b2] = color;
    return {
      R: parseInt(`${r1}${r2}`, 16),
      G: parseInt(`${g1}${g2}`, 16),
      B: parseInt(`${b1}${b2}`, 16)
    };
  } else if (color.length === 9) {
    const [_, r1, r2, g1, g2, b1, b2, a1, a2] = color;
    return {
      R: parseInt(`${r1}${r2}`, 16),
      G: parseInt(`${g1}${g2}`, 16),
      B: parseInt(`${b1}${b2}`, 16),
      A: parseInt(`${a1}${a2}`, 16)
    };
  }
  throw new Error('Invalid color format.');
}

function convertStringToRGB(color: string): Color {
  if (color.startsWith('rgb')) {
    const [r, g, b] = color.match(/\d+/g) || ['0', '0', '0'];
    return {
      R: parseInt(r, 10),
      G: parseInt(g, 10),
      B: parseInt(b, 10)
    };
  } else if (color.startsWith('rgba')) {
    const [r, g, b, a] = color.match(/\d+/g) || ['0', '0', '0', '0'];
    return {
      R: parseInt(r, 10),
      G: parseInt(g, 10),
      B: parseInt(b, 10),
      A: parseInt(a, 10)
    };
  }
  throw new Error('Invalid color format.');
}

export function convertValueToGradientColor(startColor: string, endColor: string, value: number) {
  const ratio = value / 100;
  const startColorRGB = startColor.startsWith('#')
    ? convertHexToRGB(startColor)
    : convertStringToRGB(startColor);
  const endColorRGB = endColor.startsWith('#')
    ? convertHexToRGB(endColor)
    : convertStringToRGB(endColor);

  if (startColorRGB.A && endColorRGB.A) {
    return convertRGBToHex({
      R: startColorRGB.R + (endColorRGB.R - startColorRGB.R) * ratio,
      G: startColorRGB.G + (endColorRGB.G - startColorRGB.G) * ratio,
      B: startColorRGB.B + (endColorRGB.B - startColorRGB.B) * ratio,
      A: startColorRGB.A + (endColorRGB.A - startColorRGB.A) * ratio
    });
  }

  return convertRGBToHex({
    R: startColorRGB.R + (endColorRGB.R - startColorRGB.R) * ratio,
    G: startColorRGB.G + (endColorRGB.G - startColorRGB.G) * ratio,
    B: startColorRGB.B + (endColorRGB.B - startColorRGB.B) * ratio
  });
}
