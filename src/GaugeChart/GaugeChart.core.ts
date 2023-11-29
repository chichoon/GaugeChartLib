import { checkDegreeInRange, convertValueToDegree, convertValueToGradientColor } from './utils';

import { drawSector, drawText } from './utils/draw';

interface GaugeChartArgs {
  percentageValue: number;
  startColor: string;
  endColor?: string;
  backgroundColor?: string;
  hasShadow?: boolean;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  primaryTextBorderColor?: string;
  primaryTextBorderWidth?: number;
  secondaryTextBorderColor?: string;
  secondaryTextBorderWidth?: number;
  isTextGradient?: boolean;
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
  primaryTextColor!: string;
  secondaryTextColor!: string;
  isTextGradient!: boolean;
  percentageValue!: number;
  previousValue!: number;
  primaryTextBorderColor?: string;
  primaryTextBorderWidth?: number;
  secondaryTextBorderColor?: string;
  secondaryTextBorderWidth?: number;

  /* target DOM */
  target: HTMLDivElement;
  wrapperDOM: HTMLDivElement;

  /* Canvas-related options */
  canvasDOM: HTMLCanvasElement;
  textCanvasDOM: HTMLCanvasElement;
  tooltipDOM: HTMLDivElement;
  chartContext: CanvasRenderingContext2D;
  textContext: CanvasRenderingContext2D;
  canvasWidth!: number;
  canvasHeight!: number;

  /* Animation-related Options */
  animationFrameEventId: number = 0;

  constructor(args: GaugeChartInitialArgs) {
    this.#initialize(args, true);
    this.target = args.target;

    this.wrapperDOM = document.createElement('div');
    this.canvasDOM = document.createElement('canvas');
    this.textCanvasDOM = document.createElement('canvas');
    this.tooltipDOM = document.createElement('div');
    this.wrapperDOM.appendChild(this.canvasDOM);
    this.wrapperDOM.appendChild(this.textCanvasDOM);
    this.target.appendChild(this.wrapperDOM);
    document.body.appendChild(this.tooltipDOM);
    this.chartContext = this.canvasDOM.getContext('2d') as CanvasRenderingContext2D;
    this.textContext = this.textCanvasDOM.getContext('2d') as CanvasRenderingContext2D;

    this.#initializeDOMStyle();
    this.#initializeSize();
  }

  #initialize(args: GaugeChartArgs, isFirstTime?: boolean) {
    if (isFirstTime) this.previousValue = 0;

