/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { Footer } from './Footer';

describe('Footer', () => {
  it('should render', () => {
    const wrapper = mount(
      <Footer>
        Hello, world!
      </Footer>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  })
});