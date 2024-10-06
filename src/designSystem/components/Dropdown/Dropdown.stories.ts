import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

const meta = {
  title: 'DesignSystem/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {

  }
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columnLabels: [
      'ID',
      'Condition'
    ],
    dataItems: [
      {
        displayValues: ['Blinded'],
        value: 'blinded'
      },
      {
        displayValues: ['CharmedCharmedCharmedCharmedCharmedCharmed'],
        value: 'charmed'
      },
      {
        displayValues: ['Dead'],
        value: 'dead'
      },
      {
        displayValues: ['Petrified'],
        value: 'petrified'
      },
      {
        displayValues: ['Poisoned'],
        value: 'poisoned'
      },
      {
        displayValues: ['Prone'],
        value: 'prone'
      }
    ],
    initialSelected: ['petrified'],
    inputId: 'Input Id',
    maxHeight: 100,
    onSelect: (value, dataItem, el) => {
      console.log('onSelect', { value, dataItem, el });
    }
  }
};