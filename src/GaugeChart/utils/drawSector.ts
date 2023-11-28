import { convertToRadians } from '.';

export function drawSector(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  width: number,
  color: string,
  hasShadow?: boolean
) {
  const startRadian = convertToRadians(startAngle);
  const endRadian = convertToRadians(endAngle);

  ctx.lineWidth = width;
  ctx.lineCap = 'butt';
  ctx.beginPath();

  ctx.arc(cx, cy, radius, startRadian, endRadian);
  ctx.strokeStyle = color;
  ctx.stroke();

  if (!hasShadow) return;

  ctx.save();
  const region = new Path2D();
  region.arc(cx, cy, radius - width / 2, startRadian, endRadian);
  region.arc(cx, cy, radius + width / 2, endRadian, startRadian, true);

  ctx.clip(region, 'nonzero');

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.arc(cx, cy, radius + width / 2, startRadian, endRadian);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, radius - width / 2, startRadian, endRadian);
  ctx.stroke();

  ctx.restore();
}
