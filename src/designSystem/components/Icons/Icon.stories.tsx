import type { Meta, StoryObj } from '@storybook/react';

import { CloseIcon, MenuIcon } from './Icons';

const IconsComponent = () => {
  return (
    <>
      <div>
        <CloseIcon/>
      </div>
      <div>
        <MenuIcon/>
      </div>
    </>
  );
};

const meta = {
  title: 'DesignSystem/Icons',
  component: IconsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof IconsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};