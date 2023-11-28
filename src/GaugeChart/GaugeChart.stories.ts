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
    primaryTextBorderColor: { control: 'color' },
    primaryTextBorderWidth: { control: 'number' },
    secondaryTextColor: { control: 'color' },
    secondaryTextBorderColor: { control: 'color' },
    secondaryTextBorderWidth: { control: 'number' },
    value: { control: 'number' },
    minValue: { control: 'number' },
    maxValue: { control: 'number' }
  },
  args: {
    startColor: '#FF0000',
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
    startColor: '#333333',
    value: 35,
    minValue: 0,
    maxValue: 100
  }
};

export const WithEndColor: Story = {
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

export const WithPrimaryTextBorder: Story = {
  args: {
    startColor: '#ffffff',
    endColor: '#880011',
    primaryTextColor: '#ffffff',
    primaryTextBorderColor: '#ff0000',
    primaryTextBorderWidth: 4,
    value: 165,
    minValue: 100,
    maxValue: 200
  }
};

export const WithSecondaryTextBorder: Story = {
  args: {
    startColor: '#00ff00',
    endColor: '#ff0000',
    secondaryTextColor: '#ff0000',
    secondaryTextBorderColor: '#00ff00',
    secondaryTextBorderWidth: 4,
    value: 165,
    minValue: 100,
    maxValue: 200
  }
};

export const WithTextGradient: Story = {
  args: {
    startColor: '#001500',
    endColor: '#ff90ff',
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
