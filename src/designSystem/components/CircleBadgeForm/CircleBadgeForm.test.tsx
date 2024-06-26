/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { CircleBadgeForm } from "./CircleBadgeForm";

describe('CircleBadgeForm', () => {
  it('should render', () => {
    const onChange = jest.fn();
    const onValidate = jest.fn().mockReturnValue(true);

    const wrapper = mount(
      <CircleBadgeForm
        color="blue"
        onChange={onChange}
        onValidate={onValidate}
        value="1"
      />
    );

    const input = wrapper.find('input');

    expect(input?.props.value).toEqual('1');
  });

  it('should render a blue stroke', () => {
    const onChange = jest.fn();
    const onValidate = jest.fn().mockReturnValue(true);

    const wrapper = mount(
      <CircleBadgeForm
        color="blue"
        onChange={onChange}
        onValidate={onValidate}
        value="1"
      />
    );

    const div = wrapper.find('div');
    const className = div?.props.className ?? '' as string;

    expect(className.includes('dm-screen-design-system-circle-badge-form-stroke-blue')).toEqual(true);
  });

  it('should render a green stroke', () => {
    const onChange = jest.fn();
    const onValidate = jest.fn().mockReturnValue(true);

    const wrapper = mount(
      <CircleBadgeForm
        color="green"
        onChange={onChange}
        onValidate={onValidate}
        value="1"
      />
    );

    const div = wrapper.find('div');
    const className = div?.props.className ?? '' as string;

    expect(className.includes('dm-screen-design-system-circle-badge-form-stroke-green')).toEqual(true);
  });

  it('should render a orange stroke', () => {
    const onChange = jest.fn();
    const onValidate = jest.fn().mockReturnValue(true);

    const wrapper = mount(
      <CircleBadgeForm
        color="orange"
        onChange={onChange}
        onValidate={onValidate}
        value="1"
      />
    );

    const div = wrapper.find('div');
    const className = div?.props.className ?? '' as string;

    expect(className.includes('dm-screen-design-system-circle-badge-form-stroke-orange')).toEqual(true);
  });

  it('should fire onChange with null value if validation callback is false', () => {
    const onChange = jest.fn();
    const onValidate = jest.fn().mockReturnValue(false);

    const wrapper = mount(
      <CircleBadgeForm
        color="orange"
        onChange={onChange}
        onValidate={onValidate}
        value="1"
      />
    );

    const input = wrapper.find('input');

    input?.trigger('onChange', { target: { value: 'a' } });

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('should not fire onChange with string value if validation callback is true', () => {
    const onChange = jest.fn();
    const onValidate = jest.fn().mockReturnValue(true);

    const wrapper = mount(
      <CircleBadgeForm
        color="orange"
        onChange={onChange}
        onValidate={onValidate}
        value="1"
      />
    );

    const input = wrapper.find('input');

    input?.trigger('onChange', { target: { value: '1' } });

    expect(onChange).toHaveBeenCalledWith('1');
  });
});