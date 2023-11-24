import { convertToRadians } from '.';

export function drawSector(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  width: number,
  color: string
) {
  const startRadian = convertToRadians(startAngle);
  const endRadian = convertToRadians(endAngle);
  console.log('start: ', startRadian);
  console.log('end: ', endRadian);

  ctx.lineWidth = width;
  ctx.lineCap = 'butt'; // butt: 기본값, 끝점에 정확히 떨어진다 | round: 끝점이 반원으로 둥글게 된다 | square: 끝점이 사각형으로 된다
  ctx.beginPath(); // 새로운 경로를 시작한다

  ctx.arc(cx, cy, radius, startRadian, endRadian); // 경로에 호를 추가한다
  // ctx.arc(cx + 150, cy, radius, (PI * 2) / 3, PI / 3); // 경로에 호를 한번 더 추가한다
  // 경로는 beginPath() 를 재호출하지 않는 이상 계속 연결되므로
  // 호를 추가하면, 이전까지의 경로에서 이어서 그려진다

  ctx.strokeStyle = color; // 선의 색상을 지정한다
  ctx.stroke(); // 지정한 strokeStyle 으로 경로를 따라 실제 선을 그려낸다

  // =============== 그림자 ===============
  ctx.save(); // 현재의 상태를 저장한다
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 7;
  ctx.lineCap = 'butt';
  ctx.beginPath(); // 다시 새로운 경로 시작
  ctx.arc(cx, cy, radius + width / 2, startRadian, endRadian); // 그림자를 그릴 호를 추가
  ctx.clip(); // 이후의 그리기는 이 clip 영역 안에서만 그려진다 (Clip 됨)
  ctx.stroke();
  ctx.restore();

  // =============== 그림자 ===============
  ctx.save();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 7;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.arc(cx, cy, radius - width / 2 - 2, startRadian, endRadian);
  ctx.clip();
  ctx.stroke();
  ctx.restore();
}
