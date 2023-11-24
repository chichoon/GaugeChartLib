import type { Meta, StoryObj } from '@storybook/vue3';

import GaugeChart from './GaugeChart.vue';

const meta = {
  title: 'Chart/Gauge Chart',
  component: GaugeChart,
  tags: ['chart'],
  argTypes: {
    startColor: { control: 'color' },
    endColor: { control: 'color' },
    value: { control: 'number' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' },
    width: { control: 'number' }, // FIXME:for debug
    height: { control: 'number' } // FIXME: for debug
  },
  args: {
    startColor: '#FF0000',
    endColor: '#00FF00',
    value: 0,
    minValue: 0,
    maxValue: 120,
    width: 120,
    height: 120
  }
} satisfies Meta<typeof GaugeChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startColor: '#FF0000',
    endColor: '#00FF00',
    value: 0,
    minValue: 0,
    maxValue: 100,
    width: 120,
    height: 120
  }
};
