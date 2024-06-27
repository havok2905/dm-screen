/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { RowAction } from './types';
import { TableRowActions } from './TableRowActions';

describe('TableRowActions', () => {
  it('renders', () => {
    const actions: RowAction[] = [
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
    ];

    const rowData = ['One', false, 3];

    const wrapper = mount(
      <TableRowActions
        actions={actions}
        rowData={rowData} />
    );

    expect(wrapper).toContainReactComponentTimes('button', 2);

    const buttons = wrapper.findAll('button');
    const buttonA = buttons[0];
    const buttonB = buttons[1];

    const mockEvent = { };

    buttonA.trigger('onBlur', mockEvent);
    buttonA.trigger('onClick', mockEvent);
    buttonA.trigger('onFocus', mockEvent);
    buttonA.trigger('onKeyDown', mockEvent);
    buttonA.trigger('onKeyUp', mockEvent);
    buttonA.trigger('onMouseEnter', mockEvent);
    buttonA.trigger('onMouseLeave', mockEvent);

    expect(buttonA).toContainReactText('Action 1');

    expect(actions[0].onBlur).toHaveBeenCalledTimes(1);
    expect(actions[0].onBlur).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[0].onClick).toHaveBeenCalledTimes(1);
    expect(actions[0].onClick).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[0].onFocus).toHaveBeenCalledTimes(1);
    expect(actions[0].onFocus).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[0].onKeyDown).toHaveBeenCalledTimes(1);
    expect(actions[0].onKeyDown).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[0].onKeyUp).toHaveBeenCalledTimes(1);
    expect(actions[0].onKeyUp).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[0].onMouseEnter).toHaveBeenCalledTimes(1);
    expect(actions[0].onMouseEnter).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[0].onMouseLeave).toHaveBeenCalledTimes(1);
    expect(actions[0].onMouseLeave).toHaveBeenCalledWith(mockEvent, rowData);

    buttonB.trigger('onBlur', mockEvent);
    buttonB.trigger('onClick', mockEvent);
    buttonB.trigger('onFocus', mockEvent);
    buttonB.trigger('onKeyDown', mockEvent);
    buttonB.trigger('onKeyUp', mockEvent);
    buttonB.trigger('onMouseEnter', mockEvent);
    buttonB.trigger('onMouseLeave', mockEvent);

    expect(buttonB).toContainReactText('Action 2');
    
    expect(actions[1].onBlur).toHaveBeenCalledTimes(1);
    expect(actions[1].onBlur).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[1].onClick).toHaveBeenCalledTimes(1);
    expect(actions[1].onClick).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[1].onFocus).toHaveBeenCalledTimes(1);
    expect(actions[1].onFocus).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[1].onKeyDown).toHaveBeenCalledTimes(1);
    expect(actions[1].onKeyDown).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[1].onKeyUp).toHaveBeenCalledTimes(1);
    expect(actions[1].onKeyUp).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[1].onMouseEnter).toHaveBeenCalledTimes(1);
    expect(actions[1].onMouseEnter).toHaveBeenCalledWith(mockEvent, rowData);

    expect(actions[1].onMouseLeave).toHaveBeenCalledTimes(1);
    expect(actions[1].onMouseLeave).toHaveBeenCalledWith(mockEvent, rowData);
  });
});
