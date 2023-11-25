<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { GaugeChart } from './GaugeChart.core';
import { convertValueToPercentage } from './utils';

interface Props {
  startColor: string;
  endColor: string;
  value: number;
  minValue?: number;
  maxValue: number;
}

const props = defineProps<Props>();

const wrapperRef = ref<HTMLDivElement | null>(null);
const isMounted = ref<boolean>(false);

let gaugeChartInstance: GaugeChart | null = null;

onMounted(() => {
  const percentageValue = convertValueToPercentage(props.value, props.maxValue, props.minValue);
  gaugeChartInstance = new GaugeChart({
    target: wrapperRef.value as HTMLDivElement, // TODO: No Type Assertion
    startColor: props.startColor,
    endColor: props.endColor,
    percentageValue
  });

  gaugeChartInstance.drawChart();
  isMounted.value = true;
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
