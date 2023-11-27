import type { Color } from '@/types/color';

function convertToHex(num: number): string {
  const hex = Math.floor(num).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function convertRGBToHex(color: Color): string {
  if (color.A) {
    const { R, G, B, A } = color;
    return `#${convertToHex(R)}${convertToHex(G)}${convertToHex(B)}${convertToHex(A)}`;
  }

  const { R, G, B } = color;
  return `#${convertToHex(R)}${convertToHex(G)}${convertToHex(B)}`;
}
