import type { Color } from '@/types/color';

export function convertHexToRGB(color: string): Color {
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
