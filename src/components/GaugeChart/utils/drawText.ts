export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  text: string
) {
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  ctx.fillText(text, x, y);
}
