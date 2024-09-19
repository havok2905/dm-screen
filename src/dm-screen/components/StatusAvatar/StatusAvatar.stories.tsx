import type { Meta, StoryObj } from '@storybook/react';

import { StatusAvatar } from './StatusAvatar';
import { StatusEffects } from '../../../../rules/enums';

const meta = {
  title: 'Dm-Screen/StatusAvatar',
  component: StatusAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(StatusEffects)
    }
  }
} satisfies Meta<typeof StatusAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: StatusEffects.BLINDED,
    zIndex: 1,
  }
};