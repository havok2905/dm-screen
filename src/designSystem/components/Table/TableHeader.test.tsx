/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Columns } from './types';
import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
  it('renders', () => {
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
    ];
    
    const wrapper = mount(
      <TableHeader columns={columns} />
    );

    expect(wrapper).toContainReactComponentTimes('th', 3);

    const cells = wrapper.findAll('th');

    expect(cells[0]).toContainReactText('One');
    expect(cells[1]).toContainReactText('Two');
    expect(cells[2]).toContainReactText('Three');
  });
});
