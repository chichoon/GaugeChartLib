```ts
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
  ctx.lineCap = 'butt'; // butt: 기본값, 끝점에 정확히 떨어진다 | round: 끝점이 반원으로 둥글게 된다 | square: 끝점이 사각형으로 된다
  ctx.beginPath(); // 새로운 경로를 시작한다

  ctx.arc(cx, cy, radius, startRadian, endRadian); // 경로에 호를 추가한다
  // ctx.arc(cx + 150, cy, radius, (PI * 2) / 3, PI / 3); // 경로에 호를 한번 더 추가한다
  // 경로는 beginPath() 를 재호출하지 않는 이상 계속 연결되므로
  // 호를 추가하면, 이전까지의 경로에서 이어서 그려진다

  ctx.strokeStyle = color; // 선의 색상을 지정한다
  ctx.stroke(); // 지정한 strokeStyle 으로 경로를 따라 실제 선을 그려낸다

  if (!hasShadow) return; // 그림자가 없을 경우 하위 코드 실행 X

  // =============== 클리핑 영역 ===============
  ctx.save(); // 현재의 그리기 영역을 저장한다
  const region = new Path2D();
  region.arc(cx, cy, radius - width / 2, startRadian, endRadian); // 경로에 호를 추가한다
  region.arc(cx, cy, radius + width / 2, endRadian, startRadian, true); // 경로에 호를 추가한다
  // 호를 두개 그리면 호가 연결되어 그리기 영역이 차트와 같은 모양으로 생성된다

  ctx.clip(region, 'nonzero'); // 이후의 그리기는 이 clip 영역 안에서만 그려진다 (Clip 됨)

  // =============== 그림자 ===============
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'; // 그림자 색상 설정
  ctx.shadowBlur = 10; // 그림자 번짐 정도
  ctx.shadowOffsetX = 0; // 그림자 X 축 위치
  ctx.shadowOffsetY = 0; // 그림자 Y 축 위치
  ctx.lineCap = 'butt';
  ctx.beginPath(); // 다시 새로운 경로 시작
  ctx.arc(cx, cy, radius + width / 2, startRadian, endRadian); // 그림자를 그릴 호를 추가
  ctx.stroke(); // 그림자 그리기

  ctx.beginPath(); // 안쪽 (작은 원) 그림자도 반복
  ctx.arc(cx, cy, radius - width / 2, startRadian, endRadian);
  ctx.stroke();

  ctx.restore(); // 저장된 그리기 영역을 복구한다
  // 그리기 영역을 저장 + 복구하지 않으면 그림이 그려지는 영역이 클리핑된 영역으로 제한되어
  // 후에 drawText 등이 정상 동작하지 않음
}
```
