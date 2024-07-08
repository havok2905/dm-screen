/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import ReactDOM from 'react-dom';
import { mount } from '@shopify/react-testing';
import { SideDrawer } from './SideDrawer';

describe('SideDrawer', () => {
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
      <SideDrawer
        isOpen
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </SideDrawer>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  });

  it('does not render when closed', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <SideDrawer
        isOpen={false}
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </SideDrawer>
    );

    expect(wrapper).not.toContainReactText('Hello, world!');
  });

  it('attempts to close when clicking the background', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <SideDrawer
        isOpen
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </SideDrawer>
    );

    const background = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-side-drawer-backdrop',
    );

    background?.trigger('onClick', {
      stopPropagation: jest.fn()
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('attempts to close when clicking the close button', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <SideDrawer
        isOpen
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </SideDrawer>
    );

    const closeButton = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-side-drawer-header',
    )?.find('button');

    closeButton?.trigger('onClick', {
      stopPropagation: jest.fn()
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('attempts to close when hitting the enter key on the close button', () => {
    const onClose = jest.fn();

    const wrapper = mount(
      <SideDrawer
        isOpen
        onClose={onClose}
        portalElement={document.body}>
        Hello, world!
      </SideDrawer>
    );

    const closeButton = wrapper.findWhere<'div'>(
      (node) => node.is('div') && node.prop('className') === 'dm-screen-design-system-side-drawer-header',
    )?.find('button');

    closeButton?.trigger('onKeyDown', {
      key: 'Enter'
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});