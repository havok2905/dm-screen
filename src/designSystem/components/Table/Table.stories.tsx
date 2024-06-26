import type { Meta, StoryObj } from '@storybook/react';

import { Columns, Rows } from './types';
import { Table } from './Table';

const meta = {
  title: 'DesignSystem/Table',
  component: Table,
  parameters: {
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const columns: Columns = [
  {
    name: 'One'
  },
  {
    name: 'Two'
  },
  {
    name: 'Three'
  }
]

const rows: Rows = [
  {
    data: [
      'One',
      'Two',
      'Three'
    ],
    actions: [
      {
        onClick: () => {},
        name: 'View'
      }
    ]
  },
  {
    data: [
      'One',
      'Two',
      'Three'
    ],
    actions: [
      {
        onClick: () => {},
        name: 'View'
      }
    ]
  },
  {
    data: [
      'One',
      'Two',
      'Three'
    ],
    actions: [
      {
        onClick: () => {},
        name: 'View'
      }
    ]
  }
];

export const Default: Story = {
  args: {
    columns,
    rows
  }
};