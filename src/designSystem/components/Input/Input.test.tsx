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

  it('should fire events', () => {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const onFocus = jest.fn();

    const mockEvent = {};

    const wrapper = mount(
      <Input
        inputId="input"
        inputName="input"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value="test" />
    );

    const input = wrapper.find('input');

    input?.trigger('onBlur', mockEvent);
    input?.trigger('onChange', mockEvent);
    input?.trigger('onFocus', mockEvent);

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(mockEvent);
  
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(mockEvent);
  
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(mockEvent);
  });
});