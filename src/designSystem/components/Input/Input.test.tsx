/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Input } from './Input';

describe('Input', () => {
  it('should render', () => {
    const wrapper = mount(
      <Input
        inputId="input"
        inputName="input"
        value="test" />
    );

    const input = wrapper.find('input');

    const error = wrapper.findWhere<'p'>(
      (node) => node.is('p') && node.prop('className') === 'dm-screen-design-system-input-error-message',
    );

    expect(error).toBeFalsy();
    expect(input?.props.id).toEqual('input');
    expect(input?.props.name).toEqual('input');
    expect(input?.props.value).toEqual('test');
    expect(input?.props.className?.includes('dm-screen-design-system-input-full')).toEqual(false);
  });

  it('should render full', () => {
    const wrapper = mount(
      <Input
        full
        inputId="input"
        inputName="input"
        value="test" />
    );

    const input = wrapper.find('input');

    expect(input?.props.className?.includes('dm-screen-design-system-input-full')).toEqual(true);
  });

  it('should render a label', () => {
    const wrapper = mount(
      <Input
        full
        inputId="input"
        inputName="input"
        label="label"
        value="test" />
    );

    const label = wrapper.find('label');

    expect(label).toContainReactText('label');
  });

  it('should omit a label', () => {
    const wrapper = mount(
      <Input
        full
        inputId="input"
        inputName="input"
        value="test" />
    );

    const label = wrapper.find('label');

    expect(label).toBeFalsy();
  });

  it('should render label as required', () => {
    const wrapper = mount(
      <Input
        full
        inputId="input"
        inputName="input"
        label="label"
        required
        value="test" />
    );

    const label = wrapper.find('label');

    expect(label?.props.className?.includes('dm-screen-design-system-label-required')).toEqual(true);
  });

  it('should render as an error', () => {
    const wrapper = mount(
      <Input
        error="I'm an error"
        full
        inputId="input"
        inputName="input"
        label="label"
        value="test" />
    );

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input?.props.className?.includes('dm-screen-design-system-input-error')).toEqual(true);
    expect(label?.props.className?.includes('dm-screen-design-system-label-error')).toEqual(true);
    expect(wrapper).toContainReactText('I\'m an error');
  });

  it('should fire events', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();

    const mockEvent = {};

    const wrapper = mount(
      <Input
        inputId="input"
        inputName="input"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        value="test" />
    );

    const input = wrapper.find('input');

    input?.trigger('onBlur', mockEvent);
    input?.trigger('onChange', mockEvent);
    input?.trigger('onFocus', mockEvent);
    input?.trigger('onKeyDown', mockEvent);
    input?.trigger('onKeyUp', mockEvent);

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(mockEvent);
  
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(mockEvent);
  
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(mockEvent);

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith(mockEvent);

    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledWith(mockEvent);
  });
});