import type { Meta, StoryObj } from '@storybook/react';

import { InitiativeCard } from './InitiativeCard';
import { StatusEffects } from '../../../../rules/enums';

const meta = {
  title: 'dm-screen/InitiativeCard',
  component: InitiativeCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof InitiativeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    resourceA: 15,
    resourceB: 374,
    sortValue: 20,
    statuses: [
      StatusEffects.BLINDED,
      StatusEffects.CHARMED,
      StatusEffects.DEAFENED,
      StatusEffects.EXHAUSTION
    ]
  }
};