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

  /* target DOM */
  target: HTMLDivElement;

  /* Canvas-related options */
  wrapperDOM: HTMLDivElement;
  canvasDOM: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;

  constructor(args: GaugeChartInitialArgs) {
    this.#initialize(args);
    this.target = args.target;

    this.wrapperDOM = document.createElement('div');
    this.canvasDOM = document.createElement('canvas');
    this.wrapperDOM.appendChild(this.canvasDOM);
    this.target.appendChild(this.wrapperDOM);
    this.ctx = this.canvasDOM.getContext('2d') as CanvasRenderingContext2D;

    this.wrapperDOM.style.width = '100%';
    this.wrapperDOM.style.height = '100%';
    this.canvasDOM.width = this.wrapperDOM.clientWidth;
    this.canvasDOM.height = this.wrapperDOM.clientHeight;

    this.canvasWidth = this.canvasDOM.width;
    this.canvasHeight = this.canvasDOM.height;
  }

  #initialize(args: GaugeChartArgs) {
    this.startColor = args.startColor;
    this.endColor = args.endColor;
    this.percentageValue = args.percentageValue;
  }

  update(newArgs: GaugeChartUpdateArgs) {
    this.#initialize(newArgs);

    this.canvasDOM.width = this.wrapperDOM.clientWidth;
    this.canvasDOM.height = this.wrapperDOM.clientHeight;
    this.canvasWidth = this.canvasDOM.width;
    this.canvasHeight = this.canvasDOM.height;

    this.drawChart();
  }

  drawChart() {
    this.drawBackground();
    this.drawGauge();
    this.drawText();

    // window.requestAnimationFrame(() => this.drawChart());
  }

  drawBackground() {
    const WIDTH = (Math.min(this.canvasWidth, this.canvasHeight) * 20) / 100;
    const RADIUS = Math.min(this.canvasWidth, this.canvasHeight) / 2 - WIDTH / 2;

    drawSector(
      this.ctx,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      RADIUS,
      135, // 270도가 되려면 좌측 아래 (135도 지점) 에서 시작
      45, // 270도가 되려면 우측 아래 (45도 지점) 에서 끝
      WIDTH,
      '#cccccc'
    );
  }

  drawGauge() {
    const WIDTH = (Math.min(this.canvasWidth, this.canvasHeight) * 20) / 100;
    const RADIUS = Math.min(this.canvasWidth, this.canvasHeight) / 2 - WIDTH / 2;
    const END_DEGREE = convertValueToDegree(this.percentageValue);
    const CURRENT_COLOR = convertRGBToHex(
      convertValueToGradientColor(this.startColor, this.endColor, this.percentageValue)
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

  drawText() {
    const TEXT = this.percentageValue.toFixed(1);
    const TEXT_SIZE = (Math.min(this.canvasWidth, this.canvasHeight) * 15) / 100;
    drawText(this.ctx, this.canvasWidth / 2, this.canvasHeight / 2, TEXT_SIZE, `${TEXT}%`);
  }
}
