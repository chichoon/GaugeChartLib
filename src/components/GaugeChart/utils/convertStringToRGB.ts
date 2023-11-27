import type { Color } from '@/types/color';

export function convertStringToRGB(color: string): Color {
  if (color.startsWith('rgb')) {
    const [_, r, g, b] = color.match(/\d+/g) || ['0', '0', '0', '0'];
    return {
      R: parseInt(r, 10),
      G: parseInt(g, 10),
      B: parseInt(b, 10)
    };
  } else if (color.startsWith('rgba')) {
    const [_, r, g, b, a] = color.match(/\d+/g) || ['0', '0', '0', '0', '0'];
    return {
      R: parseInt(r, 10),
      G: parseInt(g, 10),
      B: parseInt(b, 10),
      A: parseInt(a, 10)
    };
  }
  throw new Error('Invalid color format.');
}
