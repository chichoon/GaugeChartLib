import {
  convertRGBToHex,
  convertValueToDegree,
  convertValueToGradientColor,
  drawSector,
  drawText
} from './utils';

interface GaugeChartArgs {
  startColor: string;
  endColor: string;
  percentageValue: number;
}

export interface GaugeChartInitialArgs extends GaugeChartArgs {
  target: HTMLDivElement;
}

export interface GaugeChartUpdateArgs extends GaugeChartArgs {}

export class GaugeChart {
  /* Chart Values */
  startColor!: string;
  endColor!: string;
  percentageValue!: number;
  previousValue!: number;

  /* target DOM */
  target: HTMLDivElement;

  /* Canvas-related options */
  wrapperDOM: HTMLDivElement;
  canvasDOM: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  /* Animation-related Options */
  animationFrameEventId: number = 0;

  constructor(args: GaugeChartInitialArgs) {
    this.#initialize(args, true);
    this.target = args.target;

    this.wrapperDOM = document.createElement('div');
    this.canvasDOM = document.createElement('canvas');
    this.wrapperDOM.appendChild(this.canvasDOM);
    this.target.appendChild(this.wrapperDOM);
    this.ctx = this.canvasDOM.getContext('2d') as CanvasRenderingContext2D;

    this.wrapperDOM.style.width = '100%';
    this.wrapperDOM.style.height = '100%';
    this.wrapperDOM.style.border = '1px solid black';
    this.canvasDOM.style.display = 'block';
    this.canvasDOM.width = this.wrapperDOM.clientWidth;
    this.canvasDOM.height = this.wrapperDOM.clientHeight;

    this.canvasWidth = this.canvasDOM.width;
    this.canvasHeight = this.canvasDOM.height;
  }

  #initialize(args: GaugeChartArgs, isFirstTime?: boolean) {
    if (isFirstTime) this.previousValue = 0;

    this.startColor = args.startColor;
    this.endColor = args.endColor;
    this.percentageValue = args.percentageValue;
  }

  update(newArgs: GaugeChartUpdateArgs) {
    this.#initialize(newArgs);

    this.drawChart();
  }

  resize(width: number, height: number) {
    this.canvasDOM.width = width;
    this.canvasDOM.height = height;
    this.canvasWidth = this.canvasDOM.width;
    this.canvasHeight = this.canvasDOM.height;

    this.drawChart();
  }

  drawChart() {
    if (this.animationFrameEventId !== 0) cancelAnimationFrame(this.animationFrameEventId);
    const DELTA = (this.percentageValue - this.previousValue) / 60;
    this.#drawChartWithAnimation(this.previousValue, DELTA);
  }

  #drawChartWithAnimation(value: number, delta: number) {
    this.#drawBackground();
    this.#drawGauge(value);
    this.#drawText(value);
    this.previousValue = value;

    if (
      delta === 0 ||
      (delta > 0 && value >= this.percentageValue) ||
      (delta < 0 && value <= this.percentageValue)
    ) {
      cancelAnimationFrame(this.animationFrameEventId);
      this.animationFrameEventId = 0;
      return;
    }
    this.animationFrameEventId = requestAnimationFrame(() =>
      this.#drawChartWithAnimation(value + delta, delta)
    );
  }

  #drawBackground() {
    const WIDTH = (Math.min(this.canvasWidth, this.canvasHeight) * 20) / 100;
    const RADIUS = Math.min(this.canvasWidth, this.canvasHeight) / 2 - WIDTH / 2;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    drawSector(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      RADIUS,
      135, // 270도가 되려면 좌측 아래 (135도 지점) 에서 시작
      45, // 270도가 되려면 우측 아래 (45도 지점) 에서 끝
      WIDTH,
      '#CCCCCC'
    );
  }

  #drawGauge(value: number) {
    const WIDTH = (Math.min(this.canvasWidth, this.canvasHeight) * 20) / 100;
    const RADIUS = Math.min(this.canvasWidth, this.canvasHeight) / 2 - WIDTH / 2;
    const END_DEGREE = convertValueToDegree(value);
    const CURRENT_COLOR = convertRGBToHex(
      convertValueToGradientColor(this.startColor, this.endColor, value)
    );

    drawSector(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      RADIUS,
      135,
      END_DEGREE,
      WIDTH,
      CURRENT_COLOR
    );
  }

  #drawText(value: number) {
    const TEXT = value.toFixed(1);
    const TEXT_SIZE = (Math.min(this.canvasWidth, this.canvasHeight) * 15) / 100;
    drawText(this.ctx, this.canvasWidth / 2, this.canvasHeight / 2, TEXT_SIZE, `${TEXT}%`);
  }
}
