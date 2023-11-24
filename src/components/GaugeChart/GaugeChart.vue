<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { GaugeChart } from './GaugeChart.core';

interface Props {
  startColor: string;
  endColor: string;
  value: number;
  minValue?: number;
  maxValue: number;

  width: number; // FIXME: for debug
  height: number; // FIXME: for debug
}

const props = defineProps<Props>();

const wrapperRef = ref<HTMLDivElement | null>(null);
const isMounted = ref<boolean>(false);

let gaugeChartInstance: GaugeChart | null = null;

const resizeObserver = new ResizeObserver(() => {
  gaugeChartInstance?.update(props);
});

onMounted(() => {
  gaugeChartInstance = new GaugeChart({
    target: wrapperRef.value as HTMLDivElement, // TODO: No Type Assertion
    startColor: props.startColor,
    endColor: props.endColor,
    value: props.value,
    maxValue: props.maxValue
  });
  isMounted.value = true;

  resizeObserver.observe(wrapperRef.value as HTMLDivElement);

  gaugeChartInstance.drawChart();
});

watch(props, () => {
  gaugeChartInstance?.update(props);
});
</script>

<template>
  <div ref="wrapperRef" class="gauge-chart" :style="`width: ${width}px; height: ${height}px;`" />
</template>

<style scoped lang="scss">
.gauge-chart {
  width: 100%;
  height: 100%;
  border: 1px solid black;
}
</style>
