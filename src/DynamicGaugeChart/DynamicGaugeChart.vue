<script setup lang="ts">
import { GaugeChart } from '..';

interface Props {
  width: number;
  height: number;
  value: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div :style="`width: ${props.width}px; height: ${props.height}px;`">
    <GaugeChart
      start-color="#000000"
      end-color="#33acff"
      background-color="rgba(0, 0, 0, 0.3)"
      primary-text-color="#000000"
      secondary-text-color="#00000080"
      :value="props.value"
      :max-value="100"
    />
  </div>
</template>
