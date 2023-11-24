export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  text: string
) {
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
}
