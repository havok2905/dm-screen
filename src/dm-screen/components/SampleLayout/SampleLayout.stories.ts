import type { Meta, StoryObj } from '@storybook/react';
import { SampleLayout } from './SampleLayout';

const meta = {
  title: 'dm-screen/SampleLayout',
  component: SampleLayout,
  parameters: {

  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof SampleLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};
