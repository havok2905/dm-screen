import type { Meta, StoryObj } from '@storybook/react';
import { InitiativeCard } from './InitiativeCard';

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
    ac: 10,
    characterName: 'John Doe',
    hp: 10,
    initiativeRoll: 20
  }
};