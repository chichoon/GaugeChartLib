<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { GaugeChart } from './GaugeChart.core';
import { convertValueToPercentage, debounce } from './utils';

interface Props {
  startColor: string;
  endColor?: string;
  backgroundColor?: string;
  hasShadow?: boolean;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  isTextGradient?: boolean;
  primaryTextBorderColor?: string;
  primaryTextBorderWidth?: number;
  secondaryTextBorderColor?: string;
  secondaryTextBorderWidth?: number;
  value: number;
  minValue?: number;
  maxValue: number;
}

const props = defineProps<Props>();

const wrapperRef = ref<HTMLDivElement | null>(null);

let gaugeChartInstance: GaugeChart | null = null;
const debouncedResize = debounce(() => gaugeChartInstance?.resize(), 150);

const resizeObserver = new ResizeObserver(() => {
  debouncedResize();
});

onMounted(() => {
  const percentageValue = convertValueToPercentage(props.value, props.maxValue, props.minValue);
  gaugeChartInstance = new GaugeChart({
    target: wrapperRef.value as HTMLDivElement,
    startColor: props.startColor,
    endColor: props.endColor,
    backgroundColor: props.backgroundColor,
    primaryTextColor: props.primaryTextColor,
    secondaryTextColor: props.secondaryTextColor,
    primaryTextBorderColor: props.primaryTextBorderColor,
    primaryTextBorderWidth: props.primaryTextBorderWidth,
    secondaryTextBorderColor: props.secondaryTextBorderColor,
    secondaryTextBorderWidth: props.secondaryTextBorderWidth,
    isTextGradient: props.isTextGradient,
    hasShadow: props.hasShadow,
    percentageValue
  });

  gaugeChartInstance.drawChart();
  resizeObserver.observe(wrapperRef.value as HTMLDivElement);
});

onBeforeUnmount(() => {
  resizeObserver.unobserve(wrapperRef.value as HTMLDivElement);
  gaugeChartInstance?.onUnmount();
});

watch(props, () => {
  const percentageValue = convertValueToPercentage(props.value, props.maxValue, props.minValue);
  gaugeChartInstance?.update({ ...props, percentageValue });
});
</script>

<template>
  <div ref="wrapperRef" class="gauge-chart" />
</template>

<style scoped lang="scss">
.gauge-chart {
  width: 100%;
  height: 100%;
}
</style>
