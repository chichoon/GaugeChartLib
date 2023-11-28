import type { Meta, StoryObj } from '@storybook/vue3';

import GaugeChart from './GaugeChart.vue';

const meta = {
  title: 'Chart/Gauge Chart',
  component: GaugeChart,
  tags: ['chart'],
  argTypes: {
    startColor: { control: 'color' },
    endColor: { control: 'color' },
    backgroundColor: { control: 'color' },
    hasShadow: { control: 'boolean' },
    primaryTextColor: { control: 'color' },
    secondaryTextColor: { control: 'color' },
    value: { control: 'number' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' }
  },
  args: {
    startColor: '#FF0000',
    endColor: '#00FF00',
    value: 0,
    minValue: 0,
    maxValue: 120,
    hasShadow: false,
    primaryTextColor: '#000000'
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

export const WithBackground: Story = {
  args: {
    startColor: '#FFFFFF',
    endColor: '#CCCCCC',
    backgroundColor: '#123456',
    value: 35,
    minValue: 0,
    maxValue: 100
  }
};

export const WithShadow: Story = {
  args: {
    startColor: '#FFFFFF',
    endColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    hasShadow: true,
    value: 35,
    minValue: 0,
    maxValue: 100
  }
};

export const WithPrimaryTextColor: Story = {
  args: {
    startColor: '#45aeff',
    endColor: '#88ca47',
    primaryTextColor: '#abcdef',
    value: 165,
    minValue: 100,
    maxValue: 200
  }
};

export const WithSecondaryTextColor: Story = {
  args: {
    startColor: '#87aebf',
    endColor: '#330098',
    primaryTextColor: '#660a17',
    secondaryTextColor: '#88008866',
    value: 165,
    minValue: 100,
    maxValue: 200
  }
};

export const WithTextGradient: Story = {
  args: {
    startColor: '#441539',
    endColor: '#15bf47',
    isTextGradient: true,
    value: 165,
    minValue: 100,
    maxValue: 200
  }
};

export const WithRGBString: Story = {
  args: {
    startColor: 'rgb(255, 0, 0)',
    endColor: 'rgb(255, 255, 0)',
    backgroundColor: '#FFFFFF00',
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
