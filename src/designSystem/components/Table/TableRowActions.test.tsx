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

    const wrapper = mount(
      <TableRowActions actions={actions} />
    );

    expect(wrapper).toContainReactComponentTimes('button', 2);

    const buttons = wrapper.findAll('button');
    const buttonA = buttons[0];
    const buttonB = buttons[1];

    buttonA.trigger('onBlur');
    buttonA.trigger('onClick');
    buttonA.trigger('onFocus');
    buttonA.trigger('onKeyDown');
    buttonA.trigger('onKeyUp');
    buttonA.trigger('onMouseEnter');
    buttonA.trigger('onMouseLeave');

    expect(buttonA).toContainReactText('Action 1');
    expect(actions[0].onBlur).toHaveBeenCalledTimes(1);
    expect(actions[0].onClick).toHaveBeenCalledTimes(1);
    expect(actions[0].onFocus).toHaveBeenCalledTimes(1);
    expect(actions[0].onKeyDown).toHaveBeenCalledTimes(1);
    expect(actions[0].onKeyUp).toHaveBeenCalledTimes(1);
    expect(actions[0].onMouseEnter).toHaveBeenCalledTimes(1);
    expect(actions[0].onMouseLeave).toHaveBeenCalledTimes(1);

    buttonB.trigger('onBlur');
    buttonB.trigger('onClick');
    buttonB.trigger('onFocus');
    buttonB.trigger('onKeyDown');
    buttonB.trigger('onKeyUp');
    buttonB.trigger('onMouseEnter');
    buttonB.trigger('onMouseLeave');

    expect(buttonB).toContainReactText('Action 2');
    expect(actions[1].onBlur).toHaveBeenCalledTimes(1);
    expect(actions[1].onClick).toHaveBeenCalledTimes(1);
    expect(actions[1].onFocus).toHaveBeenCalledTimes(1);
    expect(actions[1].onKeyDown).toHaveBeenCalledTimes(1);
    expect(actions[1].onKeyUp).toHaveBeenCalledTimes(1);
    expect(actions[1].onMouseEnter).toHaveBeenCalledTimes(1);
    expect(actions[1].onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
