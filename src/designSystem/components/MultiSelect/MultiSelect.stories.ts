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
        displayValue: 'Blinded',
        value: 'blinded'
      },
      {
        displayValue: 'Charmed',
        value: 'charmed'
      },
      {
        displayValue: 'Dead',
        value: 'dead'
      },
      {
        displayValue: 'Petrified',
        value: 'petrified'
      },
      {
        displayValue: 'Poisoned',
        value: 'poisoned'
      },
      {
        displayValue: 'Prone',
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