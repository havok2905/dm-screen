/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { MarkdownEntity } from '@core/types';
import { mount } from '@shopify/react-testing';

import { CreaturesTable } from './CreaturesTable';
import { InitiativeOrderContextProvider } from '../InitiativeOrderContext';


describe('CreaturesTable', () => {
  it('should render', () => {
    const handleShowHandout = jest.fn();

    const creatures: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'AC',
            type: 'string',
            value: '10'
          },
          {
            name: 'HP',
            type: 'string',
            value: '12'
          }
        ],
        name: 'Test Creature'
      }
    ]

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <CreaturesTable
          creatures={creatures}
          handleShowHandout={handleShowHandout}
          searchTerm=""
        />
      </InitiativeOrderContextProvider>
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

    expect(firstRowCells[0]).toContainReactText('Creature');
    expect(firstRowCells[1]).toContainReactText('AC');
    expect(firstRowCells[2]).toContainReactText('HP');

    expect(secondRowCells[0]).toContainReactText('Test Creature');
    expect(secondRowCells[1]).toContainReactText('10');
    expect(secondRowCells[2]).toContainReactText('12');

    expect(handleShowHandout).toHaveBeenCalledTimes(1);
  });

  it('should open a view modal', () => {
    const handleShowHandout = jest.fn();

    const creatures: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'AC',
            type: 'string',
            value: '10'
          },
          {
            name: 'HP',
            type: 'string',
            value: '12'
          }
        ],
        name: 'Test Creature'
      }
    ]

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <CreaturesTable
          creatures={creatures}
          handleShowHandout={handleShowHandout}
          searchTerm=""
        />
      </InitiativeOrderContextProvider>
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

  it('should execute add/add-hidden buttons', () => {
    const handleShowHandout = jest.fn();

    const creatures: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'AC',
            type: 'string',
            value: '10'
          },
          {
            name: 'HP',
            type: 'string',
            value: '12'
          }
        ],
        name: 'Test Creature'
      }
    ]

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <CreaturesTable
          creatures={creatures}
          handleShowHandout={handleShowHandout}
          searchTerm=""
        />
      </InitiativeOrderContextProvider>
    );

    const buttons = wrapper.findAll('button');
    const addButton = buttons[2];
    const addHiddenButton = buttons[3];

    addButton.trigger('onClick');
    addHiddenButton.trigger('onClick');

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modal).toBeFalsy();
  });

  it('should search', () => {
    const handleShowHandout = jest.fn();

    const creatures: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'AC',
            type: 'string',
            value: '10'
          },
          {
            name: 'HP',
            type: 'string',
            value: '12'
          }
        ],
        name: 'Test Creature'
      }
    ]

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <CreaturesTable
          creatures={creatures}
          handleShowHandout={handleShowHandout}
          searchTerm="Test"
        />
      </InitiativeOrderContextProvider>
    );

    const rows = wrapper.findAll('tr');

    expect(rows.length).toEqual(2);
  });

  it('should show an empty result', () => {
    const handleShowHandout = jest.fn();

    const creatures: MarkdownEntity[] = [
      {
        content: 'Lorem ipsum dolor',
        id: '1',
        image: '/d20.png',
        metadata: [
          {
            name: 'AC',
            type: 'string',
            value: '10'
          },
          {
            name: 'HP',
            type: 'string',
            value: '12'
          }
        ],
        name: 'Test Creature'
      }
    ]

    const wrapper = mount(
      <InitiativeOrderContextProvider>
        <CreaturesTable
          creatures={creatures}
          handleShowHandout={handleShowHandout}
          searchTerm="z"
        />
      </InitiativeOrderContextProvider>
    );

    const rows = wrapper.findAll('tr');

    expect(rows.length).toEqual(0);
    expect(wrapper).toContainReactText('No creatures found for "z"');
  });
});