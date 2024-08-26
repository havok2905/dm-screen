import type { Meta, StoryObj } from '@storybook/react';
import { LoadingBar } from './LoadingBar';

const meta = {
  title: 'DesignSystem/LoadingBar',
  component: LoadingBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof LoadingBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};