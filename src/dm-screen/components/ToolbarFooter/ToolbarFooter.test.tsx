/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { ToolbarFooter } from './ToolbarFooter';

describe('ToolbarFooter', () => {
  it('should render', () => {
    const handleShowHandout = jest.fn();
    const setIsNotesDrawerOpen = jest.fn();
    const setIsSideDrawerOpen = jest.fn();

    const wrapper = mount(
      <ToolbarFooter
        handleShowHandout={handleShowHandout}
        setIsNotesDrawerOpen={setIsNotesDrawerOpen}
        setIsSideDrawerOpen={setIsSideDrawerOpen}
      />
    );

    const buttons = wrapper.findAll('button');

    const clearButton = buttons[0];
    const notesButton = buttons[1];
    const drawerButton = buttons[2];

    clearButton.trigger('onClick');
    notesButton.trigger('onClick');
    drawerButton.trigger('onClick');

    expect(handleShowHandout).toHaveBeenCalledTimes(1);
    expect(setIsNotesDrawerOpen).toHaveBeenCalledTimes(1);
    expect(setIsSideDrawerOpen).toHaveBeenCalledTimes(1);
  });

  it('should roll', () => {
    const handleShowHandout = jest.fn();
    const setIsNotesDrawerOpen = jest.fn();
    const setIsSideDrawerOpen = jest.fn();

    const wrapper = mount(
      <ToolbarFooter
        handleShowHandout={handleShowHandout}
        setIsNotesDrawerOpen={setIsNotesDrawerOpen}
        setIsSideDrawerOpen={setIsSideDrawerOpen}
      />
    );

    jest.spyOn(global.Math, 'random').mockReturnValue(0.252222);

    wrapper.find('input')?.trigger('onChange', {
      target: {
        value: '/roll 5d4+3'
      }
    });

    wrapper.find('input')?.trigger('onKeyDown', {
      key: 'Enter',
      target: {
        value: '/roll 5d4+3'
      }
    });

    const inputAfterRoll = wrapper.find('input');

    expect(inputAfterRoll?.props.value).toEqual('');
    expect(wrapper).toContainReactText('13');
  });

  it('should not roll when not an enter key', () => {
    const handleShowHandout = jest.fn();
    const setIsNotesDrawerOpen = jest.fn();
    const setIsSideDrawerOpen = jest.fn();

    const wrapper = mount(
      <ToolbarFooter
        handleShowHandout={handleShowHandout}
        setIsNotesDrawerOpen={setIsNotesDrawerOpen}
        setIsSideDrawerOpen={setIsSideDrawerOpen}
      />
    );

    jest.spyOn(global.Math, 'random').mockReturnValue(0.252222);

    wrapper.find('input')?.trigger('onChange', {
      target: {
        value: '/roll 5d4+3'
      }
    });

    wrapper.find('input')?.trigger('onKeyDown', {
      key: 'A',
      target: {
        value: '/roll 5d4+3'
      }
    });

    const inputAfterRoll = wrapper.find('input');

    expect(inputAfterRoll?.props.value).toEqual('/roll 5d4+3');
    expect(wrapper).not.toContainReactText('13');
  });

  it('should handle a blank roll', () => {
    const handleShowHandout = jest.fn();
    const setIsNotesDrawerOpen = jest.fn();
    const setIsSideDrawerOpen = jest.fn();

    const wrapper = mount(
      <ToolbarFooter
        handleShowHandout={handleShowHandout}
        setIsNotesDrawerOpen={setIsNotesDrawerOpen}
        setIsSideDrawerOpen={setIsSideDrawerOpen}
      />
    );

    jest.spyOn(global.Math, 'random').mockReturnValue(0.252222);

    wrapper.find('input')?.trigger('onChange', {
      target: {
        value: ''
      }
    });

    wrapper.find('input')?.trigger('onKeyDown', {
      key: 'Enter',
      target: {
        value: null
      }
    });

    const inputAfterRoll = wrapper.find('input');

    expect(inputAfterRoll?.props.value).toEqual('');
    expect(wrapper).not.toContainReactText('13');
  });
});
