import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './LinkButton';

const meta = {
  title: 'DesignSystem/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    buttonText: { control: 'text' },
    color: {
      control: 'select',
      options: [
        'green',
        'red'
      ]
    }
  },
  args: {

  }
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonText: 'Button',
    color: 'green'
  }
};