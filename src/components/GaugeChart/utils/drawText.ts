export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  text: string,
  textColor?: string,
  strokeWidth?: number,
  strokeColor?: string
) {
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (strokeWidth && strokeColor) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
    ctx.strokeText(text, x, y);
  }
  ctx.fillStyle = textColor ?? 'black';
  ctx.fillText(text, x, y);
}
