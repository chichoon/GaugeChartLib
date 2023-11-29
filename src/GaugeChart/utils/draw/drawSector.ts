function convertToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

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
  const START_RADIAN = convertToRadians(startAngle);
  const END_RADIAN = convertToRadians(endAngle);
  const RADIUS_INNER_SIZE = radius - width / 2 < 0 ? 0 : radius - width / 2;

  ctx.lineWidth = width;
  ctx.lineCap = 'butt';
  ctx.beginPath();

  ctx.arc(cx, cy, radius, START_RADIAN, END_RADIAN);
  ctx.strokeStyle = color;
  ctx.stroke();

  if (!hasShadow) return;

  ctx.save();
  const region = new Path2D();
  region.arc(cx, cy, RADIUS_INNER_SIZE, START_RADIAN, END_RADIAN);
  region.arc(cx, cy, radius + width / 2, END_RADIAN, START_RADIAN, true);

  ctx.clip(region, 'nonzero');

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.arc(cx, cy, radius + width / 2, START_RADIAN, END_RADIAN);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, RADIUS_INNER_SIZE, START_RADIAN, END_RADIAN);
  ctx.stroke();

  ctx.restore();
}
