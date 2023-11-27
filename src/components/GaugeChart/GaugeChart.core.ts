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
  backgroundColor?: string;
  hasShadow?: boolean;
  textColor?: string;
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
  backgroundColor!: string;
  hasShadow!: boolean;
  textColor!: string;
  percentageValue!: number;
  previousValue!: number;

  /* target DOM */
  target: HTMLDivElement;

  /* Canvas-related options */
  wrapperDOM: HTMLDivElement;
  canvasDOM: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth!: number;
  canvasHeight!: number;

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
    this.canvasDOM.style.display = 'block';

    this.#initializeSize();
    this.ctx.imageSmoothingEnabled = true;
  }

  #initialize(args: GaugeChartArgs, isFirstTime?: boolean) {
    if (isFirstTime) this.previousValue = 0;

    this.startColor = args.startColor;
    this.endColor = args.endColor;
    this.backgroundColor = args.backgroundColor ?? '#CCCCCC';
    this.hasShadow = args.hasShadow ?? false;
    this.textColor = args.textColor ?? '#000000';
    this.percentageValue = args.percentageValue;
  }

  #initializeSize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvasDOM.width = this.wrapperDOM.clientWidth * dpr;
    this.canvasDOM.height = this.wrapperDOM.clientHeight * dpr;
    this.canvasWidth = this.canvasDOM.width;
    this.canvasHeight = this.canvasDOM.height;
  }

  update(newArgs: GaugeChartUpdateArgs) {
    this.#initialize(newArgs);

    this.drawChart();
  }

  resize() {
    this.#initializeSize();

    this.drawChart();
  }

  drawChart() {
    if (this.animationFrameEventId !== 0) cancelAnimationFrame(this.animationFrameEventId);
    if (
      !this.startColor ||
      !this.endColor ||
      this.percentageValue === undefined ||
      isNaN(this.percentageValue)
    ) {
      this.#drawOnError();
      return;
    }
    const DELTA = (this.percentageValue - this.previousValue) / 60;
    this.#drawChartWithAnimation(this.previousValue, DELTA);
  }

  #drawChartWithAnimation(value: number, delta: number) {
    this.#drawGauge(value);
    this.#drawText(value);
    this.previousValue = value;

    if (delta === 0) {
      cancelAnimationFrame(this.animationFrameEventId);
      this.animationFrameEventId = 0;
      return;
    }
    if (
      (delta > 0 && value >= this.percentageValue) ||
      (delta < 0 && value <= this.percentageValue)
    ) {
      this.#drawChartWithAnimation(this.percentageValue, 0);
      return;
    }

    this.animationFrameEventId = requestAnimationFrame(() =>
      this.#drawChartWithAnimation(value + delta, delta)
    );
  }

  #drawGauge(value: number) {
    const WIDTH = (Math.min(this.canvasWidth, this.canvasHeight) * 20) / 100;
    const RADIUS = Math.min(this.canvasWidth, this.canvasHeight) / 2 - WIDTH / 2;
    const END_DEGREE = convertValueToDegree(value);
    const CURRENT_COLOR = convertRGBToHex(
      convertValueToGradientColor(this.startColor, this.endColor, value)
    );

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    drawSector(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      RADIUS,
      135,
      END_DEGREE,
      WIDTH,
      CURRENT_COLOR,
      this.hasShadow
    );
    drawSector(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      RADIUS,
      END_DEGREE,
      45,
      WIDTH,
      this.backgroundColor,
      this.hasShadow
    );
  }

  #drawText(value: number) {
    const TEXT = value.toFixed(1);
    const TEXT_SIZE = (Math.min(this.canvasWidth, this.canvasHeight) * 15) / 100;
    drawText(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2 + 5,
      TEXT_SIZE,
      `${TEXT}%`,
      'black',
      4,
      'white'
    );
  }

  #drawOnError() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    drawText(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      30,
      'Error',
      'black',
      4,
      'white'
    );
  }
}
