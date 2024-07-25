/**
 * @jest-environment jsdom
 */
import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { ConfirmationModal } from './ConfirmationModal';

describe('ConfirmationModal', () => {
  it('should render closed', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen={false}
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    expect(wrapper.html()).toBeFalsy();
  });

  it('should render open', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modal).toContainReactText('Are you sure you would like to continue?');
  });

  it('should render open with a message', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        message="hello, world!"
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const modal = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal',
    );

    expect(modal).toContainReactText('hello, world!');
  });

  it('should render open and cancel with the backdrop', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        message="hello, world!"
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const modalBackdrop = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal-backdrop',
    );

    modalBackdrop?.trigger('onClick', {
      stopPropagation: jest.fn()
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledTimes(0);
  });

  it('should render open and cancel with the cancel button', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const cancelButton = wrapper.findAll('button')[1];

    cancelButton?.trigger('onClick');

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledTimes(0);
  });

  it('should render open and cancel with the cancel button with keyboard', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const cancelButton = wrapper.findAll('button')[1];

    cancelButton?.trigger('onKeyDown', {
      key: 'Enter'
    });

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onOk).toHaveBeenCalledTimes(0);
  });

  it('should render open and click ok', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const cancelButton = wrapper.findAll('button')[0];

    cancelButton?.trigger('onClick');

    expect(onCancel).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(1);
  });

  it('should render open and key down ok', () => {
    const onCancel = jest.fn();
    const onOk = jest.fn();

    const wrapper = mount(
      <ConfirmationModal
        isOpen
        onCancel={onCancel}
        onOk={onOk}
      />
    );

    const cancelButton = wrapper.findAll('button')[0];

    cancelButton?.trigger('onKeyDown', {
      key: 'Enter'
    });

    expect(onCancel).toHaveBeenCalledTimes(0);
    expect(onOk).toHaveBeenCalledTimes(1);
  });
});