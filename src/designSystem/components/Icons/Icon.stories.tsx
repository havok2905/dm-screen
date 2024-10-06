import type { Meta, StoryObj } from '@storybook/react';

import {
  BookIcon,
  CheckIcon,
  CloseIcon,
  MenuIcon
} from './Icons';

const IconsComponent = () => {
  return (
    <>
      <div>
        <CheckIcon/>
      </div>
      <div>
        <CloseIcon/>
      </div>
      <div>
        <MenuIcon/>
      </div>
      <div>
        <BookIcon/>
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