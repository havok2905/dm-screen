/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';
import { TableCell } from './TableCell';

describe('Table', () => {
  it('renders', () => {
    const wrapper = mount(
      <TableCell value="value" />
    );

    const cell = wrapper.find('td');

    expect(cell?.text()).toEqual('value');
  });
});
