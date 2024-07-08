/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';
import { TableCell } from './TableCell';

describe('Table', () => {
  it('renders with string', () => {
    const wrapper = mount(
      <TableCell value="value" />
    );

    const cell = wrapper.find('td');

    expect(cell?.text()).toEqual('value');
  });

  it('renders with number', () => {
    const wrapper = mount(
      <TableCell value={0} />
    );

    const cell = wrapper.find('td');

    expect(cell?.text()).toEqual('0');
  });

  it('renders with boolean', () => {
    const wrapper = mount(
      <TableCell value={false} />
    );

    const cell = wrapper.find('td');

    expect(cell?.text()).toEqual('false');
  });

  it('renders with null', () => {
    const wrapper = mount(
      <TableCell value={null} />
    );

    const cell = wrapper.find('td');

    expect(cell?.text()).toEqual('');
  });
});
