import type { Meta, StoryObj } from '@storybook/react';
import { SideDrawer } from './SideDrawer';

const meta = {
  title: 'DesignSystem/SideDrawer',
  component: SideDrawer,
  parameters: {

  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' }
  },
  args: {

  }
} satisfies Meta<typeof SideDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <p>
        Hello
      </p>
    ),
    isOpen: true,
    onClose: () => {},
    portalElement: document.body
  }
};