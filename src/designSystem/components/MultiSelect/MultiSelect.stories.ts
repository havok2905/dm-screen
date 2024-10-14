import type { Meta, StoryObj } from '@storybook/react';

import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'DesignSystem/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    
  },
  args: {

  }
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dataItems: [
      {
        displayValues: ['Blinded'],
        value: 'blinded'
      },
      {
        displayValues: ['Charmed'],
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
    maxHeight: 250,
    onSelect: (value, dataItem, el) => {
      console.log('onSelect', { value, dataItem, el });
    }
  }
};