/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';
import ReactDOM from 'react-dom';

import { Modal } from './Modal';

describe('Modal', () => {
  beforeEach(() => {
    // @ts-expect-error this is to explicitly mock react portals
    ReactDOM.createPortal = jest.fn((element) => {
      return element;
    });
  });

  afterEach(() => {
    // @ts-expect-error this is to explicitly mock react portals
    ReactDOM.createPortal.mockClear();
  });

  it('renders when open', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <Modal
        isOpen
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </Modal>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  });

  it('does not render when closed', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <Modal
        isOpen={false}
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </Modal>
    );

    expect(wrapper).not.toContainReactText('Hello, world!');
  });

  it('attempts to close when clicking the background', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <Modal
        isOpen
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </Modal>
    );

    const background = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-modal-backdrop',
    );

    background?.trigger('onClick', {
      stopPropagation: jest.fn()
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});