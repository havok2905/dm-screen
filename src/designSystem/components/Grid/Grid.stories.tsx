import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Item } from './Item';
import { Row } from './Row';

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
        <Row>
          <Item columns={1}>One</Item>
          <Item columns={11}>Two</Item>
        </Row>
        <Row>
          <Item columns={6}>One</Item>
          <Item columns={6}>One</Item>
        </Row>
        <Row>
          <Item columns={4}>One</Item>
          <Item columns={4}>Two</Item>
          <Item columns={4}>Three</Item>
        </Row>
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
