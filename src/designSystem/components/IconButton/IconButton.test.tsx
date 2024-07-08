/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('should fire passed along callbacks - close', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <IconButton
        icon="close"
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

  it('should fire passed along callbacks - book', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <IconButton
        icon="book"
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

  it('should fire passed along callbacks - menu', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <IconButton
        icon="menu"
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

  it('should return null icon if no icon is found', () => {
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const onFocus = jest.fn();
    const onKeyDown = jest.fn();
    const onKeyUp = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(
      <IconButton
        icon={null}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} />
    );

    const icon = wrapper.find('svg');

    expect(icon).toBeFalsy();
  });
});
