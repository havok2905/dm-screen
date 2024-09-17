import type { Meta, StoryObj } from '@storybook/react';
import { Pill } from "./Pill";

const meta = {
  title: 'DesignSystem/Pill',
  component: Pill,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Paralyzed",
    closeFunc: () => { }
  }
};