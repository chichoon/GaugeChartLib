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
    maxValue: { control: 'number' }
  },
  args: {
    startColor: '#FF0000',
    endColor: '#00FF00',
    value: 0,
    minValue: 0,
    maxValue: 120
  }
} satisfies Meta<typeof GaugeChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startColor: '#220AFA',
    endColor: '#8CC7F9',
    value: 35,
    minValue: 0,
    maxValue: 100
  }
};

export const WithMinValue: Story = {
  args: {
    startColor: '#FA840A',
    endColor: '#FAA70A',
    value: 165,
    minValue: 100,
    maxValue: 200
  }
};

export const WithNoValue: Story = {
  args: {
    startColor: undefined,
    endColor: undefined,
    value: undefined,
    maxValue: undefined
  }
};
