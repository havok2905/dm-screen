/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Row } from './types';
import { TableRow } from './TableRow';

describe('TableRow', () => {
  it('renders', () => {
    const row: Row = {
      data: [
        'One',
        'Two',
        'Three'
      ],
      actions: [
        {
          name: 'Action 1',
          onBlur: jest.fn(),
          onClick: jest.fn(),
          onFocus: jest.fn(),
          onKeyDown: jest.fn(),
          onKeyUp: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn()
        },
        {
          name: 'Action 2',
          onBlur: jest.fn(),
          onClick: jest.fn(),
          onFocus: jest.fn(),
          onKeyDown: jest.fn(),
          onKeyUp: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn(),
        }
      ]
    };

    const wrapper = mount(
      <TableRow row={row} />
    );

    expect(wrapper).toContainReactComponentTimes('td', 4);

    const cells = wrapper.findAll('td');

    expect(cells[0]).toContainReactText('One');
    expect(cells[1]).toContainReactText('Two');
    expect(cells[2]).toContainReactText('Three');
    expect(cells[3]).toContainReactComponentTimes('button', 2);
  });

  it('renders collapsible content', () => {
    const row: Row = {
      data: [
        'One',
        'Two',
        'Three'
      ],
      actions: [
        {
          name: 'Action 1',
          onBlur: jest.fn(),
          onClick: jest.fn(),
          onFocus: jest.fn(),
          onKeyDown: jest.fn(),
          onKeyUp: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn()
        },
        {
          name: 'Action 2',
          onBlur: jest.fn(),
          onClick: jest.fn(),
          onFocus: jest.fn(),
          onKeyDown: jest.fn(),
          onKeyUp: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn(),
        }
      ],
      collapsibleRenderer: () => {
        return (
          <p>
            Expanded content
          </p>
        );
      },
      isExpanded: true
    };

    const wrapper = mount(
      <TableRow row={row} />
    );

    expect(wrapper).toContainReactText('Expanded content');
  });

  it('hides collapsible content', () => {
    const row: Row = {
      data: [
        'One',
        'Two',
        'Three'
      ],
      actions: [
        {
          name: 'Action 1',
          onBlur: jest.fn(),
          onClick: jest.fn(),
          onFocus: jest.fn(),
          onKeyDown: jest.fn(),
          onKeyUp: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn()
        },
        {
          name: 'Action 2',
          onBlur: jest.fn(),
          onClick: jest.fn(),
          onFocus: jest.fn(),
          onKeyDown: jest.fn(),
          onKeyUp: jest.fn(),
          onMouseEnter: jest.fn(),
          onMouseLeave: jest.fn(),
        }
      ],
      collapsibleRenderer: () => {
        return (
          <p>
            Expanded content
          </p>
        );
      },
      isExpanded: false
    };

    const wrapper = mount(
      <TableRow row={row} />
    );

    expect(wrapper).not.toContainReactText('Expanded content');
  });
});
