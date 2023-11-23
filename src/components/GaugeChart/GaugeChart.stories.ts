import type { Meta, StoryObj } from '@storybook/vue3';

import GaugeChart from './GaugeChart.vue';

const meta = {
  title: 'Chart/Gauge Chart',
  component: GaugeChart,
  tags: ['chart'],
  argTypes: {
    color: { control: 'color' }
  },
  args: { color: '#FF0000' }
} satisfies Meta<typeof GaugeChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: '#FF0000'
  }
};
