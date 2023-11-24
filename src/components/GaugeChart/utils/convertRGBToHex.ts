import type { Color } from '@/types/color';

function convertToHex(num: number): string {
  const hex = Math.floor(num).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function convertRGBToHex(color: Color): string {
  const { R, G, B } = color;
  return `#${convertToHex(R)}${convertToHex(G)}${convertToHex(B)}`;
}
