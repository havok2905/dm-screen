/**
 * @jest-environment jsdom
 */

import { mount } from '@shopify/react-testing';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  it('should render as a button by default', () => {
    const wrapper = mount(
      <LinkButton
        buttonText="Click me"
        color="green" />
    );

    const button = wrapper.find('button');

    expect(button?.text()).toEqual('Click me');
  });

  it('should render a green button', () => {
    const wrapper = mount(
      <LinkButton
        buttonText="Click me"
        color="green" />
    );

    const button = wrapper.find('button');

    expect(button?.props.className?.includes('dm-screen-design-system-link-button-green')).toEqual(true);
  });

  it('should render a red button', () => {
    const wrapper = mount(
      <LinkButton
        buttonText="Click me"
        color="red" />
    );

    const button = wrapper.find('button');

    expect(button?.props.className?.includes('dm-screen-design-system-link-button-red')).toEqual(true);
  });


  it('should pass along disabled state as button', () => {
    const wrapper = mount(
      <LinkButton
        buttonText="Click me"
        color="green"
        disabled />
    );

    const button = wrapper.find('button');

    expect(button?.props.disabled).toEqual(true);
  });

  it('should pass along enabled state as button', () => {
    const wrapper = mount(
      <LinkButton
        buttonText="Click me"
        color="green"
        disabled={false} />
    );

    const button = wrapper.find('button');

    expect(button?.props.disabled).toEqual(false);
  });

  it('should fire passed along callbacks', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <LinkButton
        buttonText="Click me"
        color="green"
        disabled={false}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} />
    );

    const button = wrapper.find('button');

    button?.trigger('onBlur', {});
    button?.trigger('onClick', {});
    button?.trigger('onFocus', {});
    button?.trigger('onKeyDown', {});
    button?.trigger('onKeyUp', {});
    button?.trigger('onMouseEnter', {});
    button?.trigger('onMouseLeave', {});

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
