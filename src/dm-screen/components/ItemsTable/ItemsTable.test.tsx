/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { MarkdownEntity } from '@core/types';
import { mount } from '@shopify/react-testing';

import { ItemsTable } from './ItemsTable';

describe('ItemsTable', () => {
  it('should render', () => {
    const handleShowHandout = jest.fn();

    const items: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'Rarity',
            type: 'string',
            value: 'Common'
          },
          {
            name: 'Cost',
            type: 'string',
            value: '12GP'
          }
        ],
        name: 'Test Item'
      }
    ]

    const wrapper = mount(
      <ItemsTable
        handleShowHandout={handleShowHandout}
        items={items}
        searchTerm=""
      />
    );

    const rows = wrapper.findAll('tr');
  
    const firstRow = rows[0];
    const secondRow = rows[1];

    const firstRowCells = firstRow.findAll('th');
    const secondRowCells = secondRow.findAll('td');

    const buttons = wrapper.findAll('button');
    const showButton = buttons[1];

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    showButton.trigger('onClick');

    expect(modal).toBeFalsy();

    expect(firstRowCells[0]).toContainReactText('Item');
    expect(firstRowCells[1]).toContainReactText('Rarity');
    expect(firstRowCells[2]).toContainReactText('Cost');

    expect(secondRowCells[0]).toContainReactText('Test Item');
    expect(secondRowCells[1]).toContainReactText('Common');
    expect(secondRowCells[2]).toContainReactText('12GP');

    expect(handleShowHandout).toHaveBeenCalledTimes(1);
  });

  it('should open a view modal', () => {
    const handleShowHandout = jest.fn();

    const items: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'Rarity',
            type: 'string',
            value: 'Common'
          },
          {
            name: 'Cost',
            type: 'string',
            value: '12GP'
          }
        ],
        name: 'Test Item'
      }
    ]

    const wrapper = mount(
      <ItemsTable
        handleShowHandout={handleShowHandout}
        items={items}
        searchTerm=""
      />
    );

    const buttons = wrapper.findAll('button');
    const viewButton = buttons[0];

    viewButton.trigger('onClick');

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modal).toBeTruthy();

    const modalBackdrop = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal-backdrop',
    );

    modalBackdrop?.trigger('onClick', {
      stopPropagation: jest.fn()
    });

    const modalAfterClose = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modalAfterClose).toBeFalsy();
  });

  it('should search', () => {
    const handleShowHandout = jest.fn();

    const items: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'Rarity',
            type: 'string',
            value: 'Common'
          },
          {
            name: 'Cost',
            type: 'string',
            value: '12GP'
          }
        ],
        name: 'Test Item'
      }
    ]

    const wrapper = mount(
      <ItemsTable
        handleShowHandout={handleShowHandout}
        items={items}
        searchTerm="Test"
      />
    );

    const rows = wrapper.findAll('tr');

    expect(rows.length).toEqual(2);
  });

  it('should show an empty result', () => {
    const handleShowHandout = jest.fn();

    const items: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'Rarity',
            type: 'string',
            value: 'Common'
          },
          {
            name: 'Cost',
            type: 'string',
            value: '12GP'
          }
        ],
        name: 'Test Item'
      }
    ]

    const wrapper = mount(
      <ItemsTable
        handleShowHandout={handleShowHandout}
        items={items}
        searchTerm="z"
      />
    );

    const rows = wrapper.findAll('tr');

    expect(rows.length).toEqual(0);
    expect(wrapper).toContainReactText('No items found for "z"');
  });
});