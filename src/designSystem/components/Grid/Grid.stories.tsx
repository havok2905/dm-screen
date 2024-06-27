import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Item } from './Item';
import { GridRow } from './GridRow';

const meta = {
  title: 'DesignSystem/Grid',
  component: Grid,
  parameters: {

  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {
    children: (
      <>
        <GridRow>
          <Item columns={1}>One</Item>
          <Item columns={11}>Two</Item>
        </GridRow>
        <GridRow>
          <Item columns={6}>One</Item>
          <Item columns={6}>One</Item>
        </GridRow>
        <GridRow>
          <Item columns={4}>One</Item>
          <Item columns={4}>Two</Item>
          <Item columns={4}>Three</Item>
        </GridRow>
      </>
    )
  }
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};
