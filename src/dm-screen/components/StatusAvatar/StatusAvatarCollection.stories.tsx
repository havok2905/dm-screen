import type { Meta, StoryObj } from '@storybook/react';

import { StatusAvatarCollection } from './StatusAvatarCollection';
import { StatusEffects } from '../../../../rules/enums';

const meta = {
  title: 'Dm-Screen/StatusAvatarCollection',
  component: StatusAvatarCollection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  }
} satisfies Meta<typeof StatusAvatarCollection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    statuses: [
      StatusEffects.BLINDED,
      StatusEffects.CHARMED,
      StatusEffects.DEAFENED,
      StatusEffects.EXHAUSTION,
      StatusEffects.FRIGHTENED,
      StatusEffects.FRIGHTENED,
      StatusEffects.FRIGHTENED,
      StatusEffects.FRIGHTENED,
      StatusEffects.FRIGHTENED,
      StatusEffects.FRIGHTENED
    ]
  }
};