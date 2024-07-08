/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Button } from './Button';

describe('Button', () => {
  it('should render as a button by default', () => {
    const wrapper = mount(
      <Button buttonText="Click me" />
    );

    const button = wrapper.find('button');

    expect(button?.text()).toEqual('Click me');
  });

  it('should render as a button as button', () => {
    const wrapper = mount(
      <Button
        as="button"
        buttonText="Click me" />
    );

    const button = wrapper.find('button');

    expect(button?.text()).toEqual('Click me');
  });

  it('should render as a anchor as a', () => {
    const wrapper = mount(
      <Button
        as="a"
        buttonText="Click me" />
    );

    const button = wrapper.find('a');

    expect(button?.text()).toEqual('Click me');
  });

  it('should pass along disabled state as button', () => {
    const wrapper = mount(
      <Button
        buttonText="Click me"
        disabled />
    );

    const button = wrapper.find('button');

    expect(button?.props.disabled).toEqual(true);
  });

  it('should pass along enabled state as button', () => {
    const wrapper = mount(
      <Button
        buttonText="Click me"
        disabled={false} />
    );

    const button = wrapper.find('button');

    expect(button?.props.disabled).toEqual(false);
  });

  it('should pass along disabled state as anchor', () => {
    const wrapper = mount(
      <Button
        as="a"
        buttonText="Click me"
        disabled />
    );

    const button = wrapper.find('a');

    expect(button?.props.className?.includes('button-disabled')).toEqual(true);
  });

  it('should pass along enabled state as anchor', () => {
    const wrapper = mount(
      <Button
        as="a"
        buttonText="Click me"
        disabled={false} />
    );

    const button = wrapper.find('a');

    expect(button?.props.className?.includes('button-disabled')).toEqual(false);
  });

  it('should fire passed along callbacks as button', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <Button
        buttonText="Click me"
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

  it('should fire passed along callbacks as anchor', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const onClickPreventDefault = jest.fn();
    const onKeyDownPreventDefault = jest.fn();
    const onKeyUpPreventDefault = jest.fn();

    const wrapper = mount(
      <Button
        as="a"
        buttonText="Click me"
        disabled={false}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} />
    );

    const button = wrapper.find('a');

    button?.trigger('onBlur', {});
    button?.trigger('onClick', {
      preventDefault: onClickPreventDefault
    });
    button?.trigger('onFocus', {});
    button?.trigger('onKeyDown', {
      preventDefault: onKeyDownPreventDefault
    });
    button?.trigger('onKeyUp', {
      preventDefault: onKeyUpPreventDefault
    });
    button?.trigger('onMouseEnter', {});
    button?.trigger('onMouseLeave', {});

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    expect(onClickPreventDefault).toHaveBeenCalledTimes(1);
    expect(onKeyDownPreventDefault).toHaveBeenCalledTimes(1);
    expect(onKeyUpPreventDefault).toHaveBeenCalledTimes(1);
  });

  it('should fire passed along callbacks and not call preventDefault when href is present as anchor', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const onClickPreventDefault = jest.fn();
    const onKeyDownPreventDefault = jest.fn();
    const onKeyUpPreventDefault = jest.fn();

    const wrapper = mount(
      <Button
        as="a"
        buttonText="Click me"
        disabled={false}
        href="#"
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} />
    );

    const button = wrapper.find('a');

    button?.trigger('onBlur', {});
    button?.trigger('onClick', {
      preventDefault: onClickPreventDefault
    });
    button?.trigger('onFocus', {});
    button?.trigger('onKeyDown', {
      preventDefault: onKeyDownPreventDefault
    });
    button?.trigger('onKeyUp', {
      preventDefault: onKeyUpPreventDefault
    });
    button?.trigger('onMouseEnter', {});
    button?.trigger('onMouseLeave', {});

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);

    expect(onClickPreventDefault).toHaveBeenCalledTimes(0);
    expect(onKeyDownPreventDefault).toHaveBeenCalledTimes(0);
    expect(onKeyUpPreventDefault).toHaveBeenCalledTimes(0);
  });
});
