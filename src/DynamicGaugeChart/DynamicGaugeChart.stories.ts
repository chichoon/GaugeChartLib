import type { Meta, StoryObj } from '@storybook/vue3';

import DynamicGaugeChart from './DynamicGaugeChart.vue';

const meta = {
  title: 'Chart/Gauge Chart With Different Width and Height',
  component: DynamicGaugeChart,
  tags: ['chart'],
  argTypes: {
    width: { control: 'number' },
    height: { control: 'number' },
    value: { control: 'number' }
  },
  args: {
    width: 300,
    height: 300,
    value: 50
  }
} satisfies Meta<typeof DynamicGaugeChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 300,
    height: 300,
    value: 50
  }
};