    this.startColor = args.startColor;
    this.endColor = args.endColor ?? args.startColor;
    this.backgroundColor = args.backgroundColor ?? '#CCCCCC';
    this.hasShadow = args.hasShadow ?? false;
    this.primaryTextColor = args.primaryTextColor ?? '#000000';
    this.secondaryTextColor = args.secondaryTextColor ?? '#00000066';
    this.primaryTextBorderColor = args.primaryTextBorderColor;
    this.primaryTextBorderWidth = args.primaryTextBorderWidth;
    this.secondaryTextBorderColor = args.secondaryTextBorderColor;
    this.secondaryTextBorderWidth = args.secondaryTextBorderWidth;
    this.isTextGradient = args.isTextGradient ?? false;
    this.percentageValue = args.percentageValue;
  }

  #initializeDOMStyle() {
    this.wrapperDOM.className = 'wrapper-dom';
    this.canvasDOM.className = 'canvas-dom';
    this.textCanvasDOM.className = 'text-canvas-dom';
    this.tooltipDOM.className = 'tooltip-dom';
  }

  #initializeSize() {
    const DPR = window.devicePixelRatio || 1;
    const RECT = this.target.getBoundingClientRect();
    const SIZE = Math.min(RECT.width, RECT.height) || 10;

    this.canvasDOM.style.width = `${SIZE}px`;
    this.canvasDOM.width = SIZE * DPR;
    this.canvasDOM.style.height = `${SIZE}px`;
    this.canvasDOM.height = SIZE * DPR;

    this.textCanvasDOM.style.width = `${SIZE}px`;
    this.textCanvasDOM.width = SIZE * DPR;
    this.textCanvasDOM.style.height = `${SIZE}px`;
    this.textCanvasDOM.height = SIZE * DPR;

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

    this.canvasDOM.removeEventListener('mousemove', this.#onMouseHover.bind(this));
    const DELTA = (this.percentageValue - this.previousValue) / 60;
    this.#drawChartWithAnimation(this.previousValue, DELTA);
    this.canvasDOM.addEventListener('mousemove', this.#onMouseHover.bind(this));
    this.canvasDOM.addEventListener('mouseleave', this.#onMouseOut.bind(this));
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
      (delta > 0 && value > this.percentageValue) ||
      (delta < 0 && value < this.percentageValue)
    ) {
      this.#drawChartWithAnimation(this.percentageValue, 0);
      return;
    }

    this.animationFrameEventId = requestAnimationFrame(() =>
      this.#drawChartWithAnimation(value + delta, delta)
    );
  }

  #drawGauge(value: number, hasBoundary?: boolean) {
    const { WIDTH, RADIUS } = this.#getSizes();
    const END_DEGREE = convertValueToDegree(value);
    const CURRENT_COLOR = this.#getCurrentColor(value);

    this.chartContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    drawSector(
      this.chartContext,
      this.canvasWidth / 2,
      this.canvasHeight / 2 + (this.canvasHeight / 2 - RADIUS) / 2,
      RADIUS,
      135,
      END_DEGREE,
      hasBoundary ? WIDTH + 4 : WIDTH,
      CURRENT_COLOR,
      this.hasShadow
    );

    drawSector(
      this.chartContext,
      this.canvasWidth / 2,
      this.canvasHeight / 2 + (this.canvasHeight / 2 - RADIUS) / 2,
      RADIUS,
      END_DEGREE,
      45,
      WIDTH,
      this.backgroundColor,
      this.hasShadow
    );
  }

  #drawText(value: number) {
    const TEXT = value.toFixed(1).toString();
    const { RADIUS, TEXT_SIZE } = this.#getSizes();
    const HEIGHT = this.canvasHeight / 2 + (this.canvasHeight / 2 - RADIUS) / 2;
    const CURRENT_COLOR = this.#getCurrentColor(value, true);

    this.textContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    drawText(
      this.textContext,
      this.canvasWidth / 2,
      HEIGHT,
      TEXT_SIZE,
      TEXT,
      CURRENT_COLOR,
      this.primaryTextBorderWidth,
      this.primaryTextBorderColor
    );

    drawText(
      this.textContext,
      this.canvasWidth / 2,
      HEIGHT + (TEXT_SIZE * 7) / 10,
      TEXT_SIZE / 2,
      'percent',
      this.secondaryTextColor,
      this.secondaryTextBorderWidth,
      this.secondaryTextBorderColor
    );
  }

  #drawOnError() {
    this.chartContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.textContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    drawText(
      this.textContext,
      this.canvasWidth / 2,
      this.canvasHeight / 2,
      30,
      'Error',
      'black',
      4,
      'white'
    );
  }

  #onMouseHover(e: Event) {
    const { offsetX, offsetY, clientX, clientY } = e as MouseEvent;
    const { WIDTH, RADIUS } = this.#getSizes();
    const CURSOR_DEGREE =
      Math.atan2(
        offsetY - this.canvasHeight / 2 - (this.canvasHeight / 2 - RADIUS) / 2,
        offsetX - this.canvasWidth / 2
      ) *
      (180 / Math.PI);
    const END_DEGREE = convertValueToDegree(this.percentageValue);

    const DISTANCE = Math.sqrt(
      Math.pow(offsetX - this.canvasWidth / 2, 2) +
        Math.pow(offsetY - this.canvasHeight / 2 - (this.canvasHeight / 2 - RADIUS) / 2, 2)
    );

    const isMouseOnGauge =
      DISTANCE <= RADIUS + WIDTH / 2 &&
      DISTANCE >= RADIUS - WIDTH / 2 &&
      checkDegreeInRange(CURSOR_DEGREE, END_DEGREE);

    this.#drawGauge(this.percentageValue, isMouseOnGauge);

    this.tooltipDOM.style.display = isMouseOnGauge ? 'block' : 'none';
    if (!isMouseOnGauge) return;
    this.tooltipDOM.style.top = `${clientY}px`;
    this.tooltipDOM.style.left = `${clientX + 20}px`;
    this.tooltipDOM.innerText = `${this.percentageValue.toFixed(1)}%`;
  }

  #onMouseOut() {
    this.tooltipDOM.style.display = 'none';
  }

  onUnmount() {
    this.canvasDOM.removeEventListener('mousemove', this.#onMouseHover.bind(this));
    this.target.removeChild(this.wrapperDOM);
    document.body.removeChild(this.tooltipDOM);
  }

  #getSizes() {
    const WIDTH = (Math.min(this.canvasWidth, this.canvasHeight) * 20) / 100;
    const RADIUS = Math.min(this.canvasWidth, this.canvasHeight) / 2 - WIDTH / 2 - 4;
    const TEXT_SIZE = (Math.min(this.canvasWidth, this.canvasHeight) * 15) / 100;

    if (RADIUS < 0) return { WIDTH, RADIUS: 0, TEXT_SIZE };
    return { WIDTH, RADIUS, TEXT_SIZE };
  }

  #getCurrentColor(value: number, isText?: boolean) {
    if (isText) {
      if (this.isTextGradient) {
        if (this.startColor === this.endColor) return this.startColor;
        return convertValueToGradientColor(this.startColor, this.endColor, value);
      } else return this.primaryTextColor;
    }
    if (this.startColor === this.endColor) return this.startColor;
    return convertValueToGradientColor(this.startColor, this.endColor, value);
  }
}
