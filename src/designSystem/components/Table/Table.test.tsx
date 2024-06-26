/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Columns, Rows } from './types';
import { Table } from './Table';

describe('Table', () => {
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

    const rows: Rows = [
      {
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
      },
      {
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
      },
      {
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
      }
    ];
    
    const wrapper = mount(
      <Table
        columns={columns}
        rows={rows} />
    );

    expect(wrapper).toContainReactComponentTimes('th', 3);
    expect(wrapper).toContainReactComponentTimes('tr', 4);

    const headers = wrapper.findAll('th');
    const rowsEls = wrapper.findAll('tr');

    expect(headers[0]).toContainReactText('One');
    expect(headers[1]).toContainReactText('Two');
    expect(headers[2]).toContainReactText('Three');

    const cellsA = rowsEls[1].findAll('td');
    expect(cellsA[0]).toContainReactText('One');
    expect(cellsA[1]).toContainReactText('Two');
    expect(cellsA[2]).toContainReactText('Three');
    expect(cellsA[3]).toContainReactComponentTimes('button', 2);

    const cellsB = rowsEls[2].findAll('td');
    expect(cellsB[0]).toContainReactText('One');
    expect(cellsB[1]).toContainReactText('Two');
    expect(cellsB[2]).toContainReactText('Three');
    expect(cellsB[3]).toContainReactComponentTimes('button', 2);

    const cellsC = rowsEls[3].findAll('td');
    expect(cellsC[0]).toContainReactText('One');
    expect(cellsC[1]).toContainReactText('Two');
    expect(cellsC[2]).toContainReactText('Three');
    expect(cellsC[3]).toContainReactComponentTimes('button', 2);
  });
});
