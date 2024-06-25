import type { Meta, StoryObj } from '@storybook/react';

const HTMLComponent = () => {
  return (
    <div>
      <h1>
        The quick brown fox jumps over the lazy dog
      </h1>
      <h2>
        The quick brown fox jumps over the lazy dog
      </h2>
      <h3>
        The quick brown fox jumps over the lazy dog
      </h3>
      <h4>
        The quick brown fox jumps over the lazy dog
      </h4>
      <h5>
        The quick brown fox jumps over the lazy dog
      </h5>
      <h6>
        The quick brown fox jumps over the lazy dog
      </h6>
      <p>
        The quick brown fox jumps over the lazy dog
      </p>
      <p>
        <strong>
          The quick brown fox jumps over the lazy dog
        </strong>
      </p>
      <p>
        <em>
          The quick brown fox jumps over the lazy dog
        </em>
      </p>
      <p>
        <strong>
          <em>
            The quick brown fox jumps over the lazy dog
          </em>
        </strong>
      </p>
      <p>
        The quick brown fox jumps over the lazy dog
        {' '}
        <sub>
          The quick brown fox jumps over the lazy dog
        </sub>
      </p>
      <p>
        The quick brown fox jumps over the lazy dog
        {' '}
        <sup>
          The quick brown fox jumps over the lazy dog
        </sup>
      </p>
      <p>
        <a href="#">
          The quick brown fox jumps over the lazy dog
        </a>
      </p>
      <p>
        <cite>
          The Scream
        </cite>
        {' '}
        by Edward Munch. Painted in 1893.
      </p>
      <p>
        WWF's goal is to:
        {' '}
        <q>
          Build a future where people live in harmony with nature.
        </q>
        {' '}
        We hope they succeed.
      </p> 
      <ul>
        <li>
          The quick brown fox jumps over the lazy dog
        </li>
        <li>
          The quick brown fox jumps over the lazy dog
        </li>
        <li>
          The quick brown fox jumps over the lazy dog
        </li>
        <li>
          The quick brown fox jumps over the lazy dog
          <ul>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>
          The quick brown fox jumps over the lazy dog
        </li>
        <li>
          The quick brown fox jumps over the lazy dog
        </li>
        <li>
          The quick brown fox jumps over the lazy dog
        </li>
        <li>
          The quick brown fox jumps over the lazy dog
          <ol>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
            <li>
              The quick brown fox jumps over the lazy dog
            </li>
          </ol>
        </li>
      </ol>
      <dl>
        <div>
          <dt>One</dt>
          <dd>The quick brown fox jumps over the lazy dog</dd>
        </div>
        <div>
          <dt>Two</dt>
          <dd>The quick brown fox jumps over the lazy dog</dd>
        </div>
        <div>
          <dt>Three</dt>
          <dd>The quick brown fox jumps over the lazy dog</dd>
        </div>
      </dl>
      <table>
        <thead>
          <tr>
            <th scope="col">
              One
            </th>
            <th scope="col">
              Two
            </th>
            <th scope="col">
              Three
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
          <tr>
            <td>One</td>
            <td>Two</td>
            <td>Three</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const meta = {
  title: 'DesignSystem/styles/Type',
  component: HTMLComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {

  }
} satisfies Meta<typeof HTMLComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {

  }
};