import type { Meta, StoryObj } from '@storybook/react';

import { ErrorDisplay } from './ErrorDisplay';

const meta = {
  title: 'DesignSystem/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {

  }
} satisfies Meta<typeof ErrorDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    errorTitle: 'An Error Ocurred',
    message: 'Lorem ipsum dolor set amet'
  }
};