/**
 * @jest-environment jsdom
 */

import '@shopify/react-testing/matchers';
import { mount } from '@shopify/react-testing';

import { FooterOffset } from './FooterOffset';

describe('FooterOffset', () => {
  it('should render', () => {
    const wrapper = mount(
      <FooterOffset>
        Hello, world!
      </FooterOffset>
    );

    expect(wrapper).toContainReactText('Hello, world!');
  })
});