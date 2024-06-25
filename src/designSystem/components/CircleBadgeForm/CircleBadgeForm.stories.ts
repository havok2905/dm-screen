import type { Meta, StoryObj } from '@storybook/react';

import { CircleBadgeForm } from './CircleBadgeForm';

const meta = {
  title: 'DesignSystem/CircleBadgeForm',
  component: CircleBadgeForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'blue',
        'green',
        'orange'
      ]
    },
    value: {
      control: 'text'
    }
  },
  args: {
    color: 'blue',
    value: '1'
  }
} satisfies Meta<typeof CircleBadgeForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'blue',
    onChange: (value: string | null) => {
      console.log({ value });
    },
    onValidate: (value: string) => {
      const asNum = Number(value);

      if (Number.isNaN(asNum)) return false;

      return true;
    },
    value: '1'
  }
};