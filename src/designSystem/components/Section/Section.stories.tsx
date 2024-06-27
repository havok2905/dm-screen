import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';

const meta = {
  title: 'DesignSystem/Section',
  component: Section,
  parameters: {

  },
  tags: ['autodocs'],
  argTypes: {
    sectionHeaderEl: { control: 'select', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    sectionTitle: { control: 'text' }
  },
  args: {

  }
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sectionActions: (
      <button>Click me!</button>
    ),
    sectionHeaderEl: 'h1',
    sectionTitle: 'Hello, world!',
    children: (
      <p>
        Hello, world!
      </p>
    )
  }
};